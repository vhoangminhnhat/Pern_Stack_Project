import { lazy } from "react";

class AppPages {
  static PAGES: { [key: string]: any } = {
    DashboardFeature: lazy(
      () => import("features/dashboard/view/DashboardFeature")
    ),
    HomeFeature: lazy(() => import("features/home/view/HomeFeature")),
    ExportReportFeature: lazy(
      () => import("features/report/export/view/ExportReportFeature")
    ),
    AccountFeature: lazy(
      () => import("features/settings/account/view/AccountFeature")
    ),
    AccountAuthenFeature: lazy(
      () =>
        import(
          "features/settings/accountAuthentication/view/AccountAuthenFeature"
        )
    ),
    UserManagementFeature: lazy(
      () => import("features/manager/user/view/UserManagementFeature")
    ),
    PartnerManagementFeature: lazy(
      () =>
        import(
          "features/manager/partnerManagement/views/PartnerManagementFeature"
        )
    ),
    BalanceFeature: lazy(
      () => import("features/manager/balance/view/BalanceFeature")
    ),
    WaitingListFeature: lazy(
      () => import("features/manager/waitingList/view/WaitingListFeature")
    ),
    ChangePasswordFeature: lazy(
      () => import("features/changePassword/view/ChangePasswordFeature")
    ),

    DataPackageTransactionFeature: lazy(
      () =>
        import(
          "features/transactionHistory/dataPackage/view/DataPackageTransactionFeature"
        )
    ),
    CashOutPage: lazy(
      () => import("features/changePassword/view/ChangePasswordFeature")
    ),
    ReportRevenue: lazy(
      () => import("features/report/revenue/view/ReportRevenue")
    ),
    SimPackageFeature: lazy(
      () =>
        import("features/transactionHistory/simPackage/view/SimPackageFeature")
    ),
    DataPackageFeature: lazy(
      () => import("features/manager/dataPackage/view/DataPackageFeature")
    ),
    SignUpPage: lazy(() => import("features/signUp/view/SignUpFeature")),
    SignInFeature: lazy(() => import("features/signIn/view/SignInFeature")),
  };

  static getPage(key: string): any {
    return this.PAGES[key];
  }
}

export const DEFAULT_PAGES = {
  SignUpPage: lazy(() => import("features/signUp/view/SignUpFeature")),
  SignInFeature: lazy(() => import("features/signIn/view/SignInFeature")),
};

export default AppPages;
