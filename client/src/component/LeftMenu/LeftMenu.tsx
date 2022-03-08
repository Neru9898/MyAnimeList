import { Drawer, Box, Toolbar, Typography, IconButton } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducer";
import { leftMenuOpen } from "../../redux/action";

const LeftMenu = () => {
  const isOpen = useSelector((state: RootState) => state.leftMenu);
  const dispatch = useDispatch();
  return (
    <Drawer anchor="left" open={isOpen}>
      <Box className="menuContainer">
        <Toolbar className="menuHeader">
          <Typography variant="h5" component="div" className="menuText">
            Menu
          </Typography>
          <IconButton
            size="large"
            className="closeBtn"
            onClick={() => dispatch(leftMenuOpen())}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
          {/* <CloseIcon></CloseIcon> */}
        </Toolbar>
        <Typography variant="h6" component="div" className="menuText">
          All Anime
        </Typography>
        <Typography variant="h6" component="div" className="menuText">
          Seasonal Anime
        </Typography>
        <Typography variant="h6" component="div" className="menuText">
          Anime Movies
        </Typography>
        <Typography variant="h6" component="div" className="menuText">
          Random Anime
        </Typography>
      </Box>
    </Drawer>
  );
};

export default LeftMenu;
