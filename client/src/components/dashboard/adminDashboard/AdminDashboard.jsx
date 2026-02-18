import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Button,
  CssBaseline,
  Tooltip,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  Store as StoreIcon,
  People as PeopleIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  Notifications as NotificationsIcon,
  Brightness4,
  Brightness7,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import {getAdminDashApi} from "../../../apis/Api";
import  axiosInstance  from "../../../apis/axiosInstancs.js";
import Home from "./adminPages/Home.jsx";
import Orders from "./adminPages/Orders.jsx";

const expandedWidth = 250;
const collapsedWidth = 80;

const AdminDashboard = () => {

  const navigate = useNavigate();

  const [selectedMenuItem, setSelectedMenuItem] = useState("Dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [admin, setAdmin] = useState(null);
  const [orders, setOrders] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const open = Boolean(anchorEl);
  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );
  const handleMenuItemClick = (label) => setSelectedMenuItem(label);
  const handleToggleSidebar = () => setCollapsed((p) => !p);
  const handleLogout = () => {
    Cookies.remove("token");
    // localStorage.clear();
    window.location.href = '/';
  };
useEffect(() => {
  const token = localStorage.getItem("token");   // ✅ FIX
  console.log("Token in UserDashboard:", token);

  if (!token) {
    navigate("/");
    return;
  }

  try {
    const decoded = jwtDecode(token);
    console.log("Decoded token:", decoded);

    if (decoded.role !== "admin") {
      navigate("/");
      return;
    }

    setRole(decoded.role);

    getAdminDashApi()
      .then((res) => {
        console.log("AdminDash:", res.data);
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

  const handleNotificationClick = (e) => setAnchorEl(e.currentTarget);
  const handleNotificationClose = () => setAnchorEl(null);
  // if (!admin) {
  //   return <Typography sx={{ p: 3 }}>Loading admin data...</Typography>;
  // }
  const menuItems = [
    { label: "Dashboard", icon: <DashboardIcon /> },
    { label: "Orders", icon: <ShoppingCartIcon /> },
    { label: "Products", icon: <StoreIcon /> },
    { label: "Customers", icon: <PeopleIcon /> },
    { label: "Reports", icon: <BarChartIcon /> },
    { label: "Settings", icon: <SettingsIcon /> },
    { label: "Support", icon: <HelpIcon /> },
  ];
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography sx={{ flexGrow: 1 }}>
              Welcome, {username}...
            </Typography>
            <IconButton color="inherit" onClick={handleNotificationClick}>
              <Badge color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleNotificationClose}
              PaperProps={{ sx: { width: 300 } }}
            >
              <Typography sx={{ px: 2, py: 1, fontWeight: "bold" }}>
                New Orders
              </Typography>
              {orders.length === 0 ? (
                <MenuItem disabled>No new orders</MenuItem>
              ) : (
                orders.map((order) => (
                  <MenuItem key={order.id}>
                    🛒 {order.product.name} — Qty {order.quantity}
                  </MenuItem>
                ))
              )}
            </Menu>
            <IconButton onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            <IconButton>
              <AccountCircleIcon />
            </IconButton>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: collapsed ? collapsedWidth : expandedWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: collapsed ? collapsedWidth : expandedWidth,
              marginTop: "90px",
              height: "calc(100vh - 90px)",
              background: darkMode ? "#1e1e1e" : "#fff",
              transition: "width 0.3s ease",
              overflowY: "auto",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            },
          }}
        >
          <Box sx={{ p: 1, position: "relative" }}>
            <IconButton
              onClick={handleToggleSidebar}
              sx={{
                position: "absolute",
                top: 1,
                right: collapsed ? 8 : 12,
                zIndex: 10,
                "&:hover": { background: "#1254a1" },
              }}
            >
              <MenuIcon />
            </IconButton>
            <List sx={{ mt: 6 }}>
              {menuItems.map((item) => (
                <Tooltip
                  key={item.label}
                  title={collapsed ? item.label : ""}
                  placement="right"
                >
                  <ListItemButton
                    selected={selectedMenuItem === item.label}
                    onClick={() => handleMenuItemClick(item.label)}
                    sx={{
                      justifyContent: collapsed ? "center" : "flex-start",
                      borderRadius: 2,
                      mb: 1,
                      px: collapsed ? 2 : 3,
                      position: "relative",
                      "&:hover": {
                        background:
                          "linear-gradient(to right, #1e3a8a, #3b82f6, #06b6d4)",
                        color: "#fff",
                        "& .MuiListItemIcon-root": { color: "#fff" },
                      },
                      "&.Mui-selected": {
                        background:
                          "linear-gradient(to right, #1e3a8a, #3b82f6, #06b6d4)",
                        color: "#fff",
                        "& .MuiListItemIcon-root": { color: "#fff" },
                      },
                    }}
                  >
                    {selectedMenuItem === item.label && (
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          bgcolor: "white",
                          borderRadius: "50%",
                          position: "absolute",
                          right: collapsed ? "50%" : 12,
                          transform: collapsed
                            ? "translateX(-50%)"
                            : "translateY(-50%)",
                          top: collapsed ? 12 : "50%",
                        }}
                      />
                    )}

                    <ListItemIcon
                      sx={{
                        minWidth: collapsed ? "auto" : "40px",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {!collapsed && <ListItemText primary={item.label} />}
                  </ListItemButton>
                </Tooltip>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginTop: "90px",
            transition: "all 0.3s ease",
            minHeight: "calc(100vh - 90px)",
          }}
        >
          {selectedMenuItem === "Dashboard" && (
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                background: darkMode ? "#1f1f1f" : "#fff",
              }}
            >
                <Home/>
            </Box>
          )}
          {selectedMenuItem === "Orders" && (
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                background: darkMode ? "#1f1f1f" : "#fff",
              }}
            >
              <Typography variant="h5">Orders Management</Typography>
              
                View all orders, filter by status, manage shipments.
              <Orders/>
            </Box>
          )}
          {selectedMenuItem === "Products" && (
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                background: darkMode ? "#1f1f1f" : "#fff",
              }}
            >
              <Typography variant="h5">Products</Typography>
              <Typography>Add, edit, delete products, manage inventory.</Typography>
            </Box>
          )}
          {selectedMenuItem === "Customers" && (
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                background: darkMode ? "#1f1f1f" : "#fff",
              }}
            >
              <Typography variant="h5">Customers</Typography>
              <Typography>View and manage customer accounts.</Typography>
            </Box>
          )}
          {selectedMenuItem === "Reports" && (
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                background: darkMode ? "#1f1f1f" : "#fff",
              }}
            >
              <Typography variant="h5">Reports</Typography>
              <Typography>
                Sales, revenue, top products, customer activity reports.
              </Typography>
            </Box>
          )}
          {selectedMenuItem === "Settings" && (
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                background: darkMode ? "#1f1f1f" : "#fff",
              }}
            >
              <Typography variant="h5">Settings</Typography>
              <Typography>
                Manage admin profile, permissions, notifications.
              </Typography>
            </Box>
          )}
          {selectedMenuItem === "Support" && (
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                background: darkMode ? "#1f1f1f" : "#fff",
              }}
            >
              <Typography variant="h5">Support</Typography>
              <Typography>Handle support tickets and FAQs.</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminDashboard;
