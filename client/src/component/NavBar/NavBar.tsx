import React from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import { leftMenuOpen } from "../../redux/action";
const NavBar = () => {
  const dispatch = useDispatch();

  return (
    <AppBar className="navBar">
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
  );
};

export default NavBar;
