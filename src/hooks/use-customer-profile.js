import {
  useState,
  useEffect,
} from 'react';

import { useForm } from 'react-hook-form';

import {
  getCustomer,
  toastError,
  toastSuccess,
} from '../utils';
import axios from 'axios';

const useCustomerProfile = () => {
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

    await axios.post(`/customer/update-profile/${getCustomer().id}`, apiData)
      .then(({data}) => {
        setLoading(false);
        toastSuccess(data.message);
        localStorage.setItem('customer', JSON.stringify(data.data));
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

export default useCustomerProfile;