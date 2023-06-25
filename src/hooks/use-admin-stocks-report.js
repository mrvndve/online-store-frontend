import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Edit,
  Delete,
  Lock,
  LockOpen,
  Download,
} from '@mui/icons-material';
import axios from 'axios';
import {
  exportToCSV,
  toastSuccess,
  permissionChecker,
} from '../utils';
import { toastError } from '../utils';
import { isEmpty } from 'lodash';

const useStocksReport = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [selected, setSelected] = useState([]);

  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('productName');

  const [exportData, setExportData] = useState('');

  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    await axios.get('/products/stocks-report')
      .then(({data}) => {
        var filtered = data.data.filter(data => {
          data.productName = data.product?.name;
          data.supplierName = data.supplier?.name;
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
        ['Product']: data?.productName,
        ['Supplier']: data?.supplierName,
        ['Receipt No']: data.receiptNo,
        ['Decrease Reason']: data.decreaseReason,
        ['Status']: data.status,
        ['Date Created']: data.createdAt,
        ['Date Updated']: data.updatedAt,
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
      id: 'productName',
      label: 'Product',
    },
    {
      id: 'supplierName',
      label: 'Supplier',
    },
    {
      id: 'receiptNo',
      label: 'Receipt No',
    },
    {
      id: 'descreaseReason',
      label: 'Decrease Reason',
    },
    {
      id: 'status',
      label: 'Status',
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
  ];

  const tableHeaderActions = {
    actionButtons: [
      {
        icon: <Download/>,
        color: 'success',
        label: 'Export',
        onClick: () => exportToCSV(exportData, 'Stocks Report'),
        skipPermission: true,
      },
    ].filter(({permitted, skipPermission}) => permitted || skipPermission),
    filterByOptions: [
      {
        label: 'Product',
        value: 'productName',
      },
      {
        label: 'Supplier',
        value: 'supplierName',
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

export default useStocksReport;