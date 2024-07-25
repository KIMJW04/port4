// lib/db.ts
import clientPromise from './mongodb';

interface User {
    id: string;
    name: string;
    email: string;
    image: string;
}

export async function saveUserToDatabase(user: User) {
    try {
        const client = await clientPromise;
        const db = client.db();
        const collection = db.collection('users');

        // 기존 유저를 찾기 위한 쿼리
        const existingUser = await collection.findOne({ email: user.email });

        if (existingUser) {
            // 유저가 이미 존재하면 업데이트만 수행
            await collection.updateOne(
                { email: user.email },
                { $set: { name: user.name, image: user.image, id: user.id } }
            );
            console.log("User updated successfully");
        } else {
            // 유저가 존재하지 않으면 새로 삽입
            await collection.insertOne(user);
            console.log("User inserted successfully");
        }
    } catch (error) {
        console.error("Error saving user to database:", error);
        throw error;
    }
}
