import axios from "axios";
import { dataProps } from "./types";
import { storage } from "@/Services/Firebase/firebase-config";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export const fetchAllcategories = async () => {
    try {
        const response = await axios.get('http://localhost:5000/admin-controll/categories/get-all')
        return response.data.categories as dataProps[]
    } catch (error) {
        console.log(error);
        return []
    }
}

export const uploadFile = async (file: File) => {
    const storageRef = ref(storage, 'admin-panel/products/current-images/' + file?.name)
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    return url
}