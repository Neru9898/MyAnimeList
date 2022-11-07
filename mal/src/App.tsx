import "./App.scss";
import Header from "./Components/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Anime from "./Components/Anime/Anime";
import Manga from "./Components/Manga/Manga";
import Movies from "./Components/Movies/Movies";
import AnimeInfo from "./Components/AnimeInfo/AnimeInfo";
import MangaInfo from "./Components/MangaInfo/MangaInfo";
import MovieInfo from "./Components/MovieInfo/MovieInfo";
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/anime/:id" element={<AnimeInfo />} />
          <Route path="/manga" element={<Manga />} />
          <Route path="/manga/:id" element={<MangaInfo />} />
          <Route path="/movie" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieInfo />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
