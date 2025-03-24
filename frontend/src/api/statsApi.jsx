import API from "./axiosConfig";

export const fetchChartData = async (userRole) => {
  try {
    const endpoint = userRole === "admin" ? "/stats/admin-trends/" : "/stats/user-trends/";
    const response = await API.get(endpoint);
    return response.data || {};
  } catch (error) {
    console.error("Error fetching chart data:", error);
    throw new Error("Failed to load chart data.");
  }
};

export const fetchStats = async (userRole) => {
  try {
    const endpoint = userRole === "admin" ? "/stats" : "/stats/user-stats";
    const response = await API.get(endpoint);
    return response.data || {};
  } catch (error) {
    console.error("Error fetching stats:", error);
    throw new Error(error.response?.data?.error || "Failed to load stats.");
  }
};
