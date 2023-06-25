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
import { isEmpty } from 'lodash';

const usePromotionsForm = () => {
  const [loading, setLoading] = useState(false);
  const [apiValidationErrors, setApiValidationErrors] = useState([]);

  const [products, setProducts] = useState([]);
  const [isProductsModalOpen, setIsProductsModalOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const {
    formMode,
  } = useParams();

  const {
    state: selectedRow,
  } = useLocation();

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const fetchProducts = async () => {
    await axios.get('/promotions/products')
      .then(({data}) => {
        const filtered = data.data.filter(a => isEmpty(a.promotion) 
          && !selectedProducts.some(b => b.id === a.id));
        setProducts(filtered);
      })
      .catch(err => {
        toastError(err.message);
      });
  }

  const handleOpenProductsModal = () => {
    fetchProducts();
    setIsProductsModalOpen(true);
  };

  const handleCloseProductsModal = () => {
    setIsProductsModalOpen(false);
  };

  const handleAddProduct = (data) => {
    data.map(item => {
      setSelectedProducts(prevState => [...prevState, item])
    });

    handleCloseProductsModal()
  };

  const handleRemoveProduct = (index) => {
    const newArr = [...selectedProducts];
    newArr.splice(index, 1);
    setSelectedProducts(newArr);
  };

  const onSubmit = async data => {
    const apiData = {
      ...data,
      products: selectedProducts,
    };
    
    setLoading(true);
    const submitMode = formMode === 'create' ? 'create' : `update/${selectedRow.id}`;
    await axios.post(`/promotions/${submitMode}`, apiData)
      .then(({data}) => {
        setLoading(false);
        toastSuccess(data.message);
        reset();
        navigate('/admin/promotions');
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

  // Did Mount
  useEffect(() => {
    if (formMode !== 'create') {
      const {
        products
      } = selectedRow;

      setSelectedProducts(products);
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

    products,
    selectedProducts,
    isProductsModalOpen,
    handleOpenProductsModal,
    handleCloseProductsModal,
    handleAddProduct,
    handleRemoveProduct,
  };
};

export default usePromotionsForm;