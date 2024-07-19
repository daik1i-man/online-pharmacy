import axios from "axios";
import { basketProductsProps } from "./types";

axios.defaults.withCredentials = true

export const getAllCaregories = async () => {
    try {
        const response = await axios.get('http://localhost:5000/admin-controll/categories/get-all')
        return response.data.categories
    } catch (error) {
        console.log(`${(error as Error).message}`)
        return []
    }
}

export const getAllProducts = async (limit: number) => {
    try {
        const response = await axios.get(`http://localhost:5000/admin-controll/products/get-all?limit=${limit}`)
        return response.data.allProducts
    } catch (error) {
        console.log((error as Error).message)
        return []
    }
}

export const getCategoryById = async (id: string | string[]) => {
    try {
        const response = await axios.get(`http://localhost:5000/admin-controll/categories/category?id=${id}`)
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
        const response = await axios.get(`http://localhost:5000/admin-controll/products/get-products?category=${name}`)
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
        const response = await axios.get(`http://localhost:5000/admin-controll/products/product?id=${id}`)
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

export const addProductsToCard = async (basketProductDatas: basketProductsProps) => {
    try {
        
    } catch (error) {
        console.log((error as Error).message);
    }
}