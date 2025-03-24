import API from "./axiosConfig";

//  Login API 
export const loginUser = async (credentials) => {
  const { data } = await API.post("/token/", credentials);
  localStorage.setItem("token", data.access);
  return data;
};

//  Register API 
export const registerUser = async (formData) => {
  return await API.post("/register/", formData);
};

// Logout API (Clears token and logs user out)
export const logoutUser = async () => {
  try {
    await API.post("/logout/"); 
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    localStorage.removeItem("token"); // Clear token on logout
  }
};

// Export all auth functions
const authApi = { loginUser, registerUser, logoutUser };
export default authApi;
