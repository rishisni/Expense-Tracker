import { useContext, useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("User changed:", user);
  }, [user]); 

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate("/login");
  };

  const menuItems = user
    ? user.role === "admin"
      ? [
          { label: "Home", path: "/" },
          { label: "Dashboard", path: "/dashboard" },
          { label: "Users", path: "/users" },
          { label: "Categories", path: "/categories" },
          { label: "Stats", path: "/stats" },
        ]
      : [
          { label: "Home", path: "/" },
          { label: "Dashboard", path: "/dashboard" },
          { label: "My Expenses", path: "/expenses" },
        ]
    : [
        { label: "Home", path: "/" },
        { label: "Login", path: "/login" },
        { label: "Register", path: "/register" },
      ];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Expense Tracker
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {menuItems.map((item) => (
              <Button key={item.path} color="inherit" component={Link} to={item.path}>
                {item.label}
              </Button>
            ))}
            {user && (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Box>

          <IconButton edge="end" color="inherit" sx={{ display: { xs: "block", md: "none" } }} onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
        <List sx={{ width: 250 }}>
          {menuItems.map((item) => (
            <ListItem 
              button 
              key={item.path} 
              component={Link} 
              to={item.path} 
              onClick={() => setMobileOpen(false)}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
          {user && (
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
