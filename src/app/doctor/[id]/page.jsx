const DocAppointDetalisPage = async ({ params }) => {
    const { id } = params;

    console.log("ID:", id);

    const res = await fetch(`http://localhost:5000/all-appointments/${id}`);
    const data = await res.json();

    console.log("DATA:", data);

    return (
        <div>
            fsdddd
        </div>
    );
};

export default DocAppointDetalisPage;