import React, { useState, useMemo, useEffect } from "react";
import {Box,Drawer,List,ListItemButton,ListItemIcon,ListItemText,IconButton,AppBar,Toolbar,Typography,CssBaseline,Tooltip,Menu,MenuItem,Avatar,Badge,InputBase,} from "@mui/material";
import {Menu as MenuIcon,Home as HomeIcon,ShoppingCart as ShoppingCartIcon,Favorite as FavoriteIcon,AccountCircle as AccountCircleIcon,Payment as PaymentIcon,LocationOn as LocationOnIcon,Help as HelpIcon,Notifications as NotificationsIcon,Brightness4,Brightness7,Search as SearchIcon,Logout as LogoutIcon,} from "@mui/icons-material";
import { ThemeProvider, createTheme, alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../app/slices/authSlice";
import { InputAdornment } from "@mui/material";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import Dashboard from "./userPages/Dashboard";
import Orders from "./userPages/Orders";
import Wishlist from "./userPages/Wishlist";
import Cart from "./userPages/Cart";
import AccountSettings from "./userPages/AccountSettings";
import Addresses from "./userPages/Addresses";
import PaymentMethod from "./userPages/PaymentMethods";
import Support from "./userPages/Support";
import LiveChat from "./userPages/LiveChat";
import { getUserDashApi } from "../../../apis/Api";
const expandedWidth = 240;
const collapsedWidth = 80;
const UserDashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const openProfileMenu = Boolean(anchorEl);
  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: { main: darkMode ? "#90caf9" : "#1976d2" },
          background: {
            default: darkMode ? "#1f1f1f" : "#f5f5f5",
            paper: darkMode ? "#1e1e1e" : "#fff",
          },
        },
      }),
    [darkMode]
  );
  const menuItems = [
    { label: "Dashboard", icon: <HomeIcon /> },
    { label: "Orders", icon: <ShoppingCartIcon /> },
    {
      label: "Cart",
      icon: (
        <Badge badgeContent={3} color="error">
          <ShoppingCartIcon />
        </Badge>
      ),
    },
    { label: "Wishlist", icon: <FavoriteIcon /> },
    { label: "Addresses", icon: <LocationOnIcon /> },
    { label: "PaymentMethods", icon: <PaymentIcon /> },
    { label: "AccountSettings", icon: <AccountCircleIcon /> },
    { label: "Support", icon: <HelpIcon /> },
    {label: "Logout", icon: <LogoutIcon /> },
  ];
const handleLogout = () => {
  dispatch(logout());               
  localStorage.removeItem("token"); 
  localStorage.removeItem("role");
  localStorage.removeItem("email");
  navigate("/");
};
useEffect(() => {
  const token = localStorage.getItem("token");
  console.log("Token in UserDashboard:", token);
  if (!token) {
    navigate("/");
    return;
  }
  try {
    const decoded = jwtDecode(token);
    console.log("Decoded token:", decoded);
    if (decoded.role !== "user") {
      navigate("/");
      return;
    }
    setRole(decoded.role);
    getUserDashApi()
      .then((res) => {
        console.log("UserDash:", res.data);
        if (res.data?.success) {
          setUsername(res.data.username);
        }
        
      })
      .catch((err) => {
        console.error("UserDash API failed:", err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem("token");
          navigate("/");
        }
      });
  } catch (err) {
    console.error("JWT decode failed:", err);
    localStorage.removeItem("token");
    navigate("/");
  }
}, [navigate]);
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            height: 80,
            background: darkMode
              ? "#1f1f1f"
              : "linear-gradient(90deg, #6a11cb, #2575fc)",
          }}
        >
          <Toolbar sx={{ gap: 2 }}>
            <Typography sx={{ flexGrow: 1 }} variant="h6">
              Welcome back, {username}!
            </Typography>
            <Box
              sx={{
                px: 2,
                py: 0.5,
                borderRadius: 2,
                width: 260,
                background: alpha("#fff", darkMode ? 0.15 : 0.3),
              }}
            >
              <InputBase
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                fullWidth
                sx={{ color: "#fff" }}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
              />
            </Box>
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
            <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
              <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
            </IconButton>
            <Menu anchorEl={anchorEl} open={openProfileMenu} onClose={() => setAnchorEl(null)}>
              <MenuItem onClick={() => setSelectedMenuItem("AccountSettings")}>
                My Profile
              </MenuItem>
              <MenuItem onClick={() => setSelectedMenuItem("Orders")}>
                My Orders
              </MenuItem>
              <MenuItem onClick={() => setSelectedMenuItem("Wishlist")}>
                Wishlist
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: collapsed ? collapsedWidth : expandedWidth,
            "& .MuiDrawer-paper": {
              width: collapsed ? collapsedWidth : expandedWidth,
              mt: "80px",
              height: "calc(100vh - 80px)",
              transition: "0.3s",
            },
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
            <IconButton onClick={() => setCollapsed(!collapsed)}>
              <MenuIcon />
            </IconButton>
          </Box>
          <List>
            {menuItems.map((item) => (
              <Tooltip key={item.label} title={collapsed ? item.label : ""} placement="right">
                <ListItemButton
                  selected={selectedMenuItem === item.label}
                  onClick={() =>{if (item.label === "Logout") {
                      handleLogout();
                    } else {
                      setSelectedMenuItem(item.label);
                    }
                  }}
                  sx={{
                    mx: 1,
                    mb: 0.5,
                    borderRadius: 2,
                    "&:hover": {
                      backgroundColor: (theme) =>
                        alpha(theme.palette.primary.main, 0.12),
                    },
                    "&.Mui-selected": {
                      background: (theme) =>
                        darkMode
                          ? "linear-gradient(90deg, #42a5f5, #478ed1)"
                          : "linear-gradient(90deg, #6a11cb, #2575fc)",
                      color: "#fff",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                    },

                    "&.Mui-selected:hover": {
                      background: (theme) =>
                        darkMode
                          ? "linear-gradient(90deg, #64b5f6, #5c9ded)"
                          : "linear-gradient(90deg, #7a1fdc, #3a85ff)",
                    },
                    "&.Mui-selected .MuiListItemIcon-root": {
                      color: "#fff",
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {!collapsed && <ListItemText primary={item.label} />}
                  
                </ListItemButton>
                
              </Tooltip>
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: "80px" }}>
          {selectedMenuItem === "Dashboard" && <Dashboard search={search} />}
          {selectedMenuItem === "Orders" && <Orders search={search} />}
          {selectedMenuItem === "Wishlist" && <Wishlist search={search} />}
          {selectedMenuItem === "Cart" && <Cart search={search} />}
          {selectedMenuItem === "AccountSettings" && <AccountSettings />}
          {selectedMenuItem === "Addresses" && <Addresses />}
          {selectedMenuItem === "PaymentMethods" && <PaymentMethod />}
          {selectedMenuItem === "Support" && <Support />}
        </Box>
        <LiveChat />
      </Box>
    </ThemeProvider>
  );
};

export default UserDashboard;
