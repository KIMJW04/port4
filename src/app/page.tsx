'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import Section1 from '@/components/Section1';

const Page = () => {
  useEffect(() => {
    const animateComponents = () => {
      const header = document.getElementById('header');
      const footer = document.getElementById('footer');
      const videoBG = document.querySelector('.videoBG');

      if (header) {
        gsap.fromTo(header, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
      }
      if (footer) {
        gsap.fromTo(footer, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
      }
      if (videoBG) {
        gsap.fromTo(videoBG, { opacity: 0 }, { opacity: 1, duration: 1 });
      }
    };

    gsap.set('#header', { top: -100 });
    gsap.set('#footer', { bottom: -100 });
    gsap.set('.videoBG', { opacity: 0 });

    setTimeout(() => {
      let tl = gsap.timeline();
      tl.to('#loading', { opacity: 0, duration: 1, delay: 0.5 });
      tl.to('.videoBG', { opacity: 1, duration: 1 });
      tl.add(animateComponents, '-=0.5');
      tl.to('.about h1 .char', { opacity: 1, stagger: 0.05, duration: 1, ease: 'power4.out' }, '+=1');
      tl.to('.about p .word', { opacity: 1, stagger: 0.05, duration: 1, ease: 'power3.out' }, '-=0.75');
      tl.to('#header', { top: 0, duration: 1, ease: 'power3.out' }, '-=0.75');
      tl.to('#footer', { bottom: 10, duration: 1, ease: 'power3.out' }, '-=0.75');
    }, 3000);

    gsap.set('.layer.aboutLayer', { autoAlpha: 0, y: 20, backdropFilter: 'blur(0px)', duration: 0.5 });
  }, []);

  return (
    <>
      <Section1 />
    </>
  );
};

export default Page;
