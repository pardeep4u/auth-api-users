const express = require("express");

const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
  res.send("hello world!");
});

module.exports = {
  homeRouter,
};
