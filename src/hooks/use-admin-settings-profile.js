import { useState } from 'react';

import { useForm } from 'react-hook-form';

import axios from 'axios';

import {
  toastError,
  toastSuccess,
  getUser,
} from '../utils';

const useAdminSettingsProfile = () => {
  const [loading, setLoading] = useState(false);
  const [apiValidationErrors, setApiValidationErrors] = useState([]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async data => {
    const apiData = {
      ...data,
    };
    
    setLoading(true);
    await axios.post(`/settings/update-profile`, apiData)
      .then(({data}) => {
        window.localStorage.setItem('user', JSON.stringify(data.data));
        setLoading(false);
        toastSuccess(data.message);
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
    userProfile: getUser(),
  }
};

export default useAdminSettingsProfile;