const express = require("express");
const router = express.Router();
const onwerModel = require("../models/onwer-model")


if(process.env.NODE_ENV === "development"){
    router.post("/create", async(req, res) => {
      let {fullname,email,password} = req.body;
        let onwers = await onwerModel.find();
        if(onwers.length > 0){
            return res.status(504).send("you don't have acces here")
        }
      let createdOnwer =  await onwerModel.create({
          fullname ,
          email,
          password,
        });

      res.status(200).send("Working set a new omwer");
    });
}

router.get("/", (req, res) => {
  res.status(200).send("Working");
});
module.exports = router;