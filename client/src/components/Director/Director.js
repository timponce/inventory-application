import React from "react";

export default function Director(props) {
  const directorCard = props.directorData.map((director) => (
    <div key={director._id}>
      <h3>{director.first_name + " " + director.last_name}</h3>
      <p>{director.date_of_birth}</p>
    </div>
  ));

  return (
    <div>
      <h1>Directors</h1>
      {directorCard}
    </div>
  );
}
