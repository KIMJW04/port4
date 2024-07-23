// src/context/LayerContext.tsx
"use client";

import React, { createContext, useContext, useState } from 'react';

// Context 생성
const LayerContext = createContext(null);

export const LayerProvider = ({ children }) => {
    const [layers, setLayers] = useState({}); // 레이어 상태를 저장하는 객체
    const [visibleLayers, setVisibleLayers] = useState([]); // 현재 보이는 레이어의 ID 리스트
    const [zIndices, setZIndices] = useState({}); // 레이어의 zIndex를 저장하는 객체

    // 레이어를 추가하는 함수
    const addLayer = (name, component) => {
        setLayers((prevLayers) => ({ ...prevLayers, [name]: component }));
    };

    // 레이어를 제거하는 함수
    const removeLayer = (name) => {
        setLayers((prevLayers) => {
            const newLayers = { ...prevLayers };
            delete newLayers[name];
            return newLayers;
        });
        setZIndices((prevZIndices) => {
            const newZIndices = { ...prevZIndices };
            delete newZIndices[name];
            return newZIndices;
        });
    };

    // 레이어를 가장 위로 가져오는 함수
    const bringToFront = (name) => {
        setZIndices((prevZIndices) => {
            const maxZIndex = Math.max(...Object.values(prevZIndices), 1000);
            return { ...prevZIndices, [name]: maxZIndex + 1 };
        });
    };

    // 레이어를 보이게 하는 함수
    const showLayer = (name) => {
        setVisibleLayers((prevVisibleLayers) => {
            if (prevVisibleLayers.includes(name)) return prevVisibleLayers;
            return [...prevVisibleLayers, name];
        });
        bringToFront(name); // 레이어를 보일 때 최상단으로
    };

    // 레이어를 숨기는 함수
    const hideLayer = (name) => {
        setVisibleLayers((prevVisibleLayers) =>
            prevVisibleLayers.filter((layer) => layer !== name)
        );
    };

    return (
        <LayerContext.Provider value={{ addLayer, removeLayer, bringToFront, showLayer, hideLayer, visibleLayers, zIndices }}>
            {children}
            {Object.entries(layers).map(([name, Layer]) => (
                visibleLayers.includes(name) ? <Layer key={name} zIndex={zIndices[name] || 1000} /> : null
            ))}
        </LayerContext.Provider>
    );
};

export const useLayerContext = () => useContext(LayerContext);
