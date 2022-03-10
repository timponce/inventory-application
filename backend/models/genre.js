var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var GenreSchema = new Schema({
  name: { type: String, minlength: 3, maxlength: 100, required: true },
});

// Virtual for genre's URL
GenreSchema.virtual("url").get(function () {
  return "/genre/" + this._id;
});

module.exports = mongoose.model("Genre", GenreSchema);
