import { 
  Button,
  Card,
  FormError,
  Password,
} from '../../../components';

import { Typography } from '@mui/material';

import SideMenu from './side-menu';

import useCustomerChangePassword from '../../../hooks/use-customer-change-password';

const CustomerPassword = () => {
  const {
    register,
    fieldErrors,
    onSubmit,
    handleSubmit,
    apiValidationErrors,
  } = useCustomerChangePassword();

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
              My Password
            </Typography>

            <Typography
              variant='body2' 
              component='div'
            >
              Change and secure your password.
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
                      <Password
                        name='oldPassword'
                        label='Old Password'
                        {...register('oldPassword', { 
                          required: 'Old Password field is required.',
                        })}
                        errors={fieldErrors}
                      />
                    </div>

                    <div className='col-12'>
                      <Password
                        name='newPassword'
                        label='New Password'
                        {...register('newPassword', { 
                          required: 'New Password field is required.',
                        })}
                        errors={fieldErrors}
                      />
                    </div>

                    <div className='col-12'>
                      <Password
                        name='confirmPassword'
                        label='Confirm Password'
                        {...register('confirmPassword', { 
                          required: 'Confirm Password field is required.',
                        })}
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

export default CustomerPassword;