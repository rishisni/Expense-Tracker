import API from "./axiosConfig";

// Fetch Logged-in User Data
export const getUserData = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User not authenticated");

    const response = await API.get("/profile/", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Export all User API functions
const userApi = { getUserData };
export default userApi;
