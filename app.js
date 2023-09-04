const express = require("express");
const mongoose = require("mongoose");
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require("body-parser");
// eslint-disable-next-line import/no-extraneous-dependencies
const { notFound } = require("./errorHandler/notFound");
const { authRouter } = require("./routes/authRoutes");
const { homeRouter } = require("./routes/homeRoutes");

const { errorHanlding } = require("./errorHandler/errorHandler");

require("dotenv").config();

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authRouter);

app.use(notFound);
app.use(errorHanlding);

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGODB)
  .then((val) => {
    console.log(`Connted To Db ${val}`);
    app.listen(process.env.PORT, () => {
      console.log(`currently ON ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Failed To Connected To DB ${err}`);
  });
