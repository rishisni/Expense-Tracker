import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/navbar/Navbar";
import UserManagement from "./components/users/UserManagement";
import ExpensesList from "./components/expenses/ExpensesList";
import Stats from "./components/stats/Stats";
import CategoryManager from "./components/categories/CategoryManager";
import ExpenseManager from "./components/expenses/ExpenseManager";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categories" element={<CategoryManager />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/expenses-list" element={<ExpensesList />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/expenses" element={<ExpenseManager />} />
        
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
