import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import HomePage from "./components/Home/HomePage";
import Director from "./components/Director/Director";
import Film from "./components/Film/Film";

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
        <Route path="/" element={<HomePage />} />
        <Route
          path="/catalog/directors"
          element={<Director directorData={directorData} />}
        />
        <Route path="/catalog/films" element={<Film filmData={filmData} />} />
      </Routes>
    </BrowserRouter>
  );
}
