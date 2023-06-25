import { 
  useState, 
  useEffect,
} from 'react';

import axios from 'axios';

import { 
  toastSuccess, 
  toastError, 
  getCustomer,
  numbersOnlyKeyPress,
} from '../utils';

import { useParams, useNavigate } from 'react-router';

import { isEmpty } from 'lodash';

const useCustomerViewProduct = () => {
  const [product, setProduct] = useState({});

  const [relatedProducts, setRelatedProducts] = useState([]);
  
  const [selectedVariant, setSelectedVariant] = useState({});

  const [quantity, setQuantity] = useState(0);

  const { productName } = useParams();

  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  const fetchViewedProduct = async () => {
    const apiData = {
      customer: token ? getCustomer().id : null,
      productName,
    };

    await axios.post(`/customer/view-product`, apiData)
      .then(({data}) => {
        setProduct(data.data);
        setQuantity(data.data.stocks === 0 ? 0 : 1);
      })
      .catch(err => {
        toastError(err.message);
      });
  };

  const fetchRelatedProducts = async () => {
    const apiData = {
      filters: {
        categories: product.categories?.map(i => i.name),
        tags: product.tags?.map(i => i.name),
      },
      currentPage: 1,
      customer: token ? getCustomer().id : null,
    };

    await axios.post('/customer/collections', apiData)
      .then(({data}) => {
        let filtered = data.data.filter(i => i.name !== productName);
        setRelatedProducts(filtered);
      })
      .catch(err => {
        toastError(err.message);
      });
  };

  const handleSelectVariant = (value) =>{
    setSelectedVariant(value);
    setQuantity(value.stocks === 0 ? 0 : 1);
  };

  const addRemoveToWishList = async (selectedProduct) => {
    if (!token) {
      navigate(`/login?from=${window.location.pathname}`);
    } else {
      const apiData = {
        customer: getCustomer().id,
        product: selectedProduct.id,
      };

      await axios.post(`/customer/${!selectedProduct.isAddedToWishLists ? 'add-to-wishlist' : 'remove-to-wishlist'}`, apiData)
        .then(({data}) => {
          if (selectedProduct.id === product.id) {
            const tempProduct = {...product};
            tempProduct.isAddedToWishLists = !selectedProduct.isAddedToWishLists ? true : false;
            setProduct(tempProduct);
          } else {
            const tempRelatedProducts = [...relatedProducts];
            tempRelatedProducts.map(obj => {
              if (obj.id === selectedProduct.id) {
                obj.isAddedToWishLists = !selectedProduct.isAddedToWishLists ? true : false;
              }
              return obj;
            })
            setRelatedProducts(tempRelatedProducts);
          }
        })
        .catch(err => {
          toastError(err.message);
        });
    }
  };

  const addToCart = async (product) => {
    if (!token) {
      navigate(`/login?from=${window.location.pathname}`);
    } else {
      const apiData = {
        customer: getCustomer().id,
        product: product.id,
        quantity,
        variant: !isEmpty(selectedVariant) ? selectedVariant : null,
      };

      await axios.post('/customer/add-to-cart', apiData)
        .then(({data}) => {
          toastSuccess(data.message);
        })
        .catch(err => {
          toastError(err.message);
        });
    }
  };

  const buyNow = async (product) => {
    if (!token) {
      navigate(`/login?from=${window.location.pathname}`);
    } else {
      const apiData = {
        customer: getCustomer().id,
        product: product.id,
        quantity,
        variant: !isEmpty(selectedVariant) ? selectedVariant : null,
      };

      await axios.post('/customer/add-to-cart', apiData)
        .then(({data}) => {
          toastSuccess(data.message);
          navigate(`/cart?itemKeys=${data.data.id}`)
        })
        .catch(err => {
          toastError(err.message);
        });
    }
  };

  const handleIncreaseQuantity = () => {
    const stocksToUse = (!isEmpty(product.variations) && !isEmpty(selectedVariant)) 
      ? selectedVariant.stocks : product.stocks

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
    const stocksToUse = (!isEmpty(product.variations) && !isEmpty(selectedVariant)) 
      ? selectedVariant.stocks : product.stocks

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchViewedProduct();
  }, []);
  
  useEffect(() => {
    fetchRelatedProducts();
  }, [product]);

  return {
    productName,
    product,
    relatedProducts,
    handleSelectVariant,
    selectedVariant,
    addRemoveToWishList,
    addToCart,
    buyNow,

    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleQuantityChange,
    handleQuantityBlur,
    handleQuantitykeyPress,
    quantity,
  };
};

export default useCustomerViewProduct;