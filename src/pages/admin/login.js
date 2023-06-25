import React, { 
  Fragment,
} from 'react';

import { useNavigate } from 'react-router';

import {
  Card,
  Password,
  Button,
  WebViewContainer,
  MobileViewContainer,
  TextField,
} from '../../components';

import useAdminLogin from '../../hooks/use-admin-login';

import '../../../src/App.css';

import { isEmpty } from 'lodash';

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
  } = useAdminLogin();

  const navigate = useNavigate();

  return <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='row gy-4 gx-0' align='center'>
        <div className='col-12'>
          <h4>
            <strong>
              Login
            </strong>
          </h4>
        </div>
        
        {!isEmpty(apiValidationError) &&
          <div className='col-12'>
            <span className='input-error-message'>
              {`*${apiValidationError}`}
            </span>
          </div>
        }

        <div className='col-12'>
          <TextField
            name='userName'
            label='Username'
            {...register('userName', { 
              required: 'Username field is required.', 
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
            })}
            errors={fieldErrors}
          />
        </div>

        <div className='col-12'>
          <Button
            style={{  width: '100%' }}
            type='submit'
            label='Sign In'
          />
        </div>

        <div className='col-12'>
          <div className='row g-0'>
            <div className='col-12' align='right'>
              <span 
                role='button'
                style={{ textDecoration: 'underline', fontWeight: 'bold' }}
                onClick={() => navigate('/admin/forgot-password')}
              >
                Forgot Password?
              </span>
            </div>
          </div>
        </div>
      </div>
    </form>
  </>
};

const AdminLoginPage = () => {
  return <>
    <ResponsiveWrapper>
      <Form/>
    </ResponsiveWrapper>
  </>
};

export default AdminLoginPage;