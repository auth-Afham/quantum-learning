import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ThreeDCanvas from "./pages/3DCanvas";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/3d" element={<ThreeDCanvas />} />
      </Routes>
    </Router>
  );
};

export default App;
