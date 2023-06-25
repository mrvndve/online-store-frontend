import { useState, useEffect } from 'react';
import { getCustomer, toastError, toastSuccess, } from '../utils';
import axios from 'axios';
import { useNavigate } from 'react-router';


const useCustomerHome = () => {
  const [categories, setCategories] = useState([]);
  const [newArrivalProducts, setNewArrivalProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const fetchCategories = async () => {
    await axios.get('/customer/categories')
      .then(({data}) => {
        setCategories(data.data);
      })
      .catch(err => {
        toastError(err.message);
      });
  };

  const fetchNewArrivalProducts = async () => {
    const apiData = {
      category: 'New Arrival',
      customer: localStorage.getItem('token') ? getCustomer().id : null
    };

    await axios.post('/customer/home-products', apiData)
      .then(({data}) => {
        setNewArrivalProducts(data.data);
      })
      .catch(err => {
        toastError(err.message);
      });
  }

  const fetchFeaturedProducts = async () => {
    const apiData = {
      category: 'Featured Products',
      customer: localStorage.getItem('token') ? getCustomer().id : null
    };

    await axios.post('/customer/home-products', apiData)
      .then(({data}) => {
        setFeaturedProducts(data.data);
      })
      .catch(err => {
        toastError(err.message);
      });
  }

  const addRemoveToWishList = async (product) => {
    if (!token) {
      navigate('/login');
    } else {
      const apiData = {
        customer: getCustomer().id,
        product: product.id,
      };

      await axios.post(`/customer/${!product.isAddedToWishLists ? 'add-to-wishlist' : 'remove-to-wishlist'}`, apiData)
        .then(({data}) => {
          fetchFeaturedProducts();
          fetchNewArrivalProducts();
        })
        .catch(err => {
          toastError(err.message);
        });
    }
  };

  const addToCart = async (product) => {
    if (!token) {
      navigate('/login');
    } else {
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
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchNewArrivalProducts();
    fetchFeaturedProducts();
  }, []);

  return {
    categories,
    setNewArrivalProducts,
    setFeaturedProducts,

    newArrivalProducts,
    featuredProducts,
    navigate,

    addRemoveToWishList,
    addToCart,
  };
};

export default useCustomerHome;