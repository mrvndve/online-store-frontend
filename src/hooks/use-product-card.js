import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router';

const useProductCard = ({ addRemoveToWishList, addToCart }) => {
  const navigate = useNavigate();

  const handleClickAddRemoveToWishlist = (e, product) => {
    e.stopPropagation();
    addRemoveToWishList(product);
  };

  const handleClickAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleClickProductCard = (e, productName) => {
    e.stopPropagation();
    navigate(`/collections/${productName}`);
  };

  return {
    handleClickAddRemoveToWishlist,
    handleClickAddToCart,
    handleClickProductCard,
  };
};

export default useProductCard;