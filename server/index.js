require('dotenv').config({ path: './Services/.env' });
const favouritesRouter = require('./Routers/favouritesRouter/favouritesRouter');
const adminRouter = require('./Routers/AdminRouter/AdminRouter');
const authRouter = require('./Routers/AuthRouter/AuthRouter');
const cartRouter = require('./Routers/cartRouter/cartRouter');
const ensureGuestKey = require('./functions/ensureGuestKey');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const PORT = process.env.PORT || 5000;
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(ensureGuestKey)

app.use(
  cors({
    origin: [
      process.env.DEVELOPMENT_CLIENT_URL,
      process.env.PRODUCTION_HOSTING_URL,
      process.env.PRODUCTION_DOMEN
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

const secretKey = process.env.SESSION_SECRET;
app.use(session({
  secret: secretKey,
  maxAge: 60000,
  cookie: {
    secure: true,
    httpOnly: true,
    domain: '.opharm.uz',
    sameSite: 'None',
  }
}));

app.use('/auth', authRouter);
app.use('/admin-controll', adminRouter);
app.use('/users/cart', cartRouter);
app.use('/users/favourites', favouritesRouter);

app.listen(PORT, () => {
  console.log(`Server started on : http://localhost:${PORT}`);
});
