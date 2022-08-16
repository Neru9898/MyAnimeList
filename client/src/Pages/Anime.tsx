import { Grid, ImageList, TextField, ImageListItem } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CarouselDisplay from "../Component/CarouselDisplay";
import "./Anime.scss";
import RightSideBar from "../Component/RightSideBar";
import Loading from "../Component/Loading";
import { Box } from "@mui/system";
const delay: any = (ms: number) => {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
};
const Anime = () => {
  const [searchAnime, setSearchAnime] = useState<string>("");
  const [animeContent, setAnimeContent] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>();
  useEffect(() => {
    setLoading(true);

    axios
      .get(`https://api.jikan.moe/v4/anime?letter=${searchAnime}`)
      .then((res) => {
        setAnimeContent(res.data.data);
        console.log(res.data.data);
        setError("");
        setLoading(false);
      })
      .catch((err) => {
        setError(error);
        setLoading(false);
      });
  }, [searchAnime]);
  return (
    <Grid container className="anime-container">
      <Grid item xs={8}>
        <TextField
          className="search-bar"
          label="Search Anime"
          variant="standard"
          onChange={(e) => {
            setSearchAnime(e.target.value);
          }}
        />
        {loading ? (
          <Loading />
        ) : (
          <Box className="search-result-container">
            {animeContent.map((anime: any, id: number) => (
              <ImageListItem key={id} className="img-display">
                <img src={anime.images.jpg.image_url} />
                <div className="caption">{anime.title}</div>
              </ImageListItem>
            ))}
          </Box>
        )}
      </Grid>

      <RightSideBar />
      {/* <h1>search Anime </h1>
      <h1>show case top anime</h1>
      <h1>show case upcoming anime</h1>
      <h1>grid style display all anime if possible</h1>
      <h1>grid style display genres</h1> */}
    </Grid>
  );
};

export default Anime;
