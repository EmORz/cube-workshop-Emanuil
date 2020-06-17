const mongoose = require("mongoose");

const cubeShema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
    
  },
  description: {
    type: String,
    required: [true, "Name is required!"],
    maxlength: 2000,
   
  },
  imageURL: {
    type: String,
    required: true,
  },
  difficulty: {
    type: Number,
    required: true,
    min: 1,
    max: 6,
  },
  accessories: [{ type: mongoose.Types.ObjectId, ref: "Accessory" }],
  creatorId: { type: mongoose.Types.ObjectId, ref: "User" },
});


cubeShema.path("imageURL").validate(function (url) {
  return url.includes("http") || url.includes("https");
}, "Image url is not valid!");

module.exports = mongoose.model("Cube", cubeShema);
