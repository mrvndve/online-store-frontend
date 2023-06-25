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

const useRoles = () => {
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
    await axios.get('/roles')
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
        ['Remarks']: data.remarks,
        ['Permissions']: JSON.stringify(data.permissions),
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
      deleteRoles();
    } else if (dialogAction === 'Activate') {
      activateDeactivateRoles('activate');
    } else if (dialogAction === 'Deactivate') {
      activateDeactivateRoles('deactivate');
    }
  }

  const deleteRoles = async () => {
    const apiData = {
      ids: selected,
    };

    setLoading(true);
    await axios.post('/roles/delete', apiData)
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

  const activateDeactivateRoles = async (action) => {
    const apiData = {
      ids: selected,
    };

    setLoading(true);
    await axios.post(`/roles/${action}`, apiData)
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
      id: 'remarks',
      label: 'Remarks',
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
    (permissionChecker('Roles', 'Update') || permissionChecker('Roles', 'Delete')) && {
      id: 'action',
      label: 'Actions',
      actionItems: [
        { 
          icon: <Edit color='secondary'/>,
          label: 'Edit',
          action: (e, rowData) => navigate('/admin/roles/edit', { state: rowData }),
          permitted: permissionChecker('Roles', 'Update'),
        },
        { 
          icon: <Delete color='error'/>,
          label: 'Delete', 
          action: (e, rowData) => openDialog('Delete', false, rowData),
          permitted: permissionChecker('Roles', 'Delete'),
        },
        { 
          icon: <Lock color='warning'/>,
          label: 'Activate', 
          action: (e, rowData) => openDialog('Activate', false, rowData),
          permitted: permissionChecker('Roles', 'Activate'),
        },
        { 
          icon: <LockOpen color='warning'/>,
          label: 'Deactivate', 
          action: (e, rowData) => openDialog('Deactivate', false, rowData),
          permitted: permissionChecker('Roles', 'Deactivate'),
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
        onClick: () => exportToCSV(exportData, 'Roles'),
        skipPermission: true,
      },
      {
        icon: <Delete/>,
        color: 'error',
        label: 'Delete',
        disabled: selected.length === 0,
        onClick: () => openDialog('Delete', true, null),
        permitted: permissionChecker('Roles', 'Delete'),
      },
      {
        icon: <LockOpen/>,
        color: 'warning',
        label: 'Activate',
        disabled: selected.length === 0,
        onClick: () => openDialog('Activate', true, null),
        permitted: permissionChecker('Roles', 'Activate'),
      },
      {
        icon: <Lock/>,
        color: 'warning',
        label: 'Deactivate',
        disabled: selected.length === 0,
        onClick: () => openDialog('Deactivate', true, null),
        permitted: permissionChecker('Roles', 'Deactivate'),
      },
    ].filter(({permitted, skipPermission}) => permitted || skipPermission),
    filterByOptions: [
      {
        label: 'Name',
        value: 'name',
      },
      {
        label: 'Remarks',
        value: 'remarks',
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

export default useRoles;