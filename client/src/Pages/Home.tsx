import { Grid } from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./Home.scss";
import TopAnimeContent from "../Component/TopAnimeContent";
import Loading from "../Component/Loading";

const Home = () => {
  return (
    <Grid container className="home-container">
      <TopAnimeContent />
    </Grid>
  );
};

export default Home;
