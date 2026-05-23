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
            toast.success("Login Successful 🔥");
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

export default function RegisterPage() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);

    const [passwordError, setPasswordError] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        photoUrl: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === "password") {
            setPasswordError("");

            if (
                value.length >= 6 &&
                /[A-Z]/.test(value) &&
                /[a-z]/.test(value)
            ) {
                setPasswordStrength("Strong");
            } else if (value.length > 0) {
                setPasswordStrength("Weak");
            } else {
                setPasswordStrength("");
            }
        }
    };

    const validatePassword = (password) => {
        if (password.length < 6) {
            return "Minimum 6 characters required";
        }

        if (!/[A-Z]/.test(password)) {
            return "Must include one uppercase letter";
        }

        if (!/[a-z]/.test(password)) {
            return "Must include one lowercase letter";
        }

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
            toast.success("Account Created Successfully 🎉");
            router.push("/login");
        } catch (error) {
            toast.error("Registration Failed");
        }
    };

    return (
        <div className="min-h-screen bg-[#00839b] flex items-center justify-center px-4 py-10 relative overflow-hidden">

            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl"></div>

            <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl"></div>

            {/* Main Card */}
            <div className="relative z-10 bg-white w-full max-w-lg rounded-[30px] shadow-2xl p-8 md:p-10 border border-white/40">

                {/* Header */}
                <div className="text-center mb-8">

                    {/* Icon */}
                    <div className="w-28 h-28 mx-auto rounded-3xl bg-gradient-to-br from-cyan-100 to-sky-100 flex items-center justify-center shadow-inner border border-cyan-100 text-5xl">
                        🏥
                    </div>

                    <h1 className="mt-5 text-4xl font-bold text-slate-800 leading-tight">
                        Create Account
                    </h1>

                    <p className="mt-2 text-slate-500 text-sm">
                        Join DocAppoint and manage appointments easily
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleRegister} className="space-y-5">

                    {/* Full Name */}
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
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm text-slate-800 outline-none focus:bg-white focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all"
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
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm text-slate-800 outline-none focus:bg-white focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all"
                        />
                    </div>

                    {/* Photo URL */}
                    <div className="relative">
                        <FiCamera
                            size={20}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="url"
                            name="photoUrl"
                            required
                            value={formData.photoUrl}
                            onChange={handleInputChange}
                            placeholder="Profile Photo URL"
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm text-slate-800 outline-none focus:bg-white focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all"
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
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-24 text-sm text-slate-800 outline-none focus:bg-white focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all"
                        />

                        {/* Show Password */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-14 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-600 transition-all"
                        >
                            {showPassword ? (
                                <FiEyeOff size={18} />
                            ) : (
                                <FiEye size={18} />
                            )}
                        </button>

                        {/* Strength */}
                        {passwordStrength && (
                            <span
                                className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold ${passwordStrength === "Strong"
                                    ? "text-emerald-600"
                                    : "text-orange-500"
                                    }`}
                            >
                                {passwordStrength}
                            </span>
                        )}
                    </div>

                    {/* Error */}
                    {passwordError && (
                        <p className="text-red-500 text-sm font-medium px-1">
                            ⚠️ {passwordError}
                        </p>
                    )}

                    {/* Terms */}
                    <p className="text-xs text-center text-slate-500 leading-relaxed">
                        By continuing you agree to our{" "}
                        <span className="text-cyan-600 font-semibold hover:underline cursor-pointer">
                            Terms
                        </span>{" "}
                        and{" "}
                        <span className="text-cyan-600 font-semibold hover:underline cursor-pointer">
                            Privacy Policy
                        </span>
                    </p>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#00667a] hover:bg-[#005464] text-white rounded-2xl py-4 font-bold transition-all shadow-lg hover:shadow-cyan-200/50 active:scale-[0.98]"
                    >
                        <div className="flex items-center justify-center gap-2 text-sm uppercase tracking-wide">
                            Create Account
                            <FiCheckCircle size={18} />
                        </div>

                        <p className="text-[11px] mt-1 font-normal opacity-90">
                            Start your healthcare journey
                        </p>
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-7">
                    <div className="flex-1 h-px bg-slate-200"></div>

                    <span className="text-xs uppercase text-slate-400 font-semibold tracking-wider">
                        Or Continue With
                    </span>

                    <div className="flex-1 h-px bg-slate-200"></div>
                </div>

                {/* Social Buttons */}
                <div className="grid grid-cols-2 gap-4">

                    <button
                        type="button"
                        onClick={() => toast.success("Google Signup")}
                        className="flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 hover:border-cyan-300 text-slate-700 py-3 rounded-2xl transition-all font-semibold text-sm"
                    >
                        <FcGoogle size={20} />
                        Google
                    </button>

                    <button
                        type="button"
                        onClick={() => toast.success("GitHub Signup")}
                        className="flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 hover:border-slate-400 text-slate-700 py-3 rounded-2xl transition-all font-semibold text-sm"
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

// app/doctor/[id]/page.jsx

import { Button } from "@heroui/react";
import Link from "next/link";

const DocAppointDetailsPage = async ({ params }) => {

    const { id } = await params;

    // Fetch Doctor Data
    const res = await fetch(
        `http://localhost:5000/all-appointments/${id}`,
        {
            cache: "no-store",
        }
    );

    // Error Handling
    if (!res.ok) {

        return (
            <div className="min-h-screen flex items-center justify-center">

                <h1 className="text-4xl font-bold text-red-500">
                    Doctor Not Found
                </h1>

            </div>
        );
    }

    const data = await res.json();

    return (

        <div className="max-w-6xl mx-auto px-4 py-12">

            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">

                <div className="grid grid-cols-1 md:grid-cols-2">

                    {/* Doctor Image */}
                    <div className="bg-gray-100">

                        <img
                            src={data?.image}
                            alt={data?.name}
                            className="w-full h-[500px] object-cover"
                        />

                    </div>

                    {/* Doctor Info */}
                    <div className="p-8 md:p-10 flex flex-col justify-center">

                        {/* Name */}
                        <h1 className="text-4xl font-extrabold text-gray-800 mb-3">
                            {data?.name}
                        </h1>

                        {/* Specialty */}
                        <div className="mb-6">

                            <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-semibold">
                                {data?.specialty}
                            </span>

                        </div>

                        {/* Doctor Details */}
                        <div className="space-y-4 text-[17px]">

                            <p className="text-gray-700">
                                <span className="font-bold text-black">
                                    Experience:
                                </span>{" "}
                                {data?.experience}
                            </p>

                            <p className="text-gray-700">
                                <span className="font-bold text-black">
                                    Hospital:
                                </span>{" "}
                                {data?.hospital}
                            </p>

                            <p className="text-gray-700">
                                <span className="font-bold text-black">
                                    Location:
                                </span>{" "}
                                {data?.location}
                            </p>

                            <p className="text-gray-700">
                                <span className="font-bold text-black">
                                    Consultation Fee:
                                </span>{" "}
                                <span className="text-green-600 font-bold text-xl">
                                    ৳ {data?.fee}
                                </span>
                            </p>

                        </div>

                        {/* Availability */}
                        <div className="mt-8">

                            <h3 className="text-2xl font-bold text-black">
                                Availability
                            </h3>

                            <div className="flex flex-wrap gap-3">

                                {
                                    Array.isArray(data?.availability) ? (

                                        data?.availability?.map((time, index) => (

                                            <span
                                                key={index}
                                                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-black px-4 py-2 rounded-full text-sm font-medium shadow"
                                            >
                                                {time}
                                            </span>

                                        ))

                                    ) : (

                                        <span
                                            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow"
                                        >
                                            {data?.availability}
                                        </span>

                                    )
                                }

                            </div>

                        </div>

                        {/* About Doctor */}
                        <div className="mt-8">

                            <h3 className="text-2xl font-bold text-gray-800 mb-3">
                                About Doctor
                            </h3>

                            <p className="text-gray-600 leading-7">
                                {data?.description}
                            </p>

                        </div>

                        {/* Button */}
                        <div className="mt-10">

                            <Link href={`/book-appointment/${data?._id}`}>

                                <Button
                                    className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-cyan-500 text-black font-bold px-8 py-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300"
                                >
                                    Book Appointment
                                </Button>

                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default DocAppointDetailsPage;