import { useState } from "react";
import ReactDOM from "react-dom";
import PortModal from "./PortModal";
import Link from "next/link";

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
        <div id="port_content">
            <div className="border border-[#cccccc2d] h-[18.75rem] m-[0.625rem] bg-cover bg-center" style={backgroundImageStyle}></div>
            <p className="m-[0.625rem] text-sm">{detail.description}</p>
            <button onClick={handleOpenModal} className="text-sm text-center border border-[#cccccc2d] px-[0.4375rem] ml-[0.625rem] inline-block text-white">
                자세히 보기
            </button>
            <Link href={detail.link || "#"} className="text-sm text-center border border-[#cccccc2d] px-[0.4375rem] ml-[0.625rem] inline-block">
                실제 사이트 보기
            </Link>
            {isModalOpen && ReactDOM.createPortal(<PortModal detail={detail} onClose={handleCloseModal} />, document.body)}
        </div>
    );
};

export default PortContentDetail;
