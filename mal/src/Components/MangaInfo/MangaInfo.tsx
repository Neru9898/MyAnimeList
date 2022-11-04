import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { delay } from "../../Helpers/delay";
import { CircularProgress, Typography } from "@mui/material";
import { arrayToString } from "../../Helpers/arrayToString";
import "./MangaInfo.scss";
const MangaInfo = () => {
  const params = useParams();
  const [currInfo, setCurrInfo] = useState<any>();
  const [mangaCharacters, setMangaCharacters] = useState<any>();

  const [loading, setLoading] = useState<boolean>(true);

  const getData = async () => {
    await axios
      .get(`https://api.jikan.moe/v4/manga/${params.id}/full`)
      .then((res: any) => {
        setCurrInfo(res.data.data);
        console.log(res.data.data, "basic");
      });
    await delay(1000);

    await axios
      .get(`https://api.jikan.moe/v4/manga/${params.id}/characters`)
      .then((res: any) => {
        setMangaCharacters(res.data.data);
        console.log(res.data.data, "char");
        setLoading(false);
      });
    // await delay(1000);

    // await axios
    //   .get(`https://api.jikan.moe/v4/manga/${params.id}/news`)
    //   .then((res: any) => {
    //     console.log(res.data.data, "random");
    //   });
    // await delay(1000);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="manga-info-container">
      {loading && <CircularProgress />}
      {!loading && (
        <div className="main-container">
          <Typography variant="h3">
            {currInfo.title} {currInfo.title_japanese}
          </Typography>
          <div className="left-container">
            <img src={currInfo.images.webp.image_url} alt="temp" />
            <Typography variant="h6">
              Authors: {arrayToString(currInfo.authors)}
            </Typography>{" "}
            <Typography variant="h6">Chapters: {currInfo.chapters}</Typography>
            <Typography variant="h6">Status: {currInfo.status}</Typography>
            <Typography variant="h6">
              Generes: {arrayToString(currInfo.genres)}
            </Typography>
            <Typography variant="h6">
              Themes: {arrayToString(currInfo.themes)}
            </Typography>
            <Typography variant="h6">
              Demographics: {arrayToString(currInfo.demographics)}
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
};

export default MangaInfo;
