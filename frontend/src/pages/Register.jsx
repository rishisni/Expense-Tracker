import { Container, Box } from "@mui/material";
import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh", // Full viewport height
        }}
      >
        <RegisterForm />
      </Box>
    </Container>
  );
};

export default Register;
