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
  const [peopleList, setPeopleList] = useState([]);
  useEffect(() => {
    axios.get("https://api.jikan.moe/v4/top/anime").then((res: any) => {
      console.log(res.data);
      setAnimeList(res.data.data);
    });
  }, []);
  useEffect(() => {
    axios.get("https://api.jikan.moe/v4/top/manga").then((res: any) => {
      // console.log(res.data);
      setMangaList(res.data.data);
    });
  }, []);
  useEffect(() => {
    axios.get("https://api.jikan.moe/v4/top/characters").then((res: any) => {
      // console.log(res.data);
      setCharactersList(res.data.data);
    });
  }, []);
  useEffect(() => {
    axios.get("https://api.jikan.moe/v4/top/people").then((res: any) => {
      // console.log(res.data);
      setPeopleList(res.data.data);
    });
  }, []);

  return (
    <Grid container className="home-container">
      Top Anime
      <Carousel
        autoPlay
        centerMode
        interval={4000}
        centerSlidePercentage={20}
        infiniteLoop
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        className="carousel-container"
        onChange={(e) => console.log(e)}
      >
        {animeList.map((anime: any) => {
          return (
            <div key={anime.mal_id}>
              <img
                className="carousel-image"
                src={anime.images.jpg.large_image_url}
              />
              <p className="legend">{anime.title_english}</p>
            </div>
          );
        })}
      </Carousel>
      Top Manga
      <Carousel
        autoPlay
        centerMode
        centerSlidePercentage={20}
        infiniteLoop
        showIndicators={false}
        showThumbs={false}
        interval={4000}
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
        centerSlidePercentage={20}
        infiniteLoop
        showIndicators={false}
        showThumbs={false}
        interval={4000}
        showStatus={false}
        className="carousel-container"
      >
        {charactersList.map((character: any) => {
          // console.log(character.images.jpg.image_url);
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
      Top People
      <Carousel
        autoPlay
        centerMode
        centerSlidePercentage={20}
        infiniteLoop
        showIndicators={false}
        showThumbs={false}
        interval={4000}
        showStatus={false}
        className="carousel-container"
      >
        {peopleList.map((people: any) => {
          // console.log(people.images.jpg.image_url);
          return (
            <div key={people.mal_id}>
              <img
                className="carousel-image"
                src={people.images.jpg.image_url}
              />
            </div>
          );
        })}
      </Carousel>
    </Grid>
  );
};

export default Home;
