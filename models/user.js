const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: [5, "Username should be at least 5 characters!"],
    unique: true,
    validate: [
      {
        validator: (v) => {
          return /[a-zA-Z0-9]+/.test(v)
        },
        message: props => `${props.value} is not valid username`
      }
    ]
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password shoul be at least 8 characters!"],
    validate: [
      {
        validator: (v) =>{
          return /[a-zA-Z0-9]+/.test(v)
        },
        message: props => `${props.value} is invalid password!`
      }     
    ]
    
  }
});


module.exports = mongoose.model("User", userSchema);
