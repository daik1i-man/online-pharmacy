const express = require('express')
const usersAuthRouter = express.Router()
const {
    getUserNumber,
    verifyOtp,
    getUserPassword,
    login,
    getCurrentUser,
    logout,
    updateUser
} = require('../../../Controllers/AuthController/UserAuthController/userAuthController')

usersAuthRouter.post('/get-number', getUserNumber)
usersAuthRouter.post('/verification', verifyOtp)
usersAuthRouter.post('/get-password', getUserPassword)
usersAuthRouter.post('/login', login)
usersAuthRouter.get('/get-user', getCurrentUser)
usersAuthRouter.get('/logout', logout)
usersAuthRouter.post('/update-profile', updateUser)

module.exports = usersAuthRouter