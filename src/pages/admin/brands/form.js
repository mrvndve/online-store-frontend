import { 
  TextField,
  CheckBoxField,
  Button,
  Card,
  Loading,
  FormError,
} from '../../../components';

import useBrandsForm from '../../../hooks/use-brands-form';

import { alphanumericOnly } from '../../../utils';

const BranchesFormPage = () => {
  const {
    formMode,
    register,
    fieldErrors,
    onSubmit,
    handleSubmit,
    loading,
    selectedRow,
    apiValidationErrors,
  } = useBrandsForm();

  return <>
    <FormError errors={apiValidationErrors}/>

    <Card style={{ padding: '35px 25px 25px 25px', }}>
      {!loading
        ?
        <div>
          <form id='brands-form' onSubmit={handleSubmit(onSubmit)}>
            <div className='row g-4'>
              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <TextField
                  name='name'
                  label='Name'
                  {...register('name', { 
                    required: 'Name field is required.',
                    pattern: { 
                      value: alphanumericOnly, 
                      message: 'Name field must be alphanumeric value only.' 
                    } 
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
                <CheckBoxField
                  name='isActive'
                  label='Active'
                  {...register('isActive')}
                  defaultChecked={selectedRow ? selectedRow.isActive : true}
                  errors={fieldErrors}
                />
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

export default BranchesFormPage;