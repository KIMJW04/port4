import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'your_mongodb_connection_string';

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface CachedMongoose {
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
}

// Node.js global object는 타입이 없기 때문에, TypeScript에서 정확한 타입을 지정
declare global {
    var mongoose: CachedMongoose | undefined;
}

let cached: CachedMongoose = global.mongoose || { conn: null, promise: null };

async function dbConnect(): Promise<mongoose.Mongoose> {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            // 최신 버전에서는 이 옵션들이 기본값으로 설정되므로, 제거 가능합니다.
        }).then((mongoose) => {
            return mongoose;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;
