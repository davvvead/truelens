"use client";

type Model = {
    id: string;
    label: string;
};

const MODELS: Model[] = [
    { id: "gpt-5.3", label: "GPT 5.3" },
    { id: "claude-sonnet-4-6", label: "Sonnet 4.6" },
    { id: "gemini-3.0", label: "Gemini 3.0" },
];

type Props = {
    value: string;
    onChange: (model: string) => void;
};

const ModelSelector = ({ value, onChange }: Props) => {
    return (
        <div className="flex items-center gap-2">
            <span className="text-label-sm text-sub-600 shrink-0">Model:</span>
            <div className="relative">
                <select
                    className="appearance-none pl-3 pr-8 py-1.5 rounded-lg border border-stroke-soft-200 bg-white-0 text-p-sm text-strong-950 cursor-pointer outline-none focus:border-blue-500 transition-colors"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                >
                    {MODELS.map((m) => (
                        <option key={m.id} value={m.id}>
                            {m.label}
                        </option>
                    ))}
                </select>
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-sub-600">
                    ▾
                </span>
            </div>
        </div>
    );
};

export default ModelSelector;
