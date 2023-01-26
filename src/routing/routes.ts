import { DasboardWorkspace } from "../pages/private/dashboard/workspace";
import PublicHome from "../pages/public/home";
import SignUp from "../pages/public/signUp";
import { PrivateHome } from "../pages/private/home";
import { Profile } from "../pages/private/dashboard/profile";
import { ForgetPassword } from "../pages/public/forgetPassword";
import { PurchaseHistory } from "../pages/private/dashboard/purchaseHistory";
import { ChooseTypes } from "../pages/private/dashboard/chooseTypes";
import { ChooseSize } from "../pages/private/dashboard/chooseSize";
import { TrialOffer } from "../pages/private/home/trialOffer";
import { ChooseBusiness } from "../pages/private/dashboard/chooseBusiness";
import { ChooseTemplate } from "../pages/private/dashboard/chooseTemplate";
import { URL_CONSTANTS } from "./history";
import { ResetPassword } from "../pages/public/resetPassword";
import { TutorialPopup } from "../pages/private/home/tutorialPopup";
import { LoginCallBackErr } from "./CallBackError";
import { Landing } from "../admin/Landing";
import { TutorialsAdmin } from "../admin/TutorialsAdmin";
import { TutorialsRightSide } from "../admin/TutorialsRightSide";
import { Notification } from "../admin/Notification";
import { NotificationPopup } from "../admin/NotificationPopup";
import { Account } from "../admin/Account";
import { LandingTitle } from "../admin/LandingTitle";
import { ReviewAsset } from "../admin/ReviewAsset";
import { PageResponsiveMsg } from "./pageResponsiveMsg";
export const privateRoutes = [
  {
    link: URL_CONSTANTS.DASHBOARD_WORKSPACE(),
    component: DasboardWorkspace,
  },
  {
    link: URL_CONSTANTS.PRIVATE_HOME(),
    component: PrivateHome,
  },
  {
    link: URL_CONSTANTS.PROFILE(),
    component: Profile,
  },
  {
    link: URL_CONSTANTS.CHOOSE_TYPES(),
    component: ChooseTypes,
  },
  {
    link: URL_CONSTANTS.CHOOSE_SIZE(),
    component: ChooseSize,
  },
  {
    link: URL_CONSTANTS.PURCHASE_HISTORY(),
    component: PurchaseHistory,
  },
  {
    link: URL_CONSTANTS.TRIAL_OFFER(),
    component: TrialOffer,
  },
  {
    link: URL_CONSTANTS.CHOOSE_BUSINESS(),
    component: ChooseBusiness,
  },
  {
    link: URL_CONSTANTS.CHOOSE_TEMP(),
    component: ChooseTemplate,
  },
  {
    link: URL_CONSTANTS.TUTORIAL(),
    component: TutorialPopup,
  },
  {
    link: URL_CONSTANTS.LANDING_PAGE(),
    component: Landing,
  },
  {
    link: URL_CONSTANTS.TUTORIALS_ADMIN(),
    component: TutorialsAdmin,
  },
  {
    link: URL_CONSTANTS.TUTORIALS_RIGHTSIDE(),
    component: TutorialsRightSide,
  },
  {
    link: URL_CONSTANTS.NOTIFICATION(),
    component: Notification,
  },
  {
    link: URL_CONSTANTS.NOTIFICATIONPOPUP(),
    component: NotificationPopup,
  },
  {
    link: URL_CONSTANTS.ACCOUNT(),
    component: Account,
  },
  {
    link: URL_CONSTANTS.LANDING_TITLE(),
    component: LandingTitle,
  },
  {
    link: URL_CONSTANTS.REVIEW_ASSET(),
    component: ReviewAsset,
  },
  {
    link: URL_CONSTANTS.MOBILE_REGISTRATION(),
    component: PageResponsiveMsg,
  },
];

export const publicRoutes = [
  {
    link: URL_CONSTANTS.ROOT(),
    component: PublicHome,
  },
  {
    link: URL_CONSTANTS.SIGNUP(),
    component: SignUp,
  },
  {
    link: URL_CONSTANTS.FORGET_PASSWORD(),
    component: ForgetPassword,
  },
  {
    link: URL_CONSTANTS.RESET_PASSWORD(),
    component: ResetPassword,
  },
];
