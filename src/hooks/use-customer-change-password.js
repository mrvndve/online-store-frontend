import { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';

import {
  getCustomer,
  toastError,
  toastSuccess,
} from '../utils';
import axios from 'axios';

const useCustomerChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [apiValidationErrors, setApiValidationErrors] = useState([]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async data => {
    const apiData = {
      ...data,
    };

    setLoading(true);

    await axios.post(`/customer/change-password/${getCustomer().id}`, apiData)
      .then(({data}) => {
        setLoading(false);
        toastSuccess(data.message);
        setApiValidationErrors([]);
        reset();
      })
      .catch(({response}) => {
        if (response.status === 422) {
          setApiValidationErrors(response.data.errors);
          setLoading(false);
        } else if (response.status === 500) {
          toastError(response.data.message);
          setLoading(false);
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
    loading,
    apiValidationErrors,
  };
};

export default useCustomerChangePassword;