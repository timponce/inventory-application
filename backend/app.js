require("dotenv").config();

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var apiRouter = require("./routes/api");
var catalogRouter = require("./routes/catalog");

var app = express();

var mongoose = require("mongoose");
const req = require("express/lib/request");
var dev_db_url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_KEY}@cluster0.auvt4.mongodb.net/movie_library?retryWrites=true&w=majority`;
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api", apiRouter);
app.use("/catalog", catalogRouter);

module.exports = app;
