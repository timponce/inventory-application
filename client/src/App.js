import React, { useEffect } from "react";
import "./App.css";

function App() {
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
    <div className="App">
      {directorData.map((director) => (
        <p key={director._id}>
          {director.first_name + " " + director.last_name}
        </p>
      ))}
      {filmData.map((film) => (
        <p key={film._id}>{film.title}</p>
      ))}
      {genreData.map((genre) => (
        <p key={genre._id}>{genre.name}</p>
      ))}
    </div>
  );
}

export default App;
