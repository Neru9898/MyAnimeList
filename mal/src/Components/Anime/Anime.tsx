import { CircularProgress, Pagination } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Anime.scss";
const Anime = () => {
  const [animeList, setAnimeList] = useState<any>();
  const [currAnime, setCurrAnime] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get("https://api.jikan.moe/v4/top/anime").then((res: any) => {
      setAnimeList(res.data.data);
      setCurrAnime(res.data.data[0]);
      setLoading(false);
    });
  }, []);

  const handleChange = (anime: any) => {
    setCurrAnime(anime);
  };
  return (
    <div className="anime-container">
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <div className="left-container">
            <div className="grid-container">
              {animeList.map((anime: any) => {
                return (
                  <div
                    className="grid-content"
                    onMouseOver={() => handleChange(anime)}
                  >
                    <img src={anime.images.jpg.image_url} alt={anime.title} />
                    <span>{anime.title}</span>
                    <span>{anime.title_japanese}</span>
                  </div>
                );
              })}
            </div>
            <Pagination
              count={10}
              size="large"
              variant="outlined"
              color="primary"
            />
          </div>
          <div className="right-container">
            <img
              src={currAnime.images.jpg.large_image_url}
              alt={currAnime.title}
            />
            <span>{currAnime.title}</span>
            <p>{currAnime.synopsis}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Anime;
