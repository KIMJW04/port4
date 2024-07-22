import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

interface MainLoadingProps {
    percent: number;
}

const MainLoading: React.FC<MainLoadingProps> = ({ percent }) => {
    const percentRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (percentRef.current) {
            gsap.to(percentRef.current, {
                textContent: percent,
                roundProps: "textContent",
                duration: 0.5,
                ease: "power1.inOut",
            });
        }
    }, [percent]);

    return (
        <div id="main__loading" className="fixed left-0 top-0 z-[10000] flex items-center justify-center w-full h-full transform bg-[#00000040] flex-col">
            <div className="relative flex w-10 mb-12">
                <div className="loader__circle"></div>
                <div className="loader__circle"></div>
                <div className="loader__circle"></div>
                <div className="loader__circle"></div>
                <div className="loader__circle"></div>
            </div>
            <div className="flex flex-col text-center text-white font-nanumSquareNeo">
                <p>
                    로딩중....<em ref={percentRef}>{percent}</em>%
                </p>
                <span className="inline-block pt-1 opacity-50">
                    포트폴리오를 열고 있습니다.
                    <br /> 조그만 기다려주세요!
                </span>
            </div>
        </div>
    );
};

export default MainLoading;
