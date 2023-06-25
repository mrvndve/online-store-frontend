import React, { 
  Fragment,
} from 'react';

import { useNavigate } from 'react-router';

import {
  Card,
  Button,
  WebViewContainer,
  MobileViewContainer,
  TextField,
} from '../../components';

import useForgotPassword from '../../hooks/use-admin-forgot-password';

import '../../../src/App.css';

import { isEmpty } from 'lodash';

import { emailOnly } from '../../utils';

import { CheckCircle } from '@mui/icons-material';

const ResponsiveWrapper = ({
  children
}) => {
  return <>
    <Fragment>
      <WebViewContainer>
        <div className='login-page-container d-flex align-items-center justify-content-center h-100 p-4'>
          <Card elevation={5} padding={30} style={{ width: '35%' }}>
            {children}
          </Card>
        </div>
      </WebViewContainer>

      <MobileViewContainer>
        <div className='d-flex align-items-center justify-content-center h-100 p-3'>
          <Card elevation={5} padding={30}>
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
    isEmailed,
  } = useForgotPassword();

  const navigate = useNavigate();

  return <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='row gy-4 gx-0' align='center'>
        {isEmailed &&
          <div>
            <CheckCircle style={{ fontSize: 80, color: 'green' }}/>
          </div>
        }

        <div className='col-12'>
          <h4>
            <strong>
              { !isEmailed ? 'Forgot Password' : 'Password Reset Email Sent'}
            </strong>
          </h4>
        </div>
        
        {!isEmailed
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
                An email has been sent to your rescue email address. Follow the directions in the email to reset your password.
              </span>
            </div>
          </>
        }

        <div className='col-12'>
          <div className='row g-0'>
            <div className='col-12' align='right'>
              <span 
                role='button'
                style={{ textDecoration: 'underline', fontWeight: 'bold' }}
                onClick={() => navigate('/admin/login')}
              >
                Back to login
              </span>
            </div>
          </div>
        </div>
      </div>
    </form>
  </>
};

const AdminForgotPasswordPage = () => {
  return <>
    <ResponsiveWrapper>
      <Form/>
    </ResponsiveWrapper>
  </>
};

export default AdminForgotPasswordPage;