import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import "./Carousel.scss";
const TopPeople = () => {
  const [peopleList, setPeopleList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>();
  useEffect(() => {
    axios
      .get("https://api.jikan.moe/v4/top/people")
      .then((res: any) => {
        setPeopleList(res.data.data);
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
        Top People
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
          {peopleList.map((people: any) => {
            return (
              <div className="temp" key={people.mal_id}>
                <img
                  className="carousel-image"
                  src={people.images.jpg.large_image_url}
                />
                <p className="legend">{people.title_english}</p>
              </div>
            );
          })}
        </Carousel>
      )}
    </>
  );
};

export default TopPeople;
