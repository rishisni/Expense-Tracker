import AuthForm from "./AuthForm";
import { loginUser } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (credentials) => {
    try {
      const userData = await loginUser(credentials);

      // Save token and role
      localStorage.setItem("token", userData.access);
      localStorage.setItem("role", userData.role);

      login(userData);
      
      navigate("/dashboard"); // Always go to /dashboard
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return <AuthForm type="login" onSubmit={handleLogin} />;
};

export default LoginForm;
