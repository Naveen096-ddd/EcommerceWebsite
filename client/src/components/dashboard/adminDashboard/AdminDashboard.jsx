import React, { useState, useMemo } from 'react';
import {
  Box, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton,
  AppBar, Toolbar, Typography, Avatar, Button, CssBaseline, Tooltip,
  useMediaQuery, useTheme
} from '@mui/material';
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
  Brightness7
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 250;

const AdminDashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('Dashboard');
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [adminName, setAdminName] = useState("Admin");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleMenuItemClick = (menuItem) => setSelectedMenuItem(menuItem);
  const handleToggleSidebar = () => setSidebarVisible(!sidebarVisible);
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };
  const handleToggleDarkMode = () => setDarkMode(!darkMode);

  // Dynamic MUI theme
  const muiTheme = useMemo(() =>
    createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light',
        primary: { main: darkMode ? '#90caf9' : '#1976d2' },
        background: { default: darkMode ? '#121212' : '#f5f5f5' },
      },
    }), [darkMode]
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        {/* AppBar */}
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            width: sidebarVisible ? `calc(100% - ${drawerWidth}px)` : '100%',
            ml: sidebarVisible ? `${drawerWidth}px` : 0,
            transition: 'width 0.3s, margin-left 0.3s, background 0.3s',
            background: darkMode ? '#1f1f1f' : 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
            height: '90px',
          }}
        >
          <Toolbar sx={{ marginTop: '10px' }}>
            <IconButton edge="start" color="inherit" onClick={handleToggleSidebar}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, fontSize: isSmallScreen ? "22px" : "28px" }}>
              E-Commerce Admin Dashboard
            </Typography>
            <IconButton color="inherit"><NotificationsIcon /></IconButton>
            <IconButton color="inherit" onClick={handleToggleDarkMode}>
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            <Button color="inherit" onClick={handleLogout} startIcon={<Avatar>{adminName.charAt(0)}</Avatar>}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        {/* Sidebar */}
        {sidebarVisible && (
          <Drawer
            variant="persistent"
            anchor="left"
            open={sidebarVisible}
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                background: darkMode ? '#1e1e1e' : '#fff',
              },
              transition: 'background 0.3s'
            }}
          >
            <Toolbar />
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ width: 60, height: 60, mr: 1 }}>{adminName.charAt(0)}</Avatar>
                <Typography variant="h6">{adminName}</Typography>
              </Box>
              <List>
                <Tooltip title="Dashboard" placement="right">
                  <ListItem button onClick={() => handleMenuItemClick('Dashboard')} selected={selectedMenuItem === 'Dashboard'}>
                    <ListItemIcon><DashboardIcon /></ListItemIcon>
                    <ListItemText primary="Dashboard" />
                  </ListItem>
                </Tooltip>
                <Tooltip title="Orders" placement="right">
                  <ListItem button onClick={() => handleMenuItemClick('Orders')} selected={selectedMenuItem === 'Orders'}>
                    <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
                    <ListItemText primary="Orders" />
                  </ListItem>
                </Tooltip>
                <Tooltip title="Products" placement="right">
                  <ListItem button onClick={() => handleMenuItemClick('Products')} selected={selectedMenuItem === 'Products'}>
                    <ListItemIcon><StoreIcon /></ListItemIcon>
                    <ListItemText primary="Products" />
                  </ListItem>
                </Tooltip>
                <Tooltip title="Customers" placement="right">
                  <ListItem button onClick={() => handleMenuItemClick('Customers')} selected={selectedMenuItem === 'Customers'}>
                    <ListItemIcon><PeopleIcon /></ListItemIcon>
                    <ListItemText primary="Customers" />
                  </ListItem>
                </Tooltip>
                <Tooltip title="Reports" placement="right">
                  <ListItem button onClick={() => handleMenuItemClick('Reports')} selected={selectedMenuItem === 'Reports'}>
                    <ListItemIcon><BarChartIcon /></ListItemIcon>
                    <ListItemText primary="Reports" />
                  </ListItem>
                </Tooltip>
                <Tooltip title="Settings" placement="right">
                  <ListItem button onClick={() => handleMenuItemClick('Settings')} selected={selectedMenuItem === 'Settings'}>
                    <ListItemIcon><SettingsIcon /></ListItemIcon>
                    <ListItemText primary="Settings" />
                  </ListItem>
                </Tooltip>
                <Tooltip title="Support" placement="right">
                  <ListItem button onClick={() => handleMenuItemClick('Support')} selected={selectedMenuItem === 'Support'}>
                    <ListItemIcon><HelpIcon /></ListItemIcon>
                    <ListItemText primary="Support" />
                  </ListItem>
                </Tooltip>
              </List>
            </Box>
          </Drawer>
        )}

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: '90px', // AppBar height
            width: '100%',
            transition: 'margin-left 0.3s, width 0.3s',
          }}
        >
          <div style={{ width: '100%' }}>
            {selectedMenuItem === 'Dashboard' && (
              <div style={{ padding: 20, borderRadius: 8, background: darkMode ? '#1f1f1f' : '#fff' }}>
                <Typography variant="h5">Dashboard Overview</Typography>
                <Typography>Quick stats: Total Orders, Revenue, Customers, Products...</Typography>
              </div>
            )}
            {selectedMenuItem === 'Orders' && (
              <div style={{ padding: 20, borderRadius: 8, background: darkMode ? '#1f1f1f' : '#fff' }}>
                <Typography variant="h5">Orders Management</Typography>
                <Typography>View all orders, filter by status, manage shipments.</Typography>
              </div>
            )}
            {selectedMenuItem === 'Products' && (
              <div style={{ padding: 20, borderRadius: 8, background: darkMode ? '#1f1f1f' : '#fff' }}>
                <Typography variant="h5">Products</Typography>
                <Typography>Add, edit, delete products, manage inventory.</Typography>
              </div>
            )}
            {selectedMenuItem === 'Customers' && (
              <div style={{ padding: 20, borderRadius: 8, background: darkMode ? '#1f1f1f' : '#fff' }}>
                <Typography variant="h5">Customers</Typography>
                <Typography>View and manage customer accounts.</Typography>
              </div>
            )}
            {selectedMenuItem === 'Reports' && (
              <div style={{ padding: 20, borderRadius: 8, background: darkMode ? '#1f1f1f' : '#fff' }}>
                <Typography variant="h5">Reports</Typography>
                <Typography>Sales, revenue, top products, customer activity reports.</Typography>
              </div>
            )}
            {selectedMenuItem === 'Settings' && (
              <div style={{ padding: 20, borderRadius: 8, background: darkMode ? '#1f1f1f' : '#fff' }}>
                <Typography variant="h5">Settings</Typography>
                <Typography>Manage admin profile, permissions, notifications.</Typography>
              </div>
            )}
            {selectedMenuItem === 'Support' && (
              <div style={{ padding: 20, borderRadius: 8, background: darkMode ? '#1f1f1f' : '#fff' }}>
                <Typography variant="h5">Support</Typography>
                <Typography>Handle support tickets and FAQs.</Typography>
              </div>
            )}
          </div>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminDashboard;
