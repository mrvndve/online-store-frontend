import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Badge,
} from '@mui/material';
import { Button, SearchField } from '../../components';
import { 
  Menu as MenuIcon,
  AccountCircleOutlined,
  AccountCircle,
  LogoutOutlined,
  FavoriteBorder,
  Call,
  Email,
  Facebook,
  Instagram,
  Twitter,
  LocationOn,
  InventoryOutlined,
  ShoppingCart,
} from '@mui/icons-material';
import { isEmpty } from 'lodash';
import { getCustomer, PRIMARY_COLOR } from '../../utils';
import useCustomerHeader from '../../hooks/use-customer-header';
import MessengerCustomerChat from 'react-messenger-customer-chat';

const CustomerPageLayout = ({ children }) => {
  const {
    handleDrawerToggle,
    handleOpenAccMenu,
    handleCloseAccMenu,
    handleLogout,
    mobileOpen,
    openAccMenu,
    navigate,
    anchor,
    resetPasswordToken,
    cartCount,
    loggedIn,
    handleSearchChange,
    handleClickSearch,
    search,
    handleKeyDownSearch,
  } = useCustomerHeader();

  const drawerWidth = 240;

  const NON_HOMEPAGE_ROUTES = [
    '/login',
    '/sign-up',
    '/forgot-password',
    `/reset-password/${resetPasswordToken}`,
  ];

  const drawer = (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 'bold' }}>
        <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          UMAL
        </span>
      </Typography>

      <Divider />

      <List>
        <ListItem>
          <SearchField 
            style={{
              backgroundColor: 'whitesmoke',
              color: 'black',
              height: 40,
            }}
            placeholder='Search Product'
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            onKeyDown={(e) => handleKeyDownSearch(e)}
            handleClickSearch={() => handleClickSearch()}
          />
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton 
            sx={{ textAlign: 'center' }} 
            onClick={() => {
              handleDrawerToggle();
              navigate('/collections');
            }}
          >
            <ListItemText primary={<strong>Shop Now</strong>} />
          </ListItemButton>
        </ListItem>

        {(!loggedIn) && (
          <>
            <ListItem disablePadding>
              <ListItemButton 
                sx={{ textAlign: 'center' }} 
                onClick={() => {
                  handleDrawerToggle();
                  navigate('/login');
                }}
              >
                <ListItemText primary={<strong>Login</strong>} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton 
                sx={{ textAlign: 'center' }} 
                onClick={() => {
                  handleDrawerToggle();
                  navigate('/sign-up');
                }}
              >
                <ListItemText primary={<strong>Sign Up</strong>} />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return <>
    <Box>
      <CssBaseline />

      <AppBar component="nav">
        <Toolbar
          sx={{ bgcolor: PRIMARY_COLOR.bgColor, color: 'white' }}
        > 
          {!NON_HOMEPAGE_ROUTES.includes(window.location.pathname) && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 'bold' }}
          >
            <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
              UMAL
            </span>
          </Typography>

          {!NON_HOMEPAGE_ROUTES.includes(window.location.pathname) && (
            <>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }} className='mx-4'>
                <Button
                  variant='text'
                  style={{
                    fontWeight: 'bold', 
                    color: 'white',
                  }}
                  onClick={() => navigate('/collections')}   
                >
                  Shop Now
                </Button>
              </Box>
              
              <Box sx={{ display: { xs: 'none', sm: 'block' } }} className='mx-4'>
                <SearchField 
                  style={{
                    backgroundColor: 'whitesmoke',
                    color: 'black',
                    height: 40,
                  }}
                  placeholder='Search Product'
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onKeyDown={(e) => handleKeyDownSearch(e)}
                  handleClickSearch={() => handleClickSearch()}
                />
              </Box>

              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                {(!loggedIn) ? (
                  <>
                    <Button
                      variant='text'
                      style={{
                        fontWeight: 'bold', 
                        color: 'white',
                      }}
                      onClick={() => navigate('/login')}
                    >
                      Login
                    </Button>
                    
                    /
                    
                    <Button
                      variant='text'
                      style={{
                        fontWeight: 'bold', 
                        color: 'white',
                      }} 
                      onClick={() => navigate('/sign-up')}
                    >
                      Sign Up
                    </Button>
                  </>
                ) : (
                  <>
                    <IconButton aria-label="cart" onClick={() => navigate('/cart')}>
                      <Badge badgeContent={cartCount} color='error'>
                        <ShoppingCart style={{ color: 'white' }}/>
                      </Badge>
                    </IconButton>

                    <Button
                      variant='text'
                      style={{ 
                        backgroundColor: PRIMARY_COLOR.bgColor, 
                        fontWeight: 'bold', 
                        color: PRIMARY_COLOR.txtColor, 
                      }}
                      startIcon={<AccountCircle style={{ fontSize: 30 }}/>}
                      onClick={(e) => handleOpenAccMenu(e)}
                    >
                      {getCustomer().userName}
                    </Button>
                  </>
                )}
              </Box>

              <Box sx={{ display: { sm: 'none' } }}>
                {(localStorage.getItem('token') && !isEmpty(localStorage.getItem('token'))) && (
                  <Button
                    variant='text'
                    style={{ 
                      backgroundColor: PRIMARY_COLOR.bgColor, 
                      fontWeight: 'bold', 
                      color: PRIMARY_COLOR.txtColor, 
                    }}
                    startIcon={<AccountCircle style={{ fontSize: 30 }}/>}
                    onClick={(e) => handleOpenAccMenu(e)}
                  >
                    {getCustomer().userName}
                  </Button>
                )}      
              </Box>

              <Menu
                anchorEl={anchor}
                id="account-menu"
                open={openAccMenu}
                onClose={() => handleCloseAccMenu()}
                onClick={() => handleCloseAccMenu()}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    width: 240,
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem 
                  style={{ fontSize: 16 }}
                  onClick={() => navigate('/my-profile')}
                >
                  <AccountCircleOutlined className='me-3'/> 
                  <strong>My Account</strong>
                </MenuItem>

                <MenuItem 
                  style={{ fontSize: 16 }}
                  onClick={() => navigate('/my-purchases')}
                >
                  <InventoryOutlined className='me-3'/> 
                  <strong>My Purchases</strong>
                </MenuItem>

                <MenuItem 
                  style={{ fontSize: 16 }}
                  onClick={() => navigate('/my-wishlist')}
                >
                  <FavoriteBorder className='me-3'/> 
                  <strong>My Wishlist</strong>
                </MenuItem>

                <MenuItem 
                  style={{ fontSize: 16 }} 
                  onClick={() => handleLogout()}
                >
                  <LogoutOutlined className='me-3'/> 
                  <strong>Logout</strong>
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box component="main">
        <Toolbar />

        <Box 
          className={
            NON_HOMEPAGE_ROUTES.includes(window.location.pathname) 
            ? 'non-customer-page-container' 
            : 'customer-page-container'
          }
        >
          {children}

          <MessengerCustomerChat
            pageId='116110791457266'
            appId='2474633629358537'
          />,
        </Box>

        <Box
          className='footer'
          sx={{
            width: '100%',
            backgroundColor: PRIMARY_COLOR.bgColor,
            color: 'white',
          }}
        >
          <div className='row g-5'>
            <div className='col-sm-12 col-md-6 col-lg-4 col-xl-5'>
              <div className='mb-4'>
                <h5>
                  <strong>
                    Branches
                  </strong>
                </h5>
              </div>

              <div className='mb-3'>
                <LocationOn className='me-2'/> 
                Block 1 Lot 33 Grand Cypress HomeOutlineds Tungkong Mangga, San Jose del Monte, Philippines
              </div>

              <div className='mb-3'>
                <LocationOn className='me-2'/>
                196 Kaypandan St. Canumay West 1443 Valenzuela, Philippines
              </div>

              <div className='mb-3'>
                <LocationOn className='me-2'/>
                868 PARTIDA 1301 Norzagaray, Philippines
              </div>

              <div className='mb-2'>
                <LocationOn className='me-2'/>
                MacArthur Hwy, Urdaneta, 2428 Pangasinan
              </div>
            </div>

            <div className='col-sm-12 col-md-6 col-lg-4 col-xl-3'>
              <div className='mb-4'>
                <h5>
                  <strong>
                    Contact
                  </strong>
                </h5>
              </div>

              <div className='mb-3'>
                <Call className='me-2'/> 
                09264753651
              </div>

              <div>
                <Email className='me-2'/> 
                gajultos.garry123@gmail.com
              </div>
            </div>

            <div className='col-sm-12 col-md-6 col-lg-4 col-xl-2'>
              <div className='mb-4'>
                <h5>
                  <strong>
                    Payment Methods
                  </strong>
                </h5>
              </div>

              <div className='mb-3'>
                Cash on Delivery(COD)
              </div>

              <div className='mb-2'>
                Gcash
              </div>
            </div>

            <div className='col-sm-12 col-md-6 col-lg-4 col-xl-2'>
              <div className='mb-4'>
                <h5>
                  <strong>
                    Follow Us
                  </strong>
                </h5>
              </div>

              <div className='mb-2'>
                <Facebook
                  className='me-3'
                  style={{ cursor: 'pointer'}}
                  onClick={() => window.open('https://www.facebook.com/Umalmarketing')}
                />

                <Instagram 
                  className='me-3'
                  style={{ cursor: 'pointer'}}
                  onClick={() => window.open('https://www.facebook.com/Umalmarketing')}
                />
                
                <Twitter
                  className='me-3'
                  style={{ cursor: 'pointer'}}
                  onClick={() => window.open('https://www.facebook.com/Umalmarketing')}
                />
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </Box>
  </>
};

export default CustomerPageLayout;