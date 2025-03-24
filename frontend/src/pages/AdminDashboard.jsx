import { Card, CardActionArea, CardContent, Typography, Grid, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import CategoryIcon from "@mui/icons-material/Category";
import GroupIcon from "@mui/icons-material/Group";
import ReceiptIcon from "@mui/icons-material/Receipt";
import BarChartIcon from "@mui/icons-material/BarChart";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const dashboardOptions = [
    { title: "Manage Categories", path: "/categories", icon: <CategoryIcon fontSize="large" /> },
    { title: "User Management", path: "/users", icon: <GroupIcon fontSize="large" /> },
    { title: "Expenses", path: "/expenses", icon: <ReceiptIcon fontSize="large" /> },
    { title: "Statistics", path: "/stats", icon: <BarChartIcon fontSize="large" /> },
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom color={theme.palette.text.primary}>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {dashboardOptions.map((option, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                backgroundColor: theme.palette.success.main,
                color: theme.palette.primary.contrastText,
                borderRadius: 2,
                height:"200px",
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)", boxShadow: theme.shadows[5] }
              }}
            >
              <CardActionArea onClick={() => navigate(option.path)} sx={{ padding: 2, textAlign: "center" }}>
                {option.icon}
                <CardContent>
                  <Typography variant="h6">{option.title}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
