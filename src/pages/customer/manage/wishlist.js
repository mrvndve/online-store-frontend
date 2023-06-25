import { Fragment } from 'react';

import { 
  Button,
  Card,
  CheckBoxField,
  EmptyBanner,
  ProductCard,
} from '../../../components';

import {
  Box,
  Typography,
} from '@mui/material';

import SideMenu from './side-menu';

import useCustomerWishlist from '../../../hooks/use-customer-wishlist';
import { isEmpty } from 'lodash';

const CustomerWishlist = () => {
  const {
    wishList,
    addToCart,
    removeToWishList,
  } = useCustomerWishlist();

  return <>
    <div className='row g-4'>
      <div className='col-sm-12 col-md-12 col-lg-12 col-xl-2'>
        <SideMenu/>
      </div>

      <div className='col-sm-12 col-md-12 col-lg-12 col-xl-10'>
        <Card padding={30}>
          <div className='mb-3'>
            <Typography
              fontWeight='bold' 
              variant='body1' 
              component='div'
            >
              My Wishlist
            </Typography>

            <Typography
              variant='body2' 
              component='div'
            >
              Manage your wishlists
            </Typography>
          </div>

          <hr/>

          <div className='mt-4'>
           {!isEmpty(wishList)
              ? (
                <>
                  <div className='row g-4'>
                    {wishList && wishList.map((i, index) => (
                      <Fragment key={index}>
                        <div className='col-sm-12 col-md-12 col-lg-4 col-xl-3'>
                          <ProductCard {...{
                            product: i.product,
                            hasWishListButton: false,
                            addToCart,
                          }}/>

                          <div className='mt-3' align='right'>
                            <Button 
                              color='tertiary'
                              label='Remove to Wishlist'
                              onClick={() => removeToWishList(i.id, index)}
                            />
                          </div>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                </>
              )
              : (
                <EmptyBanner product text='No Products Found'/>
              )
           } 
          </div>
        </Card>
      </div>
    </div>
  </>
};

export default CustomerWishlist;