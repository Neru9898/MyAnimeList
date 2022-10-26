import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Anime.scss";
const Anime = () => {
  const [animeList, setAnimeList] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get("https://api.jikan.moe/v4/top/anime").then((res: any) => {
      setAnimeList(res.data.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="anime-container">
      {!loading &&
        animeList.map((anime: any) => {
          return (
            <div className="grid-content">
              <img src={anime.images.jpg.image_url} />
              <span>{anime.title}</span>
              <span>{anime.title_japanese}</span>
            </div>
          );
        })}
    </div>
  );
};

export default Anime;
