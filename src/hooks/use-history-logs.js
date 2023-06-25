import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Download, Visibility,
} from '@mui/icons-material';
import axios from 'axios';
import {
  exportToCSV,
} from '../utils';
import { toastError } from '../utils';
import { isEmpty } from 'lodash';

const useHistoryLogs = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [selected, setSelected] = useState([]);

  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('userName');

  const [filterByModule, setFilterByModule] = useState('');
  const [filterByAction, setFilterByAction] = useState('');

  const [exportData, setExportData] = useState('');

  const [viewAuditModalOpen, setViewAuditModalOpen] = useState(false);
  const [selectedAuditData, setSelectedAuditData] = useState({});

  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    await axios.get('/admin/audit')
      .then(({data}) => {
        const byModuleAndAction = data.data.filter(data => data.module === filterByModule && data.action === filterByAction);

        var filtered = ((!isEmpty(filterByModule) && !isEmpty(filterByAction)) ? byModuleAndAction : data.data).filter(data => {
          data['userName'] = data.user.fullName; 
          data['historyAction'] = data.action;
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
        ['User']: data?.userName,
        ['Module']: data.module,
        ['Action']: data.historyAction,
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
      id: 'userName',
      label: 'User',
    },
    {
      id: 'module',
      label: 'Module',
    },
    {
      id: 'historyAction',
      label: 'Action',
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
    {
      id: 'action',
      label: 'Actions',
      actionItems: [
        { 
          icon: <Visibility color='secondary'/>,
          label: 'View Data',
          action: (e, rowData) => handleOpenViewAuditModal(rowData),
        },
      ]
    }
  ];

  const tableHeaderActions = {
    actionButtons: [
      {
        icon: <Download/>,
        color: 'success',
        label: 'Export',
        onClick: () => exportToCSV(exportData, 'History Logs'),
      },
    ],
    filterByOptions: [
      {
        label: 'User',
        value: 'userName',
      },
    ],
  };

  const handleOpenViewAuditModal = (data) => {
    setViewAuditModalOpen(true);
    setSelectedAuditData(data);
  };

  const handleCloseViewAuditModal = () => {
    setViewAuditModalOpen(false);
    setSelectedAuditData({});
  }

  useEffect(() => {
    if (!isEmpty(response?.data)) {
      exportDatas(response.data);
    }
  }, [response]);

  const auditModules = [
    'Brands',
    'Categories',
    'Customers',
    'Products',
    'Promotions',
    'Roles',
    'Settings',
    'Suppliers',
    'Tags',
    'Deliveries',
    'Users',
    'Returned Items',
    'Transactions',
  ];

  const auditActions = {
    Brands: ['Create', 'Update', 'Delete', 'Activate', 'Deactivate'],
    Categories: ['Create', 'Update', 'Delete', 'Activate', 'Deactivate'],
    Customers: ['Activate', 'Delete', 'Deactivate'],
    Products: ['Create', 'Update', 'Delete', 'Update Stocks', 'Acticate', 'Deactivate'],
    Promotions: ['Create', 'Update', 'Delete', 'Activate', 'Deactivate'],
    Roles: ['Create', 'Update', 'Delete', 'Activate', 'Deactivate'],
    Settings: ['Change', 'Password', 'Update Profile'],
    Suppliers: ['Create', 'Update', 'Delete', 'Activate', 'Deactivate'],
    Tags: ['Create', 'Update', 'Delete', 'Activate', 'Deactivate'],
    Deliveries: ['Assign Driver', 'Cancel', 'Complete'],
    Users: ['Login', 'Create', 'Update', 'Delete', 'Activate', 'Deactivate', 'Reset Password'],
    ['Returned Items']: ['Approve'],
    Transactions: ['Process'],
  };

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

    auditModules,
    auditActions,
    setFilterByModule,
    setFilterByAction,
    filterByModule,
    filterByAction,

    selectedAuditData,
    viewAuditModalOpen,
    handleCloseViewAuditModal,
  }
};

export default useHistoryLogs;