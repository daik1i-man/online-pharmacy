import axios, { AxiosRequestConfig } from "axios";

// https://api.opharm.uz

const axiosOptions: AxiosRequestConfig = {
    baseURL: 'http://localhost:5000',
    timeout: 10000,
    withCredentials: true,
}

export const axiosInstance = axios.create(axiosOptions)