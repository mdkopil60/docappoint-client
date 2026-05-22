"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const from = searchParams.get("from") || "/";

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            toast.success("Signed in successfully! 🔑");
            router.push(from);
        } catch (error) {
            toast.error("Invalid email or password");
        }
    };

    return (
        <div className="min-h-screen bg-[#00839b] flex items-center justify-center p-4 antialiased font-sans">
            {/* সেন্ট্রাল হোয়াইট লগইন বক্স */}
            <div className="bg-white rounded-md shadow-xl max-w-lg w-full p-8 md:p-12 transition-all">

                {/* হেডিং */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-normal text-slate-600 tracking-tight">Login</h2>
                </div>

                {/* ফর্ম এলিমেন্ট */}
                <form onSubmit={handleLogin} className="space-y-6">

                    {/* ইমেইল ইনপুট ফিল্ড */}
                    <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-slate-700">
                            Email:
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter email"
                            className="w-full bg-white text-slate-800 border border-slate-200 rounded-sm px-4 py-3 text-sm focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600/20 outline-none transition-all placeholder:text-slate-300"
                        />
                    </div>

                    {/* পাসওয়ার্ড ইনপুট ফিল্ড */}
                    <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-slate-700">
                            Password:
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter password"
                            className="w-full bg-white text-slate-800 border border-slate-200 rounded-sm px-4 py-3 text-sm focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600/20 outline-none transition-all placeholder:text-slate-300"
                        />
                    </div>

                    {/* শো পাসওয়ার্ড চেক বক্স */}
                    <div className="flex items-center gap-2 pt-1">
                        <input
                            type="checkbox"
                            id="showPassword"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                            className="w-4 h-4 rounded-sm border-slate-300 text-[#00667a] focus:ring-[#00667a]/20 cursor-pointer"
                        />
                        <label htmlFor="showPassword" className="text-xs text-slate-500 font-medium select-none cursor-pointer">
                            Show Password
                        </label>
                    </div>

                    {/* সাইন ইন বাটন (মকআপের মতো ফ্ল্যাট স্টাইল) */}
                    <button
                        type="submit"
                        className="w-full bg-[#00667a] hover:bg-[#005464] text-white font-medium py-3 rounded-sm transition-all text-sm uppercase tracking-wider shadow-sm mt-4"
                    >
                        Sign In
                    </button>
                </form>

                {/* অতিরিক্ত লিংকসমূহ */}
                <div className="mt-8 text-center space-y-2 text-xs font-medium text-slate-500">
                    <div>
                        Forgot <span className="text-cyan-600 hover:underline cursor-pointer">Username / Password</span>?
                    </div>
                    <div>
                        Don't have an account?{" "}
                        <Link href="/register" className="text-cyan-600 font-semibold hover:underline">
                            Sign up
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}