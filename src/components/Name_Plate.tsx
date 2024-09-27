import React from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

type GLTFResult = GLTF & {
  nodes: {
    'ARC-CICLE-DIV001': THREE.Mesh;
    'THIN-CIRCLE001': THREE.Mesh;
    'ARC-CICLE-DIV002': THREE.Mesh;
    NAME: THREE.Mesh;
    NAME_PLATE: THREE.Mesh;
  };
  materials: {
    'ARC-CICLE-DIV': THREE.Material;
    'THIN-CIRCLE': THREE.Material;
    Material: THREE.Material;
    'Material.001': THREE.Material;
    'Material.002': THREE.Material;
  };
};

export function NamePlate(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/name_plate.glb') as unknown as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['ARC-CICLE-DIV001'].geometry}
        material={materials['ARC-CICLE-DIV']}
        position={[-0.5, 0, 0]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['THIN-CIRCLE001'].geometry}
        material={materials['THIN-CIRCLE']}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['ARC-CICLE-DIV002'].geometry}
        material={materials.Material}
        position={[-0.3, 0, 0]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={1.88}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NAME.geometry}
        material={materials['Material.001']}
        position={[0.5, 0, 0]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[2.261, 1, 0.83]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NAME_PLATE.geometry}
        material={materials['Material.002']}
        position={[0.3, 0, 0]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        scale={[-3, -1, -0.6]}
      />
    </group>
  );
}

useGLTF.preload('/models/name_plate.glb');
