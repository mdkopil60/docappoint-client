"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiEdit3, FiX, FiMail } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

export default function MyProfile() {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [userProfile, setUserProfile] = useState(null);
    const [editData, setEditData] = useState(null);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            if (!user?.email) return;

            try {
                const res = await fetch(
                    `http://localhost:5000/user?email=${user.email}`
                );

                const data = await res.json();
                setUserProfile(data || null);
            } catch (error) {
                toast.error("Failed to load profile");
            }
        };

        fetchUser();
    }, [user]);

    const openProfileModal = () => {
        setEditData({ ...userProfile });
        setIsProfileModalOpen(true);
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/user/update", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: editData.name,
                    image: editData.image,
                    email: userProfile.email,
                }),
            });

            const result = await res.json();

            if (result.success) {
                setUserProfile(editData);
                setIsProfileModalOpen(false);
                toast.success("Profile updated successfully! ✨");
            } else {
                toast.error("Update failed!");
            }
        } catch (error) {
            toast.error("Profile update failed!");
        }
    };

    if (!userProfile) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

            {/* TITLE */}
            <h3 className="text-xl sm:text-2xl font-bold border-b pb-3 text-center sm:text-left">
                My Profile
            </h3>

            {/* PROFILE CARD */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6">

                <img
                    src={userProfile?.image}
                    alt={userProfile?.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border"
                />

                <div className="flex-1 text-center sm:text-left">
                    <h4 className="text-lg sm:text-xl font-bold">
                        {userProfile?.name}
                    </h4>

                    <p className="flex items-center justify-center sm:justify-start gap-2 text-gray-500 text-sm sm:text-base">
                        <FiMail /> {userProfile?.email}
                    </p>
                </div>

                <button
                    onClick={openProfileModal}
                    className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition flex items-center justify-center gap-2"
                >
                    <FiEdit3 />
                    Update
                </button>
            </div>

            {/* MODAL */}
            {isProfileModalOpen && editData && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">

                    <div className="bg-white w-full max-w-md p-5 sm:p-6 rounded-2xl relative shadow-xl">

                        {/* CLOSE */}
                        <button
                            onClick={() => setIsProfileModalOpen(false)}
                            className="absolute top-3 right-3 text-gray-600 hover:text-black"
                        >
                            <FiX size={20} />
                        </button>

                        <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">
                            Edit Profile
                        </h2>

                        <form onSubmit={handleProfileSubmit} className="space-y-3">

                            <input
                                type="text"
                                value={editData.name}
                                onChange={(e) =>
                                    setEditData({
                                        ...editData,
                                        name: e.target.value,
                                    })
                                }
                                className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="Name"
                            />

                            <input
                                type="url"
                                value={editData.image}
                                onChange={(e) =>
                                    setEditData({
                                        ...editData,
                                        image: e.target.value,
                                    })
                                }
                                className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="Image URL"
                            />

                            <input
                                type="email"
                                value={editData.email}
                                disabled
                                className="w-full border p-2 rounded-lg bg-gray-100 text-gray-500"
                            />

                            <button
                                type="submit"
                                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg transition"
                            >
                                Update Now
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}