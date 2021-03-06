import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import ProductListView from 'src/views/product/ProductListView';
import CertificateListView from 'src/views/certificatesEarned/CertificateListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import CustomerLayout from 'src/layouts/CustomerLayout';
import GenerateView from 'src/views/generate/GenerateView/index';
import { element } from 'prop-types';
import LandingPage from 'src/views/landingPage/index';
const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'customers', element: <CustomerListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path : 'generate', element: <GenerateView />},
      { path: 'templates', element: <ProductListView /> },
      { path: 'settings', element: <SettingsView /> }
    ]
  },
  {
    path: 'customer',
    element: <CustomerLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'certificatesEarned', element: <CertificateListView/> },
      { path: 'settings', element: <SettingsView /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'home', element:<LandingPage/>},
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '/', element: <Navigate to="/home" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];  

export default routes;
