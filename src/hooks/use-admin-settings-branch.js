import {
  useState,
  useEffect,
} from 'react';

import { useForm } from 'react-hook-form';

import { 
  useNavigate, 
  useLocation,
} from 'react-router';

import axios from 'axios';

import {
  getUser,
  toastError,
  toastSuccess,
} from '../utils';

import phil from 'philippine-location-json-for-geer';

const useAdminSettingsBranch = () => {
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

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
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
    const apiData = {
      ...data,
      isActive: true,
    };

    setLoading(true);
    await axios.post(`/branches/update/${getUser().branch.id}`, apiData)
      .then(({data}) => {
        setLoading(false);
        
        let prevUserStorage = getUser();
        prevUserStorage.branch = data.data;
        window.localStorage.setItem('user', JSON.stringify(prevUserStorage));

        toastSuccess(data.message);
        navigate('/admin/settings/branch');
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
    
    const {
      region,
      province,
      city,
      barangay,
    } = getUser().branch;

    setProvinces(getProvincesByRegion(region));
    setCities(getCityMunByProvince(province));
    setBarangays(getBarangayByMun(city));

    setValue('region', region);
    setValue('province', province);
    setValue('city', city);
    setValue('barangay', barangay);
  }, []);

  return {
    navigate,
    register,
    fieldErrors: errors,
    onSubmit,
    handleSubmit,
    loading,
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

export default useAdminSettingsBranch;