var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var DirectorSchema = new Schema({
  first_name: { type: String, required: true, maxlength: 100 },
  last_name: { type: String, required: true, maxlength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual for Director's full name
DirectorSchema.virtual("name").get(function () {
  var fullname = "";
  if (this.first_name && this.last_name) {
    fullname = this.first_name + " " + this.last_name;
  }
  if (!this.first_name || !this.last_name) {
    fullname = "";
  }
  return fullname;
});

// Virtual for Director's lifespan
DirectorSchema.virtual("lifespan").get(function () {
  var lifetime_string = "";
  if (this.date_of_birth) {
    lifetime_string = this.date_of_birth.getYear().toString();
  }
  lifetime_string += " - ";
  if (this.date_of_death) {
    lifetime_string += this.date_of_death.getYear();
  }
  return lifetime_string;
});

// Virtual for Director's URL
DirectorSchema.virtual("url").get(function () {
  return "/catalog/director" + this._id;
});

module.exports = mongoose.model("Director", DirectorSchema);
