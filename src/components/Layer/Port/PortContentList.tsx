import React from "react";

interface PortContentListProps {
    items: any[];
    onDetailClick: (detail: any) => void;
}

const PortContentList: React.FC<PortContentListProps> = ({ items, onDetailClick }) => {
    return (
        <ul>
            {items.map((item, index) => (
                <li key={index} className={`p-[0.4375rem_0.875rem_0.3125rem] cursor-pointer text-sm ${index % 2 === 1 ? "bg-[#00000048]" : "bg-[#ffffff0a]"}`} onClick={() => onDetailClick(item)}>
                    {item.title} {/* assuming each item has a title */}
                </li>
            ))}
        </ul>
    );
};

export default PortContentList;
