import React, { useState } from "react";
import { Box, Button, Drawer, Typography } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

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
        onClose={() => setIsOpen(false)}
      >
        <Box className="drawer-container" onClick={() => setIsOpen(false)}>
          List Coming
        </Box>
      </Drawer>
    </Box>
  );
};

export default Header;
