
const mongoose = require("mongoose")

const CareersSchema = mongoose.Schema(
    {
        full_name: {
          type: String,
          allowNull: false,
        },
        phone_number: {
          type: String,
          allowNull: false,
          unique: true,
        },
        email_id: {
          type: String,
          allowNull: false,
        },
        address: {
          type: String,
          allowNull: false,
        },
        post: {
          type: String,
          allowNull: false,
        },
        cv: {
          type: String,
          allowNull: true,
        },
        message: {
          type: String,
          allowNull: true,
        },
        captcha: {
          type: String,
          allowNull: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      }
);
  
const CareersModel = mongoose.model("Careers", CareersSchema);

module.exports = { CareersModel };
