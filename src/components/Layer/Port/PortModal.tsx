import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import Link from "next/link"; // Link 컴포넌트 임포트

interface PortModalProps {
    detail: {
        title: string;
        s_title: string;
        img: string[];
        description: string;
        detail_description: string[];
        link: string;
        github: string;
        footer_coment: string;
    };
    onClose: () => void;
}

const PortModal: React.FC<PortModalProps> = ({ detail, onClose }) => {
    const nodeRef = useRef(null);
    const [defaultPosition, setDefaultPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateDefaultPosition = () => {
            const element = nodeRef.current;
            if (element) {
                const { innerWidth, innerHeight } = window;
                const { offsetWidth, offsetHeight } = element;

                setDefaultPosition({
                    x: (innerWidth - offsetWidth) / 2,
                    y: (innerHeight - offsetHeight) / 2,
                });
            }
        };

        updateDefaultPosition();
        window.addEventListener("resize", updateDefaultPosition);

        return () => {
            window.removeEventListener("resize", updateDefaultPosition);
        };
    }, []);

    useEffect(() => {
        // 모달이 열릴 때 body에 pointer-events-none 클래스를 추가
        document.body.classList.add("pointer-events-none");
        document.getElementById("modal-content")?.classList.add("pointer-events-auto");

        // 컴포넌트 언마운트 시 또는 모달이 닫힐 때 body에서 pointer-events-none 클래스를 제거
        return () => {
            document.body.classList.remove("pointer-events-none");
        };
    }, []);

    return (
        <Draggable nodeRef={nodeRef} defaultPosition={defaultPosition}>
            <div ref={nodeRef} className="fixed inset-0 flex items-center justify-center z-[20000]">
                <div id="modal-content" className="w-[80vw] h-[86vh] rounded-lg text-white font-nanumSquareNeo relative pointer-events-auto">
                    <div className="layer__contents">
                        <h2 className="text-2xl mb-1">{detail.title}</h2>
                        <span className="s_title">{detail.s_title}</span>
                        <span className="block text-xs mt-9 relative text-gray-100 before:content-[''] before:w-11 before:h-[1px] before:bg-white before:absolute before:left-0 before:-top-5"></span>
                        <div className="flex flex-wrap mb-4">
                            {detail.img.map((src, index) => (
                                <div key={index} className="w-full mb-4">
                                    <div className="overflow-hidden p-3 bg-[#00000049] mb-5">
                                        <img src={src} alt={detail.title} className="w-full h-full rounded-none" />
                                    </div>
                                    <p className="text-sm mb-3">{detail.detail_description[index]}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="layer__footer flex justify-between items-center absolute left-0 bottom-1 w-full h-[3.75rem] bg-[#22316767] backdrop-blur-[10px] text-white p-[19px] font-nanumSquareNeo rounded-b-lg">
                        <p className="text-base text-center ment">{detail.footer_coment}</p>
                        <div className="flex gap-6">
                            <Link href={detail.link} passHref className="p-2 rounded border border-white py-1 text-sm">
                                SITE
                            </Link>
                            <Link href={detail.github} passHref className="p-2 rounded border border-white py-1 text-sm">
                                GitHub
                            </Link>
                            <span className="block text-center cursor-pointer close text-xl font-bold" onClick={onClose}></span>
                        </div>
                    </div>
                </div>
            </div>
        </Draggable>
    );
};

export default PortModal;
