import { Button, Card } from '../../../components';

import { 
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from '@mui/material';

import {
  AccountCircleOutlined,
  AccountCircle,
  LogoutOutlined,
  ShoppingBagOutlined,
  HomeOutlined,
  FavoriteBorder,
  InventoryOutlined,
  ShoppingCartOutlined,
} from '@mui/icons-material'
import { PRIMARY_COLOR_YELLOW, getCustomer } from '../../../utils';

import { useNavigate } from 'react-router';

const SideMenu = () => {
  const navigate = useNavigate();

  const MY_ACCOUNT_ROUTES = [
    '/my-profile',
    '/my-address',
    '/my-bank-and-cards',
    '/my-password',
  ]; 

  return <>
    <div>
      <Card padding={30}>
        <div className='mb-4' align='center'>
          <div>
            <AccountCircle style={{ fontSize: 100 }}/>
          </div>

          <div>
            <strong>
              {getCustomer().userName}
            </strong>
          </div>
        </div>

        <div className='mb-4'>
          <Typography
            sx={{
              cursor: 'pointer',
              ':hover': {
                color: PRIMARY_COLOR_YELLOW.bgColor,
              },
              color: MY_ACCOUNT_ROUTES.includes(window.location.pathname) ? PRIMARY_COLOR_YELLOW.bgColor : 'black',
            }}
            fontWeight='bold' 
            variant='body1' 
            component='div'
            onClick={() => navigate('/my-profile')}
          >
            <AccountCircleOutlined className='me-2'/> 
            My Account
          </Typography>

          <Typography
            sx={{
              cursor: 'pointer',
              marginTop: 1,
              marginLeft: 4.5,
              ':hover': {
                color: PRIMARY_COLOR_YELLOW.bgColor,
              },
              color: window.location.pathname === '/my-profile' ? PRIMARY_COLOR_YELLOW.bgColor : 'black',
            }}
            variant='body1' 
            component='div'
            onClick={() => navigate('/my-profile')}
          >
            Profile
          </Typography>

          <Typography
            sx={{
              cursor: 'pointer',
              marginTop: 1,
              marginLeft: 4.5,
              ':hover': {
                color: PRIMARY_COLOR_YELLOW.bgColor,
              },
              color: window.location.pathname === '/my-address' ? PRIMARY_COLOR_YELLOW.bgColor : 'black',
            }}
            variant='body1' 
            component='div'
            onClick={() => navigate('/my-address')}
          >
            Address
          </Typography>

          <Typography
            sx={{
              cursor: 'pointer',
              marginTop: 1,
              marginLeft: 4.5,
              ':hover': {
                color: PRIMARY_COLOR_YELLOW.bgColor,
              },
              color: window.location.pathname === '/my-password' ? PRIMARY_COLOR_YELLOW.bgColor : 'black',
            }}
            variant='body1' 
            component='div'
            onClick={() => navigate('/my-password')}
          >
            Password
          </Typography>
        </div>

        <div className='mb-4'>
          <Typography
            sx={{
              cursor: 'pointer',
              ':hover': {
                color: PRIMARY_COLOR_YELLOW.bgColor,
              },
              color: window.location.pathname === '/my-purchases' ? PRIMARY_COLOR_YELLOW.bgColor : 'black',
            }}
            fontWeight='bold' 
            variant='body1' 
            component='div'
            onClick={() => navigate('/my-purchases')}
          >
            <InventoryOutlined className='me-2'/> 
            My Purchases
          </Typography>
        </div>

        <div>
          <Typography
            sx={{
              cursor: 'pointer',
              ':hover': {
                color: PRIMARY_COLOR_YELLOW.bgColor,
              },
              color: window.location.pathname === '/my-wishlist' ? PRIMARY_COLOR_YELLOW.bgColor : 'black',
            }}
            fontWeight='bold' 
            variant='body1' 
            component='div'
            onClick={() => navigate('/my-wishlist')}
          >
            <FavoriteBorder className='me-2'/> 
            My Wishlist
          </Typography>
        </div>
      </Card>
    </div>
  </>
};

export default SideMenu;