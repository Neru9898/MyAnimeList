import { CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { KeyboardArrowRight, KeyboardArrowLeft } from "@mui/icons-material";
import "./Anime.scss";
import { Link } from "react-router-dom";
import { delay } from "../../Helpers/delay";
const Anime = () => {
  const [animeList, setAnimeList] = useState<any>();
  const [currAnime, setCurrAnime] = useState<any>();
  const [currSeason, setCurrSeason] = useState<any>();
  const [currSearchAnime, setCurrSearchAnime] = useState<any>();
  const [currPage, setCurrPage] = useState<any>({
    CurrentPage: 1,
    LastPage: 1,
  });
  const [search, setSearch] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(true);

  const getData = async () => {
    axios
      .get(
        `https://api.jikan.moe/v4/top/anime?type=tv&page=${currPage.CurrentPage}`
      )
      .then((res: any) => {
        console.log(res.data);
        setAnimeList(res.data.data);
        // setCurrPage({
        //   ...currPage,
        //   LastPage: res.data.pagination.last_visible_page,
        // });
        setCurrAnime(res.data.data[0]);
        // setLoading(false);
      });

    await delay(1000);

    axios.get(`https://api.jikan.moe/v4/seasons/now`).then((res: any) => {
      setCurrSeason(res.data.data);
      // setLoading(false);
    });
  };

  const getSearchData = async () => {
    await delay(1000);

    axios.get(`https://api.jikan.moe/v4/anime?q=${search}`).then((res: any) => {
      console.log(res.data);
      setCurrSearchAnime(res.data.data);
      setLoading(false);

      // setLoading(false);
    });
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getSearchData();
  }, [search]);

  const handleChange = (anime: any) => {
    setCurrAnime(anime);
  };

  // const handlePageChange = (dir: string) => {
  //   if (dir === ">" && currPage.CurrentPage <= currPage.LastPage) {
  //     setCurrPage({
  //       ...currPage,
  //       CurrentPage: currPage.CurrentPage + 1,
  //     });
  //   } else if (dir === "<" && currPage.CurrentPage > 1) {
  //     console.log(currPage);
  //     setCurrPage({
  //       ...currPage,
  //       CurrentPage: currPage.CurrentPage - 1,
  //     });
  //   }

  //   setLoading(true);
  // };
  return (
    <div className="anime-container">
      <div className="left-container">
        <div className="top-control-container">
          <Typography variant="h5">Search Anime</Typography>
          <input
            className="search-input"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="grid-container">
          {loading ? (
            <CircularProgress />
          ) : (
            currSearchAnime.map((anime: any) => {
              return (
                <Link
                  key={anime.mal_id}
                  to={`/anime/${anime.mal_id}`}
                  className="grid-content"
                  onMouseOver={() => handleChange(anime)}
                >
                  <img src={anime.images.jpg.image_url} alt={anime.title} />
                  <Typography className="text">{anime.title}</Typography>
                </Link>
              );
            })
          )}
        </div>

        {/* <div className="top-control-container">
          <Typography variant="h5">Top Anime</Typography>
        </div>

        {loading ? (
          <CircularProgress />
        ) : (
          <div className="grid-container">
            {animeList.map((anime: any) => {
              return (
                <Link
                  key={anime.mal_id}
                  to={`/anime/${anime.mal_id}`}
                  className="grid-content"
                  onMouseOver={() => handleChange(anime)}
                >
                  <img src={anime.images.jpg.image_url} alt={anime.title} />
                  <span>{anime.title}</span>
                </Link>
              );
            })}
          </div>
        )}
        <div className="top-control-container">
          <Typography variant="h5">Current Season</Typography>
        </div>
        {loading ? (
          <CircularProgress />
        ) : (
          <div className="grid-container">
            {currSeason.map((anime: any) => {
              return (
                <Link
                  key={anime.mal_id}
                  to={`/anime/${anime.mal_id}`}
                  className="grid-content"
                  onMouseOver={() => handleChange(anime)}
                >
                  <img src={anime.images.jpg.image_url} alt={anime.title} />
                  <span>{anime.title}</span>
                </Link>
              );
            })}
          </div>
        )} */}
      </div>

      <div className="right-container">
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <img
              src={currAnime.images.jpg.large_image_url}
              alt={currAnime.title}
            />
            <span>{currAnime.title}</span>
            <p>{currAnime.synopsis}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Anime;
