import axios from "axios";
import { dataProps } from "../addProduct/types";
import { storage } from "@/Services/Firebase/firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const fetchcategories = async () => {
    try {
        const response = await axios.get('http://localhost:5000/admin-controll/categories/get-all')
        return response.data.categories as dataProps
    } catch (error) {
        console.log(error);
        return null
    }
}

export const uploadFile = async (file: File) => {
    if (!file) {
        return null
    } else {
        const storageRef = ref(storage, 'admin-panel/products/updated-images/' + file.name)
        await uploadBytes(storageRef, file)
        const url = await getDownloadURL(storageRef)
        return url
    }
}

