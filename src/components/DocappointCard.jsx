// components/DocappointCard.jsx

import Link from "next/link";

const DocappointCard = ({ docAppoint }) => {

    const {
        id,
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

                    <Link href={`/doctor/${id}`}>

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