import React, { Fragment } from 'react';
import useCustomerSignUp from '../../hooks/use-customer-sign-up';
import { emailOnly } from '../../utils';

import { 
  Card,
  TextField,
  Password,
  Button,
  WebViewContainer,
  MobileViewContainer,
  FormError,
} from '../../components';

const ResponsiveWrapper = ({ children }) => {
  return <>
    <Fragment>
      <WebViewContainer>
        <div align='center'>
          <Card padding={30} style={{ width: '30%' }}>
            {children}
          </Card>
        </div>
      </WebViewContainer>

      <MobileViewContainer>
        <div align='center'>
          <Card padding={30}>
            {children}
          </Card>
        </div>
      </MobileViewContainer>
    </Fragment>
  </>
};

const Form = () => {
  const {
    register,
    fieldErrors,
    onSubmit,
    handleSubmit,
    apiValidationErrors,
    handlePasswordChange,
    handleUserNameChange,
    password,
    isRegistered,
  } = useCustomerSignUp();

  return <>
    {isRegistered 
    ? (
      <div>
        <div className='mb-4'>
          <h3>
            <strong>
              You are now registed
            </strong>
          </h3>
        </div>

        <div>
          <h5>
            Please check your email, a message has been sent to you for it's verification.
          </h5>
        </div>
      </div>
    )
    : (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='row g-4 gx-0' align='center'>
          <div className='col-12'>
            <h4>
              <strong>
                Sign Up
              </strong>
            </h4>
          </div>
          
          <FormError errors={apiValidationErrors}/>

          <div className='col-12'>
            <TextField
              name='userName'
              label='Username'
              {...register('userName', { 
                required: 'Username field is required.', 
              })}
              onChange={(e) => handleUserNameChange(e)}
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
              errors={fieldErrors}
            />
          </div>

          <div className='col-12'>
            <TextField
              name='middleName'
              label='Middle Name (Optional)'
              {...register('middleName')}
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
              errors={fieldErrors}
            />
          </div>

          <div className='col-12'>
            <Password
              name='password'
              label='Password'
              {...register('password', { 
                required: 'Password field is required.',
                minLength: {
                  value: 8,
                  message: 'Password should be 8 minimum characters.'
                },
              })}
              onChange={(e) => handlePasswordChange(e)}
              errors={fieldErrors}
            />
          </div>

          <div className='col-12'>
            <Password
              name='confirmPassword'
              label='Confirm Password'
              {...register('confirmPassword', { 
                required: 'Confirm Password field is required.',
                validate: value => value === password || 'Confirm password does not match password.',
              })}
              errors={fieldErrors}
            />
          </div>

          <div className='col-12' align='right'>
            <Button
              type='submit'
              label='Submit'
            />
          </div>
        </div>
      </form>
    )}
  </>
};

const CustomerSignUpPage = () => {
  return <>
    <ResponsiveWrapper>
      <Form/>
    </ResponsiveWrapper>
  </>
};

export default CustomerSignUpPage;