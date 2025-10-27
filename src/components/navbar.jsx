import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";

const pages = [
  { name: "Home", path: "/" },
  { name: "Add Movie", path: "/addmovie" },
  { name: "Login", path: "/login" },
  { name: "Signup", path: "/signup" },
];
const settings = ["Profile", "Logout"];

const ResponsiveAppBar = () => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(90deg, #1e3c72, #2a5298)",
        boxShadow: 3,
      }}
    >
      <Toolbar>
        {/* Logo / Brand Name */}
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            color: "#fff",
            letterSpacing: "1px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          🎬 MovieVerse
        </Typography>

        {/* Menu for larger screens */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          {pages.map((page) => (
            <Button
              key={page.name}
              onClick={() => navigate(page.path)}
              sx={{
                color: "#fff",
                fontWeight: 500,
                textTransform: "none",
                "&:hover": { color: "#ffd700" },
              }}
            >
              {page.name}
            </Button>
          ))}
        </Box>

        {/* User Avatar */}
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="User" src="/static/images/avatar/1.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            sx={{ mt: 1.5 }}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                {setting}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ResponsiveAppBar;
