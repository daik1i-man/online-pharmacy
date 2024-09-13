import { axiosInstance } from "@/configs/axios.config";
import { addCategoryProps } from "@/types/types";
import { isAxiosError } from "axios";

export const addCategory = async ({ categoryName, url, formattedDate }: addCategoryProps) => {
    try {
        const response = await axiosInstance.post('/admin-controll/categories/add', {
            name: categoryName,
            img_url: url,
            created_date: formattedDate
        })

        return response
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return error.response
        }

        throw error
    }
}