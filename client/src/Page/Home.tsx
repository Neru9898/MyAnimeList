import React, { useState } from "react";
import "./Home.scss";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { AppBar, Drawer, Toolbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import IconButton from "@mui/material/IconButton";
import store from "../redux/store";
import { leftMenuOpen } from "../redux/action";
import LeftMenu from "../component/LeftMenu/LeftMenu";
// import
const Home = () => {
  // const [open, isOpen] = useState<boolean>(false);
  store.dispatch(leftMenuOpen());
  const dispatch = useDispatch();

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
            onClick={() => dispatch(leftMenuOpen())}
          >
            <MenuRoundedIcon fontSize="large" className="menuIcon" />
          </IconButton>
          <Typography variant="h6" component="div" className="text">
            MyAnimeList
          </Typography>
        </Toolbar>
      </AppBar>
      <LeftMenu />
    </div>
  );
};

export default Home;
