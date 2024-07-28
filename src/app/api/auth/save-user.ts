// src/pages/api/save-user.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/db';

interface User {
    id: string;
    name: string;
    email: string;
    image: string;
}

async function saveUserToDatabase(user: User) {
    try {
        const client = await clientPromise;
        const db = client.db();
        const collection = db.collection('users');

        // Update or insert the user document
        await collection.updateOne(
            { email: user.email },  // 이메일을 기준으로 업데이트
            { $set: user },
            { upsert: true }
        );

        console.log("User saved successfully");
    } catch (error) {
        console.error("Error saving user to database:", error);
        throw error;
    }
}

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
