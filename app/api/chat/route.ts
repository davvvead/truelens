import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
    try {
        const { message, model } = await req.json();

        if (!message || !model) {
            return NextResponse.json(
                { error: "Missing message or model" },
                { status: 400 }
            );
        }

        let responseText = "";

        if (model === "claude-sonnet-4-6") {
            const client = new Anthropic({
                apiKey: process.env.ANTHROPIC_API_KEY,
            });
            const msg = await client.messages.create({
                model: "claude-sonnet-4-6",
                max_tokens: 1024,
                messages: [{ role: "user", content: message }],
            });
            const block = msg.content[0];
            responseText = block.type === "text" ? block.text : "";
        } else if (model === "gpt-4o") {
            const openai = new OpenAI({
                apiKey: process.env.OPENAI_API_KEY,
            });
            const completion = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [{ role: "user", content: message }],
                max_tokens: 1024,
            });
            responseText = completion.choices[0]?.message?.content || "";
        } else if (model === "gemini-1.5-pro") {
            const genAI = new GoogleGenerativeAI(
                process.env.GOOGLE_API_KEY || ""
            );
            const geminiModel = genAI.getGenerativeModel({
                model: "gemini-1.5-pro",
            });
            const result = await geminiModel.generateContent(message);
            responseText = result.response.text();
        } else {
            return NextResponse.json(
                { error: "Unknown model" },
                { status: 400 }
            );
        }

        return NextResponse.json({ response: responseText });
    } catch (error: unknown) {
        console.error("Chat API error:", error);
        const message =
            error instanceof Error ? error.message : "Internal server error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
