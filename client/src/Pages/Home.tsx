import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./Home.scss";
import axios from "axios";
const Home = () => {
  const [animeList, setAnimeList] = useState([]);
  const [mangaList, setMangaList] = useState([]);
  const [charactersList, setCharactersList] = useState([]);
  useEffect(() => {
    axios.get("https://api.jikan.moe/v4/top/anime").then((res: any) => {
      // console.log(res.data);
      setAnimeList(res.data.data);
    });
  }, []);
  useEffect(() => {
    axios.get("https://api.jikan.moe/v4/top/manga").then((res: any) => {
      // console.log(res.data);
      setMangaList(res.data.data);
    });
    axios.get("https://api.jikan.moe/v4/top/characters").then((res: any) => {
      // console.log(res.data);
      setCharactersList(res.data.data);
    });
  }, []);
  // useEffect(() => {}, []);

  return (
    <Grid container className="home-container">
      Top Anime
      <Carousel
        autoPlay
        centerMode
        centerSlidePercentage={25}
        infiniteLoop
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        className="carousel-container"
      >
        {animeList.map((anime: any) => {
          return (
            <div key={anime.mal_id}>
              <img
                className="carousel-image"
                src={anime.images.jpg.large_image_url}
              />
            </div>
          );
        })}
      </Carousel>
      Top Manga
      <Carousel
        autoPlay
        centerMode
        centerSlidePercentage={25}
        infiniteLoop
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        className="carousel-container"
      >
        {mangaList.map((manga: any) => {
          return (
            <div key={manga.mal_id}>
              <img
                className="carousel-image"
                src={manga.images.jpg.large_image_url}
              />
            </div>
          );
        })}
      </Carousel>
      Top Character
      <Carousel
        autoPlay
        centerMode
        centerSlidePercentage={25}
        infiniteLoop
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        className="carousel-container"
      >
        {charactersList.map((character: any) => {
          console.log(character.images.jpg.image_url);
          return (
            <div key={character.mal_id}>
              <img
                className="carousel-image"
                src={character.images.jpg.image_url}
              />
            </div>
          );
        })}
      </Carousel>
    </Grid>
  );
};

export default Home;
