import { useState } from "react";
import Button from "@/components/Button";
import ModalPlan from "@/components/ModalPlan";
import Icon from "@/components/Icon";
import SpecialOffer from "./SpecialOffer";

type Props = {
    onOpenSidebar: () => void;
    onToggleTools: () => void;
};

const Header = ({ onOpenSidebar, onToggleTools }: Props) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="flex items-center gap-4 mb-3.5 max-md:gap-2 max-md:mb-3">
                <button
                    className="hidden size-10 mr-2 justify-center items-center max-lg:flex max-md:mr-0"
                    onClick={onOpenSidebar}
                >
                    <Icon className="!size-6 fill-strong-950" name="burger" />
                </button>
                <div className="grow">
                    <div className="text-label-xl max-md:text-label-md">
                        <span className="text-[#0d3d4f]">True</span><span className="text-[#1a8a9a]">Lens</span>
                    </div>
                    <div className="mt-1 line-clamp-1 text-label-md text-sub-600 max-lg:hidden">
                        Canadian AI opportunity auditing. See what the AI missed.
                    </div>
                </div>
                <div className="flex shrink-0 gap-1.5">
                    <Button
                        className="max-md:hidden"
                        icon="flash"
                        isBlack
                        onClick={() => setOpen(true)}
                    >
                        Upgrade
                    </Button>
                    <Button icon="help-circle" isStroke isCircle />
                    <SpecialOffer />
                    <Button
                        icon="wrench"
                        isStroke
                        isCircle
                        onClick={onToggleTools}
                    />
                </div>
            </div>
            <ModalPlan open={open} onClose={() => setOpen(false)} />
        </>
    );
};

export default Header;
