import React, { Fragment } from 'react';
import useCustomerForgotPassword from '../../hooks/use-customer-forgot-password';
import { 
  Card,
  TextField,
  Button,
  WebViewContainer,
  MobileViewContainer,
  FormError,
} from '../../components';
import { CheckCircle } from '@mui/icons-material';
import { emailOnly } from '../../utils';

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
    isEmailed,
    navigate
  } = useCustomerForgotPassword();

  return <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='row g-4 gx-0' align='center'>
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
            <FormError errors={apiValidationErrors}/>

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

            <div className='col-12' align='right'>
              <Button
                style={{ width: '100%' }}
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
                onClick={() => navigate('/login')}
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

const CustomerForgotPasswordPage = () => {
  return <>
    <ResponsiveWrapper>
      <Form/>
    </ResponsiveWrapper>
  </>
};

export default CustomerForgotPasswordPage;