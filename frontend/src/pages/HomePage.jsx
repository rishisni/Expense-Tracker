import React from "react";
import { Container, Typography, Grid, Box } from "@mui/material";

// Free image URLs that won't give CORS issues
const expenseImage = "https://images.pexels.com/photos/4386374/pexels-photo-4386374.jpeg";
const secureImage = "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg";
const insightsImage = "https://images.pexels.com/photos/669619/pexels-photo-669619.jpeg";
const fastImage = "https://images.pexels.com/photos/11035371/pexels-photo-11035371.jpeg";

const HomePage = () => {
  return (
    <Container>
      {/* Hero Section */}
      <Box sx={{ textAlign: "center", py: 10 }}>
        <Typography variant="h3" fontWeight="bold" color="primary">
          Manage Your Finances Smarter
        </Typography>
        <Typography variant="h6" color="text.secondary" mt={2}>
          Gain control over your spending, budget effectively, and achieve financial stability.
        </Typography>
        <img src={expenseImage} alt="Expense Tracker" width="70%" style={{ marginTop: "20px", borderRadius: "10px" }} />
      </Box>

      {/* Features Section */}
      <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Box textAlign="center">
            <img src={fastImage} alt="Fast Tracking" width="100px" style={{ borderRadius: "10px" }} />
            <Typography variant="h6" fontWeight="bold" mt={2}>
              Quick & Efficient
            </Typography>
            <Typography color="text.secondary">
              Track your expenses in real-time with an intuitive and user-friendly interface.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box textAlign="center">
            <img src={secureImage} alt="Secure Data" width="100px" style={{ borderRadius: "10px" }} />
            <Typography variant="h6" fontWeight="bold" mt={2}>
              Secure & Private
            </Typography>
            <Typography color="text.secondary">
              Your data is fully encrypted, ensuring the highest level of privacy and security.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box textAlign="center">
            <img src={insightsImage} alt="Financial Insights" width="100px" style={{ borderRadius: "10px" }} />
            <Typography variant="h6" fontWeight="bold" mt={2}>
              Smart Insights
            </Typography>
            <Typography color="text.secondary">
              Analyze your spending patterns and get recommendations to save money.
            </Typography>
          </Box>
        </Grid>
      </Grid>

      
      <Box sx={{ textAlign: "center", mt: 6, py: 4 }}>
        <Typography variant="h5" fontWeight="bold">
          Take Control of Your Budgeting
        </Typography>
        <Typography variant="h6" color="text.secondary" mt={2} mx="auto" sx={{ maxWidth: "700px" }}>
          Stay ahead of your finances by setting custom budgets, tracking expenses by category, and reviewing
          detailed reports. Whether you're saving for a goal or just want better financial habits, an expense tracker
          helps you stay on track.
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;
