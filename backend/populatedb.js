#! /usr/bin/env node

console.log(
  "This script populates some test films, directors, and genres to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
var Film = require("./models/film");
var Director = require("./models/director");
var Genre = require("./models/genre");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var directors = [];
var genres = [];
var films = [];

function directorCreate(first_name, last_name, d_birth, d_death, cb) {
  directordetail = { first_name: first_name, last_name: last_name };
  if (d_birth != false) directordetail.date_of_birth = d_birth;
  if (d_death != false) directordetail.date_of_death = d_death;

  var director = new Director(directordetail);

  director.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Director: " + director);
    directors.push(director);
    cb(null, director);
  });
}

function genreCreate(name, cb) {
  var genre = new Genre({ name: name });

  genre.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Genre: " + genre);
    genres.push(genre);
    cb(null, genre);
  });
}

function filmCreate(
  title,
  director,
  release,
  summary,
  genre,
  rating,
  image,
  cb
) {
  filmdetail = {
    title: title,
    director: director,
    release: release,
    summary: summary,
    genre: genre,
    rating: rating,
    image: image,
  };
  if (genre != false) filmdetail.genre = genre;

  var film = new Film(filmdetail);
  film.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Film: " + film);
    films.push(film);
    cb(null, film);
  });
}

function createGenreDirectors(cb) {
  async.series(
    [
      function (callback) {
        directorCreate("Steven", "Spielberg", "1946-12-18", false, callback);
      },
      function (callback) {
        directorCreate("George", "Lucas", "1944-05-14", false, callback);
      },
      function (callback) {
        directorCreate(
          "Alfred",
          "Hitchcock",
          "1899-08-13",
          "1980-04-29",
          callback
        );
      },
      function (callback) {
        directorCreate("Denis", "Villeneuve", "1967-10-03", false, callback);
      },
      function (callback) {
        genreCreate("Drama", callback);
      },
      function (callback) {
        genreCreate("Science Fiction", callback);
      },
      function (callback) {
        genreCreate("Action", callback);
      },
      function (callback) {
        genreCreate("Horror", callback);
      },
    ],
    // optional callback
    cb
  );
}

function createFilms(cb) {
  async.parallel(
    [
      function (callback) {
        filmCreate(
          "Jaws",
          directors[0],
          "1975-06-20",
          "When a young woman is killed by a shark while skinny-dipping near the New England tourist town of Amity Island, police chief Martin Brody (Roy Scheider) wants to close the beaches, but mayor Larry Vaughn (Murray Hamilton) overrules him, fearing that the loss of tourist revenue will cripple the town. Ichthyologist Matt Hooper (Richard Dreyfuss) and grizzled ship caption Quint (Robert Shaw) offer to help Brody capture the killer beast, and the trio engage in an epic battle of man vs. nature.",
          [genres[0], genres[3]],
          "rating",
          "https://m.media-amazon.com/images/M/MV5BMmVmODY1MzEtYTMwZC00MzNhLWFkNDMtZjAwM2EwODUxZTA5XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_FMjpg_UX1000_.jpg",
          callback
        );
      },
      function (callback) {
        filmCreate(
          "Jurassic Park",
          directors[0],
          "1993-06-11",
          "In Steven Spielberg's massive blockbuster, paleontologists Alan Grant (Sam Neill) and Ellie Sattler (Laura Dern) and mathematician Ian Malcolm (Jeff Goldblum) are among a select group chosen to tour an island theme park populated by dinosaurs created from prehistoric DNA. While the park's mastermind, billionaire John Hammond (Richard Attenborough), assures everyone that the facility is safe, they find out otherwise when various ferocious predators break free and go on the hunt.",
          [genres[1], genres[2]],
          "rating",
          "https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_.jpg",
          callback
        );
      },
      function (callback) {
        filmCreate(
          "Star Wars",
          directors[1],
          "1977-05-25",
          "The Imperial Forces -- under orders from cruel Darth Vader (David Prowse) -- hold Princess Leia (Carrie Fisher) hostage, in their efforts to quell the rebellion against the Galactic Empire. Luke Skywalker (Mark Hamill) and Han Solo (Harrison Ford), captain of the Millennium Falcon, work together with the companionable droid duo R2-D2 (Kenny Baker) and C-3PO (Anthony Daniels) to rescue the beautiful princess, help the Rebel Alliance, and restore freedom and justice to the Galaxy.",
          [genres[1]],
          "rating",
          "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
          callback
        );
      },
      function (callback) {
        filmCreate(
          "Raiders of the Lost Ark",
          directors[1],
          "1981-06-12",
          "Epic tale in which an intrepid archaeologist tries to beat a band of Nazis to a unique religious relic which is central to their plans for world domination. Battling against a snake phobia and a vengeful ex-girlfriend, Indiana Jones is in constant peril, making hair's-breadth escapes at every turn in this celebration of the innocent adventure movies of an earlier era.",
          [genres[2]],
          "rating",
          "https://m.media-amazon.com/images/M/MV5BMjA0ODEzMTc1Nl5BMl5BanBnXkFtZTcwODM2MjAxNA@@._V1_.jpg",
          callback
        );
      },
      function (callback) {
        filmCreate(
          "Psycho",
          directors[2],
          "1960-09-08",
          "Phoenix secretary Marion Crane (Janet Leigh), on the lam after stealing $40,000 from her employer in order to run away with her boyfriend, Sam Loomis (John Gavin), is overcome by exhaustion during a heavy rainstorm. Traveling on the back roads to avoid the police, she stops for the night at the ramshackle Bates Motel and meets the polite but highly strung proprietor Norman Bates (Anthony Perkins), a young man with an interest in taxidermy and a difficult relationship with his mother.",
          [genres[3]],
          "rating",
          "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRiohn42YYfOYwmfZKweQdl74FXLr1BjVYo60kxyxoP0dFaMN3w",
          callback
        );
      },
      function (callback) {
        filmCreate(
          "Dune",
          directors[3],
          "2021-10-22",
          "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence, only those who can conquer their own fear will survive.",
          [genres[2]],
          "rating",
          "https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg",
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createGenreDirectors, createFilms],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
