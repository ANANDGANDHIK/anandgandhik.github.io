import React from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export function Bridge(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/bridge.glb') as unknown as {
    nodes: {
      BRIDGE: THREE.Mesh;
      'CIRCLE_-_MIXED': THREE.Mesh;
      'CIRCLE_-_TIME': THREE.Mesh;
      'CIRCLE_-_RACE': THREE.Mesh;
    };
    materials: {
      'Material.001': THREE.Material;
      Material: THREE.Material;
      'Material.005': THREE.Material;
      'Material.006': THREE.Material;
    };
  };

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BRIDGE.geometry}
        material={materials['Material.001']}
        position={[80, 0.5, 0]}
        rotation={[-Math.PI, 0, 0]}
        scale={[-78.89, -1.972, -9.861]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['CIRCLE_-_MIXED'].geometry}
        material={materials.Material}
        position={[80, 0.7, 0]}
        scale={2}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['CIRCLE_-_TIME'].geometry}
        material={materials['Material.005']}
        position={[80, 0.9, 0]}
        scale={4}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['CIRCLE_-_RACE'].geometry}
        material={materials['Material.006']}
        position={[80, 0.8, 0]}
        scale={3}
      />
    </group>
  );
}

useGLTF.preload('/models/bridge.glb');
