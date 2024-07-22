// src/app/client-layout.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Main from '@/components/Main';
import VideoBackground from '@/components/VideoBackground';
import MainLoading from '@/components/MainLoading';
import Layer from '@/components/Layer';
import AboutLayer from '@/components/AboutLayer';
import YoutubeLayer from '@/components/YoutubeLayer';
import PortLayer from '@/components/PortLayer';
import ChatLayer from '@/components/ChatLayer';

interface ConditionalLayoutProps {
    children: React.ReactNode;
}

const ConditionalLayout = ({ children }: ConditionalLayoutProps): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(true);
    const [percent, setPercent] = useState<number>(0);
    const [activeLayer, setActiveLayer] = useState<string | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const handleRouteChange = () => {
            setLoading(true);
            setPercent(0);
            let loadedResources = 0;
            const totalResources = 10;

            const updatePercent = () => {
                loadedResources += 1;
                const newPercent = Math.min((loadedResources / totalResources) * 100, 100);
                setPercent(newPercent);
                if (newPercent === 100) {
                    setTimeout(() => {
                        setLoading(false);
                    }, 500);
                }
            };

            for (let i = 0; i < totalResources; i++) {
                setTimeout(updatePercent, i * 100);
            }
        };

        handleRouteChange();

        return () => { };
    }, [pathname]);

    const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        const layer = event.currentTarget.getAttribute('data-layer');
        if (layer) {
            setActiveLayer(layer);
        }
    };

    const closeLayer = () => {
        setActiveLayer(null);
    };

    const handleLoginButtonClick = () => {
        // Open login page in a popup
        const loginUrl = '/auth/signin'; // Adjusted URL for the `app` directory
        const loginPopup = window.open(loginUrl, 'loginPopup', 'width=600,height=800');

        if (loginPopup) {
            // Poll to check if the popup is closed
            const interval = setInterval(() => {
                if (loginPopup.closed) {
                    clearInterval(interval);
                }
            }, 1000);
        } else {
            alert('팝업 창을 열 수 없습니다. 팝업 차단 설정을 확인하세요.');
        }
    };

    // Determine if the current path is a login path
    const isLoginPath = pathname === '/auth/signin';

    if (loading) {
        return <MainLoading percent={percent} />;
    }

    return (
        <SessionProvider>
            {!isLoginPath && <VideoBackground />}
            {!isLoginPath && <Header onLoginButtonClick={handleLoginButtonClick} />}
            <Main>
                {children}
                {activeLayer === 'layer1' && (
                    <Layer onClose={closeLayer} ment="😎 김진우 개발자입니다.">
                        <AboutLayer />
                    </Layer>
                )}
                {activeLayer === 'layer2' && (
                    <Layer onClose={closeLayer} ment="😏 여기서 세상돌아가는 영상들을 광고 없이 볼 수 있습니다.">
                        <YoutubeLayer />
                    </Layer>
                )}
                {activeLayer === 'layer3' &&
                    <PortLayer />
                }
                {activeLayer === 'layer4' && <ChatLayer />}
            </Main>
            {!isLoginPath && <Footer onLinkClick={handleLinkClick} />}
        </SessionProvider>
    );
};

export default ConditionalLayout;
