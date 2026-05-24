"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import {
    FiUser,
    FiMail,
    FiCamera,
    FiLock,
    FiEye,
    FiEyeOff,
    FiCheckCircle,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
export default function RegisterPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        image: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Password Validation
            if (formData.password.length < 6) {
                toast.error("Password must be at least 6 characters");
                setLoading(false);
                return;
            }
            const { data, error } = await authClient.signUp.email({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                image: formData.image,
            });
            console.log(data);
            console.log(error);
            if (error) {
                toast.error(error.message || "Registration Failed");
                setLoading(false);
                return;
            }
            toast.success("Account Created Successfully");
            router.push("/");
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };
    const handleGoogleSign = async () => {
        await authClient.signIn.social({
            provider: "google"
        })
    }

    return (
        <div className="min-h-screen bg-[#00839b] flex items-center justify-center px-4 py-10 relative overflow-hidden">
            {/* Background Blur */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl"></div>

            <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl"></div>

            {/* Card */}
            <div className="relative z-10 bg-white w-full max-w-lg rounded-[30px] shadow-2xl p-8 md:p-10 border border-white/40">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-28 h-28 mx-auto rounded-3xl bg-gradient-to-br from-cyan-100 to-sky-100 flex items-center justify-center shadow-inner border border-cyan-100 text-5xl">
                        🏥
                    </div>

                    <h1 className="mt-5 text-4xl font-bold text-slate-800">
                        Create Account
                    </h1>

                    <p className="mt-2 text-slate-500 text-sm">
                        Join DocAppoint and manage appointments easily
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={onSubmit} className="space-y-5">
                    {/* Name */}
                    <div className="relative">
                        <FiUser
                            size={20}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Full Name"
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <FiMail
                            size={20}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email Address"
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                        />
                    </div>

                    {/* Image */}
                    <div className="relative">
                        <FiCamera
                            size={20}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="url"
                            name="image"
                            required
                            value={formData.image}
                            onChange={handleInputChange}
                            placeholder="Profile Photo URL"
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <FiLock
                            size={20}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Password"
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-20 text-sm outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500"
                        >
                            {showPassword ? (
                                <FiEyeOff size={20} />
                            ) : (
                                <FiEye size={20} />
                            )}
                        </button>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#00667a] hover:bg-[#005464] text-white rounded-2xl py-4 font-bold transition-all shadow-lg"
                    >
                        <div className="flex items-center justify-center gap-2 text-sm uppercase tracking-wide">
                            {loading ? "Creating..." : "Create Account"}

                            <FiCheckCircle size={18} />
                        </div>
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-7">
                    <div className="flex-1 h-px bg-slate-200"></div>

                    <span className="text-xs uppercase text-slate-400 font-semibold">
                        Or Continue With
                    </span>

                    <div className="flex-1 h-px bg-slate-200"></div>
                </div>

                {/* Social */}
                <div className="grid grid-cols-2 gap-4">
                    <button
                    onClick={handleGoogleSign}
                        type="button"
                        className="flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 py-3 rounded-2xl transition-all font-semibold text-sm"
                    >
                        <FcGoogle size={20} />
                        Google
                    </button>

                    <button
                        type="button"
                        onClick={() => toast.success("GitHub Signup")}
                        className="flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 py-3 rounded-2xl transition-all font-semibold text-sm"
                    >
                        <FaGithub size={20} />
                        GitHub
                    </button>
                </div>

                {/* Login */}
                <p className="text-center mt-7 text-sm text-slate-600">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-cyan-600 font-bold hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}