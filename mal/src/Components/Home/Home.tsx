import { CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { arrayToString } from "../../Helpers/arrayToString";

import { delay } from "../../Helpers/delay";
import "./Home.scss";
const Home = () => {
  const [schedule, setSchedule] = useState<any>();
  const [currSeason, setCurrSeason] = useState<any>();
  const [nextSeason, setNextSeason] = useState<any>();

  const [loading, setLoading] = useState<boolean>(true);
  const currentDay = new Date().getDay();
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const getData = async () => {
    axios
      .get(
        `https://api.jikan.moe/v4/schedules?sfw=true&filter=${weekdays[currentDay]}`
      )
      .then((res: any) => {
        console.log(res.data);
        setSchedule(res.data.data);

        // setLoading(false);
      });

    await delay(1000);

    axios.get(`https://api.jikan.moe/v4/seasons/now`).then((res: any) => {
      console.log(res.data);
      setCurrSeason(res.data.data);
    });

    await delay(1000);

    axios.get(`https://api.jikan.moe/v4/seasons/upcoming`).then((res: any) => {
      console.log(res.data);
      setNextSeason(res.data.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Typography variant="h5">
        Welcome to MAL Mock(v1) This is a software project to improve css and
        typescrtiy with react just for desktop use. I have a to do list to
        improve and clean, this is just to host and have a basic layout.{" "}
      </Typography>

      <div className="home-container">
        <div className="schedule-contatiner">
          <Typography variant="h4">Today's Schedule</Typography>

          {loading ? (
            <CircularProgress />
          ) : (
            schedule.map((anime: any) => {
              return (
                <div className="content">
                  <img src={anime.images.jpg.image_url} alt={anime.title} />
                  <div className="content-text">
                    <span>{anime.title}</span>
                    <span>Season: {anime.season}</span>
                    <span>Day & Time: {anime.broadcast.string}</span>
                    <span>
                      Genre:{" "}
                      {anime.genres.length !== 0
                        ? arrayToString(anime.genres)
                        : "N/A"}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="right-conatiner">
          <Typography variant="h4">Current Anime Season</Typography>{" "}
          <div className="carousel-container">
            {loading ? (
              <CircularProgress />
            ) : (
              currSeason.map((anime: any) => {
                return (
                  <div className="carousel-content">
                    <img src={anime.images.jpg.image_url} alt="temp" />
                    <div className="text-box">
                      <Typography>{anime.title}</Typography>
                      <Typography>Episodes: {anime.episodes}</Typography>
                      <Typography>Ratings: {anime.rating}</Typography>
                      <Typography>
                        Genres:{" "}
                        {anime.genres.length !== 0
                          ? arrayToString(anime.genres)
                          : "N/A"}
                      </Typography>
                      {/* <Typography>{anime.background}</Typography> */}
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <Typography variant="h4">Next Anime Season</Typography>{" "}
          <div className="carousel-container">
            {loading ? (
              <CircularProgress />
            ) : (
              nextSeason.map((anime: any) => {
                return (
                  <div className="carousel-content">
                    <img src={anime.images.jpg.image_url} alt="temp" />
                    <div className="text-box">
                      <span>{anime.title}</span>
                      <span>
                        Episodes: {anime.episodes ? anime.episodes : "N/A"}
                      </span>
                      <span>Ratings: {anime.rating}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
