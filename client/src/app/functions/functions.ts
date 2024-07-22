import { axiosInstance } from "@/configs/axios.config";
import Cookies from "js-cookie"

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


export async function addProductToCart(id: string, quantity: number) {
    const user = Cookies.get('userId')

    const url = user === undefined ? '/not-auth-users/card/add' : '/auth-users/card/add'

    try {
        const response = await axiosInstance.post(url, {
            productId: id,
            quantity: quantity
        })
        return response.data
    } catch (error) {
        return (error as Error).message
    }
}

export const deleteProductFromCart = async (id: string) => {
    const user = Cookies.get('userId')

    const url = user === undefined ? `/not-auth-users/card/delete?productId=${id}` : `/auth-users/card/delete?productId=${id}`

    try {
        const response = await axiosInstance.get(url)
        if (response.status === 200) {
            console.log(response.data.message);
        }
        return response.data
    } catch (error) {
        return (error as Error).message
    }
}

export const addProductToFavourites = async (id: string) => {
    const user = Cookies.get('userId')

    const url = user === undefined ? '/not-auth-users/favourites/add' : '/auth-users/favourites/add'

    try {
        const response = await axiosInstance.post(url, { id: id })

        return response.data.message
    } catch (error) {
        return (error as Error).message
    }
}

export const deleteProductFromFavourites = async (id: string) => {
    const user = Cookies.get('userId')

    const url = user === undefined ? `/not-auth-users/favourites/delete?id=${id}` : `/auth-users/favourites/delete?id=${id}`

    try {
        const response = await axiosInstance.get(url)
        return response.data.message
    } catch (error) {
        return (error as Error).message
    }
}

export const getCart = async () => {
    const user = Cookies.get('userId')

    const url = user === undefined ? '/not-auth-users/card/get-cart' : '/auth-users/card/get-cart'


    try {
        const response = await axiosInstance.get(url)

        return response.data
    } catch (error) {
        return (error as Error).message
    }
}

export const getFavourites = async () => {
    const user = Cookies.get('userId')

    const url = user === undefined ? '/not-auth-users/favourites/get-favourites' : '/auth-users/favourites/get-favourites';

    try {
        const response = await axiosInstance.get(url)
        return response.data
    } catch (error) {
        return (error as Error).message
    }
}