"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { useState } from "react";

import { Menu, X } from "lucide-react";

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white border-b shadow-sm sticky top-0 z-50">

            <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link href="/">
                    <h1 className="text-3xl font-extrabold text-cyan-500 tracking-tight">
                        DocAppoint
                    </h1>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 font-semibold text-slate-700">

                    <Link
                        href="/"
                        className="hover:text-cyan-500 transition-all"
                    >
                        Home
                    </Link>

                    <Link
                        href="/all-appointments"
                        className="hover:text-cyan-500 transition-all"
                    >
                        All Appointment
                    </Link>

                    <Link
                        href="/dashboard"
                        className="hover:text-cyan-500 transition-all"
                    >
                        Dashboard
                    </Link>

                    <Link
                        href="/add-destination"
                        className="hover:text-cyan-500 transition-all"
                    >
                        Add Data
                    </Link>

                </div>

                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center gap-3">

                    <Link href="/login">
                        <Button
                            variant="bordered"
                            className="border-cyan-500 text-cyan-500 font-semibold"
                        >
                            Login
                        </Button>
                    </Link>

                    <Link href="/register">
                        <Button className="bg-cyan-500 text-white font-semibold">
                            Register
                        </Button>
                    </Link>

                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-slate-700"
                >
                    {
                        isOpen
                            ? <X size={28} />
                            : <Menu size={28} />
                    }
                </button>

            </div>

            {/* Mobile Menu */}
            {
                isOpen && (
                    <div className="md:hidden bg-white border-t shadow-lg px-5 py-5 space-y-5">

                        <Link
                            href="/"
                            className="block font-medium text-slate-700 hover:text-cyan-500"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>

                        <Link
                            href="/all-appointments"
                            className="block font-medium text-slate-700 hover:text-cyan-500"
                            onClick={() => setIsOpen(false)}
                        >
                            All Appointment
                        </Link>

                        <Link
                            href="/dashboard"
                            className="block font-medium text-slate-700 hover:text-cyan-500"
                            onClick={() => setIsOpen(false)}
                        >
                            Dashboard
                        </Link>

                        <Link
                            href="/add-destination"
                            className="block font-medium text-slate-700 hover:text-cyan-500"
                            onClick={() => setIsOpen(false)}
                        >
                            Add Data
                        </Link>

                        {/* Mobile Buttons */}
                        <div className="flex flex-col gap-3 pt-3">

                            <Link href="/login">
                                <Button
                                    variant="bordered"
                                    className="w-full border-cyan-500 text-cyan-500"
                                >
                                    Login
                                </Button>
                            </Link>

                            <Link href="/register">
                                <Button className="w-full bg-cyan-500 text-white">
                                    Register
                                </Button>
                            </Link>

                        </div>

                    </div>
                )
            }

        </nav>
    );
};

export default Navbar;