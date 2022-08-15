import { Grid } from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./Home.scss";
import HomePageContent from "../Component/HomePageContent";

const Home = () => {
  return (
    <Grid container className="home-container">
      <HomePageContent />
    </Grid>
  );
};

export default Home;
