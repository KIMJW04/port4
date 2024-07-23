// src/components/LayerManager.tsx
import React from 'react';
import AboutLayer from '@/components/Layer/About/AboutLayer';
import YoutubeLayer from '@/components/Layer/Youtube/YoutubeLayer';
import PortLayer from '@/components/Layer/Port/PortLayer';
import ChatLayer from '@/components/Layer/Chat/ChatLayer';
import { useLayerContext } from '@/context/LayerContext';

const LayerManager = () => {
    const { visibleLayers, hideLayer, zIndices, bringToFront } = useLayerContext();

    const handleLayerClick = (name) => {
        bringToFront(name);
    };

    return (
        <>
            {visibleLayers.includes('layer1') && (
                <AboutLayer
                    onClose={() => hideLayer('layer1')}
                    style={{ zIndex: zIndices['layer1'] || 1000 }}
                    onClick={() => handleLayerClick('layer1')}
                />
            )}
            {visibleLayers.includes('layer2') && (
                <YoutubeLayer
                    onClose={() => hideLayer('layer2')}
                    style={{ zIndex: zIndices['layer2'] || 1000 }}
                    onClick={() => handleLayerClick('layer2')}
                />
            )}
            {visibleLayers.includes('layer3') && (
                <PortLayer
                    onClose={() => hideLayer('layer3')}
                    style={{ zIndex: zIndices['layer3'] || 1000 }}
                    onClick={() => handleLayerClick('layer3')}
                />
            )}
            {visibleLayers.includes('layer4') && (
                <ChatLayer
                    onClose={() => hideLayer('layer4')}
                    style={{ zIndex: zIndices['layer4'] || 1000 }}
                    onClick={() => handleLayerClick('layer4')}
                />
            )}
        </>
    );
};

export default LayerManager;
