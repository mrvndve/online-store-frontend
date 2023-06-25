import { 
  TextField,
  SelectField,
  CheckBoxField,
  Button,
  Card,
  Loading,
  FormError,
} from '../../../components';

import { 
  emailOnly,
  numbersOnly,
  numbersOnlyKeyPress,
} from '../../../utils';

import useBranchesForm from '../../../hooks/use-branches-form';

const BranchesFormPage = () => {
  const {
    formMode,
    register,
    fieldErrors,
    onSubmit,
    handleSubmit,
    loading,
    selectedRow,
    apiValidationErrors,

    regions,
    handleRegionChange,
    provinces,
    handleProvinceChange,
    cities,
    handleCitiesChange,
    barangays,
  } = useBranchesForm();

  return <>
    <FormError errors={apiValidationErrors}/>

    <Card style={{ padding: '35px 25px 25px 25px', }}>
      {!loading
        ?
        <div>
          <form id='branches-form' onSubmit={handleSubmit(onSubmit)}>
            <div className='row g-4'>
              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <TextField
                  name='name'
                  label='Name'
                  {...register('name', { 
                    required: 'Name field is required.',
                  })}
                  defaultValue={selectedRow?.name}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
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
                  onChange={handleRegionChange}
                  defaultValue={selectedRow?.region}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
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
                  disabled={provinces.length === 0}
                  onChange={handleProvinceChange}
                  defaultValue={selectedRow?.province}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
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
                  disabled={cities.length === 0}
                  onChange={handleCitiesChange}
                  defaultValue={selectedRow?.city}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
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
                  disabled={barangays.length === 0}
                  defaultValue={selectedRow?.barangay}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <TextField
                  name='postalCode'
                  label='Postal Code'
                  {...register('postalCode', { 
                    required: 'Postal code field is required.',
                  })}
                  onKeyPress={numbersOnlyKeyPress}
                  defaultValue={selectedRow?.postalCode}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <TextField
                  name='street'
                  label='Street'
                  {...register('street', { 
                    required: 'Street field is required.',
                  })}
                  defaultValue={selectedRow?.street}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <TextField
                  name='address'
                  label='Address'
                  {...register('address', { 
                    required: 'Address field is required.',
                  })}
                  defaultValue={selectedRow?.address}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
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
                  defaultValue={selectedRow?.contact}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
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
                  defaultValue={selectedRow?.email}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                <CheckBoxField
                  name='isActive'
                  label='Active'
                  {...register('isActive')}
                  defaultChecked={selectedRow ? selectedRow.isActive : true}
                  errors={fieldErrors}
                />
              </div>
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

export default BranchesFormPage;