const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
const authRouter = require("./Routers/AuthRouter/AuthRouter");
const adminRouter = require("./Routers/AdminRouter/AdminRouter");
const cartRouter = require("./Routers/cartRouter/cartRouter");
const favouritesRouter = require('./Routers/favouritesRouter/favouritesRouter')
const sessionConfig = require("./Services/Session");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(sessionConfig);

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
    optionSuccessStatus: 200,
  })
);

app.use("/auth", authRouter);
app.use("/admin-controll", adminRouter);
app.use("/users/cart", cartRouter);
app.use("/users/favourites", favouritesRouter);


app.listen(PORT, () => {
  console.log(`Server started on : http://localhost:${PORT}`);
});
