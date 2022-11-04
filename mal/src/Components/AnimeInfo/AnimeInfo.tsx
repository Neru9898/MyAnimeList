import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  const [loading, setLoading] = useState<boolean>(true);

  const getData = async () => {
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

        setLoading(false);
      });
  };
  useEffect(() => {
    getData();
  }, []);

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
            Genre: {arrayToString(currInfo.genres)}
          </Typography>

          <Typography variant="h6">
            Airing Duration: {currInfo.aired.string}
          </Typography>
        </div>
      )}

      {!loading && (
        <div className="middle-info-contianer">
          <Typography variant="h5">Summary</Typography>{" "}
          <Typography variant="h6">{currInfo.synopsis}</Typography>
          <Typography variant="h5">Characters</Typography>{" "}
          <div className="middle-grid-contianer">
            {animeCharacters.map((character: any) => {
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
          <Typography variant="h5">Staff</Typography>{" "}
          <div className="middle-grid-contianer">
            {animeStaff.map((staff: any) => {
              return (
                <span>
                  <Typography variant="h6">{staff.person.name}</Typography>{" "}
                  <Typography variant="h6">
                    Positions: {arrayToString(staff.positions)}
                  </Typography>
                  <img src={staff.person.images.jpg.image_url} alt="temo" />
                </span>
              );
            })}
          </div>
          <Typography variant="h5">Episodes</Typography>{" "}
          <div className="middle-grid-video-contianer">
            {animeVideo.map((video: any) => {
              return (
                <div className="video-container">
                  <Typography variant="h6">Title: {video.title}</Typography>{" "}
                  <Typography variant="h6">Episode: {video.mal_id}</Typography>{" "}
                  <a
                    href={video.url}
                    style={{
                      backgroundImage: `url(${video.url});width:194px;height:129px;`,
                    }}
                  >
                    Link
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimeInfo;
