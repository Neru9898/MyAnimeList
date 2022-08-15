import { Grid, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CarouselDisplay from "../Component/CarouselDisplay";
import Loading from "./Loading";

const delay: any = (ms: number) => {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
};

const RightSideBar = () => {
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
    <Grid item xs={4}>
      {loading ? (
        <>
          {" "}
          <Loading />
        </>
      ) : (
        <>
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
        </>
      )}
    </Grid>
  );
};

export default RightSideBar;
// loading ? (
//   <Loading />
// ) : (
//   <>
//     <Grid item xs={4}>
//       <CarouselDisplay
//         displayList={animeList}
//         title={"Top Anime"}
//         axis={"vertical"}
//       />{" "}
//       <CarouselDisplay
//         displayList={upcomingAnimeList}
//         title={"Top Upcoming Anime"}
//         axis={"vertical"}
//       />
//     </Grid>
//   </>
