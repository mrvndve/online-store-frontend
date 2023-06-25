import { useState } from 'react';

import SideBar from './sidebar';

import {
  Box,
  CssBaseline,
  Toolbar,
} from '@mui/material';

import Header from './header';

const AdminPageLayout = ({ children }) => {
  const drawerWidth = 240;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  return <>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline/>
      
      <Header {...{
        handleToggleDrawer,
        drawerWidth,
      }}/>

      <SideBar {...{
        handleToggleDrawer,
        mobileOpen,
        drawerWidth,
      }}/>

      <Box
        component='main'
        sx={{ 
          flexGrow: 1, 
          p: 4, 
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          backgroundColor: 'whitesmoke'
        }}
      >
        <Toolbar />

        {children}
      </Box>
    </Box>
  </>
};

export default AdminPageLayout;