// lib/db.ts
import { connectToDatabase } from './mongodb';

export async function saveUserToDatabase(user: any) {
    const db = await connectToDatabase();
    const usersCollection = db.collection('users');

    // 사용자 정보를 데이터베이스에 저장
    await usersCollection.updateOne(
        { email: user.email },
        {
            $set: {
                name: user.name,
                image: user.image,
                email: user.email,
                phone: user.phone || '', // 전화번호가 없을 경우 빈 문자열로 설정
                updatedAt: new Date(),
            },
        },
        { upsert: true } // 사용자 정보가 없으면 새로 생성
    );
}
