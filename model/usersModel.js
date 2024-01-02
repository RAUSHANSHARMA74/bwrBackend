const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: false,
  },
  favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Properties" }],
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  otp: {
    type: String,
    required: false,
  },
  otpVerify: {
    type: String,
    default: false,
  },
});

const UsersModel = mongoose.model("Users", UsersSchema);

module.exports = { UsersModel };
