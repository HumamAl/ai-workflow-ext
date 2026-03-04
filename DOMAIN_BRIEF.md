# Domain Knowledge Brief — AI Browser Extension / Productivity Tool

## Sub-Domain Classification

**AI text-selection Chrome extension** — a Manifest V3 browser extension that intercepts highlighted text from any webpage and routes it to a connected LLM (ChatGPT / OpenAI API). Target users are knowledge workers, developers, researchers, and writers who process large volumes of online content and want AI assistance without leaving their browser context.

This sits at the intersection of:
- **Browser productivity tooling** (extensions used daily in professional workflows)
- **AI assistant / prompt tooling** (products like Merlin, Sider, Monica, HARPA AI)
- **Developer tools / DevX** (the client is a developer building for other power users)

The client is building the core engine of the extension (context menu, DOM capture, ChatGPT routing, retry logic) — the "operator layer" — not a consumer wellness app. The demo should signal technical depth and professional craft.

---

## Job Analyst Vocabulary — Confirmed and Extended

### Confirmed Primary Entity Names

These are the exact terms that must appear in every UI label — sidebar nav, table headers, KPI card titles, status badges, search placeholders.

- **Primary record type**: "prompt" (not "message", not "request") — the unit of work a user sends
- **Interaction event**: "query" or "run" — a single activation of the extension against a selection
- **Text input**: "selection" or "highlighted text" — the raw DOM text captured
- **Output**: "response" or "completion" — what comes back from the LLM
- **Grouped prompts**: "workflow" — a saved multi-step prompt chain
- **Saved reusable prompt**: "template" or "prompt template"
- **Extension entry point**: "trigger" — context menu item, toolbar icon, keyboard shortcut
- **Background process**: "service worker" (Manifest V3 term — not "background script")
- **Injected page code**: "content script"
- **Extension popup UI**: "popup" or "action panel"
- **Browser-side storage**: "extension storage" (chrome.storage.sync or chrome.storage.local)

### Expanded KPI Vocabulary

| KPI Name | What It Measures | Typical Format |
|---|---|---|
| Queries Sent | Total prompts dispatched to OpenAI this period | count |
| Success Rate | % of queries that returned a valid response | % |
| Avg Response Time | Mean latency from send to first token received | ms or seconds |
| Tokens Used | Total OpenAI tokens consumed (input + output) | count (e.g., 142,840) |
| Retry Rate | % of queries requiring at least one retry | % |
| Error Rate | % of queries that failed after all retry attempts | % |
| Active Days | Days in period when the extension was used | count |
| Templates Saved | Reusable prompt templates stored by user | count |
| Workflows Triggered | Context menu / shortcut activations | count |
| Selection Length (avg) | Average characters in captured text selections | characters |
| Daily Active Triggers | Average queries per active day | count/day |
| API Cost (estimated) | OpenAI API spend estimated from token usage | $ (e.g., $0.043) |

### Status Label Vocabulary

These go directly into data tables, badges, and filter dropdowns.

**Active states:**
- `Running` — query is in-flight to OpenAI
- `Streaming` — response is actively streaming back
- `Retrying` — failed attempt, exponential backoff in progress
- `Queued` — waiting for rate limit window to reset

**Completion states:**
- `Completed` — valid response received
- `Cached` — served from extension storage cache (no API call)

**Problem states:**
- `Rate Limited` — hit OpenAI TPM or RPM ceiling (HTTP 429)
- `Timeout` — exceeded max wait (30s default)
- `Context Too Large` — selection exceeded token limit
- `Auth Error` — invalid or expired API key
- `Failed` — all retry attempts exhausted

**Configuration states:**
- `Draft` — prompt template saved but not assigned to trigger
- `Active` — template assigned to context menu or shortcut
- `Disabled` — template exists but trigger is turned off

### Workflow and Action Vocabulary

**Primary actions:**
- `Send to ChatGPT` — the core trigger action
- `Run Workflow` — execute a saved multi-step prompt chain
- `Save as Template` — persist a prompt for reuse
- `Copy Response` — one-click copy of completion to clipboard
- `Retry` — manually re-trigger a failed query
- `Clear History` — wipe session logs from extension storage

**Secondary actions:**
- `Pin Template` — pin frequently used templates to quick-access bar
- `Export History` — download query log as JSON/CSV
- `Test Prompt` — dry-run a template against placeholder text
- `Assign Shortcut` — bind template to keyboard shortcut or context menu item
- `Fork Template` — duplicate a template for editing
- `Toggle Streaming` — enable/disable streamed response display

### Sidebar Navigation Candidates

Domain-specific nav using extension/AI vocabulary (not generic labels):

1. **Dashboard** — (acceptable here — the builder genuinely needs a home metrics view)
2. **Query History** — log of all past runs with status, latency, tokens
3. **Prompt Templates** — saved reusable prompts with trigger assignments
4. **Workflows** — multi-step automation chains
5. **Usage & Tokens** — API cost tracking, daily token burn, rate limit headroom
6. **Settings / API Config** — model selection, API key vault, retry config
7. **Activity Feed** — real-time stream of extension events (optional premium tier)

---

## Design Context — Visual Language of This Industry

### What "Premium" Looks Like in This Domain

Browser extension developers and power-user productivity tools occupy a specific visual niche: **precision-tool aesthetic**. The users of extensions like Merlin, Sider, and HARPA AI are not casual consumers — they are developers, researchers, and knowledge workers who work in VS Code, terminal, and Notion all day. They have internalized the visual language of tools like Raycast, Linear, and Vercel's dashboard: clean, dark-capable, monospaced data values, minimal chrome, sharp edges or subtle rounding.

The popup UI of a Chrome extension has hard constraints: 800px max width, typically 380-480px wide and 500-580px tall. This means every pixel is intentional. Extensions that look premium have: a consistent 8px grid, tight typographic hierarchy, subtle separators instead of heavy borders, color used sparingly (only for status, not decoration), and icon + label nav that collapses gracefully.

For a **management dashboard** demo (the web app showing analytics for the extension), the aesthetic should mirror what developers building tools expect: something that feels like Vercel's dashboard, Linear's project view, or Raycast's command palette parent app — clean, dense data visualization, dark or neutral background, blue/purple/indigo accent that reads as "AI/tech", monospaced fonts for token counts and latency values.

Dark mode is not a feature for this audience — it is a baseline expectation. Both the popup mockup and the management dashboard should offer or default to dark. Extensions that don't support dark mode read as amateur to this demographic.

### Real-World Apps Clients Would Recognize as "Premium"

1. **Merlin (getmerlin.in)** — 1M+ users, keyboard-shortcut-first, clean sidebar with model selector at top, dark default, prompt history in a scrollable feed. The "pro" tier unlocks more daily queries — token/quota tracking is visible in the popup. Users consider it clean and fast.

2. **Sider AI** — the most visually polished of the AI sidebar extensions. Opens as a persistent right-side panel (not a popup). Has tab-style navigation inside the panel: Chat, Translate, Summarize, Prompts. Monochromatic dark with a subtle blue accent. The model selector is a dropdown at the top. Response is streamed with a blinking cursor. It reads like a mini VS Code panel embedded in the browser.

3. **HARPA AI** — more feature-dense, used by automation-focused power users. Has a "command" concept with 100+ pre-configured commands. UI is sidebar-based, with a command palette-style search for selecting commands. Darker, denser than Sider. Practitioner audience considers this the "serious" option.

4. **Raycast (desktop, not extension)** — relevant because the UI language of command-palette productivity tools has diffused into the browser extension space. Developers who use Raycast expect the same: type-to-filter, keyboard-first, minimal chrome, dark + accent color, instant feedback.

### Aesthetic Validation

The demo requires two contexts:
1. **The popup UI mockup** (what the extension looks like when clicked in the toolbar — a small-screen representation)
2. **The management dashboard** (a web app showing query analytics, prompt library, usage/cost tracking — `dashboard-app` format)

- **For the popup**: Dark Premium is the right call. The popup should feel like Sider or Merlin — dark surface, subtle borders, streaming response display, token count in footer, compact and precise.
- **For the dashboard**: Linear / Minimal with Dark Premium accents. Think Vercel analytics — clean, card-based, with a dark sidebar and crisp data typography. Not heavy corporate enterprise, not consumer-warm.

**Recommended aesthetic**: `dark-premium` with Linear/Minimal density conventions
**Adjustment**: Confirm dark-premium — this audience lives in dark mode dev tools all day. A light-mode dashboard would read as a consumer app, not a developer tool. Use near-black with electric blue/indigo accent.

### Format Validation

The job describes a Chrome extension (popup + context menu) with supporting developer workflow. Two likely demo formats:

- **If the Team Lead chose `dashboard-app`**: Confirmed — a management dashboard with sidebar navigation showing query history, usage stats, and prompt templates is the right format. The popup can be shown as an embedded device mockup within the dashboard as a "preview" element.
- **If the Team Lead chose `mobile-app-preview`**: Flag — a phone frame doesn't match a Chrome extension popup. Use a custom narrow browser-window mockup (375px wide x 560px tall) that represents the extension popup. Or combine: sidebar dashboard with an embedded "Extension Preview" panel showing the popup UI.

**Format-specific notes for Demo Screen Builder**: The primary chart should be "Queries per day" as a bar chart (not area — this is operational volume, not trend). The hero stat card should be "Queries Today" or "Success Rate". Include a real-time-style activity feed showing the last 10 query events with status badges. The popup mockup should show a dark panel with a text selection snippet at top, model selector, prompt template picker, and a "Send to ChatGPT" button with a streaming response animation.

### Density and Layout Expectations

**Density**: Standard-to-compact. This is a developer tool — no excessive whitespace. Use compact content padding, tight nav items, but generous whitespace around stat cards.

**View types**: Mix of list-heavy (Query History table, Prompt Templates list) and card-based (KPI cards on dashboard, template cards). The Query History table is the primary power-user view — it needs: query ID, selection preview (truncated), model, status badge (color-coded), tokens used, response time, timestamp.

---

## Entity Names (10+ realistic names)

### Extension / Product Names (Competitor / Market Context)
Used in marketing copy and competitive references:
- Merlin AI
- Sider AI
- Monica AI
- HARPA AI
- Promptmatic
- AI Prompt Genius
- Superpower ChatGPT
- Glarity
- Compose AI
- TextBlaze

### Realistic Tool / Product Identity Names (for mock data — the extension being built)
Use these as the product name in the demo:
- ContextAI
- QuickPrompt
- SelektAI
- BrowseGPT
- CaptureAI
- PromptLift
- TextFlow AI
- Clipwise

### User Names (developer / knowledge worker demographic)
- Ethan Kowalski (Developer)
- Priya Menon (Product Manager)
- Marco Delgado (Technical Writer)
- Sophie Andersen (Research Analyst)
- James Whitfield (Content Strategist)
- Kenji Mori (Data Engineer)
- Rachel Goldstein (UX Researcher)
- Carlos Ruiz (Marketing Lead)
- Nadia Osei (Frontend Developer)
- Tom Breckenridge (Founder / Solo operator)

### Prompt Template Names (14+ realistic)
- Summarize in 3 bullets
- Explain like I'm a developer
- Find counterarguments
- Extract action items
- Translate to formal tone
- Rewrite for LinkedIn
- Debug this error
- Simplify for non-technical reader
- Generate follow-up questions
- Compare and contrast
- TL;DR this article
- Key takeaways
- Find logical gaps
- Convert to checklist

### Model Names (realistic mock data values)
- `gpt-4o`
- `gpt-4o-mini`
- `gpt-4-turbo`
- `gpt-3.5-turbo`
- `claude-3-5-sonnet-20241022`
- `gemini-1.5-pro`

---

## Realistic Metric Ranges

| Metric | Low | Typical | High | Notes |
|--------|-----|---------|------|-------|
| Queries per day (active user) | 4 | 18 | 64 | Power users run 50+ on research-heavy days |
| Success rate | 91% | 97.3% | 99.2% | Failures mostly rate limits or context too large |
| Avg response latency | 820ms | 1,840ms | 6,200ms | Streaming first-token is faster; gpt-4o-mini is fastest |
| Tokens per query (input) | 80 | 340 | 2,800 | Depends on selection length + system prompt |
| Tokens per query (output) | 120 | 480 | 1,600 | Template-dependent |
| Retry rate | 1.2% | 4.7% | 11% | Spikes during OpenAI incidents or high-traffic periods |
| Templates saved | 2 | 11 | 47 | Power users build personal prompt libraries |
| Daily API cost (individual) | $0.004 | $0.031 | $0.18 | gpt-4o-mini is ~30x cheaper than gpt-4o |
| Monthly API cost (individual) | $0.12 | $0.94 | $5.40 | Typical hobbyist/professional user |
| Selection character length | 45 | 620 | 4,200 | Long articles trigger context-too-large errors |
| Active days per month | 8 | 19 | 30 | Daily users vs occasional users |
| Extension install to first query | 2 min | 8 min | 45 min | Friction point: API key setup |

---

## Industry Terminology Glossary

| Term | Definition | Usage Context |
|------|-----------|---------------|
| Manifest V3 (MV3) | The current extension platform version mandated by Chrome since June 2023. Replaced background pages with service workers. | Technical context; signals the developer is using the current standard |
| Service Worker | The background script in MV3 — ephemeral, event-driven, cannot hold persistent in-memory state | Architecture diagrams, challenge cards |
| Content Script | JavaScript injected into the active web page — the code that captures the user's text selection from the DOM | Core mechanism of the extension |
| Popup | The small UI panel that appears when the user clicks the extension's toolbar icon. Typically 380x540px | UI component naming |
| Context Menu | Right-click menu items added by the extension via chrome.contextMenus API | Primary trigger mechanism for the job |
| Background Handler | The service worker that receives messages from content scripts, calls the OpenAI API, and relays responses | Architecture layer |
| Message Passing | The chrome.runtime.sendMessage / onMessage pattern for communication between content scripts and service workers | Core MV3 pattern |
| chrome.storage | Browser-native key-value store. .sync = synced across devices; .local = device-only | Data persistence layer |
| Exponential Backoff | Retry strategy: wait 1s, then 2s, 4s, 8s after each failure. With random jitter to prevent thundering herd | Retry mechanism for API failures |
| TPM / RPM | Tokens Per Minute / Requests Per Minute — OpenAI rate limit units. Free tier: 40,000 TPM / 3 RPM | Rate limit context |
| HTTP 429 | "Too Many Requests" — the error code returned when a rate limit is hit. Triggers retry mechanism | Error handling vocabulary |
| Streaming | The Server-Sent Events (SSE) pattern where OpenAI sends tokens incrementally. stream: true in the API call | UX feature for responsive feel |
| System Prompt | A hidden instruction prepended to every query that sets the AI's behavior — not visible to end users | Template architecture |
| Context Window | The maximum tokens (input + output) that a model can handle in one call. gpt-4o: 128K tokens | Limits/edge case context |
| Prompt Injection | A risk where malicious page content hijacks the extension's prompts via the selected text | Security challenge |
| CSP | Content Security Policy — browser security rule restricting what scripts an extension can load | Security/compliance context |

---

## Common Workflows

### Workflow 1: Text Selection to ChatGPT Response (Core)
1. User highlights text on any web page
2. User right-clicks — extension adds "Send to ChatGPT" item (or submenus per template)
3. Content script captures the selected text via window.getSelection()
4. Content script sends message to service worker via chrome.runtime.sendMessage
5. Service worker retrieves API key from chrome.storage.sync
6. Service worker constructs the prompt: system prompt + selection as user message
7. Service worker calls OpenAI Chat Completions API (gpt-4o or configured model)
8. On HTTP 429: exponential backoff retry (up to 3 attempts)
9. Response streams back via SSE or arrives as single payload
10. Service worker sends response to content script or popup
11. Response appears in overlay on page, in popup, or is copied to clipboard
12. Query logged to chrome.storage.local with metadata (tokens, latency, status)

### Workflow 2: Prompt Template Management
1. User opens extension popup
2. User navigates to Templates tab
3. User creates new template: name, system instruction, model override, output action
4. Template saved to chrome.storage.sync (syncs across devices)
5. User assigns template to: a context menu submenu item OR a keyboard shortcut
6. On trigger: content script captures selection, service worker uses this template's config
7. User can edit, disable, delete, or fork templates

### Workflow 3: Usage Review and Cost Monitoring
1. User opens extension popup or web dashboard
2. Views: daily query count, tokens used today vs. budget cap, estimated API cost
3. User can set a daily token budget — extension warns when 80% consumed
4. Query history table shows each run: timestamp, selection preview, template, model, tokens, status
5. User can replay/rerun any past query with the same selection
6. Export history as JSON for external analysis

---

## Common Edge Cases

1. **Rate limit hit (HTTP 429)** — User runs multiple queries rapidly, hits OpenAI RPM limit. Extension queues, retries with backoff, shows "Retrying..." status badge.
2. **Context too large** — User selects an entire long article (10,000+ chars). Selection exceeds model's context window when combined with system prompt. Extension truncates and warns user.
3. **API key missing or invalid** — First-time user hasn't entered API key, or key has expired. Popup shows inline error: "Configure API key to continue."
4. **Tab switched during streaming** — User switches tabs while response is streaming. Service worker continues; response accessible when user returns or checks history.
5. **Empty selection** — User activates context menu with no text highlighted. Extension shows toast: "No text selected — highlight text first."
6. **DOM changes before script runs** — On dynamic pages (SPAs), selection may be cleared by a re-render before content script captures it. Race condition edge case.
7. **Popup closed mid-stream** — User closes popup while response is streaming. Service worker continues; result saved to history even without active popup.
8. **Offline / network error** — OpenAI API unreachable. Extension shows clear error state rather than indefinite loading indicator.
9. **Duplicate rapid queries** — User double-clicks context menu. Extension deduplicates within a 500ms window to prevent duplicate API calls.

---

## What Would Impress a Domain Expert

1. **MV3 service worker lifecycle awareness** — Service workers are ephemeral (Chrome can terminate them after 30s of inactivity). An informed developer uses chrome.storage for state persistence rather than in-memory variables, and uses event listeners rather than polling. Referencing this in a challenge card signals deep platform knowledge.

2. **Context menu submenus per template** — Rather than one "Send to ChatGPT" item, expert implementations create sub-items per saved template: "Send to ChatGPT > Summarize / Explain / Debug". This is a non-obvious MV3 pattern because context menus must be registered from the service worker's install event.

3. **SSE streaming in a service worker** — Streaming (Server-Sent Events) has specific gotchas in MV3 service workers. The correct approach is using the Fetch ReadableStream API and forwarding chunks to the popup/content script via chrome.tabs.sendMessage in chunks. This is a known pain point in the MV3 migration community.

4. **Cross-origin isolation and CSP** — Chrome extensions operate under a strict Content Security Policy. The manifest.json content_security_policy field must explicitly whitelist OpenAI's API domain. Mentioning this signals awareness of extension security architecture.

5. **The rate limit math** — OpenAI free tier is 3 RPM and 40,000 TPM. Tier 1 (after first $5 payment) jumps to 500 RPM and 200,000 TPM. An extension that serves free-tier users needs conservative retry behavior — a naive retry loop can exhaust the free tier in seconds. Showing exponential backoff with jitter in a challenge card demonstrates real-world API integration experience.

---

## Common Systems and Tools Used

| Tool / System | Role in This Domain |
|---|---|
| Chrome Web Store Developer Dashboard | Publishing, version management, analytics, review management |
| OpenAI API (Chat Completions) | LLM backend — the integration this extension routes to |
| chrome.storage API | Cross-device sync of user settings, API keys, query history, templates |
| chrome.contextMenus API | Right-click context menu registration and event handling |
| chrome.runtime message passing | Content script and service worker and popup communication |
| Plasmo Framework | Modern Chrome extension development framework (React + TypeScript + HMR) |
| WXT (Web Extension Tools) | Alternative to Plasmo — Vite-based, popular in 2025+ |
| Webpack / Vite | Bundling — extensions use these with custom config for MV3 output |
| Sentry (browser extension SDK) | Error monitoring for extensions in production |
| PostHog / Amplitude | Usage analytics injected into extension popup |

---

## Geographic / Cultural Considerations

No specific geographic constraints. The audience is a global developer and knowledge-worker demographic. English-only is standard for V1. UTF-8 character handling matters — selections may contain non-ASCII text, and the extension must handle this without breaking the API call.

---

## Data Architect Notes

- **Primary entity**: `QueryRecord` — each row in query history. Fields: `id` (QRUN-XXXX format), `selectionPreview` (first 80 chars of highlighted text), `templateId`, `model`, `tokensIn`, `tokensOut`, `latencyMs`, `status`, `timestamp`
- **Secondary entity**: `PromptTemplate` — `id` (TPL-XXXX), `name`, `systemPrompt`, `model`, `assignedTrigger` ("context_menu" | "keyboard" | "unassigned"), `usageCount`, `lastUsed`, `createdAt`
- **Chart data**: Daily query volume for last 30 days, daily token usage for last 30 days, success/fail ratio per day
- **Status values**: Use exact strings from the Status Label Vocabulary section above — `"Completed"`, `"Rate Limited"`, `"Timeout"`, `"Context Too Large"`, `"Auth Error"`, `"Retrying"`, `"Failed"`
- **Model field**: Use real model ID strings (`"gpt-4o"`, `"gpt-4o-mini"`) not generic names
- **Response time**: Store as integer milliseconds (1840, not 1.84 or "1.84s")
- **Token counts**: Integers — no decimals. `tokensIn: 340`, `tokensOut: 487`, `tokensTotal: 827`
- **Cost estimate**: Compute from token counts in the UI layer — do not hardcode a cost field. gpt-4o-mini: $0.00015/1K input, $0.0006/1K output (2025 pricing).
- **Edge case records**: Include at least 2 "Rate Limited" records, 1 "Context Too Large", 1 "Auth Error", 1 with tokensIn > 2000 (long selection), 1 with latencyMs > 5000 (slow response)
- **Distribution**: ~82% Completed, 10% Retrying/resolved, 4% Rate Limited, 2% Timeout, 1% Context Too Large, 1% Auth Error

---

## Layout Builder Notes

- **Density**: Compact-to-standard. Developer tool — no excessive whitespace. Use `--content-padding: 1rem`, `--card-padding: 1rem`, `--nav-item-py: 0.375rem`
- **Sidebar width**: 14-15rem — keep it slim like Linear's sidebar
- **Dark theme is essential**: Background should be near-black with a slight cool blue tint. Card surfaces slightly lighter. This is not stylistic — it is what this audience expects from their tooling.
- **Accent color**: Electric blue-indigo. This is the universal AI-tools color language. Sider uses blue, Merlin uses blue-purple, Vercel uses blue. Avoid green (reads as finance) or orange (reads as enterprise/legacy).
- **Monospace for data values**: Token counts, latency, query IDs should render in Geist Mono. This is an intentional signal to developer audiences — it says "precision tool, not consumer app."
- **Status badges**: Color-coded are mandatory. Green = Completed, Amber = Retrying, Red = Failed/Rate Limited, Gray = Queued. Using gray for all statuses reads as unfinished.
- **Visual pattern to know**: Query history tables in this space always show a colored left-border or status dot on the row — copy this from Linear or Datadog's log viewer pattern.

---

## Demo Screen Builder Notes

- **Hero metric (largest stat card)**: "Queries Today" — the number the user checks every day
- **Second stat card**: "Success Rate" — shown as a large % with a subtle green or red delta indicator
- **Third stat card**: "Tokens Used Today" — in compact monospace: `14,820 / 50,000` (with budget denominator)
- **Fourth stat card**: "Avg Response Time" — `1.84s` in monospace
- **Primary chart**: Bar chart — "Daily Query Volume" (last 14 days). Bar chart reads as operational volume; area/line reads as trend. This is a DevOps/operational audience — they prefer discrete-day bars.
- **Secondary chart**: Stacked bar or donut — "Queries by Status" (Completed / Retrying / Failed). Shows reliability at a glance.
- **Domain-specific panel that would impress a practitioner**: An **Activity Feed** — real-time log of last 10 query events with: query ID, selection preview (truncated), model chip, status badge, time ago. This is the single UI element that makes an extension management dashboard feel authentic. It mimics Datadog's event stream and Vercel's deployment feed.
- **For the popup preview element** (if including one in the dashboard): Show a narrow dark panel (~360px wide) with: URL/page context header, selected text preview in a dimmed box, model selector dropdown, prompt template selector, "Send to ChatGPT" primary button, and a streaming response area. This is the exact structure practitioners would recognize from Merlin and Sider.
- **Chart colors**: Harmonize to the blue-indigo primary. Use slightly muted blue for "Completed", amber for "Retrying", red-orange for "Failed".
