import API from "./axiosConfig";

// Get authentication headers
const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// Fetch expenses based on user role
export const fetchExpenses = async (userRole, userEmail = "") => {
  let endpoint = "/expenses/";
  if (userRole === "user") {
    endpoint += `?user_email=${userEmail}`; // Fetch only logged-in user's expenses
  } else if (userRole === "admin" && userEmail) {
    endpoint += `?user_email=${userEmail}`; // Fetch specific user's expenses
  }
  
  try {
    const response = await API.get(endpoint, { headers: getAuthHeaders() });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return [];
  }
};

export const fetchCategories = async () => {
  try {
    const response = await API.get("/categories/");
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};


// Fetch all users (Admin only)
export const fetchUsers = async () => {
  try {
    const response = await API.get("/users/", { headers: getAuthHeaders() });
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

// Save (Add/Update) expense (Only for Users)
export const saveExpense = async (expenseData, editingExpense) => {
  try {
    if (editingExpense) {
      await API.put(`/expenses/${editingExpense.id}/`, expenseData, { headers: getAuthHeaders() });
    } else {
      await API.post("/expenses/", expenseData, { headers: getAuthHeaders() });
    }
  } catch (error) {
    console.error("Error saving expense:", error);
  }
};

// Delete expense (Only for Users)
export const deleteExpense = async (id) => {
  try {
    await API.delete(`/expenses/${id}/`, { headers: getAuthHeaders() });
  } catch (error) {
    console.error("Error deleting expense:", error);
  }
};

