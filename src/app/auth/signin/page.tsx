// src/app/auth/signin/page.tsx
"use client";

import React from 'react';
import { signIn } from '@/auth';

const SignInPage: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-80">
                <h2 className="text-xl font-bold mb-4">Sign In</h2>
                <button
                    className="w-full bg-gray-800 text-white p-3 rounded mb-3"
                    onClick={() => signIn("github")}
                >
                    Sign in with GitHub
                </button>
                <button
                    className="w-full bg-blue-500 text-white p-3 rounded mb-3"
                    onClick={() => signIn("google")}
                >
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default SignInPage;
