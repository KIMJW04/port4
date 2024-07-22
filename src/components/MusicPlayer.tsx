import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FaBackward, FaPlay, FaPause, FaForward } from 'react-icons/fa';
import YouTube, { YouTubeProps } from 'react-youtube';
import { YOUTUBE_VIDEO_DATA } from '@/constants/music';

interface MusicPlayerProps {
    isVisible: boolean;
    setVisible: (visible: boolean) => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ isVisible, setVisible }) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [videoId, setVideoId] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [artist, setArtist] = useState<string>('');
    const playerRef = useRef<YouTubeProps['ref']>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const musicPlayerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const { id, imageUrl, title, artist } = YOUTUBE_VIDEO_DATA[currentVideoIndex];
        setVideoId(id);
        setImageUrl(imageUrl);
        setTitle(title);
        setArtist(artist);
    }, [currentVideoIndex]);

    useEffect(() => {
        if (isVisible) {
            gsap.to(musicPlayerRef.current, { x: -42, duration: 0.5, ease: 'power2.inOut' });
        } else {
            gsap.to(musicPlayerRef.current, { x: 550, duration: 0.5, ease: 'power2.inOut' });
        }
    }, [isVisible]);

    const handlePlayPause = () => {
        if (playerRef.current) {
            const player = playerRef.current.getInternalPlayer();
            if (isPlaying) {
                player.pauseVideo();
            } else {
                player.playVideo();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (playerRef.current) {
            const rect = progressRef.current?.getBoundingClientRect();
            if (!rect) return;
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            const newTime = (clickX / width) * duration;
            playerRef.current.getInternalPlayer().seekTo(newTime, true);
        }
    };

    const handleStateChange: YouTubeProps['onStateChange'] = (event) => {
        const playerState = event.data;
        const player = event.target;
        if (playerState === window.YT.PlayerState.PLAYING) {
            setDuration(player.getDuration());
            setIsPlaying(true);
        } else if (playerState === window.YT.PlayerState.PAUSED) {
            setIsPlaying(false);
        } else if (playerState === window.YT.PlayerState.ENDED) {
            handleNext();
        }
    };

    const handlePrevious = () => {
        setCurrentVideoIndex((prevIndex) => (prevIndex === 0 ? YOUTUBE_VIDEO_DATA.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentVideoIndex((prevIndex) => (prevIndex === YOUTUBE_VIDEO_DATA.length - 1 ? 0 : prevIndex + 1));
    };

    useEffect(() => {
        if (playerRef.current) {
            playerRef.current.getInternalPlayer().loadVideoById(videoId);
            if (isPlaying) {
                playerRef.current.getInternalPlayer().playVideo();
            }
        }
    }, [videoId]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (playerRef.current && isPlaying) {
                const player = playerRef.current.getInternalPlayer();
                setCurrentTime(player.getCurrentTime());
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isPlaying]);

    const handleOutsideClick = (event: MouseEvent) => {
        if (musicPlayerRef.current && !musicPlayerRef.current.contains(event.target as Node)) {
            setVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div ref={musicPlayerRef} className={`absolute top-8 flex flex-col items-center justify-center overflow-hidden MusicPlayer__container w-72 bg-gradient-to-bl to-MusicPlayer-secondary font-MusicPlayer-sans`} style={{ transform: 'translateX(450px)' }}>
            <div id="player" className="relative overflow-visible transition-transform duration-500 transform shadow-lg MusicPlayer__player w-72 h-72 hover:scale-100">
                <YouTube
                    videoId={videoId}
                    opts={{
                        width: '0',
                        height: '0',
                        playerVars: {
                            autoplay: isPlaying ? 1 : 0,
                            loop: 0,
                        },
                    }}
                    onReady={(event) => {
                        playerRef.current = event.target;
                    }}
                    onStateChange={handleStateChange}
                />
                <div className="absolute w-full h-full bg-center bg-cover rounded-md MusicPlayer__album" style={{ backgroundImage: `linear-gradient(rgba(54, 79, 60, 0.25), rgba(73, 101, 77, 0.55)), url('${imageUrl}')` }}>
                </div>
                <div className="absolute -bottom-4 w-full h-32 transition-transform duration-500 transform MusicPlayer__info bg-[#223167a8] backdrop-blur-[10px] translate-y-9 hover:translate-y-0 pt-3">
                    <div className="relative w-3/5 h-1 mx-auto my-2 rounded-full cursor-pointer MusicPlayer__progress-bar" onClick={handleProgressClick} ref={progressRef}>
                        <div className="absolute -mt-1 text-xs text-white -left-10 MusicPlayer__time-current">{formatTime(currentTime)}</div>
                        <div className="absolute -mt-1 text-xs text-white -right-10 MusicPlayer__time-total">{formatTime(duration - currentTime)}</div>
                        <div className="h-full rounded-full MusicPlayer__fill bg-MusicPlayer-secondary" style={{ width: `${(currentTime / duration) * 100}%`, left: 0 }}></div>
                    </div>
                    <div className="mt-2 w-1/2 m-auto text-center MusicPlayer__currently-playing text-[10px] overflow-hidden whitespace-nowrap text-white">
                        <h2 className="text-xs tracking-wider uppercase MusicPlayer__song-name animate-marquee">{title}</h2>
                        <h3 className="mt-1 tracking-wide uppercase MusicPlayer__artist-name">{artist}</h3>
                    </div>
                    <div className="flex items-center justify-center my-4 MusicPlayer__controls text-MusicPlayer-secondary">
                        <div className='flex gap-4'>
                            <div className="text-sm cursor-pointer MusicPlayer__previous" onClick={handlePrevious}>
                                <FaBackward />
                            </div>
                            <div className="text-base cursor-pointer MusicPlayer__play-pause" onClick={handlePlayPause}>
                                {isPlaying ? <FaPause /> : <FaPlay />}
                            </div>
                            <div className="text-sm cursor-pointer MusicPlayer__next" onClick={handleNext}>
                                <FaForward />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;
