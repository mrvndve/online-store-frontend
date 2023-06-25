import { 
  Button,
  Card,
  Loading,
  FormError,
  PriceTextField,
} from '../../../components';

import useDeliveryFee from '../../../hooks/use-delivery-fee';
import { permissionChecker } from '../../../utils';

const DeliveryFeePage = () => {
  const {
    register,
    fieldErrors,
    onSubmit,
    handleSubmit,
    loading,
    apiValidationErrors,
    user,
  } = useDeliveryFee();

  return <>
    <FormError errors={apiValidationErrors}/>

    <div className='row g-5'>
      <div className='col-sm-12 col-md-12 col-lg-12 col-xl-6'>
        <Card style={{ padding: '35px 25px 25px 25px', }}>
          {!loading
            ?
            <div>
              <form id='change-password-form' onSubmit={handleSubmit(onSubmit)}>
                <div className='row g-4'>
                  <div className='col-12'>
                    <PriceTextField
                      name='defaultDeliveryFee'
                      label='Default Delivery Fee'
                      {...register('defaultDeliveryFee', { 
                        required: 'Default Delivery Fee field is required.',
                      })}
                      readOnly={!permissionChecker('Delivery Fee', 'Update')}
                      defaultValue={user?.branch?.defaultDeliveryFee}
                      errors={fieldErrors}
                    />
                  </div>

                  <div className='col-12'>
                    <PriceTextField
                      name='outsideCityDeliveryFee'
                      label='Outside City Delivery Fee'
                      {...register('outsideCityDeliveryFee', { 
                        required: 'Outside City Delivery Fee Delivery Fee field is required.',
                      })}
                      readOnly={!permissionChecker('Delivery Fee', 'Update')}
                      defaultValue={user?.branch?.outsideCityDeliveryFee}
                      errors={fieldErrors}
                    />
                  </div>
                </div>

                {permissionChecker('Delivery Fee', 'Update') && (
                  <div className='mt-4' align='right'>
                    <Button
                      type='submit'
                      label='Update'
                    />
                  </div>
                )}
              </form>
            </div>
            :
            <Loading/>
          }
        </Card>
      </div>
    </div>
  </>
};

export default DeliveryFeePage;