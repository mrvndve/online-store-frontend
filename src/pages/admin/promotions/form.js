import { 
  TextField,
  CheckBoxField,
  Button,
  Card,
  Loading,
  FormError,
} from '../../../components';

import { Paper } from '@mui/material';

import AddProducts from './add-products';

import usePromotionsForm from '../../../hooks/use-promotions-form';

import { numbersOnlyKeyPress, numbersOnly } from '../../../utils';

const PromotionsFormPage = () => {
  const {
    formMode,
    register,
    fieldErrors,
    onSubmit,
    handleSubmit,
    loading,
    selectedRow,
    apiValidationErrors,

    products,
    selectedProducts,
    isProductsModalOpen,
    handleOpenProductsModal,
    handleCloseProductsModal,
    handleAddProduct,
    handleRemoveProduct,
  } = usePromotionsForm();

  return <>
    <FormError errors={apiValidationErrors}/>

    <Card style={{ padding: '35px 25px 25px 25px', }}>
      {!loading
        ?
        <div>
          <form id='categories-form' onSubmit={handleSubmit(onSubmit)}>
            <div className='row g-4'>
              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <TextField
                  name='name'
                  label='Name'
                  {...register('name', { 
                    required: 'Name field is required.',
                  })}
                  defaultValue={selectedRow?.name}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <TextField
                  name='description'
                  label='Description'
                  {...register('description', { 
                    required: 'Description field is required.',
                  })}
                  defaultValue={selectedRow?.description}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <TextField
                  name='discountPercent'
                  label='Discount %'
                  {...register('discountPercent', { 
                    required: 'Discount Percent field is required.',
                    pattern: {
                      value: numbersOnly,
                      message: 'Discount Percent field must be numbers only.'
                    }
                  })}
                  onKeyPress={numbersOnlyKeyPress}
                  defaultValue={selectedRow?.discountPercent}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <CheckBoxField
                  name='isActive'
                  label='Active'
                  {...register('isActive')}
                  defaultChecked={selectedRow ? selectedRow.isActive : true}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-12'>
                <div className='mb-3'>
                  <strong>
                    Products
                  </strong>
                </div>
                
                <Paper className='p-3' variant='outlined'>
                  <AddProducts {...{
                    products,
                    selectedProducts,
                    isProductsModalOpen,
                    handleOpenProductsModal,
                    handleCloseProductsModal,
                    handleAddProduct,
                    handleRemoveProduct,
                  }}/>
                </Paper>
              </div>
            </div>

            <div className='mt-4' align='right'>
              <Button
                type='submit'
                label={`${formMode === 'create' ? 'Save' : 'Update'}`}
              />
            </div>
          </form>
        </div>
        :
        <Loading/>
      }
    </Card>
  </>
};

export default PromotionsFormPage;