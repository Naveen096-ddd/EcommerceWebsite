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
  Card,
  CardContent,
  Grid,
  Badge,
} from "@mui/material";

import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  Store as StoreIcon,
  People as PeopleIcon,
  BarChart as BarChartIcon,
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
import { getManagerDashApi } from "../../../apis/Api";
import Product from "./managerPages/Product";

const expandedWidth = 230;
const collapsedWidth = 80;

export default function ManagerDashboard() {
  const navigate = useNavigate();

  const [selectedMenuItem, setSelectedMenuItem] = useState("Dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [orders, setOrders] = useState([]);
  const [username, setUsername] = useState("");

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    try {
      const decoded = jwtDecode(token);

      if (decoded.role !== "manager") {
        navigate("/");
        return;
      }

      getManagerDashApi()
        .then((res) => {
          if (res.data?.success) {
            setUsername(res.data.username);
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
          navigate("/");
        });
    } catch {
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("token");
    navigate("/");
  };

  const menuItems = [
    { label: "Dashboard", icon: <DashboardIcon /> },
    { label: "Orders", icon: <ShoppingCartIcon /> },
    { label: "Products", icon: <StoreIcon /> },
    { label: "Customers", icon: <PeopleIcon /> },
    { label: "Reports", icon: <BarChartIcon /> },
    { label: "Support", icon: <HelpIcon /> },
  ];

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Toolbar />

      <Box sx={{ display: "flex" }}>
        {/* Top App Bar */}
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            backdropFilter: "blur(10px)",
            background: darkMode
              ? "linear-gradient(135deg, rgba(15,23,42,.85), rgba(2,132,199,.85))"
              : "linear-gradient(135deg, #0f172a, #0284c7)",
            borderBottom: "1px solid rgba(255,255,255,.15)",
          }}
        >
          <Toolbar>
            <Typography sx={{ flexGrow: 1, fontWeight: 700 }}>
              <Box component="span" sx={{ opacity: 0.7, ml: 1 }}>
                 Welcome, {username}
              </Box>
            </Typography>

            <IconButton sx={{ color: "#fff" }}>
              <Badge badgeContent={orders.length} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton sx={{ color: "#fff" }} onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>

            <IconButton sx={{ color: "#fff" }}>
              <AccountCircleIcon />
            </IconButton>

            <Button
              onClick={handleLogout}
              sx={{
                ml: 1,
                color: "#fff",
                border: "1px solid rgba(255,255,255,.3)",
                borderRadius: 2,
                px: 2,
                "&:hover": { background: "rgba(255,255,255,.1)" },
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: collapsed ? collapsedWidth : expandedWidth,
            "& .MuiDrawer-paper": {
              width: collapsed ? collapsedWidth : expandedWidth,
              top: 64,
              height: "calc(100vh - 64px)",
              background: darkMode
                ? "linear-gradient(180deg, #020617, #020617)"
                : "linear-gradient(180deg, #0f172a, #020617)",
              color: "#e5e7eb",
              borderRight: "1px solid rgba(255,255,255,.1)",
            },
          }}
        >
          <Box sx={{ p: 1, display: "flex", justifyContent: "flex-end" }}>
            <IconButton
              onClick={() => setCollapsed(!collapsed)}
              sx={{
                color: "#e5e7eb",
                "&:hover": { background: "rgba(255,255,255,.1)" },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <List>
            {menuItems.map((item) => (
              <Tooltip key={item.label} title={collapsed ? item.label : ""}>
                <ListItemButton
                  selected={selectedMenuItem === item.label}
                  onClick={() => setSelectedMenuItem(item.label)}
                  sx={{
                    borderRadius: 2,
                    mx: 1,
                    mb: 1,
                    color: "#e5e7eb",
                    "& .MuiListItemIcon-root": { color: "#93c5fd" },
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #1e3a8a, #0284c7, #06b6d4)",
                      boxShadow: "0 8px 20px rgba(14,165,233,.35)",
                    },
                    "&.Mui-selected": {
                      background:
                        "linear-gradient(135deg, #1e3a8a, #0284c7, #06b6d4)",
                      boxShadow: "0 10px 25px rgba(14,165,233,.45)",
                      "& .MuiListItemIcon-root": { color: "#fff" },
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                  {!collapsed && <ListItemText primary={item.label} />}
                </ListItemButton>
              </Tooltip>
            ))}
          </List>
        </Drawer>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            minHeight: "100vh",
            background: darkMode
              ? "radial-gradient(circle at top left, #020617, #020617)"
              : "radial-gradient(circle at top left, #e0f2fe, #f8fafc)",
          }}
        >
          {selectedMenuItem === "Dashboard" && ( <h1>Dashboard</h1>)}
          {selectedMenuItem === "Orders" && <h1>Orders</h1>}
          {selectedMenuItem === "Customers" && <h1>Customers</h1>}
          {selectedMenuItem === "Products" && (<Product/>)}
          {selectedMenuItem === "Analytics" && <h1>Analytics</h1>}
          {selectedMenuItem === "Settings" && <h1>Settings</h1>}
        </Box>
      </Box>
    </ThemeProvider>
  );
};
            // <Grid container spacing={3}>
            //   {[
            //     { t: "Total Orders", v: "124", c: "#38bdf8" },
            //     { t: "Revenue", v: "₹82,000", c: "#22c55e" },
            //     { t: "Pending", v: "9", c: "#f59e0b" },
            //     { t: "Customers", v: "560", c: "#a78bfa" },
            //   ].map((item) => (
            //     <Grid item xs={12} md={3} key={item.t}>
            //       <Card
            //         sx={{
            //           borderRadius: 4,
            //           backdropFilter: "blur(14px)",
            //           background: darkMode
            //             ? "rgba(15,23,42,.65)"
            //             : "rgba(255,255,255,.75)",
            //           border: "1px solid rgba(255,255,255,.15)",
            //           boxShadow: "0 20px 40px rgba(0,0,0,.15)",
            //           transition: "all .35s ease",
            //           "&:hover": {
            //             transform: "translateY(-8px) scale(1.01)",
            //             boxShadow: "0 30px 60px rgba(0,0,0,.25)",
            //           },
            //         }}
            //       >
            //         <CardContent>
            //           <Typography sx={{ opacity: 0.7, fontWeight: 600 }}>
            //             {item.t}
            //           </Typography>

            //           <Typography variant="h3" sx={{ fontWeight: 800, mt: 1 }}>
            //             {item.v}
            //           </Typography>

            //           <Box
            //             sx={{
            //               mt: 2,
            //               height: 4,
            //               width: 60,
            //               borderRadius: 999,
            //               background: item.c,
            //               boxShadow: `0 0 20px ${item.c}`,
            //             }}
            //           />
            //         </CardContent>
            //       </Card>
            //     </Grid>
            //   ))}
            // </Grid>
