const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const foodSchema = new Schema({
  name: String,
  image: String,
  type:String,
  restaurant:String,
  review: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }]
  
 // owner will be added later on
});

module.exports = model("Food", foodSchema);
