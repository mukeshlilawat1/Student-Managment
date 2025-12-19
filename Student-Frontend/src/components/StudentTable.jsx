import React from 'react'

const StudentTable = ({ student, onEdit, onDelete }) => {
    return (
        <table className='w-full bg-white shadow rounded'>
            <thead className='bg-gray-100'>
                <tr>
                    <th className='p-2'>Name</th>
                    <th>Email</th>
                    <th>Course</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {student.map((s) => (
                    <tr key={s.id} className='border-t'>
                        <td className='p-2'>{s.firstname} {s.lastname}</td>
                        <td>{s.email}</td>
                        <td>{s.course}</td>

                        <td className='flex gap-2 p-2'>
                            <button onClick={() => onEdit(s)} className='text-blue-600'>Edit</button>
                            <button onClick={() => onDelete(s.id)} className='text-red-600'>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default StudentTable