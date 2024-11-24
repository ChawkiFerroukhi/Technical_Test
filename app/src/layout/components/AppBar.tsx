import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { ArrowDropDown as ArrowDropDownIcon } from '@mui/icons-material';
import { MouseEvent, useState } from 'react';

export default function AppBarComponent() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  function handleMenuOpen (event: MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  };

  function handleMenuClose() {
    setAnchorEl(null);
  };

  function handleLogout() {
    console.log('Logout clicked');
    handleMenuClose();
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
