// 3DCanvas.tsx
import React from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Box component using THREE
export const Box: React.FC = () => {
  const { scene } = useThree();
  const meshRef = React.useRef<THREE.Mesh>(null);

  React.useEffect(() => {
    // Create a mesh
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: "hotpink" });
    const mesh = new THREE.Mesh(geometry, material);
    meshRef.current = mesh;

    // Add to the scene
    scene.add(mesh);

    // Cleanup on unmount
    return () => {
      scene.remove(mesh);
      geometry.dispose();
      material.dispose();
    };
  }, [scene]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return null; // No JSX to render
};

// Lights component using THREE
export const Lights: React.FC = () => {
  const { scene } = useThree();

  React.useEffect(() => {
    // Create ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Color, intensity
    scene.add(ambientLight);

    // Create directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Color, intensity
    directionalLight.position.set(5, 5, 5); // Position the light
    scene.add(directionalLight);

    // Cleanup on unmount
    return () => {
      scene.remove(ambientLight);
      scene.remove(directionalLight);
    };
  }, [scene]);

  return null; // No JSX to render
};

const ThreeDCanvas: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Canvas>
        <Lights />
        <Box />
      </Canvas>
    </div>
  );
};

export default ThreeDCanvas;
