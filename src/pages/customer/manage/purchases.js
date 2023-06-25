import {
  Button, 
  Card, 
  EmptyBanner, 
  SelectField,
  Modal,
  TextField,
  TextAreaField,
} from '../../../components';

import { 
  Typography,
  Tabs,
  Tab,
  Box,
  Rating,
} from '@mui/material';

import SideMenu from './side-menu';

import useCustomerPurchases from '../../../hooks/use-customer-purchases';

import { isEmpty } from 'lodash';

import { Fragment } from 'react';

import { apiDomain, getPaymentMethodsLabel, orderStatus, withCommasAndDecimal } from '../../../utils';

import moment from 'moment';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Products = ({ trans }) => (
  <>
    <div style={{ padding: '20px 0px 20px 0px' }}>
      <div className='d-flex flex-wrap gap-3'>
        <div
          style={{ backgroundColor: 'lightgrey', padding: 10 }}
        >
          <img
            style={{
              width: 100,
              height: 100,
            }} 
            src={`${apiDomain}/uploads/${trans.product.images[0]?.fileName}`}

          />
        </div>

        <div>
          <strong>
            {trans.product.name}
          </strong>

          <br/>

          <span>
            Unit Price: &nbsp;
            {`₱ ${withCommasAndDecimal(trans.unitPrice)}`}
          </span>

          <br/>

          <span>
            Quantity: &nbsp;
            {trans.quantity}
          </span>

          <br/>

          <span>
            Payment: &nbsp;
            {getPaymentMethodsLabel(trans.paymentMethod)}
          </span>

          {trans.variant && (
            <>
              <br/>

              <span>
                Variation: &nbsp;
                {trans.variant.name}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  </>
);

const CustomerPurchases = () => {
  const {
		forDeliveryTransactions,
		completedTransactions,
		cancelledTransactions,
		returnedTransactions,
    handleTabChange,
		tabValue,
    handleTabSelectChange,
    openModal,
		modalTitle,
		handleOpenModal,
		handleCloseModal,
    onSubmit,
    handleSubmit,
		register,
    fieldErrors,
    ratingValue,
    handleRateChange,
  } = useCustomerPurchases();

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
              My Purchases
            </Typography>

            <Typography
              variant='body2' 
              component='div'
            >
              Manage your orders & transactions.
            </Typography>
          </div>

          <hr/>

          <div className='mt-4'>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: { xs: 'none', sm: 'block' } }}>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="For Delivery" {...a11yProps(0)} />
                <Tab label="Completed" {...a11yProps(1)} />
                <Tab label="Cancelled" {...a11yProps(2)} />
                <Tab label="Returned" {...a11yProps(3)} />
              </Tabs>
            </Box>

            <Box sx={{ display: { sm: 'none' } }}>
              <SelectField 
                options={[
                  { label: 'For Delivery', value: 0 },
                  { label: 'Completed', value: 1 },
                  { label: 'Cancelled', value: 2 },
                  { label: 'Returned', value: 3 },
                ]}
                value={tabValue}
                onChange={(e) => handleTabSelectChange(e.target.value)}
              />
            </Box>

            <TabPanel value={tabValue} index={0}>
              {!isEmpty(forDeliveryTransactions) 
                ? (
                  <>
                    {forDeliveryTransactions.map((trans, index) => (
                      <Fragment key={index}>
                        <Products {...{ trans }}/>

                        <div align='right'>
                          <Button 
                            color='tertiary' 
                            label='Cancel Order'
                            onClick={() => handleOpenModal('Cancel Order', trans.id)}
                            disabled={(moment(trans.createdAt).diff(new Date(), 'days') + 1) > 1}
                          />
                        </div>

                        <hr/>
                      </Fragment>
                    ))}
                  </>
                )
                : (
                  <>
                    <EmptyBanner product text='No Products Found'/>
                  </>
                )
              }
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              {!isEmpty(completedTransactions) 
                ? (
                  <>
                    {completedTransactions.map((trans, index) => (
                      <Fragment key={index}>
                        <Products {...{ trans }}/>

                        <div align='right'>
                          {trans.status === orderStatus.COMPLETED && (
                            <Button
                              className='mx-3' 
                              color='tertiary' 
                              label='Rate Order'
                              onClick={() => handleOpenModal('Rate Order', trans.id)}
                            />
                          )}

                          <Button 
                            color='primary' 
                            label={`${trans.status === orderStatus.PENDING_RETURN ? 'Return Processing' : 'Return / Refund'}`}
                            onClick={() => handleOpenModal('Return Order', trans.id)}
                            disabled={(moment(trans.createdAt).diff(new Date(), 'days') + 1) >= (trans.product?.daysOfWarranty || 7) || trans.status === orderStatus.PENDING_RETURN}
                          />
                        </div>

                        <hr/>
                      </Fragment>
                    ))}
                  </>
                )
                : (
                  <>
                    <EmptyBanner product text='No Products Found'/>
                  </>
                )
              }
            </TabPanel>
            
            <TabPanel value={tabValue} index={2}>
              {!isEmpty(cancelledTransactions) 
                ? (
                  <>
                    {cancelledTransactions.map((trans, index) => (
                      <Fragment key={index}>
                        <Products {...{ trans }}/>

                        <hr/>
                      </Fragment>
                    ))}
                  </>
                )
                : (
                  <>
                    <EmptyBanner product text='No Products Found'/>
                  </>
                )
              }
            </TabPanel>

            <TabPanel value={tabValue} index={3}>
                {!isEmpty(returnedTransactions) 
                ? (
                  <>
                    {returnedTransactions.map((trans, index) => (
                      <Fragment key={index}>
                        <Products {...{ trans }}/>

                        <hr/>
                      </Fragment>
                    ))}
                  </>
                )
                : (
                  <>
                    <EmptyBanner product text='No Products Found'/>
                  </>
                )
              }
            </TabPanel>
          </div>
        </Card>
        
        <Modal {...{
          isOpen: openModal,
          handleClose: handleCloseModal,
          title: modalTitle,
        }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='row g-4'>
                <div className='col-12'>
                  {modalTitle === 'Cancel Order' && (
                    <TextAreaField
                      name='cancelReason'
                      label='Reason'
                      {...register('cancelReason', { 
                        required: 'Cancel reason field is required.',
                      })}
                      errors={fieldErrors}
                    />
                  )}

                  {modalTitle === 'Return Order' && (
                    <TextAreaField 
                      name='returnReason'
                      label='Reason'
                      {...register('returnReason', { 
                        required: 'Return reason field is required.',
                      })}
                      errors={fieldErrors}
                    />
                  )}

                  {modalTitle === 'Rate Order' && (
                    <TextAreaField 
                      name='ratingComment'
                      label='Comment'
                      {...register('ratingComment', { 
                        required: 'Comment field is required.',
                      })}
                      errors={fieldErrors}
                    />
                  )}
                </div>
                
                {modalTitle === 'Rate Order' && (
                  <div className='col-12'>
                    <Rating
                      name="simple-controlled"
                      value={ratingValue}
                      onChange={(e, newValue) => handleRateChange(newValue)}
                    />
                  </div>
                )}
        
                <div className='col-6'>
                  <Button
                    style={{ width: '100%' }}
                    type='button'
                    label='Cancel' 
                    onClick={handleCloseModal}
                  />
                </div>
    
                <div className='col-6'>
                  <Button
                    type='submit'
                    style={{ width: '100%' }}
                    color='tertiary'
                    label='Submit' 
                  />
                </div>
              </div>
            </form>
        </Modal>
      </div>
    </div>
  </>
};

export default CustomerPurchases;