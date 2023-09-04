const express = require("express");

const authRouter = express.Router();
const {
  postSignUp,
  postLogin,
  postUpdate,
  postForget,
  deleteDelete,
} = require("../controller/authController");

authRouter.post("/signup", postSignUp);
authRouter.post("/login", postLogin);
authRouter.put("/update", postUpdate);
authRouter.post("/forget", postForget);
authRouter.delete("/delete", deleteDelete);

module.exports = {
  authRouter,
};
