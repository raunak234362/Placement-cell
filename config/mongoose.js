const mongoose = require("mongoose");
const MONGODB_URL="mongodb+srv://raunak:1234@cluster0.yc2dsko.mongodb.net/?retryWrites=true&w=majority";
require("dotenv").config();

exports.connect = () => {
  mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log("Connected to MongoDB");
      // Your code here
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
  
};
