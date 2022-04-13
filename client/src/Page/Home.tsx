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
import Temp from "./Temp";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Home.scss";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
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

  return (
    <div className="home">
      <NavBar />
      <LeftMenu />

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
        </div>
      )}
      {/* <Temp /> */}
      {loading && (
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          // autoPlay={this.props.deviceType !== "mobile" ? true : false}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="test"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          // deviceType={this.props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-6-px"
        >
          <div></div>

          {topAnime.map((image: any) => {
            return <img src={image.images.jpg.large_image_url} />;
          })}
        </Carousel>
      )}
    </div>
  );
};

export default Home;
