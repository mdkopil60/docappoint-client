"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FiEdit3, FiX, FiMail, FiUser, FiCamera } from "react-icons/fi";

export default function MyProfile() {
    // ইউজারের কারেন্ট প্রোফাইল স্টেট (MongoDB User Collection থেকে আসবে)
    const [userProfile, setUserProfile] = useState({
        name: "Zayan Ahmed",
        email: "user@example.com",
        photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
    });

    const [editData, setEditData] = useState(null);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    // ১. ওপেন মডাল এবং বর্তমান ডাটা প্রী-ফিল করা
    const openProfileModal = () => {
        setEditData({ ...userProfile });
        setIsProfileModalOpen(true);
    };

    // ২. সেভ প্রোফাইল ডাটা
    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        try {
            // MongoDB API Call Example:
            // await fetch(`/api/users/update`, {
            //     method: 'PATCH',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ name: editData.name, photo: editData.photo })
            // });

            // UI সাথে সাথে আপডেট (No Refresh)
            setUserProfile(editData);
            setIsProfileModalOpen(false);
            toast.success("Profile updated successfully! ✨");
        } catch (error) {
            toast.error("Profile update failed!");
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="border-b border-slate-100 pb-4">
                <h3 className="text-2xl font-bold text-slate-800">My Profile</h3>
                <p className="text-slate-500 text-sm">View and manage your account details</p>
            </div>

            {/* Profile Info Card (হুবহু মকআপ ম্যাচিং ক্লিন লুক) */}
            <div className="bg-white border border-slate-100 rounded-[2rem] p-6 md:p-8 shadow-xl shadow-slate-100/50 flex flex-col sm:flex-row items-center gap-6">
                <img
                    src={userProfile.photo}
                    alt={userProfile.name}
                    className="w-24 h-24 rounded-full object-cover ring-4 ring-cyan-50 shadow-md"
                />
                <div className="flex-1 text-center sm:text-left space-y-1">
                    <h4 className="text-xl font-black text-slate-800 tracking-tight">{userProfile.name}</h4>
                    <p className="text-slate-500 text-xs font-semibold flex items-center justify-center sm:justify-start gap-1.5">
                        <FiMail className="text-cyan-600" /> {userProfile.email}
                    </p>
                    <span className="inline-block bg-teal-50 text-teal-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mt-2">
                        Verified Patient Account
                    </span>
                </div>
                <button
                    onClick={openProfileModal}
                    className="flex items-center gap-2 bg-[#00a3b1] hover:bg-[#008b98] text-white font-bold px-5 py-3 rounded-xl transition-all text-xs shadow-md uppercase tracking-wider active:scale-[0.98]"
                >
                    <FiEdit3 size={14} /> Update Profile
                </button>
            </div>

            {/* Profile Update Modal */}
            {isProfileModalOpen && editData && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-[2rem] max-w-md w-full p-6 md:p-8 shadow-2xl relative border border-slate-100">
                        <button
                            onClick={() => setIsProfileModalOpen(false)}
                            className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 bg-slate-50 rounded-full"
                        >
                            <FiX size={18} />
                        </button>

                        <h4 className="text-xl font-black text-slate-800 mb-1">Edit Profile Details</h4>
                        <p className="text-xs text-slate-500 mb-5">Keep your account credentials fresh.</p>

                        <form onSubmit={handleProfileSubmit} className="space-y-4">
                            <div>
                                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Full Name</label>
                                <div className="relative mt-1">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400"><FiUser size={16} /></span>
                                    <input
                                        type="text"
                                        value={editData.name}
                                        required
                                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                        className="w-full border border-slate-300 rounded-xl pl-11 pr-4 py-3 text-xs focus:border-cyan-600 focus:ring-2 focus:ring-cyan-500/10 outline-none transition-all text-slate-800 font-semibold"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Profile Photo (URL)</label>
                                <div className="relative mt-1">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400"><FiCamera size={16} /></span>
                                    <input
                                        type="url"
                                        value={editData.photo}
                                        required
                                        onChange={(e) => setEditData({ ...editData, photo: e.target.value })}
                                        className="w-full border border-slate-300 rounded-xl pl-11 pr-4 py-3 text-xs focus:border-cyan-600 focus:ring-2 focus:ring-cyan-500/10 outline-none transition-all text-slate-800 font-semibold"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Email Address (Read-Only)</label>
                                <input type="email" value={editData.email} disabled className="w-full bg-slate-50 text-slate-400 border border-slate-200 rounded-xl px-4 py-3 text-xs mt-1 cursor-not-allowed font-medium" />
                            </div>

                            <button type="submit" className="w-full bg-[#0d4753] hover:bg-[#08323b] text-white font-bold py-3.5 rounded-xl transition-all shadow-md mt-2 text-xs uppercase tracking-wider">
                                Update Now
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}