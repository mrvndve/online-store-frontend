import { 
  TextField,
  SelectField,
  TextAreaField,
  CheckBoxField,
  Button,
  Card,
  Loading,
  FormError,
  PriceTextField,
  Uploader,
} from '../../../components';

import { Paper } from '@mui/material';

import AddCategories from './add-categories';

import AddSpecification from './add-specifications';

import AddVariations from './add-variations';

import AddTags from './add-tags';

import useProductsForm from '../../../hooks/use-products-form';

const ProductsFormPage = () => {
  const {
    formMode,
    register,
    control,
    fieldErrors,
    onSubmit,
    handleSubmit,
    loading,
    selectedRow,
    apiValidationErrors,
    brands,
    tags,
    categories,
    productImages,
    setProductImages,

    isCategoriesModalOpen,
    handleOpenCategoriesModal,
    handleCloseCategoriesModal,
    handleAddCategory,
    handleRemoveCategory,
    selectedCategories,

    isTagsModalOpen,
    handleOpenTagsModal,
    handleCloseTagsModal,
    handleAddTag,
    handleRemoveTag,
    selectedTags,
  } = useProductsForm();

  return <>
    <FormError errors={apiValidationErrors}/>

    <Card style={{ padding: '35px 25px 25px 25px', }}>
      {!loading
        ?
        <div>
          <form id='products-form' onSubmit={handleSubmit(onSubmit)}>
            <div className='row g-4'>
              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <TextField
                  name='skuCode'
                  label='SKU'
                  {...register('skuCode', { 
                    required: 'SKU field is required.',
                  })}
                  defaultValue={selectedRow?.skuCode}
                  errors={fieldErrors}
                />
              </div>

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
                  name='subName'
                  label='Sub Name'
                  {...register('subName', { 
                    required: 'Sub name field is required.',
                  })}
                  defaultValue={selectedRow?.subName}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <SelectField
                  name='brand'
                  label='Brand'
                  options={brands.map(data => ({
                    label: data.name,
                    value: data.id,
                  }))}
                  {...register('brand', {
                    required: 'Brand field is required.'
                  })}
                  hasQuickAdd={true}
                  quickAddPath='/admin/brands'
                  defaultValue={selectedRow?.brand?.id}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <TextField
                  name='modelNumber'
                  label='Model Number'
                  {...register('modelNumber', { 
                    required: 'Model number field is required.',
                  })}
                  defaultValue={selectedRow?.modelNumber}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <PriceTextField
                  name='price'
                  label='Price'
                  {...register('price', { 
                    required: 'Price field is required.',
                  })}
                  defaultValue={selectedRow?.price}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <PriceTextField
                  name='sellerPrice'
                  label='SRP'
                  {...register('sellerPrice', { 
                    required: 'SRP field is required.',
                  })}
                  defaultValue={selectedRow?.sellerPrice}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <TextField
                  name='daysOfWarranty'
                  label='Days of Warranty'
                  {...register('daysOfWarranty', { 
                    required: 'Days of Warranty field is required.',
                  })}
                  defaultValue={selectedRow?.daysOfWarranty}
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

              <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                <TextAreaField
                  name='description'
                  label='Description'
                  {...register('description', { 
                    required: 'Description field is required.',
                  })}
                  defaultValue={selectedRow?.description}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-12'>
                <div className='mb-3'>
                  <strong>
                    Product Images
                  </strong>
                </div>

                <div className='mb-3'>
                  <Uploader {...{
                    type: 'images',
                    files: productImages,
                    setFiles: setProductImages,
                  }}/>
                </div>
              </div>

              <div className='col-12'>
                <div className='mb-3'>
                  <strong>
                    Categories
                  </strong>
                </div>
                
                <Paper className='p-3' variant='outlined'>
                  <AddCategories {...{
                    categories,
                    selectedCategories,
                    isCategoriesModalOpen,
                    handleOpenCategoriesModal,
                    handleCloseCategoriesModal,
                    handleAddCategory,
                    handleRemoveCategory,
                  }}/>
                </Paper>
              </div>

              <div className='col-12'>
                <div className='mb-3'>
                  <strong>
                    Tags
                  </strong>
                </div>
                
                <Paper className='p-3' variant='outlined'>
                  <AddTags {...{
                    tags,
                    selectedTags,
                    isTagsModalOpen,
                    handleOpenTagsModal,
                    handleCloseTagsModal,
                    handleAddTag,
                    handleRemoveTag,
                  }}/>
                </Paper>
              </div>

              <div className='col-12'>
                <div className='mb-3'>
                  <strong>
                    Specifications
                  </strong>
                </div>
                
                <Paper className='p-3' variant='outlined'>
                  <AddSpecification {...{
                    control,
                    register,
                    fieldErrors,
                  }}/>
                </Paper>
              </div>

              <div className='col-12'>
                <div className='mb-3'>
                  <strong>
                    Variations
                  </strong>
                </div>
                
                <Paper className='p-3' variant='outlined'>
                  <AddVariations {...{
                    control,
                    register,
                    fieldErrors,
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

export default ProductsFormPage;