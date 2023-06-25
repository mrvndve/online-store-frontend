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
  toastError,
  toastSuccess,
} from '../utils';

const useBrandsForm = () => {
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
    setValue,
    getValues,
    reset,
  } = useForm();

  const onSubmit = async data => {
    const apiData = {
      ...data,
    };
    
    setLoading(true);
    const submitMode = formMode === 'create' ? 'create' : `update/${selectedRow.id}`;
    await axios.post(`/brands/${submitMode}`, apiData)
      .then(({data}) => {
        setLoading(false);
        toastSuccess(data.message);
        reset();
        navigate('/admin/brands');
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
  };
};

export default useBrandsForm;