import React, { useState } from "react";
import { Box, Button, Drawer, Typography } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import TvIcon from "@mui/icons-material/Tv";
import BookIcon from "@mui/icons-material/Book";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import HomeIcon from "@mui/icons-material/Home";
import "./Header.scss";
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
          <Typography variant="h4" className="title-font">
            MAL
          </Typography>
          <Typography className="font">
            <HomeIcon />
            Home
          </Typography>
          <Typography className="font">
            <TvIcon />
            Anime
          </Typography>
          <Typography className="font">
            <BookIcon />
            Manga
          </Typography>
          <Typography className="font">
            <CalendarTodayIcon />
            Schedule
          </Typography>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Header;
