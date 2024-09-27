"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { NamePlate } from './Name_Plate';
import { Bridge } from './Bridge';
import SwipeUp from './SwipeUp';

interface CameraControllerProps {
  swipeUp: boolean;
}

const CameraController: React.FC<CameraControllerProps> = ({ swipeUp }) => {
  const { camera } = useThree();

  useEffect(() => {
    // Set initial camera position
    camera.position.set(0, 0, 0);
    camera.lookAt(0, 0, 0);

    // Animate camera to new position
    const animateCamera = () => {
      camera.position.set(5, 10, 0);
      camera.lookAt(0, 0, 0);
    };

    animateCamera();

    // Handle scroll event
    const handleScroll = (event: WheelEvent) => {
      camera.position.x += event.deltaY * 0.01; // Adjust the multiplier as needed
      camera.lookAt(0, 0, 0);
    };

    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [camera]);

  useEffect(() => {
    if (swipeUp) {
      // Move the camera in the x-axis when swipe up is detected
      camera.position.x += 0.1; // Adjust the value as needed
      camera.lookAt(0, 0, 0);
    }
  }, [swipeUp, camera]);

  return null;
};

const ModelCanvas: React.FC = () => {
  const [swipeUp, setSwipeUp] = useState(false);

  const handleSwipeUp = () => {
    setSwipeUp(true);
  };

  return (
    <>
      <SwipeUp onSwipeUp={handleSwipeUp} />
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
            <NamePlate position={[-8, 3, -2]} rotation={[0, Math.PI / 4, 0]} />
            <Bridge position={[0, 0, 0]} />
        </Suspense>
        <CameraController swipeUp={swipeUp} />
        <OrbitControls />
      </Canvas>z
    </>
  );
};

export default ModelCanvas;
