const express = require('express')
const authRouter = express.Router();
const usersAuthRouter = require('./usersAuthRouter/usersAuthRouter')
const AdminAuthRouter = require('../AuthRouter/AdminAuthRouter/AdminAuthRouter')

authRouter.use('/user', usersAuthRouter)
authRouter.use('/admin', AdminAuthRouter)

module.exports = authRouter;
