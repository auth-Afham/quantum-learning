import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const Home: React.FC = () => {
  return (
    <div className="p-4">
      <Header />
      <p className="text-lg font-semibold mt-4">Welcome to Quantum Learning!</p>
      <Link to="/3d">
        <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
          Go to 3D Scene
        </button>
      </Link>
    </div>
  );
};

export default Home;
