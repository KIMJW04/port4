// src/components/Section1.tsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import About from './About';

const Section1: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (sectionRef.current) {
            gsap.fromTo(
                sectionRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1 }
            );
        }
    }, []);

    return (
        <div id="mainIntro" className="relative w-[100vw] h-[100vh]" ref={sectionRef}>
            <div className="absolute top-0 left-0"></div>
            <About />
        </div>
    );
};

export default Section1;
