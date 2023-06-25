import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Download,
  Done,
  Close,
  DeliveryDining,
} from '@mui/icons-material';
import axios from 'axios';
import {
  exportToCSV,
  getPaymentMethodsLabel,
  getStatusLabel,
} from '../utils';
import { toastError, toastSuccess, permissionChecker, } from '../utils';
import { isEmpty } from 'lodash';

const useDeliveries = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [selected, setSelected] = useState([]);

  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('customerName');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');

  const [exportData, setExportData] = useState('');

  const [drivers, setDrivers] = useState([]);
  const [driverModalOpen, setDriverModalOpen] = useState(false);
  
  const [driverId, setDriverId] = useState(null);
  const [transId, setTransId] = useState(null);

  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    await axios.get('/transactions/deliveries')
      .then(({data}) => {
        var filtered = data.data.filter(data => {
          data['customerName'] = data.customer.fullName; 
          data['productName'] = data.product.name;
          data['driverName'] = data.driver?.fullName;
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

  const fetchDrivers = async () => {
    await axios.get('/transactions/riders')
      .then(({data}) => {
        setDrivers(data.data);
      })
      .catch(err => {
        toastError(err.message);
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
        ['Payment Method']: data.paymentMethod,
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
    if (dialogAction === 'Complete') {
      setCompleteStatus();
    } else if (dialogAction === 'Cancel') {
      setCancelStatus();
    }
  }

  const setCompleteStatus = async () => {
    const apiData = {
      ids: selected,
    };

    setLoading(true);
    await axios.post('/transactions/set-complete-deliveries', apiData)
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

  const setCancelStatus = async () => {
    const apiData = {
      ids: selected,
    };

    setLoading(true);
    await axios.post('/transactions/set-cancel-deliveries', apiData)
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

  const handleOpenDriverModal = (transId) => {
    setDriverModalOpen(true);
    setTransId(transId);
  };

  const handleCloseDriverModal = () => {
    setDriverModalOpen(false);
    setTransId(null);
    setDriverId(null);
    fetchData();
  };

  const handleSubmitAssignDriver = () => {
    if (isEmpty(driverId)) {
      toastError('Please select a driver.');
    } else {
      axios.post('/transactions/assign-driver', { transId, driverId })
        .then(({data}) => {
          toastSuccess(data.message);
          handleCloseDriverModal();
        })
        .catch(err => {
          toastError(err.message);
        });
    }
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
      id: 'driverName',
      label: 'Driver',
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
      id: 'contact',
      label: 'Contact',
    },
    {
      id: 'address',
      label: 'Address',
    },
    // {
    //   id: 'createdAt',
    //   label: 'Delivery Date',
    //   isDate: true,
    // },
    (permissionChecker('Deliveries', 'Completion')  
      || permissionChecker('Deliveries', 'Cancellation') 
      || permissionChecker('Deliveries', 'Assign Driver')
    ) && {
      id: 'action',
      label: 'Actions',
      actionItems: [
        permissionChecker('Deliveries', 'Assign Driver') && { 
          icon: <DeliveryDining color='primary'/>,
          label: 'Assign Driver',
          action: (e, rowData) => handleOpenDriverModal(rowData.id),
        },
        
        permissionChecker('Deliveries', 'Completion') && { 
          icon: <Done color='success'/>,
          label: 'Complete',
          action: (e, rowData) => openDialog('Complete', false, rowData),
        },
        permissionChecker('Deliveries', 'Cancellation') && { 
          icon: <Close color='error'/>,
          label: 'Cancel', 
          action: (e, rowData) => openDialog('Cancel', false, rowData),
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
        onClick: () => exportToCSV(exportData, 'Deliveries'),
      },
      permissionChecker('Deliveries', 'Completion') && {
        icon: <Done/>,
        color: 'primary',
        label: 'Complete',
        disabled: selected.length === 0,
        onClick: () => openDialog('Complete', true, null),
      },
      permissionChecker('Deliveries', 'Cancellation') && {
        icon: <Close/>,
        color: 'error',
        label: 'Cancel',
        disabled: selected.length === 0,
        onClick: () => openDialog('Cancel', true, null),
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

  useEffect(() => {
    fetchDrivers();
  }, []);

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

    driverModalOpen,
    handleCloseDriverModal,
    drivers,
    handleSubmitAssignDriver,
    setDriverId,
  }
};

export default useDeliveries;