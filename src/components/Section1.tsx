// src/components/Section1.tsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import About from './About';

const Section1: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (sectionRef.current) {
            const targets = gsap.utils.toArray(".split");

            targets.forEach((target) => {
                let SplitClient = new SplitType(target, {
                    types: 'lines, words, chars',
                });
            });

            gsap.set('.about p .word', { opacity: 0 });
            gsap.set('.about h1 .char', { opacity: 0 });
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
