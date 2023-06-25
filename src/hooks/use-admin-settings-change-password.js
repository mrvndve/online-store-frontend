import { useState } from 'react';

import { useForm } from 'react-hook-form';

import axios from 'axios';

import {
  toastError,
  toastSuccess,
} from '../utils';

const useAdminSettingsChangePassword = () => {
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
    await axios.post('/settings/change-password', apiData)
      .then(({data}) => {
        setLoading(false);
        toastSuccess(data.message);
        reset();
        setApiValidationErrors([]);
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

  return {
    register,
    fieldErrors: errors,
    onSubmit,
    handleSubmit,
    loading,
    apiValidationErrors,
  }
};

export default useAdminSettingsChangePassword;