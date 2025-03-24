import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import CategoryList from "./CategoryList";
import CategoryForm from "./CategoryForm";
import CategoryEditModal from "./CategoryEditModal";
import { deleteCategory, getCategories, addCategory } from "../../api/categoryApi";
import { useTheme } from "@mui/material/styles";

const CategoryManager = () => {
  const [editCategory, setEditCategory] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddCategory = async (categoryName) => {
    try {
      const newCategory = await addCategory(categoryName);
      setCategories((prevCategories) => [...prevCategories, newCategory]); // ✅ Append new category to state
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await deleteCategory(id);
      setCategories((prevCategories) => prevCategories.filter((category) => category.id !== id)); // ✅ Remove category from state
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <Box 
      sx={{ 
        width: "80%", 
        mx: "auto", 
        mt: theme.spacing(4), 
        textAlign: "center"
      }}
    >
      <Typography variant="h5" sx={{ mb: theme.spacing(3) }}>
        Manage Categories
      </Typography>
      
      <CategoryForm onCategoryAdded={handleAddCategory} />
      <CategoryList 
        onEdit={(cat) => { setEditCategory(cat); setIsEditOpen(true); }} 
        onDelete={handleDeleteCategory} 
        categories={categories}
      />

      <CategoryEditModal 
        open={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        category={editCategory} 
        onCategoryUpdated={fetchCategories} 
      />
    </Box>
  );
};

export default CategoryManager;
