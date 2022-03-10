const { body, validationResult } = require("express-validator");
var async = require("async");
var Film = require("../models/film");
var Director = require("../models/director");
var Genre = require("../models/genre");

exports.index = function (req, res) {
  res.send("NOT IMPLEMENTED: Site Home Page");
};

// Display list of all films.
exports.film_list = function (req, res, next) {
  Film.find()
    .sort({ title: 1 })
    .populate("director")
    .populate("genre")
    .exec(function (err, list_films) {
      if (err) {
        return next(err);
      }
      res.json(list_films);
    });
};

// Display detail page for a specific film.
exports.film_detail = function (req, res, next) {
  Film.findById(req.params.id)
    .populate("director")
    .populate("genre")
    .exec(function (err, film) {
      if (err) {
        return next(err);
      }
      if (film == null) {
        var err = new Error("Film not found");
        err.status = 404;
        return next(err);
      }
      res.json(film);
    });
};

// Display film create form on GET.
exports.film_create_get = function (req, res, next) {
  async.parallel(
    {
      directors: function (callback) {
        Director.find(callback);
      },
      genres: function (callback) {
        Genre.find(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      res.json({
        title: "Add New Film",
        directors: results.directors,
        genres: results.genres,
      });
    }
  );
};

// Handle film create on POST.
exports.film_create_post = function (req, res, next) {
  var film = new Film({
    title: req.body.title,
    director: req.body.director,
    release: req.body.release,
    summary: req.body.summary,
    genre: req.body.genre,
    image: req.body.image,
  });
  film.save(function (err) {
    if (err) {
      return next(err);
    }
    res.json(film.url);
  });
};

// Display film delete form on GET.
exports.film_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Film delete GET");
};

// Handle film delete on POST.
exports.film_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Film delete POST");
};

// Display film update form on GET.
exports.film_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Film update GET");
};

// Handle film update on POST.
exports.film_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Film update POST");
};
