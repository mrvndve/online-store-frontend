import React, { useEffect } from 'react';

import { 
  Box,
  Paper,
  IconButton,
  InputAdornment,
} from '@mui/material';

import { Add, Delete} from '@mui/icons-material';

import { TextField } from '../../../components';

import { isEmpty } from 'lodash';

import { useFieldArray } from 'react-hook-form';

import { PRIMARY_COLOR } from '../../../utils';

const AddSpecification = ({ 
  control,
  register,
  fieldErrors,
}) => {
  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'specifications'
  });

  const handleAppend = () => {
    append({ field: '' });
  };

  const handleRemove = (index) => {
    remove(index)
  };

  useEffect(() => {
    remove(0);
  }, [remove]);

  return <>
    <div className='row g-4'>
      {!isEmpty(fields) && fields.map((field, index) => (
        <div className='col-12'>
          <TextField
            key={field.id}
            name={`specifications.${index}.field`}
            label={`Specification ${index + 1}`}
            {...register(`specifications.${index}.field`, { 
              required: `Specification field is required.`,
            })}
            error={
              Boolean(fieldErrors.specifications 
              && fieldErrors.specifications[index])
            }
            helperText={
              (fieldErrors.specifications && fieldErrors.specifications[index]) 
              && fieldErrors.specifications[index].field.message
            }
            InputProps={{
              endAdornment: <InputAdornment position='end'>
                <IconButton
                  onClick={() => handleRemove(index)}
                  edge="end"
                  size='small'
                >
                  <Delete/>
                </IconButton>
              </InputAdornment>,
            }}
          />
        </div>
      ))}

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
            onClick={handleAppend}
          >
            <div align='center'>
              <div>
                <Add className='mx-2' style={{ fontSize: 20, marginBottom: 4 }}/>

                <strong>
                  Add Specification
                </strong>
              </div>
            </div>
          </Paper>
        </Box>
      </div>
    </div>
  </>
};

export default AddSpecification;