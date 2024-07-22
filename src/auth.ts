// auth.ts
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
});