import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Download,
  Done,
  Close,
} from '@mui/icons-material';
import axios from 'axios';
import {
  exportToCSV,
  getPaymentMethodsLabel,
  getStatusLabel,
  orderStatus,
} from '../utils';
import { toastError, toastSuccess, permissionChecker, } from '../utils';
import { isEmpty } from 'lodash';

const useReturnedItems = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [selected, setSelected] = useState([]);

  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('customerName');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');

  const [exportData, setExportData] = useState('');

  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    await axios.get('/transactions/returned-items')
      .then(({data}) => {
        var filtered = data.data.filter(data => {
          data['customerName'] = data.customer.fullName; 
          data['productName'] = data.product.name;
          data['variantName'] = data.variant ? data.variant.name : '--';
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

  const openDialog = (action, isMultiple, data) => {
    setDialogOpen(true);
    setDialogAction(action);
    setDialogMessage(`Are you sure you want to ${action} the selected row/s.`);

    if (!isMultiple) {
      setSelected([data.id]);
    }
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setSelected([]);
  };

  const onConfirmDialog = () => {
    if (dialogAction === 'Approve') {
      setApproveReturnedItems();
    }
  }

  const setApproveReturnedItems = async () => {
    const apiData = {
      ids: selected,
    };

    setLoading(true);
    await axios.post('/transactions/approve-returned-items', apiData)
      .then(({data}) => {
        selected.map((data) => {
          let indexes = response.data.findIndex((i) => i.id === data)
          response.data.splice(indexes, 1);
        })

        toastSuccess(data.message);
        setLoading(false);
      })
      .catch(({response}) => {
        if (response.status === 500) {
          toastError(response.data.message);
          setLoading(false);
        }
      });
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
      label: 'Date Created',
    },
    permissionChecker('Returned Items', 'Approve') && {
      id: 'action',
      label: 'Actions',
      actionItems: [
        permissionChecker('Returned Items', 'Approve') && { 
          icon: <Done color='primary'/>,
          label: 'Approve',
          action: (e, rowData) => openDialog('Approve', false, rowData),
        },
      ].filter(Boolean),
    },
  ];

  const tableHeaderActions = {
    actionButtons: [
      {
        icon: <Download/>,
        color: 'success',
        label: 'Export',
        onClick: () => exportToCSV(exportData, 'Returned Items'),
      },
      permissionChecker('Returned Items', 'Approve') && {
        icon: <Done/>,
        color: 'primary',
        label: 'Approve',
        disabled: selected.length === 0,
        onClick: () => openDialog('Approve', true, null),
      },
    ].filter(Boolean),
    filterByOptions: [
      {
        label: 'Customer',
        value: 'customerName',
      },
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
    dialog: {
      open: dialogOpen,
      title: dialogAction,
      message: dialogMessage,
      onClose: closeDialog,
      onConfirm: onConfirmDialog,
    },
  }
};

export default useReturnedItems;