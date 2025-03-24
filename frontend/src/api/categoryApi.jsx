import API from "./axiosConfig";

// Fetch all categories
export const getCategories = async () => {
  const { data } = await API.get("/categories/");
  return data;
};

// Add a new category
export const addCategory = async (categoryName) => {
  return await API.post("/admin/categories/", { name: categoryName });
};

// Update category
export const updateCategory = async (id, newName) => {
  return await API.put(`/admin/categories/${id}/`, { name: newName });
};

// Delete category
export const deleteCategory = async (id) => {
  return await API.delete(`/admin/categories/${id}/`);
};
