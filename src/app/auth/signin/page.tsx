import { signIn } from "@/auth"

export function SignInPage() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-80">
                <h2 className="text-xl font-bold mb-4">Sign In</h2>
                <form
                    action={async () => {
                        "use server"
                        await signIn("github")
                    }}
                >
                    <button
                        className="w-full bg-gray-800 text-white p-3 rounded mb-3"
                    >
                        Sign in with GitHub
                    </button>
                </form>
                <form
                    action={async () => {
                        "use server"
                        await signIn("google")
                    }}
                >
                    <button
                        className="w-full bg-blue-500 text-white p-3 rounded mb-3"
                    >
                        Sign in with google
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignInPage;
