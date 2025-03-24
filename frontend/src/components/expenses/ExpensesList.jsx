import { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography, Select, MenuItem, FormControl, InputLabel, Button
} from "@mui/material";
import { PictureAsPdf } from "@mui/icons-material";
import { fetchExpenses, fetchUsers } from "../../api/expenseApi";
import exportToPDF from "../../utils/exportToPDF"; // ✅ Import reusable PDF export function

const ExpensesList = ({ onEdit, onDelete }) => {
  const [expenses, setExpenses] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const userRole = localStorage.getItem("role") || "";
  const userEmail = localStorage.getItem("email") || "";

  useEffect(() => {
    if (userRole === "admin") {
      loadUsers();
      loadExpenses(selectedUser); // Load all expenses initially
    } else {
      loadExpenses(userEmail);
    }
  }, [userRole, selectedUser]);

  const loadExpenses = async (email = "") => {
    let data = await fetchExpenses(userRole, email);

    // Sort expenses by user ID when viewing all users
    if (email === "") {
      data = data.sort((a, b) => a.userId - b.userId);
    }

    setExpenses(data);
  };

  const loadUsers = async () => {
    const data = await fetchUsers();
    // Filter out the admin from the users list
    const filteredUsers = data.filter((user) => user.role !== "admin");
    setUsers(filteredUsers);
  };

  const handleUserChange = async (event) => {
    const selectedEmail = event.target.value;
    setSelectedUser(selectedEmail);
    await loadExpenses(selectedEmail);
  };

  // ✅ Prepare data for PDF export
  const handleExportPDF = () => {
    const columns = ["Name", "Amount", "Category", "Description", "Date"];
    const data = expenses.map(expense => [
      expense.name,
      expense.amount,
      expense.category,
      expense.description,
      expense.date
    ]);

    exportToPDF(columns, data, "Expenses List", "expenses_list.pdf");
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 3, p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {userRole === "admin" ? "All Users' Expenses" : "Your Expenses"}
      </Typography>

      {userRole === "admin" && (
        <FormControl sx={{ minWidth: 200, mb: 2 }}>
          <InputLabel>Select User</InputLabel>
          <Select value={selectedUser} onChange={handleUserChange}>
            <MenuItem value="">All Users</MenuItem>
            {users.map((user) => (
              <MenuItem key={user.email} value={user.email}>
                {user.email}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* ✅ Export to PDF Button (Visible for both Admin & User) */}
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleExportPDF} 
        startIcon={<PictureAsPdf />}
        sx={{ mb: 2, ml: 2 }}
      >
        Export to PDF
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Name</b></TableCell>
            <TableCell><b>Amount</b></TableCell>
            <TableCell><b>Category</b></TableCell>
            <TableCell><b>Description</b></TableCell>
            <TableCell><b>Date</b></TableCell>
            {userRole === "user" && <TableCell><b>Actions</b></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.name}</TableCell>
                <TableCell>{expense.amount}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell>{expense.date}</TableCell>
                {userRole === "user" && (
                  <TableCell>
                    <Button color="primary" onClick={() => onEdit(expense)}>Edit</Button>
                    <Button color="error" onClick={() => onDelete(expense.id)}>Delete</Button>
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={userRole === "user" ? 6 : 5} sx={{ textAlign: "center", py: 2 }}>
                No expenses found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpensesList;
