"use client";
import { useState } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const res = await api.post("auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      router.push("/trade-position");
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl w-full max-w-sm space-y-4"
      >
        <h1 className="text-xl font-bold text-center">Sign In</h1>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-sky-700 text-white w-full py-2 rounded hover:bg-sky-800"
        >
          Sign In
        </button>

        <p className="text-center text-sm mt-2">
          Don't have an account?{" "}
          <a href="/sign-up" className="text-sky-700 font-bold">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}
