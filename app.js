require("dotenv").config()
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
const path = require("path")
const expressSession = require("express-session");
const flash = require("connect-flash");

const onwersRouter = require("./routes/onwersRouter")
const productsRouter = require("./routes/productsRouter")
const usersRouter = require("./routes/usersRouter")
const indexRouter = require("./routes/index")

const connectDB = require("./config/mongoose-connection");
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(
    expressSession({
        resave : false,
        saveUninitialized : false,
        secret : process.env.EXPRESS_SESSION_SECRET,
    })
);


app.use(flash());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine", "ejs");

app.use("/",indexRouter); 
app.use("/onwers", onwersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);



PORT = process.env.PORT || 3000;
app.listen(PORT, (err)=>{
    console.log(`server is running on the port ${PORT} `)
}) 