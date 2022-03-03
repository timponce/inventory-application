import React from "react";

export default function Film(props) {
  const filmCard = props.filmData.map((film) => (
    <div key={film._id}>
      <h3>{film.title}</h3>
      <p>{film.director.first_name + " " + film.director.last_name}</p>
      <p>{film.release}</p>
      <p>{film.summary}</p>
      <p>
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
