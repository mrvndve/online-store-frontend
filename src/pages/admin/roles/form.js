import { 
  TextField,
  Button,
  Card,
  Loading,
  CheckBoxField,
  FormError,
} from '../../../components';

import { FormGroup } from '@mui/material';

import { 
  isEmpty, 
} from 'lodash';

import useRolesForm from '../../../hooks/use-roles-form';

const RolesFormPage = () => {
  const {
    formMode,
    register,
    fieldErrors,
    onSubmit,
    handleSubmit,
    loading,
    selectedRow,
    permissions,
    apiValidationErrors,
    handleParentCheckBoxChange,
    handleChildCheckBoxChange,
  } = useRolesForm();

  const defaultPermissions = [
    {
      "name": "Users",
      "permissions": [
        "Create",
        "Read",
        "Update",
        "Delete",
        "Reset Password",
        "Activate",
        "Deactivate"
      ]
    },
    {
      "name": "Customers",
      "permissions": [
        "Read",
        "Delete",
        // "Activate",
        // "Deactivate"
      ]
    },
    {
      "name": "Roles",
      "permissions": [
        "Create",
        "Read",
        "Update",
        "Delete",
        "Activate",
        "Deactivate"
      ]
    },
    {
      "name": "Products",
      "permissions": [
        "Create",
        "Read",
        "Update",
        "Delete",
        "Activate",
        "Deactivate",
        "Add Stocks",
        "Decrease Stocks"
      ]
    },
    {
      "name": "Reports",
      "permissions": [
        "Stocks",
      ]
    },
    {
      "name": "Suppliers",
      "permissions": [
        "Create",
        "Read",
        "Update",
        "Delete",
        "Activate",
        "Deactivate"
      ],
    },
    {
      "name": "Brands",
      "permissions": [
        "Create",
        "Read",
        "Update",
        "Delete",
        "Activate",
        "Deactivate"
      ]
    },
    {
      "name": "Categories",
      "permissions": [
        "Create",
        "Read",
        "Update",
        "Delete",
        "Activate",
        "Deactivate"
      ]
    },
    {
      "name": "Tags",
      "permissions": [
        "Create",
        "Read",
        "Update",
        "Delete",
        "Activate",
        "Deactivate"
      ]
    },
    {
      "name": "Promotions",
      "permissions": [
        "Create",
        "Read",
        "Update",
        "Delete",
        "Activate",
        "Deactivate"
      ]
    },
    {
      "name": "Audits",
      "permissions": [
        "Read",
      ]
    },
    {
      "name": "Delivery Fee",
      "permissions": [
        "Read",
        "Update",
      ],
    },
    {
      "name": "Transactions",
      "permissions": [
        "Create",
        "Read",
      ],
    },
    {
      "name": "Stocks Report",
      "permissions": [
        "Read",
      ],
    },
    {
      "name": "Deliveries",
      "permissions": [
        "Read",
        "Assign Driver",
        "Completion",
        "Cancellation",
      ],
    },
    {
      "name": "Returned Items",
      "permissions": [
        "Read",
        "Approve",
      ],
    },
  ];

  return <>
    <FormError errors={apiValidationErrors}/>

    <Card style={{ padding: '35px 25px 25px 25px', }}>
      {!loading
        ?
        <div>
          <form id='roles-form' onSubmit={handleSubmit(onSubmit)}>
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
                <TextField
                  name='remarks'
                  label='Remarks'
                  {...register('remarks', { 
                    required: 'Remarks field is required.',
                  })}
                  defaultValue={selectedRow?.remarks}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <CheckBoxField
                  name='isActive'
                  label='Active'
                  {...register('isActive')}
                  defaultChecked={selectedRow ? selectedRow.isActive : true}
                  errors={fieldErrors}
                />
              </div>
            </div>

            <div className='row g-4 mt-5'>
              <div className='col-12'>
                <h6>
                  <strong>
                    Permissions
                  </strong>
                </h6>
              </div>
              
              {!isEmpty(defaultPermissions) && defaultPermissions.map((i, key) => (
                <div key={key} className='col-sm-6 col-md-6 col-lg-4 col-xl-2'>
                  <FormGroup>
                    <div className='mb-1'>
                      <CheckBoxField
                        indeterminate={permissions.some(pm => pm.name === i.name && pm.permissions.length != i.permissions.length)}
                        label={<strong>{i.name}</strong>}
                        checked={permissions.some(pm => pm.name === i.name)}
                        onChange={(e) => handleParentCheckBoxChange(e, i.name, i.permissions)}
                      />
                    </div>

                    {!isEmpty(i.permissions) && i.permissions.map((perm, permKey) => (
                      <div key={permKey} className='mx-3'>
                        <CheckBoxField
                          label={perm}
                          checked={permissions.some(pm => pm.name === i.name && pm.permissions?.includes(perm))}
                          onChange={(e) => handleChildCheckBoxChange(e, i.name, perm)}
                        />
                      </div>
                    ))}
                  </FormGroup>
                </div>
              ))}
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

export default RolesFormPage;