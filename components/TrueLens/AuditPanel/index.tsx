"use client";

import { useState } from "react";
import SubmitModal from "@/components/TrueLens/SubmitModal";

type Props = {
    audit: string | null;
    loading: boolean;
};

const AuditPanel = ({ audit, loading }: Props) => {
    const [submitOpen, setSubmitOpen] = useState(false);

    const renderAuditLine = (line: string, idx: number) => {
        // Horizontal rule line
        if (line.startsWith("──") || line.startsWith("—")) {
            return (
                <div
                    key={idx}
                    className="border-t border-[#1e6070]/40 my-2"
                />
            );
        }

        // All-caps section headers: WHAT … GOT RIGHT / WHERE … FAILED YOU
        if (line.startsWith("WHAT ") || line.startsWith("WHERE ")) {
            return (
                <div
                    key={idx}
                    className="text-[#4dd9d9] text-label-sm font-semibold mt-4 mb-1 tracking-wide"
                >
                    {line}
                </div>
            );
        }

        // Section headers
        if (line === "PROGRAMS AI MISSED:") {
            return (
                <div
                    key={idx}
                    className="text-[#4dd9d9] text-label-sm font-semibold mt-3 mb-1"
                >
                    {line}
                </div>
            );
        }

        // ❌ sub-section headers
        if (line.startsWith("❌")) {
            return (
                <div
                    key={idx}
                    className="flex items-start gap-1.5 mt-3 mb-0.5"
                >
                    <span className="text-[#ff6b6b] text-p-xs shrink-0">❌</span>
                    <span className="text-white text-label-sm font-semibold">
                        {line.slice(2).trim()}
                    </span>
                </div>
            );
        }

        // Bullet programs
        if (line.startsWith("- ")) {
            const content = line.slice(2);
            const parts = content.split(" — ");
            return (
                <div key={idx} className="flex gap-1.5 text-p-xs leading-relaxed pl-2">
                    <span className="text-[#4dd9d9] shrink-0 mt-0.5">▸</span>
                    <span>
                        {parts[0] && (
                            <span className="text-white font-medium">
                                {parts[0]}
                            </span>
                        )}
                        {parts[1] && (
                            <span className="text-[#a0c4cc]">
                                {" "}— {parts[1]}
                            </span>
                        )}
                        {parts[2] && (
                            <span className="text-[#6ba8b5] italic">
                                {" "}— {parts[2]}
                            </span>
                        )}
                    </span>
                </div>
            );
        }

        // Lines starting with emoji indicators
        if (
            line.startsWith("📍") ||
            line.startsWith("👤") ||
            line.startsWith("📊") ||
            line.startsWith("⚠️")
        ) {
            const [label, ...rest] = line.split(": ");
            return (
                <div key={idx} className="flex flex-wrap gap-1 text-p-xs leading-relaxed">
                    <span className="text-[#4dd9d9] font-medium shrink-0">
                        {label}:
                    </span>
                    <span className="text-white">{rest.join(": ")}</span>
                </div>
            );
        }

        // Why the gap
        if (line.startsWith("💡")) {
            return (
                <div
                    key={idx}
                    className="mt-3 text-p-xs text-[#a0c4cc] leading-relaxed bg-[#0a2f3d] rounded-lg p-2.5"
                >
                    {line}
                </div>
            );
        }

        // Verified line
        if (line.startsWith("✅")) {
            return (
                <div
                    key={idx}
                    className="text-p-xs text-[#6ba8b5] leading-relaxed mt-2"
                >
                    {line}
                </div>
            );
        }

        // Empty lines
        if (!line.trim()) return <div key={idx} className="h-1" />;

        // Default
        return (
            <div key={idx} className="text-p-xs text-[#a0c4cc] leading-relaxed">
                {line}
            </div>
        );
    };

    return (
        <>
            <div className="flex flex-col h-full rounded-xl bg-[#0d3d4f] border border-[#1a6070]/50 overflow-hidden">
                {/* Panel Header */}
                <div className="px-4 py-3 flex items-center gap-2 border-b border-[#1e6070]/40 shrink-0">
                    <div className="size-2 rounded-full bg-[#4dd9d9] animate-pulse" />
                    <span className="text-label-sm font-bold tracking-wider text-white">
                        🔍 TRUELENS AUDIT
                    </span>
                </div>

                {/* Panel Body */}
                <div className="flex-1 overflow-auto scrollbar-none px-4 py-3">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-full gap-3 py-8">
                            <div className="size-6 rounded-full border-2 border-[#4dd9d9] border-t-transparent animate-spin" />
                            <span className="text-p-xs text-[#4dd9d9]">
                                Running TrueLens Audit...
                            </span>
                        </div>
                    ) : audit ? (
                        <div className="space-y-1">
                            {audit
                                .split("\n")
                                .map((line, idx) =>
                                    renderAuditLine(line, idx)
                                )}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                            <div className="text-3xl mb-3 opacity-50">🔍</div>
                            <div className="text-p-sm text-[#4dd9d9] font-medium mb-1">
                                Audit Ready
                            </div>
                            <div className="text-p-xs text-[#6ba8b5] max-w-48 leading-relaxed">
                                Ask a question to generate a TrueLens regional
                                audit of the AI response.
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer CTA */}
                <div className="px-4 py-3 border-t border-[#1e6070]/40 shrink-0">
                    <button
                        className="w-full py-2 rounded-lg border border-[#4dd9d9]/50 text-[#4dd9d9] text-p-xs font-medium transition-all hover:bg-[#4dd9d9]/10 hover:border-[#4dd9d9]"
                        onClick={() => setSubmitOpen(true)}
                    >
                        + Add your program to TrueLens
                    </button>
                </div>
            </div>

            <SubmitModal
                open={submitOpen}
                onClose={() => setSubmitOpen(false)}
            />
        </>
    );
};

export default AuditPanel;
