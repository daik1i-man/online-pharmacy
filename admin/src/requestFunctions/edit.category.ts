import { axiosInstance } from "@/configs/axios.config";
import { editCategoryProps } from "@/types/types";
import { isAxiosError } from "axios";

export const editCategory = async ({ id, categoryName, url, formattedDate }: editCategoryProps) => {
    try {
        const response = await axiosInstance.post('/admin-controll/categories/update', {
            id: id,
            name: categoryName,
            img_url: url,
            created_date: formattedDate
        })

        return response
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error.response
        }
        
        throw new Error
    }
}