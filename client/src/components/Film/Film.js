import React from "react";

export default function Film(props) {
  const filmCard = props.filmData.map((film) => (
    <div key={film._id}>
      <h3>Film: {film.title}</h3>
      <p>
        Director: {film.director.first_name + " " + film.director.last_name}
      </p>
      <p>Release Date: {film.release}</p>
      <p>Summary: {film.summary}</p>
      <p>
        Genre:{" "}
        {film.genre.map((item, i) => (
          <span key={i}>{item.name} </span>
        ))}
      </p>
    </div>
  ));

  return (
    <div>
      <h1>Films</h1>
      {filmCard}
    </div>
  );
}
