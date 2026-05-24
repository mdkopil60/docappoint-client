"use client";

import Link from "next/link";
import { Avatar, Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [menuOpen, setMenuOpen] = useState(false);

    const handleSignOut = async () => {
        await authClient.signOut();
    };

    return (
        <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link href="/">
                    <h1 className="text-2xl md:text-3xl font-bold text-cyan-500">
                        DocAppoint
                    </h1>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 font-medium">
                    <Link
                        href="/"
                        className="hover:text-cyan-500 transition"
                    >
                        Home
                    </Link>

                    <Link
                        href="/all-appointments"
                        className="hover:text-cyan-500 transition"
                    >
                        All Appointment
                    </Link>

                    <Link
                        href="/dashboard"
                        className="hover:text-cyan-500 transition"
                    >
                        Dashboard
                    </Link>
                </div>

                {/* Desktop Auth */}
                <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <>
                            <Avatar>
                                <Avatar.Image
                                    referrerPolicy="no-referrer"
                                    alt={user?.name}
                                    src={user?.image}
                                />
                                <Avatar.Fallback>{user.name}</Avatar.Fallback>
                            </Avatar>

                            <Button
                                onClick={handleSignOut}
                                variant="bordered"
                                className="border-cyan-500 text-cyan-500"
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden"
                >
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white border-t px-5 py-5 space-y-5">

                    {/* Mobile Links */}
                    <div className="flex flex-col gap-4 font-medium">
                        <Link
                            href="/"
                            onClick={() => setMenuOpen(false)}
                            className="hover:text-cyan-500 transition"
                        >
                            Home
                        </Link>

                        <Link
                            href="/all-appointments"
                            onClick={() => setMenuOpen(false)}
                            className="hover:text-cyan-500 transition"
                        >
                            All Appointment
                        </Link>

                        <Link
                            href="/dashboard"
                            onClick={() => setMenuOpen(false)}
                            className="hover:text-cyan-500 transition"
                        >
                            Dashboard
                        </Link>
                    </div>

                    {/* Mobile Auth */}
                    {user ? (
                        <div className="flex items-center justify-between gap-3 pt-3 border-t">

                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <Avatar.Image
                                        referrerPolicy="no-referrer"
                                        alt={user?.name}
                                        src={user?.image}
                                    />
                                    <Avatar.Fallback>{user.name}</Avatar.Fallback>
                                </Avatar>

                                <div>
                                    <h2 className="font-semibold">
                                        {user?.name}
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        {user?.email}
                                    </p>
                                </div>
                            </div>

                            <Button
                                onClick={handleSignOut}
                                variant="bordered"
                                className="border-cyan-500 text-cyan-500"
                            >
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3 pt-3 border-t">

                            <Link href="/login">
                                <Button
                                    fullWidth
                                    variant="bordered"
                                    className="border-cyan-500 text-cyan-500"
                                >
                                    Login
                                </Button>
                            </Link>

                            <Link href="/register">
                                <Button
                                    fullWidth
                                    className="bg-cyan-500 text-white"
                                >
                                    Register
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;