// src/components/About.tsx
import React from 'react';

const About: React.FC = () => {
    return (
        <div className="pt-[3.75rem] pl-5 leading-normal text-gray-100 about">
            <p className='relative p-4 text-sm leading-normal transition-all duration-300 rounded-lg w-fit hover:bg-black hover:bg-opacity-50 hover:backdrop-blur-lg hover:text-gray-200 font-eulyoo1945 split'>
                삶이란 누군가에게는 행복이며 누군가에게는 불행이고<br />
                누군가에게는 축복이리라 나에게 주어진 이 삶은 어떨지
                모르겠으나<br />
                후회없이 살아가는 것 그것이 내 목표이자 부모에 대한 孝이다.
                <span>- 진우</span>
            </p>
            <h1 className="pt-0 pl-4 font-thin font-neogeo text-[11.25rem] leading-none uppercase split">
                space
            </h1>
        </div>
    );
};

export default About;
