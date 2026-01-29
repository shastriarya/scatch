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
    password : String,

    cart : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "product"
    }],
    isAdmin : Boolean,
    orders : {
        type : Array,
        default : []
    },
    contact : Number,
    picture : String,
});

module.exports = mongoose.model("user", userSchema);