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

const useForgotPassword = () => {
  const [isEmailed, setIsEmailed] = useState('');
  const [apiValidationError, setApiValidationError] = useState('');

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await axios.post('/admin/forgot-password', data)
      .then(({data}) => {
        setIsEmailed(true);
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          setApiValidationError(response.data.errors);
        } else if (response.status === 500) {
          toastError(response.data.message);
        }
      });
  };

  return {
    navigate,
    register,
    fieldErrors: errors,
    onSubmit,
    handleSubmit,
    apiValidationError,
    isEmailed,
  };
};

export default useForgotPassword;