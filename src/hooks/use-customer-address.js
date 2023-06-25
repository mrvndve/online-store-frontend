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

import phil from 'philippine-location-json-for-geer';

const useCustomerAddress = () => {
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
    };

    setLoading(true);

    await axios.post(`/customer/update-address/${getCustomer().id}`, apiData)
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

    setRegions(philRegions);

    const {
      region,
      province,
      city,
      barangay,
    } = getCustomer();

    setProvinces(getProvincesByRegion(region));
    setCities(getCityMunByProvince(province));
    setBarangays(getBarangayByMun(city));

    setValue('province', province);
    setValue('region', region);
    setValue('city', city);
    setValue('barangay', barangay);
  }, []);

  return {
    register,
    fieldErrors: errors,
    onSubmit,
    handleSubmit,
    loading,
    apiValidationErrors,
    handleRegionChange,
    handleProvinceChange,
    handleCitiesChange,
    regions,
    provinces,
    cities,
    barangays,
  };
};

export default useCustomerAddress;