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

const useUsersForm = () => {
  const [loading, setLoading] = useState(false);
  const [apiValidationErrors, setApiValidationErrors] = useState([]);
  const [roles, setRoles] = useState([]);

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

  const fetchRoles = async () => {
    await axios.get('/users/roles')
      .then(({data}) => {
        setRoles(data.data);
      })
      .catch(err => {
        err.message
      });
  }

  const onSubmit = async data => {
    const apiData = {
      ...data,
    };

    if (formMode === 'create') {
      apiData.isActive = false;
    }
    
    setLoading(true);
    const submitMode = formMode === 'create' ? 'create' : `update/${selectedRow.id}`;
    await axios.post(`/users/${submitMode}`, apiData)
      .then(({data}) => {
        setLoading(false);
        toastSuccess(data.message);
        reset();
        navigate('/admin/users');
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
    fetchRoles();
  }, []);

  return {
    navigate,
    formMode,
    register,
    fieldErrors: errors,
    onSubmit,
    handleSubmit,
    loading,
    roles,
    selectedRow,
    apiValidationErrors,
  };
};

export default useUsersForm;