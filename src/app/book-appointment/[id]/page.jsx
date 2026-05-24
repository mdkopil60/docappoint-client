import AppointmentForm from "@/components/AppointmentForm";


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

