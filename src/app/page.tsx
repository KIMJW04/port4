'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import Section1 from '@/components/Section1';

const Page = () => {
  useEffect(() => {
    const animateComponents = () => {
      const duration = 2;
      const header = document.getElementById('header');
      const footer = document.getElementById('footer');
      const contentContainer = document.getElementById('contentContainer');
      const mainIntro = document.getElementById('mainIntro');

      if (header) {
        gsap.fromTo(header, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration });
      }
      if (footer) {
        gsap.fromTo(footer, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration });
      }
      if (contentContainer) {
        gsap.fromTo(contentContainer, { opacity: 0 }, { opacity: 1, duration });
      }
      if (mainIntro) {
        gsap.fromTo(mainIntro, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration });
      }
    };

    animateComponents();
  }, []);

  return <Section1 />;
};

export default Page;
