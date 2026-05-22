"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle as GoogleIcon } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FiUser, FiMail, FiCamera, FiLock, FiCheckCircle } from "react-icons/fi";

export default function RegisterPage() {
    const router = useRouter();
    const [passwordError, setPasswordError] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        photoUrl: "",
        password: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === "password") {
            setPasswordError("");
            // পাসওয়ার্ড স্ট্রেন্থ লাইভ চেক
            if (value.length >= 6 && /[A-Z]/.test(value) && /[a-z]/.test(value)) {
                setPasswordStrength("Strong");
            } else if (value.length > 0) {
                setPasswordStrength("Weak");
            } else {
                setPasswordStrength("");
            }
        }
    };

    const validatePassword = (password) => {
        if (password.length < 6) return "Minimum 6 characters required.";
        if (!/[A-Z]/.test(password)) return "Must include 1 uppercase letter.";
        if (!/[a-z]/.test(password)) return "Must include 1 lowercase letter.";
        return "";
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const errorMsg = validatePassword(formData.password);
        if (errorMsg) {
            setPasswordError(errorMsg);
            return;
        }

        try {
            toast.success("Profile created! Redirecting to login...");
            router.push("/login");
        } catch (error) {
            toast.error("Registration failed!");
        }
    };

    return (
        <div className="min-h-screen bg-[#eaf2f8] relative flex flex-col items-center justify-center p-4 overflow-hidden">
            {/* ওয়াটারমার্ক ব্যাকগ্রাউন্ড প্যাটার্ন */}
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none select-none bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:24px_24px]"></div>

            <div className="bg-white px-6 py-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 max-w-md w-full relative z-10 my-6">

                {/* টপ টিম ইলাস্ট্রেশন placeholder */}
                <div className="flex flex-col items-center mb-5">
                    <div className="w-44 h-24 bg-teal-50 rounded-2xl flex items-center justify-center text-4xl border border-teal-100 shadow-inner">
                        👥🏥
                    </div>
                    <h2 className="text-2xl font-extrabold text-slate-800 mt-4 text-center tracking-tight">Create your unique DocAppoint profile</h2>
                </div>

                <form onSubmit={handleRegister} className="space-y-3.5">
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400"><FiUser size={18} /></span>
                        <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="Full Name" className="w-full bg-white text-slate-800 border border-slate-300 rounded-xl pl-12 pr-4 py-3 text-sm focus:border-teal-600 focus:ring-2 focus:ring-teal-100 outline-none transition-all" />
                    </div>

                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400"><FiMail size={18} /></span>
                        <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="Email Address" className="w-full bg-white text-slate-800 border border-slate-300 rounded-xl pl-12 pr-4 py-3 text-sm focus:border-teal-600 focus:ring-2 focus:ring-teal-100 outline-none transition-all" />
                    </div>

                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400"><FiCamera size={18} /></span>
                        <input type="url" name="photoUrl" required value={formData.photoUrl} onChange={handleInputChange} placeholder="Profile Photo URL" className="w-full bg-white text-slate-800 border border-slate-300 rounded-xl pl-12 pr-4 py-3 text-sm focus:border-teal-600 focus:ring-2 focus:ring-teal-100 outline-none transition-all" />
                    </div>

                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400"><FiLock size={18} /></span>
                        <input type="password" name="password" required value={formData.password} onChange={handleInputChange} placeholder="Password" className="w-full bg-white text-slate-800 border border-slate-300 rounded-xl pl-12 pr-4 py-3 text-sm focus:border-teal-600 focus:ring-2 focus:ring-teal-100 outline-none transition-all" />
                        {passwordStrength && (
                            <span className={`absolute right-3 top-3.5 text-[11px] font-bold ${passwordStrength === "Strong" ? "text-emerald-600" : "text-amber-500"}`}>
                                {passwordStrength}
                            </span>
                        )}
                    </div>

                    {passwordError && (
                        <p className="text-red-500 text-xs font-semibold px-1">⚠️ {passwordError}</p>
                    )}

                    <div className="text-[11px] text-slate-500 text-center px-2">
                        By registering, you agree to our <span className="text-teal-600 font-semibold hover:underline cursor-pointer">Terms</span> and <span className="text-teal-600 font-semibold hover:underline cursor-pointer">Privacy Policy</span>
                    </div>

                    <button type="submit" className="w-full bg-[#00a3b1] hover:bg-[#008b98] text-white font-semibold py-3.5 rounded-xl transition-all shadow-md flex flex-col items-center justify-center">
                        <span className="text-sm font-bold flex items-center gap-1">Register <FiCheckCircle /></span>
                        <span className="text-[10px] font-normal opacity-90">Start your journey with DocAppoint</span>
                    </button>
                </form>

                <div className="relative flex py-3 items-center">
                    <div className="flex-grow border-t border-slate-200"></div>
                    <span className="flex-shrink mx-4 text-slate-400 text-xs font-semibold uppercase tracking-wider">Or register with</span>
                    <div className="flex-grow border-t border-slate-200"></div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => toast.success("Google Signup")} className="flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-700 py-2.5 rounded-xl transition-all font-semibold text-sm">
                        <GoogleIcon size={18} /> Google
                    </button>
                    <button onClick={() => toast.success("GitHub Signup")} className="flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-700 py-2.5 rounded-xl transition-all font-semibold text-sm">
                        <FaGithub size={18} /> GitHub
                    </button>
                </div>

                <p className="text-center text-sm text-slate-600 mt-5 font-medium">
                    Already have an account?{" "}
                    <Link href="/login" className="text-teal-600 font-bold hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}