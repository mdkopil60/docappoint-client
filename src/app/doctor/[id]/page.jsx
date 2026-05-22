import Link from "next/link";

const DocAppointDetailsPage = async ({ params }) => {

    const resolvedParams = await params;
    const id = resolvedParams.id;

    const res = await fetch(
        `http://localhost:5000/all-appointments/${id}`,
        {
            cache: "no-store",
        }
    );
    if (!res.ok) {
        throw new Error("Failed to fetch doctor");
    }
    const data = await res.json();

    return (
        <div className="max-w-5xl mx-auto p-10">

            <div className="grid md:grid-cols-2 gap-10">

                <img
                    src={data?.image}
                    alt={data?.name}
                    className="w-full rounded-2xl"
                />

                <div>

                    <h1 className="text-4xl font-bold mb-3">
                        {data?.name}
                    </h1>

                    <p className="text-blue-600 text-xl mb-4">
                        {data?.specialty}
                    </p>

                    <p className="mb-3">
                        <span className="font-semibold">
                            Experience:
                        </span>{" "}
                        {data?.experience}
                    </p>

                    <p className="mb-3">
                        <span className="font-semibold">
                            Hospital:
                        </span>{" "}
                        {data?.hospital}
                    </p>

                    <p className="mb-3">
                        <span className="font-semibold">
                            Location:
                        </span>{" "}
                        {data?.location}
                    </p>

                    <p className="mb-3">
                        <span className="font-semibold">
                            Fee:
                        </span>{" "}
                        ৳ {data?.fee}
                    </p>

                    <div className="mb-5">
                        <h3 className="font-bold mb-2">
                            Availability
                        </h3>

                        {/* {
                            data?.availability?.map((time, index) => (
                                <span
                                    key={index}
                                    className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full mr-2 mb-2"
                                >
                                    {time}
                                </span>
                            ))
                        } */}
                    </div>

                    <p className="text-gray-600 mb-6">
                        {data?.description}
                    </p>

                   <Link href={"/book-appintment"}>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700">
                        Book Appointment
                    </button>
                   </Link>

                </div>

            </div>

        </div>
    );
};

export default DocAppointDetailsPage;