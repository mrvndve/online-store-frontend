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
  
  const useAdminActivateAccount = () => {
    const [isReset, setIsReset] = useState('');
    const [apiValidationError, setApiValidationError] = useState('');
  
    const {
      activateAccountToken,
    } = useParams();
  
    const {
      register,
      formState: { errors },
      handleSubmit,
      setValue,
      getValues,
    } = useForm();
  
    const navigate = useNavigate();
  
    const onSubmit = async (data) => {
      const apiData = {
        password: data.password,
      };

      await axios.post(`/users/activate-account/${activateAccountToken}`, apiData)
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
      getValues,
      fieldErrors: errors,
      onSubmit,
      handleSubmit,
      apiValidationError,
      isReset,
    };
  };
  
  export default useAdminActivateAccount;