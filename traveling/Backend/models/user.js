const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  contact: {
    type: Number,
    require: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  person: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
