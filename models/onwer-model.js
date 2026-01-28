const mongoose = require("mongoose");


const onwerSchema = mongoose.Schema({
    fullname : {
        type : String,
       minLength : 3,
       trim : true
    },
    email : {
        type : String,
        unique : true,
    },
    password : String,
    products : {
        type : Array,
        default : []
    },
    picture : String,
    gstin : String
});

module.exports = mongoose.model("onwer", onwerSchema);