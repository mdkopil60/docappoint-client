import AppointmentForm from "@/components/AppointmentForm";


const BookAppointmentPage = async ({ params }) => {

    const { id } = await params;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/all-appointments/${id}`,
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

