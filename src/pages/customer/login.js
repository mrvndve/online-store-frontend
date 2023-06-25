import React, { Fragment } from 'react';
import useCustomerLogin from '../../hooks/use-customer-login';
import { useNavigate } from 'react-router';

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
  } = useCustomerLogin();

  const navigate = useNavigate();

  return <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='row g-4 gx-0' align='center'>
        <div className='col-12'>
          <h4>
            <strong>
              Login
            </strong>
          </h4>
        </div>
        
        <FormError errors={apiValidationErrors}/>

        <div className='col-12'>
          <TextField
            name='userNameOrEmail'
            label='Username / Email'
            {...register('userNameOrEmail', { 
              required: 'Username or email field is required.', 
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

        <div className='col-12' align='right'>
          <Button
            style={{ width: '100%' }}
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
                onClick={() => navigate('/forgot-password')}
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

const CustomerLoginPage = () => {
  return <>
    <ResponsiveWrapper>
      <Form/>
    </ResponsiveWrapper>
  </>
};

export default CustomerLoginPage;