import { 
  Password,
  Button,
  Card,
  Loading,
  FormError,
} from '../../../../components';

import useAdminSettingsChangePassword from '../../../../hooks/use-admin-settings-change-password';

const ChangePasswordPage = () => {
  const {
    register,
    fieldErrors,
    onSubmit,
    handleSubmit,
    loading,
    apiValidationErrors,
  } = useAdminSettingsChangePassword();

  return <>
    <FormError errors={apiValidationErrors}/>

    <div className='row g-5'>
      <div className='col-sm-12 col-md-12 col-lg-12 col-xl-6'>
        <Card style={{ padding: '35px 25px 25px 25px', }}>
          {!loading
            ?
            <div>
              <form id='change-password-form' onSubmit={handleSubmit(onSubmit)}>
                <div className='row g-4'>
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
                </div>

                <div className='mt-4' align='right'>
                  <Button
                    type='submit'
                    label='Update'
                  />
                </div>
              </form>
            </div>
            :
            <Loading/>
          }
        </Card>
      </div>
    </div>
  </>
};

export default ChangePasswordPage;