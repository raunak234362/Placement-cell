// Import and connect to the MongoDB database
require("./config/mongoose").connect();

// Import required libraries and set up the Express application
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();

// MongoDB connection URL
const MONGODB_URL="mongodb+srv://raunak:1234@cluster0.yc2dsko.mongodb.net/?retryWrites=true&w=majority";
// Session secret key 
const SESSION_SECRET_KEY= process.env;

// Import Express EJS layouts
const expressLayouts = require("express-ejs-layouts");
const port=8000;

// Import User model
const User=require('./models/user');

// used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const mongoose=require("mongoose")
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const customMware = require("./config/middleware");

// Middleware setup

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressLayouts);

// set up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Session configuration

// mongo store is used to store the session cookie in the db
app.use(
  session({
    name: "placement-cell",
    secret: "SESSION_SECRET_KEY",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create({
      mongoUrl: "mongodb+srv://raunak:1234@cluster0.yc2dsko.mongodb.net/?retryWrites=true&w=majority",
      autoRemove: "disabled",
    }),
    function(err) {
      console.log(err || "connect-mongodb setup ok");
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// sets the authenticated user in the response
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use("/", require("./routes"));


// Start the server

app.listen(port, (err) => {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(`server is running on port: ${port}`);
});
