import React from 'react';

import useAdminHeader from '../../hooks/use-admin-header';

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@mui/material';

import {
  Menu,
  Logout,
} from '@mui/icons-material';

import { ConfirmationDialog, BreadCrumbs } from '../../components';

import { getUser, PRIMARY_COLOR } from '../../utils';

const Header = ({
  handleToggleDrawer,
  drawerWidth
}) => {
  const {
    handleOpenDialog,
    handleCloseDialog: handleClose,
    handleYes,
    openDialog,
    breadCrumbsLink,
  } = useAdminHeader();

  const {
    branch,
  } = getUser();

  return <>
    <AppBar
      position='fixed'
      elevation={1}
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar
        sx={{
          bgcolor: 'white',
          color: 'black',
        }}
      >
        {/* Mobile View */}
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={handleToggleDrawer}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <Menu/>
        </IconButton>

        <Typography
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { sm: 'none' } }}
        >
          <div className='mb-1'>
            <strong style={{ color: PRIMARY_COLOR.bgColor }}>
              BON TEA
            </strong>
          </div>

          <div>
            <BreadCrumbs links={breadCrumbsLink}/>
          </div>
        </Typography>

        {/* Web View */}
        <Typography
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          <div className='mb-1'>
            <strong style={{ color: PRIMARY_COLOR.bgColor }}>
              BON TEA
            </strong>
          </div>

          <div>
            <BreadCrumbs links={breadCrumbsLink}/>
          </div>
        </Typography>
      </Toolbar>
    </AppBar>

    <ConfirmationDialog {...{
      open: openDialog,
      title: 'Sign Out',
      message: 'Are you sure you want to sign out your account?',
      onClose: handleClose,
      onConfirm: handleYes,
    }}/>
  </>
}

export default Header;