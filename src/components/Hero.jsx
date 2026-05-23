"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import {
  ArrowRight,
  ShieldCheck,
  Users,
  Star,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  EffectFade,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    title: "Your Health, Our Priority",
    subtitle:
      "Book appointments with top-rated doctors in minutes.",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1400&auto=format&fit=crop",
  },

  {
    title: "Expert Doctors, One Click Away",
    subtitle:
      "Access specialists across cardiology, neurology and more.",
    image:
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=1400&auto=format&fit=crop",
  },

  {
    title: "Care That Comes to You",
    subtitle:
      "Flexible scheduling and verified doctors.",
    image:
      "https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?q=80&w=1400&auto=format&fit=crop",
  },
];

const stats = [
  {
    icon: Users,
    value: "12,000+",
    label: "Happy Patients",
  },

  {
    icon: ShieldCheck,
    value: "98%",
    label: "Satisfaction Rate",
  },

  {
    icon: Star,
    value: "4.9",
    label: "Average Rating",
  },
];

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">

      {/* Background Slider */}
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop
        className="absolute inset-0 h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-screen bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="w-full h-full bg-black/60 flex items-center">
                <div className="max-w-7xl mx-auto px-6">

                  <div className="max-w-2xl">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full mb-6">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                      Trusted Healthcare Platform
                    </div>

                    {/* Title */}
                    <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
                      {slide.title}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg text-gray-200 mb-8 leading-relaxed">
                      {slide.subtitle}
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4 mb-10">

                      <Button
                        as={Link}
                        href="/all-appointments"
                        className="bg-cyan-500 hover:bg-cyan-400 text-white px-8 py-6 rounded-xl text-base font-semibold"
                        endContent={<ArrowRight size={18} />}
                      >
                        Book Appointment
                      </Button>

                      <Button
                        as={Link}
                        href="/all-appointments"
                        variant="bordered"
                        className="border-white text-white hover:bg-white/10 px-8 py-6 rounded-xl text-base"
                      >
                        Browse Doctors
                      </Button>

                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-6">

                      {stats.map((item, i) => {
                        const Icon = item.icon;

                        return (
                          <div
                            key={i}
                            className="flex items-center gap-3"
                          >
                            <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
                              <Icon
                                size={20}
                                className="text-cyan-400"
                              />
                            </div>

                            <div>
                              <h3 className="text-white font-bold text-lg">
                                {item.value}
                              </h3>

                              <p className="text-gray-300 text-sm">
                                {item.label}
                              </p>
                            </div>
                          </div>
                        );
                      })}

                    </div>

                  </div>

                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </section>
  );
}