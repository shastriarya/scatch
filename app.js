require("dotenv").config()
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
const path = require("path")

const onwersRouter = require("./routes/onwersRouter")
const productsRouter = require("./routes/productsRouter")
const usersRouter = require("./routes/usersRouter")

const connectDB = require("./config/mongoose-connection");

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine", "ejs");


app.use("/onwers", onwersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);



PORT = process.env.PORT || 3000;
app.listen(PORT, (err)=>{
    console.log(`server is running on the port ${PORT} `)
}) 