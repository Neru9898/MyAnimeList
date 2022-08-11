import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import "./Carousel.scss";
const TopCharacters = () => {
  const [charactersList, setCharactersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>();
  useEffect(() => {
    setTimeout(() => {
      axios
        .get("https://api.jikan.moe/v4/top/characters?page=1&limit=60")
        .then((res: any) => {
          setCharactersList(res.data.data);
          setError("");
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }, 6000);
  }, []);
  // if (error) return <>RIP</>;
  return (
    <>
      <Typography variant="h1" className="title-font">
        Top Character
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
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
            {charactersList.map((character: any) => {
              return (
                <div className="temp" key={character.mal_id}>
                  <img
                    className="carousel-image"
                    src={character.images.jpg.image_url}
                  />
                  <p className="legend">{character.title_english}</p>
                </div>
              );
            })}
          </Carousel>
        </>
      )}
    </>
  );
};

export default TopCharacters;
