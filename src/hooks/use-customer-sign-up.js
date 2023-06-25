import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toastError } from '../utils';
import { useNavigate } from 'react-router';
import axios from 'axios';

const useCustomerSignUp = () => {
  const [apiValidationErrors, setApiValidationErrors] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (data) => {
    const apiData = {
      ...data,
      region: '--',
      province: '--',
      city: '--',
      barangay: '--',
      postalCode: '--',
      street: '--',
      address: '--',
      contact: 0,
    };

    await axios.post('/customer/register', apiData)
      .then(({data}) => {
        setIsRegistered(true);
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

    // if (isRegistered) {
    //   loggedIn({ userName, password });
    // }
  }, []);

  return {
    register,
    fieldErrors: errors,
    onSubmit,
    handleSubmit,
    apiValidationErrors,
    password,
    handlePasswordChange,
    handleUserNameChange,
    isRegistered,
  };
};

export default useCustomerSignUp;