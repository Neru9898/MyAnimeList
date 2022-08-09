import { Grid } from "@mui/material";
import React from "react";
import "./Home.scss";
const Home = () => {
  return (
    <Grid container direction="column" className="home-container">
      <Grid item>xs=6 md=8</Grid>

      <Grid item>xs=6 md=8</Grid>
    </Grid>
  );
};

export default Home;
