import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Edit,
  Delete,
  Lock,
  LockOpen,
  Download,
  Add,
  Remove,
} from '@mui/icons-material';
import axios from 'axios';
import {
  exportToCSV,
  toastSuccess,
  permissionChecker,
} from '../utils';
import { toastError } from '../utils';
import { isEmpty } from 'lodash';

const useProducts = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [selected, setSelected] = useState([]);

  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('skuCode');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');

  const [isManageStockModalOpen, setIsManageStockModalOpen] = useState(false);
  const [manageStockData, setManageStockData] = useState({});

  const [exportData, setExportData] = useState('');

  const [categories, setCategories] = useState([]);
  const [filterByCategory, setFilterByCategory] = useState('');

  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    await axios.get('/products')
      .then(({data}) => {
        const byCategory = data.data.filter(data => data.categories.some(c => c.id === filterByCategory));

        var filtered = (!isEmpty(filterByCategory) ? byCategory : data.data).filter(data => {
          data['brandName'] = data.brand?.name;
          data['promotionDiscountPercent'] = data.promotion?.discountPercent;
          return data[searchBy].toLowerCase().includes(search.toLowerCase());
        });

        setResponse(state => ({...state, data: filtered, status: data.status}));
        setLoading(false);
      })
      .catch(err => {
        toastError(err.message);
        setLoading(false);
      });
  };

  const fetchCategories = async () => {
    await axios.get('/categories')
      .then(({data}) => {
        setCategories(data.data);
      })
      .catch(err => {
        toastError(err);
      });
  };

  const exportDatas = (expData) => {
    let arr = [];

    expData.map(data => {
      arr.push({
        ['Sku Code']: data.skuCode,
        ['Product Name']: data.name,
        ['Product Brand']: data?.brandName,
        ['Product Price']: data.price,
        ['Product SRP']: data.sellerPrice,
        ['Discount %']: data?.promotionDiscountPercent,
        ['Stocks']: data.stocks,
        ['Stocks Before']: data.stocksBefore,
        ['Stocks After']: data.stocksAfter,
        ['Active']: data.isActive,
        ['Date Created']: data.createdAt,
        ['Date Updated']: data.updatedAt,
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
    if (dialogAction === 'Delete') {
      deleteProduct();
    } else if (dialogAction === 'Activate') {
      activateDeactivateProduct('activate');
    } else if (dialogAction === 'Deactivate') {
      activateDeactivateProduct('deactivate');
    }
  }

  const deleteProduct = async () => {
    const apiData = {
      ids: selected,
    };

    setLoading(true);
    await axios.post('/products/delete', apiData)
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

  const activateDeactivateProduct = async (action) => {
    const apiData = {
      ids: selected,
    };

    setLoading(true);
    await axios.post(`/products/${action}`, apiData)
      .then(({data}) => {
        selected.map((data) => {
          let indexes = response.data.findIndex((i) => i.id === data)
          response.data[indexes]['isActive'] = action === 'activate' ? true : false;
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

  const handleOpenManageStocksModal = (rowData, formMode) => {
    setIsManageStockModalOpen(true);
    const data = {
      ...rowData,
      formMode, 
    };
    setManageStockData(data);
  };

  const handleCloseManageStocksModal = () => {
    setIsManageStockModalOpen(false);
    fetchData();
  };

  const tableRowsHeaders = [
    {
      id: 'id',
      label: 'Id',
    },
    {
      id: 'skuCode',
      label: 'SKU',
    },
    {
      id: 'name',
      label: 'Product Name',
    },
    {
      id: 'brandName',
      label: 'Product Brand',
    },
    {
      id: 'price',
      label: 'Product Price',
      isPrice: true,
    },
    {
      id: 'sellerPrice',
      label: 'Product SRP',
      isPrice: true,
    },
    {
      id: 'promotionDiscountPercent',
      label: 'Discount %',
    },
    {
      id: 'stocks',
      label: 'Stocks',
    },
    {
      id: 'stocksBefore',
      label: 'Stocks Before',
    },
    {
      id: 'stocksAfter',
      label: 'Stocks After',
    },
    {
      id: 'isActive',
      label: 'Active',
      isBoolean: true,
    },
    {
      id: 'createdAt',
      label: 'Date Created',
      isDateTime: true,
    },
    {
      id: 'updatedAt',
      label: 'Date Updated',
      isDateTime: true,
    },
    (permissionChecker('Products', 'Update') 
      || permissionChecker('Products', 'Delete')
      || permissionChecker('Products', 'Activate')
      || permissionChecker('Products', 'Deactivate')
      || permissionChecker('Products', 'Add Stocks')
      || permissionChecker('Products', 'Decrease Stocks')
    ) && {
      id: 'action',
      label: 'Actions',
      actionItems: [
        { 
          icon: <Edit color='secondary'/>,
          label: 'Edit',
          action: (e, rowData) => navigate('/admin/products/edit', { state: rowData }),
          permitted: permissionChecker('Products', 'Update'),
        },
        { 
          icon: <Delete color='error'/>,
          label: 'Delete', 
          action: (e, rowData) => openDialog('Delete', false, rowData),
          permitted: permissionChecker('Products', 'Delete'),
        },
        { 
          icon: <Lock color='warning'/>,
          label: 'Activate', 
          action: (e, rowData) => openDialog('Activate', false, rowData),
          permitted: permissionChecker('Products', 'Activate'),
        },
        { 
          icon: <LockOpen color='warning'/>,
          label: 'Deactivate', 
          action: (e, rowData) => openDialog('Deactivate', false, rowData),
          permitted: permissionChecker('Products', 'Deactivate'),
        },
        { 
          icon: <Add color='success'/>,
          label: 'Add Stocks', 
          action: (e, rowData) => handleOpenManageStocksModal(rowData, 'Add Stocks'),
          permitted: permissionChecker('Products', 'Add Stocks'),
        },
        { 
          icon: <Remove color='error'/>,
          label: 'Decrease Stocks', 
          action: (e, rowData) => handleOpenManageStocksModal(rowData, 'Decrease Stocks'),
          permitted: permissionChecker('Products', 'Decrease Stocks'),
        },
      ].filter(({permitted}) => permitted),
    },
  ];

  const tableHeaderActions = {
    actionButtons: [
      {
        icon: <Download/>,
        color: 'success',
        label: 'Export',
        onClick: () => exportToCSV(exportData, 'Products'),
        skipPermission: true,
      },
      {
        icon: <Delete/>,
        color: 'error',
        label: 'Delete',
        disabled: selected.length === 0,
        onClick: () => openDialog('Delete', true, null),
        permitted: permissionChecker('Products', 'Delete'),
      },
      {
        icon: <LockOpen/>,
        color: 'warning',
        label: 'Activate',
        disabled: selected.length === 0,
        onClick: () => openDialog('Activate', true, null),
        permitted: permissionChecker('Products', 'Activate'),
      },
      {
        icon: <Lock/>,
        color: 'warning',
        label: 'Deactivate',
        disabled: selected.length === 0,
        onClick: () => openDialog('Deactivate', true, null),
        permitted: permissionChecker('Products', 'Deactivate'),
      },
    ].filter(({permitted, skipPermission}) => permitted || skipPermission),
    filterByOptions: [
      {
        label: 'SKU',
        value: 'skuCode',
      },
      {
        label: 'Product Brand',
        value: 'brandName',
      },
      {
        label: 'Product Name',
        value: 'name',
      },
      {
        label: 'Stocks',
        value: 'stocks',
      },
    ],
  };

  useEffect(() => {
    if (!isEmpty(response?.data)) {
      exportDatas(response.data);
    }
  }, [response]);

  useEffect(() => {
    fetchCategories();
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

    handleCloseManageStocksModal,
    isManageStockModalOpen,
    manageStockData,

    categories,
    setFilterByCategory,
  }
};

export default useProducts;