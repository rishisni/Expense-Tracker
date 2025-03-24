import { Card, CardActionArea, CardContent, Typography, Grid, Container, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReceiptIcon from "@mui/icons-material/Receipt";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useTheme } from "@mui/material/styles";
import userApi from "../api/userApi";
import { useEffect, useState } from "react";

const UserDashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await userApi.getUserData();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const dashboardOptions = [
    { title: "Manage Expenses", path: "/expenses", icon: <ReceiptIcon fontSize="large" />, color: theme.palette.success.main },
    { title: "Statistics", path: "/stats", icon: <BarChartIcon fontSize="large" />, color: theme.palette.success.main },
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom color="primary">
        {user ? `Welcome, ${user.email}!` : "Welcome!"}
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {/* Profile Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ backgroundColor: theme.palette.background.paper, borderRadius: 2, textAlign: "center", p: 2 }}>
            <Avatar sx={{ width: 80, height: 80, bgcolor: theme.palette.info.main, margin: "auto" }}>
              <AccountCircleIcon fontSize="large" />
            </Avatar>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color="primary">
                {user ? user.name : "User"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user ? user.email : "user@example.com"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Dashboard Options with Different Colors */}
        {dashboardOptions.map((option, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ backgroundColor: option.color, color: "#fff", borderRadius: 2 }}>
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

export default UserDashboard;
