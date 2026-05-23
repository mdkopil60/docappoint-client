import { Search, CalendarCheck, UserCheck, HeartPulse } from "lucide-react";

const steps = [
    {
        icon: Search,
        step: "01",
        title: "Find Your Doctor",
        desc: "Browse through our verified specialists by specialty, rating, location, or availability.",
    },
    {
        icon: CalendarCheck,
        step: "02",
        title: "Book Appointment",
        desc: "Select a convenient date and time slot that works for your schedule.",
    },
    {
        icon: UserCheck,
        step: "03",
        title: "Get Confirmed",
        desc: "Receive instant confirmation and reminders for your upcoming appointment.",
    },
    {
        icon: HeartPulse,
        step: "04",
        title: "Visit & Recover",
        desc: "Attend your appointment and get the quality care you deserve.",
    },
];

export default function HowItWorksSection() {
    return (
        <section className="py-20 bg-surface-50 dark:bg-surface-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-14">
                    <span className="inline-block text-primary-600 font-semibold text-sm tracking-wider uppercase mb-3">
                        Simple Process
                    </span>
                    <h2 className="section-heading mb-4">How DocAppoint Works</h2>
                    <p className="section-subheading">
                        From search to appointment in just a few simple steps.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Connecting line */}
                    <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-primary-200 dark:via-primary-800 to-transparent" />

                    {steps.map(({ icon: Icon, step, title, desc }) => (
                        <div key={step} className="relative flex flex-col items-center text-center group">
                            {/* Icon circle */}
                            <div className="relative z-10 w-20 h-20 rounded-2xl bg-white dark:bg-surface-800 border-2 border-primary-100 dark:border-primary-800 flex items-center justify-center mb-5 shadow-lg shadow-primary-100/50 dark:shadow-primary-900/20 group-hover:border-primary-400 group-hover:shadow-primary-200/60 transition-all duration-300">
                                <Icon size={28} className="text-primary-600" />
                                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary-600 text-white text-[10px] font-bold flex items-center justify-center">
                                    {step}
                                </span>
                            </div>
                            <h3 className="font-display font-semibold text-lg text-surface-900 dark:text-white mb-2">
                                {title}
                            </h3>
                            <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed max-w-[200px]">
                                {desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
