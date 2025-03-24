import AuthForm from "./AuthForm";
import { registerUser } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    try {
      await registerUser(formData);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return <AuthForm type="register" onSubmit={handleRegister} />;
};

export default RegisterForm;
