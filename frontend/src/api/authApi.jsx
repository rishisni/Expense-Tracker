import API from "./axiosConfig";

// ✅ Login API (Now uses email instead of username)
export const loginUser = async (credentials) => {
  const { data } = await API.post("/token/", credentials);
  localStorage.setItem("token", data.access);
  return data;
};

// ✅ Register API (Now uses email, password, phone number)
export const registerUser = async (formData) => {
  return await API.post("/register/", formData);
};

// ✅ Logout API (Clears token and logs user out)
export const logoutUser = async () => {
  try {
    await API.post("/logout/"); // Adjust endpoint if needed
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    localStorage.removeItem("token"); // Clear token on logout
  }
};

// Export all auth functions
const authApi = { loginUser, registerUser, logoutUser };
export default authApi;
