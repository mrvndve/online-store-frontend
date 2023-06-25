import { 
  TextField,
  Button,
  Card,
  Loading,
  FormError,
} from '../../../../components';

import { numbersOnly, emailOnly } from '../../../../utils';

import useAdminSettingsProfile from '../../../../hooks/use-admin-settings-profile';

const ProfilePage = () => {
  const {
    register,
    fieldErrors,
    onSubmit,
    handleSubmit,
    loading,
    apiValidationErrors,
    userProfile,
  } = useAdminSettingsProfile();

  return <>
    <FormError errors={apiValidationErrors}/>

    <div className='row g-5'>
      <div className='col-sm-12 col-md-12 col-lg-12 col-xl-6'>
        <Card style={{ padding: '35px 25px 25px 25px', }}>
          {!loading
            ?
            <div>
              <form id='profile-form' onSubmit={handleSubmit(onSubmit)}>
                <div className='row g-4'>
                  <div className='col-12'>
                    <TextField
                      name='userName'
                      label='User Name'
                      {...register('userName', { 
                        required: 'User Name field is required.',
                      })}
                      defaultValue={userProfile?.userName}
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
                      defaultValue={userProfile?.firstName}
                      errors={fieldErrors}
                    />
                  </div>

                  <div className='col-12'>
                    <TextField
                      name='middleName'
                      label='Middle Name'
                      {...register('middleName')}
                      defaultValue={userProfile?.middleName}
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
                      defaultValue={userProfile?.lastName}
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
                      defaultValue={userProfile?.email}
                      errors={fieldErrors}
                    />
                  </div>

                  <div className='col-12'>
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
                      defaultValue={userProfile?.contact}
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

export default ProfilePage;