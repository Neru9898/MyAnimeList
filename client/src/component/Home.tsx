import React from "react";
import "./Home.scss";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
const Home = () => {
  return (
    <div className="home">
      <AppBar style={{ background: "transparent", boxShadow: "none" }}>
        <Toolbar>
          <IconButton size="large" className="btn">
            <MenuRoundedIcon fontSize="large" className="menuIcon" />
          </IconButton>
          <Typography variant="h6" component="div">
            MyAnimeList
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Home;
