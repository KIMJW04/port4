import React from 'react';

interface MainProps {
    children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
    return (
        <main id='main' className='w-[100vw] h-[100vh] relative z-10'>
            {children}
        </main>
    );
}

export default Main;
