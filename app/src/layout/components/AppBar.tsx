import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { ArrowDropDown as ArrowDropDownIcon } from '@mui/icons-material';
import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AppBarComponent() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  function handleMenuOpen(event: MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  };

  function handleMenuClose() {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem('authToken');

    // Navigate to login page
    navigate('/login');
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'black', color: 'white' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Products
        </Typography>
        <IconButton color="inherit" onClick={handleMenuOpen}>
          <ArrowDropDownIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
