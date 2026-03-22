# TrueLens

**TrueLens** audits AI responses for Canadian regional blind spots — surfacing the programs, resources, and opportunities that AI models consistently miss.

AI assistants are trained on internet-scale data but that data skews toward large metros, US-centric content, and well-indexed national programs. Regional programs at the provincial and municipal level — the ones that are actively funded, accepting applicants, and designed for specific communities — rarely appear. TrueLens runs a second layer of analysis on any AI response and flags exactly what was left out, with source attribution and verified program listings.

---

## What It Does

1. **Ask a question** — type any query about programs, supports, or opportunities in Canada
2. **Choose your model** — compare responses from GPT 5.3, Claude Sonnet 4.6, or Gemini 3.0
3. **Get the audit** — TrueLens scores each response against a verified regional program registry and surfaces the gaps
4. **Submit a program** — community members can add missing programs to the TrueLens registry

---

## Demo Scenario

The active demo scenario is:

> *"What programs help internationally trained nurses in Nova Scotia?"*

This triggers a full simulation with distinct AI responses and TrueLens audits for each model, including:

- Coverage scores against 78 verified regional programs
- Specific missed programs with descriptions and organizations
- Gap explanations covering financial support, rural placements, employment matching, and outdated information
- Source attribution to 211.ca, Nova Scotia Health Authority directories, and verified provincial registries

All responses are simulated locally — no API calls are made at runtime.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (static export) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Runtime | React 19 |
| Deployment | Netlify |

---

## Project Structure

```
app/                  Next.js app router pages
components/
  TrueLens/
    Chat/             Main two-column interface (chat + audit)
    AuditPanel/       Structured audit renderer
    ResponseRenderer/ Rich AI response formatter
    ModelSelector/    GPT / Claude / Gemini switcher
    Banner/           Top header banner
    SubmitModal/      Community program submission form
  Sidebar/            TrueLens-branded sidebar with chat history
  Header/             Top navigation
data/
  scenarios.ts        All simulated scenario content
public/               Static assets
```

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To build for production:

```bash
npm run build   # outputs to /out
```

---

## Deployment

Configured for Netlify static hosting via `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "out"
```

Push to your connected repo and Netlify will build and deploy automatically.

---

## Community Program Submissions

Users can submit missing programs via the **Add your program** button in the audit panel. Submissions are saved to `localStorage` under the key `truelens_submissions` and include organization name, program name, region, target audience, description, source URL, and contact email.

---

## Adding New Scenarios

Edit `data/scenarios.ts` to add new scenarios. Each scenario requires:

```typescript
{
  id: string,
  keywords: string[],       // triggers this scenario when matched
  question: string,         // displayed above the response
  responses: {
    "gpt-5.3": string,
    "claude-sonnet-4-6": string,
    "gemini-3.0": string,
  },
  audits: {
    "gpt-5.3": string,
    "claude-sonnet-4-6": string,
    "gemini-3.0": string,
  }
}
```

Unmatched queries fall back to a default response explaining that TrueLens is expanding its scenario coverage.

---

## Audit Text Formatting

Audit strings use a lightweight line-based markup interpreted by `AuditPanel`:

| Prefix | Renders as |
|---|---|
| `📍` `👤` `📊` `⚠️` | Teal label + white value |
| `WHAT ...` / `WHERE ...` | Teal bold section header |
| `❌ ...` | Red icon + white bold heading |
| `- Name — Desc — Org` | Styled program bullet |
| `💡 ...` | Dark callout box |
| `✅ ...` | Small grey-teal source note |
| `──` | Horizontal divider |

---
