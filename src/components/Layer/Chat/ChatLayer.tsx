import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';

interface ChatLayerProps {
    onClose: () => void;
    style?: React.CSSProperties;
}

const ChatLayer: React.FC<ChatLayerProps> = ({ onClose, style }) => {
    const [inputMessage, setInputMessage] = useState('');
    const nodeRef = useRef<HTMLDivElement>(null);

    return (
        <Draggable nodeRef={nodeRef}>
            <div ref={nodeRef} className="w-[400px] h-[500px] fixed text-white bg-black rounded-lg left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={style}>
                <div className="p-4">
                    <h3 className="text-lg font-bold">Chat</h3>
                    <div className="overflow-y-auto h-[300px] border border-gray-500 p-2">

                    </div>
                    <div className="mt-4 flex">
                        <input
                            type="text"
                            className="flex-grow p-2 border border-gray-500 rounded"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                        />
                        <button className="ml-2 p-2 bg-blue-500 rounded">
                            Send
                        </button>
                    </div>
                    <button className="absolute top-2 right-2" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </Draggable>
    );
};

export default ChatLayer;
