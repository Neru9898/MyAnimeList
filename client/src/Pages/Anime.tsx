import {
  Grid,
  ImageList,
  TextField,
  ImageListItem,
  styled,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormGroup,
  FormLabel,
} from "@mui/material";
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
        // console.log(res.data.data);
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
          label="Custom CSS"
          id="custom-css-outlined-input"
          onChange={(e: any) => {
            setSearchAnime(e.target.value);
            console.log(e.target.value);
          }}
        />
        {/* <FormControl component="fieldset"> */}
        <FormLabel component="legend">Type</FormLabel>
        <FormGroup aria-label="position" row>
          <FormControlLabel
            value="end"
            control={<Checkbox />}
            label="Tv"
            labelPlacement="end"
          />{" "}
          <FormControlLabel
            value="end"
            control={<Checkbox />}
            label="Movie"
            labelPlacement="end"
          />{" "}
          <FormControlLabel
            value="end"
            control={<Checkbox />}
            label="Ova"
            labelPlacement="end"
          />{" "}
          <FormControlLabel
            value="end"
            control={<Checkbox />}
            label="Special"
            labelPlacement="end"
          />
          <FormControlLabel
            value="end"
            control={<Checkbox />}
            label="Ona"
            labelPlacement="end"
          />
          <FormControlLabel
            value="end"
            control={<Checkbox />}
            label="Music"
            labelPlacement="end"
          />
        </FormGroup>
        <FormLabel component="legend">Status</FormLabel>
        <FormGroup aria-label="position" row>
          <FormControlLabel
            value="end"
            control={<Checkbox />}
            label="Airing"
            labelPlacement="end"
          />{" "}
          <FormControlLabel
            value="end"
            control={<Checkbox />}
            label="Complete"
            labelPlacement="end"
          />{" "}
          <FormControlLabel
            value="end"
            control={<Checkbox />}
            label="Upcoming"
            labelPlacement="end"
          />{" "}
        </FormGroup>

        <FormLabel component="legend">Rating</FormLabel>
        <FormGroup aria-label="position" row>
          <FormControlLabel
            value="end"
            control={<Checkbox />}
            label="G"
            labelPlacement="end"
          />{" "}
          <FormControlLabel
            value="end"
            control={<Checkbox />}
            label="PG"
            labelPlacement="end"
          />{" "}
          <FormControlLabel
            value="end"
            control={<Checkbox />}
            label="PG13"
            labelPlacement="end"
          />{" "}
          <FormControlLabel
            value="end"
            control={<Checkbox />}
            label="R"
            labelPlacement="end"
          />{" "}
        </FormGroup>

        <FormLabel component="legend">Sort By</FormLabel>
        <FormGroup aria-label="position" row>
          <FormControlLabel
            value="end"
            control={<Checkbox />}
            label="Title"
            labelPlacement="end"
          />{" "}
          <FormControlLabel
            value="end"
            control={<Checkbox />}
            label="Type"
            labelPlacement="end"
          />{" "}
          <FormControlLabel
            value="end"
            control={<Checkbox />}
            label="Rating"
            labelPlacement="end"
          />{" "}
          <FormControlLabel
            value="end"
            control={<Checkbox />}
            label="Episodes"
            labelPlacement="end"
          />{" "}
          <FormControlLabel
            value="end"
            control={<Checkbox />}
            label="Score"
            labelPlacement="end"
          />{" "}
          <FormControlLabel
            value="end"
            control={<Checkbox />}
            label="Popularity"
            labelPlacement="end"
          />{" "}
        </FormGroup>
        {/* </FormControl> */}
        {loading ? (
          <Loading />
        ) : (
          <Box className="search-result-container">
            {animeContent.map((anime: any, id: number) => (
              // <ImageListItem key={id} className="img-display">
              //   <img src={anime.images.jpg.image_url} />
              //   <div className="overlay">Test</div>
              // </ImageListItem>
              <ImageListItem key={id} className="img-display">
                <img className="image-img" src={anime.images.jpg.image_url} />
                <div className="image-overlay ">
                  <div className="image-title">{anime.title}</div>
                  <div className="image-title">{anime.type}</div>
                  <div className="image-title">{anime.episodes}</div>
                  <div className="image-title">{anime.rating}</div>
                  <div className="image-title">
                    {anime.airing ? "Ongoing" : "Finished"}
                  </div>
                </div>
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
