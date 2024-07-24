import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
if (!uri) {
    throw new Error('MONGODB_URI 환경 변수가 설정되지 않았습니다.');
}

const client = new MongoClient(uri);

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
    if ((global as any)._mongoClientPromise) {
        clientPromise = (global as any)._mongoClientPromise;
    } else {
        (global as any)._mongoClientPromise = clientPromise = client.connect();
    }
} else {
    clientPromise = client.connect();
}

export default clientPromise;
