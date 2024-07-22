"use client"

import React, { useRef, useEffect } from 'react';

const VideoBackground: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement) {
            videoElement.loop = true;
            videoElement.play().catch(error => {
                console.error("Video play failed:", error);
            });
        }
    }, []);

    return (
        <video
            ref={videoRef}
            className="object-cover w-full h-full bg-black video-background opacity-80"
            autoPlay
            muted
            playsInline
            loop
        >
            <source src="/assets/videos/loseless-win11-hero-repeat.webm" type="video/webm" />
            Your browser does not support the video tag.
        </video>
    );
};

export default VideoBackground;
