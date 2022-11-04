import { CircularProgress, Pagination, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Manga = () => {
  const [mangaList, setMangaList] = useState<any>();
  const [currManga, setCurrManga] = useState<any>();
  const [currPage, setCurrPage] = useState<any>({
    current: 1,
    last: 1,
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(
        `https://api.jikan.moe/v4/top/manga?type=manga&page=${currPage.current}`
      )
      .then((res: any) => {
        setMangaList(res.data.data);
        setCurrPage({
          ...currPage,
          last: res.data.pagination.last_visible_page,
        });
        setCurrManga(res.data.data[0]);
        setLoading(false);
      });
  }, [currPage]);

  const handleChange = (manga: any) => {
    setCurrManga(manga);
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
      <div className="left-container">
        <div className="top-control-container">
          <Typography variant="h5">Top Manga</Typography>{" "}
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
            {mangaList.map((anime: any) => {
              return (
                <Link
                  key={anime.mal_id}
                  className="grid-content"
                  to={`/manga/${anime.mal_id}`}
                  onMouseOver={() => handleChange(anime)}
                >
                  <img src={anime.images.jpg.image_url} alt={anime.title} />
                  <span>{anime.title}</span>
                  <span>{anime.title_japanese}</span>
                </Link>
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
              src={currManga.images.jpg.large_image_url}
              alt={currManga.title}
            />
            <span>{currManga.title}</span>
            <p>{currManga.synopsis}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Manga;
