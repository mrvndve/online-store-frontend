import { 
  Modal, 
  Loading, 
  Button,
  FormError,
  TextField,
  SelectField,
} from "../../../components";

import { numbersOnly } from "../../../utils";

import useManageStocksModalForm from "../../../hooks/use-manage-stocks-modal-form";

import { isEmpty } from "lodash";

import { IconButton, InputAdornment } from "@mui/material";

import { Add, Remove } from "@mui/icons-material";

const ManageStocksModalForm = ({
  isManageStockModalOpen,
  handleCloseManageStocksModal,
  manageStockData,
}) => {
  const {
    skuCode,
    formMode,
    variations,
    stocks,
  } = manageStockData;

  const {
    reset,
    register,
    fieldErrors,
    onSubmit,
    getValues,
    setValue,
    handleSubmit,
    loading,
    apiValidationErrors,
    suppliers,
    variationFields,
    onStocksKeyPress,
    onStocksBlur,
  } = useManageStocksModalForm({
    manageStockData,
    isManageStockModalOpen,
    handleCloseManageStocksModal,
  });

  return <>
    <Modal {...{
      title: `${formMode} - ${skuCode}`,
      isOpen: isManageStockModalOpen,
      handleClose: () => {
        reset();
        handleCloseManageStocksModal()
      },
      width: 600,
    }}>
      <FormError errors={apiValidationErrors}/>

      {!loading 
        ? (
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='row g-4'>
                {formMode === 'Add Stocks' ? (
                  <>
                    <div className='col-12'>
                      <SelectField
                        name='supplier'
                        label='Supplier'
                        options={suppliers.map(data => ({
                          label: data.name,
                          value: data.id,
                        }))}
                        {...register('supplier', {
                          required: 'Supplier field is required.'
                        })}
                        hasQuickAdd={true}
                        quickAddPath='/admin/suppliers'
                        errors={fieldErrors}
                      />
                    </div>

                    <div className='col-12'>
                      <TextField
                        name='receiptNo'
                        label='Receipt No'
                        {...register('receiptNo', {
                          required: 'Receipt No field is required.'
                        })}
                        errors={fieldErrors}
                      />
                    </div>
                  </>
                ) : (
                  <div className='col-12'>
                    <TextField
                      name='decreaseReason'
                      label='Reason'
                      {...register('decreaseReason', {
                        required: 'Reason field is required.'
                      })}
                      errors={fieldErrors}
                    />
                  </div>
                )}

                {variations && !isEmpty(variations) 
                  ? (
                    <>
                      {variationFields.map((field, index) => (
                        <div className='col-12'>
                          <TextField
                            key={field.id}
                            name={`variations.${index}.stocks`}
                            label={`${variationFields[index].name} Stocks (${variations[index].stocks})`}
                            {...register(`variations.${index}.stocks`, {
                              validate: value => value !== '0' || 'Stocks field must be greater than zero.',
                              required: `Stocks field is required.`,
                              pattern: {
                                value: numbersOnly,
                                message: 'Stocks field must be numbers only.'
                              },
                            })}
                            onKeyPress={onStocksKeyPress}
                            onBlur={(e) => onStocksBlur(e.target.value, `variations.${index}.stocks`)}
                            error={
                              Boolean((fieldErrors.variations && fieldErrors.variations[index]) 
                                && fieldErrors.variations[index].stocks)
                            }
                            helperText={
                              (fieldErrors.variations && fieldErrors.variations[index]) 
                              && fieldErrors.variations[index].stocks?.message
                            }
                            defaultValue={variations[index].stocks}
                            InputProps={{
                              endAdornment: <InputAdornment position='start'>
                                <IconButton
                                  color={formMode === 'Add Stocks' ? 'secondary' : 'error'}
                                  size='small'
                                  edge='start'
                                >
                                  {formMode === 'Add Stocks' 
                                    ? (
                                      <Add style={{ fontSize: 18 }} onClick={() => setValue(`variations.${index}.stocks`, parseFloat(getValues(`variations.${index}.stocks`)) + 1)}/>
                                    )
                                    : (
                                      <Remove style={{ fontSize: 18 }} onClick={() => getValues(`variations.${index}.stocks`) > 0 && setValue(`variations.${index}.stocks`, parseFloat(getValues(`variations.${index}.stocks`)) - 1)}/>
                                    )
                                  }
                                </IconButton>
                              </InputAdornment>,
                            }}
                          />
                        </div>
                      ))}
                    </>
                  ) 
                  : (
                    <div className='col-12'>
                      <TextField
                        name='stocks'
                        label={`Stocks (${stocks})`}
                        {...register('stocks', { 
                          validate: (value) => {
                            if (value === 0) {
                              return 'Stocks field must be greater than zero.'
                            } else {
                              if (formMode !== 'Add Stocks') {
                                if (value > stocks) {
                                  return 'Stocks field is must be less or equal than the current stocks.'
                                }
                              }
                            }                            
                          },
                          required: 'Stocks field is required.',
                          pattern: {
                            value: numbersOnly,
                            message: 'Stocks field must be numbers only.'
                          },
                        })}
                        onKeyPress={onStocksKeyPress}
                        errors={fieldErrors}
                        defaultValue={stocks}
                        onBlur={(e) => onStocksBlur(e.target.value, 'stocks')}
                        InputProps={{
                          endAdornment: <InputAdornment position='start'>
                            <IconButton
                              color={formMode === 'Add Stocks' ? 'secondary' : 'error'}
                              size='small'
                              edge='start'
                            >
                              {formMode === 'Add Stocks' 
                                ? (
                                  <Add style={{ fontSize: 18 }} onClick={() => setValue('stocks', parseFloat(getValues('stocks')) + 1)}/>
                                )
                                : (
                                  <Remove style={{ fontSize: 18 }} onClick={() => getValues('stocks') > 0 && setValue('stocks', parseFloat(getValues('stocks')) - 1)}/>
                                )
                              }
                            </IconButton>
                          </InputAdornment>,
                        }}
                      />
                    </div>
                  )
                }
              </div>

              <div className='mt-4' align='right'>
                <Button label='Save' type='submit'/>
              </div>
            </form>
          </div>
        )
        : (
          <Loading/>
        )
      }
    </Modal>
  </>
};

export default ManageStocksModalForm;