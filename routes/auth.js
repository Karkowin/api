// Import dependencies
const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");

// Setup the express server router
const router = express.Router();

// On post
router.post("/", async (req, res) => {
  const users = [
    {
      email: "back@bonsoir.com",
      password: "$2b$15$zqY2Q4eOoGzFpZkHJz9HS.BSfXc/HM2E/yTWa1awFmTMgN2bE72Uu",
      roles: ["admin", "editor", "viewer"],
    },
    {
      email: "front@bonsoir.com",
      password: "$2b$15$jfAenlI0IXsUaouWzljFAepOdvzARJL3V0usZlXzE2bw.2tDgaANm",
      roles: ["viewer"],
    },
  ];

  // Get to user from the database, if the user is not there return error
  let user = users.find((u) => u.email === req.body.email);
  if (!user) throw new Error("Invalid email or password.");

  // Compare the password with the password in the database
  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) throw new Error("Invalid email or password.");

  const token = jwt.sign(
    {
      id: user._id,
      roles: user.roles,
    },
    "jwtPrivateKey",
    { expiresIn: "30m" }
  );

  res.send({
    token: token,
  });
});

// Export the router
module.exports = router;
