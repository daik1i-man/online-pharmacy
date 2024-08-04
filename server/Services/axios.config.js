const axios = require('axios')

const axiosOptions = {
    baseURL: 'https://notify.eskiz.uz/api',
    timeout: 10000,
    withCredentials: true
}

const axiosInstance = axios.create(axiosOptions)

module.exports = { axiosInstance }