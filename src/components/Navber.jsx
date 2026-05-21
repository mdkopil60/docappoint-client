"use client";

import Link from "next/link";
import { Button } from "@heroui/react";

const Navbar = () => {
    return (
        <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link href="/">
                    <h1 className="text-3xl font-bold text-cyan-500">
                        DocAppoint
                    </h1>
                </Link>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-8 font-medium">

                    <Link href="/">Home</Link>

                    <Link href="/all-appointments">
                        All Appointment
                    </Link>

                    <Link href="/dashboard">
                        Dashboard
                    </Link>
                    <Link href="/add-destination">
                        Add Data
                    </Link>

                </div>

                {/* Auth Buttons */}
                <div className="flex items-center gap-3">

                    <Link href="/login">
                        <Button
                            variant="bordered"
                            className="border-cyan-500 text-cyan-500"
                        >
                            Login
                        </Button>
                    </Link>

                    <Link href="/register">
                        <Button className="bg-cyan-500 text-white">
                            Register
                        </Button>
                    </Link>

                </div>

            </div>
        </nav>
    );
};

export default Navbar;