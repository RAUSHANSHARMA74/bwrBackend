
const mongoose = require("mongoose")

const AdminSchema = mongoose.Schema(
    {
        username: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
          unique: true,
        },
        phoneNumber: {
          type: String,
          required: true,
        },
        profilePicture: {
          type: String,
          default: null,
        },
        date: {
          type: Date,
          default: Date.now,
        },
        favourite: {
          type: Object,
          required: true,
        },
        password: {
          type: String,
          required: true,
        },
        otpVerify: {
          type: String,
          default: false,
        },
    }
);


const AdminsModel = mongoose.model("Admins", AdminSchema);

module.exports = { AdminsModel };
