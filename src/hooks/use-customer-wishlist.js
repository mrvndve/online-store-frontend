import { useEffect, useState } from 'react';

import axios from 'axios';

import { 
  getCustomer,
  toastError, 
  toastSuccess,
} from '../utils';

const useCustomerWishlist = () => {
  const [wishList, setWishList] = useState([]);

  const fetchWishlist = async () => {
    await axios.get(`/customer/wishlists/${getCustomer().id}`)
      .then(({data}) => {
        setWishList(data.data);
      })
      .catch(err => {
        toastError(err.message);
      });
  }

  const addToCart = async (product) => {
    const apiData = {
      customer: getCustomer().id,
      product: product.id,
      quantity: 1,
      variant: product.variations.length > 0 ? product.variations[0] : null,
    };

    await axios.post('/customer/add-to-cart', apiData)
      .then(({data}) => {
        toastSuccess(data.message);
      })
      .catch(err => {
        toastError(err.message);
      });
  };

  const removeToWishList = async (wishlistId, index) => {
    await axios.post('/customer/remove-to-wishlist', { id: wishlistId })
      .then(({data}) => {
        toastSuccess(data.message);
        const tempArr = [...wishList];
        tempArr.splice(index, 1);
        setWishList(tempArr);
      })
      .catch(err => {
        toastError(err.message);
      });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    fetchWishlist();
  }, []);

  return {
    wishList,
    addToCart,
    removeToWishList,
  };
};

export default useCustomerWishlist;