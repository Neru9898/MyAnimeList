import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import "./Carousel.scss";
import Jikan from "jikan4.js";

const TopAnime = () => {
  const [animeList, setAnimeList] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>();

  useEffect(() => {
    axios
      .get("https://api.jikan.moe/v4/top/anime?page=1")
      .then((res: any) => {
        // console.log(res);
        setAnimeList(res.data.data);
        setError("");
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);

        setError(err);
        setLoading(false);
      });
  }, []);
  // if (error) {
  //   // setTimeout(() => , 1000);
  //   // console.log("asdfasdf", error);
  //   // setAnimeList([]);
  //   return <>RIP</>;
  // }
  return (
    <Box>
      <Typography variant="h1" className="title-font">
        Top Anime
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
          // onChange={(e) => console.log(e)}
        >
          {animeList.map((anime: any) => {
            return (
              <div className="temp" key={anime.mal_id}>
                <img
                  className="carousel-image"
                  src={anime.images.jpg.large_image_url}
                />
                <p className="legend1">{anime.title_english}</p>
              </div>
            );
          })}
        </Carousel>
      )}
    </Box>
  );
};

export default TopAnime;
