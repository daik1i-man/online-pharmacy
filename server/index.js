require('dotenv').config({ path: './Services/.env' });
const middlewareRouter = require('./Routers/middlewareRouter/middleware.router')
const favouritesRouter = require('./Routers/favouritesRouter/favouritesRouter')
const adminRouter = require('./Routers/AdminRouter/AdminRouter')
const authRouter = require('./Routers/AuthRouter/AuthRouter')
const cartRouter = require('./Routers/cartRouter/cartRouter')
const ensureGuestKey = require('./functions/ensureGuestKey')
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;
const jwt = require('jsonwebtoken')
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(ensureGuestKey)

app.use(
  cors({
    origin: [
      process.env.CLIENT_VERCEL_URL,
      process.env.ADMIN_VERCEL_URL,
      process.env.ADMIN_DOMEN_URL,
      process.env.CLIENT_DOMEN_URL,
      process.env.DEVELOPMENT_URL,
      process.env.APP_VERCEL_URL,
      process.env.APP_DOMEN_URL
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  })
)


app.use('/auth', authRouter)
app.use('/admin-controll', adminRouter)
app.use('/users/favourites', favouritesRouter)
app.use('/users/cart', cartRouter)
app.use('/middleware', middlewareRouter)

app.listen(PORT, () => {
  console.log(`Server started on : http://localhost:${PORT}`);
});
