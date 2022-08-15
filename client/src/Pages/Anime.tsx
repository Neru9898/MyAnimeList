import { Grid, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CarouselDisplay from "../Component/CarouselDisplay";
import "./Anime.scss";
const delay: any = (ms: number) => {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
};
const Anime = () => {
  const topAnimeUrl =
    "https://api.jikan.moe/v4/top/anime?page=1&type=tv&filter=bypopularity";
  const topUpcomingAnimeUrl =
    "https://api.jikan.moe/v4/top/anime?page=1&type=tv&filter=upcoming";

  const [animeList, setAnimeList] = useState<any>([]);

  const [upcomingAnimeList, setUpcomingAnimeList] = useState<any>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>();
  const fetchData = async () => {
    const topAnime = await axios.get(topAnimeUrl).then(await delay(3000));
    const topUpcomingAnime = await axios
      .get(topUpcomingAnimeUrl)
      .then(await delay(3000));

    try {
      await axios.all([topAnime, topUpcomingAnime]).then(
        axios.spread((...responses): any => {
          setAnimeList(responses[0].data.data);
          setUpcomingAnimeList(responses[1].data.data);
          setError("");
          setLoading(false);
        })
      );
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Grid container className="anime-container">
      <Grid item xs={8}>
        <TextField id="outlined-basic" label="Outlined" variant="standard" />
      </Grid>
      <Grid item xs={4}>
        <CarouselDisplay
          displayList={animeList}
          title={"Top Anime"}
          axis={"vertical"}
        />{" "}
        <CarouselDisplay
          displayList={upcomingAnimeList}
          title={"Top Upcoming Anime"}
          axis={"vertical"}
        />
      </Grid>
      {/* <h1>search Anime </h1>
      <h1>show case top anime</h1>
      <h1>show case upcoming anime</h1>
      <h1>grid style display all anime if possible</h1>
      <h1>grid style display genres</h1> */}
    </Grid>
  );
};

export default Anime;
