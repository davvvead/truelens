import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const AUDIT_PROMPT = (userQuery: string, aiResponse: string) => `You are the TrueLens audit engine. A user asked an AI system the following question: ${userQuery}. The AI responded with: ${aiResponse}.

Your job is to analyze this response and generate a TrueLens Audit using the registry below.

FULL REGISTRY — NOVA SCOTIA (78 programs total):
1. ISANS Bridge to Employment — Newcomer employment support — ISANS
2. Nova Scotia Works — Province-wide employment services — Government of Nova Scotia
3. Cape Breton Local Immigration Partnership — Regional settlement — CBRM
4. Futurpreneur Canada Atlantic — Startup funding ages 18-39 — Futurpreneur
5. ACOA Atlantic Entrepreneurship Fund — Business grants — ACOA
6. Mi'kmaw Employment Training — Indigenous skills training — Mi'kmaw Native Friendship Centre
7. Fisheries Reskilling Initiative — Coastal worker trades training — Cape Breton Employment Services
8. Internationally Trained Nurses Bridging Program — Healthcare credential recognition — NSHA
9. Rural Business Development Grant — Rural entrepreneur support — NS Department of Agriculture
10. Halifax Connector Program — Professional newcomer networking — Halifax Partnership
11. Nova Scotia Nominee Program — Provincial immigration pathway — Government of Nova Scotia
12. Inspires Program — Disability employment support — Autism Nova Scotia

INSTRUCTIONS:
Step 1 — Detect the region and audience from the query.
Step 2 — Filter the registry to only programs relevant to this specific query (region, audience, goal). Count how many are relevant — that is your RELEVANT_COUNT.
Step 3 — Count how many of those relevant programs the AI response actually mentioned. That is your SURFACED_COUNT.
Step 4 — Calculate: COVERAGE_PCT = round(SURFACED_COUNT / RELEVANT_COUNT * 100, 1). MISSED_COUNT = RELEVANT_COUNT - SURFACED_COUNT.
Step 5 — Identify the 3 most impactful relevant programs the AI missed for the top section.
Step 6 — If region is not Nova Scotia, show: 'TrueLens registry expanding to [detected province] — currently covering Nova Scotia.'
Return only the formatted audit block. No extra text.

Format the output EXACTLY as follows:

📍 Region Detected: [extracted from user query]
👤 Audience Profile: [detected from context]
📊 Coverage Score: SURFACED_COUNT / RELEVANT_COUNT relevant programs — COVERAGE_PCT%
⚠️ Visibility Gap: MISSED_COUNT relevant programs not surfaced
🗂️ TrueLens Nova Scotia Registry: 78 verified programs | Last updated March 2026

WHAT AI GOT RIGHT
[1-2 sentences on what the AI response covered accurately]

WHERE AI FAILED YOU

❌ [Gap category 1]
[Explanation]
- [Missed program] — [Description] — [Organization]

❌ [Gap category 2]
[Explanation]
- [Missed program] — [Description] — [Organization]

TOP PROGRAMS YOU WERE NOT SHOWN:
- [Program Name] — [Why directly relevant to this person] — [Organization]
- [Program Name] — [Why directly relevant to this person] — [Organization]
- [Program Name] — [Why directly relevant to this person] — [Organization]

💡 Why the gap? AI learns from large well-documented sources. Local and regional programs are verified and real but structurally invisible to standard AI training data.

✅ All TrueLens programs sourced from 211.ca and verified provincial directories.

[See all MISSED_COUNT missing programs →]`;

export async function POST(req: NextRequest) {
    try {
        const { userQuery, aiResponse } = await req.json();

        if (!userQuery || !aiResponse) {
            return NextResponse.json(
                { error: "Missing userQuery or aiResponse" },
                { status: 400 }
            );
        }

        const client = new Anthropic({
            apiKey: process.env.ANTHROPIC_API_KEY,
        });

        const msg = await client.messages.create({
            model: "claude-sonnet-4-6",
            max_tokens: 1024,
            messages: [
                {
                    role: "user",
                    content: AUDIT_PROMPT(userQuery, aiResponse),
                },
            ],
        });

        const block = msg.content[0];
        const auditText = block.type === "text" ? block.text : "";

        return NextResponse.json({ audit: auditText });
    } catch (error: unknown) {
        console.error("Audit API error:", error);
        const message =
            error instanceof Error ? error.message : "Internal server error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
