const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");


// Register User
module.exports.registerUser = async (req, res) => {
  try {
    let { fullname: fullname, email, password } = req.body;

    let user = await userModel.findOne({ email: email });
    if (user) return res.status(401).send("user alread exist please login.");

    bcrypt.genSalt(12, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          return res.send(err.message);
        } else {
          let user = await userModel.create({
            fullname,
            email,
            password: hash,
          });
          let token = generateToken(user);
          res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
          });
          res.redirect("/shop")
        }
      });
    });
  } catch (err) {
    console.log("error = " + err.message);
  }
};

//login
module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).send("Email or Password Incorrect");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Email or Password Incorrect");
    }

    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    });

   
    res.redirect("/shop");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};


module.exports.logoutUser = (req,res)=>{
  res.cookie("token", "");
  res.redirect("/")
}