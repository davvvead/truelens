"use client";

import { useState, useRef, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import ModelSelector from "@/components/TrueLens/ModelSelector";
import AuditPanel from "@/components/TrueLens/AuditPanel";
import ResponseRenderer from "@/components/TrueLens/ResponseRenderer";
import scenarios, { type ModelId } from "@/data/scenarios";

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
    model?: string;
};

const MODEL_LABELS: Record<string, string> = {
    "gpt-5.3": "GPT 5.3",
    "claude-sonnet-4-6": "Sonnet 4.6",
    "gemini-3.0": "Gemini 3.0",
};

const MODEL_COLORS: Record<string, string> = {
    "gpt-5.3": "bg-[#19c37d]/10 text-[#0f8a55] border border-[#19c37d]/20",
    "claude-sonnet-4-6": "bg-[#c9a05c]/10 text-[#a07840] border border-[#c9a05c]/20",
    "gemini-3.0": "bg-[#4285f4]/10 text-[#2a6dd9] border border-[#4285f4]/20",
};

/** Simulate a realistic network delay between min–max ms */
const delay = (min: number, max: number) =>
    new Promise((res) => setTimeout(res, min + Math.random() * (max - min)));

/** Find a scenario whose keywords match the query. Returns null if none found. */
const matchScenario = (query: string) => {
    const lower = query.toLowerCase();
    return (
        scenarios.find((s) =>
            s.keywords.some((kw) => lower.includes(kw))
        ) ?? null
    );
};

const FALLBACK_RESPONSE = `I can help with questions about Canadian programs and opportunities.

For the best TrueLens experience, try asking:

"What programs help internationally trained nurses in Nova Scotia?"

This will trigger a full simulated response with a TrueLens audit showing what each AI model missed.`;

const FALLBACK_AUDIT = `📍 Region Detected: Not determined
👤 Audience Profile: General
📊 Coverage Score: 0 / 78 verified programs
⚠️ Visibility Gap: 100% of regional programs not surfaced

PROGRAMS AI MISSED:
- Nova Scotia Works — Province-wide employment services — Government of Nova Scotia
- ISANS Bridge to Employment — Newcomer employment support — ISANS
- Futurpreneur Canada Atlantic — Startup funding ages 18-39 — Futurpreneur

💡 Why the gap? AI learns from large well-documented sources. Local and regional programs are verified and real but invisible to standard AI training data.

✅ All TrueLens programs sourced from 211.ca and verified provincial directories.`;

const TrueLensChat = () => {
    const [model, setModel] = useState<ModelId>("gpt-5.3");
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState("");
    const [chatLoading, setChatLoading] = useState(false);
    const [auditLoading, setAuditLoading] = useState(false);
    const [currentAudit, setCurrentAudit] = useState<string | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        const trimmed = message.trim();
        if (!trimmed || chatLoading) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: trimmed,
        };

        setMessages((prev) => [...prev, userMsg]);
        setMessage("");
        setChatLoading(true);
        setCurrentAudit(null);

        // Simulate AI response delay (1.2–2.1 s)
        await delay(1200, 2100);

        const scenario = matchScenario(trimmed);
        const aiResponse = scenario
            ? scenario.responses[model]
            : FALLBACK_RESPONSE;

        const assistantMsg: Message = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: aiResponse,
            model,
        };

        setMessages((prev) => [...prev, assistantMsg]);
        setChatLoading(false);

        // Simulate TrueLens audit delay (0.8–1.4 s)
        setAuditLoading(true);
        await delay(800, 1400);

        const auditText = scenario
            ? scenario.audits[model]
            : FALLBACK_AUDIT;

        setCurrentAudit(auditText);
        setAuditLoading(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="flex gap-4 h-[calc(100vh-13rem)] max-md:flex-col max-md:h-auto">
            {/* ── LEFT: Chat Column ── */}
            <div className="flex flex-col flex-1 min-w-0 rounded-xl border border-stroke-soft-200 bg-white-0 overflow-hidden">
                {/* Chat Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-stroke-soft-200 shrink-0">
                    <div>
                        <div className="text-label-md text-strong-950">
                            TrueLens Chat
                        </div>
                        <div className="text-p-xs text-sub-600 mt-0.5">
                            Ask about Canadian opportunities, programs, or resources
                        </div>
                    </div>
                    <ModelSelector value={model} onChange={(v) => setModel(v as ModelId)} />
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-auto scrollbar-none p-4 space-y-4">
                    {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center py-8">
                            <div className="text-4xl mb-3 opacity-60">🍁</div>
                            <div className="text-label-md text-strong-950 mb-2">
                                Discover What AI Misses
                            </div>
                            <div className="text-p-sm text-sub-600 max-w-sm leading-relaxed">
                                Ask about employment programs, grants, immigration pathways, or
                                community resources in Canada. TrueLens will audit what the AI
                                didn&apos;t show you.
                            </div>
                            <div className="mt-5 flex flex-wrap gap-2 justify-center">
                                {[
                                    { icon: "🩺", text: "What programs help internationally trained nurses in Nova Scotia?" },
                                    { icon: "💼", text: "What grants are available for immigrant entrepreneurs in Ontario?" },
                                    { icon: "🔨", text: "What trades training programs exist for Indigenous youth in Alberta?" },
                                    { icon: "🏠", text: "What housing support exists for refugees in Toronto?" },
                                    { icon: "🌿", text: "What mental health programs exist for Indigenous communities in Northern Ontario?" },
                                ].map(({ icon, text }) => (
                                    <button
                                        key={text}
                                        className="px-4 py-2 rounded-lg border border-[#1a8a9a]/40 bg-[#0d3d4f]/5 text-p-xs text-[#0d3d4f] hover:border-[#1a8a9a] hover:bg-[#0d3d4f]/10 transition-colors text-left font-medium"
                                        onClick={() => setMessage(text)}
                                    >
                                        {icon} {text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                {msg.role === "user" ? (
                                    <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-br-sm bg-[#0d3d4f] text-white text-p-sm leading-relaxed">
                                        {msg.content}
                                    </div>
                                ) : (
                                    <div className="max-w-[90%] space-y-1.5">
                                        {msg.model && (
                                            <span
                                                className={`inline-block px-2 py-0.5 rounded-full text-p-xs ${MODEL_COLORS[msg.model] || ""}`}
                                            >
                                                {MODEL_LABELS[msg.model] || msg.model}
                                            </span>
                                        )}
                                        <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-bg-weak-50 border border-stroke-soft-200">
                                            <ResponseRenderer content={msg.content} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}

                    {chatLoading && (
                        <div className="flex justify-start">
                            <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-bg-weak-50 border border-stroke-soft-200">
                                <div className="flex gap-1 items-center">
                                    <div className="size-1.5 rounded-full bg-sub-600 animate-bounce [animation-delay:0ms]" />
                                    <div className="size-1.5 rounded-full bg-sub-600 animate-bounce [animation-delay:150ms]" />
                                    <div className="size-1.5 rounded-full bg-sub-600 animate-bounce [animation-delay:300ms]" />
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="shrink-0 px-3 py-3 border-t border-stroke-soft-200">
                    <div className="flex items-end gap-2.5 rounded-xl border border-stroke-soft-200 px-3 py-2.5 focus-within:border-[#1a8a9a] transition-colors">
                        <TextareaAutosize
                            ref={textareaRef}
                            className="flex-1 text-p-sm text-strong-950 outline-none resize-none placeholder:text-soft-400 bg-transparent"
                            maxRows={5}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask about programs, grants, or opportunities in Canada..."
                            disabled={chatLoading}
                        />
                        <button
                            className={`shrink-0 size-8 rounded-lg flex items-center justify-center transition-all ${
                                message.trim() && !chatLoading
                                    ? "bg-[#1a8a9a] hover:bg-[#1398ac]"
                                    : "bg-bg-soft-200 cursor-not-allowed"
                            }`}
                            onClick={sendMessage}
                            disabled={!message.trim() || chatLoading}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                className={
                                    message.trim() && !chatLoading
                                        ? "text-white"
                                        : "text-soft-400"
                                }
                            >
                                <path d="M14.5 1.5L7 9M14.5 1.5L10 14.5L7 9M14.5 1.5L1.5 5.5L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                            </svg>
                        </button>
                    </div>
                    <div className="mt-1.5 text-p-xs text-soft-400 text-center">
                        Press Enter to send • Shift+Enter for new line
                    </div>
                </div>
            </div>

            {/* ── RIGHT: Audit Column ── */}
            <div className="w-88 shrink-0 max-2xl:w-76 max-xl:w-68 max-lg:w-60 max-md:w-full max-md:h-80">
                <AuditPanel audit={currentAudit} loading={auditLoading} />
            </div>
        </div>
    );
};

export default TrueLensChat;
