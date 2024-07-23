import React from 'react';

interface PortContentDetailProps {
    detail: { description?: string } | null; // detail이 null일 수도 있음을 명시
}

const PortContentDetail: React.FC<PortContentDetailProps> = ({ detail }) => {
    if (!detail) {
        return <div className="m-[0.625rem] text-sm">상세 정보가 없습니다.</div>; // detail이 null일 때 처리
    }

    return (
        <div>
            <div className="border border-[#cccccc2d] h-[18.75rem] m-[0.625rem]"></div>
            <p className="m-[0.625rem] text-sm">{detail.description}</p>
            <a href="#" className="text-sm text-center border border-[#cccccc2d] px-[0.4375rem] ml-[0.625rem] inline-block">
                자세히 보기
            </a>
            <a href="#" className="text-sm text-center border border-[#cccccc2d] px-[0.4375rem] ml-[0.625rem] inline-block">
                실제 사이트 보기
            </a>
        </div>
    );
};

export default PortContentDetail;
