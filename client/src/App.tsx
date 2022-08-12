import React from "react";
import "./App.scss";
import Header from "./Component/Header";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Anime from "./Pages/Anime";
const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Anime" element={<Anime />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

// audiowave font
