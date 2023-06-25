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

const useBranches = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [selected, setSelected] = useState([]);

  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('name');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');

  const [exportData, setExportData] = useState('');

  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    await axios.get('/branches')
      .then(({data}) => {
        var filtered = data.data.filter(data => {
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
        ['Name']: data.name,
        ['Address']: data.address,
        ['Contact']: data.contact,
        ['Email']: data.email,
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
      deleteBranch();
    } else if (dialogAction === 'Activate') {
      activateDeactivateBranch('activate');
    } else if (dialogAction === 'Deactivate') {
      activateDeactivateBranch('deactivate');
    }
  }

  const deleteBranch = async () => {
    const apiData = {
      ids: selected,
    };

    setLoading(true);
    await axios.post('/branches/delete', apiData)
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

  const activateDeactivateBranch = async (action) => {
    const apiData = {
      ids: selected,
    };

    setLoading(true);
    await axios.post(`/branches/${action}`, apiData)
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

  const tableRowsHeaders = [
    {
      id: 'id',
      label: 'Id',
    },
    {
      id: 'name',
      label: 'Name',
    },
    {
      id: 'contact',
      label: 'Contact',
    },
    {
      id: 'email',
      label: 'Email',
    },
    {
      id: 'address',
      label: 'Address',
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
    (permissionChecker('Branches', 'Update') 
      || permissionChecker('Branches', 'Delete')
      || permissionChecker('Branches', 'Activate')
      || permissionChecker('Branches', 'Deactivate')
    ) && {
      id: 'action',
      label: 'Actions',
      actionItems: [
        { 
          icon: <Edit color='secondary'/>,
          label: 'Edit',
          action: (e, rowData) => navigate('/admin/branches/edit', { state: rowData }),
          permitted: permissionChecker('Branches', 'Update'),
        },
        { 
          icon: <Delete color='error'/>,
          label: 'Delete', 
          action: (e, rowData) => openDialog('Delete', false, rowData),
          permitted: permissionChecker('Branches', 'Delete'),
        },
        { 
          icon: <Lock color='warning'/>,
          label: 'Activate', 
          action: (e, rowData) => openDialog('Activate', false, rowData),
          permitted: permissionChecker('Branches', 'Activate'),
        },
        { 
          icon: <LockOpen color='warning'/>,
          label: 'Deactivate', 
          action: (e, rowData) => openDialog('Deactivate', false, rowData),
          permitted: permissionChecker('Branches', 'Deactivate'),
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
        onClick: () => exportToCSV(exportData, 'Branches'),
        skipPermission: true,
      },
      {
        icon: <Delete/>,
        color: 'error',
        label: 'Delete',
        disabled: selected.length === 0,
        onClick: () => openDialog('Delete', true, null),
        permitted: permissionChecker('Branches', 'Delete'),
      },
      {
        icon: <LockOpen/>,
        color: 'warning',
        label: 'Activate',
        disabled: selected.length === 0,
        onClick: () => openDialog('Activate', true, null),
        permitted: permissionChecker('Branches', 'Activate'),
      },
      {
        icon: <Lock/>,
        color: 'warning',
        label: 'Deactivate',
        disabled: selected.length === 0,
        onClick: () => openDialog('Deactivate', true, null),
        permitted: permissionChecker('Branches', 'Deactivate'),
      },
    ].filter(({permitted, skipPermission}) => permitted || skipPermission),
    filterByOptions: [
      {
        label: 'Name',
        value: 'name',
      },
      {
        label: 'Contact',
        value: 'contact',
      },
      {
        label: 'Email',
        value: 'email',
      },
      {
        label: 'Address',
        value: 'address',
      }
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

export default useBranches;