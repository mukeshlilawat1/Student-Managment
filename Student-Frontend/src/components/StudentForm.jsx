import React from 'react'
import { useState } from 'react'

const emptyStudent = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    dateofbirth: "",
    course: ""
}

const StudentForm = ({ onSubmit, selected }) => {
    const [student, setStudent] = useState(selected || emptyStudent);

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(student);
        setStudent(emptyStudent);
    };

    return (
        <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow mb-6'>
            <h2 className='text-xl font-semibold mb-4'>
                {selected ? "Update Student " : "Add Student"}
            </h2>

            <div className='grid grid-cols-2 gap-4'>
                <input name='firstname' placeholder='First Name'
                    className='input' onChange={handleChange} value={student.firstname} />
                <input name='lastname' placeholder='Last Name'
                    className='input' onChange={handleChange} value={student.lastname} />
                <input name='email' placeholder='Email'
                    className='input' onChange={handleChange} value={student.email} />
                <input name='phone' placeholder='phone'
                    className='input' onChange={handleChange} value={student.phone} />
                <input name='date' placeholder='dateOfBirth'
                    className='input' onChange={handleChange} value={student.dateofbirth} />
                <input name='course' placeholder='Course'
                    className='input' onChange={handleChange} value={student.course} />
            </div>

            <button className='mt-4 bg-blue-600 text-white px-6 py-2 rounded'>
                {selected ? "Update" : "Create"}
            </button>

        </form>
    )
}

export default StudentForm