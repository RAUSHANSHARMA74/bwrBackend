const express = require("express");
const userRoutes = express.Router();
const {
  userRegister,
  userLogin,
  addToWishlists,
  getToWishlists,
  deleteToWishlists,
} = require("../controller/userLoginController");

const { UsersModel } = require("../model/usersModel");
const {PropertiesModel} = require("../model/propertiesModel")
const { authorizationUser } = require("../authentication/authenticateUser");



// userRoutes.get("/users", async (req, res) => {
//   try {
//     let allUsers = await UsersModel.find();
//     res.send(allUsers);
//   } catch (error) {
//     console.log("something went wrong in get all user");
//   }
// });



//USER REGISTER ROUTE
userRoutes.post("/register", userRegister);

//USER LOGIN ROUTE
userRoutes.post("/login", userLogin);


// middleware set up
userRoutes.use(authorizationUser);

//add in wishlists data route
userRoutes.patch("/addWishlists/:id", addToWishlists);


//get to wishlists data route
userRoutes.get("/getWishlists", getToWishlists);


//delete to wishlists data route
userRoutes.delete("/deleteWishlists/:id", deleteToWishlists);


userRoutes.post("/brochure/:id", async (req, res) => {
  try {
    let id_no = req.params.id
    let brochureData = await PropertiesModel.findOne({
      where : {
        id_no
      }
    })
    res.send({ message: "working", brochureData });
  } catch (error) {
    console.error("Something went wrong in /phone:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = { userRoutes };


