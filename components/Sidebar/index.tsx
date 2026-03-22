import { useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import ModalSettings from "@/components/ModalSettings";
import User from "./User";

type Props = {
    visible: boolean;
    onClose: () => void;
    onClickNewChat: () => void;
};

const Sidebar = ({ visible, onClose, onClickNewChat }: Props) => {
    const [openSettings, setOpenSettings] = useState(false);

    return (
        <>
            <div
                className={`fixed top-5 left-5 bottom-5 flex flex-col w-80 bg-white-0 rounded-3xl shadow-[0_0_1.25rem_0_rgba(0,0,0,0.03)] max-3xl:w-65 max-lg:top-0 max-lg:left-0 max-lg:bottom-0 max-lg:z-20 max-lg:w-75 max-lg:shadow-2xl max-lg:rounded-none max-lg:transition-transform max-md:w-full max-md:p-4 ${
                    visible
                        ? "max-lg:translate-x-0"
                        : "max-lg:-translate-x-full"
                }`}
            >
                <div className="grow overflow-auto scrollbar-none p-5">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6 max-md:mb-4">
                        <div className="flex items-center gap-2.5">
                            <div className="size-8 rounded-lg bg-[#0d3d4f] flex items-center justify-center shrink-0">
                                <span className="text-[#4dd9d9] text-xs font-bold">TL</span>
                            </div>
                            <div>
                                <div className="text-label-sm font-semibold text-strong-950">
                                    <span className="text-[#0d3d4f]">True</span><span className="text-[#1a8a9a]">Lens</span>
                                </div>
                                <div className="text-p-xs text-soft-400">Canadian AI Auditor</div>
                            </div>
                        </div>
                        <button
                            className="group hidden max-lg:flex"
                            onClick={onClose}
                        >
                            <Icon
                                className="!size-4 fill-strong-950 transition-colors group-hover:fill-blue-500"
                                name="close"
                            />
                        </button>
                    </div>

                    {/* New Chat */}
                    <Link
                        className="group flex items-center gap-2 h-10 px-3 mb-6 rounded-xl border border-[#1a8a9a]/30 bg-[#0d3d4f]/5 text-label-sm text-[#0d3d4f] transition-colors hover:bg-[#0d3d4f]/10 hover:border-[#1a8a9a]"
                        href="/"
                        onClick={onClickNewChat}
                    >
                        <Icon
                            className="fill-[#1a8a9a] transition-colors"
                            name="chat"
                        />
                        New Audit Chat
                    </Link>

                    {/* Chat History */}
                    <div className="space-y-0.5">
                        <div className="mb-2 px-1 text-label-xs text-soft-400 uppercase tracking-wider">Today</div>
                        {[
                            "What programs help internationally trained nurses in Nova Scotia?",
                            "Grants for immigrant entrepreneurs in Ontario",
                            "Housing support for refugees in Toronto",
                        ].map((title) => (
                            <Link
                                key={title}
                                className="flex items-center gap-2 h-10 px-3 rounded-xl text-label-sm text-sub-600 truncate transition-colors hover:bg-bg-weak-50 hover:text-strong-950"
                                href="/"
                                onClick={onClickNewChat}
                            >
                                <Icon className="shrink-0 fill-soft-400" name="chat" />
                                <span className="truncate">{title}</span>
                            </Link>
                        ))}

                        <div className="mt-4 mb-2 px-1 text-label-xs text-soft-400 uppercase tracking-wider">Yesterday</div>
                        {[
                            "Trades training for Indigenous youth in Alberta",
                            "Mental health programs in Northern Ontario",
                            "Nova Scotia nominee program eligibility",
                        ].map((title) => (
                            <Link
                                key={title}
                                className="flex items-center gap-2 h-10 px-3 rounded-xl text-label-sm text-sub-600 truncate transition-colors hover:bg-bg-weak-50 hover:text-strong-950"
                                href="/"
                                onClick={onClickNewChat}
                            >
                                <Icon className="shrink-0 fill-soft-400" name="chat" />
                                <span className="truncate">{title}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="shrink-0 p-5 pt-0 space-y-1">
                    <button
                        className="group flex items-center gap-2 w-full h-10 px-3 rounded-xl text-label-sm text-sub-600 transition-colors hover:bg-bg-weak-50 hover:text-strong-950"
                        onClick={() => setOpenSettings(true)}
                    >
                        <Icon className="fill-soft-400 transition-colors group-hover:fill-strong-950" name="settings" />
                        Settings
                    </button>
                    <User />
                </div>
            </div>

            <ModalSettings open={openSettings} onClose={() => setOpenSettings(false)} />
        </>
    );
};

export default Sidebar;
