import { 
  Button,
  Card,
  CheckBoxField,
  EmptyBanner,
  QuantityTextField,
  ConfirmationDialog,
} from '../../components';
import useCustomerCart from '../../hooks/use-customer-cart';
import { isEmpty } from 'lodash';
import { Fragment } from 'react';
import { imgBaseUrl, withCommasAndDecimal } from '../../utils';

const PriceWithDiscountComponent = ({sellerPrice, promotion}) => {
  const productDiscount = promotion.discountPercent / 100;
  const priceWithDiscount = withCommasAndDecimal((sellerPrice - (sellerPrice * productDiscount)).toFixed(2));

  return <>
    <span className='me-2'>₱ {priceWithDiscount}</span> 

    <br/>

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

const CustomerCart = () => {
  const {
    cart,
    selectedCartIds,
    totalCartPrice,
    totalPriceToUse,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleQuantityChange,
    handleQuantityBlur,
    handleQuantitykeyPress,
    handleRemoveCartSingleClick,
    handleCheckBoxChange,
    handleCheckBoxChangeAll,
    proceedToCheckout,
    handleCloseNoAddressDialog,
    handleYesNoAddress,
    noAddressDialogOpen,
  } = useCustomerCart();

  return <>
    <div className='row g-4'>      
      <div className='col-12'>
        <Card padding={'10px 30px 10px 30px'}>
          <CheckBoxField
            indeterminate={selectedCartIds.length > 0 && selectedCartIds.length < cart.length}
            checked={selectedCartIds.length === cart.length}
            label={<strong>Select All</strong>}
            onChange={(e) => handleCheckBoxChangeAll(e)}
          />
        </Card>
      </div>
      
      {!isEmpty(cart) 
        ? (
          <>
            {cart && cart.map((item, index) => {
              const {
                images,
                name,
                sellerPrice,
                promotion,
              } = item.product;

              const { id, variant, quantity } = item;

              const hasVariantPrice = (!isEmpty(variant) && variant.addOnsPrice > 0);

              return (
                <Fragment key={index}>
                  <div className='col-12'>
                    <Card padding={'10px 30px 20px 30px'}>
                      <div>
                        <CheckBoxField 
                          checked={selectedCartIds.indexOf(id) !== -1} 
                          onChange={(e) => handleCheckBoxChange(e, id)}
                        />
                      </div>

                      <div className='d-flex flex-wrap gap-5'>
                        <div
                          style={{
                            padding: 10,
                            backgroundColor: 'lightgrey',
                          }}
                        >
                          <img
                            style={{
                              height: '80px',
                              width: '100%',
                              objectFit: 'fill',
                            }}
                            src={`${imgBaseUrl}/${images[0].fileName}`}
                          />
                        </div>

                        <div style={{ width: 200 }}>
                          <strong>
                            {name}
                          </strong>
                        </div>

                        <div style={{ width: 200 }}>
                          <strong>
                            Variant:
                          </strong>

                          <br/>

                          <div className='mt-2'>
                            <span style={{ fontWeight: 500 }}>
                              {variant ? variant.name : 'No Variation'}
                            </span>
                          </div>
                        </div>

                        <div style={{ width: 200 }}>
                          <strong>
                            Unit Price:
                          </strong>

                          <br/>

                          <div className='mt-3'>
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

                        <div style={{ width: 200 }}>
                          <strong>
                            Quantity:
                          </strong>

                          <br/>

                          <div className='mt-3' style={{ width: 150 }}>
                            <QuantityTextField {...{
                              handleIncreaseQuantity: (e) => handleIncreaseQuantity(e, index),
                              handleDecreaseQuantity: (e) => handleDecreaseQuantity(e, index),
                              handleQuantityChange: (e) => handleQuantityChange(e, index),
                              handleQuantityBlur: (e) => handleQuantityBlur(e, index),
                              handleQuantitykeyPress: (e) => handleQuantitykeyPress(e),
                              quantity,
                            }}/>
                          </div>
                        </div>

                        <div style={{ width: 150 }}>
                          <strong>
                            Total Price:
                          </strong>

                          <br/>

                          <div className='mt-3' style={{ width: 150 }}>
                            ₱ {withCommasAndDecimal(quantity * totalPriceToUse(hasVariantPrice ? variant.addOnsPrice : sellerPrice, promotion))}
                          </div>
                        </div>

                        <div style={{ width: 150 }}>
                          <Button 
                            color='tertiary'
                            label='Remove'
                            onClick={() => handleRemoveCartSingleClick(id)}
                          />
                        </div>
                      </div>
                    </Card>
                  </div>
                </Fragment>
              )
            })}

            <div className='col-12'>
              <Card padding={30}>
                <div className='d-flex flex-wrap gap-2 justify-content-between align-items-center'>
                  <div>
                    <div className='mb-2'>
                      <strong>
                        Total Price:
                      </strong>
                    </div>

                    <span>
                      ₱ {withCommasAndDecimal(totalCartPrice)}
                    </span>
                  </div>

                  <div>
                    <Button 
                      color='primary' 
                      label='Proceed to Checkout'
                      disabled={selectedCartIds.length === 0}
                      onClick={() => proceedToCheckout()}
                    />
                  </div>
                </div>
              </Card>

              <ConfirmationDialog {...{
                open: noAddressDialogOpen,
                title: 'Account Address Not Set',
                message: 'your account does not have an address yet, please apply an address to proceed.',
                onClose: handleCloseNoAddressDialog,
                onConfirm: handleYesNoAddress,
              }}/>
            </div>
          </>
        )
        : (
          <div className='col-12'>
            <Card padding={30}>
              <EmptyBanner product text='No Products Found'/>
            </Card>
          </div>
        )
      }
    </div>
  </>
};

export default CustomerCart;