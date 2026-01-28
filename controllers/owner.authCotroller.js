const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ownerModel = require("../models/owner-model")
const { generateToken } = require("../utils/generateToken");

module.exports.createOwner = async (req,res)=>{
      try {
        let { fullname: fullname, email, password } = req.body;
    
        let owner = await ownerModel.findOne({ email: email });
        if (owner) return res.status(401).send("owner alread exist please login.");
    
        bcrypt.genSalt(12, (err, salt) => {
          bcrypt.hash(password, salt, async (err, hash) => {
            if (err) {
              return res.send(err.message);
            } else {
              let owner = await ownerModel.create({
                fullname,
                email,
                password: hash,
              });
              let token = generateToken(ownerModel);
              res.cookie("token", token, {
                httpOnly: true,
                sameSite: "strict",
              });
              res.redirect("/admin")
            }
          });
        });
      } catch (err) {
        console.log("error = " + err.message);
      }
}