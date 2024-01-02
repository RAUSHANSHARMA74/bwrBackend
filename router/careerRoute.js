const express = require("express");
const careerRoutes = express.Router();
const { CareerModel } = require("../model/careerModel");
const multer = require("multer")
const otpGenerator = require('otp-generator');
const {careerMailSend} = require("../sender/careerEmail")

let numberGeneratorFunction = () => {
    return otpGenerator.generate(8, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
}

const upload = multer()

careerRoutes.get("/career", async (req, res) => {
  try {
    let allCareerData = await CareerModel.findAll();
    res.send(allCareerData);
  } catch (error) {
    console.log("something went wrong in get all user");
  }
});


careerRoutes.post("/career", upload.single("file"),  async (req, res) => {
    try {
      const {
        full_name,
        phone_number,
        email_id,
        address,
        post,
        // file,
        message,
      } = req.body;
      const file = req.file;
      careerMailSend({full_name, phone_number,email_id, address,post,  message, file})

      res.status(201).json({
        isError: false,
        message: "Successfully sent your career",
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({
        isError: true,
        message: "Error while adding career",
      });
    }
  });
  

careerRoutes.delete("/career", async (req, res) => {
  try {
    let allCareerData = await CareerModel.findAll();
    res.send(allCareerData);
  } catch (error) {
    console.log("something went wrong in get all user");
  }
});

careerRoutes.patch("/career", async (req, res) => {
  try {
    let allCareerData = await CareerModel.findAll();
    res.send(allCareerData);
  } catch (error) {
    console.log("something went wrong in get all user");
  }
});

module.exports = { careerRoutes };
