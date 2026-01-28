const mongoose = require("mongoose");
const config = require("config")

const dbgr = require("debug")("devlopment:mongoose")

const connectDB = async () =>{
    try {
        await mongoose.connect(`${config.get("MONGODB_URI")}/scatch`);
        dbgr("MongoDB connected ")
    }catch (err) {
        console.log("MongoDB Connection faild:,",err);
        process.exit(1);
    }
}
module.exports = connectDB;