import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import AdminProtectedRoutes from './admin-protected-routes';
import CustomerProtectedRoutes from './customer-protected-routes';
import { permissionChecker } from '../utils';

import AdminPageLayout from '../layouts/admin';
import CustomerPageLayout from '../layouts/customer';

import AdminLoginPage from '../pages/admin/login';
import AdminForgotPasswordPage from '../pages/admin/forgot-password';
import AdminResetPasswordPage from '../pages/admin/reset-password';
import AdminActivateAccountPage from '../pages/admin/activate-account';
import AdminDashboardPage from '../pages/admin';

import UsersPage from '../pages/admin/users';
import UsersFormPage from '../pages/admin/users/form';

import CustomersPage from '../pages/admin/customers';

import RolesPage from '../pages/admin/roles';
import RolesFormPage from '../pages/admin/roles/form';

import BranchesPage from '../pages/admin/branches';
import BranchesFormPage from '../pages/admin/branches/form';

import BrandsPage from '../pages/admin/brands';
import BrandsFormPage from '../pages/admin/brands/form';

import CategoriesPage from '../pages/admin/categories';
import CategoriesFormPage from '../pages/admin/categories/form';

import SuppliersPage from '../pages/admin/suppliers';
import SuppliersFormPage from '../pages/admin/suppliers/form';

import ProductsPage from '../pages/admin/products';
import ProductsFormPage from '../pages/admin/products/form';

import TagsPage from '../pages/admin/tags';
import TagsFormPage from '../pages/admin/tags/form';

import PromotionsPage from '../pages/admin/promotions';
import PromotionsFormPage from '../pages/admin/promotions/form';

import TransactionsPage from '../pages/admin/transactions';
import StocksReportPage from '../pages/admin/stocks-report';
import DeliveriesPage from '../pages/admin/deliveries';
import ReturnedItemsPage from '../pages/admin/returned-items';

import ProfilePage from '../pages/admin/settings/profile';
import SettingsBranchFormPage from '../pages/admin/settings/branch';
import ChangePasswordPage from '../pages/admin/settings/change-password';

import DeliveryFeePage from '../pages/admin/delivery-fee';

import HistoryLogsPage from '../pages/admin/history-logs';

import ErrorPage from '../pages/error-page';

import CustomerSignUpPage from '../pages/customer/sign-up';

import CustomerLoginPage from '../pages/customer/login';

import CustomerForgotPasswordPage from '../pages/customer/forgot-password';

import CustomerResetPasswordPage from '../pages/customer/reset-password';

import CustomerPage from '../pages/customer';

import CustomerProfile from '../pages/customer/manage/profile';

import CustomerAddress from '../pages/customer/manage/address';

import CustomerPassword from '../pages/customer/manage/change-password';

import CustomerWishlist from '../pages/customer/manage/wishlist';

import CustomerPurchases from '../pages/customer/manage/purchases';

import Collections from '../pages/customer/collections';

import CustomerViewProduct from '../pages/customer/collections/view-product';

import CustomerCart from '../pages/customer/cart';

import CustomerCheckout from '../pages/customer/checkout';
import VerifyEmailPage from '../pages/customer/verify-email';
import TransactionsFormPage from '../pages/admin/transactions/form';

const AppRoutes = () => {
  const ADMIN_UNAUTH_ROUTES = [
    {
      path: '/admin/login',
      page: <AdminLoginPage/>,
    },
    {
      path: '/admin/forgot-password',
      page: <AdminForgotPasswordPage/>,
    },
    {
      path: '/admin/reset-password/:resetPasswordToken',
      page: <AdminResetPasswordPage/>,
    },
    {
      path: '/admin/activate-account/:activateAccountToken',
      page: <AdminActivateAccountPage/>,
    },
  ];
  
  const ADMIN_AUTH_ROUTES = [
    {
      path: '/admin', 
      page: <AdminDashboardPage/>,
      skipPermission: true,
    },
    {
      path: '/admin/users',
      page: <UsersPage/>,
      permitted: permissionChecker('Users', 'Read'),
    },
    {
      path: '/admin/customers',
      page: <CustomersPage/>,
      permitted: permissionChecker('Customers', 'Read'),
    },
    {
      path: '/admin/users/:formMode',
      page: <UsersFormPage/>,
      permitted: permissionChecker('Users', 'Read'),
    },
    {
      path: '/admin/roles',
      page: <RolesPage/>,
      permitted: permissionChecker('Roles', 'Read'),
    },
    {
      path: '/admin/roles/:formMode',
      page: <RolesFormPage/>,
      permitted: permissionChecker('Roles', 'Read'),
    },
    {
      path: '/admin/branches',
      page: <BranchesPage/>,
      permitted: permissionChecker('Branches', 'Read'),
    },
    {
      path: '/admin/branches/:formMode',
      page: <BranchesFormPage/>,
      permitted: permissionChecker('Branches', 'Read'),
    },
    {
      path: '/admin/brands',
      page: <BrandsPage/>,
      permitted: permissionChecker('Brands', 'Read'),
    },
    {
      path: '/admin/brands/:formMode',
      page: <BrandsFormPage/>,
      permitted: permissionChecker('Brands', 'Read'),
    },
    {
      path: '/admin/categories',
      page: <CategoriesPage/>,
      permitted: permissionChecker('Categories', 'Read'),
    },
    {
      path: '/admin/categories/:formMode',
      page: <CategoriesFormPage/>,
      permitted: permissionChecker('Categories', 'Read'),
    },
    {
      path: '/admin/suppliers',
      page: <SuppliersPage/>,
      permitted: permissionChecker('Suppliers', 'Read'),
    },
    {
      path: '/admin/suppliers/:formMode',
      page: <SuppliersFormPage/>,
      permitted: permissionChecker('Suppliers', 'Read'),
    },
    {
      path: '/admin/products',
      page: <ProductsPage/>,
      permitted: permissionChecker('Products', 'Read'),
    },
    {
      path: '/admin/products/:formMode',
      page: <ProductsFormPage/>,
      permitted: permissionChecker('Products', 'Read'),
    },
    {
      path: '/admin/settings/profile',
      page: <ProfilePage/>,
      skipPermission: true,
    },
    {
      path: '/admin/settings/branch',
      page: <SettingsBranchFormPage/>,
      skipPermission: true,
    },
    {
      path: '/admin/settings/change-password',
      page: <ChangePasswordPage/>,
      skipPermission: true,
    },
    {
      path: '/admin/audits/',
      page: <HistoryLogsPage/>,
      permitted: permissionChecker('Audits', 'Read'),
    },
    {
      path: '/admin/tags',
      page: <TagsPage/>,
      permitted: permissionChecker('Tags', 'Read'),
    },
    {
      path: '/admin/tags/:formMode',
      page: <TagsFormPage/>,
      permitted: permissionChecker('Tags', 'Read'),
    },
    {
      path: '/admin/promotions',
      page: <PromotionsPage/>,
      permitted: permissionChecker('Promotions', 'Read'),
    },
    {
      path: '/admin/promotions/:formMode',
      page: <PromotionsFormPage/>,
      permitted: permissionChecker('Promotions', 'Read'),
    },
    {
      path: '/admin/delivery-fee',
      page: <DeliveryFeePage/>,
      permitted: permissionChecker('Delivery Fee', 'Read'),
    },
    {
      path: '/admin/transactions',
      page: <TransactionsPage/>,
      permitted: permissionChecker('Transactions', 'Read'),
    },
    {
      path: '/admin/transactions/create',
      page: <TransactionsFormPage/>,
      permitted: permissionChecker('Transactions', 'Create'),
    },
    {
      path: '/admin/stocks-report',
      page: <StocksReportPage/>,
      permitted: permissionChecker('Stocks Report', 'Read'),
    },
    {
      path: '/admin/deliveries',
      page: <DeliveriesPage/>,
      permitted: permissionChecker('Deliveries', 'Read'),
    },
    {
      path: '/admin/returned-items',
      page: <ReturnedItemsPage/>,
      permitted: permissionChecker('Returned Items', 'Read'),
    },
  ].filter(({permitted, skipPermission}) => permitted || skipPermission);

  const CUSTOMER_ROUTES = [
    {
      path: '/',
      page: <CustomerPage/>,
    },
    {
      path: '/sign-up',
      page: <CustomerSignUpPage/>,
    },
    {
      path: '/login',
      page: <CustomerLoginPage/>,
    },
    {
      path: '/forgot-password',
      page: <CustomerForgotPasswordPage/>,
    },
    {
      path: '/reset-password/:resetPasswordToken',
      page: <CustomerResetPasswordPage/>,
    },
    {
      path: '/my-profile',
      page: <CustomerProfile/>,
    },
    {
      path: '/my-address',
      page: <CustomerAddress/>,
    },
    {
      path: '/my-password',
      page: <CustomerPassword/>,
    },
    {
      path: '/my-wishlist',
      page: <CustomerWishlist/>,
    },
    {
      path: '/my-purchases',
      page: <CustomerPurchases/>,
    },
    {
      path: '/collections',
      page: <Collections/>,
    },
    {
      path: '/collections/:productName',
      page: <CustomerViewProduct/>
    },
    {
      path: '/cart',
      page: <CustomerCart/>,
    },
    {
      path: '/checkout',
      page: <CustomerCheckout/>,
    },
    {
      path: 'verify-email/:verificationEmailToken',
      page: <VerifyEmailPage/>,
    }
  ];

  return <>
    <BrowserRouter>
      <Routes>
        {ADMIN_UNAUTH_ROUTES.map((i, key) => (
          <Route
            key={key}
            path={i.path}
            element={
              <AdminProtectedRoutes>
                {i.page}
              </AdminProtectedRoutes>
            }
          />
        ))}

        {ADMIN_AUTH_ROUTES.map((i, key) => (
          <Route
            key={key}
            path={i.path}
            element={
              <AdminProtectedRoutes>
                <AdminPageLayout>
                  {i.page}
                </AdminPageLayout>
              </AdminProtectedRoutes>
            }
          />
        ))}

        {CUSTOMER_ROUTES.map((i, key) => (
          <Route
            key={key}
            path={i.path}
            element={
              <CustomerProtectedRoutes>
                <CustomerPageLayout>
                  {i.page}
                </CustomerPageLayout>
              </CustomerProtectedRoutes>
            }
          />
        ))}

        <Route 
          path='*'
          element={<ErrorPage/>}
        />
      </Routes>
    </BrowserRouter>
  </>
};

export default AppRoutes;