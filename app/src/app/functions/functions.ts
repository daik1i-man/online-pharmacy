import { axiosInstance } from "@/configs/axios.config";
import { updatePrifleDatasProps, stateProps } from "../types";
import axios from "axios";

export const getAllCaregories = async () => {
    try {
        const response = await axiosInstance.get('/admin-controll/categories/get-all')
        return response.data.categories
    } catch (error) {
        console.log(`${(error as Error).message}`)
        return []
    }
}

export const getAllProducts = async (limit: number) => {
    try {
        const response = await axiosInstance.get(`/admin-controll/products/get-all?limit=${limit}`)
        return response.data.allProducts
    } catch (error) {
        console.log((error as Error).message)
        return []
    }
}

export const getCategoryById = async (id: string | string[]) => {
    try {
        const response = await axiosInstance.get(`/admin-controll/categories/category?id=${id}`)
        if (response.data) {
            return response.data.category
        } else {
            return []
        }
    } catch (error) {
        console.log((error as Error).message);
        return []
    }
}

export const getProductsByCategoryName = async (name: string) => {
    try {
        const response = await axiosInstance.get(`/admin-controll/products/get-products?category=${name}`)
        if (response.data) {
            return response.data.products
        } else {
            return []
        }
    } catch (error) {
        console.log((error as Error).message);
        return []
    }
}

export const getProductById = async (id: string | string[]) => {
    try {
        const response = await axiosInstance.get(`/admin-controll/products/product?id=${id}`)
        if (response.data) {
            return response.data.product
        } else {
            return []
        }
    } catch (error) {
        console.log((error as Error).message);
        return []
    }
}


export async function addProductToCart(id: string, quantity: number, price: string) {
    try {
        const response = await axiosInstance.post('/users/cart/add', {
            productId: id,
            quantity: quantity,
            price: price
        })
        return response.data
    } catch (error) {
        return (error as Error).message
    }
}

export const deleteProductFromCart = async (id: string) => {
    try {
        const response = await axiosInstance.get(`/users/cart/delete?productId=${id}`)
        return response.data.message
    } catch (error) {
        return (error as Error).message
    }
}

export const addProductToFavourites = async (id: string) => {
    try {
        const response = await axiosInstance.get(`/users/favourites/add?id=${id}`)

        return response.data.message
    } catch (error) {
        return (error as Error).message
    }
}

export const deleteProductFromFavourites = async (id: string) => {
    try {
        const response = await axiosInstance.get(`/users/favourites/delete?id=${id}`)
        return response.data.message
    } catch (error) {
        return (error as Error).message
    }
}

export const getCart = async () => {
    try {
        const response = await axiosInstance.get('/users/cart/get-cart')
        return response?.data?.products
    } catch (error) {
        return (error as Error).message
    }
}

export const getFavourites = async () => {
    try {
        const response = await axiosInstance.get('/users/favourites/get-favourites')

        return response?.data?.favourites
    } catch (error) {
        return (error as Error).message
    }
}

export const getUserNumber = async (phone_number: string) => {
    const formattedNumber = phone_number.replace(/\s+/g, '')
    try {
        const response = await axiosInstance.post('/auth/user/get-number', {
            phone_number: `998${formattedNumber}`
        })
        return response
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response
        }
        throw error
    }
}

export const verification = async (otp: string) => {
    try {
        const response = await axiosInstance.post('/auth/user/verification', {
            userOtp: otp
        })
        return response
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response
        }
        throw error
    }
}

export const getUserPassword = async (password: string) => {
    try {
        const response = await axiosInstance.post('/auth/user/get-password', {
            password: password
        })
        return response
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response
        }
        throw error
    }
}

export const login = async (phone_number: string, password: string) => {
    const formatted = phone_number.replace(/\s+/g, '')
    try {
        const response = await axiosInstance.post('/auth/user/login', {
            phone_number: `998${formatted}`,
            password: password
        })

        return response
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response
        }

        throw error
    }
}

export const logout = async () => {
    try {
        const response = await axiosInstance.get('/auth/user/logout')
        return response
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response
        }

        throw error
    }
}

export const getUser = async () => {
    try {
        const response = await axiosInstance.get('/auth/user/get-user')
        return response?.data?.user
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response?.data?.user
        }

        throw error
    }
}

export const updateProfile = async ({ phoneNumber, firstName, lastName, imgUrl }: updatePrifleDatasProps) => {
    const formattedNumber = phoneNumber?.replace(/\s+/g, '')
    try {
        const response = await axiosInstance.post('/auth/user/update-profile', {
            number: `998${formattedNumber}`,
            first_name: firstName,
            last_name: lastName,
            img_url: imgUrl
        })
        return response?.data?.user
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response
        }

        throw error
    }
}


export const getOrders = async () => {
    try {
        const response = await axiosInstance.get('/admin-controll/orders/get-user-orders')
        return response?.data?.orders
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response
        }

        throw error
    }
}

export const cancelOrder = async (id: string) => {
    try {
        const response = await axiosInstance.post('/admin-controll/orders/delete', {
            id: id
        })
        return response
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response
        }

        throw error
    }
}

export const checkout = async ({ ...props }: stateProps) => {

    const date = new Date().toLocaleDateString()
    const { firstName, lastName, phoneNumber, paymentType, cardNumber, totalPrice } = props

    try {
        await axiosInstance.post('/admin-controll/orders/add', {
            phoneNumber: phoneNumber,
            total_price: totalPrice,
            ordered_time: date,
            status: 'Getting ready',
            firstName: firstName,
            lastName: lastName,
            paymentType: paymentType,
            cardNumber: cardNumber
        })
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response
        }

        throw error
    }
}
