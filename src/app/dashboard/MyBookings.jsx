"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FiEdit2, FiTrash2, FiX, FiCalendar, FiClock } from "react-icons/fi";

export default function MyBookings() {
    // টেস্ট করার জন্য ডামি বুকিং ডেটা (MongoDB থেকে লোড হবে)
    const [bookings, setBookings] = useState([
        { _id: "1", doctorName: "Dr. Asif Rahman", speciality: "Cardiologist", email: "user@example.com", date: "2026-06-15", time: "10:00 AM" },
        { _id: "2", doctorName: "Dr. Nusrat Jahan", speciality: "Dermatologist", email: "user@example.com", date: "2026-06-18", time: "04:30 PM" }
    ]);

    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    // ১. Delete Appointment Function
    const handleDelete = async (id) => {
        const proceed = window.confirm("Are you sure you want to delete this appointment?");
        if (!proceed) return;

        try {
            // MongoDB API Call Example:
            // await fetch(`/api/bookings/${id}`, { method: 'DELETE' });

            // UI থেকে ইনস্ট্যান্ট রিমুভ (No Refresh)
            setBookings(bookings.filter(b => b._id !== id));
            toast.success("Appointment deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete appointment");
        }
    };

    // ২. Open Update Modal with Pre-filled Data
    const openUpdateModal = (booking) => {
        setSelectedBooking({ ...booking });
        setIsUpdateModalOpen(true);
    };

    // ৩. Save Updated Appointment
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            // MongoDB API Call Example:
            // await fetch(`/api/bookings/${selectedBooking._id}`, {
            //     method: 'PUT',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ date: selectedBooking.date, time: selectedBooking.time })
            // });

            // UI সাথে সাথে আপডেট (No Refresh)
            setBookings(bookings.map(b => b._id === selectedBooking._id ? selectedBooking : b));

            setIsUpdateModalOpen(false);
            toast.success("Appointment updated successfully!");
        } catch (error) {
            toast.error("Something went wrong!");
        }
    };

    return (
        <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
                <h3 className="text-2xl font-bold text-slate-800">My Bookings</h3>
                <p className="text-slate-500 text-sm">Manage your upcoming doctor appointments</p>
            </div>

            {/* Appointment Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookings.map((booking) => (
                    <div key={booking._id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-100/50 flex flex-col justify-between transition-all hover:shadow-2xl hover:shadow-slate-200/50">
                        <div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="bg-cyan-50 text-cyan-600 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        {booking.speciality}
                                    </span>
                                    <h4 className="text-lg font-black text-slate-800 mt-2.5">{booking.doctorName}</h4>
                                </div>
                                <div className="text-2xl">🩺</div>
                            </div>
                            <p className="text-slate-400 text-xs mt-1 font-medium">Patient: {booking.email}</p>

                            <div className="mt-5 flex gap-4 bg-slate-50 p-3 rounded-2xl text-xs font-semibold text-slate-600 border border-slate-100">
                                <div className="flex items-center gap-1.5"><FiCalendar className="text-cyan-600" /> {booking.date}</div>
                                <div className="flex items-center gap-1.5"><FiClock className="text-cyan-600" /> {booking.time}</div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-6 border-t border-slate-50 pt-4">
                            <button
                                onClick={() => openUpdateModal(booking)}
                                className="flex-1 flex items-center justify-center gap-2 bg-[#eaf2f8] hover:bg-sky-100 text-cyan-700 font-bold py-3 rounded-xl transition-all text-xs"
                            >
                                <FiEdit2 size={14} /> Update
                            </button>
                            <button
                                onClick={() => handleDelete(booking._id)}
                                className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold py-3 rounded-xl transition-all text-xs"
                            >
                                <FiTrash2 size={14} /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Update Form Modal */}
            {isUpdateModalOpen && selectedBooking && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-[2rem] max-w-md w-full p-6 md:p-8 shadow-2xl relative border border-slate-100">
                        <button
                            onClick={() => setIsUpdateModalOpen(false)}
                            className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 bg-slate-50 rounded-full"
                        >
                            <FiX size={18} />
                        </button>

                        <h4 className="text-xl font-black text-slate-800 mb-1">Update Appointment</h4>
                        <p className="text-xs text-slate-500 mb-5">Modify your appointment date and timing.</p>

                        <form onSubmit={handleUpdateSubmit} className="space-y-4">
                            {/* Read Only Fields */}
                            <div>
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Doctor Name (Read-Only)</label>
                                <input type="text" value={selectedBooking.doctorName} disabled className="w-full bg-slate-50 text-slate-400 border border-slate-200 rounded-xl px-4 py-3 text-xs mt-1 cursor-not-allowed font-medium" />
                            </div>
                            <div>
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Your Email (Read-Only)</label>
                                <input type="email" value={selectedBooking.email} disabled className="w-full bg-slate-50 text-slate-400 border border-slate-200 rounded-xl px-4 py-3 text-xs mt-1 cursor-not-allowed font-medium" />
                            </div>

                            {/* Editable Fields */}
                            <div>
                                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Appointment Date</label>
                                <input
                                    type="date"
                                    value={selectedBooking.date}
                                    required
                                    onChange={(e) => setSelectedBooking({ ...selectedBooking, date: e.target.value })}
                                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-xs mt-1 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-500/10 outline-none transition-all text-slate-800 font-semibold"
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Preferred Time</label>
                                <input
                                    type="text"
                                    value={selectedBooking.time}
                                    required
                                    placeholder="e.g., 10:00 AM"
                                    onChange={(e) => setSelectedBooking({ ...selectedBooking, time: e.target.value })}
                                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-xs mt-1 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-500/10 outline-none transition-all text-slate-800 font-semibold"
                                />
                            </div>

                            <button type="submit" className="w-full bg-[#0d4753] hover:bg-[#08323b] text-white font-bold py-3.5 rounded-xl transition-all shadow-md mt-2 text-xs uppercase tracking-wider">
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}