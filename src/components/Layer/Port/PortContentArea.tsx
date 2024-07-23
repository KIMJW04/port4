import React from 'react';
import PortContentList from './PortContentList';
import PortContentDetail from './PortContentDetail';

interface PortContentAreaProps {
    selectedDetail: any;
    items: any[];
    handleDetailClick: (detail: any) => void;
    selectedItem: string;
}

const PortContentArea: React.FC<PortContentAreaProps> = ({ selectedDetail, items, handleDetailClick, selectedItem }) => {
    return (
        <div className="w-[31.25rem] h-full">
            <div className="w-full p-[0.875rem_1.25rem_0.75rem] bg-[#ffffff08]">
                {selectedItem === 'project' && '🤗 프로젝트'}
                {selectedItem === 'work' && '🤗 작업물'}
                {selectedItem === 'blog' && '🤗 블로그'}
                {selectedItem === 'contact' && '🤗 연락처'}
            </div>
            <div className="flex h-[calc(100%-2.5rem)]">
                <div className="w-1/2 h-full bg-[#0000002e]">
                    <PortContentList items={items} onDetailClick={handleDetailClick} />
                </div>
                <div className="w-1/2">
                    <PortContentDetail detail={selectedDetail} />
                </div>
            </div>
        </div>
    );
};

export default PortContentArea;
