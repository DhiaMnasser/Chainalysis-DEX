const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const path = require("path");
require("dotenv").config();
const mongoose = require("mongoose");

//bring routes
const cryptoRoutes = require("./routes/cryptoRoutes");

//app
const app = express();

//middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


//cors
app.use(cors({ origin: `*` }));


//routes middleware
app.use("/api", cryptoRoutes);


// app.use(express.static(path.resolve(__dirname, "./client/build")));
// // Step 2:
// app.get("*", function (request, response) {
//   response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
// });
//port
const port = process.env.PORT || 8005;
app.listen(port, () => {
  console.log(`Your server is running on port ${port}`);
});
