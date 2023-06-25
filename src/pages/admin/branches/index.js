import { 
  Button,
  Table,
  ConfirmationDialog,
} from '../../../components';

import { permissionChecker } from '../../../utils';

import useBranches from '../../../hooks/use-branches';

import { Add } from '@mui/icons-material';

const BranchesPage = () => {
  const {
    navigate,
    loading,
    rows,
    tableRowsHeaders,
    tableHeaderActions,
    selected,
    setSelected,
    searchBy,
    setSearchBy,
    search,
    setSearch,
    dialog,
    fetchData,
  } = useBranches();

  return <>
    {permissionChecker('Branches', 'Create') && 
      <div className='mb-4' align='right'>
        <Button
          label='Add Branch'
          startIcon={<Add/>}
          onClick={() => navigate('/admin/branches/create')}
        />
      </div>
    }

    <div>
      <Table {...{
        loading,
        rows,
        tableRowsHeaders,
        tableHeaderActions,
        selected,
        setSelected,
        searchBy,
        setSearchBy,
        search,
        setSearch,
        fetchData,
      }}/>

      <ConfirmationDialog {...{
        open: dialog.open,
        onClose: dialog.onClose,
        title: dialog.title,
        message: dialog.message,
        onConfirm: dialog.onConfirm,
      }}/>
    </div>
  </>
};

export default BranchesPage;