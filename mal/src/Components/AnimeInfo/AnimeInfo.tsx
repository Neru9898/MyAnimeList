import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";
import "./AnimeInfo.scss";
const InfoPage = () => {
  const params = useParams();
  const [currInfo, setCurrInfo] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(`https://api.jikan.moe/v4/anime/${params.id}/full`)
      .then((res: any) => {
        setCurrInfo(res.data.data);
        console.log(res.data.data);

        setLoading(false);
      });
  }, []);

  const getGenres = (genres: any) => {
    let genreList = "";
    currInfo.genres.map((genre: any) => (genreList += `${genre.name}, `));
    return genreList;
  };
  return (
    <div className="info-container">
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="left-info-contianer">
          <img src={currInfo.images.jpg.image_url} alt="Temp" />

          <Typography variant="h6">Title: {currInfo.title}</Typography>
          <Typography variant="h6">
            Title(Jap): {currInfo.title_japanese}
          </Typography>
          <Typography variant="h6">Rank(Mal): {currInfo.rank}</Typography>
          <Typography variant="h6">Rating: {currInfo.rating}</Typography>
          <Typography variant="h6">Status: {currInfo.status}</Typography>
          <Typography variant="h6">
            Genre: {getGenres(currInfo.genres)}
          </Typography>

          <Typography variant="h6">
            Airing Duration: {currInfo.aired.string}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default InfoPage;
