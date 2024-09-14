const express = require('express')
const middlewareRouter = express.Router()
const userMiddleware = require('../../functions/userMiddleware')
const adminMiddleware = require('../../functions/adminMiddleware')


middlewareRouter.get('/admin', adminMiddleware)
middlewareRouter.get('/user', userMiddleware)

module.exports = middlewareRouter