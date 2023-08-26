const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    token: {
      type: String,
    },
  },
  { versionKey: false }
);

userSchema.methods.hashPassword = async function (password) {
  this.password = await bcrypt.hash(password, 10);
};

const User = model("user", userSchema);

module.exports = User;
