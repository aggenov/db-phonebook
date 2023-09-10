const User = require("../db/models/userModels");

const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");

const addUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(409).json({ message: "user already exist" });
    return;
  }

  const newUser = new User({
    name,
    email,
    password,
  });

  await newUser.hashPassword(password);

  await newUser.save();

  const payload = {
    id: newUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY);

  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({ user: { name, email }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ message: "email or password wrong" });
    return;
  }
  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) {
    res.status(401).json({ message: "email or password wrong" });
    return;
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(user._id, { token });
  res.json({ user: { name: user.name, email }, token });
};

module.exports = { addUser, login };
