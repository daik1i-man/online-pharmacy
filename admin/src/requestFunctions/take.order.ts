import { axiosInstance } from '@/configs/axios.config';
import { isAxiosError } from 'axios';

export const takeTheOrder = async (id: string | null) => {
    try {
        const response = await axiosInstance.get(`/admin-controll/orders/delete?id=${id}`)

        return response
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error.response
        }

        throw error
    }
}