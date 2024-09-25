import { loginReuestFunctionProps } from '@/types/types';
import { axiosInstance } from '@/configs/axios.config';
import { isAxiosError } from 'axios';

export const loginRequest = async ({ phoneNumber, password }: loginReuestFunctionProps) => {
    try {
        const response = await axiosInstance.post('/auth/admin/login', {
            phoneNumber: phoneNumber,
            password: password
        })

        return response
    } catch (e) {
        if (isAxiosError(e) && e.response) {
            return e.response
        }

        throw e
    }
}