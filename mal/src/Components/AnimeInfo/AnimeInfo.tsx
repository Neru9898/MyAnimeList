import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";
import "./AnimeInfo.scss";
import { delay } from "../../Helpers/delay";
import { arrayToString } from "../../Helpers/arrayToString";

const AnimeInfo = () => {
  const params = useParams();
  const [currInfo, setCurrInfo] = useState<any>();
  const [animeCharacters, setAnimeCharacters] = useState<any>();
  const [animeStaff, setAnimeStaff] = useState<any>();
  const [animeVideo, setAnimeVideo] = useState<any>();
  const [animeRecomendation, setAnimeRecomendation] = useState<any>();

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
        setAnimeCharacters(res.data.data);
        console.log(res.data.data, "char");
      });
    await delay(1000);

    await axios
      .get(`https://api.jikan.moe/v4/anime/${params.id}/staff`)
      .then((res: any) => {
        setAnimeStaff(res.data.data);
        console.log(res.data.data, "staff");
      });

    await delay(1000);

    await axios
      .get(`https://api.jikan.moe/v4/anime/${params.id}/episodes`)
      .then((res: any) => {
        setAnimeVideo(res.data.data);
        console.log(res.data.data, "ep");

        // setLoading(false);
      });

    await delay(1000);

    await axios
      .get(`https://api.jikan.moe/v4/anime/${params.id}/recommendations`)
      .then((res: any) => {
        console.log(res.data.data, "rec");
        setAnimeRecomendation(res.data.data);
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
            <Typography variant="h6">Rank(Mal): {currInfo.rank}</Typography>
            <Typography variant="h6">Rating: {currInfo.rating}</Typography>
            <Typography variant="h6">Status: {currInfo.status}</Typography>
            <Typography variant="h6">
              Genre: {arrayToString(currInfo.genres)}
            </Typography>

            <Typography variant="h6">
              Airing Duration: {currInfo.aired.string}
            </Typography>
            <Typography variant="h6">Chapters: {currInfo.chapters}</Typography>
            <Typography variant="h6">Status: {currInfo.status}</Typography>
          </div>
          <div className="middle-container">
            <Typography variant="h5">Characters</Typography>{" "}
            <div className="grid-container">
              {animeCharacters.map((character: any) => {
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
            <Typography variant="h5">Staff</Typography>{" "}
            <div className="grid-container">
              {animeStaff.map((staff: any) => {
                return (
                  <div className="character-content">
                    <img
                      src={staff.person.images.jpg.image_url}
                      alt="No Content"
                    />
                    <span>
                      <h4>{staff.person.name}</h4>
                      <h4>{staff.positions.map((role: any) => `${role}, `)}</h4>
                    </span>
                  </div>
                );
              })}
            </div>
            <Typography variant="h5">Episodes</Typography>{" "}
            <div className="video-container">
              {animeVideo.map((video: any) => {
                return (
                  <div className="video-content">
                    <span>{video.title}</span>{" "}
                    <span>Episode: {video.mal_id}</span>{" "}
                    <span>Filler: {video.filler ? "Yes" : "No"}</span>{" "}
                    <span>Recap: {video.recap ? "Yes" : "No"}</span>
                    <a
                      href={video.url}
                      style={{
                        backgroundImage: `url(${video.url});width:194px;height:129px;`,
                      }}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {/* <img src={video.url} alt="temp"  /> */}
                      Link
                    </a>{" "}
                  </div>
                );
              })}
            </div>
            <Typography variant="h5">Recomendation</Typography>{" "}
            <div className="recomendations-container">
              {animeRecomendation.map((anime: any) => {
                return (
                  <div className="recomendations-content">
                    <Link
                      to={`/anime/${anime.entry.mal_id}`}
                      onClick={() => setLoading(true)}
                    >
                      <img src={anime.entry.images.jpg.image_url} alt="temp" />
                      <Typography variant="h6">{anime.entry.title}</Typography>
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

export default AnimeInfo;
