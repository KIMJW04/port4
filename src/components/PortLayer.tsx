import React, { useEffect, useRef, useState } from 'react';
import Draggable from "react-draggable";
import { PROJECTS, WORKS } from '@/constants/port';
import PortDetail from './PortDetail';
import ContentList from './PortCList';

interface PortLayerProps {
    onClose: () => void;
}

interface HistoryItem {
    item: string;
    detail: any;
}

const PortLayer: React.FC<PortLayerProps> = ({ onClose }) => {
    const nodeRef = useRef(null);
    const [selectedItem, setSelectedItem] = useState<string>('project');
    const [selectedDetail, setSelectedDetail] = useState<any>(null);
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number>(-1);

    useEffect(() => {
        const layerElement = document.querySelector(".port-layer") as HTMLElement;
        if (layerElement) {
            layerElement.classList.remove("hidden");
            layerElement.classList.add("animate-fade-in-up");
        }

        if (PROJECTS.length > 0) {
            setSelectedDetail(PROJECTS[0]);
            setHistory([{ item: 'project', detail: PROJECTS[0] }]);
            setHistoryIndex(0);
        }

        return () => {
            if (layerElement) {
                layerElement.classList.add("hidden");
            }
        };
    }, []);

    const handleClose = () => {
        const layerElement = document.querySelector(".port-layer") as HTMLElement;
        if (layerElement) {
            layerElement.classList.remove("animate-fade-in-up");
            layerElement.classList.add("animate-fade-out-down");
            setTimeout(() => {
                if (layerElement) {
                    layerElement.classList.add("hidden");
                    layerElement.classList.remove("animate-fade-out-down");
                }
                if (onClose) {
                    onClose();
                }
            }, 500);
        }
    };

    const handleItemClick = (item: string) => {
        setSelectedItem(item);
        const newItems = item === 'project' ? PROJECTS : WORKS;
        if (newItems.length > 0) {
            setSelectedDetail(newItems[0]);
            const newHistory = history.slice(0, historyIndex + 1);
            newHistory.push({ item, detail: newItems[0] });
            setHistory(newHistory);
            setHistoryIndex(newHistory.length - 1);
        } else {
            setSelectedDetail(null);
            setHistory([]);
            setHistoryIndex(-1);
        }
    };

    const handleDetailClick = (detail: any) => {
        setSelectedDetail(detail);
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push({ item: selectedItem, detail });
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    };

    const handlePrevClick = () => {
        if (historyIndex > 0) {
            const prev = history[historyIndex - 1];
            setSelectedItem(prev.item);
            setSelectedDetail(prev.detail);
            setHistoryIndex(historyIndex - 1);
        }
    };

    const handleNextClick = () => {
        if (historyIndex < history.length - 1) {
            const next = history[historyIndex + 1];
            setSelectedItem(next.item);
            setSelectedDetail(next.detail);
            setHistoryIndex(historyIndex + 1);
        }
    };

    const items = selectedItem === 'project' ? PROJECTS : WORKS;

    return (
        <div ref={nodeRef} className="fixed inset-0 z-50 flex items-center justify-center w-full h-full font-nanumSquareNeo port-layer">
            <Draggable nodeRef={nodeRef}>
                <div className='flex h-[36rem] relative border-[#313c63] border rounded-xl overflow-hidden'>
                    <div className="absolute inset-0 flex gap-8 -ml-[0.4rem] opacity-sand -z-10">
                        {Array(28).fill('').map((_, index) => (
                            <div key={index} className="shrink-0 w-line bg-[#223167c0] h-full w-[1px]"></div>
                        ))}
                    </div>
                    {/* 배경선 */}
                    <div className="flex h-full bg-[#22316767] backdrop-blur-[10px] flex-col w-[16rem] shrink-0 relative border-r border-[#313c63]">
                        <button id="Port_close" className="w-3 h-3 mt-6 ml-6 bg-red-700 rounded-full cursor-pointer" onClick={handleClose}></button>
                        <ul className="flex flex-col mt-14 px-9">
                            <li className="flex items-center gap-4 py-1">
                                <div className={`shrink-0 w-[1.444rem] h-[1.094rem] rounded border-[0.1rem] ${selectedItem === 'project' ? 'bg-slate-200' : 'bg-transparent'}`}></div>
                                <button className="text-lg text-white" onClick={() => handleItemClick('project')}>Project</button>
                            </li>
                            <li className="flex items-center gap-4 py-1">
                                <div className={`shrink-0 w-[1.444rem] h-[1.094rem] rounded border-[0.1rem] ${selectedItem === 'work' ? 'bg-slate-200' : 'bg-transparent'}`}></div>
                                <button className="text-lg text-white" onClick={() => handleItemClick('work')}>Work</button>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-[#223167d2] w-[40rem] grow overflow-hidden">
                        <div className="w-full h-14 px-4 flex items-center bg-[#223167c6] border-b border-[#313c63] text-white">
                            <button className="w-10 h-full text-lg cursor-pointer pointer-events-auto select-none aspect-square text-slate-200" onClick={handlePrevClick} disabled={historyIndex <= 0}>
                                &lt;
                            </button>
                            <button className="w-10 h-full text-lg cursor-pointer pointer-events-auto select-none aspect-square text-slate-200" onClick={handleNextClick} disabled={historyIndex >= history.length - 1}>
                                &gt;
                            </button>
                            <h3 className="ml-5 text-lg truncate">{selectedItem === 'project' ? 'Project' : 'Work'}</h3>
                        </div>
                        <div className="flex w-full" style={{ height: 'calc(100% - 3.5rem)' }}>
                            <div className="relative w-1/2 bg-[#223167c6] p-2 flex flex-col items-start h-full">
                                <ContentList items={items} onClick={handleDetailClick} />
                            </div>
                            <div className="w-1/2 h-full bg-[#223167c6] after:content-[''] after:w-[1px] after:absolute after:left-[-1px] py-3 px-4 after:top-0 relative after:h-full after:bg-[#313c63]">
                                <div className="flex flex-col w-full h-full rounded-2xl border border-[#313c63] overflow-hidden">
                                    <PortDetail detail={selectedDetail} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Draggable>
        </div>
    );
}

export default PortLayer;
