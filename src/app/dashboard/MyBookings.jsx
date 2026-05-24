"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiEdit2, FiTrash2, FiX, FiCalendar, FiClock } from "react-icons/fi";

export default function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    useEffect(() => {
        const loadBookings = async () => {
            try {
                const res = await fetch("http://localhost:5000/bookings");
                const data = await res.json();
                setBookings(data);
            } catch (error) {
                toast.error("Failed to load bookings");
            }
        };

        loadBookings();
    }, []);

 
    const handleDelete = async (id) => {
        const proceed = window.confirm("Are you sure?");
        if (!proceed) return;

        try {
            setBookings(bookings.filter((b) => b._id !== id));
            toast.success("Deleted successfully");
        } catch (error) {
            toast.error("Delete failed");
        }
    };

    // OPEN UPDATE
    const openUpdateModal = (booking) => {
        setSelectedBooking(booking);
        setIsUpdateModalOpen(true);
    };

    // UPDATE
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        try {
            // await fetch(`http://localhost:5000/bookings/${selectedBooking._id}`, {
            //     method: "PUT",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify(selectedBooking),
            // });

            setBookings(
                bookings.map((b) =>
                    b._id === selectedBooking._id ? selectedBooking : b
                )
            );

            setIsUpdateModalOpen(false);
            toast.success("Updated successfully");
        } catch (error) {
            toast.error("Update failed");
        }
    };

    return (
        <div className="space-y-6">

            {/* HEADER */}
            <div>
                <h3 className="text-2xl font-bold">My Bookings</h3>
                <p className="text-gray-500">Manage appointments</p>
            </div>

            {/* CARDS */}
            <div className="grid md:grid-cols-2 gap-6">
                {bookings.map((booking) => (
                    <div key={booking._id} className="bg-white p-5 rounded-xl shadow">

                        <h4 className="font-bold">{booking.doctorName}</h4>

                        <p className="text-sm text-gray-500">
                            Patient: {booking.userEmail}
                        </p>

                        <div className="flex gap-3 mt-3 text-sm">
                            <span>
                                📅 {booking.appointmentDate}
                            </span>
                            <span>
                                ⏰ {booking.appointmentTime}
                            </span>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={() => openUpdateModal(booking)}
                                className="bg-blue-100 px-3 py-1 rounded"
                            >
                                Update
                            </button>

                            <button
                                onClick={() => handleDelete(booking._id)}
                                className="bg-red-100 px-3 py-1 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL */}
            {isUpdateModalOpen && selectedBooking && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl w-[400px]">

                        <button onClick={() => setIsUpdateModalOpen(false)}>
                            <FiX />
                        </button>

                        <form onSubmit={handleUpdateSubmit}>

                            <input
                                type="date"
                                value={selectedBooking.appointmentDate}
                                onChange={(e) =>
                                    setSelectedBooking({
                                        ...selectedBooking,
                                        appointmentDate: e.target.value,
                                    })
                                }
                                className="border w-full p-2 mt-2"
                            />

                            <input
                                type="time"
                                value={selectedBooking.appointmentTime}
                                onChange={(e) =>
                                    setSelectedBooking({
                                        ...selectedBooking,
                                        appointmentTime: e.target.value,
                                    })
                                }
                                className="border w-full p-2 mt-2"
                            />

                            <button className="bg-green-600 text-white w-full mt-3 p-2">
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}