import { useState } from "react";
import Link from "next/link";
import TextareaAutosize from "react-textarea-autosize";
import Icon from "@/components/Icon";
import Image from "@/components/Image";
import Note from "./Note";
import Speed from "./Speed";
import Search from "./Search";
import Menu from "./Menu";

type ButtonProps = {
    className?: string;
    icon: string;
    onClick: () => void;
};

const Button = ({ className, icon, onClick }: ButtonProps) => {
    return (
        <button className={`group text-0 ${className || ""}`} onClick={onClick}>
            <Icon
                className="fill-icon-soft-400 transition-colors group-hover:fill-blue-500"
                name={icon}
            />
        </button>
    );
};

const PanelMessage = ({}) => {
    const [message, setMessage] = useState("");

    return (
        <div className="relative z-3 mx-7.5 mb-5.5 shrink-0 rounded-xl border border-stroke-soft-200 bg-white-0 max-md:m-0">
            <Note />
            <div className="px-3 py-3.5 max-md:px-4 max-md:py-2.5">
                <div className="min-h-12 text-0 mb-3">
                    <TextareaAutosize
                        className="w-full h-12 text-p-md text-strong-950 outline-none resize-none placeholder:text-soft-400"
                        maxRows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write your message ..."
                    />
                </div>
                <div className="flex items-center gap-2.5">
                    <Speed />
                    <div className="w-0.25 h-5 bg-stroke-soft-200"></div>
                    <Menu />
                    <Button icon="link" onClick={() => {}} />
                    <Search />
                    <Button icon="image" onClick={() => {}} />
                    <Link className="group text-0" href="/research">
                        <Icon
                            className="fill-icon-soft-400 transition-colors group-hover:fill-blue-500"
                            name="voice"
                        />
                    </Link>
                    <div className="w-0.25 h-5 bg-stroke-soft-200"></div>
                    <button className="group text-0" onClick={() => {}}>
                        <Image
                            className="w-5 opacity-100"
                            src="/images/sent.svg"
                            width={20}
                            height={20}
                            alt="Sent"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PanelMessage;
