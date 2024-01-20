import { useEffect, useState } from 'react';

import axios from 'axios';

import { 
  imgBaseUrl,
  getCustomer,
  orderStatus,
  reactAppDomain,
  toastError, 
  toastSuccess,
  XENDIT_API_KEY,
} from '../utils';

import { useNavigate } from 'react-router';

import { useSearchParams } from 'react-router-dom';

import { isEmpty, uniqBy } from 'lodash';

import uniqid from 'uniqid';

const useCustomerCheckout = () => {
  const [cart, setCart] = useState([]);

  const [selectedCartIds, setSelectedCartIds] = useState([]);

  const [productsOrderedTotal, setProductsOrderedTotal] = useState(0);

  const [deliveryFee, setDeliveryFee] = useState(0);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('GCASH');

  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const fetchCart = async () => {
    await axios.get(`/customer/cart-products/${getCustomer().id}`)
      .then(({data}) => {
        const filtered = data.data.filter(i => selectedCartIds.includes(i.id));
        setCart(filtered);
      })
      .catch(err => {
        toastError(err.message);
      });
  }

  const totalPriceToUse = (sellerPrice, promotion) => {
    if (promotion && (!isEmpty(promotion) && promotion.isActive)) {
      const productDiscount = promotion.discountPercent / 100;
      return (sellerPrice - (sellerPrice * productDiscount)).toFixed(2);
    }
  
    return sellerPrice;
  };

  const getProductsOrderedTotal = () => {
    let total = 0;

    cart.map(i => {
      const hasVariantPrice = (!isEmpty(i.variant) && i.variant.addOnsPrice > 0);
      const quantityValue = i.quantity * totalPriceToUse(hasVariantPrice ? i.variant.addOnsPrice : i.product.sellerPrice, i.product.promotion);
      total += quantityValue;
    });

    setProductsOrderedTotal(total);
  };

  const getDeliveryFee = () => {
    let fee = 0;

    const items = uniqBy(cart, obj => obj.product.branch.id);
    
    items.map(i => {
      const isOutSideCity = i.product.branch.city !== getCustomer().city;

      fee = parseFloat(fee) + parseFloat(isOutSideCity 
        ? i.product.branch.outsideCityDeliveryFee : i.product.branch.defaultDeliveryFee);
    });
    
    setDeliveryFee(fee);
  };

  const handlePaymentMethodChange = (value) => {
    setSelectedPaymentMethod(value);
  };

  const cashOnDeliveryPayment = async () => {
    setLoading(true);

    const newOrders = [];

    cart.map(i => {
      if (i.variant) {
        delete i.variant.stocks;
      }

      const hasVariantPrice = !isEmpty(i.variant) && i.variant.addOnsPrice > 0;
      const hasPromotion = i.product.promotion && (!isEmpty(i.product.promotion) && i.product.promotion.isActive);
      const unitPrice = hasVariantPrice ? i.variant.addOnsPrice : i.product.sellerPrice;
      const discount = hasPromotion ? ((unitPrice * (i.product.promotion.discountPercent / 100))).toFixed(2) : 0;
      const total = i.quantity * (hasPromotion ? (unitPrice - discount).toFixed(2) : unitPrice);

      newOrders.push({
        branch: i.product.branch.id,
        customer: getCustomer().id,
        contact: getCustomer().contact,
        address: getCustomer().address,
        product: i.product.id,
        unitPrice,
        discount,
        variant: i.variant,
        quantity: i.quantity,
        total,
        paymentMethod: selectedPaymentMethod,
        status: orderStatus.FOR_DELIVERY,
      });
    });
    
    const apiData = {
      cartIds: selectedCartIds,
      orders: newOrders,
    };

    await axios.post('/customer/cash-on-delivery-payment', apiData)
      .then(({data}) => {
        toastSuccess(data.message);
        navigate('/');
        setLoading(false);
      })
      .catch(err => {
        toastError(err.message);
        setLoading(false);
      });
  };

  const gcashPayment = async () => {
    setLoading(true);

    const newOrders = [];

    cart.map(i => {
      if (i.variant) {
        delete i.variant.stocks;
      }

      const hasVariantPrice = !isEmpty(i.variant) && i.variant.addOnsPrice > 0;
      const hasPromotion = i.product.promotion && (!isEmpty(i.product.promotion) && i.product.promotion.isActive);
      const unitPrice = hasVariantPrice ? i.variant.addOnsPrice : i.product.sellerPrice;
      const discount = hasPromotion ? ((unitPrice * (i.product.promotion.discountPercent / 100))).toFixed(2) : 0;
      const total = i.quantity * (hasPromotion ? (unitPrice - discount).toFixed(2) : unitPrice);

      newOrders.push({
        branch: i.product.branch.id,
        customer: getCustomer().id,
        contact: getCustomer().contact,
        address: getCustomer().address,
        product: i.product.id,
        unitPrice,
        discount,
        variant: i.variant,
        quantity: i.quantity,
        total,
        paymentMethod: selectedPaymentMethod,
        status: orderStatus.TO_PAY,
      });
    });

    const apiData = {
      cartIds: selectedCartIds,
      orders: newOrders,
      
      customer: {
        givenNames: getCustomer().fullName,
        email: getCustomer().email,
      },
      successRedirectURL: `${reactAppDomain}/my-purchases`,
      failureRedirectURL: `${reactAppDomain}/my-purchases`,
      totalAmount: productsOrderedTotal,
    }

    await axios.post('/customer/gcash-payment', apiData)
      .then(({data}) => {
        window.location.href = data.data.invoiceUrl;
      })
      .catch(err => {
        setLoading(false);
        toastError(err.message);
      });
  };

  const checkoutOrder = () => {
    if (selectedPaymentMethod === 'CASH_ON_DELIVERY') {
      cashOnDeliveryPayment();
    } else {
      gcashPayment();
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  
    if (searchParams.get('itemKeys')) {
      const newSelectedCartIds = !isEmpty(searchParams.get('itemKeys')) 
        ? searchParams.get('itemKeys').split(',') : [];

      setSelectedCartIds(newSelectedCartIds);
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(selectedCartIds)) {
      fetchCart();
    }
  }, [selectedCartIds]);

  useEffect(() => {
    getProductsOrderedTotal();
    getDeliveryFee();
  }, [cart]);

  return {
    cart,
    productsOrderedTotal,
    deliveryFee,
    selectedPaymentMethod,
    loading,
    handlePaymentMethodChange,
    checkoutOrder,
  };
};

export default useCustomerCheckout;