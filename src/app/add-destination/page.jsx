"use client";
import {
    FieldError,
    Input,
    Label,
    TextField,
    TextArea,
    Button,
} from "@heroui/react";

const AddDoctorPage = () => {
    const OnSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const destination = Object.fromEntries(formData.entries());

        console.log(destination);

        const res = await fetch('http://localhost:5000/destination', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(destination),
        });

        const data = await res.json();

        console.log(data);
    };
    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Add Doctor</h1>

            <form onSubmit={OnSubmit} className="p-10 space-y-8 bg-white rounded-3xl shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Doctor ID */}
                    {/* <TextField name="id" isRequired>
                        <Label>Doctor ID</Label>

                        <Input
                            placeholder="d1"
                            className="rounded-2xl"
                        />

                        <FieldError />
                    </TextField> */}

                    {/* Doctor Name */}
                    <TextField name="name" isRequired>
                        <Label>Doctor Name</Label>

                        <Input
                            placeholder="Dr. Ayesha Rahman"
                            className="rounded-2xl"
                        />

                        <FieldError />
                    </TextField>

                    {/* Specialty */}
                    <TextField name="specialty" isRequired>
                        <Label>Specialty</Label>

                        <Input
                            placeholder="Cardiologist"
                            className="rounded-2xl"
                        />

                        <FieldError />
                    </TextField>

                    {/* Experience */}
                    <TextField name="experience" isRequired>
                        <Label>Experience</Label>

                        <Input
                            placeholder="10 years"
                            className="rounded-2xl"
                        />

                        <FieldError />
                    </TextField>

                    {/* Hospital */}
                    <TextField name="hospital" isRequired>
                        <Label>Hospital</Label>

                        <Input
                            placeholder="Labaid Cardiac Hospital"
                            className="rounded-2xl"
                        />

                        <FieldError />
                    </TextField>

                    {/* Location */}
                    <TextField name="location" isRequired>
                        <Label>Location</Label>

                        <Input
                            placeholder="Dhanmondi, Dhaka"
                            className="rounded-2xl"
                        />

                        <FieldError />
                    </TextField>

                    {/* Fee */}
                    <TextField name="fee" type="number" isRequired>
                        <Label>Consultation Fee</Label>

                        <Input
                            type="number"
                            placeholder="800"
                            className="rounded-2xl"
                        />

                        <FieldError />
                    </TextField>

                    {/* Availability */}
                    <TextField name="availability" isRequired>
                        <Label>Availability</Label>

                        <Input
                            placeholder="09:00 AM - 12:00 PM"
                            className="rounded-2xl"
                        />

                        <FieldError />
                    </TextField>

                    {/* Image URL */}
                    <div className="md:col-span-2">
                        <TextField name="image" isRequired>
                            <Label>Doctor Image URL</Label>

                            <Input
                                type="url"
                                placeholder="https://i.ibb.co/doctor-demo.jpg"
                                className="rounded-2xl"
                            />

                            <FieldError />
                        </TextField>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <TextField name="description" isRequired>
                            <Label>Description</Label>

                            <TextArea
                                placeholder="Write doctor details..."
                                className="rounded-3xl"
                            />

                            <FieldError />
                        </TextField>
                    </div>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="rounded-none w-full bg-cyan-500 text-white"
                >
                    Add Doctor
                </Button>
            </form>
        </div>
    );
};

export default AddDoctorPage;