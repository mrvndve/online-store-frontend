import axios from 'axios';
import { useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { getCustomer, toastError } from '../utils';

const CustomerProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const { resetPasswordToken } = useParams();

  const loggedInAs = localStorage.getItem('loggedInAs');

  const UNAUTH_ROUTES = [
    '/login',
    '/sign-up',
    '/forgot-password',
    `/reset-password/${resetPasswordToken}`,
  ];

  const checkToPayPayments = async () => {
    axios.post('/customer/check-to-pay-transactions', { customer: getCustomer().id })
      .then(({data}) => {
        // console.log(data.message);
      })
      .catch(err => {
        toastError(err.message);
      })
  };

  useEffect(() => {
    if (token) {
      checkToPayPayments();

      if (UNAUTH_ROUTES.includes(window.location.pathname)) {
        navigate('/');
      }

      if (loggedInAs === 'Admin') {
        navigate('/admin');
      }
    }
  }, [token, navigate]);

  return <>
    {children}
  </>
};

export default CustomerProtectedRoutes;