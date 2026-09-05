import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PublicLayout from '../components/layout/PublicLayout.jsx'
import ClientLayout from '../components/layout/ClientLayout.jsx'
import AdminLayout from '../components/layout/AdminLayout.jsx'
import { ROUTES } from '../constants/routes.js'
import HomePage from '../pages/HomePage.jsx'
import HowItWorksPage from '../pages/HowItWorksPage.jsx'
import AboutPage from '../pages/AboutPage.jsx'
import ForbiddenPage from '../pages/ForbiddenPage.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'
import LoginPage from '../features/auth/pages/LoginPage.jsx'
import RegisterPage from '../features/auth/pages/RegisterPage.jsx'
import ForgotPasswordPage from '../features/auth/pages/ForgotPasswordPage.jsx'
import ResetPasswordPage from '../features/auth/pages/ResetPasswordPage.jsx'
import ProvidersPage from '../features/providers/pages/ProvidersPage.jsx'
import ProviderDetailsPage from '../features/providers/pages/ProviderDetailsPage.jsx'
import PaymentPage from '../features/payments/pages/PaymentPage.jsx'
import PaymentStatusPage from '../features/payments/pages/PaymentStatusPage.jsx'
import ContactUnlockedPage from '../features/payments/pages/ContactUnlockedPage.jsx'
import ClientDashboardPage from '../features/client/pages/ClientDashboardPage.jsx'
import ContactAccessPage from '../features/client/pages/ContactAccessPage.jsx'
import PaymentHistoryPage from '../features/client/pages/PaymentHistoryPage.jsx'
import ClientProfilePage from '../features/client/pages/ClientProfilePage.jsx'
import ClientSettingsPage from '../features/client/pages/ClientSettingsPage.jsx'
import AdminLoginPage from '../features/admin/pages/AdminLoginPage.jsx'
import AdminDashboardPage from '../features/admin/pages/AdminDashboardPage.jsx'
import AdminProvidersPage from '../features/admin/pages/AdminProvidersPage.jsx'
import AdminProviderFormPage from '../features/admin/pages/AdminProviderFormPage.jsx'
import AdminCategoriesPage from '../features/admin/pages/AdminCategoriesPage.jsx'
import AdminTransactionsPage from '../features/admin/pages/AdminTransactionsPage.jsx'
import AdminUnlocksPage from '../features/admin/pages/AdminUnlocksPage.jsx'
import AdminAnalyticsPage from '../features/admin/pages/AdminAnalyticsPage.jsx'
import AdminAuditLogsPage from '../features/admin/pages/AdminAuditLogsPage.jsx'
import ClientRoute from './ClientRoute.jsx'
import AdminRoute from './AdminRoute.jsx'

function AppRoutes() {
  return <BrowserRouter><Routes>
    <Route element={<PublicLayout />}>
      <Route path={ROUTES.home} element={<HomePage />} />
      <Route path={ROUTES.providers} element={<ProvidersPage />} />
      <Route path={ROUTES.providerDetails} element={<ProviderDetailsPage />} />
      <Route path={ROUTES.howItWorks} element={<HowItWorksPage />} />
      <Route path={ROUTES.about} element={<AboutPage />} />
      <Route path={ROUTES.login} element={<LoginPage />} />
      <Route path={ROUTES.register} element={<RegisterPage />} />
      <Route path={ROUTES.forgotPassword} element={<ForgotPasswordPage />} />
      <Route path={ROUTES.resetPassword} element={<ResetPasswordPage />} />
      <Route path={ROUTES.adminLogin} element={<AdminLoginPage />} />
      <Route path={ROUTES.forbidden} element={<ForbiddenPage />} />
    </Route>
    <Route element={<ClientRoute />}>
      <Route element={<ClientLayout />}>
        <Route path={ROUTES.client} element={<ClientDashboardPage />} />
        <Route path={ROUTES.clientAccess} element={<ContactAccessPage />} />
        <Route path={ROUTES.clientPayments} element={<PaymentHistoryPage />} />
        <Route path={ROUTES.clientProfile} element={<ClientProfilePage />} />
        <Route path={ROUTES.clientSettings} element={<ClientSettingsPage />} />
      </Route>
      <Route element={<PublicLayout />}>
        <Route path={ROUTES.payment} element={<PaymentPage />} />
        <Route path={ROUTES.paymentStatus} element={<PaymentStatusPage />} />
        <Route path={ROUTES.contactUnlocked} element={<ContactUnlockedPage />} />
      </Route>
    </Route>
    <Route element={<AdminRoute />}>
      <Route element={<AdminLayout />}>
        <Route path={ROUTES.admin} element={<AdminDashboardPage />} />
        <Route path={ROUTES.adminProviders} element={<AdminProvidersPage />} />
        <Route path={ROUTES.adminProviderNew} element={<AdminProviderFormPage />} />
        <Route path={ROUTES.adminProviderEdit} element={<AdminProviderFormPage />} />
        <Route path={ROUTES.adminCategories} element={<AdminCategoriesPage />} />
        <Route path={ROUTES.adminTransactions} element={<AdminTransactionsPage />} />
        <Route path={ROUTES.adminUnlocks} element={<AdminUnlocksPage />} />
        <Route path={ROUTES.adminAnalytics} element={<AdminAnalyticsPage />} />
        <Route path={ROUTES.adminAuditLogs} element={<AdminAuditLogsPage />} />
      </Route>
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Routes></BrowserRouter>
}
export default AppRoutes
