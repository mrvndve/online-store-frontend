import React, { 
  Fragment,
} from 'react';

import { useNavigate } from 'react-router';

import {
  Card,
  Button,
  WebViewContainer,
  MobileViewContainer,
  Password,
} from '../../components';

import useCustomerPasswordReset from '../../hooks/use-customer-reset-password';

import '../../../src/App.css';

import { isEmpty } from 'lodash';

import { CheckCircle } from '@mui/icons-material';

const ResponsiveWrapper = ({
  children
}) => {
  return <>
    <Fragment>
      <WebViewContainer>
        <div align='center'>
          <Card padding={30} style={{ width: '35%' }}>
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
    apiValidationError,
    password,
    isReset,
    handlePasswordChange,
  } = useCustomerPasswordReset();

  const navigate = useNavigate();

  return <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='row gy-4 gx-0' align='center'>
        {isReset &&
          <div>
            <CheckCircle style={{ fontSize: 80, color: 'green' }}/>
          </div>
        }

        <div className='col-12'>
          <h4>
            <strong>
              { !isReset ? 'Reset Password' : 'Password Changed'}
            </strong>
          </h4>
        </div>
        
        {!isReset
          ?
          <>
            {!isEmpty(apiValidationError) && apiValidationError.map(err => (
              <div className='col-12'>
                <span className='input-error-message'>
                  {`*${err[Object.keys(err)]}.`}
                </span>
              </div>
            ))}

            <div className='col-12'>
              <Password
                name='newPassword'
                label='New Password'
                {...register('newPassword', { 
                  required: 'New password field is required.', 
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
                  required: 'Confirm password field is required.', 
                  validate: value => value === password || 'Confirm password does not match new password.',
                })}
                errors={fieldErrors}
              />
            </div>

            <div className='col-12'>
              <Button
                style={{  width: '100%' }}
                type='submit'
                label='Submit'
              />
            </div>
          </>
          :
          <>
            <div className='col-12 mb-4'>
              <span style={{ fontSize: 20}}>
                Your password has been changed, please go back to login page to sign in your account.
              </span>
            </div>

            <div className='col-12'>
              <div className='row g-0'>
                <div className='col-12' align='right'>
                  <span 
                    role='button'
                    style={{ textDecoration: 'underline', fontWeight: 'bold' }}
                    onClick={() => navigate('/login')}
                  >
                    Go to login
                  </span>
                </div>
              </div>
            </div>
          </>
        }
      </div>
    </form>
  </>
};

const CustomerResetPasswordPage = () => {
  return <>
    <ResponsiveWrapper>
      <Form/>
    </ResponsiveWrapper>
  </>
};

export default CustomerResetPasswordPage;