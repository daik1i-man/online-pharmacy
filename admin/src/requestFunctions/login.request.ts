import { loginReuestFunctionProps } from '@/types/types';
import { axiosInstance } from '@/configs/axios.config';
import { isAxiosError } from 'axios';

export const loginRequest = async ({ phoneNumber, password }: loginReuestFunctionProps) => {
    const formattedPhoneNumber = `998${phoneNumber.replace(/\s+/g, '')}`
    
    try {
        const response = await axiosInstance.post('/auth/admin/login', {
            phoneNumber: formattedPhoneNumber,
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