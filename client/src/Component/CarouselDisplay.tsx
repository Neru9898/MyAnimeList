import React from "react";
import "./Carousel.scss";
import { Carousel } from "react-responsive-carousel";
import { Typography } from "@mui/material";

const CarouselDisplay = ({ displayList, title, axis }: any) => {
  return (
    <>
      <Typography variant="h1" className="title-font">
        {title}
      </Typography>
      <Carousel
        // autoPlay
        centerMode
        interval={4000}
        centerSlidePercentage={20}
        infiniteLoop
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        axis={axis}
        className="carousel-container"
        verticalSwipe="standard"
        // onChange={(e) => console.log(e)}
      >
        {displayList.map((imageData: any) => {
          return (
            <div key={imageData.mal_id}>
              <img
                className="carousel-image"
                src={imageData.images.jpg.large_image_url}
              />
              {/* {console.log(imageData)} */}
              <p className="legend">{imageData.title}</p>
            </div>
          );
        })}
      </Carousel>
    </>
  );
};

export default CarouselDisplay;
