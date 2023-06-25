import { 
  TextField,
  Button,
  Card,
  Loading,
  FormError,
  SelectField,
  QuantityTextField,
} from '../../../components';

import { isEmpty } from 'lodash';

import useTransactionsForm from '../../../hooks/use-transactions-form';
import { withCommasAndDecimal } from '../../../utils';

const CurrentStocks = ({ selectedProduct, selectedVariant}) => (
  <>
    {(selectedProduct && isEmpty(selectedVariant)) && (
      <span>
        {`Current Stocks: ${selectedProduct.stocks}`} 
      </span>
    )}

    {(selectedProduct && !isEmpty(selectedVariant)) && (
      <span>
        {`Current Stocks: ${selectedVariant.stocks}`} 
      </span>
    )}
  </>
);

const TotalAmount = ({ selectedProduct, selectedVariant, quantity }) => {
  const hasVariantPrice = !isEmpty(selectedVariant) && selectedVariant.addOnsPrice > 0;
  const hasPromotion = selectedProduct.promotion && (!isEmpty(selectedProduct.promotion) && selectedProduct.promotion.isActive);
  const unitPrice = hasVariantPrice ? selectedVariant.addOnsPrice : selectedProduct.sellerPrice;
  const discount = hasPromotion ? ((unitPrice * (selectedProduct.promotion.discountPercent / 100))).toFixed(2) : 0;
  const total = quantity * (hasPromotion ? (unitPrice - discount).toFixed(2) : unitPrice);

  return <>
    <span>
      {`Total Amount: ₱ ${withCommasAndDecimal(total)}`}
    </span>
  </>
};

const TransactionsFormPage = () => {
  const {
    formMode,
    register,
    fieldErrors,
    onSubmit,
    handleSubmit,
    loading,
    apiValidationErrors,
    setSelectedProduct,
    selectedProduct,
    customers,
    products,
    setSelectedVariant,
    selectedVariant,
    setSelectedCustomer,
    quantity,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleQuantityChange,
    handleQuantityBlur,
    handleQuantitykeyPress,
  } = useTransactionsForm();

  return <>
    <FormError errors={apiValidationErrors}/>

    <Card style={{ padding: '35px 25px 25px 25px', }}>
      {!loading
        ?
        <div>
          <form id='transactions-form' onSubmit={handleSubmit(onSubmit)}>
            <div className='row g-4'>
              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <SelectField
                  name='customer'
                  label='Customer'
                  options={customers.map(data => ({
                    label: data.fullName,
                    value: data.id,
                  }))}
                  {...register('customer', { 
                    required: 'Customer field is required.',
                  })}
                  onChange={(e) => setSelectedCustomer(customers.find(i => i.id === e.target.value))}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <SelectField
                  name='product'
                  label='Product'
                  options={products.map(data => ({
                    label: data.name,
                    value: data.id,
                  }))}
                  {...register('product', { 
                    required: 'Product field is required.',
                  })}
                  onChange={(e) => setSelectedProduct(products.find(i => i.id === e.target.value))}
                  errors={fieldErrors}
                />
              </div>

              {(selectedProduct && !isEmpty(selectedProduct.variations)) && (
                <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                  <SelectField
                    name='variation'
                    label='Variation'
                    options={selectedProduct.variations.map(data => ({
                      label: data.name,
                      value: data.id,
                    }))}
                    {...register('variation', { 
                      required: 'Variation field is required.',
                    })}
                    onChange={(e) => setSelectedVariant(selectedProduct.variations.find(i => i.id == e.target.value))}
                    errors={fieldErrors}
                  />
                </div>
              )}

              {selectedProduct && (
                <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                  <QuantityTextField {...{
                    quantity,
                    handleIncreaseQuantity,
                    handleDecreaseQuantity,
                    handleQuantityChange,
                    handleQuantityBlur,
                    handleQuantitykeyPress,
                    stocks: selectedProduct.stocks,
                  }}/>
                </div>
              )}

              <div className='col-12'>
                <CurrentStocks {...{ selectedProduct, selectedVariant }}/>
              </div>

              {selectedProduct && (
                <div className='col-12'>
                  <TotalAmount {...{ selectedProduct, selectedVariant, quantity }}/>
                </div>
              )}
            </div>

            <div className='mt-4' align='right'>
              <Button
                type='submit'
                label={`${formMode === 'create' ? 'Save' : 'Update'}`}
              />
            </div>
          </form>
        </div>
        :
        <Loading/>
      }
    </Card>
  </>
};

export default TransactionsFormPage;