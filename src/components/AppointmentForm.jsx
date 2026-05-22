"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const AppointmentForm = ({ doctor }) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;

        const bookingData = {
            userEmail: form.userEmail.value,
            doctorName: doctor?.name || "Kopil Uddin",
            patientName: form.patientName.value,
            gender: form.gender.value,
            phone: form.phone.value,
            appointmentDate: form.appointmentDate.value,
            appointmentTime: form.appointmentTime.value,
        };

        try {
            const res = await fetch("/api/appointments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookingData),
            });

            const data = await res.json();

            if (data?.success) {
                toast.success("Appointment booked successfully!");
                form.reset();
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            toast.error("Failed to book appointment");
        }

        setLoading(false);
    };

    return (
        <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center bg-slate-50/50 py-10 px-4">

            {/* Main Premium Card */}
            <div className="w-full max-w-2xl bg-white border border-slate-100 shadow-2xl shadow-slate-200/60 rounded-2xl p-6 md:p-10 transition-all">

                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent tracking-tight">
                        Book Appointment
                    </h2>
                    <p className="text-slate-400 text-sm mt-2">
                        Please fill out the form below to secure your slot.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Grid Wrapper */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* Doctor Name */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs md:text-sm font-semibold text-slate-700">Doctor Name</label>
                            <input
                                type="text"
                                value={doctor?.name || "Kopil Uddin"}
                                readOnly
                                className="w-full h-11 px-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 text-sm font-medium outline-none cursor-not-allowed"
                            />
                        </div>

                        {/* Patient Name */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs md:text-sm font-semibold text-slate-700">Patient Name</label>
                            <input
                                type="text"
                                name="patientName"
                                placeholder="Enter patient name"
                                required
                                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs md:text-sm font-semibold text-slate-700">Your Email</label>
                            <input
                                type="email"
                                name="userEmail"
                                placeholder="Enter your email"
                                required
                                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs md:text-sm font-semibold text-slate-700">Phone Number</label>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Enter phone number"
                                required
                                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        {/* Gender */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs md:text-sm font-semibold text-slate-700">Gender</label>
                            <select
                                name="gender"
                                required
                                defaultValue=""
                                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer"
                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Date */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs md:text-sm font-semibold text-slate-700">Appointment Date</label>
                            <input
                                type="date"
                                name="appointmentDate"
                                required
                                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer"
                            />
                        </div>

                        {/* Time */}
                        <div className="flex flex-col gap-1.5 md:col-span-2">
                            <label className="text-xs md:text-sm font-semibold text-slate-700">Preferred Time</label>
                            <input
                                type="time"
                                name="appointmentTime"
                                required
                                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer"
                            />
                        </div>

                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-black font-bold text-sm md:text-base rounded-xl shadow-lg shadow-blue-200/50 transition-all duration-200 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.99]"
                        >
                            {loading ? "Processing..." : "Confirm Appointment"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AppointmentForm;