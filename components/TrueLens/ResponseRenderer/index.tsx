"use client";

import React from "react";

type Props = {
    content: string;
};

/** Parse inline **bold** markers into React nodes */
const parseInline = (text: string): React.ReactNode[] => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
            return (
                <strong key={i} className="font-semibold text-strong-950">
                    {part.slice(2, -2)}
                </strong>
            );
        }
        return part;
    });
};

/** True if every char is uppercase / punctuation / space (section title) */
const isAllCaps = (text: string) =>
    text.length > 3 && text === text.toUpperCase() && /[A-Z]/.test(text);

const EMOJI_HEADER_RE =
    /^[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}][\u{FE00}-\u{FEFF}]?\s/u;

const ResponseRenderer = ({ content }: Props) => {
    const lines = content.split("\n");

    return (
        <div className="space-y-1 text-p-sm text-strong-950 leading-relaxed">
            {lines.map((line, idx) => {
                const trimmed = line.trim();

                // ── Empty line → small spacer ──
                if (!trimmed) return <div key={idx} className="h-1.5" />;

                // ── 👉 Callout note ──
                if (trimmed.startsWith("👉")) {
                    return (
                        <div
                            key={idx}
                            className="flex gap-2 pl-2 py-1.5 my-1 rounded-lg bg-[#0d3d4f]/5 border-l-2 border-[#1a8a9a]/50 text-p-xs text-[#0d3d4f] italic"
                        >
                            <span className="shrink-0">👉</span>
                            <span>{parseInline(trimmed.slice(2).trim())}</span>
                        </div>
                    );
                }

                // ── ✅ Summary / bottom line ──
                if (trimmed.startsWith("✅")) {
                    return (
                        <div
                            key={idx}
                            className="flex gap-2 mt-2 py-1.5 px-2.5 rounded-lg bg-[#1fc16b]/8 border border-[#1fc16b]/20 text-p-xs text-[#0b4627] font-medium"
                        >
                            <span className="shrink-0">✅</span>
                            <span>{parseInline(trimmed.slice(2).trim())}</span>
                        </div>
                    );
                }

                // ── Emoji section header (🏥 Key Programs ...) ──
                if (EMOJI_HEADER_RE.test(trimmed)) {
                    return (
                        <div
                            key={idx}
                            className="flex items-start gap-1.5 mt-4 mb-1 font-semibold text-[#0d3d4f] text-p-sm"
                        >
                            {parseInline(trimmed)}
                        </div>
                    );
                }

                // ── Numbered list item: "1. something" or "1- something" ──
                const numberedMatch = trimmed.match(/^(\d+)[.\-]\s+(.+)/);
                if (numberedMatch) {
                    return (
                        <div key={idx} className="flex gap-2.5 mt-2">
                            <span className="shrink-0 size-5 mt-0.5 flex items-center justify-center rounded-full bg-[#0d3d4f] text-white text-[0.6rem] font-bold leading-none">
                                {numberedMatch[1]}
                            </span>
                            <span className="font-semibold text-strong-950">
                                {parseInline(numberedMatch[2])}
                            </span>
                        </div>
                    );
                }

                // ── "- " bullet (top-level) ──
                if (trimmed.startsWith("- ")) {
                    const body = trimmed.slice(2);
                    // Detect "**Program Name** — description" pattern (Claude style)
                    const boldDashMatch = body.match(/^\*\*(.+?)\*\*\s*[—–-]\s*(.+)/);
                    if (boldDashMatch) {
                        return (
                            <div key={idx} className="flex gap-2 pl-2 mt-1.5">
                                <span className="text-[#1a8a9a] shrink-0 mt-1 text-xs">▸</span>
                                <span className="text-p-xs leading-relaxed">
                                    <strong className="font-semibold text-strong-950">
                                        {boldDashMatch[1]}
                                    </strong>
                                    <span className="text-sub-600">
                                        {" "}— {parseInline(boldDashMatch[2])}
                                    </span>
                                </span>
                            </div>
                        );
                    }
                    return (
                        <div key={idx} className="flex gap-2 pl-2 mt-1">
                            <span className="text-[#1a8a9a] shrink-0 mt-1 text-xs">▸</span>
                            <span className="text-p-xs leading-relaxed">
                                {parseInline(body)}
                            </span>
                        </div>
                    );
                }

                // ── Indented sub-bullet (starts with spaces then "- ") ──
                const indentBulletMatch = line.match(/^(\s{2,})[*\-]\s+(.+)/);
                if (indentBulletMatch) {
                    return (
                        <div key={idx} className="flex gap-2 pl-7 mt-0.5">
                            <span className="text-sub-400 shrink-0 mt-1 text-[0.5rem]">●</span>
                            <span className="text-p-xs text-sub-600 leading-relaxed">
                                {parseInline(indentBulletMatch[2].trim())}
                            </span>
                        </div>
                    );
                }

                // ── "→" routing line (Need X → Y) ──
                if (trimmed.includes("→") && !trimmed.startsWith("**")) {
                    const [left, ...right] = trimmed.split("→");
                    return (
                        <div key={idx} className="flex items-baseline gap-1.5 pl-2 mt-1 text-p-xs">
                            <span className="text-sub-600">{parseInline(left.trim())}</span>
                            <span className="text-[#1a8a9a] font-bold shrink-0">→</span>
                            <span className="font-semibold text-[#0d3d4f]">
                                {parseInline(right.join("→").trim())}
                            </span>
                        </div>
                    );
                }

                // ── All-caps section title (e.g. "IMPORTANT: Licensing Pathway") ──
                if (isAllCaps(trimmed)) {
                    return (
                        <div
                            key={idx}
                            className="mt-3 mb-0.5 text-label-xs font-bold tracking-wider text-[#0d3d4f] uppercase"
                        >
                            {trimmed}
                        </div>
                    );
                }

                // ── Line that's just bold (Claude section heading: "**Regulatory Body: ...**") ──
                if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
                    return (
                        <div
                            key={idx}
                            className="mt-3 mb-0.5 font-semibold text-p-sm text-[#0d3d4f]"
                        >
                            {trimmed.slice(2, -2)}
                        </div>
                    );
                }

                // ── Default paragraph line ──
                return (
                    <div key={idx} className="text-p-xs text-strong-950 leading-relaxed">
                        {parseInline(trimmed)}
                    </div>
                );
            })}
        </div>
    );
};

export default ResponseRenderer;
