import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

import { delay } from "../../Helpers/delay";
import "./Home.scss";
const Home = () => {
  const [schedule, setSchedule] = useState<any>();

  const [loading, setLoading] = useState<boolean>(true);
  const sorter = {
    // "sunday": 0, // << if sunday is first day of week
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    sunday: 7,
  };
  const getData = async () => {
    axios
      .get(`https://api.jikan.moe/v4/schedules?sfw=true&filter=monday`)
      .then((res: any) => {
        console.log(res.data);
        setSchedule(res.data.data);

        setLoading(false);
      });

    await delay(1000);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      This is a just fun project using Jikan Api
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="schedule-contatiner">
          {schedule.map((anime: any) => {
            return (
              <div className="content">
                <img src={anime.images.jpg.image_url} alt={anime.title} />
                <span>{anime.title}</span>
                <span>Season: {anime.season}</span>
                <span>Day: {anime.broadcast.day}</span>
                <span>Time: {anime.broadcast.time}</span>
                <span>{anime.broadcast.string}</span>
                <span>Genre</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
