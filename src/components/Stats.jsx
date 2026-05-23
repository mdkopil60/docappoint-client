"use client";
import { useRouter } from "next/navigation";

const specialties = [
    { name: "Cardiologist", emoji: "❤️", desc: "Heart & cardiovascular care" },
    { name: "Neurologist", emoji: "🧠", desc: "Brain & nervous system" },
    { name: "Gynecologist", emoji: "🌸", desc: "Women's health & maternity" },
    { name: "Orthopedic Surgeon", emoji: "🦴", desc: "Bones, joints & muscles" },
    { name: "Dermatologist", emoji: "✨", desc: "Skin, hair & nails" },
    { name: "Pediatrician", emoji: "👶", desc: "Child health & development" },
];

export default function SpecialtiesSection() {
    const router = useRouter();

    return (
        <section className="py-20 bg-white dark:bg-surface-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="inline-block text-primary-600 font-semibold text-sm tracking-wider uppercase mb-3">
                        Browse by Specialty
                    </span>
                    <h2 className="section-heading mb-4">Find the Right Specialist</h2>
                    <p className="section-subheading">
                        Choose from a wide range of medical specialties and get expert care tailored to your needs.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {specialties.map(({ name, emoji, desc }) => (
                        <button
                            key={name}
                            onClick={() => router.push(`/all-appointments?specialty=${encodeURIComponent(name)}`)}
                            className="group flex flex-col items-center text-center p-5 rounded-2xl border border-surface-100 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:shadow-lg hover:shadow-primary-100/50 dark:-translate-y-1 transition-all duration-300 cursor-pointer"
                        >
                            <span className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                                {emoji}
                            </span>
                            <span className="font-semibold text-sm text-surface-800 dark:text-surface-200 leading-tight">
                                {name}
                            </span>
                            <span className="text-xs text-surface-400 mt-1 leading-tight">{desc}</span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
