import React, { Fragment, useEffect } from 'react';

import { 
  Box,
  Paper,
} from '@mui/material';

import { Add } from '@mui/icons-material';

import { TextField, PriceTextField, Button } from '../../../components';

import { isEmpty } from 'lodash';

import { useFieldArray } from 'react-hook-form';

import uniqid from 'uniqid';

import { PRIMARY_COLOR } from '../../../utils';

const AddVariations = ({ 
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
    name: 'variations'
  });

  const handleAppend = () => {
    append({ id: uniqid(), name: '', addOnsPrice: '0.00', stocks: 0 });
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
        <Fragment key={index}>
          <div className='col-12'>
            <div className='row g-4'>
              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6'>
                <TextField
                  key={field.id}
                  name={`variations.${index}.name`}
                  label='Name'
                  {...register(`variations.${index}.name`, { 
                    required: `Name field is required.`,
                  })}
                  error={
                    Boolean((fieldErrors.variations && fieldErrors.variations[index]) 
                      && fieldErrors.variations[index].name)
                  }
                  helperText={
                    (fieldErrors.variations && fieldErrors.variations[index]) 
                    && fieldErrors.variations[index].name?.message
                  }
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6'>
                <PriceTextField
                  key={field.id}
                  name={`variations.${index}.addOnsPrice`}
                  label='Price'
                  {...register(`variations.${index}.addOnsPrice`, { 
                    required: `Price field is required.`,
                  })}
                  value={fields[index].addOnsPrice}
                  error={
                    Boolean((fieldErrors.variations && fieldErrors.variations[index]) 
                      && fieldErrors.variations[index].addOnsPrice)
                  }
                  helperText={
                    (fieldErrors.variations && fieldErrors.variations[index]) 
                    && fieldErrors.variations[index].addOnsPrice?.message
                  }
                />
              </div>

              <div className='col-12' align='right'>
                <Button 
                  label='Remove' 
                  color='error' 
                  type='button' 
                  onClick={() => handleRemove(index)}
                />
              </div>
            </div>
          </div>
        </Fragment>
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
                  Add Variation
                </strong>
              </div>
            </div>
          </Paper>
        </Box>
      </div>
    </div>
  </>
};

export default AddVariations;