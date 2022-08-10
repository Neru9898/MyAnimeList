import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import "./Carousel.scss";
const TopManga = () => {
  const [mangaList, setMangaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>();
  useEffect(() => {
    axios
      .get("https://api.jikan.moe/v4/top/manga")
      .then((res: any) => {
        setMangaList(res.data.data);
        setError("");
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);
  if (error) return <>RIP</>;
  return (
    <>
      <Typography variant="h1" className="title-font">
        Top Manga
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Carousel
          autoPlay
          centerMode
          interval={4000}
          centerSlidePercentage={20}
          infiniteLoop
          showIndicators={false}
          showThumbs={false}
          showStatus={false}
          className="carousel-container"
          onChange={(e) => console.log(e)}
        >
          {mangaList.map((manga: any) => {
            return (
              <div className="temp" key={manga.mal_id}>
                <img
                  className="carousel-image"
                  src={manga.images.jpg.large_image_url}
                />
                <p className="legend">{manga.title_english}</p>
              </div>
            );
          })}
        </Carousel>
      )}
    </>
  );
};

export default TopManga;
