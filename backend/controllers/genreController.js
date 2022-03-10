var Genre = require("../models/genre");
const Film = require("../models/film");
var async = require("async");

// Display list of all Genre.
exports.genre_list = function (req, res, next) {
  Genre.find()
    .sort("genre_name")
    .exec(function (err, list_genre) {
      if (err) {
        return next(err);
      }
      res.json(list_genre);
    });
};

// Display detail page for a specific Genre.
exports.genre_detail = function (req, res, next) {
  async.parallel(
    {
      genre: function (callback) {
        Genre.findById(req.params.id).exec(callback);
      },
      genre_films: function (callback) {
        Film.find({ genre: req.params.id }).populate("genre").exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.genre == null) {
        var err = new Error("Genre not found");
        err.status = 404;
        return next(err);
      }
      res.json({ genre: results.genre, genre_films: results.genre_films });
    }
  );
};

// Display Genre create form on GET.
exports.genre_create_get = function (req, res, next) {
  res.json({ title: "Add New Genre" });
};

// Handle Genre create on POST.
exports.genre_create_post = function (req, res, next) {
  var genre = new Genre({
    name: req.body.name,
  });
  genre.save(function (err) {
    if (err) {
      return next(err);
    }
    res.json(genre.url);
  });
};

// Display Genre delete form on GET.
exports.genre_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Genre delete GET");
};

// Handle Genre delete on POST.
exports.genre_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Genre delete POST");
};

// Display Genre update form on GET.
exports.genre_update_get = function (req, res, next) {
  Genre.findById(req.params.id).exec(function (err, results) {
    if (err) {
      return next(err);
    }
    res.json({ title: `Update Genre: ${results.name}`, genre: results });
  });
};

// Handle Genre update on POST.
exports.genre_update_post = function (req, res, next) {
  var genre = new Genre({
    name: req.body.name,
    _id: req.params.id,
  });
  Genre.findByIdAndUpdate(req.params.id, genre, {}, function (err, result) {
    if (err) {
      return next(err);
    }
    res.json(result.url);
  });
};
