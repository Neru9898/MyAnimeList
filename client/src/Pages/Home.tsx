import { Grid } from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./Home.scss";
import TopAnimeContent from "../Component/TopAnimeContent";
import TopManga from "../Component/TopManga";
import TopCharacters from "../Component/TopCharacters";
import TopPeople from "../Component/TopPeople";
const Home = () => {
  return (
    <Grid container className="home-container">
      <TopAnimeContent />
      <TopManga />
      <TopCharacters />
      <TopPeople />
    </Grid>
  );
};

export default Home;
