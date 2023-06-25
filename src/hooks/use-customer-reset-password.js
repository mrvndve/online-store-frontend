import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toastError } from '../utils';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const useCustomerPasswordReset = () => {
  const [isReset, setIsReset] = useState('');
  const [apiValidationError, setApiValidationError] = useState('');
  const [password, setPassword] = useState('');

  const { resetPasswordToken } = useParams();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (data) => {
    await axios.post(`/customer/reset-password/${resetPasswordToken}`, data)
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return {
    navigate,
    register,
    fieldErrors: errors,
    onSubmit,
    handleSubmit,
    apiValidationError,
    isReset,
    handlePasswordChange,
    password,
  };
};

export default useCustomerPasswordReset;