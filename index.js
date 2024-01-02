const express = require("express");
const {connection} = require("./config/connection")

const {adminRoutes} = require("./router/adminRoute")
const {propertiesRoutes} = require("./router/propertyRoute")
const {userRoutes} = require("./router/userRoute")
const { careerRoutes } = require("./router/careerRoute")
const cors = require("cors")

require("dotenv").config();
const app = express();
app.use(cors())
app.use(express.json());

app.get("/", (req , res)=>{
    res.send({message : "api working"})
})

app.use("/api", adminRoutes, propertiesRoutes, careerRoutes, userRoutes);

const port = process.env.port || 5006;
app.listen(port, async ()=>{
  try {
    await connection
    console.log(`conneted to database`);
  } catch (error) {
    console.log(error)
    console.log("something went wrong in Database connection");
  }
  console.log(`server is running on port ${port}\nhttp://localhost:${port}/`);
})


