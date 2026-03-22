"use client";

import { useState } from "react";
import {
    Dialog,
    DialogPanel,
    DialogBackdrop,
    CloseButton,
} from "@headlessui/react";
import Icon from "@/components/Icon";

type SubmissionForm = {
    organizationName: string;
    programName: string;
    region: string;
    targetAudience: string;
    description: string;
    sourceUrl: string;
    contactEmail: string;
};

const initialForm: SubmissionForm = {
    organizationName: "",
    programName: "",
    region: "",
    targetAudience: "",
    description: "",
    sourceUrl: "",
    contactEmail: "",
};

type Props = {
    open: boolean;
    onClose: () => void;
};

const SubmitModal = ({ open, onClose }: Props) => {
    const [form, setForm] = useState<SubmissionForm>(initialForm);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Store submission in localStorage for demo purposes
        const existing = JSON.parse(
            localStorage.getItem("truelens_submissions") || "[]"
        );
        existing.push({ ...form, submittedAt: new Date().toISOString() });
        localStorage.setItem(
            "truelens_submissions",
            JSON.stringify(existing)
        );
        setSubmitted(true);
    };

    const handleClose = () => {
        setSubmitted(false);
        setForm(initialForm);
        onClose();
    };

    const inputClass =
        "w-full px-3 py-2 rounded-lg border border-stroke-soft-200 bg-white-0 text-p-sm text-strong-950 outline-none focus:border-[#1a8a9a] transition-colors placeholder:text-soft-400";
    const labelClass = "block text-label-sm text-sub-600 mb-1";

    return (
        <Dialog className="relative z-50" open={open} onClose={handleClose}>
            <DialogBackdrop
                className="fixed inset-0 bg-overlay backdrop-blur-sm duration-300 ease-out data-[closed]:opacity-0"
                transition
            />
            <div className="fixed inset-0 flex p-4 overflow-y-auto max-lg:py-12">
                <DialogPanel
                    className="relative w-full max-w-lg m-auto p-6 shadow-[0_0_1.25rem_0_rgba(0,0,0,0.08)] rounded-2xl bg-white-0 duration-300 ease-out data-[closed]:opacity-0"
                    transition
                >
                    <CloseButton
                        className="absolute right-4 top-4 z-15 size-8 bg-strong-950 rounded-full text-0 transition-colors hover:bg-strong-950/90"
                        onClick={handleClose}
                    >
                        <Icon className="!size-4 fill-white-0" name="close" />
                    </CloseButton>

                    {/* Header */}
                    <div className="mb-5">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="size-2 rounded-full bg-[#1a8a9a]" />
                            <span className="text-label-md text-[#0d3d4f] font-semibold">
                                Add Your Program to TrueLens
                            </span>
                        </div>
                        <p className="text-p-sm text-sub-600">
                            Help close the visibility gap. Submit a verified
                            regional program and we'll review it for inclusion.
                        </p>
                    </div>

                    {submitted ? (
                        <div className="text-center py-8">
                            <div className="text-3xl mb-3">✅</div>
                            <div className="text-label-md text-strong-950 mb-2">
                                Submission Received
                            </div>
                            <p className="text-p-sm text-sub-600">
                                Thank you. Your program will be reviewed and
                                added to the TrueLens registry.
                            </p>
                            <button
                                className="mt-5 px-5 py-2 rounded-lg bg-[#0d3d4f] text-white text-label-sm transition-colors hover:bg-[#1a5f75]"
                                onClick={handleClose}
                            >
                                Close
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                                <div>
                                    <label className={labelClass}>
                                        Organization Name
                                    </label>
                                    <input
                                        className={inputClass}
                                        name="organizationName"
                                        placeholder="e.g. ISANS"
                                        value={form.organizationName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>
                                        Program Name
                                    </label>
                                    <input
                                        className={inputClass}
                                        name="programName"
                                        placeholder="e.g. Bridge to Employment"
                                        value={form.programName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                                <div>
                                    <label className={labelClass}>Region</label>
                                    <input
                                        className={inputClass}
                                        name="region"
                                        placeholder="e.g. Nova Scotia"
                                        value={form.region}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>
                                        Target Audience
                                    </label>
                                    <input
                                        className={inputClass}
                                        name="targetAudience"
                                        placeholder="e.g. Newcomers, Youth"
                                        value={form.targetAudience}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Program Description
                                </label>
                                <textarea
                                    className={`${inputClass} resize-none`}
                                    name="description"
                                    placeholder="Brief description of what the program offers..."
                                    rows={3}
                                    value={form.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Source URL{" "}
                                    <span className="text-error-base">*</span>
                                </label>
                                <input
                                    className={inputClass}
                                    name="sourceUrl"
                                    type="url"
                                    placeholder="https://211.ca/..."
                                    value={form.sourceUrl}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Contact Email
                                </label>
                                <input
                                    className={inputClass}
                                    name="contactEmail"
                                    type="email"
                                    placeholder="contact@organization.ca"
                                    value={form.contactEmail}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2.5 rounded-lg bg-[#0d3d4f] text-white text-label-sm font-medium transition-colors hover:bg-[#1a5f75] mt-2"
                            >
                                Submit Program
                            </button>
                        </form>
                    )}
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default SubmitModal;
