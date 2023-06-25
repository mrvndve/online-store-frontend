import React, { 
  useState, 
  useEffect,
} from 'react';

import { 
  Box,
  Paper,
} from '@mui/material';

import { Add, Delete } from '@mui/icons-material';

import { 
  Modal, 
  Button,
  TextField,
} from '../../../components';

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Checkbox,
  Divider,
  IconButton,
} from '@mui/material';

import { isEmpty } from 'lodash';

import { PRIMARY_COLOR } from '../../../utils';

const AddCategories = ({ 
  categories,
  selectedCategories,
  isCategoriesModalOpen,
  handleOpenCategoriesModal,
  handleCloseCategoriesModal,
  handleAddCategory,
  handleRemoveCategory,
}) => {
  const [checked, setChecked] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);

  const handleToggle = (value) => {
    const findElement = checked.find(i => i.id === value.id);
    const newChecked = [...checked];
    if (isEmpty(findElement)) {
      newChecked.push(value);
    } else {
      const currentIndex = checked.findIndex(i => i.id === value.id);
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleSelectAllClick = (e) => {
    document.getElementById('checkbox-list-label-select-all').click();
  };

  const handleSelectAllToggle = (e) => {
    if (e.target.checked) {
      let newChecked = [];
      filteredCategories.map(i => newChecked.push({ id: i.id, name: i.name }));
      setChecked(newChecked);
      return;
    }

    setChecked([]);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setSearch('');
    setChecked([]);
  }, [isCategoriesModalOpen]);

  useEffect(() => {
    setFilteredCategories(categories);
  }, [categories]);

  useEffect(() => {
    if (search === '') {
      setFilteredCategories(categories);
    } else {
      const newArr = [...categories];
      const filtered = newArr.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
      setFilteredCategories(filtered);
    }
    
    setChecked([]);
  }, [search]);

  return <>
    <div className='row g-4'>
      {!isEmpty(selectedCategories) && (
        <div className='col-12'>
          {selectedCategories.map((i, index) => (
            <div>
              <List
                dense
                sx={{
                  '& > :not(style)': {
                    '&:hover': {
                      backgroundColor: 'whitesmoke',
                    },
                  },
                }}
              >
                <ListItem 
                  secondaryAction={
                    <IconButton 
                      style={{ marginRight: 0.5 }} 
                      edge='end'
                      onClick={() => handleRemoveCategory(index)}
                      size='small'
                    >
                      <Delete/>
                    </IconButton>
                  }
                >
                  <ListItemText primary={<strong>{i.name}</strong>}/>          
                </ListItem>
              </List>
            </div>
          ))}
        </div>
      )}

      <div className='col-12'>
        <Box
          sx={{
            '& > :not(style)': {
              width: '100%',
              color: 'lightgrey',
              cursor: 'pointer',
              borderStyle: 'dashed',
              borderWidth: 3,
              borderColor: 'lightgrey',
              '&:hover': {
                color: PRIMARY_COLOR.bgColor,
                borderColor: PRIMARY_COLOR.bgColor,
              },
            },
          }}
        >
          <Paper 
            variant='outlined' 
            square 
            sx={{
              padding: 1
            }}
            onClick={handleOpenCategoriesModal}
          >
            <div align='center'>
              <div>
                <Add className='mx-2' style={{ fontSize: 20, marginBottom: 4 }}/>

                <strong>
                  Add Category
                </strong>
              </div>
            </div>
          </Paper>
        </Box>
      </div>
    </div>

    <Modal
      title='Categories'
      isOpen={isCategoriesModalOpen}
      handleClose={handleCloseCategoriesModal}
      width={600}
    >
      <div className='mb-4'>
        <TextField label='Search' onChange={(e) => handleSearch(e)}/>
      </div>

      {!isEmpty(filteredCategories) 
      ? (
        <div>
          <Paper variant='outlined' squared style={{ maxHeight: 400, overflowY: 'scroll' }}>
            <List disablePadding>
              <ListItem key={'checkbox-list-label-select-all'} disablePadding>
                <ListItemButton role={undefined} onClick={(e) => handleSelectAllClick(e)} dense>
                  <ListItemIcon>
                    <Checkbox
                      id='checkbox-list-label-select-all'
                      edge='start'
                      disableRipple
                      indeterminate={checked.length > 0 && checked.length < filteredCategories.length}
                      checked={checked.length === filteredCategories.length}
                      onClick={() => handleSelectAllClick()}
                      onChange={(e) => handleSelectAllToggle(e)}
                    />
                  </ListItemIcon>

                  <ListItemText primary='Select All' />
                </ListItemButton>
              </ListItem>

              <Divider variant='string' component='li' />

              {filteredCategories.map(i => {
                const labelId = `checkbox-list-label-${i.id}`;
  
                return (
                  <>
                    <ListItem key={i.id} disablePadding>
                      <ListItemButton role={undefined} onClick={() => handleToggle({ id: i.id, name: i.name })} dense>
                        <ListItemIcon>
                          <Checkbox
                            edge='start'
                            checked={!isEmpty(checked.find(check => check.id === i.id))}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </ListItemIcon>
  
                        <ListItemText id={labelId} primary={i.name} />
                      </ListItemButton>
                    </ListItem>
  
                    <Divider variant='string' component='li' />
                  </>
                );
              })}
            </List>
          </Paper>
        </div>
      ) 
      : (
        <div align='center'>
          <h4>
            No Records Found
          </h4>
        </div>
      )}

      <div className='mt-4' align='right'>
        <Button
          label='Add' 
          type='button'
          disabled={checked.length === 0}
          onClick={() => handleAddCategory(checked)}
        />
      </div>
    </Modal>
  </>
};

export default AddCategories;