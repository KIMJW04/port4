"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Main from '@/components/Main';
import VideoBackground from '@/components/VideoBackground';
import MainLoading from '@/components/MainLoading';
import LayerManager from '@/components/Layer/LayerManager';
import { LayerProvider } from '@/context/LayerContext';

interface ConditionalLayoutProps {
    children: React.ReactNode;
}

const ConditionalLayout = ({ children }: ConditionalLayoutProps): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(true);
    const [percent, setPercent] = useState<number>(0);
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
    }, [pathname]);

    const handleLoginButtonClick = () => {
        const loginUrl = '/auth/signin';
        const loginPopup = window.open(loginUrl, 'loginPopup', 'width=600,height=800');

        if (loginPopup) {
            const interval = setInterval(() => {
                if (loginPopup.closed) {
                    clearInterval(interval);
                }
            }, 1000);
        } else {
            alert('팝업 창을 열 수 없습니다. 팝업 차단 설정을 확인하세요.');
        }
    };

    const isLoginPath = pathname === '/auth/signin';

    if (loading) {
        return <MainLoading percent={percent} />;
    }

    return (
        <LayerProvider>
            <SessionProvider>
                {!isLoginPath && <VideoBackground />}
                {!isLoginPath && <Header onLoginButtonClick={handleLoginButtonClick} />}
                <Main>
                    {children}
                    <LayerManager /> {/* LayerManager가 포함되어 있는지 확인 */}
                </Main>
                {!isLoginPath && <Footer />}
            </SessionProvider>
        </LayerProvider>
    );
};

export default ConditionalLayout;
