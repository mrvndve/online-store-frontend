import { useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

const AdminProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const loggedInAs = localStorage.getItem('loggedInAs');

  const { resetPasswordToken, activateAccountToken } = useParams();

  const UNAUTH_ROUTES = [
    '/admin/login',
    '/admin/forgot-password',
    `/admin/reset-password/${resetPasswordToken}`,
    `/admin/activate-account/${activateAccountToken}`,
  ];

  useEffect(() => {
    if (!token) {
      if (!UNAUTH_ROUTES.includes(window.location.pathname)) {
        navigate('/admin/login');
      }
    } else {
      if (UNAUTH_ROUTES.includes(window.location.pathname)) {
        navigate('/admin');
      }
      
      if (loggedInAs === 'Customer') {
        navigate('/');
      }
    }
  }, [token, navigate]);

  return <>
    {children}
  </>
};

export default AdminProtectedRoutes;