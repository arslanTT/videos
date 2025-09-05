"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      console.log(result.error);
    } else {
      router.push("/");
    }
  };
  return (
    <div className="w-full h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Register Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            min={4}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 transition-colors py-3 rounded-lg font-semibold"
          >
            LogIn
          </button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-6">
          Don&apos;t have an account??{" "}
          <a href="/register" className="underline hover:text-blue-400">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
