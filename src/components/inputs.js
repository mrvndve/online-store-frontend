import React, { forwardRef } from 'react';

import useInput from '../hooks/use-input';

import {
  Visibility,
  VisibilityOff,
  Add,
  Upload,
  Remove,
  Search,
} from '@mui/icons-material'

import {
  TextField as Input,
  MenuItem,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
  Autocomplete,
} from '@mui/material';

import { NumericFormat } from 'react-number-format';

const NumeriFormatCustom = forwardRef((props, ref) => {
  const {...other} = props;

  return <>
    <NumericFormat
      {...other}
      getInputRef={ref}
      thousandSeparator
      valueIsNumericString
      decimalScale={2}
      fixedDecimalScale
      allowNegative={false}
    />
  </>
})

const TextField = forwardRef(({
  className = '',
  name, 
  label,
  readOnly,
  size = 'small',
  style = {},
  inputLabelStyle = {},
  errors = {},
  ...rest
}, ref) => {
  return <>
    <Input
      name={name}
      label={label}
      fullWidth
      size={size}
      error={Boolean(errors[name])}
      InputLabelProps={{ 
        shrink: true,
        style: {...{ fontWeight: 500 }, ...inputLabelStyle}
      }}
      InputProps={{
        readOnly: readOnly,
        style: {...{ fontWeight: 500 }, ...style}
      }}
      helperText={errors[name]?.message}
      ref={ref}
      {...rest}
    />
  </>
});

const PriceTextField = forwardRef(({
  className = '',
  name, 
  label,
  readOnly,
  size = 'small',
  inputLabelStyle = {},
  style = {},
  errors = {},
  ...rest
}, ref) => {
  return <>
    <Input
      name={name}
      label={label}
      fullWidth
      size={size}
      error={Boolean(errors[name])}
      InputLabelProps={{ 
        shrink: true,
        style: {...{ fontWeight: 500 }, ...inputLabelStyle}
      }}
      InputProps={{
        startAdornment: <InputAdornment position='start'>₱</InputAdornment>,
        inputComponent: NumeriFormatCustom,
        readOnly: readOnly,
        style: {...{ fontWeight: 500 }, ...style}
      }}
      helperText={errors[name]?.message}
      ref={ref}
      {...rest}
    />
  </>
});

const TextAreaField = forwardRef(({
  name, 
  label,
  readOnly,
  size = 'small',
  inputLabelStyle = {},
  style = {},
  errors = {},
  ...rest
}, ref) => {
  return <>
    <Input
      name={name}
      label={label}
      fullWidth
      multiline
      rows={4}
      size={size}
      error={Boolean(errors[name])}
      InputLabelProps={{ 
        shrink: true,
        style: {...{ fontWeight: 500 }, ...inputLabelStyle}
      }}
      inputProps={{
        readOnly: readOnly,
        style: {...{ fontWeight: 500 }, ...style}
      }}
      helperText={errors[name]?.message}
      ref={ref}
      {...rest}
    />
  </>
});

const UploadField = forwardRef(({
  name, 
  label, 
  size = 'small',
  accept = 'image/*',
  handleUpload,
  errors = {},
  ...rest
}, ref) => {
  return <>
    <Input
      name={name}
      label={label}
      fullWidth
      size={size}
      error={Boolean(errors[name])}
      InputLabelProps={{ 
        shrink: true 
      }}
      InputProps={{
        readOnly: true,
        endAdornment: <InputAdornment position='end'>
          <IconButton
            color='primary'
            className='me-2'
            size='small' 
            edge='end'
            component='label'
          >
            <input 
              hidden 
              accept={accept} 
              type='file'
              onChange={handleUpload}
            />

            <Upload/>
          </IconButton>
        </InputAdornment>,
      }}
      helperText={errors[name]?.message}
      readOnly
      ref={ref}
      {...rest}
    />
  </>
});

const DateField = forwardRef(({
  name, 
  label, 
  errors = {},
  size='small',
  ...rest
}, ref) => {
  return <>
    <Input
      name={name}
      label={label}
      type='date'
      fullWidth
      size={size}
      defaultValue={new Date().toISOString().substring(0, 10)}
      error={Boolean(errors[name])}
      InputLabelProps={{ 
        shrink: true 
      }}
      helperText={errors[name]?.message}
      ref={ref}
      {...rest}
    />
  </>
});

const DateTimeField = forwardRef(({
  name, 
  label, 
  errors = {},
  size='small',
  ...rest
}, ref) => {
  return <>
    <Input
      name={name}
      label={label}
      type='datetime-local'
      fullWidth
      size={size}
      defaultValue={new Date().toISOString().substring(0, 10)}
      error={Boolean(errors[name])}
      InputLabelProps={{ 
        shrink: true 
      }}
      helperText={errors[name]?.message}
      ref={ref}
      {...rest}
    />
  </>
});

const SelectField = forwardRef(({
  className,
  name, 
  label,
  inputLabelStyle = {},
  style = {},
  errors = {},
  options = [],
  size = 'small',
  hasQuickAdd = false,
  quickAddPath = '',
  fullWidth = true,
  ...rest
}, ref) => {
  return <>
    <Input
      className={className}
      name={name}
      label={label}
      select
      fullWidth={fullWidth}
      size={size}
      error={Boolean(errors[name])}
      InputProps={{
        endAdornment: hasQuickAdd && <InputAdornment position='start'>
          <IconButton
            color='secondary'
            className='me-2'
            size='small' 
            onClick={()=>window.open(`${process.env.PUBLIC_URL}${quickAddPath}`,'_blank')}
            edge='start'
          >
            <Add style={{ fontSize: 18 }}/>
          </IconButton>
        </InputAdornment>,
        style: {...{ fontWeight: 500 }, ...style}
      }}
      InputLabelProps={{ 
        shrink: true,
        style: {...{ fontWeight: 500 }, ...inputLabelStyle},
      }}
      helperText={errors[name]?.message}
      ref={ref}
      {...rest}
    >
      {options.map((data, i) => (
        <MenuItem style={{ fontWeight: 400, color: 'gray' }} key={i} value={data.value}>
          {data.label}
        </MenuItem>
      ))}
    </Input>
  </>
});

const AutoCompleteField = forwardRef(({
  name, 
  label, 
  errors = {},
  options = [],
  hasQuickAdd = false,
  quickAddPath = '',
  size = 'small',
  defaultValue = '',
  ...rest
}, ref) => {
  return <>
    <Autocomplete
      disablePortal
      options={options}
      inputValue={defaultValue}
      getOptionLabel={option => option.value}
      renderOptions={options => (
        <li>
          {options.value}
        </li>
      )}
      renderInput={params => (
        <TextField
          {...params}
          name={name}
          label={label}
          size={size}
          InputProps={{ 
            ...params.InputProps,
            startAdornment: hasQuickAdd && (
              <InputAdornment position='end'>
                <IconButton
                  color='primary'
                  className='me-2'
                  size='small' 
                  onClick={()=>window.open(`${process.env.PUBLIC_URL}${quickAddPath}`,'_blank')}
                  edge='start'
                >
                  <Add style={{ fontSize: 18 }}/>
                </IconButton>
              </InputAdornment>
            )
          }}
          InputLabelProps={{ 
            ...params.InputLabelProps,
            shrink: true,
          }}
          helperText={errors[name]?.message}
          error={Boolean(errors[name])}
          ref={ref}
          {...rest}
        />
      )}
    />
  </>
});

const CheckBoxField = forwardRef(({
  name, 
  label, 
  errors = {},
  defaultChecked,
  style = {},
  ...rest
}, ref) => {
  return <>
    <FormControlLabel 
      label={<span style={{ ...style, ...{ fontWeight: 500 } }}>{label}</span>}
      control={
        <Checkbox
          name={name}
          {...rest}
          ref={ref}
          defaultChecked={defaultChecked}
        />
      } 
    />
  </>
});

const Password = forwardRef(({
  name, 
  label, 
  errors = {},
  size='small',
  ...rest
}, ref) => {
  const {
    showPassword,
    togglePassword
  } =  useInput();

  return <>
    <Input
      name={name}
      label={label}
      type={!showPassword ? 'password' : 'text'}
      fullWidth
      size={size}
      error={Boolean(errors[name])}
      InputLabelProps={{ 
        shrink: true,
      }}
      InputProps={{
        endAdornment: <InputAdornment position='end'>
          <IconButton
            onClick={togglePassword}
            edge="end"
          >
            {!showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>,
      }}
      helperText={errors[name]?.message}
      ref={ref}
      {...rest}
    />
  </>
});

const SearchField = forwardRef(({
  name, 
  label, 
  errors = {},
  size='small',
  handleClickSearch,
  ...rest
}, ref) => {
  return <>
    <Input
      name={name}
      label={label}
      fullWidth
      size={size}
      error={Boolean(errors[name])}
      InputLabelProps={{ 
        shrink: true,
      }}
      InputProps={{
        endAdornment: <InputAdornment position='end'>
          <IconButton
            onClick={() => {
              if (handleClickSearch) {
                handleClickSearch();
              }
            }}
            edge="end"
          >
            <Search/>
          </IconButton>
        </InputAdornment>,
      }}
      helperText={errors[name]?.message}
      ref={ref}
      {...rest}
    />
  </>
});

const QuantityTextField = ({
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleQuantityChange,
  handleQuantityBlur,
  handleQuantitykeyPress,
  quantity,
  stocks,
}) => {
  return <>
    <TextField
      label='Quantity'
      sx={{input: { textAlign: 'center' }}}
      value={quantity}
      onChange={handleQuantityChange}
      onBlur={handleQuantityBlur}
      onKeyPress={handleQuantitykeyPress}
      readOnly={stocks === 0}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <IconButton
              color='primary'
              size='small'
              edge='start'
              onClick={handleDecreaseQuantity}
              disabled={stocks === 0}
            >
              <Remove style={{ fontSize: 20 }}/>
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              color='primary'
              size='small'
              edge='start'
              onClick={handleIncreaseQuantity}
              disabled={stocks === 0}
            >
              <Add style={{ fontSize: 20 }}/>
            </IconButton>
          </InputAdornment>
        ),
        readOnly: stocks === 0
      }}
    />
  </>
};

export {
  TextField,
  TextAreaField,
  Password,
  DateField,
  DateTimeField,
  SelectField,
  CheckBoxField,
  UploadField,
  AutoCompleteField,
  PriceTextField,
  QuantityTextField,
  SearchField,
};