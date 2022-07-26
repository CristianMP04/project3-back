const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reviewSchema = new Schema({  name: { type: String, required: true },
  rating: { type: Number },
  comment: { type: String},
 },
);

module.exports = model("Review", reviewSchema);
