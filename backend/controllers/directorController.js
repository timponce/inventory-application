var Director = require("../models/director");
var Film = require("../models/film");
var async = require("async");

// Display list of all Directors.
exports.director_list = function (req, res, next) {
  Director.find()
    .sort([["last_name", "ascending"]])
    .exec(function (err, list_directors) {
      if (err) {
        return next(err);
      }
      res.json(list_directors);
    });
};

// Display detail page for a specific Director.
exports.director_detail = function (req, res, next) {
  async.parallel(
    {
      director: function (callback) {
        Director.findById(req.params.id).exec(callback);
      },
      director_films: function (callback) {
        Film.find({ director: req.params.id }).populate("genre").exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.director == null) {
        var err = new Error("Director not found");
        err.status = 404;
        return next(err);
      }
      res.json({
        director: results.director,
        director_films: results.director_films,
      });
    }
  );
};

// Display Director create form on GET.
exports.director_create_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Director create GET");
};

// Handle Director create on POST.
exports.director_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Director create POST");
};

// Display Director delete form on GET.
exports.director_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Director delete GET");
};

// Handle Director delete on POST.
exports.director_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Director delete POST");
};

// Display Director update form on GET.
exports.director_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Director update GET");
};

// Handle Director update on POST.
exports.director_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Director update POST");
};
