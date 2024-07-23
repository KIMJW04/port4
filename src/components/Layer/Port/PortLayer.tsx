import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { PROJECTS, WORKS } from '@/constants/port';
import PortSidebar from './PortSidebar';
import PortContentArea from './PortContentArea';
import { useLayerContext } from "@/context/LayerContext";

interface PortLayerProps {
    onClose: () => void;
    style?: React.CSSProperties;
}

const PortLayer: React.FC<PortLayerProps> = ({ onClose, style }) => {
    const nodeRef = useRef<HTMLDivElement>(null);
    const [selectedItem, setSelectedItem] = useState<string>('project');
    const [selectedDetail, setSelectedDetail] = useState<any>(PROJECTS[0]);
    const { bringToFront } = useLayerContext();
    const [defaultPosition, setDefaultPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

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

    const handleClose = () => {
        const layerElement = document.querySelector("#port-layer") as HTMLElement;
        if (layerElement) {
            layerElement.classList.remove("animate-fade-in-up");
            layerElement.classList.add("animate-fade-out-down");
            setTimeout(() => {
                if (layerElement) {
                    layerElement.classList.add("hidden");
                    layerElement.classList.remove("animate-fade-out-down");
                }
                onClose();
            }, 500);
        }
    };

    const handleItemClick = (item: string) => {
        setSelectedItem(item);
        const newItems = item === 'project' ? PROJECTS : WORKS;
        setSelectedDetail(newItems[0] || null);
    };

    const items = selectedItem === 'project' ? PROJECTS : WORKS;

    return (
        <Draggable nodeRef={nodeRef} defaultPosition={defaultPosition}>
            <div ref={nodeRef} id='port-layer' className="w-[46.875rem] h-[37.5rem] fixed text-white font-nanumSquareNeo port-layer" style={{ top: defaultPosition.y, left: defaultPosition.x, ...style }} onClick={() => bringToFront('layer2')}>
                <div className="bg-[#223167a8] backdrop-blur-[30px] h-[calc(100%-3.75rem)] rounded-lg overflow-y-scroll flex">
                    <PortSidebar selectedItem={selectedItem} handleItemClick={handleItemClick} />
                    <PortContentArea selectedDetail={selectedDetail} items={items} handleDetailClick={setSelectedDetail} selectedItem={selectedItem} />
                </div>
                <button onClick={handleClose} className="absolute w-[0.875rem] h-[0.875rem] top-5 left-5 bg-red-600 rounded-full cursor-pointer z-[1000]"></button>
            </div>
        </Draggable>
    );
};

export default PortLayer;
