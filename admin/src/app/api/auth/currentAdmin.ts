import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { parse } from "cookie";

export default async function getCurrentAdmin(req: NextApiRequest, res: NextApiResponse) {
    const cookiesValue = parse(req.headers.cookie || '');
    const adminId = cookiesValue['admin_id'];

    if (!adminId) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    try {
        const response = await axios.post('http://localhost:5000/auth/admin/current-admin', {
            id: adminId
        });

        const adminData = response.data.currentAdmin;

        if (!adminData) {
            return res.status(404).json({ message: "Admin not found" });
        }

        res.status(200).json({ currentAdmin: adminData });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
