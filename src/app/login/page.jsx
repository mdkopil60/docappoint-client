"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FaGithub, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
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

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            toast.success("Login Successful ");
            router.push(from);
        } catch (error) {
            toast.error("Invalid Email or Password");
        }
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
                    <div>
                        <label className="block text-sm text-white mb-2 font-medium">
                            Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/20 text-white placeholder:text-slate-200 outline-none focus:ring-2 focus:ring-cyan-300 transition-all"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm text-white mb-2 font-medium">
                            Password
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/20 text-white placeholder:text-slate-200 outline-none focus:ring-2 focus:ring-cyan-300 transition-all"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
                            >
                                {showPassword ? (
                                    <FaEyeSlash size={18} />
                                ) : (
                                    <FaEye size={18} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Forgot Password */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 text-slate-200 cursor-pointer">
                            <input type="checkbox" className="accent-cyan-500" />
                            Remember me
                        </label>

                        <Link
                            href="#"
                            className="text-cyan-300 hover:underline"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-white text-cyan-800 font-bold py-3 rounded-xl hover:scale-[1.02] hover:bg-cyan-100 transition-all duration-300 shadow-lg"
                    >
                        SIGN IN
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-[1px] bg-white/20"></div>

                    <p className="text-slate-200 text-sm">
                        OR CONTINUE WITH
                    </p>

                    <div className="flex-1 h-[1px] bg-white/20"></div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-4">

                    <button
                        onClick={() => toast.success("Google Login")}
                        className="flex items-center justify-center gap-2 bg-white py-3 rounded-xl font-semibold hover:scale-105 transition-all"
                    >
                        <FcGoogle size={22} />
                        Google
                    </button>

                    <button
                        onClick={() => toast.success("GitHub Login")}
                        className="flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl font-semibold hover:scale-105 transition-all"
                    >
                        <FaGithub size={20} />
                        GitHub
                    </button>
                </div>

                {/* Footer */}
                <p className="text-center text-slate-200 text-sm mt-8">
                    Don’t have an account?{" "}
                    <Link
                        href="/register"
                        className="text-cyan-300 font-semibold hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}