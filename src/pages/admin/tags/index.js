import { 
  Button,
  Table,
  ConfirmationDialog,
  TextField,
  SelectField,
} from '../../../components';

import { permissionChecker } from '../../../utils';

import useTags from '../../../hooks/use-tags';

import { Add } from '@mui/icons-material';

const TagsPage = () => {
  const {
    navigate,
    loading,
    rows,
    tableRowsHeaders,
    tableHeaderActions,
    selected,
    setSelected,
    setSearchBy,
    setSearch,
    dialog,
    fetchData,
  } = useTags();

  return <>
    {permissionChecker('Tags', 'Create') && 
      <div className='mb-4' align='right'>
        <Button
          label='Add Tag'
          startIcon={<Add/>}
          onClick={() => navigate('/admin/tags/create')}
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

export default TagsPage;