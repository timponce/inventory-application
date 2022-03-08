import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import HomePage from "./components/Home/HomePage";
import DirectorDetail from "./components/Director/DirectorDetail";
import FilmDetail from "./components/Film/FilmDetail";
import GenreDetail from "./components/Genre/GenreDetail";
import FilmList from "./components/Film/FilmList";

export default function RouteSwitch() {
  const [directorData, setDirectorData] = React.useState([]);
  const [filmData, setFilmData] = React.useState([]);
  const [genreData, setGenreData] = React.useState([]);

  useEffect(() => {
    fetch("/api/directors")
      .then((res) => res.json())
      .then((data) => setDirectorData(data));
  }, []);

  useEffect(() => {
    fetch("/api/films")
      .then((res) => res.json())
      .then((data) => setFilmData(data));
  }, []);

  useEffect(() => {
    fetch("/api/genres")
      .then((res) => res.json())
      .then((data) => setGenreData(data));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage {...{ directorData, filmData, genreData }} />}
        />
        <Route
          path="/catalog/directors"
          element={<DirectorDetail directorData={directorData} />}
        />
        <Route path="/film/:id" element={<FilmDetail />} />
        <Route path="/director/:id" element={<DirectorDetail />} />
        <Route path="/genre/:id" element={<GenreDetail />} />
        <Route path="/films" element={<FilmList />} />
      </Routes>
    </BrowserRouter>
  );
}
