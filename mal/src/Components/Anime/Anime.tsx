import {
  CircularProgress,
  Pagination,
  PaginationItem,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import "./Anime.scss";
const Anime = () => {
  const [animeList, setAnimeList] = useState<any>();
  const [currAnime, setCurrAnime] = useState<any>();
  const [currPage, setCurrPage] = useState<any>({
    current: 1,
    last: 1,
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(
        `https://api.jikan.moe/v4/top/anime?type=tv&page=${currPage.current}`
      )
      .then((res: any) => {
        console.log(res.data);
        setAnimeList(res.data.data);
        setCurrPage({
          ...currPage,
          last: res.data.pagination.last_visible_page,
        });
        setCurrAnime(res.data.data[0]);
        setLoading(false);
      });
  }, [currPage]);

  const handleChange = (anime: any) => {
    setCurrAnime(anime);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrPage({ ...currPage, current: value });
    setLoading(true);
  };
  return (
    <div className="anime-container">
      (
      <div className="left-container">
        <div className="top-control-container">
          <Typography variant="h5">Top Anime</Typography>{" "}
          <Pagination
            count={currPage.last}
            page={currPage.current}
            size="large"
            variant="outlined"
            onChange={handlePageChange}
            className="pagination"
          />
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
                  <span>{anime.title_japanese}</span>
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
