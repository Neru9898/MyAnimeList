import "./App.scss";
import Header from "./Components/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Anime from "./Components/Anime/Anime";
import Manga from "./Components/Manga/Manga";
import Movies from "./Components/Movies/Movies";
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/manga" element={<Manga />} />
          <Route path="/movie" element={<Movies />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
