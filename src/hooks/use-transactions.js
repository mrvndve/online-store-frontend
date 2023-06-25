import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Download,
} from '@mui/icons-material';
import axios from 'axios';
import {
  exportToCSV,
  getPaymentMethodsLabel,
  getStatusLabel,
} from '../utils';
import { toastError } from '../utils';
import { isEmpty } from 'lodash';

const useTransactions = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [selected, setSelected] = useState([]);

  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('productName');

  const [exportData, setExportData] = useState('');

  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    await axios.get('/transactions')
      .then(({data}) => {
        var filtered = data.data.filter(data => {
          data['customerName'] = data.customer?.fullName; 
          data['productName'] = data.product?.name;
          data['variantName'] = data.variant ? data.variant?.name : '--';
          data['status'] = getStatusLabel[data.status];
          data['paymentMethod'] = getPaymentMethodsLabel(data.paymentMethod);
          return data[searchBy].toLowerCase().includes(search.toLowerCase());
        })
        setResponse(state => ({...state, data: filtered, status: data.status}));
        setLoading(false);
      })
      .catch(err => {
        toastError(err.message);
        setLoading(false);
      });
  };

  const exportDatas = (expData) => {
    let arr = [];

    expData.map(data => {
      arr.push({
        ['Customer']: data?.customerName,
        ['Product']: data?.productName,
        ['Unit Price']: data.unitPrice,
        ['Discount']: data.discount,
        ['Variant']: data?.variantName,
        ['Quantity']: data.quantity,
        ['Total']: data.total,
        ['Payment']: getPaymentMethodsLabel(data.paymentMethod),
        ['Status']: getStatusLabel[data.status],
      })
    });

    setExportData(arr);
  };

  const tableRowsHeaders = [
    {
      id: 'id',
      label: 'Id',
    },
    {
      id: 'customerName',
      label: 'Customer',
    },
    {
      id: 'productName',
      label: 'Product',
    },
    {
      id: 'unitPrice',
      label: 'Unit Price',
    },
    {
      id: 'discount',
      label: 'Discount',
    },
    {
      id: 'variantName',
      label: 'Variant',
    },
    {
      id: 'quantity',
      label: 'Quantity',
    },
    {
      id: 'total',
      label: 'Total',
    },
    {
      id: 'paymentMethod',
      label: 'Payment',
    },
    {
      id: 'status',
      label: 'Status',
    },
    {
      id: 'createdAt',
      label: 'Transaction Date',
      isDateTime: true,
    },
  ];

  const tableHeaderActions = {
    actionButtons: [
      {
        icon: <Download/>,
        color: 'success',
        label: 'Export',
        onClick: () => exportToCSV(exportData, 'Transactions'),
      },
    ],
    filterByOptions: [
      {
        label: 'Product',
        value: 'productName',
      },
    ],
  };

  useEffect(() => {
    if (!isEmpty(response?.data)) {
      exportDatas(response.data);
    }
  }, [response]);

  return {
    navigate,
    loading,
    rows: response ? response.data : [],
    tableRowsHeaders,
    tableHeaderActions,
    selected,
    setSelected,
    searchBy,
    setSearchBy,
    search,
    setSearch,
    fetchData,
  }
};

export default useTransactions;