// src/auth.ts
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
            console.log("signIn event:", message);
            try {
                const { user } = message;
                if (user) {
                    const id = user.id ?? '';
                    const name = user.name ?? '';
                    const email = user.email ?? '';
                    const image = user.image ?? '';

                    if (id && email) {
                        // 사용자 정보를 API를 통해 데이터베이스에 저장
                        await fetch('/api/save-user', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ id, name, email, image }),
                        });
                    } else {
                        console.error("User information is incomplete.");
                    }
                }
            } catch (error) {
                console.error("Error sending user data to API:", error);
            }
        },
    },
});
