// components/Header.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { SiYoutubemusic } from 'react-icons/si';
import MusicPlayer from './MusicPlayer';

interface HeaderProps {
    onLoginButtonClick: () => void; // Add prop for login button click
}

const Header: React.FC<HeaderProps> = ({ onLoginButtonClick }) => {
    const [currentTime, setCurrentTime] = useState<string>('');
    const [locationName, setLocationName] = useState<string>('KOREA');
    const [isMusicPlayerVisible, setIsMusicPlayerVisible] = useState<boolean>(false);
    const { data: session, status } = useSession();

    useEffect(() => {
        const updateTime = () => {
            setCurrentTime(
                new Date().toLocaleTimeString('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                })
            );
        };

        updateTime();
        const timer = setInterval(updateTime, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchLocationName = async (latitude: number, longitude: number) => {
            try {
                const response = await fetch(`/api/LocationFetcher?latitude=${latitude}&longitude=${longitude}`);
                const data = await response.json();
                if (data.name) {
                    setLocationName(data.name);
                } else {
                    setLocationName('KOREA');
                }
            } catch (error) {
                console.error('Error fetching location:', error);
                setLocationName('KOREA');
            }
        };

        const handleGeoSuccess = (position: GeolocationPosition) => {
            const { latitude, longitude } = position.coords;
            fetchLocationName(latitude, longitude);
        };

        const handleGeoError = (error: GeolocationPositionError) => {
            console.error('Geolocation error:', error);
            setLocationName('KOREA');
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
        } else {
            console.error('Geolocation is not supported by this browser.');
            setLocationName('KOREA');
        }
    }, []);

    const currentDate = new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        weekday: 'long',
    });

    const toggleMusicPlayer = () => {
        setIsMusicPlayerVisible(!isMusicPlayerVisible);
    };

    return (
        <header id="header" className="fixed top-0 left-0 z-50 w-full bg-black bg-opacity-50 backdrop-blur-lg font-GmarketSans">
            <div className="flex items-center justify-between w-full">
                <div className='flex'>
                    <h1 className="flex text-xs font-bold text-white uppercase pl-[1.875rem] pr-5 pb-3 pt-[0.625rem] relative after:content-['*'] after:left-[10px] after:top-[11px] after:w-[14px] after:h-[14px] after:bg-logo after:bg-cover after:absolute">
                        Jin Woo
                    </h1>
                    {status === 'authenticated' ? (
                        <button className="text-white" onClick={() => signOut()}>Logout</button>
                    ) : (
                        <button className="text-white" onClick={onLoginButtonClick}>Login</button> // Use prop to handle login
                    )}
                </div>
                <div className="flex items-center right">
                    <div className="relative w-5 h-5">
                        <SiYoutubemusic className="text-xl cursor-pointer text-gray" onClick={toggleMusicPlayer} />
                        <MusicPlayer isVisible={isMusicPlayerVisible} setVisible={setIsMusicPlayerVisible} />
                    </div>
                    <div className="pr-5 ml-5 text-sm text-white">
                        {currentDate}
                        <em className="ml-2 font-bold">{locationName}</em>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
