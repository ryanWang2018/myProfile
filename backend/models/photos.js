let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let photeSchema = new Schema({
  imageName: {
    type: String,
    default: "none",
    required: true
  },
  imageData: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Photos", photeSchema);
