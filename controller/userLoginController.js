const { UsersModel } = require("../model/usersModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const otpGenerator = require('otp-generator')
const {sendOtpOnMobileNumber} = require("../sender/mobileOtp")
// const { sendMail } = require("../mailSender/mailSender")
const phoneUtil =
  require("google-libphonenumber").PhoneNumberUtil.getInstance();




// USER REGISTER CONTROLLER
let userRegister = async (req, res) => {
  try {

    let { username, email, phoneNumber, password } = req.body;
    let userData = await UsersModel.findOne({email});

    if (userData != null) {
      res.status(200).json({
        isError: false,
        message: "Email already registered, Need To Login",
      });
      return;
    }
    bcrypt.hash(password, 6, async (err, hash_password) => {
      if (err) {
        res.status(404).json({
          isError: true,
          message: "Error while Hashing Password",
        });
      } else {
        let data = await UsersModel.create({ username, email, phoneNumber, password: hash_password });
        // sendMail(email, username, otp)
        res.status(200).json({
          isError: false,
          message: `registration successfull`,
        });
      }
    });

  } catch (error) {
    console.log(error)
    res.status(404).json({
      isError: true,
      message: "error while register user",
    });
  }
};

// USER LOGIN CONTROLLER
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UsersModel.findOne({email});

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.error("Error while comparing passwords:", err);
          res.status(200).json({
            isError: true,
            message: "Internal server error during password comparison",
          });
        } else if (result) {
          // Generate token here
          const token = jwt.sign({ email: user.email, id : user._id}, process.env.secret, { expiresIn: "7d" });
          res.status(200).json({
            message: `You are successfully logged in`,
            username: user.username,
            Access_Token: token,
          });
        } else {
          res.status(200).json({
            isError: false,
            message: "Wrong Password",
          });
        }
      });
    } else {
      res.status(200).json({
        isError: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({
      isError: true,
      message: "Internal server error",
    });
  }
};



//add in wishlists data
const addToWishlists = async (req, res) => {
  try {
    const userId = req.body.userDetail._id;
    const favouriteId = req.params.id;
    // console.log(favouriteId)
    const user = await UsersModel.findById(userId);

     // Check if the property is already in the wishlist to avoid duplicates
     if (user.favourites.includes(favouriteId)) {
      return res.status(200).send({ message: "Product already in wishlist" });
    }
    user.favourites.push(favouriteId);

    await user.save();

    res.status(200).send({
      message: "Product added to wishlist",
      favourites : user.favourites
    });
  } catch (error) {
    console.error("Something went wrong in /addWishlists:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

//get to wishlists data
const getToWishlists = async (req, res) => {
  try {
    const userId = req.body.userDetail._id;
    const user = await UsersModel.findById(userId).populate('favourites');

  
    res.status(200).send({
      message: "Products retrieved from wishlist successfully",
      favouritesLength: user.favourites.length,
      favourites: user.favourites,
    });
  } catch (error) {
    console.error("Something went wrong in /getToWishlists:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};


//delete to wishlists data 
const deleteToWishlists = async (req, res) => {
  try {
    const userId = req.body.userDetail._id;
    const favouriteId = req.params.id;

    await UsersModel.findByIdAndUpdate(userId, {
      $pull: { favourites: favouriteId },
    });

    res.status(200).send({ message: "Product removed from wishlist successfully" });
  } catch (error) {
    console.error("Something went wrong in /deleteWishlists:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};



module.exports = { 
  userRegister, 
  userLogin, 
  addToWishlists,
  getToWishlists,
  deleteToWishlists
 }