const mongoose = require("mongoose");

const { Schema } = mongoose;

function validateDateOfBirth(value) {
  // Regular expression to match DDMMYYYY format
  const regex = /^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[0-2])[0-9]{4}$/;
  return regex.test(value);
}

const authSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
    validate: [validateDateOfBirth, "Invalid date of birth format"],
  },
});

const AuthModel = mongoose.model("Rudra-user", authSchema);

module.exports = {
  AuthModel,
};
