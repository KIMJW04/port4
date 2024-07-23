import React from 'react';

interface PortSidebarProps {
    selectedItem: string;
    handleItemClick: (item: string) => void;
}

const PortSidebar: React.FC<PortSidebarProps> = ({ selectedItem, handleItemClick }) => {
    const getItemClass = (item: string) => {
        return item === selectedItem ? 'bg-blue-400' : 'bg-white';
    };

    return (
        <div className="w-[15rem] h-full">
            <nav className="p-[2.5rem]">
                <ul>
                    <li onClick={() => handleItemClick('project')} className={`font-nanumSquareNeo text-sm capitalize flex items-center cursor-pointer ${selectedItem === 'project' ? 'font-bold' : ''}`}>
                        <input type="checkbox" className={`w-[0.625rem] h-[0.625rem] rounded-sm mr-1 ${getItemClass('project')}`} />
                        포트폴리오
                    </li>
                    <li onClick={() => handleItemClick('work')} className={`font-nanumSquareNeo text-sm capitalize flex items-center cursor-pointer ${selectedItem === 'work' ? 'font-bold' : ''}`}>
                        <input type="checkbox" className={`w-[0.625rem] h-[0.625rem] rounded-sm mr-1 ${getItemClass('work')}`} />
                        작업물
                    </li>
                    <li onClick={() => handleItemClick('blog')} className={`font-nanumSquareNeo text-sm capitalize flex items-center cursor-pointer ${selectedItem === 'blog' ? 'font-bold' : ''}`}>
                        <input type="checkbox" className={`w-[0.625rem] h-[0.625rem] rounded-sm mr-1 ${getItemClass('blog')}`} />
                        블로그
                    </li>
                    <li onClick={() => handleItemClick('contact')} className={`font-nanumSquareNeo text-sm capitalize flex items-center cursor-pointer ${selectedItem === 'contact' ? 'font-bold' : ''}`}>
                        <input type="checkbox" className={`w-[0.625rem] h-[0.625rem] rounded-sm mr-1 ${getItemClass('contact')}`} />
                        연락처
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default PortSidebar;
