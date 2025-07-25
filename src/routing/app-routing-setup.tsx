import { AuthRoutes } from '@/auth/auth-routing';
import { RequireAuth } from '@/auth/require-auth';
import { ErrorRouting } from '@/errors/error-routing';
import { Demo1Layout } from '@/layouts/demo1/layout';
import {
  AccountActivityPage,
  AccountAllowedIPAddressesPage,
  AccountApiKeysPage,
  AccountAppearancePage,
  AccountBackupAndRecoveryPage,
  AccountBasicPage,
  AccountCompanyProfilePage,
  AccountCurrentSessionsPage,
  AccountDeviceManagementPage,
  AccountEnterprisePage,
  AccountGetStartedPage,
  AccountHistoryPage,
  AccountImportMembersPage,
  AccountIntegrationsPage,
  AccountInviteAFriendPage,
  AccountMembersStarterPage,
  AccountNotificationsPage,
  AccountOverviewPage,
  AccountPermissionsCheckPage,
  AccountPermissionsTogglePage,
  AccountPlansPage,
  AccountPrivacySettingsPage,
  AccountRolesPage,
  AccountSecurityGetStartedPage,
  AccountSecurityLogPage,
  AccountSettingsEnterprisePage,
  AccountSettingsModalPage,
  AccountSettingsPlainPage,
  AccountSettingsSidebarPage,
  AccountTeamInfoPage,
  AccountTeamMembersPage,
  AccountTeamsPage,
  AccountTeamsStarterPage,
  AccountUserProfilePage,
} from '@/pages/account';
import CreateAuction from '@/pages/addAuction/createAuction';
import { ArchivedPage } from '@/pages/archived/archived';
import AuctionList from '@/pages/auction/auction-list';
import {
  AuthAccountDeactivatedPage,
  AuthWelcomeMessagePage,
} from '@/pages/auth';
import Car from '@/pages/carprofile/car';
import { DefaultPage, Demo1DarkSidebarPage } from '@/pages/dashboards';
import { ExamplePage } from '@/pages/example';
import FormPage from '@/pages/form/FormPage';
import {
  NetworkAppRosterPage,
  NetworkAuthorPage,
  NetworkGetStartedPage,
  NetworkMarketAuthorsPage,
  NetworkMiniCardsPage,
  NetworkNFTPage,
  NetworkSaasUsersPage,
  NetworkSocialPage,
  NetworkStoreClientsPage,
  NetworkUserCardsTeamCrewPage,
  NetworkUserTableTeamCrewPage,
  NetworkVisitorsPage,
} from '@/pages/network';
import {
  CampaignsCardPage,
  CampaignsListPage,
  ProfileActivityPage,
  ProfileBloggerPage,
  ProfileCompanyPage,
  ProfileCreatorPage,
  ProfileCRMPage,
  ProfileDefaultPage,
  ProfileEmptyPage,
  ProfileFeedsPage,
  ProfileGamerPage,
  ProfileModalPage,
  ProfileNetworkPage,
  ProfileNFTPage,
  ProfilePlainPage,
  ProfileTeamsPage,
  ProfileWorksPage,
  ProjectColumn2Page,
  ProjectColumn3Page,
} from '@/pages/public-profile';
import { AllProductsPage, DashboardPage } from '@/pages/store-admin';
import {
  MyOrdersPage,
  OrderPlacedPage,
  OrderReceiptPage,
  OrderSummaryPage,
  PaymentMethodPage,
  ProductDetailsPage,
  SearchResultsGridPage,
  SearchResultsListPage,
  ShippingInfoPage,
  StoreClientPage,
  WishlistPage,
} from '@/pages/store-client';
import { Navigate, Route, Routes } from 'react-router';
import Cars from '@/pages/cars/Cars';
import CarUpsert from '@/pages/cars/CarUpsert';
import CarsImport from '@/pages/cars/CarsImport';

export function AppRoutingSetup() {
  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route element={<Demo1Layout />}>
          <Route path="/" element={<DefaultPage />} />
          <Route path="/dark-sidebar" element={<Demo1DarkSidebarPage />} />
          <Route path="/sold-vehicles" element={<ExamplePage />} />
          <Route path="/archived" element={<ArchivedPage />} />
          <Route path="/form-page" element={<FormPage />} />
          <Route path="/cars/:id" element={<Car />} />
          <Route path="/auctions-list" element={<AuctionList />} />
          <Route path="/auctions-create" element={<CreateAuction />} />
          <Route path="/inventory/cars" element={<Cars />} />
          <Route path="/inventory/cars/add" element={<CarUpsert />} />
          <Route path="/inventory/cars/import" element={<CarsImport />} />
          <Route path="/inventory/cars/view/:id" element={<CarUpsert />} />
          <Route path="/auctions/new" element={<CreateAuction />} />
          {/* Add your route */}
          <Route
            path="/public-profile/profiles/default/"
            element={<ProfileDefaultPage />}
          />
          <Route
            path="/public-profile/profiles/creator"
            element={<ProfileCreatorPage />}
          />
          <Route
            path="/public-profile/profiles/company"
            element={<ProfileCompanyPage />}
          />
          <Route
            path="/public-profile/profiles/nft"
            element={<ProfileNFTPage />}
          />
          <Route
            path="/public-profile/profiles/blogger"
            element={<ProfileBloggerPage />}
          />
          <Route
            path="/public-profile/profiles/crm"
            element={<ProfileCRMPage />}
          />
          <Route
            path="/public-profile/profiles/gamer"
            element={<ProfileGamerPage />}
          />
          <Route
            path="/public-profile/profiles/feeds"
            element={<ProfileFeedsPage />}
          />
          <Route
            path="/public-profile/profiles/plain"
            element={<ProfilePlainPage />}
          />
          <Route
            path="/public-profile/profiles/modal"
            element={<ProfileModalPage />}
          />
          <Route
            path="/public-profile/projects/3-columns"
            element={<ProjectColumn3Page />}
          />
          <Route
            path="/public-profile/projects/2-columns"
            element={<ProjectColumn2Page />}
          />
          <Route path="/public-profile/works" element={<ProfileWorksPage />} />
          <Route path="/public-profile/teams" element={<ProfileTeamsPage />} />
          <Route
            path="/public-profile/network"
            element={<ProfileNetworkPage />}
          />
          <Route
            path="/public-profile/activity"
            element={<ProfileActivityPage />}
          />
          <Route
            path="/public-profile/campaigns/card"
            element={<CampaignsCardPage />}
          />
          <Route
            path="/public-profile/campaigns/list"
            element={<CampaignsListPage />}
          />
          <Route path="/public-profile/empty" element={<ProfileEmptyPage />} />
          <Route
            path="/account/home/get-started"
            element={<AccountGetStartedPage />}
          />
          <Route
            path="/account/home/user-profile"
            element={<AccountUserProfilePage />}
          />
          <Route
            path="/account/home/company-profile"
            element={<AccountCompanyProfilePage />}
          />
          <Route
            path="/account/home/settings-sidebar"
            element={<AccountSettingsSidebarPage />}
          />
          <Route
            path="/account/home/settings-enterprise"
            element={<AccountSettingsEnterprisePage />}
          />
          <Route
            path="/account/home/settings-plain"
            element={<AccountSettingsPlainPage />}
          />
          <Route
            path="/account/home/settings-modal"
            element={<AccountSettingsModalPage />}
          />
          <Route path="/account/billing/basic" element={<AccountBasicPage />} />
          <Route
            path="/account/billing/enterprise"
            element={<AccountEnterprisePage />}
          />
          <Route path="/account/billing/plans" element={<AccountPlansPage />} />
          <Route
            path="/account/billing/history"
            element={<AccountHistoryPage />}
          />
          <Route
            path="/account/security/get-started"
            element={<AccountSecurityGetStartedPage />}
          />
          <Route
            path="/account/security/overview"
            element={<AccountOverviewPage />}
          />
          <Route
            path="/account/security/allowed-ip-addresses"
            element={<AccountAllowedIPAddressesPage />}
          />
          <Route
            path="/account/security/privacy-settings"
            element={<AccountPrivacySettingsPage />}
          />
          <Route
            path="/account/security/device-management"
            element={<AccountDeviceManagementPage />}
          />
          <Route
            path="/account/security/backup-and-recovery"
            element={<AccountBackupAndRecoveryPage />}
          />
          <Route
            path="/account/security/current-sessions"
            element={<AccountCurrentSessionsPage />}
          />
          <Route
            path="/account/security/security-log"
            element={<AccountSecurityLogPage />}
          />
          <Route
            path="/account/members/team-starter"
            element={<AccountTeamsStarterPage />}
          />
          <Route path="/account/members/teams" element={<AccountTeamsPage />} />
          <Route
            path="/account/members/team-info"
            element={<AccountTeamInfoPage />}
          />
          <Route
            path="/account/members/members-starter"
            element={<AccountMembersStarterPage />}
          />
          <Route
            path="/account/members/team-members"
            element={<AccountTeamMembersPage />}
          />
          <Route
            path="/account/members/import-members"
            element={<AccountImportMembersPage />}
          />
          <Route path="/account/members/roles" element={<AccountRolesPage />} />
          <Route
            path="/account/members/permissions-toggle"
            element={<AccountPermissionsTogglePage />}
          />
          <Route
            path="/account/members/permissions-check"
            element={<AccountPermissionsCheckPage />}
          />
          <Route
            path="/account/integrations"
            element={<AccountIntegrationsPage />}
          />
          <Route
            path="/account/notifications"
            element={<AccountNotificationsPage />}
          />
          <Route path="/account/api-keys" element={<AccountApiKeysPage />} />
          <Route
            path="/account/appearance"
            element={<AccountAppearancePage />}
          />
          <Route
            path="/account/invite-a-friend"
            element={<AccountInviteAFriendPage />}
          />
          <Route path="/account/activity" element={<AccountActivityPage />} />
          <Route
            path="/network/get-started"
            element={<NetworkGetStartedPage />}
          />
          <Route
            path="/network/user-cards/mini-cards"
            element={<NetworkMiniCardsPage />}
          />
          <Route
            path="/network/user-cards/team-crew"
            element={<NetworkUserCardsTeamCrewPage />}
          />
          <Route
            path="/network/user-cards/author"
            element={<NetworkAuthorPage />}
          />
          <Route path="/network/user-cards/nft" element={<NetworkNFTPage />} />
          <Route
            path="/network/user-cards/social"
            element={<NetworkSocialPage />}
          />
          <Route
            path="/network/user-table/team-crew"
            element={<NetworkUserTableTeamCrewPage />}
          />
          <Route
            path="/network/user-table/app-roster"
            element={<NetworkAppRosterPage />}
          />
          <Route
            path="/network/user-table/market-authors"
            element={<NetworkMarketAuthorsPage />}
          />
          <Route
            path="/network/user-table/saas-users"
            element={<NetworkSaasUsersPage />}
          />
          <Route
            path="/network/user-table/store-clients"
            element={<NetworkStoreClientsPage />}
          />
          <Route
            path="/network/user-table/visitors"
            element={<NetworkVisitorsPage />}
          />
          <Route
            path="/auth/welcome-message"
            element={<AuthWelcomeMessagePage />}
          />
          <Route
            path="/auth/account-deactivated"
            element={<AuthAccountDeactivatedPage />}
          />
          <Route path="/store-client/home" element={<StoreClientPage />} />
          <Route
            path="/store-client/search-results-grid"
            element={<SearchResultsGridPage />}
          />
          <Route
            path="/store-client/search-results-list"
            element={<SearchResultsListPage />}
          />
          <Route
            path="/store-client/product-details"
            element={<ProductDetailsPage />}
          />
          <Route path="/store-client/wishlist" element={<WishlistPage />} />
          <Route
            path="/store-client/checkout/order-summary"
            element={<OrderSummaryPage />}
          />
          <Route
            path="/store-client/checkout/shipping-info"
            element={<ShippingInfoPage />}
          />
          <Route
            path="/store-client/checkout/payment-method"
            element={<PaymentMethodPage />}
          />
          <Route
            path="/store-client/checkout/order-placed"
            element={<OrderPlacedPage />}
          />
          <Route path="/store-client/my-orders" element={<MyOrdersPage />} />
          <Route
            path="/store-client/order-receipt"
            element={<OrderReceiptPage />}
          />
          <Route path="/store-admin/dashboard" element={<DashboardPage />} />
          <Route
            path="/store-admin/inventory/all-products"
            element={<AllProductsPage />}
          />
          <Route path="/auth/get-started" element={<AccountGetStartedPage />} />
        </Route>
      </Route>
      <Route path="error/*" element={<ErrorRouting />} />
      <Route path="auth/*" element={<AuthRoutes />} />
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Routes>
  );
}
