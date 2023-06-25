import { useState, useEffect, } from 'react';
import { useForm } from 'react-hook-form';
import { toastError } from '../utils';
import { useNavigate } from 'react-router';
import axios from 'axios';

const useCustomerForgotPassword = () => {
  const [apiValidationErrors, setApiValidationErrors] = useState('');
  const [isEmailed, setIsEmailed] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    const apiData = {
      ...data,
    };

    await axios.post('/customer/forgot-password', apiData)
      .then(({data}) => {
        setIsEmailed(true);
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          setApiValidationErrors(response.data.errors);
        } else if (response.status === 500) {
          toastError(response.data.message);
        }
      });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return {
    register,
    fieldErrors: errors,
    onSubmit,
    handleSubmit,
    apiValidationErrors,
    isEmailed,
    navigate,
  };
};

export default useCustomerForgotPassword;