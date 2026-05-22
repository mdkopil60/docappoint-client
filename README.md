// components/DocappointCard.jsx

import Link from "next/link";

const DocappointCard = ({ docAppoint }) => {

    const {
        _id,
        image,
        name,
        specialty,
        hospital,
        experience,
        fee,
        location,
        availability
    } = docAppoint;

    return (

        <div className="bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-1 transition duration-300 overflow-hidden flex flex-col h-full">

            {/* Doctor Image */}
            <div className="relative w-full h-72 overflow-hidden">

               <img src={image} alt="" />

                <div className="absolute top-4 right-4">

                    <span className="bg-cyan-500 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-md">
                        {specialty}
                    </span>

                </div>

            </div>

            {/* Card Content */}
            <div className="p-6 flex flex-col flex-grow">

                {/* Doctor Name */}
                <h2 className="text-2xl font-bold text-gray-800">
                    {name}
                </h2>

                {/* Hospital */}
                <p className="text-gray-600 mt-3">
                    🏥 {hospital}
                </p>

                {/* Location */}
                <p className="text-gray-600 mt-2">
                    📍 {location}
                </p>

                {/* Experience + Fee */}
                <div className="flex justify-between items-center mt-5 border-t border-b py-4">

                    <div>

                        <p className="text-sm text-gray-500">
                            Experience
                        </p>

                        <h4 className="font-semibold text-gray-700">
                            ⏳ {experience}
                        </h4>

                    </div>

                    <div className="text-right">

                        <p className="text-sm text-gray-500">
                            Appointment Fee
                        </p>

                        <h4 className="font-bold text-cyan-600">
                            ৳ {fee}
                        </h4>

                    </div>

                </div>

                {/* Availability */}
                <div className="mt-5">

                    <h3 className="font-semibold text-gray-700 mb-3">
                        Available Time
                    </h3>

                    <div className="flex flex-wrap gap-2">

                        {/* {
                            availability?.map((time, index) => (

                                <span
                                    key={index}
                                    className="bg-cyan-50 text-cyan-700 border border-cyan-100 px-3 py-2 rounded-full text-sm"
                                >
                                    🕒 {time}
                                </span>

                            ))
                        } */}

                    </div>

                </div>

                {/* Button */}
                <div className="mt-auto pt-8">

                    <Link href= {`/doctor/${_id}`}>

                        <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-4 rounded-2xl transition duration-300 shadow-md hover:shadow-xl">

                            View Details

                        </button>

                    </Link>

                </div>

            </div>

        </div>

    );
};

export default DocappointCard;

// app/doctor/[id]/page.jsx

import { Button } from "@heroui/react";
import Link from "next/link";

const DocAppointDetailsPage = async ({ params }) => {

    const { id } = await params;

    // Fetch Doctor Data
    const res = await fetch(
        `http://localhost:5000/all-appointments/${id}`,
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

                            <Link href={`/book-appointment ${data?._id}`}>

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

import AppointmentForm from "@/components/forms/AppointmentForm";

const BookAppointmentPage = async ({ params }) => {

    const { id } = await params;

    const res = await fetch(
        `http://localhost:5000/all-appointments/${id}`,
        {
            cache: "no-store",
        }
    );

    const doctor = await res.json();

    return (

        <div className="min-h-screen bg-gray-100 py-16 px-4">

            <AppointmentForm doctor={doctor} />

        </div>
    );
};

export default BookAppointmentPage;

import DocappointCard from "@/components/DocappointCard";

const AllAppointmentsPage = async () => {

    const res = await fetch(
        "http://localhost:5000/all-appointments",
        {
            cache: "no-store",
        }
    );
    const docAppoint = await res.json();

    return (
        <div className="bg-gray-50 min-h-screen py-20">
            <div className="max-w-7xl mx-auto px-5">
                {/* Heading */}
                <div className="text-center mb-14">
                    <h1 className="text-5xl font-bold text-gray-800">
                        All Appointments
                    </h1>
                    <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                        Find experienced and trusted doctors for your healthcare needs.
                        Book appointments quickly and easily.
                    </p>

                </div>
                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
                        docAppoint.map((doc) => (

                            <DocappointCard
                                key={doc._id}
                                docAppoint={doc}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default AllAppointmentsPage;"use client";
import {
    FieldError,
    Input,
    Label,
    TextField,
    TextArea,
    Button,
} from "@heroui/react";

const AddDoctorPage = () => {
    const OnSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const destination = Object.fromEntries(formData.entries());

        console.log(destination);

        const res = await fetch('http://localhost:5000/destination', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(destination),
        });

        const data = await res.json();

        console.log(data);
    };
    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Add Doctor</h1>

            <form onSubmit={OnSubmit} className="p-10 space-y-8 bg-white rounded-3xl shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Doctor ID */}
                    <TextField name="id" isRequired>
                        <Label>Doctor ID</Label>

                        <Input
                            placeholder="d1"
                            className="rounded-2xl"
                        />

                        <FieldError />
                    </TextField>

                    {/* Doctor Name */}
                    <TextField name="name" isRequired>
                        <Label>Doctor Name</Label>

                        <Input
                            placeholder="Dr. Ayesha Rahman"
                            className="rounded-2xl"
                        />

                        <FieldError />
                    </TextField>

                    {/* Specialty */}
                    <TextField name="specialty" isRequired>
                        <Label>Specialty</Label>

                        <Input
                            placeholder="Cardiologist"
                            className="rounded-2xl"
                        />

                        <FieldError />
                    </TextField>

                    {/* Experience */}
                    <TextField name="experience" isRequired>
                        <Label>Experience</Label>

                        <Input
                            placeholder="10 years"
                            className="rounded-2xl"
                        />

                        <FieldError />
                    </TextField>

                    {/* Hospital */}
                    <TextField name="hospital" isRequired>
                        <Label>Hospital</Label>

                        <Input
                            placeholder="Labaid Cardiac Hospital"
                            className="rounded-2xl"
                        />

                        <FieldError />
                    </TextField>

                    {/* Location */}
                    <TextField name="location" isRequired>
                        <Label>Location</Label>

                        <Input
                            placeholder="Dhanmondi, Dhaka"
                            className="rounded-2xl"
                        />

                        <FieldError />
                    </TextField>

                    {/* Fee */}
                    <TextField name="fee" type="number" isRequired>
                        <Label>Consultation Fee</Label>

                        <Input
                            type="number"
                            placeholder="800"
                            className="rounded-2xl"
                        />

                        <FieldError />
                    </TextField>

                    {/* Availability */}
                    <TextField name="availability" isRequired>
                        <Label>Availability</Label>

                        <Input
                            placeholder="09:00 AM - 12:00 PM"
                            className="rounded-2xl"
                        />

                        <FieldError />
                    </TextField>

                    {/* Image URL */}
                    <div className="md:col-span-2">
                        <TextField name="image" isRequired>
                            <Label>Doctor Image URL</Label>

                            <Input
                                type="url"
                                placeholder="https://i.ibb.co/doctor-demo.jpg"
                                className="rounded-2xl"
                            />

                            <FieldError />
                        </TextField>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <TextField name="description" isRequired>
                            <Label>Description</Label>

                            <TextArea
                                placeholder="Write doctor details..."
                                className="rounded-3xl"
                            />

                            <FieldError />
                        </TextField>
                    </div>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="rounded-none w-full bg-cyan-500 text-white"
                >
                    Add Doctor
                </Button>
            </form>
        </div>
    );
};

export default AddDoctorPage;

"use client";

import { Button } from "@heroui/react";
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
            doctorName: doctor?.name,
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

        <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-2xl">

            <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
                Book Appointment
            </h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >

                {/* Doctor Name */}
                <div>

                    <label className="block mb-2 font-semibold">
                        Doctor Name
                    </label>

                    <input
                        type="text"
                        value={doctor?.name}
                        readOnly
                        className="w-full border p-4 rounded-xl bg-gray-100"
                    />

                </div>

                {/* Email */}
                <div>

                    <label className="block mb-2 font-semibold">
                        Your Email
                    </label>

                    <input
                        type="email"
                        name="userEmail"
                        required
                        placeholder="Enter your email"
                        className="w-full border p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                {/* Patient Name */}
                <div>

                    <label className="block mb-2 font-semibold">
                        Patient Name
                    </label>

                    <input
                        type="text"
                        name="patientName"
                        required
                        placeholder="Enter patient name"
                        className="w-full border p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                {/* Gender */}
                <div>

                    <label className="block mb-2 font-semibold">
                        Gender
                    </label>

                    <select
                        name="gender"
                        required
                        className="w-full border p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">
                            Select Gender
                        </option>

                        <option value="Male">
                            Male
                        </option>

                        <option value="Female">
                            Female
                        </option>

                    </select>

                </div>

                {/* Phone */}
                <div>

                    <label className="block mb-2 font-semibold">
                        Phone Number
                    </label>

                    <input
                        type="text"
                        name="phone"
                        required
                        placeholder="Enter phone number"
                        className="w-full border p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                {/* Appointment Date */}
                <div>

                    <label className="block mb-2 font-semibold">
                        Appointment Date
                    </label>

                    <input
                        type="date"
                        name="appointmentDate"
                        required
                        className="w-full border p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                {/* Time */}
                <div>

                    <label className="block mb-2 font-semibold">
                        Appointment Time
                    </label>

                    <input
                        type="text"
                        name="appointmentTime"
                        required
                        placeholder="10:30 AM"
                        className="w-full border p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                {/* Submit */}
                <Button
                    type="submit"
                    isLoading={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-7 rounded-2xl text-lg font-bold"
                >
                    Confirm Appointment
                </Button>

            </form>

        </div>
    );
};

export default AppointmentForm;