import React, { useEffect, useState } from "react";
import { Button, Container, Typography, Modal, Box } from "@mui/material";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpensesList";
import { fetchExpenses, fetchCategories, saveExpense, deleteExpense } from "../../api/expenseApi";

const ExpenseManager = ({ userRole }) => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadExpenses();
    loadCategories();
  }, [userRole]);

  const loadExpenses = async () => {
    const userEmail = localStorage.getItem("email");
    const data = await fetchExpenses(userRole, userEmail);
    setExpenses(data);
  };

  const loadCategories = async () => {
    const data = await fetchCategories();
    setCategories(data);
  };

  const handleSaveExpense = async (expenseData) => {
    await saveExpense(expenseData, editingExpense);
    await loadExpenses();
    handleCloseModal();
  };

  const handleDeleteExpense = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      await deleteExpense(id);
      await loadExpenses();
    }
  };

  const handleOpenModal = (expense = null) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingExpense(null);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {userRole === "admin" ? "All User Expenses" : "Manage Your Expenses"}
      </Typography>

      {/* Hide "Add Expense" button for admins */}
      {userRole !== "admin" && (
        <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>
          Add Expense
        </Button>
      )}

      {/* Pass userRole to disable edit/delete for admins */}
      <ExpenseList userRole={userRole} onEdit={handleOpenModal} onDelete={handleDeleteExpense} />

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box sx={{ width: 400, margin: "10% auto", padding: 3, backgroundColor: "white", borderRadius: 2 }}>
          <ExpenseForm
            categories={categories}
            expenseToEdit={editingExpense}
            onSave={handleSaveExpense}
            onClose={handleCloseModal}
          />
        </Box>
      </Modal>
    </Container>
  );
};

export default ExpenseManager;
