import React, { useState } from "react";
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

// Card component
const Card: React.FC<{
  id: number;
  content: string;
  zIndex: number;
  onClick: () => void;
  isVisible: boolean;
}> = ({ id, content, zIndex, onClick, isVisible }) => {
  return (
    <div
      onClick={onClick}
      className={`relative w-32 h-48 cursor-pointer`}
      style={{
        transform: `translateZ(${zIndex}px)`,
        position: "absolute",
        top: 0,
        left: "50%",
        transformOrigin: "center center",
        display: isVisible ? "block" : "none", // Only show visible cards
      }}
    >
      <div className="absolute inset-0 bg-blue-500 text-white flex items-center justify-center rounded-lg shadow-lg">
        <p className="text-lg font-bold">Card {id}</p>
      </div>
    </div>
  );
};

const ThreeDCanvas: React.FC = () => {
  const cards = [
    { id: 1, content: "A♥" },
    { id: 2, content: "K♠" },
    { id: 3, content: "Q♣" },
    { id: 4, content: "J♦" },
  ];

  const [topCardIndex, setTopCardIndex] = useState(0); // Track the top card

  const handleCardClick = () => {
    if (topCardIndex < cards.length - 1) {
      setTopCardIndex(topCardIndex + 1); // Move to the next card
    }
  };

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
        className="h-full flex flex-col border-l border-black"
        style={{
          width: "33.33%", // Dynamically take 1/3 of the viewport width
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <header className="bg-gray-200 p-4 border-b border-black">
          <h1 className="text-xl font-bold">Right Side Header</h1>
        </header>

        {/* Main Content */}
        <div className="flex-grow px-4 py-2 overflow-auto perspective">
          <h2 className="text-lg font-bold">Stacked Playing Cards</h2>
          <p>Click on the top card to reveal the next one!</p>
          <div
            className="relative"
            style={{
              height: "200px",
              transformStyle: "preserve-3d", // Enable 3D stacking
            }}
          >
            {cards.map((card, index) => (
              <Card
                key={card.id}
                id={card.id}
                content={card.content}
                zIndex={-index * 50} // Incremental Z-axis stacking
                onClick={handleCardClick}
                isVisible={index >= topCardIndex} // Show only cards on or below the top
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeDCanvas;
