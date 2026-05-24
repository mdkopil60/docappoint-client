"use client";

import { useState } from "react";
import { FiCalendar, FiUser, FiLogOut, FiActivity } from "react-icons/fi";
import MyBookings from "./MyBookings";
import MyProfile from "./MyProfile";

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState("profile"); 
    const user = {
        name: "Zayan Ahmed",
        email: "user@example.com",
        photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
    };

    return (
        <div className="min-h-screen bg-[#eaf2f8] relative flex flex-col items-center p-4 sm:p-6 md:p-10 antialiased font-sans">
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none select-none bg-[radial-gradient(#0d4753_1px,transparent_1px)] [background-size:20px_20px]"></div>
            <div className="w-full max-w-4xl bg-white/90 backdrop-blur-md rounded-[2.5rem] shadow-2xl shadow-sky-900/10 border border-white p-6 md:p-10 flex flex-col gap-6 relative z-10">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2.5">
                        <div className="bg-[#00a3b1] text-white p-2 rounded-xl text-lg">
                            <FiActivity />
                        </div>
                        <div>
                            <h2 className="text-lg font-black text-slate-800 tracking-tight">DocAppoint</h2>
                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Patient Dashboard</p>
                        </div>
                    </div>

                    <button
                        onClick={() => alert("Logging out...")}
                        className="flex items-center gap-1.5 text-xs font-bold text-red-500 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-xl transition-all"
                    >
                        <FiLogOut size={14} /> Log Out
                    </button>
                </div>

                <div className="flex justify-center sm:justify-start gap-4 mt-2">
                    {/* Profile Tab Button */}
                    <button
                        onClick={() => setActiveTab("profile")}
                        className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm tracking-wide transition-all border shadow-sm ${activeTab === "profile"
                                ? "bg-[#0d4753] text-white border-[#0d4753] scale-[1.02] shadow-md shadow-slate-900/10"
                                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                            }`}
                    >
                        <FiUser size={16} />
                        <span>Profile</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("bookings")}
                        className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm tracking-wide transition-all border shadow-sm ${activeTab === "bookings"
                                ? "bg-[#0d4753] text-white border-[#0d4753] scale-[1.02] shadow-md shadow-slate-900/10"
                                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                            }`}
                    >
                        <FiCalendar size={16} />
                        <span>Booking</span>
                    </button>
                </div>

                <div className="w-full bg-[#f8fafc] border border-slate-200/60 rounded-[2rem] p-4 sm:p-6 md:p-8 min-h-[400px] shadow-inner transition-all duration-300">
                    {activeTab === "profile" ? (
                        <div className="animate-fadeIn">
                            <MyProfile />
                        </div>
                    ) : (
                        <div className="animate-fadeIn">
                            <MyBookings />
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}