// auth.ts
import NextAuth from 'next-auth';
import github from 'next-auth/providers/github';
import google from 'next-auth/providers/google';
import { saveUserToDatabase } from './lib/db'; // 사용자 정보를 저장할 함수 임포트

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
    callbacks: {
        async signIn({ user }) {
            console.log('signIn callback:', user);
            try {
                // 사용자 정보를 MongoDB에 저장
                await saveUserToDatabase(user);
                return true; // 로그인 성공
            } catch (error) {
                console.error('Error saving user to database in signIn callback:', error);
                return false; // 로그인 실패
            }
        },
        async session({ session, token }) {
            console.log('session callback:', { session, token });
            if (session.user) {
                session.user.id = token.id as string; // 사용자 ID 추가
                session.user.image = token.image as string; // 프로필 이미지 추가
                session.user.email = token.email as string; // 이메일 추가
            }
            return session;
        },
        async jwt({ token, user }) {
            console.log('jwt callback:', { token, user });
            if (user) {
                token.id = user.id; // JWT 토큰에 사용자 ID 추가
                token.image = user.image; // JWT 토큰에 프로필 이미지 추가
                token.email = user.email; // JWT 토큰에 이메일 추가
            }
            return token;
        },
    },
});
