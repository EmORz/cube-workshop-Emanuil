const mongoose = require("mongoose");

const accessoriesShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  description: {
    type: String,
  },

  
  cubes: [{type: mongoose.Types.ObjectId, ref: "Cube"}]
});

accessoriesShema.path("imageUrl").validate(function (url) {
  return url.includes("http") || url.includes("https");
}, "Image url is not valid!");

module.exports = mongoose.model("Accessory", accessoriesShema);









// •	Name - (String, required)
// •	ImageUrl - (String, required, http/https validation)
// •	Description - (String, required, max length validation)
// •	Cubes - (ObjectId, ref Cubes Model)
