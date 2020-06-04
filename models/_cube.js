const mongoose = require("mongoose");

const cubeShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  difficultyLevel: {
    type: Number,
  },
  accessories: [{type: mongoose.Types.ObjectId, ref: "Accessories"}]
});


module.exports = mongoose.model("Cube", cubeShema);

