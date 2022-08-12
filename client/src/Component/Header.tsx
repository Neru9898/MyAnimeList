import React, { useState } from "react";
import { Box, Button, Drawer, Typography } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import TvIcon from "@mui/icons-material/Tv";
import BookIcon from "@mui/icons-material/Book";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import HomeIcon from "@mui/icons-material/Home";
import "./Header.scss";
import { Link } from "react-router-dom";
const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>();
  return (
    <Box className="header-container">
      <Button className="left-menu-icon" onClick={() => setIsOpen(!isOpen)}>
        <MenuRoundedIcon />
      </Button>
      <Typography className="title-font">MAL</Typography>
      <Drawer
        hideBackdrop={true}
        anchor={"left"}
        open={isOpen}
        className="drawer-container"
        onClose={() => setIsOpen(false)}
        onClick={() => setIsOpen(false)}
      >
        <Box className="drawer-container">
          <Link to="/">
            <Typography variant="h4" className="title-font">
              MAL
            </Typography>
          </Link>
          <Link to="/">
            <Typography className="font">
              <HomeIcon />
              Home
            </Typography>
          </Link>
          <Link to="/anime">
            <Typography className="font">
              <TvIcon />
              Anime
            </Typography>
          </Link>
          <Link to="/manga">
            <Typography className="font">
              <BookIcon />
              Manga
            </Typography>
          </Link>
          <Link to="/schedule">
            <Typography className="font">
              <CalendarTodayIcon />
              Schedule
            </Typography>
          </Link>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Header;
