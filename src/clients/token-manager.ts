/**
 * OAuth Token Manager
 * Reads OAuth tokens from MongoDB (PowerToolsV2) and handles refresh.
 * Falls back to GHL_API_KEY env var if MongoDB is not configured.
 */

import axios from 'axios';

// Lazy-load mongodb to avoid import errors if not installed
let MongoClient: any;
let mongoImported = false;

async function getMongoClient() {
  if (!mongoImported) {
    try {
      const mongodb = await import('mongodb');
      MongoClient = mongodb.MongoClient;
      mongoImported = true;
    } catch (e) {
      throw new Error('mongodb package not installed. Run: npm install mongodb');
    }
  }
  return MongoClient;
}

interface TokenDocument {
  companyId: string;
  locationId?: string;
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  clientId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CachedToken {
  accessToken: string;
  refreshToken: string;
  expiresAt: number; // unix ms
  fetchedAt: number; // unix ms
}

const TOKEN_CACHE_TTL_MS = 20 * 60 * 1000; // 20 minutes
const TOKEN_REFRESH_URL = 'https://services.leadconnectorhq.com/oauth/token';

export class TokenManager {
  private mongoUri: string;
  private companyId: string;
  private clientId: string;
  private clientSecret: string;
  private cache: CachedToken | null = null;
  private mongoClient: any = null;
  private connecting: Promise<any> | null = null;

  constructor(opts: {
    mongoUri: string;
    companyId: string;
    clientId: string;
    clientSecret: string;
  }) {
    this.mongoUri = opts.mongoUri;
    this.companyId = opts.companyId;
    this.clientId = opts.clientId;
    this.clientSecret = opts.clientSecret;
  }

  /**
   * Get a valid access token. Uses cache, falls back to MongoDB, refreshes if expired.
   */
  async getAccessToken(): Promise<string> {
    // Return cached token if still fresh
    if (this.cache && (Date.now() - this.cache.fetchedAt) < TOKEN_CACHE_TTL_MS) {
      // Check if token itself is expired (needs refresh)
      if (Date.now() < this.cache.expiresAt - 60_000) {
        return this.cache.accessToken;
      }
      // Token expired, try refresh
      try {
        return await this.refreshToken(this.cache.refreshToken);
      } catch (err) {
        process.stderr.write(`[TokenManager] Refresh failed, re-reading from DB: ${err}\n`);
      }
    }

    // Read from MongoDB
    return await this.readTokenFromDb();
  }

  private async ensureConnected(): Promise<any> {
    if (this.mongoClient) return this.mongoClient;
    if (this.connecting) return this.connecting;

    this.connecting = (async () => {
      const MC = await getMongoClient();
      this.mongoClient = new MC(this.mongoUri);
      await this.mongoClient.connect();
      process.stderr.write('[TokenManager] Connected to MongoDB\n');
      return this.mongoClient;
    })();

    try {
      return await this.connecting;
    } finally {
      this.connecting = null;
    }
  }

  private async readTokenFromDb(): Promise<string> {
    const client = await this.ensureConnected();
    const db = client.db(); // uses DB from connection string
    const collection = db.collection('tokens');

    const doc: TokenDocument | null = await collection.findOne({
      companyId: this.companyId,
    });

    if (!doc) {
      throw new Error(`No token found for companyId=${this.companyId} in MongoDB`);
    }

    const updatedAt = doc.updatedAt ? new Date(doc.updatedAt).getTime() : Date.now();
    const expiresAt = updatedAt + (doc.expires_in || 86400) * 1000;

    // If token is expired, refresh it
    if (Date.now() > expiresAt - 60_000) {
      process.stderr.write('[TokenManager] Token from DB is expired, refreshing...\n');
      return await this.refreshToken(doc.refresh_token);
    }

    this.cache = {
      accessToken: doc.access_token,
      refreshToken: doc.refresh_token,
      expiresAt,
      fetchedAt: Date.now(),
    };

    process.stderr.write(`[TokenManager] Token loaded from MongoDB (expires in ${Math.round((expiresAt - Date.now()) / 60000)}m)\n`);
    return doc.access_token;
  }

  private async refreshToken(refreshToken: string): Promise<string> {
    process.stderr.write('[TokenManager] Refreshing OAuth token...\n');

    const resp = await axios.post(TOKEN_REFRESH_URL, new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: this.clientId,
      client_secret: this.clientSecret,
      refresh_token: refreshToken,
    }).toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const { access_token, refresh_token, expires_in } = resp.data;
    const now = Date.now();

    this.cache = {
      accessToken: access_token,
      refreshToken: refresh_token || refreshToken,
      expiresAt: now + (expires_in || 86400) * 1000,
      fetchedAt: now,
    };

    // Update MongoDB
    try {
      const client = await this.ensureConnected();
      const db = client.db();
      await db.collection('tokens').updateOne(
        { companyId: this.companyId },
        {
          $set: {
            access_token,
            refresh_token: refresh_token || refreshToken,
            expires_in: expires_in || 86400,
            updatedAt: new Date(),
          },
        }
      );
      process.stderr.write('[TokenManager] Token updated in MongoDB\n');
    } catch (err) {
      process.stderr.write(`[TokenManager] Warning: Failed to update token in MongoDB: ${err}\n`);
    }

    return access_token;
  }

  async close(): Promise<void> {
    if (this.mongoClient) {
      await this.mongoClient.close();
      this.mongoClient = null;
    }
  }
}

/**
 * Creates a TokenManager if MongoDB env vars are configured, otherwise returns null.
 */
export function createTokenManagerIfConfigured(): TokenManager | null {
  const mongoUri = process.env.MONGO_URI;
  const clientId = process.env.GHL_APP_CLIENT_ID;
  const clientSecret = process.env.GHL_APP_CLIENT_SECRET;

  if (!mongoUri || !clientId || !clientSecret) {
    process.stderr.write('[TokenManager] MongoDB not configured, using GHL_API_KEY fallback\n');
    return null;
  }

  return new TokenManager({
    mongoUri,
    companyId: process.env.GHL_COMPANY_ID || '8igXD6XA1bRExj2oUicW',
    clientId,
    clientSecret,
  });
}
