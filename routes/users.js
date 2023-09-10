const express = require("express");

const authRouter = express.Router();
const { addUser, login } = require("../controllers/usersControllers");
const authentificate = require("../middlewares/authentificate");

authRouter.post("/signup", addUser);

authRouter.post("/login", login);

// authRouter.post("/logout");

authRouter.get("/current", authentificate);

module.exports = authRouter;
