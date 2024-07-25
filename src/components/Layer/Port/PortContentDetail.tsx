import { useState } from "react";
import ReactDOM from "react-dom";
import PortModal from "./PortModal";
import Link from "next/link";
import { AiOutlineEye, AiOutlineGithub } from "react-icons/ai"; // 아이콘 임포트
import { FaExternalLinkAlt } from "react-icons/fa"; // 외부 링크 아이콘 임포트

interface PortContentDetailProps {
    detail: {
        title: string;
        s_title: string;
        img: string[]; // 이미지 배열
        description: string;
        detail_description: string[]; // 상세 설명 배열
        link: string;
        github: string;
    } | null;
}

const PortContentDetail: React.FC<PortContentDetailProps> = ({ detail }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!detail) {
        return <div className="m-[0.625rem] text-sm">상세 정보가 없습니다.</div>;
    }

    const backgroundImageStyle = detail.img.length > 0 ? { backgroundImage: `url(${detail.img[0]})` } : {};

    const handleOpenModal = () => {
        setIsModalOpen(true);
        const layerElement = document.getElementById("port-layer");
        if (layerElement) {
            layerElement.classList.add("hidden");
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        const layerElement = document.getElementById("port-layer");
        if (layerElement) {
            layerElement.classList.remove("hidden");
        }
    };

    return (
        <div id="port_content" className="relative">
            <div className="relative overflow-hidden m-3 h-40">
                <div className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 ease-in-out group" style={backgroundImageStyle}>
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300 ease-in-out"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                        <div className="flex space-x-4">
                            <button onClick={handleOpenModal} className="text-white text-xl p-2 rounded-full bg-gray-800 hover:bg-gray-700">
                                <AiOutlineEye />
                            </button>
                            <Link href={detail.github || "#"} className="text-white text-xl p-2 rounded-full bg-gray-800 hover:bg-gray-700">
                                <AiOutlineGithub />
                            </Link>
                            <Link href={detail.link || "#"} className="text-white text-xl p-2 rounded-full bg-gray-800 hover:bg-gray-700">
                                <FaExternalLinkAlt />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <p className="m-[0.625rem] text-sm">{detail.description}</p>
            {isModalOpen && ReactDOM.createPortal(<PortModal detail={detail} onClose={handleCloseModal} />, document.body)}
        </div>
    );
};

export default PortContentDetail;
