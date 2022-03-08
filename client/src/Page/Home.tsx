// import React, { useState } from "react";
import "./Home.scss";
import NavBar from "../component/NavBar/NavBar";
import LeftMenu from "../component/LeftMenu/LeftMenu";
// import
const Home = () => {
  return (
    <div className="home">
      <NavBar />
      <LeftMenu />
    </div>
  );
};

export default Home;
