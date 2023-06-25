import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getCustomer, toastError, } from '../utils';
import { isEmpty } from 'lodash';
import { useSearchParams } from 'react-router-dom';

const useCustomerHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [anchor, setAnchor] = useState(null);

  const [cartCount, setCartCount] = useState(0);

  const [search, setSearch] = useState('');
  
  const openAccMenu = Boolean(anchor);

  const { resetPasswordToken } = useParams();

  const navigate = useNavigate();

  const loggedIn = localStorage.getItem('token') 
    && !isEmpty(localStorage.getItem('token')) 
    && localStorage.getItem('loggedInAs') === 'Customer';

  const [searchParams] = useSearchParams();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenAccMenu = (e) => {
    setAnchor(e.currentTarget);
  };

  const handleCloseAccMenu = () => {
    setAnchor(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const scrollIntoView = (id) => {
    navigate('/')
    
    setTimeout(() => {
      document.getElementById(id).scrollIntoView();
    }, 10);
  };

  const handleSearchChange = (value) => {
    setSearch(value);
  };

  const handleClickSearch = () => {
    if (search === '') {
      navigate('/collections');
    } else {
      navigate(`/collections?search=${search}`);
      location.reload();
    }
  };

  const handleKeyDownSearch = (e) => {
    if (e.key === 'Enter') {
      handleClickSearch();
    }
  };

  const fetchUserCartCount = async () => {
    await axios.get(`/customer/cart-count/${getCustomer().id}`)
      .then(({data}) => {
        setCartCount(data.data);
      })
      .catch(err => {
        toastError(err.message);
      });
  };

  useEffect(() => {
    if (searchParams.get('search')) {
      setSearch(searchParams.get('search'));
    }

    if (loggedIn) {
      fetchUserCartCount();
    }
  }, []);

  return {
    handleDrawerToggle,
    handleOpenAccMenu,
    handleCloseAccMenu,
    handleLogout,
    scrollIntoView,
    handleSearchChange,
    handleClickSearch,
    handleKeyDownSearch,

    loggedIn,
    mobileOpen,
    openAccMenu,
    anchor,
    navigate,
    resetPasswordToken,
    cartCount,
    search,
  };
};

export default useCustomerHeader;