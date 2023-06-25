import {
  useState,
  useEffect,
} from 'react';
  
import { useForm, useFieldArray } from 'react-hook-form';

import {
  toastError,
  toastSuccess,
} from '../utils';

import axios from 'axios';
import { isEmpty } from 'lodash';
  
const useManageStocksModalForm = ({
  manageStockData,
  isManageStockModalOpen,
  handleCloseManageStocksModal,
}) => {
  const [loading, setLoading] = useState(false);
  const [apiValidationErrors, setApiValidationErrors] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const {
    register,
    unregister,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    reset,
    control,
  } = useForm();

  const { 
    fields: variationFields,
  } = useFieldArray({ control, name: 'variations' });

  const fetchSuppliers = async () => { 
    await axios.get('/products/suppliers')
      .then(({data}) => {
        setSuppliers(data.data);
      })
      .catch(err => {
        err.message
      });
  };
  
  const onStocksKeyPress = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const onSubmit = async data => {
    const {
      formMode,
      id: productId,
      stocks: prevStocks,
      variations: prevVariations,
    } = manageStockData;

    const stocksBefore = prevStocks;
    
    let stocks = 0;
    if (data.variations && !isEmpty(data.variations)) {
      prevVariations.map(prev => {
        data.variations.map(curr => {
          if (prev.id === curr.id) {
            curr.stocks = formMode === 'Add Stocks' 
              ? (parseFloat(prev.stocks) + parseFloat(curr.stocks))
              : (parseFloat(prev.stocks) - parseFloat(curr.stocks));
          }
        });
      })

      data.variations.map(i => {
        stocks = parseFloat(stocks) + parseFloat(i.stocks)
      });
    } else {
      stocks = formMode === 'Add Stocks'
        ? (parseFloat(prevStocks) + parseFloat(data.stocks))
        : (parseFloat(prevStocks) - parseFloat(data.stocks));
    }

    const apiData = {
      productId,
      supplier: data.supplier || null,
      receiptNo: data.receiptNo || '',
      decreaseReason: data.decreaseReason || '',
      variations: data.variations || [],
      stocks,
      stocksBefore,
      stocksAfter: stocks,
      status: formMode === 'Add Stocks' ? 'INCREASED' : 'DECREASED',
    };

    setLoading(true);
    const apiRoute = formMode === 'Add Stocks' ? 'add-stocks' : 'decrease-stocks';
    await axios.post(`/products/${apiRoute}`, apiData)
      .then(({data}) => {
        setLoading(false);
        toastSuccess(data.message);
        reset();
        handleCloseManageStocksModal();
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

  const onStocksBlur = (value, field) => {
    if (value === '') {
      setValue(field, 0);
    }
  };

  useEffect(() => {
    if (manageStockData.formMode === 'Add Stocks') {
      unregister('decreaseReason');
    } else {
      unregister('receiptNo');
      unregister('supplier');
    }

    if (manageStockData.variations) {
      unregister('stocks');
    } else {
      unregister('variations');
    }
  }, [manageStockData.formMode]);

  useEffect(() => {
    if (isManageStockModalOpen) {
      fetchSuppliers();

      const { variations } = manageStockData;
      if (variations) {
        let newArr = [];
        variations.map(i => {
          newArr.push({ id: i.id, name: i.name, stocks: '' });
        })
        setValue('variations', newArr);
      }
    }
  }, [isManageStockModalOpen]);

  return {
    reset,
    register,
    fieldErrors: errors,
    onSubmit,
    getValues,
    handleSubmit,
    setValue,
    loading,
    apiValidationErrors,
    suppliers,
    variationFields,
    onStocksKeyPress,
    onStocksBlur,
  };
};

export default useManageStocksModalForm;