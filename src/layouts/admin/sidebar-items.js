import { 
  Dashboard,
  Category,
  People,
  BrandingWatermark,
  Inventory,
  ShoppingBag,
  Settings,
  Security,
  Payment,
  AccountBox,
  Domain,
  LocalShipping,
  Person,
  History,
  Lock,
  Tag,
  Discount,
  AirportShuttle,
  Tune,
  PowerSettingsNew,
  AccountBalance,
  DeliveryDining,
  AssignmentReturn,
  ShowChart,
} from '@mui/icons-material';

import { permissionChecker, permissionNameChecker } from '../../utils';

const hasAccounts = permissionNameChecker('Users') || permissionNameChecker('Roles') || permissionNameChecker('Customers');

const hasInventory = permissionNameChecker('Products') 
  || permissionNameChecker('Promotions')
  || permissionNameChecker('Transactions')
  || permissionNameChecker('Stocks Report')
  || permissionNameChecker('Deliveries')
  || permissionNameChecker('Returned Items');

const hasSetup = permissionNameChecker('Brands')
  || permissionNameChecker('Categories')
  || permissionNameChecker('Suppliers')
  || permissionNameChecker('Tags')
  || permissionNameChecker('Delivery Fee');

const logout = () => {
  localStorage.clear();
};

export const Items = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <Dashboard />,
    path: '/admin',
    skipPermission: true,
  },
  // {
  //   id: 'branches',
  //   label: 'Branches',
  //   icon: <Domain />,
  //   path: '/admin/branches',
  //   permitted: permissionChecker('Branches', 'Read'),
  // },
  {
    id: 'account',
    label: 'Account',
    icon: <AccountBox />,
    permitted: hasAccounts,
    subItem: [
      {
        id: 'users',
        label: 'Users',
        icon: <People />,
        path: '/admin/users',
        permitted: permissionChecker('Users', 'Read'),
      },
      {
        id: 'customers',
        label: 'Customers',
        icon: <People />,
        path: '/admin/customers',
        permitted: permissionChecker('Customers', 'Read'),
      },
      {
        id: 'roles',
        label: 'Roles',
        icon: <Security />,
        path: '/admin/roles',
        permitted: permissionChecker('Roles', 'Read'),
      },
    ].filter(({permitted}) => permitted),
  },
  {
    id: 'setup',
    label: 'Setup',
    permitted: hasSetup,
    icon: <Tune  />,
    subItem: [
      {
        id: 'brands',
        label: 'Brands',
        icon: <BrandingWatermark />,
        path: '/admin/brands',
        permitted: permissionChecker('Brands', 'Read'),
      },
      {
        id: 'categories',
        label: 'Categories',
        icon: <Category />,
        path: '/admin/categories',
        permitted: permissionChecker('Categories', 'Read'),
      },
      {
        id: 'tags',
        label: 'Tags',
        icon: <Tag />,
        path: '/admin/tags',
        permitted: permissionChecker('Tags', 'Read'),
      },
      {
        id: 'suppliers',
        label: 'Suppliers',
        icon: <LocalShipping />,
        path: '/admin/suppliers',
        permitted: permissionChecker('Suppliers', 'Read'),
      },
      {
        id: 'delivery-fee',
        label: 'Delivery Fee',
        icon: <AirportShuttle />,
        path: '/admin/delivery-fee',
        permitted: permissionChecker('Delivery Fee', 'Read'),
      },
    ],
  },
  {
    id: 'inventory',
    label: 'Inventory',
    permitted: hasInventory,
    icon: <Inventory />,
    subItem: [
      {
        id: 'products',
        label: 'Products',
        icon: <ShoppingBag />,
        path: '/admin/products',
        permitted: permissionChecker('Products', 'Read'),
      },
      {
        id: 'promotions',
        label: 'Promotions',
        icon: <Discount />,
        path: '/admin/promotions',
        permitted: permissionChecker('Promotions', 'Read'),
      },
      {
        id: 'transactions',
        label: 'Transactions',
        icon: <AccountBalance />,
        path: '/admin/transactions',
        permitted: permissionChecker('Transactions', 'Read'),
      },
      {
        id: 'stocks-report',
        label: 'Stocks Report',
        icon: <ShowChart />,
        path: '/admin/stocks-report',
        permitted: permissionChecker('Stocks Report', 'Read'),
      },
      {
        id: 'deliveries',
        label: 'Deliveries',
        icon: <DeliveryDining />,
        path: '/admin/deliveries',
        permitted: permissionChecker('Deliveries', 'Read'),
      },
      {
        id: 'returned-items',
        label: 'Returned Items',
        icon: <AssignmentReturn />,
        path: '/admin/returned-items',
        permitted: permissionChecker('Returned Items', 'Read'),
      },
    ].filter(({permitted}) => permitted),
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings />,
    subItem: [
      {
        id: 'settings-profile',
        label: 'Profile',
        icon: <Person />,
        path: '/admin/settings/profile',
        skipPermission: true,
      },
      {
        id: 'settings-branch',
        label: 'Branch',
        icon: <Domain />,
        path: '/admin/settings/branch',
        permitted: permissionChecker('Branches', 'Read'),
      },
      {
        id: 'settings-change-password',
        label: 'Change Password',
        icon: <Lock />,
        path: '/admin/settings/change-password',
        skipPermission: true,
      },
    ].filter(({permitted, skipPermission}) => permitted || skipPermission),
    skipPermission: true,
  },
  {
    id: 'audits',
    label: 'Audits',
    icon: <History />,
    path: '/admin/audits',
    permitted: permissionChecker('Audits', 'Read'),
  },
  {
    id: 'logout',
    label: 'Logout',
    icon: <PowerSettingsNew />,
    onClick: () => logout(),
    path: '/admin/login',
    skipPermission: true,
  },
].filter(({permitted, skipPermission}) => permitted || skipPermission);