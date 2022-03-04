import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import HomePage from "./components/Home/HomePage";
import Director from "./components/Director/Director";
import FilmDetail from "./components/Film/FilmDetail";

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
          element={<Director directorData={directorData} />}
        />
        <Route
          path="/film/:id"
          element={<FilmDetail filmData={filmData} id={useParams()} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
