import { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Typography, Box, Button, CircularProgress
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import API from "../../api/axiosConfig";
import exportToPDF from "../../utils/exportToPDF";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await API.get("/users/");
        setUsers(response.data);
        console.log("Fetched users:", response.data); // Debugging
        setError(null);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleExportPDF = () => {
   

    if (users.length === 0) {
      alert("No user data available to export!");
      return;
    }

    const columns = ["ID", "Email", "Phone Number"];
    const data = users.map((user) => [user.id, user.email, user.phone_number]);

    exportToPDF(columns, data, "User List", "users.pdf");
  };

  return (
    <Box sx={{ width: "80%", mx: "auto", mt: 4, textAlign: "center" }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        User Management
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>ID</b></TableCell>
                  <TableCell><b>Email</b></TableCell>
                  <TableCell><b>Phone Number</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone_number}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            variant="contained"
            color="primary"
            onClick={handleExportPDF}
            sx={{ mt: 2, mb: 2 }}
          >
            Export to PDF
          </Button>
        </>
      )}
    </Box>
  );
};

export default UserManagement;
