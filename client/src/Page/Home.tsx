// import React, { useState } from "react";
import "./Home.scss";
import NavBar from "../component/NavBar/NavBar";
import LeftMenu from "../component/LeftMenu/LeftMenu";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { Carousel } from "antd";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
const contentStyle: any = {
  height: "160px",
  color: "black",
  fontSize: "24px",
  lineHeight: "160px",
  textAlign: "center",
  background: "black",
};
const Home = () => {
  const [topAnime, setTopAnime] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [currImage, setCurrImage] = useState<number>(0);
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const slider1: any = useRef(null);
  const slider2: any = useRef(null);
  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);
  useEffect(() => {
    axios.get("https://api.jikan.moe/v4/top/anime").then((res: any) => {
      console.log(res.data.data);
      setTopAnime(res.data.data);
      setLoading(true);
    });
  }, []);
  const directionOfCarousel = (dir: string) => {
    if (dir === "Right") {
      setCurrImage(currImage >= topAnime.length - 1 ? 0 : currImage + 1);
      console.log(currImage);
    } else {
      console.log(currImage, topAnime.length - 1);
      setCurrImage(currImage <= 0 ? 24 : currImage - 1);
    }

    // console.log(topAnime.length);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 4,
    slidesToShow: 4,
  };

  return (
    <div className="home">
      {/* <NavBar /> */}
      {/* <LeftMenu /> */}
      {/* 
      {loading && (
        <div className="topBody">
          <ArrowBackIosOutlinedIcon
            fontSize="large"
            onClick={() => {
              // setCurrImage(currImage - 1);
              directionOfCarousel("Left");
            }}
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
            fontSize="large"
            onClick={() => {
              // setCurrImage(currImage + 1);
              directionOfCarousel("Right");
            }}
            className="arrowRightIcon"
          />

          <Carousel>
            {topAnime.map((anime: any) => {
              console.log(anime.images.jpg.large_image_url);
            })}
          </Carousel>
        </div> 
       )} */}
      {loading && (
        <div>
          <Slider className="mainSlider" asNavFor={nav2} ref={slider1}>
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
          </Slider>
          <h4>Second Slider</h4>
          <Slider
            asNavFor={nav1}
            ref={slider2}
            slidesToShow={3}
            swipeToSlide={true}
            focusOnSelect={true}
          >
            <div>
              <h3>1</h3>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div>
            <div>
              <h3>5</h3>
            </div>
            <div>
              <h3>6</h3>
            </div>
          </Slider>
        </div>
      )}
    </div>
  );
};

export default Home;
