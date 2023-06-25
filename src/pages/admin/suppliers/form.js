import { 
  TextField,
  CheckBoxField,
  Button,
  Card,
  Loading,
  FormError,
} from '../../../components';

import { emailOnly, numbersOnly, } from '../../../utils';

import useSuppliersForm from '../../../hooks/use-suppliers-form';

const SuppliersFormPage = () => {
  const {
    formMode,
    register,
    fieldErrors,
    onSubmit,
    handleSubmit,
    loading,
    selectedRow,
    apiValidationErrors,
  } = useSuppliersForm();

  return <>
    <FormError errors={apiValidationErrors}/>

    <Card style={{ padding: '35px 25px 25px 25px', }}>
      {!loading
        ?
        <div>
          <form id='suppliers-form' onSubmit={handleSubmit(onSubmit)}>
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
                  name='contact'
                  label='Contact'
                  {...register('contact', { 
                    required: 'Contact field is required.',
                    pattern: {
                      value: numbersOnly,
                      message: 'Contact field must be numbers only.'
                    }
                  })}
                  defaultValue={selectedRow?.contact}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <TextField
                  name='email'
                  label='Email'
                  {...register('email', { 
                    required: 'Email field is required.',
                    pattern: { 
                      value: emailOnly, 
                      message: 'Email field format is incorrect.' 
                    } 
                  })}
                  defaultValue={selectedRow?.email}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <TextField
                  name='address'
                  label='Address'
                  {...register('address', { 
                    required: 'Address field is required.',
                  })}
                  defaultValue={selectedRow?.address}
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

export default SuppliersFormPage;