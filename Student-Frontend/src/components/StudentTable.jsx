import { useMemo, useState } from "react";

const StudentTable = ({ students = [], onEdit, onToggleStatus }) => {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    /* ---------------- STATS ---------------- */
    const stats = useMemo(() => {
        const total = students.length;
        const active = students.filter(s => s.active).length;
        const inactive = total - active;
        return { total, active, inactive };
    }, [students]);

    /* ---------------- FILTER + SEARCH ---------------- */
    const filteredStudents = useMemo(() => {
        return students.filter((s) => {
            const textMatch =
                `${s.firstname} ${s.lastname} ${s.email} ${s.course}`
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const statusMatch =
                statusFilter === "ALL" ||
                (statusFilter === "ACTIVE" && s.active) ||
                (statusFilter === "INACTIVE" && !s.active);

            return textMatch && statusMatch;
        });
    }, [students, search, statusFilter]);

    if (!students.length) {
        return (
            <div className="mt-16 text-center text-gray-500 text-lg">
                No students available
            </div>
        );
    }

    return (
        <div className="mt-10 space-y-6">

            {/* ================= HEADER ================= */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-black shadow-lg">
                <h2 className="text-2xl font-semibold">Student Management</h2>
                <p className="text-sm opacity-90">
                    Manage students, activation status & details
                </p>

                {/* STATS */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                    <StatCard label="Total" value={stats.total} />
                    <StatCard label="Active" value={stats.active} green />
                    <StatCard label="Inactive" value={stats.inactive} red />
                </div>
            </div>

            {/* ================= CONTROLS ================= */}
            <div className="flex flex-col md:flex-row gap-4 justify-between">
                {/* SEARCH */}
                <input
                    type="text"
                    placeholder="Search by name, email or course..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border px-4 py-2 rounded-lg w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* FILTER */}
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border px-4 py-2 rounded-lg w-full md:w-40 focus:outline-none"
                >
                    <option value="ALL">All</option>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                </select>
            </div>

            {/* ================= TABLE ================= */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-100 text-gray-700 sticky top-0">
                            <tr>
                                <th className="px-6 py-4 text-left">Name</th>
                                <th className="px-6 py-4 text-left">Email</th>
                                <th className="px-6 py-4 text-left">Course</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredStudents.map((s, index) => (
                                <tr
                                    key={s.id}
                                    className={`border-t transition
                                        ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                                        ${!s.active
                                            ? "text-gray-400"
                                            : "hover:bg-blue-50"}
                                    `}
                                >
                                    <td className="px-6 py-4 font-medium">
                                        {s.firstname} {s.lastname}
                                    </td>

                                    <td className="px-6 py-4">{s.email}</td>

                                    <td className="px-6 py-4">{s.course}</td>

                                    <td className="px-6 py-4 text-center">
                                        <span
                                            className={`px-4 py-1.5 rounded-full text-xs font-semibold
                                                ${s.active
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-600"}
                                            `}
                                        >
                                            {s.active ? "Active" : "Inactive"}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-center space-x-2">
                                        <button
                                            disabled={!s.active}
                                            onClick={() => onEdit(s)}
                                            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition
                                                ${s.active
                                                    ? "bg-blue-600 text-white hover:bg-blue-700"
                                                    : "bg-gray-300 cursor-not-allowed"}
                                            `}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => onToggleStatus(s)}
                                            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition
                                                ${s.active
                                                    ? "bg-red-600 text-white hover:bg-red-700"
                                                    : "bg-green-600 text-white hover:bg-green-700"}
                                            `}
                                        >
                                            {s.active ? "Deactivate" : "Activate"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {!filteredStudents.length && (
                        <div className="text-center py-10 text-gray-500">
                            No matching students found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

/* ================= SMALL COMPONENT ================= */
const StatCard = ({ label, value, green, red }) => (
    <div
        className={`rounded-xl p-4 text-center bg-white/90
            ${green ? "text-green-700" : ""}
            ${red ? "text-red-600" : ""}
        `}
    >
        <p className="text-sm font-medium">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
    </div>
);

export default StudentTable;
