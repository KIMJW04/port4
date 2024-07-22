"use client"

import React from "react";
import Draggable from "react-draggable";
import YouTube, { Options } from "react-youtube";
import he from 'he';

interface VideoSnippet {
    title: string;
}

interface Video {
    id: {
        videoId: string;
    };
    snippet: VideoSnippet;
}

interface YoutubeModalProps {
    video: Video | null;
    onClose: () => void;
}

const YoutubeModal: React.FC<YoutubeModalProps> = ({ video, onClose }) => {
    if (!video) return null;

    const opts: Options = {
        playerVars: {
            autoplay: 1,
        },
        width: '100%',
        height: '100%',
    };

    return (
        <Draggable bounds="parent">
            <div className="w-96 h-auto bg-[#223167a8] absolute bottom-0 right-0 z-[10000] backdrop-blur-[30px] rounded-xl overflow-hidden shadow-lg">
                <div className="relative">
                    <span
                        className="absolute w-3 h-3 bg-red-700 rounded-full cursor-pointer left-3 top-3"
                        onClick={onClose}
                    ></span>
                    <h3 className="w-4/5 px-4 py-2 m-auto text-xs text-center text-white uppercase break-keep">
                        {he.decode(video.snippet.title)}
                    </h3>
                </div>
                <div className="relative pb-[56.25%] h-0">
                    <YouTube videoId={video.id.videoId} opts={opts} className="absolute top-0 left-0 w-full h-full" />
                </div>
            </div>
        </Draggable>
    );
};

export default YoutubeModal;
