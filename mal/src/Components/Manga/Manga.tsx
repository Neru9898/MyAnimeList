import { CircularProgress, Pagination, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

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
            {mangaList.map((anime: any) => {
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
