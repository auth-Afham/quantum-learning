import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import Home from "./pages/Home";

// Box component using THREE
const Box: React.FC = () => {
  const { scene } = useThree();

  React.useEffect(() => {
    // Create a mesh
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: "hotpink" });
    const mesh = new THREE.Mesh(geometry, material);

    // Set rotation
    mesh.rotation.set(0.4, 0.2, 0.1);

    // Add to the scene
    scene.add(mesh);

    // Cleanup on unmount
    return () => {
      scene.remove(mesh);
      geometry.dispose();
      material.dispose();
    };
  }, [scene]);

  return null; // No JSX to render
};

// Lights component using THREE
const Lights: React.FC = () => {
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

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <div style={{ width: "100%", height: "500px" }}>
                <Canvas>
                  {/* Add lights */}
                  <Lights />

                  {/* Add spinning box */}
                  <Box />
                </Canvas>
              </div>
            </>
          }
        />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
