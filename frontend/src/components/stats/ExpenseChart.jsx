import { useEffect, useState, useMemo } from "react";
import { Card, CardContent, Typography, MenuItem, Select } from "@mui/material";
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";
import { fetchChartData } from "../../api/statsApi";
import { useTheme } from "@mui/material/styles";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, PointElement, ArcElement, Title, Tooltip, Legend);

// Function to generate random colors
const generateColor = (index) => {
  const colors = [
    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40",
    "#E74C3C", "#8E44AD", "#2ECC71", "#3498DB"
  ];
  return colors[index % colors.length]; // Cycle through the color list
};

const ExpenseChart = ({ userRole }) => {
  const theme = useTheme();
  const [chartType, setChartType] = useState("line");
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getChartData = async () => {
      try {
        const data = await fetchChartData(userRole);

        if (userRole === "admin") {
          const datasets = Object.keys(data).map((userEmail, index) => ({
            label: `User: ${userEmail}`,
            data: data[userEmail].amounts || [],
            backgroundColor: generateColor(index),
            borderColor: generateColor(index),
            borderWidth: 2,
            tension: 0.3,
            fill: chartType === "line"
          }));

          setChartData({ labels: Object.values(data)[0]?.dates || [], datasets });
        } else {
          setChartData({
            labels: data.dates || [],
            datasets: [
              {
                label: "Total Amount Spent",
                data: data.amounts || [],
                backgroundColor: theme.palette.secondary.light,
                borderColor: theme.palette.secondary.dark,
                borderWidth: 2,
                tension: 0.3,
                fill: chartType === "line"
              }
            ]
          });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getChartData();
  }, [userRole, chartType, theme]);

  const chartOptions = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: { labels: { color: theme.palette.text.primary } },
      tooltip: { backgroundColor: theme.palette.background.paper }
    },
    scales: {
      x: { ticks: { color: theme.palette.text.secondary } },
      y: { ticks: { color: theme.palette.text.secondary } }
    }
  }), [theme]);

  if (loading) return <Typography variant="h6">Loading chart...</Typography>;
  if (error) return <Typography variant="h6" color="error">{error}</Typography>;

  return (
    <Card sx={{ mt: 4, backgroundColor: theme.palette.background.default, color: theme.palette.text.primary }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {userRole === "admin" ? "User-wise Expense Trends" : "Your Monthly Spending"}
        </Typography>
        <Select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          sx={{ mb: 2, minWidth: 180, backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary }}
        >
          <MenuItem value="line">Line Chart</MenuItem>
          <MenuItem value="bar">Bar Chart</MenuItem>
          <MenuItem value="stackedBar">Stacked Bar Chart</MenuItem>
          <MenuItem value="pie">Pie Chart</MenuItem>
          <MenuItem value="doughnut">Doughnut Chart</MenuItem>
        </Select>
        {chartType === "line" && <Line data={chartData} options={chartOptions} />}
        {chartType === "bar" && <Bar data={chartData} options={chartOptions} />}
        {chartType === "stackedBar" && <Bar data={chartData} options={{ ...chartOptions, scales: { x: { stacked: true }, y: { stacked: true } } }} />}
        {chartType === "pie" && <Pie data={chartData} options={chartOptions} />}
        {chartType === "doughnut" && <Doughnut data={chartData} options={chartOptions} />}
      </CardContent>
    </Card>
  );
};

export default ExpenseChart;
