import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import HomePage from "./components/Home/HomePage";
import DirectorDetail from "./components/Director/DirectorDetail";
import FilmDetail from "./components/Film/FilmDetail";
import GenreDetail from "./components/Genre/GenreDetail";
import FilmList from "./components/Film/FilmList";
import DirectorList from "./components/Director/DirectorList";
import GenreList from "./components/Genre/GenreList";
import FilmForm from "./components/Film/FilmForm";
import DirectorForm from "./components/Director/DirectorForm";
import GenreForm from "./components/Genre/GenreForm";

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
        <Route path="/film/:id" element={<FilmDetail />} />
        <Route path="/director/:id" element={<DirectorDetail />} />
        <Route path="/genre/:id" element={<GenreDetail />} />

        <Route path="/films" element={<FilmList />} />
        <Route path="/directors" element={<DirectorList />} />
        <Route path="/genres" element={<GenreList />} />

        <Route path="/film/create" element={<FilmForm />} />
        <Route path="/director/create" element={<DirectorForm />} />
        <Route path="/genre/create" element={<GenreForm />} />

        <Route path="/film/:id/update" element={<FilmForm />} />
        <Route path="/director/:id/update" element={<DirectorForm />} />
        <Route path="/genre/:id/update" element={<GenreForm />} />

        <Route path="/film/:id/delete" element={<FilmDetail />} />
        <Route path="/director/:id/delete" element={<FilmDetail />} />
        <Route path="/genre/:id/delete" element={<FilmDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
