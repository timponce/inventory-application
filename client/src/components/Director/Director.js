import React from "react";
import { format, parseISO } from "date-fns";

export default function Director(props) {
  function getLifetimeString(birth, death) {
    let lifetime_string;
    if (birth) {
      lifetime_string = format(parseISO(birth), "MMMM do y");
    }
    lifetime_string += " - ";
    if (death) {
      lifetime_string += format(parseISO(death), "MMMM do y");
    }
    return lifetime_string;
  }

  const directorCard = props.directorData.map((director) => (
    <div key={director._id}>
      <h3>{director.first_name + " " + director.last_name}</h3>
      <p>{getLifetimeString(director.date_of_birth, director.date_of_death)}</p>
    </div>
  ));

  return (
    <div>
      <h1>Directors</h1>
      {directorCard}
    </div>
  );
}
