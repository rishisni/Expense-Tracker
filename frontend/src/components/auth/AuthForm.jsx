import { useState } from "react";
import { TextField, Button, Box, Typography, Snackbar, Alert } from "@mui/material";

const AuthForm = ({ type, onSubmit }) => {
  const isLogin = type === "login";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone_number: isLogin ? "" : "", 
  });

  const [message, setMessage] = useState({ text: "", type: "" }); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      setMessage({ text: isLogin ? "Login Successful!" : "Registration Successful!", type: "success" });
    } catch (error) {
      setMessage({ text: error.message || "Something went wrong!", type: "error" });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%", p: 2 }}>
      <Typography variant="h5" gutterBottom>
        {isLogin ? "Login" : "Register"}
      </Typography>

      <TextField fullWidth label="Email" name="email" type="email" onChange={handleChange} margin="normal" />

      {!isLogin && (
        <TextField fullWidth label="Phone Number" name="phone_number" onChange={handleChange} margin="normal" />
      )}

      <TextField fullWidth label="Password" name="password" type="password" onChange={handleChange} margin="normal" />

      <Button type="submit" variant="contained" color="primary" fullWidth>
        {isLogin ? "Login" : "Register"}
      </Button>

     
      <Snackbar
        open={!!message.text}
        autoHideDuration={3000}
        onClose={() => setMessage({ text: "", type: "" })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setMessage({ text: "", type: "" })} severity={message.type} variant="filled">
          {message.text}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AuthForm;
