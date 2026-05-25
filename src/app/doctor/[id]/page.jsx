

import { auth } from "@/lib/auth";
import { Button } from "@heroui/react";
import { headers } from "next/headers";
import Link from "next/link";

const DocAppointDetailsPage = async ({ params }) => {

    const { id } = await params;
    const token = await auth.api.getToken({
        headers: await headers()
    })
    console.log(token);

    // Fetch Doctor Data
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/all-appointments/${id}`, 
        {headers: {
            authorization: `Bearer ${token}`
        }},
        {
            cache: "no-store",
        }
    );

    // Error Handling
    if (!res.ok) {

        return (
            <div className="min-h-screen flex items-center justify-center">

                <h1 className="text-4xl font-bold text-red-500">
                    Doctor Not Found
                </h1>

            </div>
        );
    }

    const data = await res.json();

    return (

        <div className="max-w-6xl mx-auto px-4 py-12">

            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">

                <div className="grid grid-cols-1 md:grid-cols-2">

                    {/* Doctor Image */}
                    <div className="bg-gray-100">

                        <img
                            src={data?.image}
                            alt={data?.name}
                            className="w-full h-[500px] object-cover"
                        />

                    </div>

                    {/* Doctor Info */}
                    <div className="p-8 md:p-10 flex flex-col justify-center">

                        {/* Name */}
                        <h1 className="text-4xl font-extrabold text-gray-800 mb-3">
                            {data?.name}
                        </h1>

                        {/* Specialty */}
                        <div className="mb-6">

                            <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-semibold">
                                {data?.specialty}
                            </span>

                        </div>

                        {/* Doctor Details */}
                        <div className="space-y-4 text-[17px]">

                            <p className="text-gray-700">
                                <span className="font-bold text-black">
                                    Experience:
                                </span>{" "}
                                {data?.experience}
                            </p>

                            <p className="text-gray-700">
                                <span className="font-bold text-black">
                                    Hospital:
                                </span>{" "}
                                {data?.hospital}
                            </p>

                            <p className="text-gray-700">
                                <span className="font-bold text-black">
                                    Location:
                                </span>{" "}
                                {data?.location}
                            </p>

                            <p className="text-gray-700">
                                <span className="font-bold text-black">
                                    Consultation Fee:
                                </span>{" "}
                                <span className="text-green-600 font-bold text-xl">
                                    ৳ {data?.fee}
                                </span>
                            </p>

                        </div>

                        {/* Availability */}
                        <div className="mt-8">

                            <h3 className="text-2xl font-bold text-black">
                                Availability
                            </h3>

                            <div className="flex flex-wrap gap-3">

                                {
                                    Array.isArray(data?.availability) ? (

                                        data?.availability?.map((time, index) => (

                                            <span
                                                key={index}
                                                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-black px-4 py-2 rounded-full text-sm font-medium shadow"
                                            >
                                                {time}
                                            </span>

                                        ))

                                    ) : (

                                        <span
                                            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow"
                                        >
                                            {data?.availability}
                                        </span>

                                    )
                                }

                            </div>

                        </div>

                        {/* About Doctor */}
                        <div className="mt-8">

                            <h3 className="text-2xl font-bold text-gray-800 mb-3">
                                About Doctor
                            </h3>

                            <p className="text-gray-600 leading-7">
                                {data?.description}
                            </p>

                        </div>

                        {/* Button */}
                        <div className="mt-10">

                            <Link href={`/book-appointment/${data?._id}`}>

                                <Button
                                    className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-cyan-500 text-black font-bold px-8 py-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300"
                                >
                                    Book Appointment
                                </Button>

                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default DocAppointDetailsPage;