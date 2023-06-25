import {
  useEffect,
  useState,
} from 'react';

import {
  useNavigate,
  useParams,
} from 'react-router';

import {
  toastError, 
} from '../utils';

import { useForm } from 'react-hook-form';

import axios from 'axios';

const useResetPassword = () => {
  const [isReset, setIsReset] = useState('');
  const [apiValidationError, setApiValidationError] = useState('');

  const {
    resetPasswordToken,
  } = useParams();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await axios.post(`/admin/reset-password/${resetPasswordToken}`, data)
      .then(({data}) => {
        setIsReset(true);
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
    isReset,
  };
};

export default useResetPassword;