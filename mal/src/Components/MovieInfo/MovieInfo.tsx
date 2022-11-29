import { CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { arrayToString } from "../../Helpers/arrayToString";
import { delay } from "../../Helpers/delay";
import "./MovieInfo.scss";
const MovieInfo = () => {
  const params = useParams();
  const [currInfo, setCurrInfo] = useState<any>();
  const [movieCharacters, setMovieCharacters] = useState<any>();
  const [movieStaff, setMovieStaff] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const getData = async () => {
    await delay(1000);

    await axios
      .get(`https://api.jikan.moe/v4/anime/${params.id}/full`)
      .then((res: any) => {
        setCurrInfo(res.data.data);
        console.log(res.data.data, "basic");
      });
    await delay(1000);

    await axios
      .get(`https://api.jikan.moe/v4/anime/${params.id}/characters`)
      .then((res: any) => {
        setMovieCharacters(res.data.data);
        console.log(res.data.data, "char");
      });
    await delay(1000);

    await axios
      .get(`https://api.jikan.moe/v4/anime/${params.id}/staff`)
      .then((res: any) => {
        setMovieStaff(res.data.data);
        console.log(res.data.data, "staff");
        setLoading(false);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="manga-info-container">
      {loading && <CircularProgress className="loading" />}
      {!loading && (
        <Typography variant="h3">
          {currInfo.title} {currInfo.title_japanese}
        </Typography>
      )}
      {!loading && (
        <div className="main-container">
          <div className="left-container">
            <img src={currInfo.images.webp.image_url} alt="No Content" />
            <Typography variant="h6">Chapters: {currInfo.chapters}</Typography>
            <Typography variant="h6">Status: {currInfo.status}</Typography>
            <Typography variant="h6">
              Generes:{" "}
              {currInfo.genres.length !== 0
                ? arrayToString(currInfo.genres)
                : "N/A"}
            </Typography>
            <Typography variant="h6">
              Themes:{" "}
              {currInfo.themes.length !== 0
                ? arrayToString(currInfo.themes)
                : "N/A"}
            </Typography>
            <Typography variant="h6">
              Demographics: {arrayToString(currInfo.demographics)}
            </Typography>
          </div>
          <div className="middle-container">
            <Typography variant="h5">Characters</Typography>{" "}
            <div className="grid-container">
              {movieCharacters.map((character: any) => {
                return (
                  <div className="character-content">
                    {/* {console.log(character.character.images.jpg.image_url)} */}
                    <img
                      src={character.character.images.jpg.image_url}
                      alt="temp"
                    />
                    <span>
                      <h4>{character.character.name}</h4>
                      <h4>{character.role}</h4>
                    </span>
                  </div>
                );
              })}
            </div>
            <Typography variant="h5">Characters</Typography>{" "}
            <div className="grid-container">
              {movieStaff.map((staff: any) => {
                return (
                  <div className="character-content">
                    {/* {console.log(character.character.images.jpg.image_url)} */}
                    <img src={staff.person.images.jpg.image_url} alt="temp" />
                    <span>
                      <h4>{staff.person.name}</h4>
                      <h4>{arrayToString(staff.positions)}</h4>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieInfo;
