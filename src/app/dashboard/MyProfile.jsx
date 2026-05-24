"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiEdit3, FiX, FiMail } from "react-icons/fi";

// 👉 যদি authClient ব্যবহার করো
import { authClient } from "@/lib/auth-client";

export default function MyProfile() {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [userProfile, setUserProfile] = useState(null);
    const [editData, setEditData] = useState(null);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    // ✅ FETCH LOGGED-IN USER ONLY
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

    // ✅ OPEN MODAL
    const openProfileModal = () => {
        setEditData({ ...userProfile });
        setIsProfileModalOpen(true);
    };

    // ✅ UPDATE PROFILE
    const handleProfileSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/user/update", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: editData.name,
                    image: editData.image,
                    email: userProfile.email,
                }),
            });

            const result = await res.json();

            if (result.success) {
                setUserProfile(editData); // instant UI update
                setIsProfileModalOpen(false);
                toast.success("Profile updated successfully! ✨");
            } else {
                toast.error("Update failed!");
            }
        } catch (error) {
            toast.error("Profile update failed!");
        }
    };

    // ✅ LOADING STATE (IMPORTANT)
    if (!userProfile) {
        return (
            <p className="text-center mt-10 text-gray-500">
                Loading profile...
            </p>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* HEADER */}
            <h3 className="text-2xl font-bold border-b pb-3">
                My Profile
            </h3>

            {/* PROFILE CARD */}
            <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-5">
                <img
                    src={userProfile?.image}
                    alt={userProfile?.name}
                    className="w-20 h-20 rounded-full object-cover"
                />

                <div className="flex-1">
                    <h4 className="text-xl font-bold">
                        {userProfile?.name}
                    </h4>

                    <p className="flex items-center gap-2 text-gray-500">
                        <FiMail /> {userProfile?.email}
                    </p>
                </div>

                <button
                    onClick={openProfileModal}
                    className="bg-teal-600 text-white px-4 py-2 rounded-lg"
                >
                    <FiEdit3 className="inline mr-1" />
                    Update
                </button>
            </div>

            {/* MODAL */}
            {isProfileModalOpen && editData && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-[400px] relative">

                        {/* CLOSE BUTTON */}
                        <button
                            onClick={() => setIsProfileModalOpen(false)}
                            className="absolute top-3 right-3"
                        >
                            <FiX />
                        </button>

                        <h2 className="text-lg font-bold mb-4">
                            Edit Profile
                        </h2>

                        <form
                            onSubmit={handleProfileSubmit}
                            className="space-y-3"
                        >
                            {/* NAME */}
                            <input
                                type="text"
                                value={editData.name}
                                onChange={(e) =>
                                    setEditData({
                                        ...editData,
                                        name: e.target.value,
                                    })
                                }
                                className="w-full border p-2 rounded"
                                placeholder="Name"
                            />

                            {/* IMAGE */}
                            <input
                                type="url"
                                value={editData.image}
                                onChange={(e) =>
                                    setEditData({
                                        ...editData,
                                        image: e.target.value,
                                    })
                                }
                                className="w-full border p-2 rounded"
                                placeholder="Image URL"
                            />

                            {/* EMAIL (READ ONLY) */}
                            <input
                                type="email"
                                value={editData.email}
                                disabled
                                className="w-full border p-2 rounded bg-gray-100"
                            />

                            {/* SUBMIT */}
                            <button
                                type="submit"
                                className="w-full bg-teal-600 text-white py-2 rounded"
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