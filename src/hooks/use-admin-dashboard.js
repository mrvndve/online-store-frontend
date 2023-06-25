import { useState, useEffect } from 'react';

import axios from 'axios';

import { toastSuccess, toastError } from '../utils';

import moment from 'moment';
import { isEmpty } from 'lodash';

const useAdminDashboard = () => {
  const [response, setResponse] = useState(null);

  const [dailySales, setDailySales] = useState([]);
  const [dailySalesDateValue, setDailySalesDateValue] = useState(moment(new Date()).format('YYYY-MM-DD'));

  const [monthlySales, setMonthlySales] = useState([]);
  const [monthlySalesMonthValue, setMonthlySalesMonthValue] = useState('01');
  const [monthlySalesYearValue, setMonthlySalesYearValue] = useState(new Date().getFullYear());

  const [yearlySales, setYearlySales] = useState([]);
  const [yearlySalesYearValue, setYearlySalesYearValue] = useState(new Date().getFullYear());

  const onMonthlySalesMonthChange = (value) => {
    setMonthlySalesMonthValue(value);
  };

  const onMonthlySalesYearChange = (value) => {
    setMonthlySalesYearValue(value);
  };

  const onDailySalesDateChange = (value) => {
    setDailySalesDateValue(value);
  };

  const onYearlySalesYearChange = (value) => {
    setYearlySalesYearValue(value);
  };

  const fetchDashboardDatas = async () => {
    axios.get('/admin/dashboard')
      .then(({data}) => {
        setResponse(data);
      })
      .catch(err => {
        toastError(err);
      })
  };

  const fetchDashboardDailySales = async (data) => {
    axios.post('/admin/dashboard-daily-sales', data)
      .then(({data}) => {
        setDailySales(data.data);
      })
      .catch(err => {
        toastError(err);
      })
  };

  const fetchDashboardMonthlySales = async (data) => {
    axios.post('/admin/dashboard-monthly-sales', data)
      .then(({data}) => {
        setMonthlySales(data.data);
      })
      .catch(err => {
        toastError(err);
      })
  };

  const fetchDashboardYearlySales = async (data) => {
    axios.post('/admin/dashboard-yearly-sales', data)
      .then(({data}) => {
        setYearlySales(data.data);
      })
      .catch(err => {
        toastError(err);
      })
  };

  useEffect(() => {
    fetchDashboardDatas();
  }, []);

  useEffect(() => {
    const daysInMonth = moment(`${monthlySalesYearValue}-${monthlySalesMonthValue}`, 'YYYY-MD').daysInMonth();
    const startDate = moment(`${monthlySalesYearValue}-${monthlySalesMonthValue}-01`).format('YYYY-MM-DD');
    const endDate = moment(`${monthlySalesYearValue}-${monthlySalesMonthValue}-${daysInMonth}`).format('YYYY-MM-DD');

    fetchDashboardMonthlySales({ startDate, endDate });
  }, [monthlySalesMonthValue, monthlySalesYearValue]);

  useEffect(() => {
    const startDate = moment(dailySalesDateValue).format('YYYY-MM-DD');
    fetchDashboardDailySales({ startDate });
  }, [dailySalesDateValue]);

  useEffect(() => {
    const startDate = moment(moment({ year: yearlySalesYearValue }).startOf('year').toDate()).format('YYYY-MM-DD');
    const endDate = moment(moment({ year: yearlySalesYearValue }).endOf('year').toDate()).format('YYYY-MM-DD');
    fetchDashboardYearlySales({ startDate, endDate });
  }, [yearlySalesYearValue]);

  return {
    response,
    monthlySales,
    monthlySalesMonthValue,
    monthlySalesYearValue,
    onMonthlySalesMonthChange,
    onMonthlySalesYearChange,

    dailySales,
    dailySalesDateValue,
    onDailySalesDateChange,

    yearlySales,
    yearlySalesYearValue,
    onYearlySalesYearChange,
  };
};

export default useAdminDashboard;