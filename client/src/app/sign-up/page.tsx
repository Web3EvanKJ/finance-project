"use client";
import { useState } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e: any) => {
    e.preventDefault();
    try {
      await api.post("auth/signup", { email, password });
      router.push("/sign-in");
    } catch (err: any) {
      console.log(err);

      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Signup failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center p-4">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded-xl w-full max-w-sm space-y-4"
      >
        <h1 className="text-xl font-bold text-center">Sign Up</h1>

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
          Sign Up
        </button>

        <p className="text-center text-sm mt-2">
          Already have an account?{" "}
          <a href="/sign-in" className="text-sky-700 font-bold">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
}
