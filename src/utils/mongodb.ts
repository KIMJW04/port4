// lib/mongodb.ts
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);

export async function connectToDatabase() {
    if (!client.isConnected()) {
        await client.connect();
    }
    return client.db('your_database_name'); // 데이터베이스 이름
}
