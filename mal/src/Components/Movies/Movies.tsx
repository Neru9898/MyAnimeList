import { CircularProgress, Pagination, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
function Movies() {
  const [movieList, setMovieList] = useState<any>();
  const [currMovie, setCurrMovie] = useState<any>();
  const [currPage, setCurrPage] = useState<any>({
    current: 1,
    last: 1,
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(
        `https://api.jikan.moe/v4/top/anime?type=movie&page=${currPage.current}`
      )
      .then((res: any) => {
        console.log(res.data);
        setMovieList(res.data.data);
        setCurrPage({
          ...currPage,
          last: res.data.pagination.last_visible_page,
        });
        setCurrMovie(res.data.data[0]);
        setLoading(false);
      });
  }, [currPage]);

  const handleChange = (anime: any) => {
    setCurrMovie(anime);
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
          <Typography variant="h5">Top Movies</Typography>{" "}
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
            {movieList.map((anime: any) => {
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
              src={currMovie.images.jpg.large_image_url}
              alt={currMovie.title}
            />
            <span>{currMovie.title}</span>
            <p>{currMovie.synopsis}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Movies;
