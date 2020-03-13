const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GridSchema = new Schema({
  height: Number,
  width: Number,
  pixels: [Number]
});

const Grid = mongoose.model("Grid", GridSchema);

module.exports = Grid;