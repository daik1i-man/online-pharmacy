const crypto = require("crypto");
const session = require("express-session");

const secretKey = crypto.randomBytes(64).toString("hex");

const sessionConfig = new session({
  secret: secretKey,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, httpOnly: true, sameSite: 'strict' },
});

module.exports = sessionConfig;
