// import React, { useState } from "react";
import "./Home.scss";
import NavBar from "../component/NavBar/NavBar";
import LeftMenu from "../component/LeftMenu/LeftMenu";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
// import
const Home = () => {
  const [topAnime, setTopAnime] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [currImage, setCurrImage] = useState<number>(0);

  useEffect(() => {
    axios.get("https://api.jikan.moe/v4/top/anime").then((res: any) => {
      console.log(res.data.data);
      setTopAnime(res.data.data);
      setLoading(true);
    });
  }, []);
  return (
    <div className="home">
      <NavBar />
      <LeftMenu />

      {loading && (
        <div className="topBody">
          <ArrowBackIosOutlinedIcon
            onClick={() => setCurrImage(currImage - 1)}
            className="arrowLeftIcon"
          />

          <Box className="bodyText">
            <Typography variant="h5" className="bodyTextFormat">
              {topAnime[currImage].title_english}
            </Typography>
            <Typography variant="subtitle1" className="bodyTextFormat">
              {topAnime[currImage].synopsis}
            </Typography>
          </Box>
          <img
            src={topAnime[currImage].images.jpg.large_image_url}
            className="bodyImage"
          />
          <ArrowForwardIosOutlinedIcon
            // fontSize="large"
            onClick={() => setCurrImage(currImage + 1)}
            className="arrowRightIcon"
          />
        </div>
      )}
    </div>
  );
};

export default Home;
