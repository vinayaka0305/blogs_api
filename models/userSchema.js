const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    unique: true,
    maxlength: 12,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  late: {
    type: Array,
  },
});

module.exports = mongoose.model("user", userSchema);
