import {
  Add,
  Edit,
  Dashboard,
  Category,
  Badge,
  People,
  BrandingWatermark,
  Security,
  Domain,
  Payment,
  LocalShipping,
  ShoppingBag,
  Person,
  Settings,
  Lock,
  Tag,
  Discount,
  AirportShuttle,
  AccountBalance,
  DeliveryDining,
  AssignmentReturn,
  ShowChart,
} from "@mui/icons-material"

const breadCrumbsbUrl = (pathname) => {
  const isCreate = pathname.split('/').includes('create');

  const links = [
    {
      pathname: '/admin',
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          active: true,
        },
      ],
    },
    {
      pathname: '/admin/users',
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Users',
          icon: <People fontSize='inherit'/>,
          active: true,
        },
      ],
    },
    {
      pathname: `/admin/users/${isCreate ? 'create' : 'edit'}`,
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Users',
          icon: <Badge fontSize='inherit'/>,
          to: '/admin/users'
        },
        {
          label: isCreate ? 'Add' : 'Edit',
          icon: isCreate ? <Add fontSize='inherit'/> : <Edit fontSize='inherit'/>,
          active: true,
        }
      ]
    },
    {
      pathname: '/admin/customers',
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Customers',
          icon: <People fontSize='inherit'/>,
          active: true,
        },
      ],
    },
    {
      pathname: '/admin/roles',
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Role',
          icon: <Security fontSize='inherit'/>,
          active: true,
        }
      ]
    },
    {
      pathname: `/admin/roles/${isCreate ? 'create' : 'edit'}`,
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Role',
          icon: <Security fontSize='inherit'/>,
          to: '/admin/roles'
        },
        {
          label: isCreate ? 'Add' : 'Edit',
          icon: isCreate ? <Add fontSize='inherit'/> : <Edit fontSize='inherit'/>,
          active: true,
        }
      ]
    },
    {
      pathname: '/admin/branches',
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Branches',
          icon: <Domain fontSize='inherit'/>,
          active: true,
        },
      ]
    },
    {
      pathname: `/admin/branches/${isCreate ? 'create' : 'edit'}`,
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Users',
          icon: <Domain fontSize='inherit'/>,
          to: '/admin/branches'
        },
        {
          label: isCreate ? 'Add' : 'Edit',
          icon: isCreate ? <Add fontSize='inherit'/> : <Edit fontSize='inherit'/>,
          active: true,
        }
      ],
    },
    {
      pathname: '/admin/brands',
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Brands',
          icon: <BrandingWatermark fontSize='inherit'/>,
          active: true,
        },
      ],
    },
    {
      pathname: `/admin/brands/${isCreate ? 'create' : 'edit'}`,
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Brands',
          icon: <BrandingWatermark fontSize='inherit'/>,
          to: '/admin/brands'
        },
        {
          label: isCreate ? 'Add' : 'Edit',
          icon: isCreate ? <Add fontSize='inherit'/> : <Edit fontSize='inherit'/>,
          active: true,
        }
      ]
    },
    {
      pathname: '/admin/categories',
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Categories',
          icon: <Category fontSize='inherit'/>,
          active: true,
        },
      ],
    },
    {
      pathname: `/admin/categories/${isCreate ? 'create' : 'edit'}`,
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Categories',
          icon: <Category fontSize='inherit'/>,
          to: '/admin/categories'
        },
        {
          label: isCreate ? 'Add' : 'Edit',
          icon: isCreate ? <Add fontSize='inherit'/> : <Edit fontSize='inherit'/>,
          active: true,
        },
      ],
    },
    {
      pathname: '/admin/payment-methods',
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Payment Methods',
          icon: <Payment fontSize='inherit'/>,
          active: true,
        },
      ],
    },
    {
      pathname: `/admin/payment-methods/${isCreate ? 'create' : 'edit'}`,
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Payment Methods',
          icon: <Payment fontSize='inherit'/>,
          to: '/admin/payment-methods'
        },
        {
          label: isCreate ? 'Add' : 'Edit',
          icon: isCreate ? <Add fontSize='inherit'/> : <Edit fontSize='inherit'/>,
          active: true,
        }
      ]
    },
    {
      pathname: '/admin/suppliers',
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Suppliers',
          icon: <LocalShipping fontSize='inherit'/>,
          active: true,
        },
      ],
    },
    {
      pathname: `/admin/suppliers/${isCreate ? 'create' : 'edit'}`,
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Suppliers',
          icon: <LocalShipping fontSize='inherit'/>,
          to: '/admin/suppliers'
        },
        {
          label: isCreate ? 'Add' : 'Edit',
          icon: isCreate ? <Add fontSize='inherit'/> : <Edit fontSize='inherit'/>,
          active: true,
        }
      ],
    },
    {
      pathname: '/admin/products',
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Products',
          icon: <ShoppingBag fontSize='inherit'/>,
          active: true,
        },
      ],
    },
    {
      pathname: `/admin/products/${isCreate ? 'create' : 'edit'}`,
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Products',
          icon: <ShoppingBag fontSize='inherit'/>,
          to: '/admin/products'
        },
        {
          label: isCreate ? 'Add' : 'Edit',
          icon: isCreate ? <Add fontSize='inherit'/> : <Edit fontSize='inherit'/>,
          active: true,
        }
      ],
    },
    {
      pathname: '/admin/settings/profile',
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Settings',
          icon: <Settings fontSize='inherit'/>,
          active: true,
        },
        {
          label: 'Profile',
          icon: <Person fontSize='inherit'/>,
          active: true,
        }
      ],
    },
    {
      pathname: '/admin/settings/change-password',
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Settings',
          icon: <Settings fontSize='inherit'/>,
          active: true,
        },
        {
          label: 'Change Password',
          icon: <Lock fontSize='inherit'/>,
          active: true,
        }
      ],
    },
    {
      pathname: '/admin/tags',
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Tags',
          icon: <Tag fontSize='inherit'/>,
          active: true,
        },
      ],
    },
    {
      pathname: `/admin/tags/${isCreate ? 'create' : 'edit'}`,
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Suppliers',
          icon: <Tag fontSize='inherit'/>,
          to: '/admin/tags'
        },
        {
          label: isCreate ? 'Add' : 'Edit',
          icon: isCreate ? <Add fontSize='inherit'/> : <Edit fontSize='inherit'/>,
          active: true,
        }
      ],
    },
    {
      pathname: '/admin/promotions',
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Promotions',
          icon: <Discount fontSize='inherit'/>,
          active: true,
        },
      ],
    },
    {
      pathname: `/admin/promotions/${isCreate ? 'create' : 'edit'}`,
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Promotions',
          icon: <Discount fontSize='inherit'/>,
          to: '/admin/promotions'
        },
        {
          label: isCreate ? 'Add' : 'Edit',
          icon: isCreate ? <Add fontSize='inherit'/> : <Edit fontSize='inherit'/>,
          active: true,
        }
      ],
    },
    {
      pathname: '/admin/delivery-fee',
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Delivery Fee',
          icon: <AirportShuttle fontSize='inherit'/>,
          active: true,
        },
      ],
    },
    {
      pathname: '/admin/transactions',
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Transactions',
          icon: <AccountBalance fontSize='inherit'/>,
          active: true,
        },
      ],
    },
    {
      pathname: '/admin/transactions/create',
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Transactions',
          icon: <AccountBalance fontSize='inherit'/>,
          to: '/admin/transactions'
        },
        {
          label: 'Add',
          icon: <Add fontSize='inherit'/>,
          active: true,
        }
      ],
    },
    {
      pathname: '/admin/stocks-report',
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Stocks Report',
          icon: <ShowChart fontSize='inherit'/>,
          active: true,
        },
      ],
    },
    {
      pathname: '/admin/deliveries',
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Deliveries',
          icon: <DeliveryDining fontSize='inherit'/>,
          active: true,
        },
      ],
    },
    {
      pathname: '/admin/returned-items',
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Returned Items',
          icon: <AssignmentReturn fontSize='inherit'/>,
          active: true,
        },
      ],
    },
  ];

  const findLink = links.find(i => i.pathname === pathname);
  return findLink ? findLink.link : [];
}

export default breadCrumbsbUrl;