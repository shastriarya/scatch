const mongoose = require("mongoose");



const userSchema = mongoose.Schema({
    fullname : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        unique : true,
        require : true
    },
    pasword : String,

    cart : {
        type : Array,
        default : []
    },
    isAdmin : Boolean,
    orders : {
        type : Array,
        default : []
    },
    contact : Number,
    picture : String,
});

module.exports = mongoose.model("user", userSchema);