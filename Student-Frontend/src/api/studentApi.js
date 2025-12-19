import { data } from "autoprefixer";
import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api/students"
})

export const getStudents = () => API.get("");
export const createStudent = (data) => API.post("", data);
export const updateStudent = (id, data) => API.put(`/${id}`, data);
export const deleteStudent = (id) => API.delete(`/${id}`);