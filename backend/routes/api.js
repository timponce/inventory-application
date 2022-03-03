var express = require("express");
var router = express.Router();

// Require controller modules.
var film_controller = require("../controllers/filmController");
var director_controller = require("../controllers/directorController");
var genre_controller = require("../controllers/genreController");

/// FILM ROUTES ///

// GET catalog home page.
router.get("/", film_controller.index);

// GET request for creating a Film. NOTE This must come before routes that display Film (uses id).
router.get("/film/create", film_controller.film_create_get);

// POST request for creating Film.
router.post("/film/create", film_controller.film_create_post);

// GET request to delete Film.
router.get("/film/:id/delete", film_controller.film_delete_get);

// POST request to delete Film.
router.post("/film/:id/delete", film_controller.film_delete_post);

// GET request to update Film.
router.get("/film/:id/update", film_controller.film_update_get);

// POST request to update Film.
router.post("/film/:id/update", film_controller.film_update_post);

// GET request for one Film.
router.get("/film/:id", film_controller.film_detail);

// GET request for list of all Film items.
router.get("/films", film_controller.film_list);

/// DIRECTOR ROUTES ///

// GET request for creating Director. NOTE This must come before route for id (i.e. display director).
router.get("/director/create", director_controller.director_create_get);

// POST request for creating Director.
router.post("/director/create", director_controller.director_create_post);

// GET request to delete Director.
router.get("/director/:id/delete", director_controller.director_delete_get);

// POST request to delete Director.
router.post("/director/:id/delete", director_controller.director_delete_post);

// GET request to update Director.
router.get("/director/:id/update", director_controller.director_update_get);

// POST request to update Director.
router.post("/director/:id/update", director_controller.director_update_post);

// GET request for one Director.
router.get("/director/:id", director_controller.director_detail);

// GET request for list of all Directors.
router.get("/directors", director_controller.director_list);

/// GENRE ROUTES ///

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get("/genre/create", genre_controller.genre_create_get);

//POST request for creating Genre.
router.post("/genre/create", genre_controller.genre_create_post);

// GET request to delete Genre.
router.get("/genre/:id/delete", genre_controller.genre_delete_get);

// POST request to delete Genre.
router.post("/genre/:id/delete", genre_controller.genre_delete_post);

// GET request to update Genre.
router.get("/genre/:id/update", genre_controller.genre_update_get);

// POST request to update Genre.
router.post("/genre/:id/update", genre_controller.genre_update_post);

// GET request for one Genre.
router.get("/genre/:id", genre_controller.genre_detail);

// GET request for list of all Genre.
router.get("/genres", genre_controller.genre_list);

module.exports = router;
