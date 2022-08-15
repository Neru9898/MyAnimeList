import { Grid, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CarouselDisplay from "../Component/CarouselDisplay";
import "./Anime.scss";
import RightSideBar from "../Component/RightSideBar";

const Anime = () => {
  return (
    <Grid container className="anime-container">
      <Grid item xs={8}>
        <TextField
          className="search-bar"
          label="Search Anime"
          variant="standard"
        />
      </Grid>
      <RightSideBar />
      {/* <h1>search Anime </h1>
      <h1>show case top anime</h1>
      <h1>show case upcoming anime</h1>
      <h1>grid style display all anime if possible</h1>
      <h1>grid style display genres</h1> */}
    </Grid>
  );
};

export default Anime;
