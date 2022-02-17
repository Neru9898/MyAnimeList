import React, { useState } from "react";
import { Drawer } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import "./Home.sass";
const Home = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {/* NavBar */}
      <MenuRoundedIcon className="menuIcon" />
      <Drawer>xs=6 md=8</Drawer>
    </div>
  );
};

export default Home;
