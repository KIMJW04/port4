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
                <div className="w-[750px] h-[600px] absolute z-[10000] left-1/2 transform -translate-x-1/2 bottom-[80px] text-white font-nanumSquareNeo transition-all duration-300 ease-out">
                    <div className="bg-[#223167a8] backdrop-blur-[30px] h-[calc(100%-60px)] rounded-lg overflow-y-scroll flex">
                        <div className="w-[250px] h-full relative">
                            <span className="bg-red-500 absolute left-5 top-5 w-[14px] h-[14px] rounded-full z-[1000]"></span>
                            <nav className="p-[40px]">
                                <ul>
                                    <li className="font-nanumSquareNeo text-sm capitalize flex items-center">
                                        <input type="checkbox" className="w-[10px] h-[10px] bg-white rounded-sm mr-1" />
                                        포트폴리오
                                    </li>
                                    <li className="font-nanumSquareNeo text-sm capitalize flex items-center">
                                        <input type="checkbox" className="w-[10px] h-[10px] bg-white rounded-sm mr-1" />
                                        작업물
                                    </li>
                                    <li className="font-nanumSquareNeo text-sm capitalize flex items-center">
                                        <input type="checkbox" className="w-[10px] h-[10px] bg-white rounded-sm mr-1" />
                                        블로그
                                    </li>
                                    <li className="font-nanumSquareNeo text-sm capitalize flex items-center">
                                        <input type="checkbox" className="w-[10px] h-[10px] bg-white rounded-sm mr-1" />
                                        연락처
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="w-[500px] h-full">
                            <div className="w-full p-[14px_20px_12px] bg-[#ffffff08]">🤗 프로젝트</div>
                            <div className="flex h-[calc(100%-40px)]">
                                <div className="w-1/2 h-full bg-[#0000002e]">
                                    <ul>
                                        <li className="bg-[#ffffff0a] p-[7px_14px_5px]">유튜브 뮤직 사이트</li>
                                        <li className="bg-[#00000048] backdrop-blur-sm p-[7px_14px_5px]">영화 사이트</li>
                                        <li className="bg-[#ffffff0a] p-[7px_14px_5px]">체스 사이트</li>
                                    </ul>
                                </div>
                                <div className="w-1/2">
                                    <div className="border border-[#cccccc2d] h-[300px] m-[10px]"></div>
                                    <p className="m-[10px] text-sm">유튜브 API를 이용하여 원하는 음악을 고르는 사이트입니다. 더 자세히 보고 싶다면 아래 버튼을 클릭해주세요!</p>
                                    <a href="#" className="text-sm text-center border border-[#cccccc2d] px-[7px] ml-[10px] inline-block">
                                        자세히 보기
                                    </a>
                                    <a href="#" className="text-sm text-center border border-[#cccccc2d] px-[7px] ml-[10px] inline-block">
                                        실제 사이트 보기
                                    </a>
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
