import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Clínica Salud Total
          </Typography>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default Layout;