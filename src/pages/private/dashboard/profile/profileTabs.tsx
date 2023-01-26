import React, { useContext, useEffect } from "react";
import { withStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import DoneIcon from "@material-ui/icons/Done";
import Button from "@material-ui/core/Button";
import { Switch } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useMutation,
  useQuery,
  useApolloClient,
  useLazyQuery,
} from "@apollo/client";
import UpgradePayemntPopUp from "../../../../pages/private/home/upgradePayment";
import { ReactComponent as Hubspot } from "../../../../assets/svg/New folder/hubspot.svg";
import { ReactComponent as Google } from "../../../../assets/svg/New folder/googleplus.svg";
import { ReactComponent as Facebook } from "../../../../assets/svg/New folder/facebook.svg";
import { ReactComponent as Warning } from "../../../../assets/svg/New folder/warning.svg";
import { ReactComponent as Download } from "../../../../assets/svg/New folder/download.svg";
import DefaultViews from "../../../../pages/private/home/defaultViews";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { ReactComponent as Icon } from "../../../../assets/svg/create.svg";
import { motion, AnimatePresence } from "framer-motion";
import RequestErrorPopup from "./requestPopup";
import RequestEmailErrorPopup from "./requestEmailFail";
import RequestSuccessPopup from "./designwizardinfo";
import {
  completeProfileDetails,
  changeName,
  changeCountry,
  promoCode,
  password,
  changeavatar,
  closeAccount,
  UnlinkProvider,
  requestInfo,
  resendEmail,
} from "../../../../lib/contexts/Queries";
import { ProfilePictureContext } from "../../../../App";
import { AddCard } from "../../../../pages/private/dashboard/profile/AddCard";

const ProfileWrap = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  width: 100%;
`;

const ProfileLeft = styled.div`
  display: inline-block;
  width: 429px;
  height: 481.19px;
`;

const ProfileLeftIn = styled.div`
  padding-right: 45px;
  float: right;
`;
const ToggleUPIcon = styled.div`
  width: 48px;
  height: 48px;
  position: absolute;
  border: 1px solid #000;
  margin: auto;
  display: block;
  left: 0;
  right: 0;
  box-shadow: 0 0 10px;
  border-radius: 100%;
  margin-top: 4px;
  background: #e5e6e6;
  cursor: pointer;
`;
const ProfileImg = styled.img`
  width: 94%;
  height: 88px;
  -webkit-border-radius: 44px;
  -moz-border-radius: 44px;
  background-size: contain;
  background-position: right 45px top;
`;

const ProfileRgt = styled.div`
  display: inline-block;
  width: 1449px;
  height: 727.79px;
`;

const ProfileLink = styled.span`
  color: #7f7f7f;
  font-size: 14px;
  font-family: "Lato", sans-serif;
  text-decoration: underline;
  margin-top: 20px;
  display: inline-block;
  height: 600px;
`;

const ProfileRgtIn = styled.div`
  padding-left: 50px;
  border-left: 2px solid #ccc;
  height: 100%;
  margin-top: 40px;
`;

const ProfileRgtHead = styled.h1`
  font-weight: 300;
  color: #5a2e6d;
  margin: 0 0 10px 0;
  font-size: 1.75rem;
  font-family: "Lato", sans-serif;
`;

const ProfileRgtHeadSpan = styled.span`
  color: #e87855;
  text-transform: uppercase;
`;

const ProfileRgtTop = styled.div`
  display: flex;
`;

const FormListUL = styled.ul`
  margin: 0 90px 40px 0;
  padding: 0;
  display: inline-block;
  font-size: 13px;
`;

const FormListULList = styled.li`
  list-style: none;
  display: flex;
  margin-bottom: 30px;
  height: 40px;
`;

const FormLable = styled.span`
  display: inline-block;
  color: #232428;
  margin-right: 2px;
  width: 100px;
  font-weight: normal;
  text-align: left;
  font-size: 16px;
  font-family: "Lato", sans-serif !important;
`;

const FormLableTextField = styled.span`
  display: inline-block;
`;

const SocialLink = styled.ul`
  margin: 0 0 40px 0;
  padding: 0;
  display: inline-block;
`;

const SocialLinkList = styled.li`
  list-style: none;
  margin-bottom: 15px;
`;
const DivContainer = styled.div`
  width: 1170px;
  margin: auto;
`;
const BackgroundColor = styled(motion.div)`
  background-color: #222841;
  position: relative;
  z-index: auto;
  padding: 100px 0 30px 0;
  position: relative;
  box-shadow: inset 0 -25px 40px -25px black;
`;
const FacebookLink = styled.span`
  color: #e6e6e8;
  border: 1px solid #3d67b3;
  padding: 0;
  background: #3d67b3;
  outline: none !important;
  cursor: pointer;
  width: 350px;
  display: block;
  text-align: center;
  position: relative;
  &:hover {
    color: #e6e6e8 !important;
    border: 1px solid #2a467a;
    background-color: #2a467a;
  }
`;

const FacebookLinkText = styled.h2`
  display: inline-block;
  font-size: 14px;
  font-family: "Lato", sans-serif !important;
  font-weight: 400;
  padding-left: 31px;
`;

const FacebookLinkIcon = styled.span`
  margin-right: 5px;
  display: inline-block;
  position: absolute;
  top: 10px;
`;

const GoogleLink = styled.span`
  border: 1px solid #4086f3;
  background-color: #4086f3;
  padding: 0;
  outline: none !important;
  cursor: pointer;
  color: #e6e6e8;
  width: 350px;
  display: block;
  text-align: center;
  position: relative;
  &:hover {
    color: #e6e6e8 !important;
    border: 1px solid #0e5dd9;
    background-color: #0e5dd9;
  }
`;

const HubspotLink = styled.span`
  border: 1px solid #fff;
  background-color: #fff;
  padding: 0;
  outline: none !important;
  cursor: pointer;
  color: #000;
  width: 350px;
  display: block;
  text-align: center;
  position: relative;
  &:hover {
    color: #000 !important;
    border: 1px solid #e87855;
    background-color: #e6e6e8;
  }
`;
const ActivatePanel = styled.div`
  padding: 15px 15px 15px 10px;
  background-color: #ffe08e;
  color: #444549;
  margin-bottom: 10px;
  height: 102px;
  width: 780px;
`;
const SwitchUL = styled.div`
  margin: 0 0 40px 0;
  padding: 0;
  display: flex;
`;

const SwitchULList = styled.div`
  display: inline-block;
`;
const SwitchULListTwo = styled.div`
  display: inline-block;
  font-weight: normal;
  font-size: 14px;
  margin-bottom: 0;
  color: #232428;
  cursor: pointer;
  font-family: "lato", sans-serif;
`;

const SwitchULListTwoSpan = styled.span`
  display: block;
  color: #777;
`;

const AccountLink = styled.span`
  text-decoration: underline;
  font-size: 14px;
  font-family: "lato", sans-serif;
  cursor: pointer;
  color: #232428;
  margin-bottom: 1rem;
  display: block;
`;

const PlanList = styled.ul`
  margin: 0 auto 50px auto;
  padding: 0;
  display: flex;
  text-align: center;
`;

const PlanListLi = styled.li`
  list-style: none;
  display: inline-block;
  text-align: center;
  margin: 0 60px;
  color: "#ff7f50";
`;

const PlanCircle = styled.div`
  position: relative;
  height: 92px;
  width: 92px;
  margin: auto;
  border: 4px solid #000;
  border-radius: 75px;
  text-align: center;
`;

const PlanCircleAdmin = styled.div`
  position: relative;
  height: 92px;
  width: 92px;
  margin: auto;
  border: 4px solid #e87855;
  border-radius: 75px;
  text-align: center;
  font-weight: 500;
`;

const PlanListLiSpan = styled.span`
  margin-top: 10px;
  text-align: center;
  display: block;
  color: #232428;
  font-size: 14px;
  font-family: "Lato", sans-serif;
`;

const PlanDoneArrow = styled.span`
  text-align: center;
  display: block;
  color: #232428;
  font-size: 14px;
  position: relative;
  height: 100px;
  width: 100px;
  margin: auto;
  border-radius: 75px;
`;

const PlanUpgrade = styled.span`
  text-align: center;
  display: inline-block;
  color: #232428;
  font-size: 14px;
  font-family: "Lato", sans-serif !important;
  color: white;
  border: 1px solid #e87855;
  padding: 7px;
  background: #e87855;
  cursor: pointer;
  vertical-align: middle;
  margin-top: 30px;
  padding: 11px 10px;
  &:hover {
    border: 1px solid #d4481d;
    background-color: #d4481d;
  }
`;
const ApplicationBtn = styled.div`
  margin: 0px;
  float: right;
`;
const ButtonSpan = styled.div`
  color: #e87855;
  border: 1px solid #858585;
  padding: 1px;
  background: transparent;
  outline: none !important;
  font-size: 14px;
  font-family: "Lato", sans-serif;
  height: 45px;
  width: 100%;
  &: hover {
    border-color: #232428;
  }
`;
const BillingText = styled.div`
  color: #232428;
  font-size: 14px;
  margin: 10px 0 50px 0;
  font-family: "Lato", sans-serif;
`;

const BillingTextSpan = styled.span`
  color: #e87855;
`;
const SignUp = styled.div`
  text-align: center;
  position: static;
  line-height: 1.6;
  margin-left: 15px;
  top: -11px;
  left: -435px;
  width: 77px;
  font-size: 14px;
  font-family: "Lato", sans-serif;
  color: #fbfbff !important;
  background-color: #e87855;
  height: 24px;
  padding: 16px 26px 16px;
  border: 1px solid #e6e6e8 !important;
  background-image: linear-gradient(30deg, #d4481d, #e5663f, #eb946b, #f1cb98);
  transition: border 0.3s ease, background-color 0.3s ease;
  cursor: pointer;
  &:hover {
    background-image: linear-gradient(
      30deg,
      #7a2a11,
      #a73917,
      #d4581d,
      #e59e3f
    );
  }
`;
const AddMoreSlideArea = styled.div`
  min-height: auto;
  overflow: auto;
`;

const CreateNewDesignButton = styled.button`
  position: absolute;
  top: 10px;
  height: 51px;
  width: 205px;
  color: #e87855;
  border: 1px solid #858585;
  textalign: center;
  padding: 7px;
  background: transparent;
  outline: none !important;
  right: 42%;
  font-size: 16px;
  font-weight: 250;
  display: flex;
  fontfamily: inherit;
  cursor: pointer;
  &:hover {
    border-color: #e87855;
  }
`;
const ContentSection = styled.div`
  background: #e5e6e6;
  min-height: 100%;
`;

const CardDetails = styled.div`
  margin-left: 16px;
`;
const CardDetailsOne = styled.div`
  display: flex;
  margin-top: 10px;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
`;
const CardLabelOne = styled.div`
  width: 140px;
  font-weight: normal;
  text-align: left;
  font-size: 16px;
  display: inline-block;
  margin-bottom: 0.5rem;
`;

const CardDetailsTwo = styled.div`
  display: flex;
  margin-top: 10px;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
`;

const CardLabelTwo = styled.div`
  width: 140px;
  font-weight: normal;
  text-align: left;
  font-size: 16px;
  display: inline-block;
  margin-bottom: 0.5rem;
`;

const CardDetailsThree = styled.div`
  display: flex;
  margin-top: 10px;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
`;
const CardLabelThree = styled.div`
  width: 140px;
  font-weight: normal;
  text-align: left;
  font-size: 16px;
  display: inline-block;
  margin-bottom: 0.5rem;
`;
const PaymentDetails = styled.div`
  text-align: center;
  margin-left: -15px;
  min-height: -7px;
  min-width: 96px;
  margin-top: 15px;
  margin-bottom: 30px;
  font-size: 14px;
  font-family: "Lato", sans-serif;
  color: #fbfbff !important;
  background-color: #e87855;
  height: 16px;
  padding: 16px 15px 16px;
  border: 1px solid #e6e6e8 !important;
  background-image: linear-gradient(30deg, #d4481d, #e5663f, #eb946b, #f1cb98);
  transition: border 0.3s ease, background-color 0.3s ease;
  cursor: pointer;
  &:hover {
    background-image: linear-gradient(
      30deg,
      #7a2a11,
      #a73917,
      #d4581d,
      #e59e3f
    );
  }
`;
const ImgLogo = styled.span`
  width: 45px;
  height: 28px;
  display: block;
  background-repeat: no-repeat;
  background-size: 45px 170px;
  background-image: url(https://staging.dwiz.io/images/card-logos.png);
`;

// width: 45px;
// height: 28px;
// display: block;
// background-repeat: no-repeat;
// background-size: 45px 170px;
// background-image: url('/images/card-logos.png');
// background-position: right 50px;

// &.visa {
//   background-position: right 0;
// }

// &.mastercard {
//   background-position: right -28px;
// }

// &.american-express {
//   background-position: right -57px;
// }

// &.discover {
//   background-position: right -85px;
// }

// &.jcb {
//   background-position: right -114px;
// }

// &.diners-club {
//   background-position: right -142px;
// }
// }
// }
// branding-button {
// margin-top: 20px;
// margin-left: -16px;
// }

// const brandMap = {
//   Visa: "visa",
//   MasterCard: "mastercard",
//   AmericanExpress: "american-express",
//   Discover: "discover",
//   JCB: "jcb",
//   DinersClub: "diners-club",
// };

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  const cardlogo = [
    { title: "visa", backgroundPosition: "right 0" },
    { title: "mastercard", backgroundPosition: "right -28px" },
    { title: "american-express", backgroundPosition: "right -57px" },
    { title: "discover", backgroundPosition: "right -85px" },
    { title: "jcb", backgroundPosition: "right -114px" },
    { title: "diners-club", backgroundPosition: "right -142px" },
  ];

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
      style={{
        height: "80vh",
        overflowY: "auto",
      }}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

interface LinkTabProps {
  label?: string;
  href?: string;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component="a"
      style={{
        textTransform: "capitalize",
        fontSize: "18px",
        fontFamily: "Lato, sans-serif",
      }}
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  password: {
    "& .MuiFormLabel-root": {
      fontSize: "14px",
      fontFamily: "Lato, sans-serif",
    },
  },
}));

const ConfirmBtn = withStyles({
  root: {
    fontSize: "14px",
    fontFamily: '"Lato" ,sans-serif',
    color: "#fff",
    width: "300px",
    height: "33px",
    background: "#ec9376",
    border: "1px solid #e87855",
    textTransform: "capitalize",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#bd411a",
      borderColor: "#e6e6e8",
      boxShadow: "none",
    },
  },
})(Button);
// const BootstrapButton = withStyles({
//   root: {
//     boxShadow: "none",
//     textTransform: "none",
//     fontSize: 16,
//     padding: "15px 21px",
//     border: "1px solid",
//     lineHeight: 1.5,
//     background: "#e87855",
//     borderColor: "#e6e6e8",
//     marginLeft: "20px",
//     color: "#fff",
//     height: "100%",
//     "&:hover": {
//       backgroundColor: "#bd411a",
//       borderColor: "#e6e6e8",
//       boxShadow: "none",
//     },
//     "&:active": {
//       boxShadow: "none",
//       backgroundColor: "#bd411a",
//       borderColor: "#e6e6e8",
//     },
//     "&:focus": {
//       boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
//     },
//   },
// })(Button);

let image: any;
export default function NavTabs() {
  const location: any = useLocation();
  const client = useApolloClient();
  const profilePicContext = useContext(ProfilePictureContext);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [show, setShow] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isRequestSuccessOpen, setisRequestSuccessOpen] = React.useState(false);
  const [isRequestErrorOpen, setisRequestErrorOpen] = React.useState(false);
  const [isRequestEmailErrorOpen, setisRequestEmailErrorOpen] =
    React.useState(false);
  const [showWarning, setShowWarning] = React.useState(false);
  const [base, setFileBase] = React.useState("");
  const [images, setImage] = React.useState("");
  const [toggle, setToggle] = React.useState(true);
  const [promo, setHandlePromo] = React.useState("");
  const [click, setClick] = React.useState(true);
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [isFbConnected, setIsFbConnected] = React.useState<boolean>(false);
  const [isGoogleConnected, setIsGoogleConnected] =
    React.useState<boolean>(false);
  const [identities, setIdentites] = React.useState([]);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [isPaid, setIsPaid] = React.useState(false);
  const [isAddCard, setIsAddCard] = React.useState(false);
  const [dateYear, setDateYear] = React.useState("");
  const userData: any = localStorage.getItem("user");
  // useEffect(() => {
  //   let identities: any = localStorage.getItem("user");
  //   let idObj = JSON.parse(identities);
  //   console.log(JSON.parse(identities));
  //   if(idObj.identities){
  //   setIdentites(idObj.identities);
  //   if (idObj.identities.length === 0) {
  //     setIsFbConnected(false);
  //     setIsGoogleConnected(false);
  //   } else {
  //     for (let i of idObj.identities) {
  //       if (i.includes("google")) {
  //         setIsGoogleConnected(true);
  //       }
  //       if (i.includes("facebook")) {
  //         setIsFbConnected(true);
  //       }
  //     }
  //   }
  //  }if(idObj.POST_users_login && idObj.POST_users_login.identities){
  //       setIdentites(idObj.POST_users_login.identities);
  //   if (idObj.POST_users_login.identities.length === 0) {
  //     setIsFbConnected(false);
  //     setIsGoogleConnected(false);
  //   } else {
  //     for (let i of idObj.POST_users_login.identities) {
  //       if (i.includes("google")) {
  //         setIsGoogleConnected(true);
  //       }
  //       if (i.includes("facebook")) {
  //         setIsFbConnected(true);
  //       }
  //     }
  //  }
  //  }
  // }, []);

  const addCardPopup = () => {
    setIsAddCard(!isAddCard);
  };

  useEffect(() => {
    const user: any = localStorage.getItem("user");
    const userData = JSON.parse(user);
    console.log(userData);
    for (let i of userData.roles) {
      if (i.name === "admin") {
        setIsAdmin(true);
      }
    }
  }, []);

  useEffect(() => {
    const data: any = localStorage.getItem("user");
    const paidUser = data
      .split("paidSubscriber")[1]
      .split(",")[0]
      .includes("false");
    if (!paidUser) {
      setIsPaid(true);
    }
  }, []);

  const [updateName, { loading: nameLoading, error: errLoading }] =
    useMutation(changeName);
  const [updateCountry, { loading: countryLoading, error: countryerrLoading }] =
    useMutation(changeCountry);
  const [
    changePPassword,
    { data: passwordData, loading: passwordLoading, error: passworderr },
  ] = useMutation(password);
  const [changepic] = useMutation(changeavatar);
  const [disconnectSocial] = useMutation(UnlinkProvider);
  React.useEffect(() => {
    if (base !== "") {
      uploadFile(base);
    }
  }, [base]);
  const {
    data: profileData,
    loading: profileLoading,
    //error: profileError,
    refetch: profileRefetch,
  } = useQuery(completeProfileDetails, {
    variables: {
      filter: "{}",
      token: `${localStorage.getItem("token")}`,
    },
  });
  React.useEffect(() => {}, [profileData]);

  React.useEffect(() => {
    const user: any = localStorage.getItem("user");
    const userData = JSON.parse(user);
    console.log(userData);
    let res = userData.POST_users_login
      ? userData.POST_users_login.emailVerified
      : userData.emailVerified;
    console.log(res);
    if (res !== true) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  }, []);

  React.useEffect(() => {
    if (profileData) {
      if (isPaid) {
        setdateyear();
      }
      console.log("Visa data", profileData);
      console.log(profileData.GET_users_me.avatar);
      image = profileData.GET_users_me.avatar
        ? profileData.GET_users_me.avatar
            .split("url=")[1]
            .substring(
              0,
              profileData.GET_users_me.avatar.split("url=")[1].length - 1
            ) +
          "?_=" +
          Math.random()
        : "../wizard.png";
      console.log(image);
      setImage(image);
      //setIdentites
      if (profileData.GET_users_me.identities) {
        setIdentites(profileData.GET_users_me.identities);
      }
      if (profileData.GET_users_me.identities.length === 0) {
        setIsFbConnected(false);
        setIsGoogleConnected(false);
      } else {
        for (let i of profileData.GET_users_me.identities) {
          if (i.includes("google")) {
            setIsGoogleConnected(true);
          }
          if (i.includes("facebook")) {
            setIsFbConnected(true);
          }
        }
      }
    }
  }, [profileData]);
  // const [changePromo, { loading: promoLoading }] = useMutation(promoCode, {
  //   onError: (err) => {
  //     toast.error("Promo code can not be applied");
  //   },
  //   onCompleted: (success) => {
  //     toast.success("Promo code applied correctly");
  const [requestData, { error: rError, data: rData }] = useLazyQuery(
    requestInfo,
    {
      fetchPolicy: "cache-and-network",
      onCompleted: () => {
        rData &&
          rData.GET_users_me_requestUserData &&
          setisRequestSuccessOpen(true);
      },
      onError: (e: any) => {
        JSON.stringify(rError).includes("Data request made in last 10days")
          ? setisRequestErrorOpen(true)
          : setisRequestEmailErrorOpen(true);
      },
    }
  );
  const [resendEmailData] = useLazyQuery(resendEmail, {
    fetchPolicy: "cache-and-network",
    onCompleted: (e: any) => {
      toast.success("Email sent successfully");
    },
    onError: (e: any) => {
      toast.success("some thing went wrong");
    },
  });
  // React.useEffect(() => {
  //   if (rLoading) {
  //     console.log("loading");
  //     setRequestclick(false);
  //   }
  //   if (rError) {
  //     JSON.stringify(rError).includes("Data request made in last 10days")
  //       ? setisRequestErrorOpen(true)
  //       : setisRequestEmailErrorOpen(true);
  //     setRequestclick(false);
  //   }
  //   if (rData) {
  //     setisRequestSuccessOpen(true);
  //     console.log(rData);
  //     setRequestclick(false);
  //   }
  // }, [Requestclick]);

  const [closeAccountData] = useMutation(closeAccount, {
    onError: (err) => {
      toast.error("failed");
    },
    onCompleted: (success) => {
      toast.success("Close account email verification sent successfully.");
    },
  });
  const [changePromo, { loading: promoLoading }] = useMutation(promoCode, {
    onError: (err) => {
      toast.error("Promo code can not be applied");
      setTimeout(() => {
        setClick(!click);
      }, 3000);
    },
    onCompleted: (success) => {
      toast.success("Promo code applied correctly");
    },
  });
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  if (profileLoading) return <></>;
  //if (profileError) return <>`Error! ${profileError.message}`</>;
  // image("profileData",image)

  const handleUpdateName = (name: any) => {
    updateName({
      variables: {
        input: `{\"name\":\"${name}\"}`,
        token: `${localStorage.getItem("token")}`,
      },
    });
    if (nameLoading) return <>'updating....'</>;
    if (errLoading) return <>`Submission error! ${errLoading.message}`</>;
  };
  const handleUpdateCountry = (country: any) => {
    country.preventDefault(country);
    // console.log(country.target.value)
    setToggle(!toggle);
    updateCountry({
      variables: {
        input: `{\"country\":\"${country.target.value}\",\"marketingConsent\":${toggle}}`,
        // "{\"name\":\"shubham\",\"username\":\"passport-user-670b49ab-5324-46b3-b176-46cb874a621b\",\"email\":\"shubhamupadhyay109@gmail.com\",\"emailVerified\":true,\"userId\":\"fdf23200-227c-11ec-8f32-752353cadfc5\",\"clientId\":null,\"beta\":null,\"city\":null,\"country\":\"India\",\"postcode\":null,\"street\":null,\"realm\":\"public\",\"roles\":[{\"name\":\"user\",\"realm\":\"public\"}],\"avatar\":{\"provider\":\"google\",\"url\":\"https:\/\/s3-eu-west-1.amazonaws.com\/composer.user.images.test\/fdf23200-227c-11ec-8f32-752353cadfc5\/profilePic.jpg\"},\"features\":[\"WORKSPACE_TEXT_FEATURES_SIMPLE\",\"WORKSPACE_LAYERS_CONTROL\",\"WORKSPACE_LAYERS_CONTROL\",\"COMPOSITIONS_PAGE\",\"WORKSPACE_CONFIRMATION_LEAVE_MODAL\",\"WORKSPACE_SAVE_COMPOSITION\",\"WORKSPACE_CONFIRM_LEAVE_SAVE\",\"WORKSPACE_TEXT_PANEL_EXTENDED\",\"WORKSPACE_CONFIRM_LEAVE_DOWNLOAD\",\"WORKSPACE_HORIZONTAL_LAYERS_ORDER\",\"WORKSPACE_FAVORITES\",\"WORKSPACE_FAVORITES\",\"WORKSPACE_ARTBOARDS\",\"WORKSPACE_ARTBOARDS\",\"WORKSPACE_UNDO\",\"SHARE_BUTTON\",\"WORKSPACE_DOWNLOAD_COMPOSITION\",\"MARKETO_SHARE\",\"WIZARD_TEMPLATE_SELECTION\",\"VIDEO_SEARCH\"],\"token\":\"VZwCqpml5gA72bXMCSl9ui1Ow8oN73WB8nDngUUUYIXDwMVMXBwGIgbxfDwpqD25\",\"tokenTtl\":null,\"tokenCreated\":null,\"stripeCustomerId\":null,\"stripeCardInfo\":null,\"stripeSubscriptions\":null,\"limits\":{\"credits\":0,\"videoCredits\":0,\"download\":100,\"share\":100,\"storage\":15,\"videoDownload\":50,\"videoShare\":50,\"totalCredits\":0,\"totalVideoCredits\":0},\"identities\":[{\"id\":50,\"provider\":\"google\"}],\"preferences\":{\"templateSearch\":null,\"templateNegativeSearch\":null,\"assetSearch\":null,\"assetNegativeSearch\":null,\"segmentsSelectedByUser\":\"Large Business\",\"emailVerification\":{\"notificationViewed\":true},\"productTour\":{\"notificationViewed\":true},\"animated-image-coachmark\":true,\"savedCategories\":[256,208],\"unlock-layer-coachmark\":true},\"lastUploadWarn\":null,\"other\":{},\"paidSubscriber\":false,\"wasSubscriberNew\":null,\"marketingConsent\":false,\"created\":\"2021-10-01T06:01:17.000Z\",\"storageUsed\":null}",
        token: localStorage.getItem("token"),
      },
    });
    if (countryLoading) return <>'updating....'</>;
    if (countryerrLoading)
      return <>`Submission error! ${countryerrLoading.message}`</>;
  };
  const handlePromoCode = () => {
    if (!promo) {
      return;
    }
    if (!click) {
      return;
    }
    setClick(false); // debugger;
    changePromo({
      variables: {
        input: `{\"promocode\":\"${promo}\",\"useremail\":${localStorage.getItem(
          "email"
        )}}`,
        token: `${localStorage.getItem("token")}`,
      },
    });
    if (promoLoading) return <>'updating....'</>;
    // if (promoerrLoading) return <>`error! ${promoerrLoading}`</>;
  };
  const handleChangePassword = () => {
    if (!currentPassword && !newPassword) {
      return;
    }
    changePPassword({
      variables: {
        input: `{\"oldPassword\":\"${currentPassword}\",\"newPassword\":\"${newPassword}\"}`,
        token: `${localStorage.getItem("token")}`,
      },
    });
    if (passworderr) return <>`error! ${passworderr}`</>;
    if (passwordLoading) {
      // return <>'updating....'</>;
    } else if (passwordData) {
      if (passwordData.POST_users_me_updatePassword.changed) {
        toast.success("password changed successfully");
      } else {
        toast.error("failed");
      }
    }
    // console.log(passwordData)
  };

  const picUpload = (e: any, cb: any) => {
    let file = e.target.files[0];
    console.log(file);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      /* eslint-disable-next-line */
      console.log("Error: ", error);
    };
  };
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const uploadFile = (base: string) => {
    console.log(base);
    client.resetStore();
    const func = async () => {
      const res = await changepic({
        variables: {
          token: `${localStorage.getItem("token")}`,
          input: JSON.stringify({
            base64: base,
          }),
        },
      });
      return res;
    };
    func().then((data) => {
      if (data) {
        profileRefetch();
        profilePicContext.setUpdated((old: any) => old + 1);
        console.log(data);
        setImage(`${data.data.POST_users_uploadAvatar.url}?_=${Math.random()}`);
        console.log(
          `${data.data.POST_users_uploadAvatar.url}?_=${Math.random()}`
        );
        setFileBase("");
      }
    });
  };

  const handleDelete = () => {
    closeAccountData({
      variables: {
        token: `${localStorage.getItem("token")}`,
      },
    });
    // changePPassword({
    //   variables: {
    //     input: `{\"oldPassword\":\"${currentPassword}\",\"newPassword\":\"${newPassword}\"}`,
    //     token: `${localStorage.getItem("token")}`,
    //   },
    // });
  };
  // const handleMarketing = (val:any)=>{
  // let abc = true
  // if(val){
  //   val=false
  // }else{
  //   val =true
  // }
  // console.log(val)
  // }
  // console.log(toggle)
  const connectGoogle = async () => {
    console.log(isGoogleConnected);
    if (isGoogleConnected) {
      let input: any = identities.filter((item: any) => {
        return item.includes("google");
      });
      let obj = {
        id: parseInt(input[0].split("id=")[1].split(",")[0]),
        provider: input[0].split("provider=")[1].split("}")[0],
      };
      const data = await disconnectSocial({
        variables: {
          token: `${localStorage.getItem("token")}`,
          input: JSON.stringify(obj),
        },
      });
      if (data) {
        toast.success("Account Delinked");
        profileRefetch();
      }
    } else {
      window.location.href = "https://api.dwiz.io/auth/google?login=false";
    }
  };

  const connectFacebook = async () => {
    if (isFbConnected) {
      let input: any = identities.filter((item: any) => {
        return item.includes("facebook");
      });
      let obj = {
        id: parseInt(input[0].split("id=")[1].split(",")[0]),
        provider: input[0].split("provider=")[1].split("}")[0],
      };
      const data = await disconnectSocial({
        variables: {
          token: `${localStorage.getItem("token")}`,
          input: JSON.stringify(obj),
        },
      });
      if (data) {
        toast.success("Account Delinked");
        profileRefetch();
      }
    } else {
      window.location.href = "https://api.dwiz.io/auth/facebook?login=false";
    }
  };

  const setdateyear = () => {
    const yearofcard = profileData.GET_users_me.stripeCardInfo.exp_year;
    const year = yearofcard.toString();

    const month = profileData.GET_users_me.stripeCardInfo.exp_month;
    const monthofcard = month.toString();
    let exp_month;
    const exp_year = year.split("")[2] + year.split("")[3];

    if (monthofcard.length === 1) {
      exp_month = "0" + monthofcard;
    } else {
      exp_month = monthofcard;
    }
    const dateYear = exp_month + "/" + exp_year;
    setDateYear(dateYear);
  };

  return (
    <ContentSection>
      {!show && location.pathname !== "/dashboard/profile" && (
        <CreateNewDesignButton onClick={() => setShow(true)}>
          <Icon
            style={{
              width: "35px",
              height: "35px",
              color: "white",
              marginTop: "0px",
            }}
          />
          <span
            style={{
              marginTop: "9px",
              marginLeft: "10px",
              fontFamily: "Lato, sans-serif",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            Create New Design
          </span>
        </CreateNewDesignButton>
      )}
      {isAddCard && <AddCard handleClose={addCardPopup} />}

      <AnimatePresence>
        {show ? (
          <BackgroundColor
            key="box1"
            initial={{ y: -200 }}
            animate={{ y: 0 }}
            exit={{ y: -200 }}
            transition={{ transition: "linear" }}
          >
            <DivContainer>
              <DefaultViews />
            </DivContainer>
            <ToggleUPIcon onClick={() => setShow(false)}>
              <KeyboardArrowUpIcon
                style={{ color: "#592e6f", padding: "2px", fontSize: "42px" }}
              />
            </ToggleUPIcon>
          </BackgroundColor>
        ) : null}
      </AnimatePresence>
      {/* add more content */}

      <AddMoreSlideArea>
        <div
          className={classes.root}
          style={{
            background: "#e6e6e5",
            minHeight: "1000000px",
            //overflowY: "scroll",
            height: "100%",
          }}
        >
          <AppBar position="static" style={{ background: "#e8e8e9" }}>
            <Tabs
              style={{
                color: "#696969",
                fontSize: "18px",
                padding: "0 24%",
                fontWeight: "bold",
              }}
              variant="fullWidth"
              value={value}
              onChange={handleChange}
              aria-label="nav tabs example"
            >
              <LinkTab
                label="Account Settings"
                href="/drafts"
                {...a11yProps(0)}
              />
              <LinkTab label="Plan Details" href="/trash" {...a11yProps(1)} />
              <LinkTab label="Password" href="/spam" {...a11yProps(2)} />
              <LinkTab label="Billing" href="/spam" {...a11yProps(3)} />
              <LinkTab label="Promo Code" href="/spam" {...a11yProps(4)} />
            </Tabs>
          </AppBar>
          <ToastContainer position="top-center" />
          <TabPanel value={value} index={0}>
            <ProfileWrap>
              <ProfileLeft>
                <ProfileLeftIn>
                  <ProfileImg src={images}></ProfileImg>
                  <br></br>
                  <ProfileLink>
                    <input
                      type="file"
                      style={{
                        opacity: "0",
                        position: "fixed",
                        cursor: "pointer",
                      }}
                      onChange={(e) => {
                        picUpload(e, (res: any) => {
                          setFileBase(res.toString());
                        });
                      }}
                    />
                    Change Photo{" "}
                  </ProfileLink>
                </ProfileLeftIn>
              </ProfileLeft>
              {!isAdmin && (
                <ProfileRgt>
                  <ProfileRgtIn>
                    <ProfileRgtHead>Account details</ProfileRgtHead>
                    {showWarning && (
                      <ActivatePanel>
                        <p
                          style={{
                            position: "relative",
                            paddingLeft: "49px",
                            whiteSpace: "normal",
                            marginTop: "0px",
                            marginBottom: " 1rem",
                            fontSize: "14px",
                            fontFamily: "Lato, sans-serif",
                          }}
                        >
                          <div
                            style={{ position: "absolute", top: 0, left: 0 }}
                          >
                            <Warning
                              style={{
                                width: "44px",
                                fontFamily: "Lato, sans-serif",
                                fontSize: "14px",
                              }}
                            />
                          </div>
                          Activate Your Account - Please click on the link sent
                          to your email address. Can't find the email?
                          <a
                            style={{
                              color: "#cd3333",
                              textDecoration: "underline",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              resendEmailData({
                                variables: {
                                  token: `${localStorage.getItem("token")}`,
                                },
                              });
                            }}
                          >
                            {" "}
                            Resend{" "}
                          </a>
                          verification email or {"            "}{" "}
                          <a
                            href="mailto:info@designwizard.com"
                            style={{
                              color: "#cd3333",
                              textDecoration: "underline",
                              cursor: "pointer",
                            }}
                          >
                            contact us
                          </a>
                          {"."}
                        </p>
                        <ApplicationBtn>
                          <ButtonSpan
                            onClick={() => {
                              resendEmailData({
                                variables: {
                                  token: `${localStorage.getItem("token")}`,
                                },
                              });
                            }}
                          >
                            <div style={{ paddingLeft: "3px" }}>
                              <p
                                style={{
                                  color: "#444549",
                                  cursor: "pointer",
                                  fontFamily: "Lato, sans-serif",
                                  fontSize: "14px",
                                }}
                              >
                                Resend email
                              </p>
                            </div>
                          </ButtonSpan>
                        </ApplicationBtn>
                      </ActivatePanel>
                    )}
                    <ProfileRgtTop>
                      <FormListUL>
                        <FormListULList>
                          <FormLable>Name</FormLable>
                          <FormLableTextField>
                            <TextField
                              style={{
                                border: "1px solid #c6c6c6",
                                color: "#757575",
                                padding: "3px 6px",
                                width: "250px",
                                height: "40px",
                              }}
                              InputLabelProps={{ shrink: true }}
                              placeholder={profileData.GET_users_me.name}
                              onChange={(e) => handleUpdateName(e.target.value)}
                              disabled={false}
                            />
                          </FormLableTextField>
                        </FormListULList>
                        <FormListULList>
                          <FormLable>Email</FormLable>
                          <FormLableTextField>
                            <TextField
                              style={{
                                border: "1px solid #c6c6c6",
                                color: "#757575",
                                padding: "3px 6px",
                                width: "250px",
                                height: "40px",
                              }}
                              InputLabelProps={{ shrink: true }}
                              placeholder={profileData.GET_users_me.email}
                              // disabled={false}
                            />
                          </FormLableTextField>
                        </FormListULList>
                        <FormListULList>
                          <FormLable>Country</FormLable>
                          <select
                            style={{
                              border: "1px solid rgb(198,198,198)",
                              color: "rgb(117,117,117)",
                              padding: "6px 12px",
                              width: "263px",
                              height: "42px",
                              backgroundColor: "rgb(225,226,227)",
                            }}
                            id="country"
                            name="country"
                            onChange={(e) => handleUpdateCountry(e)}
                          >
                            <option value=" "></option>
                            <option value="Afganistan">Afghanistan</option>
                            <option value="Albania">Albania</option>
                            <option value="Algeria">Algeria</option>
                            <option value="American Samoa">
                              American Samoa
                            </option>
                            <option value="Andorra">Andorra</option>
                            <option value="Angola">Angola</option>
                            <option value="Anguilla">Anguilla</option>
                            <option value="Antigua & Barbuda">
                              Antigua & Barbuda
                            </option>
                            <option value="Argentina">Argentina</option>
                            <option value="Armenia">Armenia</option>
                            <option value="Aruba">Aruba</option>
                            <option value="Australia">Australia</option>
                            <option value="Austria">Austria</option>
                            <option value="Azerbaijan">Azerbaijan</option>
                            <option value="Bahamas">Bahamas</option>
                            <option value="Bahrain">Bahrain</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Barbados">Barbados</option>
                            <option value="Belarus">Belarus</option>
                            <option value="Belgium">Belgium</option>
                            <option value="Belize">Belize</option>
                            <option value="Benin">Benin</option>
                            <option value="Bermuda">Bermuda</option>
                            <option value="Bhutan">Bhutan</option>
                            <option value="Bolivia">Bolivia</option>
                            <option value="Bonaire">Bonaire</option>
                            <option value="Bosnia & Herzegovina">
                              Bosnia & Herzegovina
                            </option>
                            <option value="Botswana">Botswana</option>
                            <option value="Brazil">Brazil</option>
                            <option value="British Indian Ocean Ter">
                              British Indian Ocean Ter
                            </option>
                            <option value="Brunei">Brunei</option>
                            <option value="Bulgaria">Bulgaria</option>
                            <option value="Burkina Faso">Burkina Faso</option>
                            <option value="Burundi">Burundi</option>
                            <option value="Cambodia">Cambodia</option>
                            <option value="Cameroon">Cameroon</option>
                            <option value="Canada">Canada</option>
                            <option value="Canary Islands">
                              Canary Islands
                            </option>
                            <option value="Cape Verde">Cape Verde</option>
                            <option value="Cayman Islands">
                              Cayman Islands
                            </option>
                            <option value="Central African Republic">
                              Central African Republic
                            </option>
                            <option value="Chad">Chad</option>
                            <option value="Channel Islands">
                              Channel Islands
                            </option>
                            <option value="Chile">Chile</option>
                            <option value="China">China</option>
                            <option value="Christmas Island">
                              Christmas Island
                            </option>
                            <option value="Cocos Island">Cocos Island</option>
                            <option value="Colombia">Colombia</option>
                            <option value="Comoros">Comoros</option>
                            <option value="Congo">Congo</option>
                            <option value="Cook Islands">Cook Islands</option>
                            <option value="Costa Rica">Costa Rica</option>
                            <option value="Cote DIvoire">Cote DIvoire</option>
                            <option value="Croatia">Croatia</option>
                            <option value="Cuba">Cuba</option>
                            <option value="Curaco">Curacao</option>
                            <option value="Cyprus">Cyprus</option>
                            <option value="Czech Republic">
                              Czech Republic
                            </option>
                            <option value="Denmark">Denmark</option>
                            <option value="Djibouti">Djibouti</option>
                            <option value="Dominica">Dominica</option>
                            <option value="Dominican Republic">
                              Dominican Republic
                            </option>
                            <option value="East Timor">East Timor</option>
                            <option value="Ecuador">Ecuador</option>
                            <option value="Egypt">Egypt</option>
                            <option value="El Salvador">El Salvador</option>
                            <option value="Equatorial Guinea">
                              Equatorial Guinea
                            </option>
                            <option value="Eritrea">Eritrea</option>
                            <option value="Estonia">Estonia</option>
                            <option value="Ethiopia">Ethiopia</option>
                            <option value="Falkland Islands">
                              Falkland Islands
                            </option>
                            <option value="Faroe Islands">Faroe Islands</option>
                            <option value="Fiji">Fiji</option>
                            <option value="Finland">Finland</option>
                            <option value="France">France</option>
                            <option value="French Guiana">French Guiana</option>
                            <option value="French Polynesia">
                              French Polynesia
                            </option>
                            <option value="French Southern Ter">
                              French Southern Ter
                            </option>
                            <option value="Gabon">Gabon</option>
                            <option value="Gambia">Gambia</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Germany">Germany</option>
                            <option value="Ghana">Ghana</option>
                            <option value="Gibraltar">Gibraltar</option>
                            <option value="Great Britain">Great Britain</option>
                            <option value="Greece">Greece</option>
                            <option value="Greenland">Greenland</option>
                            <option value="Grenada">Grenada</option>
                            <option value="Guadeloupe">Guadeloupe</option>
                            <option value="Guam">Guam</option>
                            <option value="Guatemala">Guatemala</option>
                            <option value="Guinea">Guinea</option>
                            <option value="Guyana">Guyana</option>
                            <option value="Haiti">Haiti</option>
                            <option value="Hawaii">Hawaii</option>
                            <option value="Honduras">Honduras</option>
                            <option value="Hong Kong">Hong Kong</option>
                            <option value="Hungary">Hungary</option>
                            <option value="Iceland">Iceland</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="India">India</option>
                            <option value="Iran">Iran</option>
                            <option value="Iraq">Iraq</option>
                            <option value="Ireland">Ireland</option>
                            <option value="Isle of Man">Isle of Man</option>
                            <option value="Israel">Israel</option>
                            <option value="Italy">Italy</option>
                            <option value="Jamaica">Jamaica</option>
                            <option value="Japan">Japan</option>
                            <option value="Jordan">Jordan</option>
                            <option value="Kazakhstan">Kazakhstan</option>
                            <option value="Kenya">Kenya</option>
                            <option value="Kiribati">Kiribati</option>
                            <option value="Korea North">Korea North</option>
                            <option value="Korea Sout">Korea South</option>
                            <option value="Kuwait">Kuwait</option>
                            <option value="Kyrgyzstan">Kyrgyzstan</option>
                            <option value="Laos">Laos</option>
                            <option value="Latvia">Latvia</option>
                            <option value="Lebanon">Lebanon</option>
                            <option value="Lesotho">Lesotho</option>
                            <option value="Liberia">Liberia</option>
                            <option value="Libya">Libya</option>
                            <option value="Liechtenstein">Liechtenstein</option>
                            <option value="Lithuania">Lithuania</option>
                            <option value="Luxembourg">Luxembourg</option>
                            <option value="Macau">Macau</option>
                            <option value="Macedonia">Macedonia</option>
                            <option value="Madagascar">Madagascar</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Malawi">Malawi</option>
                            <option value="Maldives">Maldives</option>
                            <option value="Mali">Mali</option>
                            <option value="Malta">Malta</option>
                            <option value="Marshall Islands">
                              Marshall Islands
                            </option>
                            <option value="Martinique">Martinique</option>
                            <option value="Mauritania">Mauritania</option>
                            <option value="Mauritius">Mauritius</option>
                            <option value="Mayotte">Mayotte</option>
                            <option value="Mexico">Mexico</option>
                            <option value="Midway Islands">
                              Midway Islands
                            </option>
                            <option value="Moldova">Moldova</option>
                            <option value="Monaco">Monaco</option>
                            <option value="Mongolia">Mongolia</option>
                            <option value="Montserrat">Montserrat</option>
                            <option value="Morocco">Morocco</option>
                            <option value="Mozambique">Mozambique</option>
                            <option value="Myanmar">Myanmar</option>
                            <option value="Nambia">Nambia</option>
                            <option value="Nauru">Nauru</option>
                            <option value="Nepal">Nepal</option>
                            <option value="Netherland Antilles">
                              Netherland Antilles
                            </option>
                            <option value="Netherlands">
                              Netherlands (Holland, Europe)
                            </option>
                            <option value="Nevis">Nevis</option>
                            <option value="New Caledonia">New Caledonia</option>
                            <option value="New Zealand">New Zealand</option>
                            <option value="Nicaragua">Nicaragua</option>
                            <option value="Niger">Niger</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Niue">Niue</option>
                            <option value="Norfolk Island">
                              Norfolk Island
                            </option>
                            <option value="Norway">Norway</option>
                            <option value="Oman">Oman</option>
                            <option value="Pakistan">Pakistan</option>
                            <option value="Palau Island">Palau Island</option>
                            <option value="Palestine">Palestine</option>
                            <option value="Panama">Panama</option>
                            <option value="Papua New Guinea">
                              Papua New Guinea
                            </option>
                            <option value="Paraguay">Paraguay</option>
                            <option value="Peru">Peru</option>
                            <option value="Phillipines">Philippines</option>
                            <option value="Pitcairn Island">
                              Pitcairn Island
                            </option>
                            <option value="Poland">Poland</option>
                            <option value="Portugal">Portugal</option>
                            <option value="Puerto Rico">Puerto Rico</option>
                            <option value="Qatar">Qatar</option>
                            <option value="Republic of Montenegro">
                              Republic of Montenegro
                            </option>
                            <option value="Republic of Serbia">
                              Republic of Serbia
                            </option>
                            <option value="Reunion">Reunion</option>
                            <option value="Romania">Romania</option>
                            <option value="Russia">Russia</option>
                            <option value="Rwanda">Rwanda</option>
                            <option value="St Barthelemy">St Barthelemy</option>
                            <option value="St Eustatius">St Eustatius</option>
                            <option value="St Helena">St Helena</option>
                            <option value="St Kitts-Nevis">
                              St Kitts-Nevis
                            </option>
                            <option value="St Lucia">St Lucia</option>
                            <option value="St Maarten">St Maarten</option>
                            <option value="St Pierre & Miquelon">
                              St Pierre & Miquelon
                            </option>
                            <option value="St Vincent & Grenadines">
                              St Vincent & Grenadines
                            </option>
                            <option value="Saipan">Saipan</option>
                            <option value="Samoa">Samoa</option>
                            <option value="Samoa American">
                              Samoa American
                            </option>
                            <option value="San Marino">San Marino</option>
                            <option value="Sao Tome & Principe">
                              Sao Tome & Principe
                            </option>
                            <option value="Saudi Arabia">Saudi Arabia</option>
                            <option value="Senegal">Senegal</option>
                            <option value="Seychelles">Seychelles</option>
                            <option value="Sierra Leone">Sierra Leone</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Slovakia">Slovakia</option>
                            <option value="Slovenia">Slovenia</option>
                            <option value="Solomon Islands">
                              Solomon Islands
                            </option>
                            <option value="Somalia">Somalia</option>
                            <option value="South Africa">South Africa</option>
                            <option value="Spain">Spain</option>
                            <option value="Sri Lanka">Sri Lanka</option>
                            <option value="Sudan">Sudan</option>
                            <option value="Suriname">Suriname</option>
                            <option value="Swaziland">Swaziland</option>
                            <option value="Sweden">Sweden</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Syria">Syria</option>
                            <option value="Tahiti">Tahiti</option>
                            <option value="Taiwan">Taiwan</option>
                            <option value="Tajikistan">Tajikistan</option>
                            <option value="Tanzania">Tanzania</option>
                            <option value="Thailand">Thailand</option>
                            <option value="Togo">Togo</option>
                            <option value="Tokelau">Tokelau</option>
                            <option value="Tonga">Tonga</option>
                            <option value="Trinidad & Tobago">
                              Trinidad & Tobago
                            </option>
                            <option value="Tunisia">Tunisia</option>
                            <option value="Turkey">Turkey</option>
                            <option value="Turkmenistan">Turkmenistan</option>
                            <option value="Turks & Caicos Is">
                              Turks & Caicos Is
                            </option>
                            <option value="Tuvalu">Tuvalu</option>
                            <option value="Uganda">Uganda</option>
                            <option value="United Kingdom">
                              United Kingdom
                            </option>
                            <option value="Ukraine">Ukraine</option>
                            <option value="United Arab Erimates">
                              United Arab Emirates
                            </option>
                            <option value="United States of America">
                              United States of America
                            </option>
                            <option value="Uraguay">Uruguay</option>
                            <option value="Uzbekistan">Uzbekistan</option>
                            <option value="Vanuatu">Vanuatu</option>
                            <option value="Vatican City State">
                              Vatican City State
                            </option>
                            <option value="Venezuela">Venezuela</option>
                            <option value="Vietnam">Vietnam</option>
                            <option value="Virgin Islands (Brit)">
                              Virgin Islands (Brit)
                            </option>
                            <option value="Virgin Islands (USA)">
                              Virgin Islands (USA)
                            </option>
                            <option value="Wake Island">Wake Island</option>
                            <option value="Wallis & Futana Is">
                              Wallis & Futana Is
                            </option>
                            <option value="Yemen">Yemen</option>
                            <option value="Zaire">Zaire</option>
                            <option value="Zambia">Zambia</option>
                            <option value="Zimbabwe">Zimbabwe</option>
                          </select>
                          {/* <FormLableTextField> */}
                          {/* <TextField
                        style={{
                          border: "1px solid #c6c6c6",
                          color: "#757575",
                          padding: "0 5px",
                          width: "250px",
                          height: "40px",
                        }}
                        InputLabelProps={{ shrink: true }}
                        value={profileData.GET_users_me.country}
                      />
                    </FormLableTextField>*/}
                        </FormListULList>
                      </FormListUL>
                      <SocialLink>
                        <SocialLinkList>
                          <FacebookLink onClick={connectFacebook}>
                            <FacebookLinkIcon>
                              <Facebook
                                style={{
                                  lineHeight: "30px",
                                  verticalAlign: "middle",
                                  width: "35px",
                                  height: "35px",
                                  marginLeft: "-13px",
                                  marginTop: "-4px",
                                  fontFamily: "lato",
                                  fontSize: "14px",
                                }}
                              />
                            </FacebookLinkIcon>
                            <FacebookLinkText>
                              {`${
                                isFbConnected ? "Disconnect" : "Connect"
                              } with Facebook`}
                            </FacebookLinkText>
                          </FacebookLink>
                        </SocialLinkList>
                        <SocialLinkList>
                          <GoogleLink onClick={connectGoogle}>
                            <FacebookLinkIcon>
                              <Google
                                style={{
                                  lineHeight: "30px",
                                  verticalAlign: "middle",
                                  width: "35px",
                                  height: "35px",
                                  marginLeft: "-13px",
                                  marginTop: "-4px",
                                }}
                              />
                            </FacebookLinkIcon>
                            <FacebookLinkText>
                              {`${
                                isGoogleConnected ? "Disconnect" : "Connect"
                              } with Google`}
                            </FacebookLinkText>
                          </GoogleLink>
                        </SocialLinkList>
                        <SocialLinkList>
                          <HubspotLink>
                            <FacebookLinkIcon>
                              <Hubspot
                                style={{
                                  lineHeight: "30px",
                                  verticalAlign: "middle",
                                  width: "35px",
                                  height: "35px",
                                  marginLeft: "-13px",
                                  marginTop: "-4px",
                                }}
                              />
                            </FacebookLinkIcon>
                            <FacebookLinkText>
                              Link with Hubspot
                            </FacebookLinkText>
                          </HubspotLink>
                        </SocialLinkList>
                      </SocialLink>
                    </ProfileRgtTop>
                    <ProfileRgtHead>Marketing Communications</ProfileRgtHead>
                    <SwitchUL>
                      <SwitchULList>
                        <Switch />
                      </SwitchULList>
                      <SwitchULListTwo>
                        Please send me Marketing Communications related to
                        Design Wizard.
                        <SwitchULListTwoSpan>
                          Unlock Tips/Webinars Notifications...
                        </SwitchULListTwoSpan>
                      </SwitchULListTwo>
                    </SwitchUL>
                    <ProfileRgtHead>Manage Account</ProfileRgtHead>
                    <AccountLink onClick={handleDelete}>
                      Delete account
                    </AccountLink>
                    <AccountLink
                      onClick={() => {
                        requestData({
                          variables: {
                            token: `${localStorage.getItem("token")}`,
                          },
                        });
                      }}
                    >
                      Request your DesignWizard information
                    </AccountLink>
                  </ProfileRgtIn>
                  {isRequestErrorOpen && (
                    <RequestErrorPopup
                      handleClose={() => {
                        setisRequestErrorOpen(false);
                      }}
                    />
                  )}
                  {isRequestSuccessOpen && (
                    <RequestSuccessPopup
                      handleClose={() => {
                        setisRequestSuccessOpen(false);
                      }}
                    />
                  )}
                  {isRequestEmailErrorOpen && (
                    <RequestEmailErrorPopup
                      handleClose={() => {
                        setisRequestEmailErrorOpen(false);
                      }}
                    />
                  )}
                </ProfileRgt>
              )}
              {isAdmin && (
                <ProfileRgt>
                  <ProfileRgtIn>
                    <ProfileRgtHead>Account details</ProfileRgtHead>
                    {showWarning && (
                      <ActivatePanel>
                        <p
                          style={{
                            position: "relative",
                            paddingLeft: "49px",
                            whiteSpace: "normal",
                            marginTop: "0px",
                            marginBottom: " 1rem",
                            fontSize: "14px",
                            fontFamily: "Lato, sans-serif",
                          }}
                        >
                          <div
                            style={{ position: "absolute", top: 0, left: 0 }}
                          >
                            <Warning
                              style={{
                                width: "44px",
                                fontFamily: "Lato, sans-serif",
                                fontSize: "14px",
                              }}
                            />
                          </div>
                          Activate Your Account - Please click on the link sent
                          to your email address. Can't find the email?
                          <a
                            style={{
                              color: "#cd3333",
                              textDecoration: "underline",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              resendEmailData({
                                variables: {
                                  token: `${localStorage.getItem("token")}`,
                                },
                              });
                            }}
                          >
                            {" "}
                            Resend{" "}
                          </a>
                          verification email or {"            "}{" "}
                          <a
                            style={{
                              color: "#cd3333",
                              textDecoration: "underline",
                            }}
                          >
                            contact us
                          </a>
                          {"."}
                        </p>
                        <ApplicationBtn>
                          <ButtonSpan
                            onClick={() => {
                              resendEmailData({
                                variables: {
                                  token: `${localStorage.getItem("token")}`,
                                },
                              });
                            }}
                          >
                            <div style={{ paddingLeft: "3px" }}>
                              <p
                                style={{
                                  color: "#444549",
                                  cursor: "pointer",
                                  fontFamily: "Lato, sans-serif",
                                  fontSize: "14px",
                                }}
                              >
                                Resend email
                              </p>
                            </div>
                          </ButtonSpan>
                        </ApplicationBtn>
                      </ActivatePanel>
                    )}
                    <ProfileRgtTop>
                      <FormListUL>
                        <FormListULList>
                          <FormLable>Name</FormLable>
                          <FormLableTextField>
                            <TextField
                              style={{
                                border: "1px solid #c6c6c6",
                                color: "#757575",
                                padding: "3px 6px",
                                width: "250px",
                                height: "40px",
                              }}
                              InputLabelProps={{ shrink: true }}
                              placeholder={profileData.GET_users_me.name}
                              onChange={(e) => handleUpdateName(e.target.value)}
                              disabled={false}
                            />
                          </FormLableTextField>
                        </FormListULList>
                        <FormListULList>
                          <FormLable>Email</FormLable>
                          <FormLableTextField>
                            <TextField
                              style={{
                                border: "1px solid #c6c6c6",
                                color: "#757575",
                                padding: "3px 6px",
                                width: "250px",
                                height: "40px",
                              }}
                              InputLabelProps={{ shrink: true }}
                              placeholder={profileData.GET_users_me.email}
                              // disabled={false}
                            />
                          </FormLableTextField>
                        </FormListULList>
                        <FormListULList>
                          <FormLable>Country</FormLable>
                          <select
                            style={{
                              border: "1px solid rgb(198,198,198)",
                              color: "rgb(117,117,117)",
                              padding: "6px 12px",
                              width: "263px",
                              height: "42px",
                              backgroundColor: "rgb(225,226,227)",
                            }}
                            id="country"
                            name="country"
                            onChange={(e) => handleUpdateCountry(e)}
                          >
                            <option value=" "></option>
                            <option value="Afganistan">Afghanistan</option>
                            <option value="Albania">Albania</option>
                            <option value="Algeria">Algeria</option>
                            <option value="American Samoa">
                              American Samoa
                            </option>
                            <option value="Andorra">Andorra</option>
                            <option value="Angola">Angola</option>
                            <option value="Anguilla">Anguilla</option>
                            <option value="Antigua & Barbuda">
                              Antigua & Barbuda
                            </option>
                            <option value="Argentina">Argentina</option>
                            <option value="Armenia">Armenia</option>
                            <option value="Aruba">Aruba</option>
                            <option value="Australia">Australia</option>
                            <option value="Austria">Austria</option>
                            <option value="Azerbaijan">Azerbaijan</option>
                            <option value="Bahamas">Bahamas</option>
                            <option value="Bahrain">Bahrain</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Barbados">Barbados</option>
                            <option value="Belarus">Belarus</option>
                            <option value="Belgium">Belgium</option>
                            <option value="Belize">Belize</option>
                            <option value="Benin">Benin</option>
                            <option value="Bermuda">Bermuda</option>
                            <option value="Bhutan">Bhutan</option>
                            <option value="Bolivia">Bolivia</option>
                            <option value="Bonaire">Bonaire</option>
                            <option value="Bosnia & Herzegovina">
                              Bosnia & Herzegovina
                            </option>
                            <option value="Botswana">Botswana</option>
                            <option value="Brazil">Brazil</option>
                            <option value="British Indian Ocean Ter">
                              British Indian Ocean Ter
                            </option>
                            <option value="Brunei">Brunei</option>
                            <option value="Bulgaria">Bulgaria</option>
                            <option value="Burkina Faso">Burkina Faso</option>
                            <option value="Burundi">Burundi</option>
                            <option value="Cambodia">Cambodia</option>
                            <option value="Cameroon">Cameroon</option>
                            <option value="Canada">Canada</option>
                            <option value="Canary Islands">
                              Canary Islands
                            </option>
                            <option value="Cape Verde">Cape Verde</option>
                            <option value="Cayman Islands">
                              Cayman Islands
                            </option>
                            <option value="Central African Republic">
                              Central African Republic
                            </option>
                            <option value="Chad">Chad</option>
                            <option value="Channel Islands">
                              Channel Islands
                            </option>
                            <option value="Chile">Chile</option>
                            <option value="China">China</option>
                            <option value="Christmas Island">
                              Christmas Island
                            </option>
                            <option value="Cocos Island">Cocos Island</option>
                            <option value="Colombia">Colombia</option>
                            <option value="Comoros">Comoros</option>
                            <option value="Congo">Congo</option>
                            <option value="Cook Islands">Cook Islands</option>
                            <option value="Costa Rica">Costa Rica</option>
                            <option value="Cote DIvoire">Cote DIvoire</option>
                            <option value="Croatia">Croatia</option>
                            <option value="Cuba">Cuba</option>
                            <option value="Curaco">Curacao</option>
                            <option value="Cyprus">Cyprus</option>
                            <option value="Czech Republic">
                              Czech Republic
                            </option>
                            <option value="Denmark">Denmark</option>
                            <option value="Djibouti">Djibouti</option>
                            <option value="Dominica">Dominica</option>
                            <option value="Dominican Republic">
                              Dominican Republic
                            </option>
                            <option value="East Timor">East Timor</option>
                            <option value="Ecuador">Ecuador</option>
                            <option value="Egypt">Egypt</option>
                            <option value="El Salvador">El Salvador</option>
                            <option value="Equatorial Guinea">
                              Equatorial Guinea
                            </option>
                            <option value="Eritrea">Eritrea</option>
                            <option value="Estonia">Estonia</option>
                            <option value="Ethiopia">Ethiopia</option>
                            <option value="Falkland Islands">
                              Falkland Islands
                            </option>
                            <option value="Faroe Islands">Faroe Islands</option>
                            <option value="Fiji">Fiji</option>
                            <option value="Finland">Finland</option>
                            <option value="France">France</option>
                            <option value="French Guiana">French Guiana</option>
                            <option value="French Polynesia">
                              French Polynesia
                            </option>
                            <option value="French Southern Ter">
                              French Southern Ter
                            </option>
                            <option value="Gabon">Gabon</option>
                            <option value="Gambia">Gambia</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Germany">Germany</option>
                            <option value="Ghana">Ghana</option>
                            <option value="Gibraltar">Gibraltar</option>
                            <option value="Great Britain">Great Britain</option>
                            <option value="Greece">Greece</option>
                            <option value="Greenland">Greenland</option>
                            <option value="Grenada">Grenada</option>
                            <option value="Guadeloupe">Guadeloupe</option>
                            <option value="Guam">Guam</option>
                            <option value="Guatemala">Guatemala</option>
                            <option value="Guinea">Guinea</option>
                            <option value="Guyana">Guyana</option>
                            <option value="Haiti">Haiti</option>
                            <option value="Hawaii">Hawaii</option>
                            <option value="Honduras">Honduras</option>
                            <option value="Hong Kong">Hong Kong</option>
                            <option value="Hungary">Hungary</option>
                            <option value="Iceland">Iceland</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="India">India</option>
                            <option value="Iran">Iran</option>
                            <option value="Iraq">Iraq</option>
                            <option value="Ireland">Ireland</option>
                            <option value="Isle of Man">Isle of Man</option>
                            <option value="Israel">Israel</option>
                            <option value="Italy">Italy</option>
                            <option value="Jamaica">Jamaica</option>
                            <option value="Japan">Japan</option>
                            <option value="Jordan">Jordan</option>
                            <option value="Kazakhstan">Kazakhstan</option>
                            <option value="Kenya">Kenya</option>
                            <option value="Kiribati">Kiribati</option>
                            <option value="Korea North">Korea North</option>
                            <option value="Korea Sout">Korea South</option>
                            <option value="Kuwait">Kuwait</option>
                            <option value="Kyrgyzstan">Kyrgyzstan</option>
                            <option value="Laos">Laos</option>
                            <option value="Latvia">Latvia</option>
                            <option value="Lebanon">Lebanon</option>
                            <option value="Lesotho">Lesotho</option>
                            <option value="Liberia">Liberia</option>
                            <option value="Libya">Libya</option>
                            <option value="Liechtenstein">Liechtenstein</option>
                            <option value="Lithuania">Lithuania</option>
                            <option value="Luxembourg">Luxembourg</option>
                            <option value="Macau">Macau</option>
                            <option value="Macedonia">Macedonia</option>
                            <option value="Madagascar">Madagascar</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Malawi">Malawi</option>
                            <option value="Maldives">Maldives</option>
                            <option value="Mali">Mali</option>
                            <option value="Malta">Malta</option>
                            <option value="Marshall Islands">
                              Marshall Islands
                            </option>
                            <option value="Martinique">Martinique</option>
                            <option value="Mauritania">Mauritania</option>
                            <option value="Mauritius">Mauritius</option>
                            <option value="Mayotte">Mayotte</option>
                            <option value="Mexico">Mexico</option>
                            <option value="Midway Islands">
                              Midway Islands
                            </option>
                            <option value="Moldova">Moldova</option>
                            <option value="Monaco">Monaco</option>
                            <option value="Mongolia">Mongolia</option>
                            <option value="Montserrat">Montserrat</option>
                            <option value="Morocco">Morocco</option>
                            <option value="Mozambique">Mozambique</option>
                            <option value="Myanmar">Myanmar</option>
                            <option value="Nambia">Nambia</option>
                            <option value="Nauru">Nauru</option>
                            <option value="Nepal">Nepal</option>
                            <option value="Netherland Antilles">
                              Netherland Antilles
                            </option>
                            <option value="Netherlands">
                              Netherlands (Holland, Europe)
                            </option>
                            <option value="Nevis">Nevis</option>
                            <option value="New Caledonia">New Caledonia</option>
                            <option value="New Zealand">New Zealand</option>
                            <option value="Nicaragua">Nicaragua</option>
                            <option value="Niger">Niger</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Niue">Niue</option>
                            <option value="Norfolk Island">
                              Norfolk Island
                            </option>
                            <option value="Norway">Norway</option>
                            <option value="Oman">Oman</option>
                            <option value="Pakistan">Pakistan</option>
                            <option value="Palau Island">Palau Island</option>
                            <option value="Palestine">Palestine</option>
                            <option value="Panama">Panama</option>
                            <option value="Papua New Guinea">
                              Papua New Guinea
                            </option>
                            <option value="Paraguay">Paraguay</option>
                            <option value="Peru">Peru</option>
                            <option value="Phillipines">Philippines</option>
                            <option value="Pitcairn Island">
                              Pitcairn Island
                            </option>
                            <option value="Poland">Poland</option>
                            <option value="Portugal">Portugal</option>
                            <option value="Puerto Rico">Puerto Rico</option>
                            <option value="Qatar">Qatar</option>
                            <option value="Republic of Montenegro">
                              Republic of Montenegro
                            </option>
                            <option value="Republic of Serbia">
                              Republic of Serbia
                            </option>
                            <option value="Reunion">Reunion</option>
                            <option value="Romania">Romania</option>
                            <option value="Russia">Russia</option>
                            <option value="Rwanda">Rwanda</option>
                            <option value="St Barthelemy">St Barthelemy</option>
                            <option value="St Eustatius">St Eustatius</option>
                            <option value="St Helena">St Helena</option>
                            <option value="St Kitts-Nevis">
                              St Kitts-Nevis
                            </option>
                            <option value="St Lucia">St Lucia</option>
                            <option value="St Maarten">St Maarten</option>
                            <option value="St Pierre & Miquelon">
                              St Pierre & Miquelon
                            </option>
                            <option value="St Vincent & Grenadines">
                              St Vincent & Grenadines
                            </option>
                            <option value="Saipan">Saipan</option>
                            <option value="Samoa">Samoa</option>
                            <option value="Samoa American">
                              Samoa American
                            </option>
                            <option value="San Marino">San Marino</option>
                            <option value="Sao Tome & Principe">
                              Sao Tome & Principe
                            </option>
                            <option value="Saudi Arabia">Saudi Arabia</option>
                            <option value="Senegal">Senegal</option>
                            <option value="Seychelles">Seychelles</option>
                            <option value="Sierra Leone">Sierra Leone</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Slovakia">Slovakia</option>
                            <option value="Slovenia">Slovenia</option>
                            <option value="Solomon Islands">
                              Solomon Islands
                            </option>
                            <option value="Somalia">Somalia</option>
                            <option value="South Africa">South Africa</option>
                            <option value="Spain">Spain</option>
                            <option value="Sri Lanka">Sri Lanka</option>
                            <option value="Sudan">Sudan</option>
                            <option value="Suriname">Suriname</option>
                            <option value="Swaziland">Swaziland</option>
                            <option value="Sweden">Sweden</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Syria">Syria</option>
                            <option value="Tahiti">Tahiti</option>
                            <option value="Taiwan">Taiwan</option>
                            <option value="Tajikistan">Tajikistan</option>
                            <option value="Tanzania">Tanzania</option>
                            <option value="Thailand">Thailand</option>
                            <option value="Togo">Togo</option>
                            <option value="Tokelau">Tokelau</option>
                            <option value="Tonga">Tonga</option>
                            <option value="Trinidad & Tobago">
                              Trinidad & Tobago
                            </option>
                            <option value="Tunisia">Tunisia</option>
                            <option value="Turkey">Turkey</option>
                            <option value="Turkmenistan">Turkmenistan</option>
                            <option value="Turks & Caicos Is">
                              Turks & Caicos Is
                            </option>
                            <option value="Tuvalu">Tuvalu</option>
                            <option value="Uganda">Uganda</option>
                            <option value="United Kingdom">
                              United Kingdom
                            </option>
                            <option value="Ukraine">Ukraine</option>
                            <option value="United Arab Erimates">
                              United Arab Emirates
                            </option>
                            <option value="United States of America">
                              United States of America
                            </option>
                            <option value="Uraguay">Uruguay</option>
                            <option value="Uzbekistan">Uzbekistan</option>
                            <option value="Vanuatu">Vanuatu</option>
                            <option value="Vatican City State">
                              Vatican City State
                            </option>
                            <option value="Venezuela">Venezuela</option>
                            <option value="Vietnam">Vietnam</option>
                            <option value="Virgin Islands (Brit)">
                              Virgin Islands (Brit)
                            </option>
                            <option value="Virgin Islands (USA)">
                              Virgin Islands (USA)
                            </option>
                            <option value="Wake Island">Wake Island</option>
                            <option value="Wallis & Futana Is">
                              Wallis & Futana Is
                            </option>
                            <option value="Yemen">Yemen</option>
                            <option value="Zaire">Zaire</option>
                            <option value="Zambia">Zambia</option>
                            <option value="Zimbabwe">Zimbabwe</option>
                          </select>
                          {/* <FormLableTextField> */}
                          {/* <TextField
                        style={{
                          border: "1px solid #c6c6c6",
                          color: "#757575",
                          padding: "0 5px",
                          width: "250px",
                          height: "40px",
                        }}
                        InputLabelProps={{ shrink: true }}
                        value={profileData.GET_users_me.country}
                      />
                    </FormLableTextField>*/}
                        </FormListULList>
                      </FormListUL>
                      <SocialLink>
                        <SocialLinkList>
                          <FacebookLink onClick={connectFacebook}>
                            <FacebookLinkIcon>
                              <Facebook
                                style={{
                                  lineHeight: "30px",
                                  verticalAlign: "middle",
                                  width: "35px",
                                  height: "35px",
                                  marginLeft: "-13px",
                                  marginTop: "-4px",
                                  fontFamily: "lato",
                                  fontSize: "14px",
                                }}
                              />
                            </FacebookLinkIcon>
                            <FacebookLinkText>
                              {`${
                                isFbConnected ? "Disconnect" : "Connect"
                              } with Facebook`}
                            </FacebookLinkText>
                          </FacebookLink>
                        </SocialLinkList>
                        <SocialLinkList>
                          <GoogleLink onClick={connectGoogle}>
                            <FacebookLinkIcon>
                              <Google
                                style={{
                                  lineHeight: "30px",
                                  verticalAlign: "middle",
                                  width: "35px",
                                  height: "35px",
                                  marginLeft: "-13px",
                                  marginTop: "-4px",
                                }}
                              />
                            </FacebookLinkIcon>
                            <FacebookLinkText>
                              {`${
                                isGoogleConnected ? "Disconnect" : "Connect"
                              } with Google`}
                            </FacebookLinkText>
                          </GoogleLink>
                        </SocialLinkList>
                        <SocialLinkList>
                          <HubspotLink>
                            <FacebookLinkIcon>
                              <Hubspot
                                style={{
                                  lineHeight: "30px",
                                  verticalAlign: "middle",
                                  width: "35px",
                                  height: "35px",
                                  marginLeft: "-13px",
                                  marginTop: "-4px",
                                }}
                              />
                            </FacebookLinkIcon>
                            <FacebookLinkText>
                              Link with Hubspot
                            </FacebookLinkText>
                          </HubspotLink>
                        </SocialLinkList>
                      </SocialLink>
                    </ProfileRgtTop>
                    <ProfileRgtHead>Marketing Communications</ProfileRgtHead>
                    <SwitchUL>
                      <SwitchULList>
                        <Switch />
                      </SwitchULList>
                      <SwitchULListTwo>
                        Please send me Marketing Communications related to
                        Design Wizard. 2
                        <SwitchULListTwoSpan>
                          Unlock Tips/Webinars Notifications...
                        </SwitchULListTwoSpan>
                      </SwitchULListTwo>
                    </SwitchUL>
                  </ProfileRgtIn>
                  {isRequestErrorOpen && (
                    <RequestErrorPopup
                      handleClose={() => {
                        setisRequestErrorOpen(false);
                      }}
                    />
                  )}
                </ProfileRgt>
              )}
            </ProfileWrap>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ProfileWrap>
              <ProfileLeft>
                <ProfileLeftIn>
                  <ProfileImg src={images}></ProfileImg>
                  <br></br>
                  <ProfileLink>
                    <input
                      type="file"
                      style={{
                        opacity: 0,
                        position: "fixed",
                        cursor: "pointer",
                      }}
                      onChange={(e) => {
                        picUpload(e, (res: any) => {
                          setFileBase(res.toString());
                        });
                      }}
                    />
                    Change Photo{" "}
                  </ProfileLink>
                </ProfileLeftIn>
              </ProfileLeft>
              {!isAdmin && (
                <ProfileRgt>
                  <ProfileRgtIn>
                    <ProfileRgtHead>
                      Your current plan is:
                      <ProfileRgtHeadSpan>Basic</ProfileRgtHeadSpan>
                    </ProfileRgtHead>
                    <PlanList>
                      <PlanListLi>
                        <PlanCircle>
                          <Download
                            style={{
                              fontSize: "43px",
                              paddingTop: "14px",
                              height: "60px",
                              width: "60px",
                            }}
                          />
                        </PlanCircle>
                        <PlanListLiSpan>0 credit(s) left</PlanListLiSpan>
                      </PlanListLi>
                      <PlanListLi>
                        <PlanCircle>
                          <PlayArrowIcon
                            style={{ fontSize: "53px", paddingTop: "23px" }}
                          />
                        </PlanCircle>
                        <PlanListLiSpan>0 video credit(s) left</PlanListLiSpan>
                      </PlanListLi>
                      <PlanListLi>
                        <PlanDoneArrow>
                          <DoneIcon
                            style={{ fontSize: "53px", paddingTop: "23px" }}
                          />
                        </PlanDoneArrow>
                      </PlanListLi>
                    </PlanList>
                    <ProfileRgtHead>
                      Upgrade your account and get...
                    </ProfileRgtHead>
                    <PlanList>
                      <PlanListLi>
                        <PlanCircle>
                          <Download
                            style={{
                              fontSize: "43px",
                              paddingTop: "14px",
                              height: "60px",
                              width: "60px",
                            }}
                          />
                        </PlanCircle>
                        <PlanListLiSpan>60 credit(s)</PlanListLiSpan>
                      </PlanListLi>
                      <PlanListLi>
                        <PlanCircle>
                          <PlayArrowIcon
                            style={{
                              fontSize: "43px",
                              paddingTop: "14px",
                              height: "60px",
                              width: "60px",
                            }}
                          />
                        </PlanCircle>
                        <PlanListLiSpan>0 video credit(s)</PlanListLiSpan>
                      </PlanListLi>
                      <PlanListLi>
                        <PlanUpgrade onClick={togglePopup}>Upgrade</PlanUpgrade>
                        {isOpen && (
                          <UpgradePayemntPopUp handleClose={togglePopup} />
                        )}
                      </PlanListLi>
                    </PlanList>
                  </ProfileRgtIn>
                </ProfileRgt>
              )}
              {isAdmin && (
                <ProfileRgt>
                  <ProfileRgtIn>
                    <PlanList>
                      <PlanListLi>
                        <PlanCircleAdmin>
                          <Download
                            style={{
                              fontSize: "43px",
                              paddingTop: "14px",
                              height: "60px",
                              width: "60px",
                            }}
                          />
                        </PlanCircleAdmin>
                        <PlanListLiSpan>
                          {JSON.parse(userData).limits.credits} credit(s) left
                        </PlanListLiSpan>
                      </PlanListLi>
                      <PlanListLi>
                        <PlanCircleAdmin>
                          <PlayArrowIcon
                            style={{ fontSize: "53px", paddingTop: "23px" }}
                          />
                        </PlanCircleAdmin>
                        <PlanListLiSpan>
                          {JSON.parse(userData).limits.videoCredits} video
                          credit(s) left
                        </PlanListLiSpan>
                      </PlanListLi>
                      <PlanListLi>
                        <PlanDoneArrow>
                          <DoneIcon
                            style={{ fontSize: "53px", paddingTop: "23px" }}
                          />
                        </PlanDoneArrow>
                      </PlanListLi>
                    </PlanList>
                  </ProfileRgtIn>
                </ProfileRgt>
              )}
            </ProfileWrap>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ProfileWrap>
              <ProfileLeft>
                <ProfileLeftIn>
                  <ProfileImg src={images}></ProfileImg>
                  <br></br>
                  <ProfileLink>
                    <input
                      type="file"
                      style={{
                        opacity: 0,
                        position: "fixed",
                        cursor: "pointer",
                      }}
                      onChange={(e) => {
                        picUpload(e, (res: any) => {
                          setFileBase(res.toString());
                        });
                      }}
                    />
                    Change Photo{" "}
                  </ProfileLink>
                </ProfileLeftIn>
              </ProfileLeft>
              <ProfileRgt>
                <ProfileRgtIn>
                  <ProfileRgtHead>Change Password</ProfileRgtHead>
                  <ProfileRgtTop>
                    <FormListUL>
                      <FormListULList>
                        <TextField
                          className={classes.password}
                          style={{
                            fontSize: "10px",
                            color: "#757575",
                            width: "300px",
                            height: "50px",
                            fontFamily: "Lato, sans-serif",
                          }}
                          label="Current Password"
                          variant="outlined"
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          type="password"
                        />
                      </FormListULList>
                      <FormListULList>
                        <TextField
                          className={classes.password}
                          style={{
                            fontSize: "14px",
                            color: "#757575",
                            width: "300px",
                            height: "50px",
                            fontFamily: "Lato, sans-serif",
                          }}
                          id="outlined-basic"
                          label="New Password"
                          variant="outlined"
                          onChange={(e) => setNewPassword(e.target.value)}
                          type="password"
                        />
                      </FormListULList>
                      <ConfirmBtn
                        variant="contained"
                        onClick={handleChangePassword}
                      >
                        Confirm
                      </ConfirmBtn>
                    </FormListUL>
                  </ProfileRgtTop>
                </ProfileRgtIn>
              </ProfileRgt>
            </ProfileWrap>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <ProfileWrap>
              <ProfileLeft>
                <ProfileLeftIn>
                  <ProfileImg src={images}></ProfileImg>
                  <br></br>
                  <ProfileLink>
                    <input
                      type="file"
                      style={{
                        opacity: 0,
                        position: "fixed",
                        cursor: "pointer",
                      }}
                      onChange={(e) => {
                        picUpload(e, (res: any) => {
                          setFileBase(res.toString());
                        });
                      }}
                    />
                    Change Photo{" "}
                  </ProfileLink>
                </ProfileLeftIn>
              </ProfileLeft>

              <ProfileRgt>
                <ProfileRgtIn>
                  <ProfileRgtHead>Billing</ProfileRgtHead>

                  <ProfileRgtTop>
                    {isPaid && (
                      <CardDetails>
                        <CardDetailsOne>
                          <CardLabelOne>Card Type</CardLabelOne>
                          <ImgLogo />
                        </CardDetailsOne>
                        <CardDetailsTwo>
                          <CardLabelTwo>Last Digits</CardLabelTwo>
                          <span style={{ fontSize: "16px", color: "#757575" }}>
                            ...{profileData.GET_users_me.stripeCardInfo.last4}
                          </span>
                        </CardDetailsTwo>
                        <CardDetailsThree>
                          <CardLabelThree>Expiry Date</CardLabelThree>
                          <span style={{ fontSize: "16px", color: "#757575" }}>
                            {/* {profileData.GET_users_me.stripeCardInfo.exp_month}/
                            {profileData.GET_users_me.stripeCardInfo.exp_year} */}
                            {dateYear}
                          </span>
                        </CardDetailsThree>
                        <PaymentDetails
                          onClick={() => setIsAddCard(!isAddCard)}
                        >
                          Edit Payment Details
                        </PaymentDetails>
                      </CardDetails>
                    )}
                    {!isPaid && (
                      <BillingText>
                        None!{" "}
                        <BillingTextSpan>
                          You are using Design Wizard for free!
                        </BillingTextSpan>
                      </BillingText>
                    )}
                  </ProfileRgtTop>

                  <ProfileRgtHead>Subscription History</ProfileRgtHead>
                  <ProfileRgtTop>
                    <BillingText>You have no transactions yet.</BillingText>
                  </ProfileRgtTop>
                </ProfileRgtIn>
              </ProfileRgt>
            </ProfileWrap>
          </TabPanel>
          <TabPanel value={value} index={4}>
            <ProfileWrap>
              <ProfileLeft>
                <ProfileLeftIn>
                  <ProfileImg src={images}></ProfileImg>
                  <br></br>
                  <ProfileLink>
                    <input
                      type="file"
                      style={{
                        cursor: "pointer",
                        opacity: 0,
                        position: "fixed",
                      }}
                      onChange={(e) => {
                        picUpload(e, (res: any) => {
                          setFileBase(res.toString());
                        });
                      }}
                    />
                    Change Photo{" "}
                  </ProfileLink>
                </ProfileLeftIn>
              </ProfileLeft>
              <ProfileRgt>
                <ProfileRgtIn>
                  <ProfileRgtHead>Promo Code</ProfileRgtHead>
                  <ProfileRgtTop>
                    <TextField
                      error={promo.length < 1}
                      id="outlined-error-helper-text"
                      helperText="Required"
                      style={{
                        fontSize: "14px",
                        color: "#000000",
                        width: "190px",
                        fontFamily: '"Lato" "sans-serif"',
                      }}
                      label="Enter Promo Code"
                      variant="outlined"
                      onChange={(e) => setHandlePromo(e.target.value)}
                    />
                    {/* <BootstrapButton onClick={handlePromoCode}>
                  Confirm
                </BootstrapButton> */}
                    <SignUp onClick={handlePromoCode}>Confirm</SignUp>
                  </ProfileRgtTop>
                </ProfileRgtIn>
              </ProfileRgt>
            </ProfileWrap>
          </TabPanel>
        </div>
      </AddMoreSlideArea>
    </ContentSection>
  );
}
