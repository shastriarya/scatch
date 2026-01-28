const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model")
const isLoggedIn = require("../middleware/isLoggedIn")
const createOwner = require("../controllers/owner.authCotroller")


if(process.env.NODE_ENV === "development"){
    router.post("/create",createOwner);
}

router.get("/admin",isLoggedIn, (req, res) => {
  let success = req.flash("success");
  res.render("createproducts",{success});
});
module.exports = router;