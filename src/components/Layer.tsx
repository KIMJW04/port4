import React, { useEffect } from "react";

interface LayerProps {
    children: React.ReactNode;
    onClose?: () => void;
    ment?: string;
}

const Layer: React.FC<LayerProps> = ({ children, onClose, ment }) => {
    useEffect(() => {
        const layerElement = document.querySelector(".layer") as HTMLElement;
        if (layerElement) {
            layerElement.classList.remove("hidden");
            layerElement.classList.add("animate-fade-in-up");
        }

        return () => {
            if (layerElement) {
                layerElement.classList.add("hidden");
            }
        };
    }, []);

    const handleClose = () => {
        const layerElement = document.querySelector(".layer") as HTMLElement;
        if (layerElement) {
            layerElement.classList.remove("animate-fade-in-up");
            layerElement.classList.add("animate-fade-out-down");
            setTimeout(() => {
                if (layerElement) {
                    layerElement.classList.add("hidden");
                    layerElement.classList.remove("animate-fade-out-down");
                }
                if (onClose) {
                    onClose();
                }
            }, 500);
        }
    };

    return (
        <div id="layer" className="fixed z-[10000] flex items-center justify-center layer rounded-lg inset-0">
            <div className="w-[80vw] h-[86vh] transform z-[10000] relative mb-4 rounded-lg text-white font-nanumSquareNeo">
                {children}
                <div className="flex justify-between layer__footer absolute left-0 bottom-1 w-full h-[3.75rem] bg-[#22316767] backdrop-blur-[10px] text-white p-[19px] font-nanumSquareNeo rounded-b-lg">
                    <p className="text-base text-center ment">{ment}</p>
                    <span className="block text-center cursor-pointer close" onClick={handleClose}></span>
                </div>
            </div>
        </div>
    );
};

export default Layer;
