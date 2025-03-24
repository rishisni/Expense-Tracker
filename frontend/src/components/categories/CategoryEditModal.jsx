import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { updateCategory } from "../../api/categoryApi";

const CategoryEditModal = ({ open, onClose, category, onCategoryUpdated }) => {
  const [newName, setNewName] = useState("");
  const theme = useTheme();

  useEffect(() => {
    if (category) {
      setNewName(category.name);
    }
  }, [category]);

  const handleEditCategory = async () => {
    if (!newName.trim()) return;
    try {
      await updateCategory(category.id, newName);
      onCategoryUpdated();
      onClose();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth 
      sx={{
        "& .MuiDialog-paper": { width: "80%", maxWidth: "500px" } // 80% width, max 500px for large screens
      }}
    >
      <DialogTitle>Edit Category</DialogTitle>
      <DialogContent>
        <TextField
          label="Category Name"
          variant="outlined"
          fullWidth
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          sx={{
            mt: theme.spacing(2),
            bgcolor: theme.palette.background.paper
          }}
        />
      </DialogContent>
      <DialogActions sx={{ p: theme.spacing(2) }}>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button 
          onClick={handleEditCategory} 
          color="primary" 
          variant="contained" 
          disabled={!newName.trim()}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryEditModal;
