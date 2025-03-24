import { Container, Box } from "@mui/material";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh", 
        }}
      >
        <LoginForm />
      </Box>
    </Container>
  );
};

export default Login;
