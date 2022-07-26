const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reviewSchema = new Schema({  
  title: { type: String, required: true },
  rating: { type: Number, required: true },
  review: { type: String},
 },
);

module.exports = model("Review", reviewSchema);
