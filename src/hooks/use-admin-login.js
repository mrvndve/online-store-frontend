import {
  useEffect,
  useState,
} from 'react';

import {
  useNavigate,
} from 'react-router';

import {
  axiosUrl,
  toastError, 
} from '../utils';

import { useForm } from 'react-hook-form';

import axios from 'axios';

const useAdminLogin = () => {
  const [token, setToken] = useState(null);
  const [apiValidationError, setApiValidationError] = useState('');

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await axios.post('/admin/login', data)
      .then(({data}) => {
        const {
          token,
          user
        } = data;

        setToken(token);

        localStorage.clear();
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('loggedInAs', 'Admin');
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          setApiValidationError(response.data.message);
        } else if (response.status === 500) {
          toastError(response.data.message);
        }
      });
  };

  useEffect(() => {
    if (token) {
      navigate('/admin');
      window.location.reload();
    }
  }, [token])

  return {
    navigate,
    register,
    fieldErrors: errors,
    onSubmit,
    handleSubmit,
    apiValidationError,
  };
};

export default useAdminLogin;