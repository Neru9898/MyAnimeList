import { CircularProgress, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { delay } from "../../Helpers/delay";

const Manga = () => {
  const [mangaList, setMangaList] = useState<any>();
  const [currManga, setCurrManga] = useState<any>();
  const [currSearchManga, setCurrSearchManga] = useState<any>();
  const [currSearch, setSearch] = useState<any>("");
  const [currPage, setCurrPage] = useState<any>({
    current: 1,
    last: 1,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const getData = async () => {
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
      });

    await delay(1000);
  };
  const getMangaSearch = async () => {
    await delay(1000);

    axios
      .get(`https://api.jikan.moe/v4/manga?q=${currSearch}`)
      .then((res: any) => {
        setCurrSearchManga(res.data.data);

        setLoading(false);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getMangaSearch();
  }, [currSearch]);

  const handleChange = (manga: any) => {
    setCurrManga(manga);
  };

  // const handlePageChange = (
  //   event: React.ChangeEvent<unknown>,
  //   value: number
  // ) => {
  //   setCurrPage({ ...currPage, current: value });
  //   setLoading(true);
  // };
  return (
    <div className="anime-container">
      <div className="left-container">
        <div className="top-control-container">
          <Typography variant="h5">Search Manga</Typography>{" "}
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <CircularProgress />
        ) : (
          <div className="grid-container">
            {currSearchManga.map((anime: any) => {
              return (
                <Link
                  key={anime.mal_id}
                  className="grid-content"
                  to={`/manga/${anime.mal_id}`}
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
          <Typography variant="h5">Top Manga</Typography>{" "}
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
