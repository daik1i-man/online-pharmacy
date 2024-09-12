const express = require('express')
const AdminAuthRouter = express.Router()
const { AdminRegister, AdminLogin, getCurrentAdmin, logout } = require('../../../Controllers/AuthController/AdminAuthController/AdminAuthController')

AdminAuthRouter.post('/register', AdminRegister)
AdminAuthRouter.post('/login', AdminLogin)
AdminAuthRouter.get('/current-admin', getCurrentAdmin)
AdminAuthRouter.get('/logout', logout)

module.exports = AdminAuthRouter;