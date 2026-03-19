# WAT Agent Alignment
<!-- WAT-ALIGNMENT v1 -->

You are the Agent layer inside the WAT (Workflows, Agents, Tools) framework. Probabilistic reasoning stays with you; deterministic execution stays in scripts and tools.

- Workflows: Read the relevant SOP in `workflows/` (or the closest repo docs) before acting. They define the objective, required inputs, tools to run, expected outputs, and edge cases. Update workflows when new learnings or fixes are confirmed; ask before creating new ones unless told otherwise.
- Agents: Coordinate steps, collect inputs, choose the right workflow, and sequence tool calls. Handle failures by reading the full error, adjusting, retrying, and capturing the learning.
- Tools: Prefer scripts in `tools/` (or package scripts) over manual execution. If no tool exists, build a small deterministic helper only after confirming none exists.
- Data & secrets: Use `.env`, `credentials.json`, and similar for secrets; never hardcode or commit them. Treat `.tmp/` as disposable scratch space.
- Deliverables: Place final outputs where workflows specify (Sheets, Slides, etc.). Local files are intermediate only.
- Self-improvement loop: Identify what broke, fix or adjust the tool, verify, then update the workflow so the next run is smoother.

---
Existing project-specific notes remain below for reference.
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GoHighLevel MCP Server - A Model Context Protocol (MCP) server that connects AI assistants (Claude Desktop, ChatGPT) to GoHighLevel CRM. Provides 269+ tools across 19 categories for CRM automation.

**Key Requirements:**
- Requires a **Private Integrations API key** from GoHighLevel (not a regular API key)
- Requires Node.js 18+
- Must have `GHL_API_KEY` and `GHL_LOCATION_ID` environment variables set

## Common Commands

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Development with hot reload
npm run dev

# Start production HTTP server (for web/ChatGPT integration)
npm start

# Start stdio server (for Claude Desktop local integration)
npm run start:stdio

# Run tests
npm test
npm run test:watch
npm run test:coverage

# Type checking (lint)
npm run lint
```

## Architecture

### Dual Server Architecture

The project supports two MCP transport modes:

1. **Stdio Server** (`src/server.ts`) - For Claude Desktop local integration via stdio transport
2. **HTTP Server** (`src/http-server.ts`) - For web deployment (Vercel, Railway) using SSE transport

Both servers share the same core components but differ in transport layer.

### Core Components

```
src/
├── server.ts              # Main CLI/stdio MCP server entry point
├── http-server.ts         # HTTP/SSE MCP server for web deployment
├── clients/
│   └── ghl-api-client.ts  # Centralized GoHighLevel API client (axios-based)
├── tools/                 # MCP tool implementations (one file per category)
│   ├── contact-tools.ts   # Contact management (31 tools)
│   ├── conversation-tools.ts
│   ├── opportunity-tools.ts
│   ├── calendar-tools.ts
│   ├── invoices-tools.ts  # Largest tool set (39 tools)
│   └── ...
└── types/
    └── ghl-types.ts       # All TypeScript type definitions
```

### Adding New Tools

1. Create or update a tools file in `src/tools/`
2. Define tool in `getToolDefinitions()` method returning MCP `Tool[]` format
3. Implement `executeTool()` method to route tool calls to API client methods
4. Add API methods to `src/clients/ghl-api-client.ts`
5. Add types to `src/types/ghl-types.ts`
6. Register the tool class in both `server.ts` and `http-server.ts`:
   - Instantiate in constructor
   - Add to `setupHandlers()` tool listing
   - Add tool name routing in `CallToolRequestSchema` handler
   - Add `isXxxTool()` helper method

### Tool Pattern

Each tool class follows this pattern:
```typescript
export class XxxTools {
  constructor(private ghlClient: GHLApiClient) {}

  getToolDefinitions(): Tool[] { /* MCP tool definitions */ }

  async executeTool(name: string, args: Record<string, unknown>): Promise<any> {
    switch (name) {
      case 'tool_name':
        return this.ghlClient.someApiMethod(args);
    }
  }
}
```

## Environment Variables

```bash
GHL_API_KEY=your_private_integrations_api_key  # Required
GHL_LOCATION_ID=your_location_id               # Required
GHL_BASE_URL=https://services.leadconnectorhq.com  # Default
PORT=8000                                      # HTTP server port
```

## Testing

Tests are in `tests/` using Jest with ts-jest. Test files follow pattern `*.test.ts`.

```bash
# Run single test file
npx jest tests/tools/contact-tools.test.ts

# Run with pattern matching
npx jest --testNamePattern="create_contact"
```

## Deployment

- **Vercel**: Uses `vercel.json` config, builds via `vercel-build` script
- **Railway**: Uses `railway.json` config
- **Docker**: Dockerfile available for containerized deployment

All deployments use the HTTP server (`dist/http-server.js`) which exposes:
- `/health` - Health check
- `/tools` - List all available tools
- `/sse` - MCP SSE endpoint for AI client connections



<!-- PORT-MAP-RULES -->
## Port Map & Ngrok Rules

**MANDATORY** - All local development must follow these rules:

1. **Follow the root port map**: See `C:\Users\artic\.claude\projects\C--GitHub\PORT_MAP.md` for the complete port allocation. Never use a port already assigned to another repo. If adding a new service, pick an unused port from the map and update the map.

2. **Use ngrok for public URLs**: When a public tunnel is needed, use ngrok with named tunnels defined in `C:\Users\artic\AppData\Local\ngrok\ngrok.yml`. Start tunnels with `ngrok start <tunnel-name>` — never use `ngrok http <port>` directly.

3. **NEVER kill existing ngrok processes**: Other services depend on running ngrok tunnels. Do not run `taskkill /IM ngrok.exe`, `kill`, `pkill ngrok`, or any command that stops ngrok. If a port conflict occurs, change the app's port — not the ngrok process. Start new tunnels additively alongside existing ones.
