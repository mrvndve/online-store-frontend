import { useEffect, useState } from 'react';

import axios from 'axios';

import { 
  getCustomer,
  numbersOnlyKeyPress,
  toastError, 
  toastSuccess,
} from '../utils';

import { useNavigate } from 'react-router';

import { useSearchParams } from 'react-router-dom';

import { isEmpty } from 'lodash';

const useCustomerCart = () => {
  const [cart, setCart] = useState([]);

  const [selectedCartIds, setSelectedCartIds] = useState([]);

  const [totalCartPrice, setTotalCartPrice] = useState(0);

  const [searchParams] = useSearchParams();

  const [noAddressDialogOpen, setNoAddressDialgOpen] = useState(false);

  const navigate = useNavigate();

  const fetchCart = async () => {
    await axios.get(`/customer/cart-products/${getCustomer().id}`)
      .then(({data}) => {
        setCart(data.data);
      })
      .catch(err => {
        toastError(err.message);
      });
  }

  const updateCartQuantity = async (id, quantity) => {
    await axios.post(`/customer/update-cart-quantity/${id}`, { quantity })
      .then(({data}) => {
      })
      .catch(err => {
        toastError(err.message);
      });
  };

  const removeToCart = async (ids) => {
    await axios.post('/customer/remove-to-cart', { ids })
      .then(({data}) => {
        const tempArr = [...cart];

        ids.map((id) => {
          let indexes = tempArr.findIndex((i) => i.id === id)
          tempArr.splice(indexes, 1);
        })

        setCart(tempArr);
      })
      .catch(err => {
        toastError(err.message);
      });
  };

  const handleIncreaseQuantity = (e, index) => {
    const tempArr = [...cart];

    const stocksToUse = tempArr[index].variant 
      ? tempArr[index].variant.stocks : tempArr[index].product.stocks;

    if (stocksToUse > tempArr[index].quantity) {
      tempArr[index].quantity = parseFloat(tempArr[index].quantity) + 1;
    }

    setCart(tempArr);

    updateCartQuantity(tempArr[index].id, tempArr[index].quantity);
  }

  const handleDecreaseQuantity = (e, index) => {
    const tempArr = [...cart];

    if (tempArr[index].quantity !== 1) {
      tempArr[index].quantity = parseFloat(tempArr[index].quantity) - 1;
    }

    setCart(tempArr);

    updateCartQuantity(tempArr[index].id, tempArr[index].quantity);
  };

  const handleQuantityChange = (e, index) => {
    const tempArr = [...cart];
    tempArr[index].quantity = e.target.value;
    setCart(tempArr);

    updateCartQuantity(tempArr[index].id, tempArr[index].quantity);
  };

  const handleQuantityBlur = (e, index) => {
    const tempArr = [...cart];

    const stocksToUse = tempArr[index].variant 
      ? tempArr[index].variant.stocks : tempArr[index].product.stocks;

    if (e.target.value === '') {
      tempArr[index].quantity = 0;
    } else if (e.target.value > stocksToUse) {
      tempArr[index].quantity = stocksToUse;
    } else if (e.target.value[0] === '0' || (e.target.value[0] === '0' && e.target.value[1] === '0')) {
      tempArr[index].quantity = stocksToUse === 0 ? 0 : 1
    }

    setCart(tempArr);

    updateCartQuantity(tempArr[index].id, tempArr[index].quantity);
  };

  const handleQuantitykeyPress = (e) => {
    numbersOnlyKeyPress(e);
  };

  const handleRemoveCartSingleClick = (id) => {
    removeToCart([id]);
  };

  const handleCheckBoxChange = (e, id) => {
    const tempArr = [...selectedCartIds];
    const index = tempArr.findIndex(i => i === id);
  
    if (e.target.checked) {
      tempArr.push(id);
    } else {
      tempArr.splice(index, 1);
    }

    setSelectedCartIds(tempArr);

    navigate(!isEmpty(tempArr) ? `/cart?itemKeys=${tempArr.toString()}` : '/cart');
  };

  const handleCheckBoxChangeAll = (e) => {
    let tempArr = [];

    if (e.target.checked) {
      tempArr = cart.map(i => i.id);
      setSelectedCartIds(tempArr);

      navigate(`/cart?itemKeys=${tempArr.toString()}`);
      return;
    }

    setSelectedCartIds(tempArr);
    navigate('/cart');
  };

  const totalPriceToUse = (sellerPrice, promotion) => {
    if (promotion && (!isEmpty(promotion) && promotion.isActive)) {
      const productDiscount = promotion.discountPercent / 100;
      return (sellerPrice - (sellerPrice * productDiscount)).toFixed(2);
    }
  
    return sellerPrice;
  };

  const handleOpenNoAddressDialog = () => {
    setNoAddressDialgOpen(true);
  };

  const handleCloseNoAddressDialog = () => {
    setNoAddressDialgOpen(false);
  };

  const handleYesNoAddress = () => {
    navigate('/my-address');
  };

  const proceedToCheckout = () => {
    if (getCustomer().address === '--' || getCustomer.city === '--') {
      handleOpenNoAddressDialog();
    } else {
      navigate(`/checkout?itemKeys=${selectedCartIds.toString()}`);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchCart();

    if (searchParams.get('itemKeys')) {
      const newSelectedCartIds = !isEmpty(searchParams.get('itemKeys')) 
        ? searchParams.get('itemKeys').split(',') : [];

      setSelectedCartIds(newSelectedCartIds)
    }
  }, []);

  useEffect(() => {
    const filtered = cart.filter(i => selectedCartIds.includes(i.id));
    
    let total = 0;

    filtered.map(i => {
      const hasVariantPrice = (!isEmpty(i.variant) && i.variant.addOnsPrice > 0);
      const quantityValue = i.quantity * totalPriceToUse(hasVariantPrice ? i.variant.addOnsPrice : i.product.sellerPrice, i.product.promotion);
      total += quantityValue;
    });

    setTotalCartPrice(total);
  }, [selectedCartIds, cart]);

  return {
    cart,
    selectedCartIds,
    totalCartPrice,
    totalPriceToUse,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleQuantityChange,
    handleQuantityBlur,
    handleQuantitykeyPress,
    handleRemoveCartSingleClick,
    handleCheckBoxChange,
    handleCheckBoxChangeAll,
    proceedToCheckout,
    handleCloseNoAddressDialog,
    handleYesNoAddress,
    noAddressDialogOpen,
  };
};

export default useCustomerCart; 