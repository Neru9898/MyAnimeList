import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";
import "./AnimeInfo.scss";
const InfoPage = () => {
  const params = useParams();
  const [currInfo, setCurrInfo] = useState<any>();
  const [animeCharacters, setAnimeCharacters] = useState<any>();
  const [animeStaff, setAnimeStaff] = useState<any>();
  const [animeVideo, setAnimeVideo] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  const getData = async () => {
    await axios
      .get(`https://api.jikan.moe/v4/anime/${params.id}/full`)
      .then((res: any) => {
        setCurrInfo(res.data.data);
        console.log(res.data.data);
      });

    await axios
      .get(`https://api.jikan.moe/v4/anime/${params.id}/characters`)
      .then((res: any) => {
        setAnimeCharacters(res.data.data);
        console.log(res.data.data);
      });

    await axios
      .get(`https://api.jikan.moe/v4/anime/${params.id}/staff`)
      .then((res: any) => {
        setAnimeStaff(res.data.data);
        console.log(res.data.data);
      });

    await delay(2500);

    await axios
      .get(`https://api.jikan.moe/v4/anime/${params.id}/episodes`)
      .then((res: any) => {
        setAnimeVideo(res.data.data);
        console.log(res.data.data);

        setLoading(false);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const getGenres = (genres: any) => {
    let genreList = "";
    currInfo.genres.map((genre: any) => (genreList += `${genre.name}, `));
    return genreList;
  };
  return (
    <div className="info-container">
      {loading && <CircularProgress />}

      {!loading && (
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

      {!loading && (
        <div className="middle-info-contianer">
          <Typography variant="h6">Summary: {currInfo.synopsis}</Typography>
          <Typography variant="h5">Characters</Typography>{" "}
          <div className="middle-grid-contianer">
            {animeCharacters.map((character: any) => {
              console.log(character.character);
              return (
                <span>
                  <Typography variant="h6">
                    {character.character.name}
                  </Typography>{" "}
                  <Typography variant="h6">{character.role}</Typography>
                  <img
                    src={character.character.images.jpg.image_url}
                    alt="temo"
                  />
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoPage;
