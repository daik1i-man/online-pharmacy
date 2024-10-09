import axios, { AxiosRequestConfig } from "axios";

// http://localhost:5000

const axiosOptions: AxiosRequestConfig = {
    baseURL: 'https://api.opharm.uz',
    timeout: 10000,
    withCredentials: true,
}

export const axiosInstance = axios.create(axiosOptions)