import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { delay } from "../../Helpers/delay";
import { CircularProgress, Typography } from "@mui/material";
import { arrayToString } from "../../Helpers/arrayToString";
import "./MangaInfo.scss";
const MangaInfo = () => {
  const params = useParams();
  const [currInfo, setCurrInfo] = useState<any>();
  const [mangaCharacters, setMangaCharacters] = useState<any>();
  const [mangaNews, setMangaNews] = useState<any>();
  const [mangaLinks, setMangaLinks] = useState<any>();
  const [mangaRecomendation, setMangaRecomendation] = useState<any>();

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
      });
    await delay(1000);

    await axios
      .get(`https://api.jikan.moe/v4/manga/${params.id}/news`)
      .then((res: any) => {
        console.log(res.data.data, "news");
        setMangaNews(res.data.data);
      });
    await delay(1000);

    await axios
      .get(`https://api.jikan.moe/v4/manga/${params.id}/external`)
      .then((res: any) => {
        console.log(res.data.data, "random");
        setMangaLinks(res.data.data);
        // setLoading(false);
      });

    await delay(1000);

    await axios
      .get(`https://api.jikan.moe/v4/manga/${params.id}/recommendations`)
      .then((res: any) => {
        console.log(res.data.data, "rec");
        setMangaRecomendation(res.data.data);
        setLoading(false);
      });
  };
  useEffect(() => {
    getData();
  }, [params.id]);
  return (
    <div className="manga-info-container">
      {loading && <CircularProgress />}
      {!loading && (
        <Typography variant="h3">
          {currInfo.title} {currInfo.title_japanese}
        </Typography>
      )}
      {!loading && (
        <div className="main-container">
          <div className="left-container">
            <img src={currInfo.images.webp.image_url} alt="No Content" />
            <Typography variant="h6">
              Authors: {arrayToString(currInfo.authors)}
            </Typography>{" "}
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
            <span>
              <Typography variant="h6">External</Typography>
              {mangaLinks.map((link: any) => {
                return (
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.name}
                  </a>
                );
              })}
            </span>
          </div>
          <div className="middle-container">
            <Typography variant="h5">Characters</Typography>{" "}
            <div className="grid-container">
              {mangaCharacters.map((character: any) => {
                return (
                  <div className="character-content">
                    {/* {console.log(character.character.images.jpg.image_url)} */}
                    <img
                      src={character.character.images.jpg.image_url}
                      alt="No Content"
                    />
                    <span>
                      <h4>{character.character.name}</h4>
                      <h4>{character.role}</h4>
                    </span>
                  </div>
                );
              })}
            </div>
            <Typography variant="h5">News</Typography>{" "}
            <div className="news-container">
              {mangaNews.map((news: any) => {
                return (
                  <div className="news-content">
                    <img src={news.images.jpg.image_url} alt="No Content" />
                    <span>
                      <Typography variant="h6">{news.title}</Typography>{" "}
                      <p>{news.excerpt}</p>{" "}
                      <a href={news.forum_url} target="_blank" rel="noreferrer">
                        More Info
                      </a>
                    </span>{" "}
                  </div>
                );
              })}
            </div>
            <Typography variant="h5">Recomendation</Typography>{" "}
            <div className="recomendations-container">
              {mangaRecomendation.map((manga: any) => {
                return (
                  <div className="recomendations-content">
                    <Link
                      to={`/manga/${manga.entry.mal_id}`}
                      onClick={() => setLoading(true)}
                    >
                      <img src={manga.entry.images.jpg.image_url} alt="temp" />
                      <Typography variant="h6">{manga.entry.title}</Typography>
                    </Link>
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

export default MangaInfo;
