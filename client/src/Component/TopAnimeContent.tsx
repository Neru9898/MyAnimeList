import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import CarouselDisplay from "./CarouselDisplay";
const delay: any = (ms: number) => {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
};
const TopAnimeContent = () => {
  const topAnimeUrl =
    "https://api.jikan.moe/v4/top/anime?page=1&type=tv&filter=bypopularity";
  const topUpcomingAnimeUrl =
    "https://api.jikan.moe/v4/top/anime?page=1&type=tv&filter=upcoming";
  const topMovieUrl =
    "https://api.jikan.moe/v4/top/anime?page=1&type=movie&filter=bypopularity";
  const topUpcomingMovieUrl =
    "https://api.jikan.moe/v4/top/anime?page=1&type=movie&filter=upcoming";
  const [animeList, setAnimeList] = useState<any>([]);
  const [movieList, setMovieList] = useState<any>([]);
  const [upcomingAnimeList, setUpcomingAnimeList] = useState<any>([]);
  const [upcomingMovieList, setUpcomingMovieList] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>();
  const fetchData = async () => {
    const topAnime = await axios.get(topAnimeUrl).then(await delay(1000));
    const topMovie = await axios.get(topMovieUrl).then(await delay(2000));
    const topUpcomingAnime = await axios
      .get(topUpcomingAnimeUrl)
      .then(await delay(3000));
    const topUpcomingMovie = await axios
      .get(topUpcomingMovieUrl)
      .then(await delay(4000));
    try {
      await axios
        .all([topAnime, topMovie, topUpcomingAnime, topUpcomingMovie])
        .then(
          axios.spread((...responses): any => {
            console.log(responses);
            setAnimeList(responses[0].data.data);
            setMovieList(responses[1].data.data);
            setUpcomingAnimeList(responses[2].data.data);
            setUpcomingMovieList(responses[3].data.data);

            setError("");
            setLoading(false);
          })
        );
    } catch (error) {
      console.log(error);

      setError(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    // const topOva = axios.get(topOvaUrl);
    fetchData();
    console.log("asldfj");
  }, []);

  return (
    <Box>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <CarouselDisplay displayList={animeList} title={"Top Anime"} />
          <CarouselDisplay displayList={movieList} title={"Top Movie"} />
          <CarouselDisplay
            displayList={upcomingAnimeList}
            title={"Top Upcoming Anime"}
          />
          <CarouselDisplay
            displayList={upcomingMovieList}
            title={"Top Upcoming Movie"}
          />
        </>
      )}
    </Box>
  );
};

export default TopAnimeContent;
