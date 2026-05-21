"use client";

import Link from "next/link";
import { Button } from "@heroui/react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-cyan-500 to-blue-600 min-h-[85vh] flex items-center">

      <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-2 gap-10 items-center">

        {/* Left */}
        <div className="space-y-6 text-white">

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Find Trusted Doctors & Book Appointments
          </h1>

          <p className="text-lg text-gray-100">
            Search experienced specialists, view schedules,
            and book appointments online instantly.
          </p>

          <div className="flex gap-4">

            <Link href="/all-appointments">
              <Button
                size="lg"
                className="bg-white text-cyan-600 font-semibold"
              >
                Get Started
              </Button>
            </Link>

            <Button
              size="lg"
              variant="bordered"
              className="border-white text-white"
            >
              Learn More
            </Button>

          </div>

        </div>

        {/* Right */}
        <div>

          <img
            src="https://i.ibb.co/4pDNDk1/doctor-banner.png"
            alt="doctor"
            className="w-full"
          />

        </div>

      </div>

    </section>
  );
};

export default Hero;