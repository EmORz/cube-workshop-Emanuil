const mongoose = require("mongoose");

const cubeShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    match: [/^[A-Za-z0-9 ]+$/, 'cube name is not valid!'],
    minlength: 2
    
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000,
    match: [/^[A-Za-z0-9 ]+$/, 'cube description is not valid!'],
    minlength: 2
   
  },
  imageUrl: {
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


cubeShema.path("imageUrl").validate(function (url) {
  return url.includes("http") || url.includes("https");
}, "Image url is not valid!");

module.exports = mongoose.model("Cube", cubeShema);
