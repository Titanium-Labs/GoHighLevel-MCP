# GoHighLevel MCP Server — API Coverage Audit Report

**Date:** 2026-02-10  
**MCP Server:** `C:\GitHub\GoHighLevel-MCP`  
**API Docs:** `C:\GitHub\highlevel-api-docs\apps\`

---

## Summary

| Metric | Count |
|--------|-------|
| **Total API Endpoints (from docs)** | 452 |
| **MCP Tools Implemented** | 215 |
| **Estimated Coverage** | ~47% |
| **Fully Missing Resources (0 tools)** | 16 |
| **Partially Covered Resources** | 13 |
| **Fully/Well Covered Resources** | 7 |

---

## Coverage by Resource

### ✅ Fully/Well Covered

| Resource | API Endpoints | MCP Tools | Coverage |
|----------|:---:|:---:|:---:|
| Associations | 10 | 10 | ✅ 100% |
| Blogs | 7 | 7 | ✅ 100% |
| Calendars | 34 | 32 | ✅ 94% |
| Contacts | 32 | 30 | ✅ 94% |
| Conversations | 19 | 19 | ✅ 100% |
| Custom Fields (v2) | 8 | 8 | ✅ 100% |
| Email ISV | 1 | 1 | ✅ 100% |
| Emails | 5 | 5 | ✅ 100% |
| Objects | 9 | 9 | ✅ 100% |
| Opportunities | 10 | 10 | ✅ 100% |
| Surveys | 2 | 2 | ✅ 100% |
| Workflows | 1 | 1 | ✅ 100% |
| Store | 18 | 18 | ✅ 100% |

### ⚠️ Partially Covered

| Resource | API Endpoints | MCP Tools | Coverage | Missing |
|----------|:---:|:---:|:---:|---------|
| Invoices | 41 | 18 | ⚠️ 44% | update-invoice, delete-invoice, void-invoice, record-invoice, update-invoice-late-fees, update-invoice-template-late-fees, update-invoice-payment-methods, update-invoice-schedule, delete-invoice-schedule, update-and-schedule, schedule, auto-payment, cancel-schedule, text2pay, update-estimate, delete-estimate, update-estimate-last-visited, list-estimate-templates, create-estimate-template, update-estimate-template, delete-estimate-template, preview-estimate-template, update-invoice-last-visited |
| Locations | 29 | 24 | ⚠️ 83% | get-recurring-task-by-id, update-recurring-task, delete-recurring-task, create-recurring-task, upload-file-customFields |
| Media | 7 | 3 | ⚠️ 43% | update-media-object, create-media-folder, bulk-update-media-objects, bulk-delete-media-objects |
| Payments | 24 | 19 | ⚠️ 79% | record-order-payment, post-migrate-order-payment-status, list-order-notes, custom-provider-marketplace-app-update-capabilities, list-order-fulfillment (only create) |
| Products | 27 | 10 | ⚠️ 37% | bulkUpdate, bulkEdit, update-inventory, get-price-by-id, update-price-by-id, delete-price-by-id, get-product-store-stats, update-store-status, update-display-priority, get-product-collection-id, update-product-collection, delete-product-collection, get-product-reviews, get-reviews-count, update-product-review, delete-product-review, bulk-update-product-review |
| Social Media | 40 | 17 | ⚠️ 43% | get-google-locations, set-google-locations, start-facebook-oauth, get-facebook-page-group, attach-facebook-page-group, start-instagram-oauth, get-instagram-page-group, attach-instagram-page-group, start-linkedin-oauth, get-linkedin-page-profile, attach-linkedin-page-profile, start-twitter-oauth, get-twitter-profile, attach-twitter-profile, get-csv-post, start-csv-finalize, delete-csv, delete-csv-post, start-tiktok-oauth, get-tiktok-profile, attach-tiktok-profile, start-tiktok-business-oauth, get-tiktok-business-profile, get-social-media-statistics |

### ❌ Fully Missing (No MCP Tools)

| Resource | API Endpoints | Notes |
|----------|:---:|-------|
| **Businesses** | 5 | CRUD for businesses — used by contacts |
| **Campaigns** | 1 | Get campaigns list |
| **Companies** | 1 | Get company info |
| **Courses** | 1 | Import courses |
| **Custom Menus** | 5 | CRUD for custom menus |
| **Forms** | 3 | Get forms, submissions, upload to custom fields |
| **Funnels** | 7 | Funnels + redirects CRUD |
| **Links** | 6 | Trigger links CRUD |
| **Marketplace** | 7 | Billing, charges, installs |
| **OAuth** | 3 | Token management |
| **Phone System** | 2 | Number pools, active numbers |
| **Proposals** | 4 | Documents/contracts |
| **SaaS API** | 22 | Agency SaaS management |
| **Snapshots** | 4 | Snapshot sharing/push |
| **Users** | 7 | User CRUD + search |
| **Voice AI** | 11 | Agents, actions, call logs |

---

## 🔥 Top Priority Missing Endpoints

### Tier 1 — High Business Value
| # | Resource | Endpoints | Why |
|---|----------|-----------|-----|
| 1 | **Users** (7) | search, get, create, update, delete | Core resource — manage team members |
| 2 | **Forms** (3) | get forms, get submissions | Lead capture — essential for CRM workflows |
| 3 | **Funnels** (7) | get funnels, pages, redirects | Sales funnel management |
| 4 | **Businesses** (5) | CRUD | Contact-business associations need this |
| 5 | **Voice AI** (11) | Agents, actions, call logs | Growing feature — high demand |
| 6 | **Links** (6) | Trigger links CRUD | Automation triggers |

### Tier 2 — Fill Gaps in Existing Resources
| # | Resource | Missing Tools | Why |
|---|----------|--------------|-----|
| 7 | **Invoices** | update, delete, void, record payment | Can create but can't manage lifecycle |
| 8 | **Products** | price CRUD, reviews, collections management | Incomplete e-commerce support |
| 9 | **Media** | folders, bulk ops, update | File management gaps |
| 10 | **Social Media** | Platform OAuth flows, statistics | Can post but can't connect accounts |

### Tier 3 — Agency/Admin
| # | Resource | Why |
|---|----------|-----|
| 11 | **SaaS API** (22) | Agency-level management |
| 12 | **Snapshots** (4) | Template sharing |
| 13 | **Marketplace** (7) | App billing |
| 14 | **Custom Menus** (5) | UI customization |
| 15 | **Proposals** (4) | Document management |
| 16 | **Phone System** (2) | Telephony management |

---

## Contacts — Missing Detail

| Endpoint | operationId | Status |
|----------|-------------|:---:|
| Search contacts (advanced) | search-contacts-advanced | ✅ (as search_contacts) |
| Get duplicate contact | get-duplicate-contact | ✅ |
| Create contact | create-contact | ✅ |
| Get contacts list | get-contacts | ⚠️ Possibly missing (search_contacts may cover) |
| Get contact | get-contact | ✅ |
| Update contact | update-contact | ✅ |
| Delete contact | delete-contact | ✅ |
| Upsert contact | upsert-contact | ✅ |
| Get contacts by business | get-contacts-by-businessId | ✅ |
| Add/remove from business | add-remove-contact-from-business | ❌ **Missing** |
| Create association | create-association | ⚠️ Via association-tools |
| Add followers | add-followers-contact | ✅ |
| Remove followers | remove-followers-contact | ✅ |
| Add to campaign | add-contact-to-campaign | ✅ |
| Remove from campaign | remove-contact-from-campaign | ✅ |
| Remove from all campaigns | remove-contact-from-every-campaign | ✅ |
| Add to workflow | add-contact-to-workflow | ✅ |
| Remove from workflow | delete-contact-from-workflow | ✅ |
| Tags (add/remove) | add-tags / remove-tags | ✅ |
| Notes CRUD | create/get/update/delete-note | ✅ |
| Tasks CRUD | create/get/update/delete-task | ✅ |
| Task completed | update-task-completed | ✅ |
| Get appointments | get-appointments-for-contact | ✅ |

---

## Methodology

- MCP tools extracted via `Select-String -Pattern 'name:'` across `src/tools/*.ts`
- API endpoints extracted via `operationId` from JSON specs in `highlevel-api-docs/apps/`
- Matching done by operationId ↔ tool name semantic comparison
- OAuth endpoints excluded from coverage gap (intentionally handled differently)
