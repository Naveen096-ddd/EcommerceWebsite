import React, { useState, useMemo } from 'react';
import {
  Box, Drawer, List, ListItemIcon, ListItemText, IconButton,
  AppBar, Toolbar, Typography, Avatar, Button, CssBaseline, Tooltip,
  useMediaQuery, useTheme, ListItemButton,
} from '@mui/material';
import {
  Menu as MenuIcon, Home as HomeIcon, ShoppingCart as ShoppingCartIcon,
  Favorite as FavoriteIcon, AccountCircle as AccountCircleIcon,
  Payment as PaymentIcon, LocationOn as LocationOnIcon, Help as HelpIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { DarkMode, WbSunny } from '@mui/icons-material';
const drawerWidth = 240;
const UserDashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('Dashboard');
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [username, setUsername] = useState("John Doe");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
    const handleMenuItemClick = (text) => {
    setSelectedMenuItem(text);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <HomeIcon />, tooltip: 'Dashboard Overview' },
    { text: 'Orders', icon: <ShoppingCartIcon />, tooltip: 'Orders' },
    { text: 'Wishlist', icon: <FavoriteIcon />, tooltip: 'Wishlist' },
    { text: 'Cart', icon: <ShoppingCartIcon />, tooltip: 'Cart' },
    { text: 'AccountSettings', icon: <AccountCircleIcon />, tooltip: 'Account Settings' },
    { text: 'Addresses', icon: <LocationOnIcon />, tooltip: 'Addresses' },
    { text: 'PaymentMethods', icon: <PaymentIcon />, tooltip: 'Payment Methods' },
    { text: 'Support', icon: <HelpIcon />, tooltip: 'Support / Help' },
  ];
  const handleToggleSidebar = () => setSidebarVisible(!sidebarVisible);
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };
  const handleToggleDarkMode = () => setDarkMode(!darkMode);
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
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            width: sidebarVisible ? `calc(100% - ${drawerWidth}px)` : '100%',
            ml: sidebarVisible ? `${drawerWidth}px` : 0,
            transition: 'width 0.3s, margin-left 0.3s, background 0.3s',
            background: darkMode ? '#1f1f1f' : 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
            height: '100px',
          }}
        >
          <Toolbar sx={{ marginTop: '20px' }}>
            <IconButton edge="start" color="inherit" onClick={handleToggleSidebar}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, fontSize: isSmallScreen ? "24px" : "30px",marginLeft: '10px' }}>
              E-Commerce 
            </Typography>
            <IconButton color="inherit" sx={{ width: 50, height: 50 }}><NotificationsIcon /></IconButton>
            <IconButton color="inherit" sx={{ width: 50, height: 50 }} onClick={handleToggleDarkMode}>
              {darkMode ? <WbSunny /> : <DarkMode />}
            </IconButton>
            <Button color="inherit" sx={{ fontSize: 18 }} onClick={handleLogout} startIcon={<AccountCircleIcon />}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
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
                <Avatar sx={{ width: 70, height: 70, mr: 1 }}>{username.charAt(0)}</Avatar>
                <Typography variant="h6">{username}</Typography>
              </Box>
              <List>
                {menuItems.map((item) => (
                  <Tooltip key={item.text} title={item.tooltip} placement="right">
                    <ListItemButton
                      onClick={() => handleMenuItemClick(item.text)}
                      selected={selectedMenuItem === item.text}
                      sx={{
                        borderRadius: 1,
                        mb: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'linear-gradient(to right, #1e3a8a, #3b82f6, #06b6d4)',
                          color: '#fff',
                          '& .MuiListItemIcon-root': { color: '#fff' },
                        },
                        '&.Mui-selected': {
                          background: 'linear-gradient(to right, #1e3a8a, #3b82f6, #06b6d4)',
                          color: '#fff',
                          '& .MuiListItemIcon-root': { color: '#fff' },
                        },
                      }}
                    >
                      <ListItemIcon sx={{ color: selectedMenuItem === item.text ? '#fff' : 'inherit' }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.text.replace(/([A-Z])/g, ' $1').trim()} />
                    </ListItemButton>
                  </Tooltip>
                ))}
              </List>
            </Box>
          </Drawer>
        )}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 0,
            mt: '100px',
            width: '100%',
            transition: 'margin-left 0.3s, width 0.3s',
          }}
        >
          <div style={{ width: '100%' }}>
            {selectedMenuItem === 'Dashboard' && <div style={{ padding: 20, borderRadius: 8, background: darkMode ? '#1f1f1f' : '#fff' }}>Dashboard Overview / Home Content</div>}
            {selectedMenuItem === 'Orders' && <div style={{ padding: 20, borderRadius: 8, background: darkMode ? '#1f1f1f' : '#fff' }}>Orders</div>}
            {selectedMenuItem === 'Wishlist' && <div style={{ padding: 20, borderRadius: 8, background: darkMode ? '#1f1f1f' : '#fff' }}>Wishlist Items</div>}
            {selectedMenuItem === 'Cart' && <div style={{ padding: 20, borderRadius: 8, background: darkMode ? '#1f1f1f' : '#fff' }}>Cart Items</div>}
            {selectedMenuItem === 'AccountSettings' && <div style={{ padding: 20, borderRadius: 8, background: darkMode ? '#1f1f1f' : '#fff' }}>Account Settings Form</div>}
            {selectedMenuItem === 'Addresses' && <div style={{ padding: 20, borderRadius: 8, background: darkMode ? '#1f1f1f' : '#fff' }}>Saved Addresses</div>}
            {selectedMenuItem === 'PaymentMethods' && <div style={{ padding: 20, borderRadius: 8, background: darkMode ? '#1f1f1f' : '#fff' }}>Payment Methods</div>}
            {selectedMenuItem === 'Support' && <div style={{ padding: 20, borderRadius: 8, background: darkMode ? '#1f1f1f' : '#fff' }}>Support / Help Section</div>}
          </div>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default UserDashboard;