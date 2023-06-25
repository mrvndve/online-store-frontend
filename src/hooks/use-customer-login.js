import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toastError } from '../utils';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const useCustomerSignUp = () => {
  const [apiValidationErrors, setApiValidationErrors] = useState('');

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const token = localStorage.getItem('token');

  const onSubmit = async (data) => {
    const apiData = {
      ...data,
    };

    await axios.post('/customer/login', apiData)
      .then(({data}) => {
        navigate('/');
        const {
          token,
          user
        } = data;

        localStorage.clear();
        localStorage.setItem('token', token);
        localStorage.setItem('customer', JSON.stringify(user));
        localStorage.setItem('loggedInAs', 'Customer');

        navigate(searchParams.get('from') ? searchParams.get('from') : '/');
        location.reload();
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          setApiValidationErrors([{ login: response.data.message }]);
        } else if (response.status === 500) {
          toastError(response.data.message);
        }
      });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (token) {
      navigate('/');
    }
  }, [token])

  return {
    register,
    fieldErrors: errors,
    onSubmit,
    handleSubmit,
    apiValidationErrors,
  };
};

export default useCustomerSignUp;