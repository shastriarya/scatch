const mongoose = require("mongoose");


const productSchema = mongoose.Schema({
    image : {
        type : String,
        required : true,
    },
    name : {
        type : String,
        unique : true,
        require : true
    },
    price : Number,

    discount : {
        type : Number,
        default : 0
    },
    bgcolor : String,
    panelcolor : String,
    textcolor : String,
});

module.exports = mongoose.model("products", productSchema);