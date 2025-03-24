import React, { useState, useEffect } from "react";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const ExpenseForm = ({ categories, expenseToEdit, onSave, onClose }) => {
  const [expense, setExpense] = useState({
    name: "",
    amount: "",
    category: "",
    description: "",  
  });

  useEffect(() => {
    if (expenseToEdit) setExpense(expenseToEdit);
  }, [expenseToEdit]);

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(expense);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <TextField label="Expense Name" name="name" value={expense.name} onChange={handleChange} required />
      <TextField label="Amount" name="amount" type="number" value={expense.amount} onChange={handleChange} required />

      <FormControl required>
        <InputLabel>Category</InputLabel>
        <Select name="category" value={expense.category} onChange={handleChange}>
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.name}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Description"
        name="description"
        value={expense.description}
        onChange={handleChange}
        required
        multiline
        rows={3}
      />

      <Button variant="contained" color="primary" type="submit">
        {expenseToEdit ? "Update Expense" : "Add Expense"}
      </Button>
    </form>
  );
};

export default ExpenseForm;
