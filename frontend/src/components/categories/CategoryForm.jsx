import { useState } from "react";
import { TextField, Button, Box, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { addCategory } from "../../api/categoryApi";

const CategoryForm = ({ onCategoryAdded }) => {
  const [categoryName, setCategoryName] = useState("");
  const theme = useTheme();

  const handleAddCategory = async () => {
    if (!categoryName.trim()) return;
    try {
      await addCategory(categoryName);
      setCategoryName("");
      onCategoryAdded(); 
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: theme.spacing(4),
      }}
    >
      <Box
        sx={{
          width: "80%",
          maxWidth: "600px", 
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          gap: theme.spacing(2),
        }}
      >
        <TextField
          label="Category Name"
          variant="outlined"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          fullWidth
          sx={{
            bgcolor: theme.palette.background.paper,
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddCategory}
          disabled={!categoryName.trim()}
          sx={{
            minWidth: "150px",
            textTransform: "none",
          }}
        >
          Add Category
        </Button>
      </Box>
    </Container>
  );
};

export default CategoryForm;
