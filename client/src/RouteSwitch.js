import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import Director from "./components/Director/Director";
import Film from "./components/Film/Film";

export default function RouteSwitch() {
  const [directorData, setDirectorData] = React.useState([]);
  const [filmData, setFilmData] = React.useState([]);
  const [genreData, setGenreData] = React.useState([]);

  useEffect(() => {
    fetch("/catalog/directors")
      .then((res) => res.json())
      .then((data) => setDirectorData(data));
  }, []);

  useEffect(() => {
    fetch("/catalog/films")
      .then((res) => res.json())
      .then((data) => setFilmData(data));
  }, []);

  useEffect(() => {
    fetch("/catalog/genres")
      .then((res) => res.json())
      .then((data) => setGenreData(data));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/catalog/directors"
          element={<Director directorData={directorData} />}
        />
        <Route path="/catalog/films" element={<Film filmData={filmData} />} />
      </Routes>
    </BrowserRouter>
  );
}
