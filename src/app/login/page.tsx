"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginRegistrationPage() {
    const router = useRouter();
    const [loginEmail, setLoginEmail] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regName, setRegName] = useState("");
    const [error, setError] = useState("");

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: loginEmail }),
            });
            const data = await res.json();
            if (data.error) {
                setError(data.error);
            } else {
                // Navigate to dashboard with the logged-in user's ID
                router.push(`/dashboard?userId=${data.id}`);
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Login failed. Please try again.");
        }
    }

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: regEmail, name: regName }),
            });
            const data = await res.json();
            if (data.error) {
                setError(data.error);
            } else {
                // Optionally auto-login after registration:
                router.push(`/dashboard?userId=${data.id}`);
            }
        } catch (err) {
            console.error("Registration error:", err);
            setError("Registration failed. Please try again.");
        }
    }

    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8 space-y-6">
                <h1 className="text-3xl font-bold text-center">Welcome</h1>
                {error && <p className="text-red-500 text-center">{error}</p>}

                <form onSubmit={handleLogin} className="space-y-4">
                    <h2 className="text-xl font-medium">Login</h2>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>

                <div className="border-t pt-4">
                    <form onSubmit={handleRegister} className="space-y-4">
                        <h2 className="text-xl font-medium">Register</h2>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                            required
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        />
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={regName}
                            onChange={(e) => setRegName(e.target.value)}
                            required
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        />
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}