"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiX } from "react-icons/fi";

export default function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [editData, setEditData] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const load = async () => {
            const res = await fetch("http://localhost:5000/bookings");
            const data = await res.json();
            setBookings(data);
        };
        load();
    }, []);

    const handleDelete = async (id) => {
        const ok = confirm("Are you sure?");
        if (!ok) return;

        const res = await fetch(`http://localhost:5000/booking/${id}`, {
            method: "DELETE",
        });

        const data = await res.json();

        if (data.success) {
            setBookings(bookings.filter((b) => b._id !== id));
            toast.success("Appointment deleted successfully!");
        }
    };

    const openEdit = (booking) => {
        setEditData({ ...booking });
        setIsOpen(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const res = await fetch(
            `http://localhost:5000/booking/${editData._id}`,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    patientName: editData.patientName,
                    phone: editData.phone,
                    gender: editData.gender,
                    appointmentDate: editData.appointmentDate,
                    appointmentTime: editData.appointmentTime,
                }),
            }
        );

        const data = await res.json();

        if (data.success) {
            setBookings(
                bookings.map((b) =>
                    b._id === editData._id ? editData : b
                )
            );

            setIsOpen(false);
            toast.success("Appointment updated successfully!");
        }
    };

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

            {/* HEADER */}
            <div>
                <h2 className="text-3xl font-bold text-gray-800">
                    My Bookings
                </h2>
                <p className="text-gray-500">
                    Manage your appointments easily
                </p>
            </div>

            {/* CARDS */}
            <div className="grid md:grid-cols-2 gap-6">

                {bookings.map((b) => (
                    <div
                        key={b._id}
                        className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
                    >

                        {/* DOCTOR */}
                        <h3 className="text-xl font-bold text-gray-800">
                            {b.doctorName}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            {b.userEmail}
                        </p>

                        {/* INFO BADGES */}
                        <div className="flex flex-wrap gap-2 mt-4">

                            <span className="px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-600">
                                👤 {b.patientName}
                            </span>

                            <span className="px-3 py-1 text-xs rounded-full bg-green-50 text-green-600">
                                🧑‍⚕️ {b.gender}
                            </span>

                            <span className="px-3 py-1 text-xs rounded-full bg-purple-50 text-purple-600">
                                📅 {b.appointmentDate}
                            </span>

                            <span className="px-3 py-1 text-xs rounded-full bg-orange-50 text-orange-600">
                                ⏰ {b.appointmentTime}
                            </span>

                        </div>

                        {/* ACTIONS */}
                        <div className="flex gap-3 mt-5">

                            <button
                                onClick={() => openEdit(b)}
                                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl text-sm font-medium transition"
                            >
                                Update
                            </button>

                            <button
                                onClick={() => handleDelete(b._id)}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl text-sm font-medium transition"
                            >
                                Delete
                            </button>

                        </div>
                    </div>
                ))}

            </div>

            {/* MODAL */}
            {isOpen && editData && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">

                    <div className="bg-white w-full max-w-md p-6 rounded-2xl relative shadow-2xl animate-fadeIn">

                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute right-4 top-4 text-gray-500 hover:text-red-500"
                        >
                            <FiX size={20} />
                        </button>

                        <h3 className="text-xl font-bold mb-4 text-gray-800">
                            Edit Appointment
                        </h3>

                        <form onSubmit={handleUpdate} className="space-y-3">

                            {/* READ ONLY */}
                            <input
                                value={editData.doctorName}
                                disabled
                                className="w-full p-3 border rounded-lg bg-gray-100 text-gray-500"
                            />

                            <input
                                value={editData.userEmail}
                                disabled
                                className="w-full p-3 border rounded-lg bg-gray-100 text-gray-500"
                            />

                            {/* EDITABLE */}
                            <input
                                placeholder="Patient Name"
                                value={editData.patientName}
                                onChange={(e) =>
                                    setEditData({
                                        ...editData,
                                        patientName: e.target.value,
                                    })
                                }
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            />

                            <input
                                placeholder="Phone"
                                value={editData.phone}
                                onChange={(e) =>
                                    setEditData({
                                        ...editData,
                                        phone: e.target.value,
                                    })
                                }
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            />

                            <select
                                value={editData.gender}
                                onChange={(e) =>
                                    setEditData({
                                        ...editData,
                                        gender: e.target.value,
                                    })
                                }
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            >
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>

                            <input
                                type="date"
                                value={editData.appointmentDate}
                                onChange={(e) =>
                                    setEditData({
                                        ...editData,
                                        appointmentDate: e.target.value,
                                    })
                                }
                                className="w-full p-3 border rounded-lg"
                            />

                            <input
                                type="time"
                                value={editData.appointmentTime}
                                onChange={(e) =>
                                    setEditData({
                                        ...editData,
                                        appointmentTime: e.target.value,
                                    })
                                }
                                className="w-full p-3 border rounded-lg"
                            />

                            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition">
                                Save Changes
                            </button>

                        </form>

                    </div>
                </div>
            )}
        </div>
    );
}