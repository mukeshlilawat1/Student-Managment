import { useEffect, useState } from "react";

const emptyStudent = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    course: "",
};

const StudentForm = ({ onSubmit, selected }) => {
    const [student, setStudent] = useState(emptyStudent);

    useEffect(() => {
        if (selected) {
            setStudent({
                ...selected,
                dateOfBirth: selected.dateOfBirth || "",
            });
        } else {
            setStudent(emptyStudent);
        }
    }, [selected]);

    const handleChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(student);
        setStudent(emptyStudent);
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            {/* ================= HEADER ================= */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <h2 className="text-xl font-semibold text-white">
                    {selected ? "Update Student Details" : "Add New Student"}
                </h2>
                <p className="text-sm text-blue-100">
                    {selected
                        ? "Modify existing student information"
                        : "Fill the form to register a new student"}
                </p>
            </div>

            {/* ================= FORM ================= */}
            <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Input
                        label="First Name"
                        name="firstname"
                        value={student.firstname}
                        onChange={handleChange}
                        placeholder="Enter first name"
                        required
                    />

                    <Input
                        label="Last Name"
                        name="lastname"
                        value={student.lastname}
                        onChange={handleChange}
                        placeholder="Enter last name"
                    />

                    <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        value={student.email}
                        onChange={handleChange}
                        placeholder="student@email.com"
                        required
                    />

                    <Input
                        label="Phone Number"
                        name="phone"
                        value={student.phone}
                        onChange={handleChange}
                        placeholder="10-digit phone number"
                    />

                    <Input
                        label="Date of Birth"
                        name="dateOfBirth"
                        type="date"
                        value={student.dateOfBirth}
                        onChange={handleChange}
                    />

                    <Input
                        label="Course"
                        name="course"
                        value={student.course}
                        onChange={handleChange}
                        placeholder="e.g. BTech, MTech, MSc CS, MCA"
                        required
                    />
                </div>

                {/* ================= ACTIONS ================= */}
                <div className="mt-8 flex justify-end gap-3">
                    <button
                        type="submit"
                        className="px-8 py-2.5 rounded-lg font-medium text-white
                                   bg-blue-600 hover:bg-blue-700 transition
                                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {selected ? "Update Student" : "Create Student"}
                    </button>
                </div>
            </form>
        </div>
    );
};

/* ================= REUSABLE INPUT ================= */
const Input = ({ label, ...props }) => (
    <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            {...props}
            className="border px-3 py-2 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       transition"
        />
    </div>
);

export default StudentForm;
