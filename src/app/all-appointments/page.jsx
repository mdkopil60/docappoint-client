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

export default AllAppointmentsPage;