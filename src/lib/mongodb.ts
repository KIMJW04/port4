// lib/mongodb.ts
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable to avoid multiple MongoDB connections
    if ((global as any)._mongoClientPromise) {
        clientPromise = (global as any)._mongoClientPromise;
    } else {
        (global as any)._mongoClientPromise = clientPromise = client.connect();
    }
} else {
    // In production mode, create a new MongoDB client for each request
    clientPromise = client.connect();
}

export default clientPromise;
