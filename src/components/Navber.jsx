"use client";

import Link from "next/link";
import { Avatar, Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
    const {
        data: session,
    } = authClient.useSession()
    const user = session?.user
    console.log(user);

    const handleSingOut = async () => {
        await authClient.signOut()
    }

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
                    {/* <Link href="/add-destination">
                        Add Data
                    </Link> */}

                </div>

                {/* Auth Buttons */}
                {user ?
                    <>
                        <div>  <Avatar>
                            <Avatar.Image referrerPolicy="no-referrer" alt="John Doe" src={user?.image} />
                            <Avatar.Fallback>{user.name}</Avatar.Fallback>
                        </Avatar></div>
                        <div>
                            <Button
                                onClick={handleSingOut}
                                variant="bordered"
                                className="border-cyan-500 text-cyan-500"
                            >
                                Logout
                            </Button>
                        </div>
                    </> :
                    <>
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
                    </>}

            </div>
        </nav>
    );
};

export default Navbar;