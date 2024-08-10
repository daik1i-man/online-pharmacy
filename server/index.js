const favouritesRouter = require('./Routers/favouritesRouter/favouritesRouter')
const adminRouter = require("./Routers/AdminRouter/AdminRouter");
const authRouter = require("./Routers/AuthRouter/AuthRouter");
const cartRouter = require("./Routers/cartRouter/cartRouter");
require('dotenv').config({ path: './Services/.env/.env' })
const cookieParser = require("cookie-parser");
const session = require('express-session');
const PORT = process.env.PORT || 5000;
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["https://online-pharmacy-client.vercel.app"],
    credentials: true,
    optionSuccessStatus: 200,
  })
);

const secretKey = process.env.SESSION_SECRET

const isProduction = process.env.NODE_ENV === 'production';

app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true, httpOnly: true },
}))

app.use("/auth", authRouter);
app.use("/admin-controll", adminRouter);
app.use("/users/cart", cartRouter);
app.use("/users/favourites", favouritesRouter);


app.listen(PORT, () => {
  console.log(`Server started on : http://localhost:${PORT}`);
});
