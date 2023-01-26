import React, { useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import moment from "moment";
import { Button } from "@material-ui/core";
import styled from "styled-components";
//import PaymentPopup from "../../../pages/private/dashboard/payService/PaymentPopup";
// import myProfile from "./images/designwizard-logo.png";
import TutorialPopup from "../../../pages/private/home/tutorialPopup";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { Link, useLocation, useHistory } from "react-router-dom";
import {
  myProfile,
  DesignCounts,
  logOut,
  resendEmail,
  NotificationDetails,
} from "../../../lib/contexts/Queries";
//import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import UpgradePayemntPopUp from "../../../pages/private/home/upgradePayment";
// import AdminTutorial from "../../layout/private/AdminTutorial";
import { ReactComponent as Warning } from "../../../assets/svg/New folder/warning.svg";
// import { ReactComponent as Create } from "../../../assets/svg/New folder/create.svg";
//import { MyDesignsContext } from "./index";
import { ProfilePictureContext } from "../../../App";
import { ToastContainer, toast } from "react-toastify";
import { AdminContext } from "./index";
import { AvailableTask } from "../../../admin/AvailableTask";
import { useDispatch, useSelector } from "react-redux";
import { UserNotification } from "./userNotification";
import { NotificationPopup } from "../../../admin/NotificationPopup";

const Profile = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 30px;
`;
// const MyProfile = styled.span`
//   &:hover {
//     color: "red";
//   }
// `;
const StyledLink = styled(Link)`
  color: rgb(0, 0, 0);
  text-decoration: none;
  fontfamily: [ '"Lato"', "sans-serif  !important" ].join(",");
  &:hover {
    color: #e87855;
    background-color: #fff;
  }
`;

const StyledLinkTwo = styled(Link)`
  color: #212529;
  text-decoration: none;
  fontsize: 16px;
  fontfamily: [ '"Lato"', "sans-serif  !important" ].join(",");
  &:hover {
    color: #e87855;
    background-color: #fff;
  }
`;
const StyledLinkThree = styled.div`
  color: #212529;
  text-decoration: none;
  fontsize: 16px;
  fontfamily: [ '"Lato"', "sans-serif  !important" ].join(",");
  &:hover {
    color: #e87855;
    background-color: #fff;
  }
`;

const StyledDiv = styled.div`
  color: rgb(0, 0, 0);
  text-decoration: none;
  fontfamily: [ '"Lato"', "sans-serif  !important" ].join(",");
  &:hover {
    color: #e87855;
    background-color: #fff;
  }
`;

const ProfileHov = styled.span`
  font-size: 14.4px;
  font-family: "Lato", "sans-serif";
  &:hover {
    color: #a2acc4;
  }
`;
const DesignStyle = styled.div`
  font-size: 14.4px;
  font-family: "Lato", "sans-serif";
`;
const Activate = styled.div`
  padding: 0;
  margin-top: -8px;
  cursor: pointer;
  transition: 0.3s color ease;
  background-color: transparent !important;
`;
const Content = styled.div`
  margin-bottom: 0;
  padding: 15px 15px 15px 10px;
  background-color: #ffe08e;
  color: #444549;
  font-size: 16px;
  font-family: "Lato", sans-serif;
`;
const Para = styled.div`
  margin: 0;
  position: relative;
  padding-left: 49px;
  white-space: normal;
  font-size: 12px;
  font-family: "Lato", sans-serif;
`;
const Icon = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
`;

const NotificationBox = styled.div`
  width: 304px;
`;
const TutorialTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#ffffff",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#ffffff",
    color: "#000000",
    width: "90px",
    height: "40px",
    padding: "15px",
    fontSize: "16px",
    lineHeight: "1.5em",
    fontFamily: "lato",
    textAlign: "left",
    cursor: "pointer",
    "&:hover": {
      color: "#da96a3",
    },
  },
}));

// const AppBtn = styled.div`
//   position: absolute;
//   top: 10px;
//   left: 50%;
//   margin-left: -103px;
//   z-index: 0;
// `;
// const CreateBtn = styled.div`
//   color: #e87855;
//   border: 1px solid #858585;
//   padding: 7px;
//   background: transparent;
//   outline: none !important;
//   &: hover {
//     color: #e87855;
//     border: 1px solid #858585;
//     padding: 7px;
//     background: transparent;
//     outline: none !important;
//   }
// `;
// const CreateText = styled.div`
//     text-align: left;
//     line-height: 30px;
//     display: inline-block;
//     vertical-align: middle;
//     padding-left: 7px;
// `;
export default function AccountMenu(props: any) {
  //const myDesign = useContext(MyDesignsContext);
  const updateProfile = useContext(ProfilePictureContext);
  const admin = useContext(AdminContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isTutOpen, setIsTutOpen] = React.useState(false);
  const [showWarning, setShowWarning] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [isTask, setIsTask] = React.useState(false);
  const [logoutData] = useMutation(logOut);
  const [openPopUp, setOpenPopUp] = React.useState(false);
  const [propsDetail, setPropsDetail] = React.useState({});

  // const [isPaymentPopupOpen, setIsPaymentPopupOpen] = React.useState(false);
  // const [paymentTitle, setPaymentTitle] = React.useState("");
  // const [paymentAmount, setPaymentAmount] = React.useState("");
  // const [isMonthlyPlan, setIsMonthlyPlan] = React.useState(true);
  // const [planName, setPlanName] = React.useState("");
  // const [paymentList, setPaymentList] = React.useState(
  //   isMonthlyPlan ? [{ title: "" }] : [{ question: "", answer: "" }]
  // );

  const location: any = useLocation();
  const history = useHistory();
  const isListUpdate = useSelector((state: any) => {
    return state.isListUpdate;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    countRefetch();
    console.log("count refetch");
  }, [props.design]);
  useEffect(() => {
    profileRefetch();
  }, [updateProfile.updated]);
  useEffect(() => {
    console.log(admin);
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
    if (location.pathname !== "/dashboard/workspace") {
      setIsOpen(false);
    }
  }, [location.pathname]);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  React.useEffect(() => {
    if (isTutOpen) {
      history.push("/dashboard/workspace");
    }
  }, [isTutOpen]);
  const toggleTutPopUp = () => {
    setIsTutOpen(!isTutOpen);
  };
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

  const [resendEmailData] = useLazyQuery(resendEmail, {
    fetchPolicy: "cache-and-network",
    onCompleted: (e: any) => {
      toast.success("Email sent successfully");
    },
    onError: (e: any) => {
      toast.success("some thing went wrong");
    },
  });
  // let history = useHistory();
  const {
    data: countData,
    loading: countLoading,
    error: countError,
    refetch: countRefetch,
  } = useQuery(DesignCounts, {
    variables: {
      where: {},
      token: `${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    console.log("isListUpdate", isListUpdate);
    if (isListUpdate) {
      countRefetch();
      dispatch({
        type: "updateList",
        isListUpdate: false,
      });
    }
  }, [isListUpdate]);

  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
    refetch: profileRefetch,
  } = useQuery(myProfile, {
    variables: {
      filter: {},
      token: `${localStorage.getItem("token")}`,
    },
  });
  const {
    data: notificationData,
    loading: notificationLoading,
    error: notificationError,
    refetch: notificationRefetch,
  } = useQuery(NotificationDetails, {
    variables: {
      filter: `{}`,
      token: `${localStorage.getItem("token")}`,
    },
  });

  if (notificationLoading) return <>loading...";</>;
  if (notificationError) return <>`Error! ${notificationError.message}`</>;
  console.log("notificationdata", notificationData);
  console.log(
    moment(notificationData.GET_inAppNotifications[0].startAt)
      .add(notificationData.GET_inAppNotifications[0].durationInDays, "days")
      .diff(moment(), "days")
  );
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = (e: any) => {
    e.preventDefault();
    logoutData({
      variables: {
        token: localStorage.getItem("token"),
      },
    });
    window.location.href = "/";
    // history.push("/")
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
  if (profileLoading || countLoading) return <></>;
  // if (profileError || countError) return <></>;
  const image = profileData.GET_users_me.avatar
    ? profileData.GET_users_me.avatar
        .split("url=")[1]
        .substring(
          0,
          profileData.GET_users_me.avatar.split("url=")[1].length - 1
        ) +
      "?_=" +
      Math.random()
    : "../../User.svg";
  // for design counts data.GET_users_compositions_count.count

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          color: "#dde6ff",
          fontSize: "14",
          cursor: "pointer",
        }}
      >
        {!isAdmin && (
          <Typography
            sx={{
              minWidth: 100,
              cursor: "pointer",
              fontSize: "14px",
              marginRight: "0px",
              fontFamily: ['"Lato"', "sans-serif  !important"].join(","),
              "&:hover": {
                color: "#a2acc4",
              },
            }}
            onClick={toggleTutPopUp}
          >
            {/* <AppBtn>
            <CreateBtn>
              <Create
                style={{
                  lineHeight: " 30px",
                  verticalAlign: "middle",
                  width: "35px",
                  height: " 35px",
                  color: "white",
                }}
              />
              <CreateText>Create New Design</CreateText>
            </CreateBtn>
          </AppBtn> */}
            <DesignStyle>Tutorials</DesignStyle>
          </Typography>
        )}
        {openPopUp && (
          <NotificationPopup
            propsDetail={propsDetail}
            from="accountMenu"
            openPopUp={openPopUp}
            setOpenPopUp={setOpenPopUp}
          />
        )}

        {isAdmin && (
          <Link
            to="/dashboard/workspace/tutorials"
            style={{ textDecoration: "none", color: "#dde6ff" }}
          >
            <Link
              to="/Tutorials-admin"
              style={{ textDecoration: "none", color: "#dde6ff" }}
            >
              <TutorialTooltip title="Manage Tutorials" placement="bottom-end">
                <Typography
                  sx={{
                    minWidth: 100,
                    cursor: "pointer",
                    fontSize: "14.4px",
                    marginRight: "0px",
                    fontFamily: ['"Lato"', "sans-serif  !important"].join(","),
                    "&:hover": {
                      color: "#a2acc4",
                    },
                  }}
                  onClick={toggleTutPopUp}
                >
                  Tutorials
                </Typography>
              </TutorialTooltip>
            </Link>
          </Link>
        )}

        <Link to="/home" style={{ textDecoration: "none", color: "#dde6ff" }}>
          <Typography
            sx={{
              minWidth: 100,
              cursor: "pointer",
              fontSize: "14px",
              marginRight: "10px",
              fontFamily: [
                ['"Lato"', "sans-serif "].join(","),
                "important",
              ].join("!"),
              "&:hover": {
                color: "#a2acc4",
              },
            }}
          >
            <DesignStyle>
              <>My Designs ({countData.GET_users_compositions_count.count})</>
            </DesignStyle>
          </Typography>
        </Link>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            style={{ color: "#DDE6FF", fontSize: ".9em", cursor: "pointer" }}
          >
            <Avatar sx={{ width: 45, height: 45, marginRight: 1 }}>
              <Profile src={image} />
            </Avatar>
            <ProfileHov>{profileData.GET_users_me.name}</ProfileHov>
            <span
              className="caret"
              style={{
                marginLeft: "10px",
                border: "solid #fbfbff",
                borderWidth: "0 3px 3px 0",
                display: "inline-block",
                padding: "3px",
                transformOrigin: "3px 1px",
                transform: "rotate(45deg)",
                overflow: "visible",
              }}
            ></span>
          </IconButton>
        </Tooltip>
      </Box>

      {isTutOpen && <TutorialPopup handleClose={toggleTutPopUp} />}
      {!isAdmin && (
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              padding: "8px 18px",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
                overflow: "visible",
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
                overflow: "visible",
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <ToastContainer position="top-center" />
          {showWarning && (
            <MenuItem>
              <Activate>
                <div style={{ outline: "none", boxSizing: "border-box" }}>
                  <Content>
                    <Para>
                      <Icon>
                        <Warning
                          style={{
                            width: "46px",
                            display: "inline-block",
                            background: "no-repeat",
                            fontSize: "12px",
                            fontFamily: "Lato, sans-serif",
                          }}
                        />
                      </Icon>
                      Activate Your Account - Please <br />
                      click on the link sent to your
                      <br />
                      email address.
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
                        Resend <br />
                      </a>
                      verification email.
                    </Para>
                  </Content>
                </div>
              </Activate>
            </MenuItem>
          )}
          <Divider />
          {notificationData.GET_inAppNotifications.map((item: any) => {
            // console.log("itembody",item);
            return (
              moment(item.startAt)
                .add(item.durationInDays, "days")
                .diff(moment(), "days") > 0 && (
                <NotificationBox>
                  <UserNotification
                    name={item.name}
                    body={item.compactBody}
                    time={moment(item.startAt)
                      .add(item.durationInDays, "days")
                      .diff(moment(), "days")}
                    checkIsPopupOpen={(value: boolean, propsData: any) => {
                      setOpenPopUp(value);
                      setPropsDetail(propsData);
                      console.log("propsData", propsData);
                    }}
                  />
                </NotificationBox>
              )
            );
          })}

          <Divider />

          <MenuItem style={{ backgroundColor: "#fff" }}>
            <StyledLink
              to="/dashboard/profile"
              style={{ fontSize: "16px", fontFamily: "Lato, sans-serif" }}
            >
              My Profile
            </StyledLink>
          </MenuItem>
          <Divider />
          <MenuItem style={{ backgroundColor: "#fff" }}>
            <StyledLink
              to="/dashboard/purchase-history"
              style={{ fontSize: "16px", fontFamily: "Lato, sans-serif" }}
            >
              Purchase History
            </StyledLink>
          </MenuItem>
          <Divider />
          <MenuItem style={{ backgroundColor: "#fff" }}>
            <StyledDiv
              onClick={handleLogout}
              style={{ fontSize: "16px", fontFamily: "Lato, sans-serif" }}
            >
              Log Out
            </StyledDiv>
          </MenuItem>
          <Divider />
          <MenuItem style={{ backgroundColor: "#fff" }}>
            <Button
              variant="contained"
              size="large"
              style={{
                color: "#fbfbff",
                fontSize: "16px",
                padding: "9px 7px",
                background: "#2d3559",
                width: "148px",
                fontFamily: "Lato, sans-serif",
                textTransform: "capitalize",
              }}
              onClick={togglePopup}
            >
              Upgrade
            </Button>
          </MenuItem>
        </Menu>
      )}

      {isAdmin && (
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              padding: "10px 20px",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem style={{ backgroundColor: "#fff", padding: "8px" }}>
            <StyledLinkTwo to="/dashboard/adminNotificationsPanel">
              Notification
            </StyledLinkTwo>
          </MenuItem>
          <Divider />
          <MenuItem style={{ backgroundColor: "#fff", padding: "8px" }}>
            <StyledLink to="/dashboard/profile">My Profile</StyledLink>
          </MenuItem>
          <Divider />
          <MenuItem style={{ backgroundColor: "#fff", padding: "8px" }}>
            <StyledLinkThree onClick={props.toggleTaskPopup}>
              Available tasks for WF
            </StyledLinkThree>
          </MenuItem>
          <Divider />
          <MenuItem style={{ backgroundColor: "#fff", padding: "8px" }}>
            <StyledLink to="/dashboard/purchase-history">
              Purchase History
            </StyledLink>
          </MenuItem>
          <Divider />
          <MenuItem style={{ backgroundColor: "#fff", padding: "8px" }}>
            <StyledLinkTwo to="/dashboard/manage-users">Accounts</StyledLinkTwo>
          </MenuItem>
          <Divider />
          <MenuItem style={{ backgroundColor: "#fff", padding: "8px" }}>
            <StyledLinkTwo to="/Review-Asset">Review Assets</StyledLinkTwo>
          </MenuItem>
          <Divider />
          <MenuItem style={{ backgroundColor: "#fff", padding: "8px" }}>
            <StyledLinkTwo to="/Landing-page">Landing Pages</StyledLinkTwo>
          </MenuItem>
          <Divider />
          <MenuItem style={{ backgroundColor: "#fff", padding: "8px" }}>
            <StyledDiv onClick={handleLogout}>Log Out</StyledDiv>
          </MenuItem>
          <Divider />
          <MenuItem
            style={{ backgroundColor: "#fff", padding: "8px" }}
          ></MenuItem>
        </Menu>
      )}
      {isOpen && <UpgradePayemntPopUp handleClose={togglePopup} />}
    </React.Fragment>
  );
}
