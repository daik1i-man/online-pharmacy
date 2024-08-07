const crypto = require("crypto");
const session = require("express-session");

const secretKey = process.env.SESSION_SECRET || crypto.randomBytes(64).toString("hex");

const sessionConfig = new session({
  secret: secretKey,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true, httpOnly: true, sameSite: 'None' },
});

module.exports = sessionConfig;
