import axios, { AxiosRequestConfig } from 'axios'

const axiosOptions: AxiosRequestConfig = {
    baseURL: 'http://localhost:5000',
    timeout: 10000,
    withCredentials: true
}

export const axiosInstance = axios.create(axiosOptions)