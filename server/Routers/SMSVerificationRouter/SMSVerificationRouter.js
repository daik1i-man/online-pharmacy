const express = require('express')
const SMSVerficationRouter = express.Router();
const { SenderSMS, CheckSendedCode } = require('../../Controllers/SMSVerficationController/SMSVerficationController')

SMSVerficationRouter.post('/send-code', SenderSMS)
SMSVerficationRouter.post('/check-code', CheckSendedCode)

module.exports = SMSVerficationRouter;
