import { useEffect, useState } from "react";
import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";
import axios from "axios";

const API = "http://localhost:8080/api/students";

const StudentPage = () => {
    const [students, setStudents] = useState([]); // always array
    const [selected, setSelected] = useState(null);

    const loadStudents = async () => {
        try {
            const res = await axios.get(API);
            const list = Array.isArray(res.data) ? res.data : res.data?.data;
            setStudents(list || []);
        } catch (err) {
            console.error("Error loading students", err);
            setStudents([]);
        }
    };

    useEffect(() => {
        loadStudents();
    }, []);

    const handleSubmit = async (data) => {
        try {
            if (selected) {
                await axios.put(`${API}/${selected.id}`, data);
                setSelected(null);
            } else {
                await axios.post(API, data);
            }
            loadStudents();
        } catch (err) {
            console.error("Save failed", err);
        }
    };

    // ACTIVE / INACTIVE (SOFT DELETE)
    const handleToggleStatus = async (student) => {
        try {
            if (student.active) {
                await axios.delete(`${API}/${student.id}`);
            } else {
                await axios.put(`${API}/${student.id}/activate`);
            }
            loadStudents();
        } catch (err) {
            console.error("Status change failed", err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">

            {/* ================= PAGE HEADER ================= */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-6xl mx-auto px-6 py-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Student Management Dashboard
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Manage students, courses and active status from one place
                    </p>
                </div>
            </div>

            {/* ================= PAGE CONTENT ================= */}
            <div className="max-w-6xl mx-auto px-6 py-8">

                {/* FORM SECTION */}
                <section className="mb-10">
                    <StudentForm
                        onSubmit={handleSubmit}
                        selected={selected}
                    />
                </section>

                {/* TABLE SECTION */}
                <section>
                    <StudentTable
                        students={students}
                        onEdit={setSelected}
                        onToggleStatus={handleToggleStatus}
                    />
                </section>

            </div>
        </div>
    );
};

export default StudentPage;
