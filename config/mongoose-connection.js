const mongoose = require("mongoose");

const connectDB = async () =>{
    try {
        console.log("MOGO_URI=>",process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected ")
    }catch (err) {
        console.log("MongoDB Connection faild:,",err);
        process.exit(1);
    }
}
module.exports = connectDB