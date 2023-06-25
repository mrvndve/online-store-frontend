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

import { isEmpty } from 'lodash';

const useRolesForm = () => {
  const [loading, setLoading] = useState(false);
  const [apiValidationErrors, setApiValidationErrors] = useState([]);
  const [permissions, setPermissions] = useState([]);

  const {
    formMode
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
    if (isEmpty(permissions)) {
      toastError('You are required to select a permissions.');
      return;
    }

    const apiData = {
      ...data,
      permissions,
    };
    
    setLoading(true);
    const submitMode = formMode === 'create' ? 'create' : `update/${selectedRow.id}`;
    await axios.post(`/roles/${submitMode}`, apiData)
      .then(({data}) => {
        setLoading(false);
        toastSuccess(data.message);
        reset();
        navigate('/admin/roles');
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

  const handleParentCheckBoxChange = (e, name, value) => {
    if (e.target.checked) {
      setPermissions(state => [...state, { name, permissions: value }])
    } else {
      const temp = [...permissions];
      let index = temp.findIndex(i => i.name === name);
      temp.splice(index, 1);
      setPermissions(temp);
    }
  };

  const handleChildCheckBoxChange = (e, name, value) => {
    let index = permissions.findIndex(i => i.name === name);
    const temp = [...permissions];

    if (e.target.checked) {
      if (index === -1) {
        setPermissions(state => [...state, { name, permissions: [value] }])
      } else {
        temp[index].permissions.push(value);
        setPermissions(temp);
      }
    } else if (!e.target.checked) {
      let permIndex = temp[index].permissions.findIndex(i => i === value);
      temp[index].permissions.splice(permIndex, 1);

      if (isEmpty(temp[index].permissions)) {
        temp.splice(index, 1);
      }

      setPermissions(temp);
    }
  };

  // Did Mount
  useEffect(() => {
    if (formMode === 'edit') {
      if (!isEmpty(selectedRow.permissions)) {
        setPermissions(selectedRow.permissions);
      }
    }
  }, []);

  return {
    formMode,
    navigate,
    register,
    fieldErrors: errors,
    onSubmit,
    handleSubmit,
    loading,
    selectedRow,
    permissions,
    apiValidationErrors,
    handleParentCheckBoxChange,
    handleChildCheckBoxChange,
  };
};

export default useRolesForm;