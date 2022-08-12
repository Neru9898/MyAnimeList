import { useEffect, useState } from "react";
import axios from "axios";
import CarouselDisplay from "./CarouselDisplay";
import Loading from "./Loading";
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
  const topMangaUrl =
    "https://api.jikan.moe/v4/top/manga?page=1&type=manga&filter=bypopularity";
  const topManhwaUrl =
    "https://api.jikan.moe/v4/top/manga?page=1&type=manhwa&filter=bypopularity";
  const topManhuaUrl =
    "https://api.jikan.moe/v4/top/manga?page=1&type=manhua&filter=bypopularity";
  const [animeList, setAnimeList] = useState<any>([]);
  const [movieList, setMovieList] = useState<any>([]);
  const [upcomingAnimeList, setUpcomingAnimeList] = useState<any>([]);
  const [upcomingMovieList, setUpcomingMovieList] = useState<any>([]);
  const [mangaList, setMangaList] = useState<any>([]);
  const [manhwaList, setManhwaList] = useState<any>([]);
  const [manhuaList, setManhuaList] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>();
  const fetchData = async () => {
    const topAnime = await axios.get(topAnimeUrl).then(await delay(3000));
    const topMovie = await axios.get(topMovieUrl).then(await delay(3000));
    const topUpcomingAnime = await axios
      .get(topUpcomingAnimeUrl)
      .then(await delay(3000));
    const topUpcomingMovie = await axios
      .get(topUpcomingMovieUrl)
      .then(await delay(6000));
    const topManga = await axios.get(topMangaUrl).then(await delay(6000));
    const topManhwa = await axios.get(topManhwaUrl).then(await delay(6000));
    const topManhua = await axios.get(topManhuaUrl).then(await delay(9000));
    try {
      await axios
        .all([
          topAnime,
          topMovie,
          topUpcomingAnime,
          topUpcomingMovie,
          topManga,
          topManhwa,
          topManhua,
        ])
        .then(
          axios.spread((...responses): any => {
            setAnimeList(responses[0].data.data);
            setMovieList(responses[1].data.data);
            setUpcomingAnimeList(responses[2].data.data);
            setUpcomingMovieList(responses[3].data.data);
            setMangaList(responses[4].data.data);
            setManhwaList(responses[5].data.data);
            setManhuaList(responses[6].data.data);
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
    // const topOva = axios.get(topOvaUrl);
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
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
          <CarouselDisplay displayList={mangaList} title={"Top Magna"} />
          <CarouselDisplay displayList={manhwaList} title={"Top Manhwa"} />
          <CarouselDisplay displayList={manhuaList} title={"Top Manhua"} />
        </>
      )}
    </>
  );
};

export default TopAnimeContent;
