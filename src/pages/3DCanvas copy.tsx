import React, { useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { FaBell, FaCog, FaUser, FaFileAlt } from "react-icons/fa";
import { faker } from "@faker-js/faker"; // Import faker

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
// Carousel Component
const Carousel: React.FC<{
  items: { id: number; image: string; title: string }[];
  onSelectLevel: (levelId: number) => void; // New prop to handle level selection
}> = ({ items, onSelectLevel }) => {
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
    <div className="dark flex flex-col items-center border w-full h-full">
      <div className="absolute bottom-0 ">
        {/* Carousel Item */}
        <div className="w-full flex items-center justify-center">
          <div
            className="relative w-48 h-48 cursor-pointer"
            onClick={() => onSelectLevel(items[currentIndex].id)} // Select level
          >
            <img
              src={items[currentIndex].image}
              alt={`Item ${currentIndex + 1}`}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Centered Text */}
        <div className="flex flex-col items-center justify-center mt-10 w-full bg-opacity-50 text-white text-center py-2">
          <p className="text-lg font-semibold">Select Your Level</p>
          <p className="text-sm italic">{items[currentIndex].title}</p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center items-center my-10">
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
    </div>
  );
};

const Topics: React.FC<{ levelId: number; onBack: () => void }> = ({
  levelId,
  onBack,
}) => {
  // Dummy topics data
  const topics: Record<number, string[]> = {
    1: ["Basics of HTML", "CSS Fundamentals", "JavaScript Intro"],
    2: ["React Basics", "State Management", "Component Lifecycle"],
    3: ["Advanced React", "Performance Optimization", "Server-Side Rendering"],
    4: ["Full Stack Development", "Scalability", "Cloud Deployment"],
  };

  // Pagination State
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(topics[levelId]?.length / itemsPerPage);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, totalPages - 1));
  };

  return (
    <div className="flex flex-col w-full h-full relative border">
      {/* Back Button */}
      <button
        className="px-4 py-2 bg-gray-700 text-white text-sm font-semibold rounded hover:bg-gray-600 transition w-full"
        onClick={onBack}
      >
        ← Back to Levels
      </button>

      {/* Topic List */}
      <div className="flex flex-col flex-1 overflow-y-auto p-2">
        {topics[levelId]
          ?.slice(
            currentIndex * itemsPerPage,
            (currentIndex + 1) * itemsPerPage,
          )
          .map((topic, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 cursor-pointer transition"
            >
              <FaFileAlt className="text-gray-400 text-lg" /> {/* File Icon */}
              <span className="text-white text-md font-medium">{topic}</span>
            </div>
          ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        <button
          onClick={handlePrev}
          className="bg-gray-700 text-white px-4 py-2 rounded-l-lg disabled:opacity-50"
          disabled={currentIndex === 0}
        >
          Prev
        </button>
        <span className="text-white text-md font-semibold">
          {currentIndex + 1} / {totalPages}
        </span>
        <button
          onClick={handleNext}
          className="bg-gray-700 text-white px-4 py-2 rounded-r-lg disabled:opacity-50"
          disabled={currentIndex === totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const ThreeDCanvas: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  // Define static carousel items with fixed titles
  const carouselItems = [
    {
      id: 1,
      image: faker.image.url({ width: 150, height: 150 }), // Random image URL
      title: "Beginner-Level",
    },
    {
      id: 2,
      image: faker.image.url({ width: 150, height: 150 }),
      title: "Intermediate-Level",
    },
    {
      id: 3,
      image: faker.image.url({ width: 150, height: 150 }),
      title: "Advanced-Level",
    },
    {
      id: 4,
      image: faker.image.url({ width: 150, height: 150 }),
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
        <Canvas
          gl={{ antialias: true }}
          style={{ backgroundColor: "black" }} // Set the background color to black
        >
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

        {/* Conditional rendering for Carousel or Topics */}
        <div className="flex w-full h-full">
          {selectedLevel === null ? (
            <Carousel
              items={carouselItems}
              onSelectLevel={(levelId) => setSelectedLevel(levelId)} // Handle level selection
            />
          ) : (
            <Topics
              levelId={selectedLevel}
              onBack={() => setSelectedLevel(null)} // Go back to carousel
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ThreeDCanvas;
