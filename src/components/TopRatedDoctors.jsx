"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { Star } from "lucide-react";

export default function TopRatedDoctors() {
    const { data: session } = authClient.useSession();

    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-appointments`);
                const data = await res.json();

                const top3 = data
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 3);

                setDoctors(top3);
            } catch (error) {
                toast.error("Failed to load doctors");
            }
        };

        fetchDoctors();
    }, []);

    return (
        <div className="max-w-6xl mx-auto py-14 px-4">
            <h2 className="text-4xl font-extrabold text-center mb-12">
                ⭐ Top Rated Doctors
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
                {doctors.map((doc) => (
                    <div
                        key={doc._id}
                        className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                    >
                        {/* Top Badge */}
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs px-3 py-1 rounded-full shadow">
                            Top Rated
                        </div>

                        {/* Image */}
                        <div className="overflow-hidden">
                            <img
                                src={doc.image}
                                alt={doc.name}
                                className="w-full h-52 object-cover group-hover:scale-110 transition duration-500"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-5 space-y-3">
                            <h3 className="text-2xl font-bold text-gray-800">
                                 {doc.name}
                            </h3>

                            <p className="text-gray-500">
                                {doc.specialty}
                            </p>

                            <p className="text-sm text-gray-600">
                                🏥 {doc.hospital}
                            </p>

                            {/* Rating */}
                            <div className="flex items-center gap-2">
                                <Star className="text-yellow-500 w-5 h-5" />
                                <span className="font-semibold text-yellow-600">
                                    {doc.rating || "4.5"}
                                </span>
                            </div>

                            <p className="text-sm font-medium text-gray-700">
                                💰 Fee:{" "}
                                <span className="text-cyan-600 font-bold">
                                    {doc.fee} BDT
                                </span>
                            </p>

                            {/* Button */}
                            <Link href={`/doctor/${doc._id}`}>
                                <button className="mt-3 w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold py-3 rounded-2xl transition duration-300 shadow-md">
                                    View Details
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}