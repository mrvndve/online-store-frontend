import {
  useState,
  useEffect,
} from 'react';

import { useForm } from 'react-hook-form';

import { 
  useNavigate, 
  useParams,
  useLocation,
} from 'react-router';

import axios from 'axios';

import {
  getUser,
  toastError,
  toastSuccess,
} from '../utils';

const useDeliveryFee = () => {
  const [loading, setLoading] = useState(false);
  const [apiValidationErrors, setApiValidationErrors] = useState([]);

  const {
    formMode,
  } = useParams();

  const {
    state: selectedRow,
  } = useLocation();

  const navigate = useNavigate();

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
    await axios.post(`/branches/update-delivery-fee/${getUser().branch.id}`, apiData)
      .then(({data}) => {
        let prevUserStorage = getUser();
        prevUserStorage.branch = data.data;
        window.localStorage.setItem('user', JSON.stringify(prevUserStorage));
        setLoading(false);
        toastSuccess(data.message);
        navigate('/admin/delivery-fee');
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

  // Did Mount
  useEffect(() => {
  }, []);

  return {
    navigate,
    formMode,
    register,
    fieldErrors: errors,
    onSubmit,
    handleSubmit,
    loading,
    selectedRow,
    apiValidationErrors,
    user: getUser(),
  };
};

export default useDeliveryFee;