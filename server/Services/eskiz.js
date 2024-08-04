const { axiosInstance } = require('../Services/axios.config')

async function authenticate() {
    try {
        const response = await axiosInstance.post('/auth/login', {
            email: 'kholikulovelyor@gmail.com',
            password: 'lWMS8DpghTyKoxHalY8Rvi8OocKFLxYx4pWBSL9f'
        });
        return response.data.data.token;
    } catch (error) {
        console.error('Error authenticating:', error.response ? error.response.data : error.message);
        throw error;
    }
}

async function sendSMS(token, message, recipient) {
    try {
        await axiosInstance.post('/message/sms/send', {
            mobile_phone: recipient,
            message: message,
            from: 'Opharm.uz'
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error('Error sending SMS:', error.response ? error.response.data : error.message);
        throw error;
    }
}


async function main(phone_number) {
    const otp = Math.floor(1000 + Math.random() * 9000);
    try {
        const token = await authenticate();
        await sendSMS(token, `Online Pharmacy sayti orqali ro'yxatdan o'tish uchun tasdiqlash kodingiz: ${otp}`, phone_number);
        return otp;
    } catch (error) {
        console.error('Error in main function:', error.message);
        return null;
    }
}

module.exports = main;