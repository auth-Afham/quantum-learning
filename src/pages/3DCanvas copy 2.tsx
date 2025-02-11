import React from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Box component using THREE
export const Box: React.FC = () => {
  const { scene } = useThree();
  const meshRef = React.useRef<THREE.Mesh>(null);

  React.useEffect(() => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: "hotpink" });
    const mesh = new THREE.Mesh(geometry, material);
    meshRef.current = mesh;

    scene.add(mesh);

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

  return null;
};

// Lights component using THREE
export const Lights: React.FC = () => {
  const { scene } = useThree();

  React.useEffect(() => {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    return () => {
      scene.remove(ambientLight);
      scene.remove(directionalLight);
    };
  }, [scene]);

  return null;
};

const ThreeDCanvas: React.FC = () => {
  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* Left section for the 3D Canvas */}
      <div
        className="h-full"
        style={{
          width: "calc(100% - 33.33%)", // Dynamically take the remaining 2/3 of the viewport
          borderRight: "1px solid black",
        }}
      >
        <Canvas>
          <Lights />
          <Box />
        </Canvas>
      </div>

      {/* Right section for text, assets, and content */}
      <div
        className="h-full px-4 py-2 border-l border-black"
        style={{
          width: "33.33%", // Dynamically take 1/3 of the viewport width
          boxSizing: "border-box",
        }}
      >
        <h2 className="text-lg font-bold">Right Side Content</h2>
        <p>This section dynamically takes 1/3 of the viewport width.</p>
        <p>Add your text, assets, or containers here!</p>
      </div>
    </div>
  );
};

export default ThreeDCanvas;
