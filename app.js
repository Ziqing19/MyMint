const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");

require("dotenv").config();

const authRouter = require("./routes/authentication");
const userRouter = require("./routes/user");
const transactionRouter = require("./routes/transaction");
const indexRouter = require("./routes/index");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "MoneyThings",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    expires: new Date(Date.now() + 30 * 86400 * 1000),
  })
);

app.use("/authentication", authRouter);
app.use("/user", userRouter);
app.use("/transaction", transactionRouter);
app.use("/", indexRouter);

app.use(express.static(path.join(__dirname, "frontend/build")));

module.exports = app;
