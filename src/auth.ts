import NextAuth from 'next-auth';
import github from 'next-auth/providers/github';
import google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        github({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET, // 비밀 키 설정
    events: {
        async signIn(message) {
            console.log('signIn event:', message);
            try {
                const { user } = message;
                if (user) {
                    const id = user.id ?? ''; // 기본값으로 빈 문자열 제공
                    const name = user.name ?? '';
                    const email = user.email ?? '';
                    const image = user.image ?? '';

                    if (id && email) {
                        // API 엔드포인트로 사용자 정보를 전송
                        const response = await fetch('/api/save-user', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                id,
                                name,
                                email,
                                image,
                            }),
                        });

                        if (!response.ok) {
                            throw new Error('Failed to save user to database');
                        }
                    } else {
                        console.error('User information is incomplete.');
                    }
                }
            } catch (error) {
                console.error('Error saving user to database in signIn event:', error);
            }
        },
    },
});
