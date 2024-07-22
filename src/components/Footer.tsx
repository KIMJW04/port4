import React from 'react';

interface FooterProps {
    onLinkClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children?: React.ReactNode;
}

const Footer: React.FC<FooterProps> = ({ onLinkClick, children }) => (
    <footer id="footer" className="fixed z-50 h-16 left-1/2 transform -translate-x-1/2 bottom-2 px-8 bg-black bg-opacity-30 backdrop-blur-lg text-center py-1.5 rounded-full">
        <div className="menu">
            <ul className="flex items-start justify-center">
                <li className="relative inline-block list-none">
                    <button
                        data-layer="layer1"
                        onClick={onLinkClick}
                        className="block w-10 h-10 m-1 bg-opacity-50 bg-center bg-repeat bg-cover rounded-md bg-footer_1"
                    ></button>
                </li>
                <li className="relative inline-block list-none">
                    <button
                        data-layer="layer2"
                        onClick={onLinkClick}
                        className="block p-5 m-1 bg-opacity-50 bg-center bg-repeat bg-cover rounded-md bg-footer_2"
                    ></button>
                </li>
                <li className="relative inline-block list-none">
                    <button
                        data-layer="layer3"
                        onClick={onLinkClick}
                        className="block w-10 h-10 m-1 bg-black bg-opacity-50 rounded-md"
                    ></button>
                </li>
                <li className="relative inline-block list-none">
                    <button
                        data-layer="layer4"
                        onClick={onLinkClick}
                        className="block w-10 h-10 m-1 bg-black bg-opacity-50 rounded-md"
                    ></button>
                </li>
            </ul>
        </div>
        {children}
    </footer>
);

export default Footer;
