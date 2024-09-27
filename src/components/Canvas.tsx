"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import { Mesh } from 'three';

const Scene = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    // Example animation logic
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <>
      <mesh ref={meshRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <OrbitControls />
    </>
  );
};

export default function CanvasComponent() {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  );
}
