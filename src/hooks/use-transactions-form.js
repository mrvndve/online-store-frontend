import {
  useState,
  useEffect,
} from 'react';

import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router';

import axios from 'axios';

import { 
  paymentMethods, 
  toastError, 
  toastSuccess,
  orderStatus,
  numbersOnlyKeyPress,
} from '../utils';

import { isEmpty } from 'lodash';
  
const useTransactionsForm = () => {
  const [loading, setLoading] = useState(false);
  const [apiValidationErrors, setApiValidationErrors] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    unregister,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    reset,
  } = useForm();

  const fetchProducts = async () => {
    axios.get('/products')
      .then(({data}) => {
        setProducts(data.data);
      })
      .catch(err => {
        toastError(err.message);
      });
  };

  const fetchCustomers = async () => {
    await axios.get('/customer')
      .then(({data}) => {
        setCustomers(data.data);
      })
      .catch(err => {
        toastError(err.message);
      });
  };

  const onSubmit = async data => {
    const hasVariantPrice = !isEmpty(selectedVariant) && selectedVariant.addOnsPrice > 0;
    const hasPromotion = selectedProduct.promotion && (!isEmpty(selectedProduct.promotion) && selectedProduct.promotion.isActive);
    const unitPrice = hasVariantPrice ? selectedVariant.addOnsPrice : selectedProduct.sellerPrice;
    const discount = hasPromotion ? ((unitPrice * (selectedProduct.promotion.discountPercent / 100))).toFixed(2) : 0;
    const total = quantity * (hasPromotion ? (unitPrice - discount).toFixed(2) : unitPrice);

    const apiData = {
      product: data.product,
      driver: null,
      customer: data.customer,
      quantity,
      unitPrice,
      discount,
      variant: selectedVariant,
      total,
      paymentMethod: 'ON_SITE',
      status: orderStatus.COMPLETED,
      cancelReason: '',
      returnReason: '',
      contact: selectedCustomer.contact,
      address: selectedCustomer.address,
    };
    
    setLoading(true);

    if (quantity === 0 || quantity === '0') {
      toastError('Please input quantity.');
      setLoading(false);
    } else {
      await axios.post('/transactions/process-onsite-transaction', apiData)
        .then(({data}) => {
          setLoading(false);
          toastSuccess(data.message);
          reset();
          navigate('/admin/transactions');
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
    }
  };

  const handleIncreaseQuantity = () => {
    const stocksToUse = (!isEmpty(selectedProduct.variations) && !isEmpty(selectedVariant)) 
      ? selectedVariant.stocks : selectedProduct.stocks

    if (stocksToUse > quantity) {
      setQuantity(parseFloat(quantity) + 1);
    }
  };
  
  const handleDecreaseQuantity = () => {
    if (quantity !== 1) {
      setQuantity(parseFloat(quantity) - 1);
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleQuantityBlur = (e) => {
    const stocksToUse = (!isEmpty(selectedProduct.variations) && !isEmpty(selectedVariant)) 
      ? selectedVariant.stocks : selectedProduct.stocks

    if (e.target.value === '') {
      setQuantity(0)
    } else if (e.target.value > stocksToUse) {
      setQuantity(stocksToUse)
    } else if (e.target.value[0] === '0' || (e.target.value[0] === '0' && e.target.value[1] === '0')) {
      setQuantity(stocksToUse === 0 ? 0 : 1);
    }
  };

  const handleQuantitykeyPress = (e) => {
    numbersOnlyKeyPress(e);
  };

  // Did Mount
  useEffect(() => {
    fetchProducts();
    fetchCustomers();
  }, []);

  useEffect(() => {
    if (selectedProduct && isEmpty(selectedProduct.variations)) {
      unregister('variation');
      setSelectedVariant(null);
    }
  }, [selectedProduct]);

  return {
    navigate,
    register,
    fieldErrors: errors,
    onSubmit,
    handleSubmit,
    loading,
    apiValidationErrors,
    customers,
    products,
    selectedProduct,
    selectedVariant,
    setSelectedProduct,
    setSelectedVariant,
    setSelectedCustomer,

    quantity,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleQuantityChange,
    handleQuantityBlur,
    handleQuantitykeyPress,
  };
};

export default useTransactionsForm;