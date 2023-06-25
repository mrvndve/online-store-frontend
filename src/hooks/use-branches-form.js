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

import phil from 'philippine-location-json-for-geer';

const useBranchesForm = () => {
  const {
    regions: philRegions,
    getProvincesByRegion,
    getCityMunByProvince,
    getBarangayByMun,
  } = phil;

  const [loading, setLoading] = useState(false);
  const [apiValidationErrors, setApiValidationErrors] = useState([]);
  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [barangays, setBarangays] = useState([]);

  const {
    formMode,
  } = useParams();

  const {
    state: selectedRow,
  } = useLocation();

  const navigate = useNavigate();

  const {
    register,
    unregister,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm();

  const handleRegionChange = (e) => {
    setValue('city', '');
    setCities([]);

    setValue('barangay', '');
    setBarangays([]);

    setProvinces(getProvincesByRegion(e.target.value));
  };

  const handleProvinceChange = (e) => {
    setValue('city', '');
    setCities([]);

    setValue('barangay', '');
    setBarangays([]);

    setCities(getCityMunByProvince(e.target.value));
  };

  const handleCitiesChange = (e) => {
    setValue('barangay', '');
    setBarangays([]);

    setBarangays(getBarangayByMun(e.target.value));
  };

  const onSubmit = async data => {
    if (formMode === 'create') {
      data['defaultDeliveryFee'] = 0.00;
      data['outsideCityDeliveryFee'] = 0.00;
    }

    const apiData = {
      ...data,
    };
    
    setLoading(true);
    const submitMode = formMode === 'create' ? 'create' : `update/${selectedRow.id}`;
    await axios.post(`/branches/${submitMode}`, apiData)
      .then(({data}) => {
        setLoading(false);
        toastSuccess(data.message);
        reset();
        navigate('/admin/branches');
      })
      .catch(({response}) => {
        if (response.status === 422) {
          if (response.data.message) {
            setApiValidationErrors([{ create: response.data.message }])
          } else {
            setApiValidationErrors(response.data.errors);
          }
          setLoading(false);
        } else if (response.status === 500) {
          toastError(response.data.message);
          setLoading(false);
        }
      });
  };

  // Did Mount
  useEffect(() => {
    setRegions(philRegions);
    
    if (formMode !== 'create') {
      const {
        region,
        province,
        city,
      } = selectedRow;

      setProvinces(getProvincesByRegion(region));
      setCities(getCityMunByProvince(province));
      setBarangays(getBarangayByMun(city));
    }
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

    regions,
    handleRegionChange,
    provinces,
    handleProvinceChange,
    cities,
    handleCitiesChange,
    barangays,
  };
};

export default useBranchesForm;