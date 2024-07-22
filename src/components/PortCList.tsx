import React from 'react';

interface Item {
    title: string;
    empty?: boolean;
}

interface ContentListProps {
    items: Item[];
    onClick: (item: Item) => void;
}

const ContentList: React.FC<ContentListProps> = ({ items, onClick }) => {
    const fullItems = [...items, ...Array(15 - items.length).fill({ title: '', empty: true })];

    return (
        <div className="absolute inset-0 flex flex-col justify-between w-full h-full p-2">
            {fullItems.map((item, index) => (
                <div
                    key={index}
                    onClick={() => !item.empty && onClick(item)}
                    className={`w-full h-8 rounded-lg cursor-pointer ${index % 2 === 0 ? 'bg-[#263564]' : 'bg-[#2d3e79]'} mb-[1px] flex items-center justify-center text-white`}
                >
                    {item.title}
                </div>
            ))}
        </div>
    );
};

export default ContentList;
