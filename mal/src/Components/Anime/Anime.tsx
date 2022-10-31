import { CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { KeyboardArrowRight, KeyboardArrowLeft } from "@mui/icons-material";
import "./Anime.scss";
const Anime = () => {
  const [animeList, setAnimeList] = useState<any>();
  const [currAnime, setCurrAnime] = useState<any>();
  const [currPage, setCurrPage] = useState<any>({
    CurrentPage: 1,
    LastPage: 1,
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(
        `https://api.jikan.moe/v4/top/anime?type=tv&page=${currPage.CurrentPage}`
      )
      .then((res: any) => {
        console.log(res.data);
        setAnimeList(res.data.data);
        setCurrPage({
          ...currPage,
          LastPage: res.data.pagination.last_visible_page,
        });
        setCurrAnime(res.data.data[0]);
        setLoading(false);
      });
  }, [currPage]);

  const handleChange = (anime: any) => {
    setCurrAnime(anime);
  };

  const handlePageChange = (dir: string) => {
    if (dir === ">" && currPage.CurrentPage <= currPage.LastPage) {
      setCurrPage({
        ...currPage,
        CurrentPage: currPage.CurrentPage + 1,
      });
    } else if (dir === "<" && currPage.CurrentPage > 1) {
      console.log(currPage);
      setCurrPage({
        ...currPage,
        CurrentPage: currPage.CurrentPage - 1,
      });
    }

    setLoading(true);
  };
  return (
    <div className="anime-container">
      <div className="left-container">
        <div className="top-control-container">
          <Typography variant="h5">Top Anime</Typography>
          <>
            {currPage.CurrentPage !== 1 && (
              <KeyboardArrowLeft
                className="arrows"
                fontSize="large"
                onClick={() => handlePageChange("<")}
              />
            )}

            {currPage.CurrentPage !== currPage.LastPage && (
              <KeyboardArrowRight
                className="arrows"
                fontSize="large"
                onClick={() => handlePageChange(">")}
              />
            )}
          </>
        </div>

        {loading ? (
          <CircularProgress />
        ) : (
          <div className="grid-container">
            {animeList.map((anime: any) => {
              return (
                <div
                  key={anime.mal_id}
                  className="grid-content"
                  onMouseOver={() => handleChange(anime)}
                >
                  <img src={anime.images.jpg.image_url} alt={anime.title} />
                  <span>{anime.title}</span>
                </div>
              );
            })}
          </div>
        )}
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
