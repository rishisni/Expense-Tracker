import { useEffect, useState } from "react";
import { 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, IconButton, Typography, 
  Box, Button 
} from "@mui/material";
import { Edit, Delete, PictureAsPdf } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { getCategories } from "../../api/categoryApi";
import exportToPDF from "../../utils/exportToPDF"; 

const CategoryList = ({ onEdit, onDelete }) => {
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

  
  const handleExportPDF = () => {
    const columns = ["#", "Category Name"];
    const data = categories.map((category, index) => [index + 1, category.name]);

    exportToPDF(columns, data, "Category List", "category_list.pdf");
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
      <Typography variant="h5" sx={{ mb: theme.spacing(2) }}>
        Category List
      </Typography>

     
     

      <TableContainer component={Paper} sx={{ borderRadius: 2, overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: theme.palette.primary.main }}>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>#</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Category Name</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <TableRow key={category.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <IconButton color="primary" onClick={() => onEdit(category)} sx={{ mx: 1 }}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => onDelete(category.id)} sx={{ mx: 1 }}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} sx={{ textAlign: "center", py: theme.spacing(2) }}>
                  No categories found.
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

    
    </Box>
  );
};

export default CategoryList;
