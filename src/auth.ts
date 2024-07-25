import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { saveUserToDatabase } from "./lib/db"; // 사용자 정보를 저장할 함수 임포트

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        GoogleProvider({
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
                    // TypeScript 오류를 피하기 위해 optional chaining과 nullish coalescing 사용
                    const id = user.id ?? ''; // 기본값으로 빈 문자열 제공
                    const name = user.name ?? '';
                    const email = user.email ?? '';
                    const image = user.image ?? '';

                    if (id && email) { // id와 email이 반드시 있어야 함
                        // 사용자 정보를 MongoDB에 저장
                        await saveUserToDatabase({
                            id,
                            name,
                            email,
                            image,
                        });
                    } else {
                        console.error("User information is incomplete.");
                    }
                }
            } catch (error) {
                console.error("Error saving user to database in signIn event:", error);
            }
        },
    },
});
