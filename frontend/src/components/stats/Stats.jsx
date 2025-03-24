import { useEffect, useState } from "react";
import { Card, CardContent, Grid, Typography, Container, Button } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import ReceiptIcon from "@mui/icons-material/Receipt";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CategoryIcon from "@mui/icons-material/Category";
import ExpenseChart from "./ExpenseChart";
import { fetchStats } from "../../api/statsApi";
import { useTheme } from "@mui/material/styles";
import exportToPDF from "../../utils/exportToPDF"; // ✅ Import the separate PDF utility

const Stats = () => {
  const theme = useTheme();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedEmail = localStorage.getItem("email");

    setUserRole(storedRole);
    setUserEmail(storedEmail);

    const getStats = async () => {
      try {
        const data = await fetchStats(storedRole);
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getStats();
  }, []);

  if (loading) return <Typography variant="h6">Loading statistics...</Typography>;
  if (error) return <Typography variant="h6" color="error">{error}</Typography>;

  const statsData =
    userRole === "admin"
      ? [
          { title: "Total Users", value: stats.total_users ?? 0, icon: <GroupIcon fontSize="large" />, color: theme.palette.success.main },
          { title: "Total Categories", value: stats.total_categories ?? 0, icon: <CategoryIcon fontSize="large" />, color: theme.palette.success.main },
          { title: "Total Transactions", value: stats.total_expenses ?? 0, icon: <ReceiptIcon fontSize="large" />, color: theme.palette.success.main },
          { title: "Total Amount Spent", value: `₹${stats.total_spent?.toFixed(2) || "0"}`, icon: <MonetizationOnIcon fontSize="large" />, color: theme.palette.success.main },
        ]
      : [
          { title: "Your Transactions", value: stats.user_expenses ?? 0, icon: <ReceiptIcon fontSize="large" />, color: theme.palette.success.main },
          { title: "Total Spent", value: `₹${stats.user_spent?.toFixed(2) || "0"}`, icon: <MonetizationOnIcon fontSize="large" />, color: theme.palette.success.main },
        ];

  // 📜 Export PDF Function (Using Separate Utility)
  const handleExportPDF = () => {
    const title = userRole === "admin" ? "Admin Stats Report" : "Your Expense Overview";
    const filename = userRole === "admin" ? "Admin_Stats_Report.pdf" : "User_Expense_Report.pdf";

    // Prepare Data for Table
    const columns = ["Metric", "Value"];
    const data = statsData.map(stat => [stat.title, stat.value]);

    // Call the utility function
    exportToPDF(columns, data, title, filename);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom color="primary">
        {userRole === "admin" ? "Admin Dashboard" : "Your Expense Overview"}
      </Typography>
      <Grid container spacing={3}>
        {statsData.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ backgroundColor: stat.color, color: "#fff", textAlign: "center", borderRadius: 2 , height:"200px"}}>
              <CardContent>
                {stat.icon}
                <Typography variant="h6">{stat.title}</Typography>
                <Typography variant="h4">{stat.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 📥 Export PDF Button */}
      <Button 
        variant="contained" 
        color="primary" 
        sx={{ mt: 3 }} 
        onClick={handleExportPDF}
      >
        Export PDF
      </Button>

      <ExpenseChart userRole={userRole} />
    </Container>
  );
};

export default Stats;
