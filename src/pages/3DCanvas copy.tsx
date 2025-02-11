import React, { useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { FaBell, FaCog, FaUser } from "react-icons/fa"; // Import icons

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

// Carousel Component
const Carousel: React.FC<{
  items: { id: number; image: string; title: string }[];
}> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1,
    );
  };

  return (
    <div className="dark relative flex flex-col items-center justify-between h-[90vh] border-8 w-full">
      {/* Carousel Item */}
      <div className="w-full flex items-center justify-center h-[50%]">
        <div className="relative w-48 h-48">
          <img
            src={items[currentIndex].image}
            alt={`Item ${currentIndex + 1}`}
            className="w-full h-full object-contain"
          />
          <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-center py-2">
            <p className="text-sm italic">{items[currentIndex].title}</p>
          </div>
        </div>
      </div>

      {/* Centered Text */}
      <div className="flex items-center justify-center h-[15%]">
        <p className="text-center text-white text-lg font-semibold">
          Select Your Level
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center items-center h-[15%]">
        <button
          onClick={handlePrev}
          className="bg-gray-700 text-white px-4 py-2 rounded-l-lg"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          className="bg-gray-700 text-white px-4 py-2 rounded-r-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const ThreeDCanvas: React.FC = () => {
  const carouselItems = [
    {
      id: 1,
      image: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Beginner",
      title: "Beginner-Level",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/150/00FF00/FFFFFF?text=Intermediate",
      title: "Intermediate-Level",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Advanced",
      title: "Advanced-Level",
    },
    {
      id: 4,
      image: "https://via.placeholder.com/150/FFFF00/000000?text=Expert",
      title: "Expert-Level",
    },
  ];

  return (
    <div className="dark flex w-full h-screen overflow-hidden bg-gray-900 text-gray-100">
      {/* Left section for the 3D Canvas */}
      <div
        className="h-full"
        style={{
          width: "calc(100% - 33.33%)", // Dynamically take the remaining 2/3 of the viewport
          borderRight: "1px solid gray",
        }}
      >
        <Canvas>
          <Lights />
          <Box />
        </Canvas>
      </div>

      {/* Right section for text, assets, and content */}
      <div
        className="h-full flex flex-col border-l border-gray-700 relative"
        style={{
          width: "33.33%", // Dynamically take 1/3 of the viewport width
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <header className="bg-gray-800 p-4 border-b border-gray-700 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="https://via.placeholder.com/40"
              alt="Logo"
              className="w-10 h-10"
            />
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <FaBell className="text-white text-lg cursor-pointer" />
            <FaCog className="text-white text-lg cursor-pointer" />
            <FaUser className="text-white text-lg cursor-pointer" />
          </div>
        </header>

        {/* Carousel anchored at the bottom */}
        <div className="absolute bottom-0 w-full">
          <Carousel items={carouselItems} />
        </div>
      </div>
    </div>
  );
};

export default ThreeDCanvas;
