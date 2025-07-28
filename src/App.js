import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "./services/employeeService";
import "./EmployeeManagement.css";
import "./LoginDark.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "Sami" && password === "sami2804") {
      onLogin();
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center vh-100 bg-dark text-light">
      <div className="glass-card p-5 rounded-4 shadow-lg">
        <h2 className="mb-4 text-center fw-bold text-info">Employee Management System</h2>
        <img
  src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
  alt="User Avatar"
  className="login-avatar mx-auto d-block mb-3"
/>
 <h5 className="text-secondary mb-3">Welcome, Sir</h5>
        <h2 className="mb-4 text-center fw-bold text-info">🔒 Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control bg-transparent text-light border-info"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="username">Username</label>
          </div>

          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control bg-transparent text-light border-info"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
          </div>

          <button type="submit" className="btn btn-info w-100 py-2 fw-bold rounded-pill">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

const EmployeeManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    position: "",
    salary: ""
  });

  const [editIndex, setEditIndex] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchEmployees = () => {
    getAllEmployees()
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error("Error fetching employees:", err));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
  const { name, value } = e.target;
  setNewEmployee((prev) => ({ ...prev, [name]: value }));
};


  const handleAdd = () => {
  if (newEmployee.firstName && newEmployee.lastName && newEmployee.position) {
    addEmployee(newEmployee)
      .then(() => {
        alert("Employee added successfully!");
        getAllEmployees().then((res) => setEmployees(res.data));
        setNewEmployee({
          id: "",
          firstName: "",
          lastName: "",
          email: "",
          position: "",
          department: "",
          salary: ""
        });
      })
      .catch((err) => console.error("Error adding employee:", err));
  }
};


const handleEdit = (index) => {
  const emp = employees[index];
  setNewEmployee({
    id: emp.id,
    firstName: emp.firstName,
    lastName: emp.lastName,
    email: emp.email,
    position: emp.position,
    department: emp.department,
    salary: emp.salary
  });
  setEditIndex(index);
};

//  const handleUpdate = () => {
//   updateEmployee(newEmployee.id, newEmployee)
//     .then(() => {
//       alert("Employee updated successfully!");
//       getAllEmployees().then((res) => setEmployees(res.data));
//       setNewEmployee({
//         id: "",
//         firstName: "",
//         lastName: "",
//         email: "",
//         position: "",
//         department: "",
//         salary: ""
//       });
//       setEditIndex(null);
//     })
//     .catch((err) => console.error("Error updating employee:", err));
//     alert("Failed to update employee.");
// };

const handleUpdate = () => {
  updateEmployee(newEmployee.id, newEmployee)
    .then(() => {
      alert("✅ Employee updated successfully!");
      getAllEmployees().then((res) => setEmployees(res.data));
      setNewEmployee({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        position: "",
        department: "",
        salary: ""
      });
      setEditIndex(null);
    })
    .catch((err) => {
      console.error("Error updating employee:", err);
      alert("Failed to update employee."); 
    });
};


  const handleDelete = (id) => {
    deleteEmployee(id)
      .then(() => fetchEmployees()
    )
    alert("Employee deleted successfully!")

      .catch((err) => console.error("Error deleting employee:", err));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setNewEmployee({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      department: "",
      position: "",
      salary: ""
    });
    setEmployees([]);
    setEditIndex(null);
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="container mt-5 employee-management">
      {/* <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Employee Management System</h2>
        <button className="btn btn-outline-secondary" onClick={handleLogout}>Logout</button>
      </div> */}
      <div className="header bg-dark text-light p-3 shadow-sm d-flex justify-content-between align-items-center sticky-top">
  <h4 className="mb-0">👥 Employee Management System</h4>
  <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
</div>


      <div className="card mb-4 shadow">
        <div className="card-body">
          <h4 className="card-title">Add / Edit Employee</h4>
          <div className="row g-3">
            <div className="mb-4">
  <input
    type="text"
    className="form-control"
    placeholder="Search by name, department, or ID"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>

            <div className="col-md-6">
              <input
                type="text"
                name="firstName"
                className="form-control"
                placeholder="First Name"
                value={newEmployee.firstName}
                onChange={handleChange}
                disabled={editIndex !== null}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="lastName"
                className="form-control"
                placeholder="Last Name"
                value={newEmployee.lastName}
                onChange={handleChange}
                disabled={editIndex !== null}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="email"
                className="form-control"
                placeholder="Email"
                value={newEmployee.email}
                onChange={handleChange}
                disabled={editIndex !== null}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="department"
                className="form-control"
                placeholder="Department"
                value={newEmployee.department}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="position"
                className="form-control"
                placeholder="Position"
                value={newEmployee.position}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="salary"
                className="form-control"
                placeholder="Salary"
                value={newEmployee.salary}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-12">
              {editIndex === null ? (
                <button className="btn btn-primary w-100" onClick={handleAdd}>Add Employee</button>
              ) : (
                <button className="btn btn-success w-100" onClick={handleUpdate}>Update Employee</button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow">
        <div className="card-body">
          <h4 className="card-title">Employee List</h4>
          {employees.length === 0 ? (
            <p className="text-muted">No employees added yet.</p>
          ) : (
            employees
  .filter((emp) => {
    const term = searchTerm.toLowerCase();
    return (
      emp.name?.toLowerCase().includes(term) ||
      emp.department?.toLowerCase().includes(term) ||
      emp.id?.toString().includes(term)
    );
  })
  .map((emp, index) => (
    <div key={index} className="d-flex justify-content-between align-items-center border p-3 mb-3 rounded employee-item">
      <div>
        <strong>{emp.firstName} {emp.lastName} (ID: {emp.id})</strong>
        <div>Email: {emp.email}</div>
        <div>Department: {emp.department}</div>
        <div>Position: {emp.position}</div>
        <div>Salary: {emp.salary}</div>
      </div>
      <div>
        <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(index)}>Edit</button>
        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(emp.id)}>Delete</button>
      </div>
    </div>
  ))

          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement;
