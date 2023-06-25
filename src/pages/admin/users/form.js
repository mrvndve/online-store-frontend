import { 
  TextField,
  SelectField,
  CheckBoxField,
  Button,
  Card,
  Loading,
  FormError,
} from '../../../components';

import { 
  numbersOnly,
  emailOnly,
} from '../../../utils';

import useUsersForm from '../../../hooks/use-users-form';

const UsersFormPage = () => {
  const {
    formMode,
    register,
    fieldErrors,
    onSubmit,
    handleSubmit,
    loading,
    roles,
    selectedRow,
    apiValidationErrors,
  } = useUsersForm();

  return <>
    <FormError errors={apiValidationErrors}/>

    <Card style={{ padding: '35px 25px 25px 25px', }}>
      {!loading
        ?
        <div>
          <form id='users-form' onSubmit={handleSubmit(onSubmit)}>
            <div className='row g-4'>
              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <TextField
                  name='userName'
                  label='Username'
                  {...register('userName', { 
                    required: 'Username field is required.',
                  })}
                  defaultValue={selectedRow?.userName}
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
                  name='firstName'
                  label='First Name'
                  {...register('firstName', { 
                    required: 'First Name field is required.',
                  })}
                  defaultValue={selectedRow?.firstName}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <TextField
                  name='middleName'
                  label='Middle Name (Optional)'
                  {...register('middleName')}
                  defaultValue={selectedRow?.middleName}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <TextField
                  name='lastName'
                  label='Last Name'
                  {...register('lastName', { 
                    required: 'Last Name field is required.',
                  })}
                  defaultValue={selectedRow?.lastName}
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
                <SelectField
                  name='role'
                  label='Role'
                  options={roles.map(data => ({
                    label: data.name,
                    value: data.id,
                  }))}
                  {...register('role', {
                    required: 'Role field is required.'
                  })}
                  hasQuickAdd={true}
                  quickAddPath='/admin/roles'
                  defaultValue={selectedRow?.role?.id}
                  errors={fieldErrors}
                />
              </div>

              {formMode === 'edit' && (
                <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                  <CheckBoxField
                    name='isActive'
                    label='Active'
                    {...register('isActive')}
                    defaultChecked={selectedRow ? selectedRow.isActive : true}
                    errors={fieldErrors}
                  />
                </div>
              )}
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

export default UsersFormPage;