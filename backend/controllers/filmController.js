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
exports.film_create_post = [
  // Convert the genre to an array.
  (req, res, next) => {
    if (!(req.body.genre instanceof Array)) {
      if (typeof req.body.genre === "undefined") req.body.genre = [];
      else req.body.genre = new Array(req.body.genre);
    }
    next();
  },

  // Validate and sanitize fields.
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("director", "Director must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("date", "Release Date must not be empty.").isISO8601().toDate(),
  body("summary", "Summary must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("genre.*").escape(),
  body("imageUrl", "Image URL must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Film object with escaped and trimmed data.
    var film = new Film({
      title: req.body.title,
      director: req.body.director,
      release: req.body.date,
      summary: req.body.summary,
      genres: req.body.genre,
      image: req.body.imageUrl,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all directors and genres for form.
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

          // Mark our selected genres as checked.
          for (let i = 0; i < results.genres.length; i++) {
            if (film.genre.indexOf(results.genres[i]._id) > -1) {
              results.genres[i].checked = "true";
            }
          }
          res.json({
            title: "Add New Film",
            director: results.director,
            release: results.date,
            summary: results.summary,
            genres: results.genres,
            image: results.imageUrl,
            errors: errors.array(),
          });
        }
      );
      return;
    } else {
      // Data from form is valid. Save film.
      film.save(function (err) {
        if (err) {
          return next(err);
        }
        //successful - redirect to new film record.
        res.redirect(film.url);
      });
    }
  },
];

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
