var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var FilmSchema = new Schema({
  title: { type: String, required: true },
  director: { type: Schema.Types.ObjectId, ref: "Director", required: true },
  release: { type: Date, required: true },
  summary: { type: String, required: true },
  genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
  rating: { type: String },
});

// Virtual for film's URL
FilmSchema.virtual("url").get(function () {
  return "/catalog/film/" + this._id;
});

module.exports = mongoose.model("Film", FilmSchema);
