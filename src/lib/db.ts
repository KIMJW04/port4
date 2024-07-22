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

        // Update or insert the user document
        await collection.updateOne(
            { id: user.id },
            { $set: user },
            { upsert: true }
        );

        console.log("User saved successfully");
    } catch (error) {
        console.error("Error saving user to database:", error);
        throw error;
    }
}
