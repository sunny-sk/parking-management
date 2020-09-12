const express = require("express");
const router = express.Router();

// importing user controller methods

const { signupUser, signinUser } = require("../controller/user");

router.post("/signin", signinUser);
router.post("/signup", signupUser);

module.exports = router;
