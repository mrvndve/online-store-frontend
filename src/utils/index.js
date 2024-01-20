import * as XLSX from 'xlsx';

import { cloneDeep, isEmpty } from 'lodash';

import moment from 'moment';

import {
  axiosUrl,
  apiDomain,
  XENDIT_API_KEY,
  reactAppDomain,
} from './configs';

import { 
  numbersOnly,
  emailOnly,
  alphanumericOnly,
} from './regex';

import {
  toastSuccess,
  toastWarning,
  toastError,
} from './toasts';

import breadCrumbsUrls from './breadcrumbs-url';

import {
  priceFormatter,
  withCommasAndDecimal,
} from './numbers-helper';

import { 
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  PRIMARY_COLOR_YELLOW,
  SUCCESS_COLOR,
  ERROR_COLOR,
} from './branding-colors';

const getUser = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? user : {};
};

const getCustomer = () => {
  const customer = JSON.parse(localStorage.getItem('customer'));
  return customer ? customer : {}
};

const exportToCSV = (data, title) => {
  const xlsxData = cloneDeep(data);
  const worksheet = XLSX.utils.json_to_sheet(xlsxData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.writeFile(workbook, `${title}-${moment(new Date()).format('YYYY-MM-DD')}.xlsx`);
};

const permissions = !isEmpty(getUser().role) ? getUser().role.permissions : [];

const permissionNameChecker = (name) => {
  return permissions.some(i => i.name.includes(name));
};

const permissionChecker = (name, access) => {
  return permissions.some(i => i.name.includes(name) && i.permissions.includes(access));
};

const numbersOnlyKeyPress = (e) => {
  if (!/[0-9]/.test(e.key)) {
    e.preventDefault();
  }
};

const paymentMethods = [
  {
    name: 'CASH_ON_DELIVERY',
    label: 'Cash on Delivery',
  },
  // {
  //   name: 'GCASH',
  //   label: 'GCash',
  // },
];

const paymentMethodsStatus = [
  {
    name: 'CASH_ON_DELIVERY',
    label: 'Cash on Delivery',
  },
  {
    name: 'GCASH',
    label: 'GCash',
  },
  {
    name: 'ON_SITE',
    label: 'On Site',
  }
]

const getPaymentMethodsLabel = (method) => {
  const filter = paymentMethodsStatus.find(i => i.name === method);
  return filter?.label;
};

const orderStatus = {
  TO_PAY: 'TO_PAY',
  FOR_DELIVERY: 'FOR_DELIVERY',
  COMPLETED: 'COMPLETED',
  PENDING_RETURN: 'PENDING_RETURN',
  RETURNED: 'RETURNED',
  CANCELLED: 'CANCELLED',
};

const getStatusLabel = {
  TO_PAY: 'To Pay',
  FOR_DELIVERY: 'For Delivery',
  COMPLETED: 'Completed',
  PENDING_RETURN: 'Pending Return',
  RETURNED: 'Returned',
  CANCELLED: 'Cancelled',
};

export {
  axiosUrl,
  apiDomain,
  numbersOnly,
  emailOnly,
  alphanumericOnly,
  getUser,
  getCustomer,
  exportToCSV,
  toastSuccess,
  toastWarning,
  toastError,
  breadCrumbsUrls,
  permissions,
  permissionNameChecker,
  permissionChecker,
  priceFormatter,
  numbersOnlyKeyPress,
  withCommasAndDecimal,
  
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  PRIMARY_COLOR_YELLOW,
  SUCCESS_COLOR,
  ERROR_COLOR,

  paymentMethods,
  orderStatus,
  getStatusLabel,
  getPaymentMethodsLabel,
  XENDIT_API_KEY,
  reactAppDomain,
};