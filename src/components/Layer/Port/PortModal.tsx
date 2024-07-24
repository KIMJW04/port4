import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import Link from 'next/link'; // Link 컴포넌트 임포트

interface PortModalProps {
    detail: {
        title: string;
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
        window.addEventListener('resize', updateDefaultPosition);

        return () => {
            window.removeEventListener('resize', updateDefaultPosition);
        };
    }, []);

    useEffect(() => {
        // 모달이 열릴 때 body에 modal-open 클래스 추가
        document.body.classList.add('pointer-events-none');
        document.getElementById('modal-content')?.classList.add('pointer-events-auto');

        // 컴포넌트 언마운트 시 또는 모달이 닫힐 때 body에서 modal-open 클래스 제거
        return () => {
            document.body.classList.remove('pointer-events-none');
        };
    }, []);

    return (
        <Draggable nodeRef={nodeRef} defaultPosition={defaultPosition}>
            <div ref={nodeRef} className="fixed inset-0 flex items-center z-[20000]">
                <div id="modal-content" className="w-[80vw] h-[86vh] rounded-lg text-white font-nanumSquareNeo relative pointer-events-auto">
                    <div className="layer__contents">
                        <h2 className="text-xl font-semibold mb-2">{detail.title}</h2>
                        <div className="flex flex-wrap mb-4">
                            {detail.img.map((src, index) => (
                                <img key={index} src={src} alt={detail.title} className="w-1/3 p-1" />
                            ))}
                        </div>
                        <p className="mb-4">{detail.description}</p>
                        <div className="mb-4">
                            {detail.detail_description.map((desc, index) => (
                                <p key={index} className="mb-2">{desc}</p>
                            ))}
                        </div>
                    </div>
                    <div className="layer__footer flex justify-between items-center absolute left-0 bottom-1 w-full h-[3.75rem] bg-[#22316767] backdrop-blur-[10px] text-white p-[19px] font-nanumSquareNeo rounded-b-lg">
                        <p className="text-base text-center ment">{detail.footer_coment}</p>
                        <div className='flex gap-6'>
                            <Link href={detail.link} passHref className='p-2 rounded border border-white py-1 text-sm'>
                                SITE
                            </Link>
                            <Link href={detail.github} passHref className='p-2 rounded border border-white py-1 text-sm'>
                                GitHub
                            </Link>
                            <span
                                className="block text-center cursor-pointer close text-xl font-bold"
                                onClick={onClose}
                            >
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Draggable>
    );
};

export default PortModal;
