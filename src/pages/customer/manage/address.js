import { 
  Button,
  Card,
  FormError,
  TextAreaField,
  TextField,
  SelectField,
} from '../../../components';

import { Typography } from '@mui/material';

import SideMenu from './side-menu';

import useCustomerAddress from '../../../hooks/use-customer-address';

import { 
  getCustomer,
  numbersOnly,
  numbersOnlyKeyPress,
} from '../../../utils';

const CustomerAddress = () => {
  const {
    register,
    fieldErrors,
    onSubmit,
    handleSubmit,
    loading,
    apiValidationErrors,
    handleRegionChange,
    handleProvinceChange,
    handleCitiesChange,
    regions,
    provinces,
    cities,
    barangays,
  } = useCustomerAddress();

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
              My Address
            </Typography>

            <Typography
              variant='body2' 
              component='div'
            >
              Manage your address and contact.
            </Typography>
          </div>

          <hr/>

          <div className='mt-4'>
            <form id='customer-profile-form' onSubmit={handleSubmit(onSubmit)}>
              <div className='row g-4'>
                <div className='col-sm-12 col-md-12 col-lg-12 col-xl-6'>
                  <div className='row g-4'>
                    <div className='col-12'>
                      <FormError errors={apiValidationErrors}/>
                    </div>

                    <div className='col-12'>
                      <SelectField
                        name='region'
                        label='Region'
                        options={regions.map(data => ({
                          label: data.name,
                          value: data.reg_code,
                        }))}
                        {...register('region', {
                          required: 'Region field is required.'
                        })}
                        defaultValue={getCustomer()?.region}
                        onChange={handleRegionChange}
                        errors={fieldErrors}
                      />
                    </div>

                    <div className='col-12'>
                      <SelectField
                        name='province'
                        label='Province'
                        options={provinces.map(data => ({
                          label: data.name,
                          value: data.prov_code,
                        }))}
                        {...register('province', {
                          required: 'Province field is required.'
                        })}
                        defaultValue={getCustomer()?.province}
                        disabled={provinces.length === 0}
                        onChange={handleProvinceChange}
                        errors={fieldErrors}
                      />
                    </div>

                    <div className='col-12'>
                      <SelectField
                        name='city'
                        label='City / Municipality'
                        options={cities.map(data => ({
                          label: data.name,
                          value: data.mun_code,
                        }))}
                        {...register('city', {
                          required: 'City field is required.'
                        })}
                        defaultValue={getCustomer()?.city}
                        disabled={cities.length === 0}
                        onChange={handleCitiesChange}
                        errors={fieldErrors}
                      />
                    </div>

                    <div className='col-12'>
                      <SelectField
                        name='barangay'
                        label='Barangay'
                        options={barangays.map(data => ({
                          label: data.name,
                          value: data.brgy_code,
                        }))}
                        {...register('barangay', {
                          required: 'Barangay field is required.'
                        })}
                        defaultValue={getCustomer()?.barangay}
                        disabled={barangays.length === 0}
                        errors={fieldErrors}
                      />
                    </div>

                    <div className='col-12'>
                      <TextField
                        name='postalCode'
                        label='Postal Code'
                        {...register('postalCode', { 
                          required: 'Postal code field is required.',
                        })}
                        onKeyPress={numbersOnlyKeyPress}
                        defaultValue={getCustomer()?.postalCode}
                        errors={fieldErrors}
                      />
                    </div>

                    <div className='col-12'>
                      <TextField
                        name='street'
                        label='Street'
                        {...register('street', { 
                          required: 'Street field is required.',
                        })}
                        defaultValue={getCustomer()?.street}
                        errors={fieldErrors}
                      />
                    </div>

                    <div className='col-12'>
                      <TextAreaField
                        name='address'
                        label='Address'
                        {...register('address', { 
                          required: 'Address field is required.',
                        })}
                        defaultValue={getCustomer()?.address}
                        errors={fieldErrors}
                      />
                    </div>

                    <div className='col-12'>
                      <TextField
                        name='contact'
                        label='Contact'
                        {...register('contact', { 
                          required: 'Contact field is required.',
                          pattern: {
                            value: numbersOnly,
                            message: 'Contact field must be numbers only.'
                          }
                        })}
                        onKeyPress={numbersOnlyKeyPress}
                        defaultValue={getCustomer()?.contact}
                        errors={fieldErrors}
                      />
                    </div>

                    <div className='col-12' align='right'>
                      <Button type='submit' label='Update'/>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  </>
};

export default CustomerAddress;