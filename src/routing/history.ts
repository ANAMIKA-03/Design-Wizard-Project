import { createBrowserHistory } from "history";
//const privateRoutePrefix = "/app";
export const URL_CONSTANTS = {
  ROOT: () => "/",
  SIGNUP: () => "/signup",
  DASHBOARD_WORKSPACE: () => `/dashboard/workspace`,
  PRIVATE_HOME: () => `/home`,
  PROFILE: () => `/dashboard/profile`,
  PURCHASE_HISTORY: () => `/dashboard/purchase-history`,
  CHOOSE_TYPES: () => `/dashboard/choose-type`,
  CHOOSE_SIZE: () => `/dashboard/choose-size`,
  CHOOSE_TEMP: () => `/dashboard/choose-template`,
  FORGET_PASSWORD: () => `/forget-password`,
  RESET_PASSWORD: () => `/request-reset-password`,
  TRIAL_OFFER: () => `/trial-offer`,
  TUTORIAL: () => `/dashboard/workspace/tutorials`,
  CHOOSE_BUSINESS: () => `/choose-business`,
  NOTIFICATION: () => `/dashboard/adminNotificationsPanel`,
  NOTIFICATIONPOPUP: () => `/notificationpopup`,
  ACCOUNT: () => `/dashboard/manage-users`,
  LANDING_PAGE: () => `/Landing-page`,
  TUTORIALS_ADMIN: () => `/Tutorials-admin`,
  TUTORIALS_RIGHTSIDE: () => `/Tutorials-rightside`,
  LANDING_TITLE: () => `/Landing-title`,
  REVIEW_ASSET: () => `/Review-Asset`,
  MOBILE_REGISTRATION: () => `/mobile-registration`,
};
export default createBrowserHistory();
