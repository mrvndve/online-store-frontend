import { 
  Button,
  Card,
  FormError,
  TextField,
} from '../../../components';

import { Typography } from '@mui/material';

import SideMenu from './side-menu';

import useCustomerProfile from '../../../hooks/use-customer-profile';

import { 
  getCustomer,
  emailOnly,
} from '../../../utils';

const CustomerProfile = () => {
  const {
    register,
    fieldErrors,
    onSubmit,
    handleSubmit,
    loading,
    apiValidationErrors,
  } = useCustomerProfile();

  return <>
    <div className='row g-4'>
      <div className='col-sm-12 col-md-12 col-lg-12 col-xl-2'>
        <SideMenu/>
      </div>

      <div className='col-sm-12 col-md-12 col-lg-12 col-xl-10'>
        <Card padding={30}>
          <div className='mb-3'>
            <Typography
              fontWeight='bold' 
              variant='body1' 
              component='div'
            >
              My Profile
            </Typography>

            <Typography
              variant='body2' 
              component='div'
            >
              Manage and protect your account.
            </Typography>
          </div>

          <hr/>

          <div className='mt-4'>
            <form id='customer-profile-form' onSubmit={handleSubmit(onSubmit)}>
              <div className='row g-4'>
                <div className='col-sm-12 col-md-12 col-lg-12 col-xl-6'>
                  <div className='row g-4'>
                    <div className='col-12'>
                      <FormError errors={apiValidationErrors}/>
                    </div>

                    <div className='col-12'>
                      <TextField
                        name='userName'
                        label='Username'
                        {...register('userName', { 
                          required: 'Username field is required.',
                        })}
                        defaultValue={getCustomer()?.userName}
                        errors={fieldErrors}
                      />
                    </div>

                    <div className='col-12'>
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
                        defaultValue={getCustomer()?.email}
                        errors={fieldErrors}
                      />
                    </div>

                    <div className='col-12'>
                      <TextField
                        name='firstName'
                        label='First Name'
                        {...register('firstName', { 
                          required: 'First Name field is required.',
                        })}
                        defaultValue={getCustomer()?.firstName}
                        errors={fieldErrors}
                      />
                    </div>

                    <div className='col-12'>
                      <TextField
                        name='middleName'
                        label='Middle Name (Optional)'
                        {...register('middleName')}
                        defaultValue={getCustomer()?.middleName}
                        errors={fieldErrors}
                      />
                    </div>

                    <div className='col-12'>
                      <TextField
                        name='lastName'
                        label='Last Name'
                        {...register('lastName', { 
                          required: 'Last Name field is required.',
                        })}
                        defaultValue={getCustomer()?.lastName}
                        errors={fieldErrors}
                      />
                    </div>

                    <div className='col-12' align='right'>
                      <Button type='submit' label='Update'/>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  </>
};

export default CustomerProfile;