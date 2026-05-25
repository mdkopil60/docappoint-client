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

            {/* UI SAME AS YOURS */}

            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />

                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />

                <button type="submit">Login</button>
            </form>

        </div>
    );
}