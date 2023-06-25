import { 
  Table,
  TextField,
  SelectField,
  Button,
} from '../../../components';

import { Add } from '@mui/icons-material';

import { permissionChecker } from '../../../utils';

import useTransactions from '../../../hooks/use-transactions';

const TransactionsPage = () => {
  const {
    loading,
    rows,
    tableRowsHeaders,
    tableHeaderActions,
    selected,
    setSelected,
    setSearchBy,
    setSearch,
    fetchData,
    navigate,
  } = useTransactions();

  return <>
    {permissionChecker('Transactions', 'Create') && 
      <div className='mb-4' align='right'>
        <Button
          label='Add Transaction'
          startIcon={<Add/>}
          onClick={() => navigate('/admin/transactions/create')}
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
        fetchData,
        filterComponent: (
          <div className='row g-3'>
            <div className='col-12'>
              <SelectField
                name='search_by'
                label='Search By'
                options={tableHeaderActions.filterByOptions.map(data => ({
                  label: data.label,
                  value: data.value,
                }))}
                onChange={e => setSearchBy(e.target.value)}
                defaultValue={tableHeaderActions.filterByOptions[0]['value']}
              />
            </div>
      
            <div className='col-12'>
              <TextField
                name='search'
                label='Search'
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <div className='col-12'>
              <Button
                type='submit'
                label='Search'
                style={{ width: '100%' }}
                onClick={() => {
                  fetchData();
                  setSearch('');
                }}
              />
            </div>
          </div>
        ),
      }}/>
    </div>
  </>
};

export default TransactionsPage;