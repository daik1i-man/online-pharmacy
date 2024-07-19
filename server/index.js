const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
const authRouter = require("./Routers/AuthRouter/AuthRouter");
const adminRouter = require("./Routers/AdminRouter/AdminRouter");
const notAuthUsersCardRouter = require("./Routers/cardRouter/notAuthUsersProductsRouter/cardRouter");
const authUsersCardRouter = require("./Routers/cardRouter/authUsersProductsRouter/cardRouter");
const authUsersFavourites = require('./Routers/favouritesRouter/authUsersFavouritesRouter/authUserFavouritesRouter')
const notAuthUsersFavourites = require('./Routers/favouritesRouter/notAuthUsersFavouritesRouter/notAuthUserFavouritesRouter')
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
app.use("/not-auth-users/card", notAuthUsersCardRouter);
app.use("/auth-users/card", authUsersCardRouter);
app.use("/auth-users/favourites", authUsersFavourites);
app.use("/not-auth-users/favourites", notAuthUsersFavourites);

app.listen(PORT, () => {
  console.log(`Server started on : http://localhost:${PORT}`);
});
