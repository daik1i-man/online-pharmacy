import axios, { AxiosRequestConfig } from "axios";

const axiosOptions: AxiosRequestConfig = {
    baseURL: 'https://online-pharmacy-server.onrender.com',
    timeout: 10000,
    withCredentials: true,
}

export const axiosInstance = axios.create(axiosOptions)