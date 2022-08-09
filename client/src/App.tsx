import React from "react";
import "./App.scss";
import Header from "./Component/Header";
import Home from "./Pages/Home";

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <Home />
      {/* <h4>In Progress </h4>
      <p>Create a Home Page (will have popular anime + manga)</p>
      <p>Create Anime Page</p>
      <p>Create Manga Page</p>
      <p>Create Schedules Page</p> */}
    </div>
  );
};

export default App;

// audiowave font
