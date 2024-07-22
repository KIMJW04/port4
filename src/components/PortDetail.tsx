import Link from 'next/link';
import React from 'react';

interface Detail {
    img: string;
    title: string;
    description: string;
    link: string;
}

interface PortDetailProps {
    detail: Detail | null;
}

const PortDetail: React.FC<PortDetailProps> = ({ detail }) => {
    if (!detail) return <div className="flex flex-col w-full h-full"></div>;

    return (
        <>
            <div className="w-full border-b border-[#313c63] rounded-lg h-1/2">
                <img src={detail.img} alt={detail.title} className="object-cover w-full h-full rounded-t-lg" />
            </div>
            <div className="flex flex-col w-full h-1/2">
                <div className="w-full rounded-b-lg h-2/3 border-[#313c63] border-b p-4 overflow-auto text-white">
                    {detail.description}
                </div>
                <a
                    href={detail.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full font-bold text-white rounded-lg h-1/3"
                >
                    Visit
                </a>
            </div>
        </>
    );
};

export default PortDetail;
