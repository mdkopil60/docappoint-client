const Stats = () => {
    const statsData = [
        { count: "15k+", label: "Happy Patients" },
        { count: "150+", label: "Expert Doctors" },
        { count: "50+", label: "Medical Specialities" },
        { count: "4.9", label: "Average Rating" }
    ];

    return (
        // text-white ব্যবহার করা হয়েছে যাতে নীল ব্যাকগ্রাউন্ডে লেখাগুলো স্পষ্ট দেখা যায়
        <section className="w-full py-12 bg-gradient-to-r from-blue-600 to-cyan-500 text-black shadow-xl">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    {statsData.map((stat, idx) => (
                        <div key={idx} className="space-y-2 p-4">
                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
                                {stat.count}
                            </h3>
                            <p className="text-blue-100 text-xs md:text-sm font-semibold tracking-wider uppercase">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;