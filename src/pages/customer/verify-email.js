import { useEffect, Fragment, } from 'react';

import { useParams } from 'react-router';

import { WebViewContainer, MobileViewContainer, Card } from '../../components';
import axios from 'axios';
import { toastError } from '../../utils';

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

const Form = () => (
  <>
    <div className='mb-4'>
      <h3>
        <strong>
          Your email has been verified.
        </strong>
      </h3>
    </div>

    <div>
      <h5>
        Your email is now verified login your account and enjoy shopping.
      </h5>
    </div>
  </>
);

const VerifyEmailPage = () => {
  const { verificationEmailToken } = useParams();
  
  const verifyEmail = () => {
    axios.post(`/customer/verify-email/${verificationEmailToken}`)
      .then(({data}) => {
      })
      .catch(err => {
        toastError(err.message)
      });
  };

  useEffect(() => {
    verifyEmail();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
 
  return (
    <ResponsiveWrapper>
      <Form/>
    </ResponsiveWrapper>
  );
};

export default VerifyEmailPage;