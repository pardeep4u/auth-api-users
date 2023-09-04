const createError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { AuthModel } = require("../model/authModel");

const postSignUp = async (req, res, next) => {
  // Check if email is already exist.
  console.log("here.");
  const ifAlreadyEmailExist = await AuthModel.findOne({
    email: req.body.email,
  });
  if (ifAlreadyEmailExist) {
    res.status(409).json({
      message: "email Already exist",
    });
    return;
  }
  const ifAlreadyUsernameExist = await AuthModel.findOne({
    username: req.body.username,
  });
  if (ifAlreadyUsernameExist) {
    res.status(409).json({
      message: "Username Already exist",
    });
    return;
  }
  console.log("here2");

  // setting up Hashed Password
  const newPass = await bcrypt.hash(req.body.password, 7);
  const data = {
    email: req.body.email,
    username: req.body.username,
    password: newPass,
    /** DDMMYYYY */
    dateOfBirth: req.body.dateOfBirth,
  };
  console.log(newPass);
  try {
    // Put in try catch block
    console.log("here4");
    await AuthModel.insertMany([{ ...data }]);
    console.log("herherere");
    res.status(200).json({
      message: "Succesfully Regetired!",
    });
  } catch (errorInTryCatch) {
    console.log(errorInTryCatch);
    createError(createError(500, errorInTryCatch));
  }
};

const postLogin = async (req, res, next) => {
  // Finding the USer
  const ifAlreadyExist = await AuthModel.findOne({
    email: req.body.email,
  });

  // Succesfully find a user
  if (ifAlreadyExist) {
    bcrypt.compare(req.body.password, ifAlreadyExist.password).then((value) => {
      // PassWord Matched
      if (value) {
        const obj = {
          email: ifAlreadyExist.email,
          id: ifAlreadyExist.id,
        };
        jwt.sign(
          obj,
          process.env.JWT_SECRET,
          { expiresIn: "10m" },
          (tokenError, token) => {
            // IF there is any token error
            if (tokenError) {
              res.status(500).json({
                tokenError,
              });
              return;
            }
            res.status(200).json({
              user: obj,
              isVerified: value,
              token,
            });
          }
        );
      } else {
        next(createError(400, "Incorrect Password!"));
      }
    });
  } else {
    // If no user found
    next(createError(400, "No user Find With this email"));
    return;
  }
};
const postUpdate = async (req, res, next) => {
  const userId = req.body.userId;
  const updateFields = {};

  if (req.body.username) {
    updateFields.username = req.body.username;
  }

  if (req.body.dateOfBirth) {
    updateFields.dateOfBirth = req.body.dateOfBirth;
  }

  try {
    const user = await AuthModel.findByIdAndUpdate(userId, updateFields, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const postForget = async (req, res, next) => {
  const { email, dateOfBirth, newPassword } = req.body;

  try {
    const user = await AuthModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate provided date of birth against user's stored DOB
    if (user.dateOfBirth !== dateOfBirth) {
      return res.status(400).json({ message: "Invalid date of birth" });
    }

    // Hash the new password before saving it
    const hashedPassword = await bcrypt.hash(newPassword, 7);

    // Update the user's password with the new hashed password
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      message: "Password reset successful",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteDelete = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await AuthModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the provided password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // If the password is valid, delete the user
    await user.remove();

    return res.status(200).json({
      message: "User account deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user account:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  postSignUp,
  postLogin,
  postUpdate,
  postForget,
  deleteDelete,
};
