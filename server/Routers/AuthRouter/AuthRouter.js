const express = require('express')
const authRouter = express.Router();
const SMSVerficationRouter = require('../SMSVerificationRouter/SMSVerificationRouter')
const AdminAuthRouter = require('../AuthRouter/AdminAuthRouter/AdminAuthRouter')

authRouter.use('/register', SMSVerficationRouter)
authRouter.use('/admin', AdminAuthRouter)

module.exports = authRouter;
