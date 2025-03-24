import { Box, Typography, useTheme } from "@mui/material";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        marginTop:"10vh",
        bottom: 0, // Stick to the bottom
        left: 0,
        width: "100%", // Full width
        textAlign: "center",
        py: 2,
        backgroundColor: theme.palette.success.main,
        color: theme.palette.text.primary,
        boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)", // Optional shadow effect
      }}
    >
      <Typography variant="body2" display="flex" alignItems="center" justifyContent="center">
        <LaptopMacIcon sx={{ mr: 1 }} /> Developed by Rishabh Saini &copy; {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;

