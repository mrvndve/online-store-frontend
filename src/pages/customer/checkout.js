import { Fragment } from 'react';

import { Card, Button } from '../../components';

import { Radio, Tooltip } from '@mui/material';

import { LocationOn, Payment, ShoppingCart,  } from '@mui/icons-material';

import { getCustomer, withCommasAndDecimal, paymentMethods, } from '../../utils'; 

import useCustomerCheckout from '../../hooks/use-customer-checkout';

import { isEmpty } from 'lodash';

const PriceWithDiscountComponent = ({sellerPrice, promotion}) => {
  const productDiscount = promotion.discountPercent / 100;
  const priceWithDiscount = withCommasAndDecimal((sellerPrice - (sellerPrice * productDiscount)).toFixed(2));

  return <>
    <span className='me-2'>₱ {priceWithDiscount}</span> 

    <span 
      style={{ 
        color: 'lightgrey', 
        textDecoration: 'line-through',
      }}
    >
      ₱ {withCommasAndDecimal(sellerPrice)}
    </span>
  </>
};

const CustomerCheckout = () => {
  const {
    cart,
    productsOrderedTotal,
    deliveryFee,
    selectedPaymentMethod,
    loading,
    handlePaymentMethodChange,
    checkoutOrder,
  } = useCustomerCheckout();

  // const gcashPaymentOnly = ((deliveryFee + productsOrderedTotal) > 30000);

  return <>
    <div className='row g-4'>
      <div className='col-12'>
        <Card padding={30}>
          <div className='mb-4'>
            <strong>
              <LocationOn/> Delivery Address
            </strong>
          </div>

          <div>
            {getCustomer().address}

            <br/>

            {getCustomer().contact}
          </div>
        </Card>
      </div>

      <div className='col-12'>
        <Card padding={30}>
          <div className='mb-4'>
            <strong>
              <ShoppingCart/> Products Ordered
            </strong>
          </div>

          <div>
            <div className='row g-4'>
              {cart && cart.map((item, index) => {
                const {
                  name: productName,
                  promotion,
                  sellerPrice,
                } = item.product;

                const {
                  variant,
                  quantity,
                } = item;

                const hasVariantPrice = (!isEmpty(variant) && variant.addOnsPrice > 0);

                return (
                  <Fragment key={index}>
                    <div className='col-12'>
                      <div className='mb-2'>
                        <strong>
                          {productName}
                        </strong>
                      </div>

                      <div className='mb-2'>
                        Variation: &nbsp;

                        {variant ? variant.name : 'No variation'}
                      </div>

                      <div className='mb-2'>
                        Quantity: &nbsp;

                        {quantity}
                      </div>

                      <div>
                        Unit Price: &nbsp;
                      
                        {(promotion && (!isEmpty(promotion) && promotion.isActive))
                            ? (
                              <>
                                <PriceWithDiscountComponent {...{
                                  sellerPrice: hasVariantPrice ? variant.addOnsPrice : sellerPrice,
                                  promotion,
                                }}/>
                              </>
                            )
                            : (
                              <>
                                <span>
                                  ₱ {withCommasAndDecimal(hasVariantPrice ? variant.addOnsPrice : sellerPrice)}
                                </span>
                              </>
                            )
                          }
                      </div>
                    </div>
                  </Fragment>
                );
              })}
              
              <div className='col-12' align='right'>
                <div className='mb-2'>
                  <strong>
                    Order Subtotal {`(${cart.length} Items)`}
                  </strong>
                </div>

                ₱ {withCommasAndDecimal(productsOrderedTotal)}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className='col-12'>
        <Card padding={30}>
          <div className='mb-4'>
            <strong>
                <Payment/> Payment Methods 
            </strong>
          </div>

          <div className='row g-4'>
            {paymentMethods && paymentMethods.map((i, index) => (
              <Fragment>
                <div className='col-12'>
                  <Radio
                    checked={selectedPaymentMethod === i.name}
                    onChange={() => handlePaymentMethodChange(i.name)}
                    value={selectedPaymentMethod}
                  />

                  {i.label}
                </div>
              </Fragment>
            ))}
          </div>
        </Card>
      </div>

      <div className='col-12'>
        <Card padding={30}>
          <div align='right'>
            <div className='row g-4'>
              <div className='col-12'>
                <div className='mb-2'>
                  <strong>
                    Order Sub Total
                  </strong>
                </div>

                <div>
                  ₱ {withCommasAndDecimal(productsOrderedTotal)}
                </div>
              </div>

              <div className='col-12'>
                <div className='mb-2'>
                  <strong>
                    Delivery Fee
                  </strong>
                </div>

                <div>
                  ₱ {withCommasAndDecimal(deliveryFee)}
                </div>
              </div>
              
              <div className='col-12'>
                <div className='mb-2'>
                  <strong>
                    Total Payment
                  </strong>
                </div>

                <div>
                  ₱ {withCommasAndDecimal(deliveryFee + productsOrderedTotal)}
                </div>
              </div>

              <div className='col-12'>
                <Button 
                  label={loading ? 'Processing...' : 'Check Out'}
                  color='tertiary'
                  onClick={() => checkoutOrder()}
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </>
};

export default CustomerCheckout;