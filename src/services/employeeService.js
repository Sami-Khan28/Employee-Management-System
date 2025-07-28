import axios from "axios";

const API_URL = "http://localhost:8080/api/employees";

export const getAllEmployees = () => axios.get(API_URL);
export const addEmployee = (employee) => axios.post(API_URL, employee);
export const updateEmployee = (id, employee) => axios.put(`${API_URL}/${id}`, employee);
export const deleteEmployee = (id) => axios.delete(`${API_URL}/${id}`);
