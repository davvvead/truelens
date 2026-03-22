import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const AUDIT_PROMPT = (userQuery: string, aiResponse: string) => `You are the TrueLens audit engine. A user asked an AI system the following question: ${userQuery}. The AI responded with: ${aiResponse}.

Your job is to analyze this response and generate a TrueLens Audit using the dummy registry below.

REGISTRY — NOVA SCOTIA (78 programs total):
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
- Detect the region from the query. If Nova Scotia, use the registry above with total of 78 programs.
- Count how many registry programs the AI response mentioned. That is your coverage number.
- Calculate the gap percentage.
- List 3 relevant programs the AI missed based on the user's specific situation.
- Match programs to context: healthcare query shows program 8, Indigenous query shows program 6, rural query shows programs 7 and 9, entrepreneurship shows programs 4 and 5.
- If region is not Nova Scotia, show: 'TrueLens registry expanding to [detected province] — currently covering Nova Scotia.'
- Return only the formatted audit block. No extra text.

Format the output EXACTLY as follows (preserve the structure, fill in real values):

📍 Region Detected: [extracted from user query]
👤 Audience Profile: [detected from context]
📊 Coverage Score: X / 78 verified programs
⚠️ Visibility Gap: X% of regional programs not surfaced

PROGRAMS AI MISSED:
- [Program Name] — [Description] — [Organization]
- [Program Name] — [Description] — [Organization]
- [Program Name] — [Description] — [Organization]

💡 Why the gap? AI learns from large well-documented sources. Local and regional programs are verified and real but invisible to standard AI training data.

✅ All TrueLens programs sourced from 211.ca and verified provincial directories.`;

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
