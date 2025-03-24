import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

const Dashboard = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");

    if (!storedRole) {
      navigate("/login"); // Redirect if no role is found
    } else {
      setRole(storedRole);
    }
  }, [navigate]);

  if (!role) return <h1>Loading...</h1>;

  return role === "admin" ? <AdminDashboard /> : <UserDashboard />;
};

export default Dashboard;
