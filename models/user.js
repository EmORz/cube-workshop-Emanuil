const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    minlength: [5, "Username should be at least 5 characters!"],
    unique: [true, "Already has user with this nickname!"],
    validate: [
      {
        validator: (v) => {
          return /[a-zA-Z0-9]+/.test(v);
        },
        message: (props) => `${props.value} is not valid username`,
      }
    ]
  },
  password: {
    type: String,
    required: [true, "Password is required!"]
  },
});

module.exports = mongoose.model("User", userSchema);
