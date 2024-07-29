import { NextApiRequest, NextApiResponse } from 'next';
import { saveUserToDatabase } from '@/lib/db'; // 사용자 정보를 저장할 함수 임포트

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { id, name, email, image } = req.body;

            if (id && email) { // id와 email이 반드시 있어야 함
                // 사용자 정보를 MongoDB에 저장
                await saveUserToDatabase({
                    id,
                    name,
                    email,
                    image,
                });
                res.status(200).json({ message: 'User saved successfully' });
            } else {
                res.status(400).json({ message: 'User information is incomplete' });
            }
        } catch (error) {
            console.error("Error saving user to database:", error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
