"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FaGithub, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

export default function LoginClient() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const from = searchParams.get("from") || "/";

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            toast.success("Login Successful");
            router.push(from);
        } catch (error) {
            toast.error("Invalid Email or Password");
        }
    };

    const handleGoogleSign = async () => {
        await authClient.signIn.social({
            provider: "google",
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-700 via-sky-800 to-blue-900 px-4">

            {/* Login Card */}
            <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-8">

                {/* Heading */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white">
                        Welcome Back
                    </h1>
                    <p className="text-slate-200 mt-2 text-sm">
                        Login to your account
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-5">

                    {/* Email */}
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter email"
                        className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder:text-slate-200"
                    />

                    {/* Password */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter password"
                            className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder:text-slate-200"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-white"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-white text-cyan-800 font-bold py-3 rounded-xl"
                    >
                        SIGN IN
                    </button>
                </form>

                {/* Divider */}
                <div className="my-6 text-center text-slate-200">
                    OR CONTINUE WITH
                </div>

                {/* Social */}
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={handleGoogleSign}
                        className="flex items-center justify-center gap-2 bg-white py-3 rounded-xl"
                    >
                        <FcGoogle />
                        Google
                    </button>

                    <button
                        onClick={() => toast.success("GitHub Login")}
                        className="flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl"
                    >
                        <FaGithub />
                        GitHub
                    </button>
                </div>

                {/* Footer */}
                <p className="text-center text-slate-200 text-sm mt-8">
                    Don’t have an account?{" "}
                    <Link href="/register" className="text-cyan-300">
                        Sign Up
                    </Link>
                </p>

            </div>
        </div>
    );
}