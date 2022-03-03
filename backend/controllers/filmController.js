var Film = require("../models/film");

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
exports.film_detail = function (req, res) {
  res.send("NOT IMPLEMENTED: Film detail: " + req.params.id);
};

// Display film create form on GET.
exports.film_create_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Film create GET");
};

// Handle film create on POST.
exports.film_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Film create POST");
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
