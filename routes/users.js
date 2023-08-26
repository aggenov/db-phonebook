const express = require("express");

const authRouter = express.Router();
const addUser = require("../controllers/usersControllers");

authRouter.post("/signup", addUser);

// authRouter.post("/login");

// authRouter.post("/logout");

// authRouter.get("/current",);

module.exports = authRouter;
