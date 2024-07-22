// pages/api/save-user.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { saveUserToDatabase } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const user = req.body;
            await saveUserToDatabase(user);
            res.status(200).json({ message: 'User saved successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error saving user to database', error });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
