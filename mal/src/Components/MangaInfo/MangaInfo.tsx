import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { delay } from "../../Helpers/delay";
import { CircularProgress, Typography } from "@mui/material";

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
    await delay(1000);

    await axios
      .get(`https://api.jikan.moe/v4/manga/${params.id}/news`)
      .then((res: any) => {
        console.log(res.data.data, "random");
      });
    await delay(1000);
  };
  useEffect(() => {
    getData();
  }, []);
  return <div> tem</div>;
};

export default MangaInfo;
