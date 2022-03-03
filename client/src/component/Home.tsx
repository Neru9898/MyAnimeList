import React, { useState } from "react";
import "./Home.scss";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Drawer,
  Toolbar,
  Typography,
  Box,
  Grid,
  List,
  // Item,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
// import
const Home = () => {
  const [open, isOpen] = useState<boolean>(false);
  return (
    <div className="home">
      <AppBar
        className="navBar"
        // style={{ background: "transparent", boxShadow: "none" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            className="btn"
            onClick={() => isOpen(!open)}
          >
            <MenuRoundedIcon fontSize="large" className="menuIcon" />
          </IconButton>
          <Typography variant="h6" component="div" className="text">
            MyAnimeList
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={() => isOpen(false)}>
        <Box className="menuContainer">
          <Toolbar className="menuHeader">
            <Typography variant="h5" component="div" className="text">
              Menu
            </Typography>
            <IconButton
              size="large"
              // className="btn"
              onClick={() => isOpen(!open)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
            {/* <CloseIcon></CloseIcon> */}
          </Toolbar>
          <Typography variant="h6" component="div" className="text">
            All Anime
          </Typography>
          <Typography variant="h6" component="div" className="text">
            Seasonal Anime
          </Typography>
          <Typography variant="h6" component="div" className="text">
            Anime Movies
          </Typography>
          <Typography variant="h6" component="div" className="text">
            Random Anime
          </Typography>
        </Box>
      </Drawer>
    </div>
  );
};

export default Home;
