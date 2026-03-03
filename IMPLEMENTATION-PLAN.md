# GoHighLevel MCP Server - Implementation Plan

> **Generated**: 2026-02-04
> **Current Tools**: 215 implemented
> **Target Tools**: 320+ tools
> **API Docs Reference**: `C:\GitHub\highlevel-api-docs\apps\`

---

## Executive Summary

This document outlines a comprehensive implementation plan to bring the GoHighLevel MCP Server to full API coverage. The plan is organized into 4 phases with detailed tasks, file locations, and checkboxes for tracking progress.

---

## Phase 1: Critical New API Categories

**Priority**: CRITICAL
**Estimated Tools**: 25 new tools
**Timeline**: Implement first

### 1.1 Voice AI API (NEW)

**Source**: `highlevel-api-docs/apps/voice-ai.json`
**New File**: `src/tools/voice-ai-tools.ts`
**Scopes Required**: `voice-ai-agents.readonly`, `voice-ai-agents.write`, `voice-ai-call-logs.readonly`

#### Tasks

- [ ] Create `src/tools/voice-ai-tools.ts`
- [ ] Add types to `src/types/ghl-types.ts`:
  - [ ] `GHLVoiceAgent`
  - [ ] `GHLVoiceAgentCreateRequest`
  - [ ] `GHLVoiceAgentUpdateRequest`
  - [ ] `GHLVoiceCallLog`
  - [ ] `GHLVoiceAction`
- [ ] Add API methods to `src/clients/ghl-api-client.ts`:
  - [ ] `createVoiceAgent()`
  - [ ] `listVoiceAgents()`
  - [ ] `getVoiceAgent()`
  - [ ] `updateVoiceAgent()`
  - [ ] `deleteVoiceAgent()`
  - [ ] `getVoiceCallLogs()`
  - [ ] `getVoiceCallLog()`
  - [ ] `createVoiceAction()`
  - [ ] `updateVoiceAction()`
  - [ ] `getVoiceAction()`
  - [ ] `deleteVoiceAction()`
- [ ] Implement tools:
  - [ ] `ghl_create_voice_agent` - Create AI voice agent
  - [ ] `ghl_list_voice_agents` - List all voice agents
  - [ ] `ghl_get_voice_agent` - Get agent by ID
  - [ ] `ghl_update_voice_agent` - Update agent config
  - [ ] `ghl_delete_voice_agent` - Delete agent
  - [ ] `ghl_get_voice_call_logs` - List call logs
  - [ ] `ghl_get_voice_call_log` - Get specific call log
  - [ ] `ghl_create_voice_action` - Create agent action
  - [ ] `ghl_update_voice_action` - Update action
  - [ ] `ghl_get_voice_action` - Get action
  - [ ] `ghl_delete_voice_action` - Delete action
- [ ] Register in `src/server.ts`:
  - [ ] Import VoiceAITools
  - [ ] Initialize in constructor
  - [ ] Add to ListToolsRequestSchema handler
  - [ ] Add isVoiceAITool() helper
  - [ ] Add to CallToolRequestSchema handler
- [ ] Register in `src/http-server.ts` (same steps)
- [ ] Add tests: `tests/tools/voice-ai-tools.test.ts`

**Endpoints**:
| Method | Endpoint | Tool Name |
|--------|----------|-----------|
| POST | `/voice-ai/agents` | ghl_create_voice_agent |
| GET | `/voice-ai/agents` | ghl_list_voice_agents |
| GET | `/voice-ai/agents/{agentId}` | ghl_get_voice_agent |
| PATCH | `/voice-ai/agents/{agentId}` | ghl_update_voice_agent |
| DELETE | `/voice-ai/agents/{agentId}` | ghl_delete_voice_agent |
| GET | `/voice-ai/call-logs` | ghl_get_voice_call_logs |
| GET | `/voice-ai/call-logs/{callLogId}` | ghl_get_voice_call_log |
| POST | `/voice-ai/agents/{agentId}/actions` | ghl_create_voice_action |
| PATCH | `/voice-ai/agents/{agentId}/actions/{actionId}` | ghl_update_voice_action |
| GET | `/voice-ai/agents/{agentId}/actions/{actionId}` | ghl_get_voice_action |
| DELETE | `/voice-ai/agents/{agentId}/actions/{actionId}` | ghl_delete_voice_action |

---

### 1.2 Users API (NEW)

**Source**: `highlevel-api-docs/apps/users.json`
**New File**: `src/tools/user-tools.ts`
**Scopes Required**: `users.readonly`, `users.write`

#### Tasks

- [ ] Create `src/tools/user-tools.ts`
- [ ] Add types to `src/types/ghl-types.ts`:
  - [ ] `GHLUser`
  - [ ] `GHLUserCreateRequest`
  - [ ] `GHLUserUpdateRequest`
  - [ ] `GHLUserSearchRequest`
  - [ ] `GHLUserSearchResponse`
- [ ] Add API methods to `src/clients/ghl-api-client.ts`:
  - [ ] `searchUsers()`
  - [ ] `getUser()`
  - [ ] `createUser()`
  - [ ] `updateUser()`
  - [ ] `deleteUser()`
  - [ ] `getUsersByLocation()`
- [ ] Implement tools:
  - [ ] `ghl_search_users` - Search users by name/email/phone
  - [ ] `ghl_get_user` - Get user by ID
  - [ ] `ghl_create_user` - Create new user
  - [ ] `ghl_update_user` - Update user
  - [ ] `ghl_delete_user` - Delete user
  - [ ] `ghl_get_users_by_location` - Get users for location
- [ ] Register in `src/server.ts` and `src/http-server.ts`
- [ ] Add tests: `tests/tools/user-tools.test.ts`

**Endpoints**:
| Method | Endpoint | Tool Name |
|--------|----------|-----------|
| GET | `/users/search` | ghl_search_users |
| GET | `/users/{userId}` | ghl_get_user |
| POST | `/users/` | ghl_create_user |
| PUT | `/users/{userId}` | ghl_update_user |
| DELETE | `/users/{userId}` | ghl_delete_user |
| GET | `/users/location/{locationId}` | ghl_get_users_by_location |

---

### 1.3 Phone System API (NEW)

**Source**: `highlevel-api-docs/apps/phone-system.json`
**New File**: `src/tools/phone-system-tools.ts`
**Scopes Required**: `phone-system.readonly`, `phone-system.write`

#### Tasks

- [ ] Create `src/tools/phone-system-tools.ts`
- [ ] Add types to `src/types/ghl-types.ts`:
  - [ ] `GHLNumberPool`
  - [ ] `GHLPhoneNumber`
- [ ] Add API methods to `src/clients/ghl-api-client.ts`:
  - [ ] `getNumberPools()`
  - [ ] `getActiveNumbers()`
- [ ] Implement tools:
  - [ ] `ghl_list_number_pools` - List number pools
  - [ ] `ghl_get_active_numbers` - Get active phone numbers
- [ ] Register in both servers
- [ ] Add tests

**Endpoints**:
| Method | Endpoint | Tool Name |
|--------|----------|-----------|
| GET | `/phone-system/number-pools` | ghl_list_number_pools |
| GET | `/phone-system/active-numbers` | ghl_get_active_numbers |

---

## Phase 2: High Priority Categories

**Priority**: HIGH
**Estimated Tools**: 35 new tools

### 2.1 Funnels API (NEW)

**Source**: `highlevel-api-docs/apps/funnels.json`
**New File**: `src/tools/funnel-tools.ts`
**Scopes Required**: `funnels.readonly`, `funnels.write`, `funnels/redirect.readonly`, `funnels/redirect.write`

#### Tasks

- [ ] Create `src/tools/funnel-tools.ts`
- [ ] Add types to `src/types/ghl-types.ts`:
  - [ ] `GHLFunnel`
  - [ ] `GHLFunnelPage`
  - [ ] `GHLRedirect`
  - [ ] `GHLCreateRedirectRequest`
  - [ ] `GHLUpdateRedirectRequest`
- [ ] Add API methods:
  - [ ] `getFunnels()`
  - [ ] `getFunnelPages()`
  - [ ] `getFunnelPagesCount()`
  - [ ] `createRedirect()`
  - [ ] `updateRedirect()`
  - [ ] `deleteRedirect()`
  - [ ] `listRedirects()`
- [ ] Implement tools:
  - [ ] `ghl_get_funnels` - List all funnels
  - [ ] `ghl_get_funnel_pages` - Get pages for funnel
  - [ ] `ghl_get_funnel_pages_count` - Get page count
  - [ ] `ghl_create_redirect` - Create URL redirect
  - [ ] `ghl_update_redirect` - Update redirect
  - [ ] `ghl_delete_redirect` - Delete redirect
  - [ ] `ghl_list_redirects` - List all redirects
- [ ] Register in both servers
- [ ] Add tests

**Endpoints**:
| Method | Endpoint | Tool Name |
|--------|----------|-----------|
| GET | `/funnels/` | ghl_get_funnels |
| GET | `/funnels/{funnelId}/pages` | ghl_get_funnel_pages |
| GET | `/funnels/{funnelId}/pages/count` | ghl_get_funnel_pages_count |
| POST | `/funnels/lookup/redirect` | ghl_create_redirect |
| PATCH | `/funnels/lookup/redirect/{id}` | ghl_update_redirect |
| DELETE | `/funnels/lookup/redirect/{id}` | ghl_delete_redirect |
| GET | `/funnels/lookup/redirect/list` | ghl_list_redirects |

---

### 2.2 Forms API (NEW)

**Source**: `highlevel-api-docs/apps/forms.json`
**New File**: `src/tools/form-tools.ts`
**Scopes Required**: `forms.readonly`, `forms.write`

#### Tasks

- [ ] Create `src/tools/form-tools.ts`
- [ ] Add types:
  - [ ] `GHLForm`
  - [ ] `GHLFormSubmission`
  - [ ] `GHLFormsSubmissionsRequest`
- [ ] Add API methods:
  - [ ] `getForms()`
  - [ ] `getFormSubmissions()`
  - [ ] `uploadToCustomFields()`
- [ ] Implement tools:
  - [ ] `ghl_get_forms` - List forms
  - [ ] `ghl_get_form_submissions` - Get form submissions
  - [ ] `ghl_upload_form_custom_fields` - Upload to custom fields
- [ ] Register in both servers
- [ ] Add tests

**Endpoints**:
| Method | Endpoint | Tool Name |
|--------|----------|-----------|
| GET | `/forms/` | ghl_get_forms |
| GET | `/forms/submissions` | ghl_get_form_submissions |
| POST | `/forms/upload-custom-files` | ghl_upload_form_custom_fields |

---

### 2.3 Proposals/Documents API (NEW)

**Source**: `highlevel-api-docs/apps/proposals.json`
**New File**: `src/tools/proposal-tools.ts`
**Scopes Required**: `proposals.readonly`, `proposals.write`

#### Tasks

- [ ] Create `src/tools/proposal-tools.ts`
- [ ] Add types:
  - [ ] `GHLDocument`
  - [ ] `GHLDocumentTemplate`
  - [ ] `GHLSendDocumentRequest`
- [ ] Add API methods:
  - [ ] `listDocuments()`
  - [ ] `sendDocument()`
  - [ ] `listDocumentTemplates()`
  - [ ] `sendDocumentFromTemplate()`
- [ ] Implement tools:
  - [ ] `ghl_list_documents` - List documents/contracts
  - [ ] `ghl_send_document` - Send document
  - [ ] `ghl_list_document_templates` - List templates
  - [ ] `ghl_send_document_template` - Send from template
- [ ] Register in both servers
- [ ] Add tests

**Endpoints**:
| Method | Endpoint | Tool Name |
|--------|----------|-----------|
| GET | `/proposals/document` | ghl_list_documents |
| POST | `/proposals/document/send` | ghl_send_document |
| GET | `/proposals/document/template` | ghl_list_document_templates |
| POST | `/proposals/document/template/send` | ghl_send_document_template |

---

### 2.4 Businesses API (NEW)

**Source**: `highlevel-api-docs/apps/businesses.json`
**New File**: `src/tools/business-tools.ts`
**Scopes Required**: `businesses.readonly`, `businesses.write`

#### Tasks

- [ ] Create `src/tools/business-tools.ts`
- [ ] Add types:
  - [ ] `GHLBusiness`
  - [ ] `GHLBusinessCreateRequest`
  - [ ] `GHLBusinessUpdateRequest`
- [ ] Add API methods:
  - [ ] `getBusiness()`
  - [ ] `getBusinessesByLocation()`
  - [ ] `createBusiness()`
  - [ ] `updateBusiness()`
  - [ ] `deleteBusiness()`
- [ ] Implement tools:
  - [ ] `ghl_get_business` - Get business by ID
  - [ ] `ghl_list_businesses` - List businesses for location
  - [ ] `ghl_create_business` - Create business
  - [ ] `ghl_update_business` - Update business
  - [ ] `ghl_delete_business` - Delete business
- [ ] Register in both servers
- [ ] Add tests

**Endpoints**:
| Method | Endpoint | Tool Name |
|--------|----------|-----------|
| GET | `/businesses/{businessId}` | ghl_get_business |
| GET | `/businesses/` | ghl_list_businesses |
| POST | `/businesses/` | ghl_create_business |
| PUT | `/businesses/{businessId}` | ghl_update_business |
| DELETE | `/businesses/{businessId}` | ghl_delete_business |

---

### 2.5 Campaigns API (NEW)

**Source**: `highlevel-api-docs/apps/campaigns.json`
**New File**: `src/tools/campaign-tools.ts`
**Scopes Required**: `campaigns.readonly`

#### Tasks

- [ ] Create `src/tools/campaign-tools.ts`
- [ ] Add types:
  - [ ] `GHLCampaign`
  - [ ] `GHLCampaignsResponse`
- [ ] Add API methods:
  - [ ] `getCampaigns()`
- [ ] Implement tools:
  - [ ] `ghl_get_campaigns` - List campaigns
- [ ] Register in both servers
- [ ] Add tests

**Endpoints**:
| Method | Endpoint | Tool Name |
|--------|----------|-----------|
| GET | `/campaigns/` | ghl_get_campaigns |

---

### 2.6 Trigger Links API (NEW)

**Source**: `highlevel-api-docs/apps/links.json`
**New File**: `src/tools/trigger-link-tools.ts`
**Scopes Required**: `links.readonly`, `links.write`

#### Tasks

- [ ] Create `src/tools/trigger-link-tools.ts`
- [ ] Add types:
  - [ ] `GHLTriggerLink`
  - [ ] `GHLTriggerLinkCreateRequest`
  - [ ] `GHLTriggerLinkUpdateRequest`
- [ ] Add API methods:
  - [ ] `getTriggerLinks()`
  - [ ] `getTriggerLink()`
  - [ ] `createTriggerLink()`
  - [ ] `updateTriggerLink()`
  - [ ] `deleteTriggerLink()`
  - [ ] `searchTriggerLinks()`
- [ ] Implement tools:
  - [ ] `ghl_list_trigger_links` - List all trigger links
  - [ ] `ghl_get_trigger_link` - Get link by ID
  - [ ] `ghl_create_trigger_link` - Create trigger link
  - [ ] `ghl_update_trigger_link` - Update link
  - [ ] `ghl_delete_trigger_link` - Delete link
  - [ ] `ghl_search_trigger_links` - Search links
- [ ] Register in both servers
- [ ] Add tests

**Endpoints**:
| Method | Endpoint | Tool Name |
|--------|----------|-----------|
| GET | `/links/` | ghl_list_trigger_links |
| GET | `/links/id/{linkId}` | ghl_get_trigger_link |
| POST | `/links/` | ghl_create_trigger_link |
| PUT | `/links/{linkId}` | ghl_update_trigger_link |
| DELETE | `/links/{linkId}` | ghl_delete_trigger_link |
| GET | `/links/search` | ghl_search_trigger_links |

---

### 2.7 Snapshots API (NEW)

**Source**: `highlevel-api-docs/apps/snapshots.json`
**New File**: `src/tools/snapshot-tools.ts`
**Scopes Required**: `snapshots.readonly`, `snapshots.write`

#### Tasks

- [ ] Create `src/tools/snapshot-tools.ts`
- [ ] Add types:
  - [ ] `GHLSnapshot`
  - [ ] `GHLSnapshotShareLink`
  - [ ] `GHLSnapshotPush`
- [ ] Add API methods:
  - [ ] `getSnapshots()`
  - [ ] `createSnapshotShareLink()`
  - [ ] `getSnapshotPush()`
  - [ ] `getLatestSnapshotPush()`
- [ ] Implement tools:
  - [ ] `ghl_get_snapshots` - List snapshots
  - [ ] `ghl_create_snapshot_share_link` - Create share link
  - [ ] `ghl_get_snapshot_push` - Get push status
  - [ ] `ghl_get_latest_snapshot_push` - Get latest push
- [ ] Register in both servers
- [ ] Add tests

**Endpoints**:
| Method | Endpoint | Tool Name |
|--------|----------|-----------|
| GET | `/snapshots/` | ghl_get_snapshots |
| POST | `/snapshots/share/link` | ghl_create_snapshot_share_link |
| GET | `/snapshots/snapshot-push/{snapshotId}` | ghl_get_snapshot_push |
| GET | `/snapshots/snapshot-push/{snapshotId}/latest` | ghl_get_latest_snapshot_push |

---

## Phase 3: Expand Existing Categories

**Priority**: MEDIUM
**Estimated Tools**: 40 new tools

### 3.1 Products API Expansion

**Source**: `highlevel-api-docs/apps/products.json`
**Existing File**: `src/tools/products-tools.ts`

#### New Endpoints to Add

- [ ] Add API methods:
  - [ ] `bulkUpdateProducts()`
  - [ ] `bulkEditProducts()`
  - [ ] `getProductPrice()`
  - [ ] `updateProductPrice()`
  - [ ] `deleteProductPrice()`
  - [ ] `getProductCollection()`
  - [ ] `updateProductCollection()`
  - [ ] `deleteProductCollection()`
  - [ ] `getProductReviews()`
  - [ ] `updateProductReview()`
  - [ ] `deleteProductReview()`
  - [ ] `bulkUpdateProductReviews()`
  - [ ] `getProductReviewsCount()`
- [ ] Implement additional tools:
  - [ ] `ghl_bulk_update_products` - Bulk update products
  - [ ] `ghl_bulk_edit_products` - Bulk edit products and prices
  - [ ] `ghl_get_product_price` - Get price by ID
  - [ ] `ghl_update_product_price` - Update price
  - [ ] `ghl_delete_product_price` - Delete price
  - [ ] `ghl_get_product_collection` - Get collection by ID
  - [ ] `ghl_update_product_collection` - Update collection
  - [ ] `ghl_delete_product_collection` - Delete collection
  - [ ] `ghl_get_product_reviews` - List reviews
  - [ ] `ghl_update_product_review` - Update review
  - [ ] `ghl_delete_product_review` - Delete review
  - [ ] `ghl_bulk_update_product_reviews` - Bulk update reviews
  - [ ] `ghl_get_product_reviews_count` - Get review count
- [ ] Update tool registration in both servers
- [ ] Add tests for new tools

**New Endpoints**:
| Method | Endpoint | Tool Name |
|--------|----------|-----------|
| POST | `/products/bulk-update` | ghl_bulk_update_products |
| POST | `/products/bulk-update/edit` | ghl_bulk_edit_products |
| GET | `/products/{productId}/price/{priceId}` | ghl_get_product_price |
| PUT | `/products/{productId}/price/{priceId}` | ghl_update_product_price |
| DELETE | `/products/{productId}/price/{priceId}` | ghl_delete_product_price |
| GET | `/products/collections/{collectionId}` | ghl_get_product_collection |
| PUT | `/products/collections/{collectionId}` | ghl_update_product_collection |
| DELETE | `/products/collections/{collectionId}` | ghl_delete_product_collection |
| GET | `/products/{productId}/reviews` | ghl_get_product_reviews |
| PUT | `/products/{productId}/reviews/{reviewId}` | ghl_update_product_review |
| DELETE | `/products/{productId}/reviews/{reviewId}` | ghl_delete_product_review |
| POST | `/products/reviews/bulk-update` | ghl_bulk_update_product_reviews |
| GET | `/products/{productId}/reviews/count` | ghl_get_product_reviews_count |

---

### 3.2 Social Media API Expansion

**Source**: `highlevel-api-docs/apps/social-media-posting.json`
**Existing File**: `src/tools/social-media-tools.ts`

#### Missing OAuth/Account Endpoints

- [ ] Add API methods:
  - [ ] `startGoogleOAuth()`
  - [ ] `getGoogleLocations()`
  - [ ] `setGoogleLocations()`
  - [ ] `startFacebookOAuth()`
  - [ ] `getFacebookPages()`
  - [ ] `setFacebookPages()`
  - [ ] `startInstagramOAuth()`
  - [ ] `getInstagramAccounts()`
  - [ ] `setInstagramAccounts()`
  - [ ] `startLinkedInOAuth()`
  - [ ] `getLinkedInPages()`
  - [ ] `setLinkedInPages()`
  - [ ] `startTwitterOAuth()`
  - [ ] `startTikTokOAuth()`
  - [ ] `getTikTokAccounts()`
  - [ ] `setTikTokAccounts()`
  - [ ] `reconnectAccount()`
- [ ] Implement tools (prefix with `ghl_social_`):
  - [ ] `ghl_social_google_oauth_start`
  - [ ] `ghl_social_google_locations_get`
  - [ ] `ghl_social_google_locations_set`
  - [ ] `ghl_social_facebook_oauth_start`
  - [ ] `ghl_social_facebook_pages_get`
  - [ ] `ghl_social_facebook_pages_set`
  - [ ] `ghl_social_instagram_oauth_start`
  - [ ] `ghl_social_instagram_accounts_get`
  - [ ] `ghl_social_instagram_accounts_set`
  - [ ] `ghl_social_linkedin_oauth_start`
  - [ ] `ghl_social_linkedin_pages_get`
  - [ ] `ghl_social_linkedin_pages_set`
  - [ ] `ghl_social_twitter_oauth_start`
  - [ ] `ghl_social_tiktok_oauth_start`
  - [ ] `ghl_social_tiktok_accounts_get`
  - [ ] `ghl_social_tiktok_accounts_set`
  - [ ] `ghl_social_reconnect_account`
- [ ] Update registrations
- [ ] Add tests

---

### 3.3 Media API Expansion

**Source**: `highlevel-api-docs/apps/medias.json`
**Existing File**: `src/tools/media-tools.ts`

#### Tasks

- [ ] Add API methods:
  - [ ] `createMediaFolder()`
  - [ ] `updateMediaFile()`
  - [ ] `bulkDeleteMedia()`
- [ ] Implement tools:
  - [ ] `ghl_create_media_folder` - Create folder
  - [ ] `ghl_update_media_file` - Update file metadata
  - [ ] `ghl_bulk_delete_media` - Bulk delete files
- [ ] Update registrations
- [ ] Add tests

---

### 3.4 Payments API Expansion

**Source**: `highlevel-api-docs/apps/payments.json`
**Existing File**: `src/tools/payments-tools.ts`

#### Tasks

- [ ] Add API methods:
  - [ ] `recordOrderPayment()`
  - [ ] `listOrderNotes()`
  - [ ] `createOrderNote()`
- [ ] Implement tools:
  - [ ] `ghl_record_order_payment` - Record payment for order
  - [ ] `ghl_list_order_notes` - List order notes
  - [ ] `ghl_create_order_note` - Create order note
- [ ] Update registrations
- [ ] Add tests

---

### 3.5 Invoices API Expansion

**Source**: `highlevel-api-docs/apps/invoices.json`
**Existing File**: `src/tools/invoices-tools.ts`

#### Check/Add Missing Endpoints

- [ ] Verify `text2pay_invoice` is implemented
- [ ] Verify `update_invoice_last_visited` is implemented
- [ ] Add any missing invoice schedule management tools
- [ ] Add any missing payment configuration tools

---

## Phase 4: Low Priority Categories

**Priority**: LOW
**Estimated Tools**: 20 new tools

### 4.1 Companies API (NEW)

**Source**: `highlevel-api-docs/apps/companies.json`
**New File**: `src/tools/company-tools.ts`

#### Tasks

- [ ] Create `src/tools/company-tools.ts`
- [ ] Add types: `GHLCompany`
- [ ] Add API method: `getCompany()`
- [ ] Implement tool: `ghl_get_company`
- [ ] Register and test

---

### 4.2 Courses API (NEW)

**Source**: `highlevel-api-docs/apps/courses.json`
**New File**: `src/tools/course-tools.ts`

#### Tasks

- [ ] Create `src/tools/course-tools.ts`
- [ ] Add types: `GHLCourse`, `GHLCourseImportRequest`
- [ ] Add API method: `importCourses()`
- [ ] Implement tool: `ghl_import_courses`
- [ ] Register and test

---

### 4.3 Marketplace API (NEW)

**Source**: `highlevel-api-docs/apps/marketplace.json`
**New File**: `src/tools/marketplace-tools.ts`

#### Tasks

- [ ] Create `src/tools/marketplace-tools.ts`
- [ ] Add types:
  - [ ] `GHLMarketplaceCharge`
  - [ ] `GHLMarketplaceInstaller`
- [ ] Add API methods:
  - [ ] `createCharge()`
  - [ ] `getCharges()`
  - [ ] `getCharge()`
  - [ ] `deleteCharge()`
  - [ ] `checkFunds()`
  - [ ] `uninstallApp()`
  - [ ] `getInstallerDetails()`
- [ ] Implement tools:
  - [ ] `ghl_marketplace_create_charge`
  - [ ] `ghl_marketplace_list_charges`
  - [ ] `ghl_marketplace_get_charge`
  - [ ] `ghl_marketplace_delete_charge`
  - [ ] `ghl_marketplace_check_funds`
  - [ ] `ghl_marketplace_uninstall_app`
  - [ ] `ghl_marketplace_get_installer`
- [ ] Register and test

---

### 4.4 Custom Menus API (NEW)

**Source**: `highlevel-api-docs/apps/custom-menus.json`
**New File**: `src/tools/custom-menu-tools.ts`

#### Tasks

- [ ] Create `src/tools/custom-menu-tools.ts`
- [ ] Add types:
  - [ ] `GHLCustomMenu`
  - [ ] `GHLCustomMenuCreateRequest`
- [ ] Add API methods:
  - [ ] `getCustomMenus()`
  - [ ] `getCustomMenu()`
  - [ ] `createCustomMenu()`
  - [ ] `updateCustomMenu()`
  - [ ] `deleteCustomMenu()`
- [ ] Implement tools:
  - [ ] `ghl_list_custom_menus`
  - [ ] `ghl_get_custom_menu`
  - [ ] `ghl_create_custom_menu`
  - [ ] `ghl_update_custom_menu`
  - [ ] `ghl_delete_custom_menu`
- [ ] Register and test

---

### 4.5 Agencies API (NEW)

**Source**: `highlevel-api-docs/apps/agencies.json`
**New File**: `src/tools/agency-tools.ts`

#### Tasks

- [ ] Create `src/tools/agency-tools.ts`
- [ ] Review API documentation for available endpoints
- [ ] Implement applicable tools
- [ ] Register and test

---

## Implementation Checklist Summary

### New Tool Files to Create

| File | Phase | Tools | Status |
|------|-------|-------|--------|
| `voice-ai-tools.ts` | 1 | 11 | [ ] |
| `user-tools.ts` | 1 | 6 | [ ] |
| `phone-system-tools.ts` | 1 | 2 | [ ] |
| `funnel-tools.ts` | 2 | 7 | [ ] |
| `form-tools.ts` | 2 | 3 | [ ] |
| `proposal-tools.ts` | 2 | 4 | [ ] |
| `business-tools.ts` | 2 | 5 | [ ] |
| `campaign-tools.ts` | 2 | 1 | [ ] |
| `trigger-link-tools.ts` | 2 | 6 | [ ] |
| `snapshot-tools.ts` | 2 | 4 | [ ] |
| `company-tools.ts` | 4 | 1 | [ ] |
| `course-tools.ts` | 4 | 1 | [ ] |
| `marketplace-tools.ts` | 4 | 7 | [ ] |
| `custom-menu-tools.ts` | 4 | 5 | [ ] |
| `agency-tools.ts` | 4 | TBD | [ ] |

### Existing Files to Expand

| File | Phase | New Tools | Status |
|------|-------|-----------|--------|
| `products-tools.ts` | 3 | 13 | [ ] |
| `social-media-tools.ts` | 3 | 17 | [ ] |
| `media-tools.ts` | 3 | 3 | [ ] |
| `payments-tools.ts` | 3 | 3 | [ ] |
| `invoices-tools.ts` | 3 | Verify | [ ] |

---

## Final Steps (After All Phases)

- [ ] Update `CLAUDE.md` with new tool categories
- [ ] Update `README.md` with new tool counts
- [ ] Run full test suite: `npm test`
- [ ] Run type checking: `npm run lint`
- [ ] Rebuild Docker image: `docker build -t ghl-mcp-server .`
- [ ] Test with Claude Code: `claude mcp list`
- [ ] Create new release/tag

---

## Notes

### API Version Headers

Most endpoints require a `Version` header:
- Contacts API: `2021-07-28`
- Conversations API: `2021-04-15`
- Voice AI API: `2021-04-15`
- Most others: `2021-07-28`

### Naming Conventions

- Tool names: `ghl_{category}_{action}` or `{action}_{entity}`
- Type names: `GHL{Entity}` or `GHL{Action}{Entity}Request`
- API method names: `{action}{Entity}()` (camelCase)

### Testing Pattern

Each new tool file should have a corresponding test file in `tests/tools/` with:
- Tool definition tests
- Mocked API call tests
- Error handling tests

---

**Total Estimated New Tools**: ~120
**Final Tool Count Target**: 335+
