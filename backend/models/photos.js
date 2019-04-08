let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let photeSchema = new Schema({
  Name: {
    type: String,
    default: "none",
    required: true
  },
  Price: {
    type: String,
    default: "none",
    required: false
  },

  MealType: {
    type: String,
    default: "none",
    required: true
  },

  Description: {
    type: String,
    default: "none",
    required: true
  },
  URL: {
    type: String,
    default: "none",
    required: true
  }
});

module.exports = mongoose.model("Photos", photeSchema);
