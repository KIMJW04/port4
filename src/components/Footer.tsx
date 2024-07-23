import React from 'react';
import { useLayerContext } from '@/context/LayerContext';

interface FooterProps {
    children?: React.ReactNode;
}

const Footer: React.FC<FooterProps> = ({ children }) => {
    const { showLayer } = useLayerContext();

    const handleLinkClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const layerId = event.currentTarget.getAttribute('data-layer');
        if (layerId) {
            showLayer(layerId);
        }
    };

    return (
        <footer id="footer" className="fixed z-50 h-16 left-1/2 transform -translate-x-1/2 bottom-2 px-8 bg-black bg-opacity-30 backdrop-blur-lg text-center py-1.5 rounded-full">
            <div className="menu">
                <ul className="flex items-start justify-center">
                    <li className="relative inline-block list-none">
                        <button
                            data-layer="layer1"
                            onClick={handleLinkClick}
                            className="block w-10 h-10 m-1 bg-opacity-50 bg-center bg-repeat bg-cover rounded-md bg-footer_1"
                        ></button>
                    </li>
                    <li className="relative inline-block list-none">
                        <button
                            data-layer="layer2"
                            onClick={handleLinkClick}
                            className="block p-5 m-1 bg-opacity-50 bg-center bg-repeat bg-cover rounded-md bg-footer_2"
                        ></button>
                    </li>
                    <li className="relative inline-block list-none">
                        <button
                            data-layer="layer3"
                            onClick={handleLinkClick}
                            className="block w-10 h-10 m-1 bg-black bg-opacity-50 rounded-md"
                        ></button>
                    </li>
                    <li className="relative inline-block list-none">
                        <button
                            data-layer="layer4"
                            onClick={handleLinkClick}
                            className="block w-10 h-10 m-1 bg-black bg-opacity-50 rounded-md"
                        ></button>
                    </li>
                </ul>
            </div>
            {children}
        </footer>
    );
};

export default Footer;
