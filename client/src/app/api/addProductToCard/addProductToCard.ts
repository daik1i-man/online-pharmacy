import { NextApiRequest, NextApiResponse } from "next";
import { axiosInstance } from "@/configs/axios.config";
import { basketProductsProps } from "@/app/types";

export async function AddProductToCard(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { productId, imageUrl, name, quantity, price } = req.body

        try {
            const response = await axiosInstance.post('/not-auth-users/card/add', {
                productId,
                imageUrl,
                name,
                quantity,
                price
            })
            res.status(200).send(`message: ${response.data.message}`)
        } catch (error) {
            res.status(500).send(`${(error as Error).message}`)
        }
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}