import { useEffect, useState } from 'react';

import {
  getCustomer,
  orderStatus,
  toastError,
  toastSuccess,
} from '../utils';

import axios from 'axios';

import { useForm } from 'react-hook-form';

const useCustomerPurchases = () => {
  const [transactions, setTransactions] = useState([]);

  const [tabValue, setTabValue] = useState(0);

  const [openModal, setOpenModal] = useState(false);
  
  const [modalTitle, setModalTitle] = useState('');

  const [transactionId, setTransactionId] = useState(null);

  const [ratingValue, setRatingValue] = useState(1);

  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const fetchTransactions = async () => {
    await axios.get(`/customer/transactions/${getCustomer().id}`)
      .then(({data}) => {
        setTransactions(data.data);
      })
      .catch(err => {
        toastError(err.message);
      });
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    fetchTransactions();
  };

  const handleTabSelectChange = (value) => {
    setTabValue(value);
    fetchTransactions();
  };

  const cancelReturnOrder = async (apiData) => {
    await axios.post('/customer/cancel-return-order', apiData)
      .then(({data}) => {
        toastSuccess(data.message);
        fetchTransactions();
        reset();
      })
      .catch(err => {
        toastError(err.message);
      });
  };

  const rateOrder = async (apiData) => {
    await axios.post('/customer/rate-order', apiData)
      .then(({data}) => {
        toastSuccess(data.message);
        reset();
      })
      .catch(err => {
        toastError(err.message);
      });
  };

  const handleOpenModal = (title, transId) => {
    setOpenModal(true);
    setModalTitle(title);
    setTransactionId(transId);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
    setTransactionId(null);
    setRatingValue(1);
    unregister('cancelReason');
    unregister('returnReason');
    unregister('ratingComment');
  };

  const handleRateChange = (newValue) => {
    setRatingValue(newValue);
  };

  const onSubmit = async (data) => {
    if (modalTitle === 'Cancel Order') {
      const apiData = {
        id: transactionId,
        cancelReason: data.cancelReason,
        status: orderStatus.CANCELLED,
      }

      cancelReturnOrder(apiData);
      handleCloseModal();
    } else if (modalTitle === 'Return Order') {
      const apiData = {
        id: transactionId,
        returnReason: data.returnReason,
        status: orderStatus.PENDING_RETURN,
      }

      cancelReturnOrder(apiData);
      handleCloseModal();
    } else if (modalTitle ==='Rate Order') {
      const apiData = {
        transId: transactionId,
        customer: getCustomer().id,
        rating: ratingValue,
        comment: data.ratingComment,
      }
      rateOrder(apiData)
      handleCloseModal();
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    fetchTransactions();
  }, []);

  return {
    forDeliveryTransactions: transactions.filter(i => i.status === orderStatus.FOR_DELIVERY),
    completedTransactions: transactions.filter(i => i.status === orderStatus.COMPLETED || i.status === orderStatus.PENDING_RETURN),
    cancelledTransactions: transactions.filter(i => i.status === orderStatus.CANCELLED),
    returnedTransactions: transactions.filter(i => i.status === orderStatus.RETURNED),
    handleTabChange,
    handleTabSelectChange,
    tabValue,
    openModal,
    modalTitle,
    handleOpenModal,
    handleCloseModal,
    handleSubmit,
    onSubmit,
    register,
    fieldErrors: errors,
    ratingValue,
    handleRateChange,
  };
};

export default useCustomerPurchases;