import { CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

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
    <div className="home-container">
      <div className="schedule-contatiner">
        <Typography variant="h5">Today's Schedule</Typography>

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
                  <span>Day: {anime.broadcast.day}</span>
                  <span>Time: {anime.broadcast.time}</span>
                  <span>{anime.broadcast.string}</span>
                  <span>Genre</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="right-conatiner">
        <Typography variant="h5">Current Anime Season</Typography>{" "}
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
                  </div>
                </div>
              );
            })
          )}
        </div>
        <Typography variant="h5">Next Anime Season</Typography>{" "}
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
  );
};

export default Home;
