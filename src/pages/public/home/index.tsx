import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { login } from "../../../lib/contexts/Queries";
import TextField from "@material-ui/core/TextField";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// import fb from "../../../assets/google.jpg";
import google from "../../../assets/facebook.png";
import { ReactComponent as LogoWord } from "../../../assets/svg/designwizard.svg";
import { ReactComponent as MainImage } from "../../../assets/svg/logo.svg";
import { Link } from "react-router-dom";
//import { GoogleLogin } from "react-google-login";
import { withRouter } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import FacebookLogin from "react-facebook-login"
import { ReactComponent as GoogleIcon } from "../../../assets/svg/googleIcon.svg";
import { motion } from "framer-motion";
import { isMobile } from "react-device-detect";
import { Cookies } from "../../../components/layout/private/Cookies";

const size = {
  xs: `320px`,
  sm: `756px`,
  lg: `1200px`,
};
const device = {
  xs: `(min-width: ${size.xs})`,
  sm: `(max-width: ${size.sm})`,
  lg: `(min-width: ${size.lg})`,
};

const SignInWrap = styled.div`
  display: flex;
`;

const SignInLeft = styled.div`
  flex: 1;
  position: relative;
  background-color: #2d3559;
  box-shadow: inset 0 5px 45px rgb(0 0 0 / 40%);
  @media only screen and ${device.sm} {
    display: none;
  }
`;

const SignInLeftIn = styled.div`
  text-align: center;
  margin-top: 40px;
  padding: 100px 20px 30px;
  margin: auto;
  width: 397px;
  height: 100%;
`;

const SignInImg = styled.img`
  width: 100%;
  margin: auto;
  display: block;
  margin-top: 53px;
  width: 363px;
`;

const SignInRight = styled.div`
  flex: 1;
  position: relative;
  background-color: #fbfbff;
`;

const SignInRightIn = styled(motion.div)`
  margin: auto;
  width: 355px;
  height: 575px;
  margin-top: 6px;
  padding: 20px 20px 30px;
`;

const SignInForm = styled.div``;

const SignInFormUL = styled.ul`
  padding: 0;
  margin: 0 auto;
  list-style: none;
`;

const SignInFormList = styled.li`
  margin-bottom: 1rem;
`;

const SignInFormlable = styled.label`
  font-size: 14px;
  margin-bottom: 6px;
  color: #2d3559;
  text-align: left;
  width: 100%;
  display: block;
`;

const ForgotPass = styled.div`
  cursor: pointer;
  text-align: right;
  border: none;
  font-size: 12px;
  font-weight: bold;
  background-color: transparent;
  color: #2d3559;
  height: 18px;
  padding: 6px;
`;

const AccountText = styled.div`
  text-align: right;
  font-size: 12px;
  font-weight: bold;
  padding: 20px;
  color: #2d3559;
  height: 18px;
`;

const AccountTextSpan = styled.span`
  color: #35dad3;
  cursor: pointer;
`;

const WelcomeText = styled.h1`
  color: #2d3559;
  font-size: 31.2px;
  font-weight: 900;
  text-align: center;
  margin-bottom: 30px;
  margin-top: 0px;
  width: 355px;
  height: 37px;
  margin-right: 1px;
`;

const SocialUI = styled.ul`
  padding: 0;
  list-style: none;
  text-align: left;
`;

const SocialList = styled.li`
  display: inline-block;
  cursor: pointer;
  width: 135px;
`;

// const SocialGoogle = styled.div`
//   border: 1px solid #4086f3;
//   background-color: #4086f3;
//   padding: 5px;
//   border-radius: 4px;
// `;

const SocialFacebook = styled.div`
  border: 1px solid #3d67b3;
  background-color: #3d67b3;
  padding: 5px !important;
  -webkit-border-radius: 4px;
  display: flex;
  text-align: left;
  height: 30px;
  outline: none !important;
  width: 160px;
  margin-left: 45px;
  padding: 2px;
  height: 29px;
  &:hover {
    background-color: #2f477a;
  }
`;

const SocialListSpan = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: #e6e6e8;
  padding: 5px;
  line-height: 15px;
  margin-top: 2px;
`;

const SocialImg = styled.img`
  height: 28px;
  weight: 28px;
`;

const LoginText = styled.h2`
  margin: 25px 0 10px;
  font-weight: bold;
  text-align: center;
  position: relative;
  font-size: 14px;
  color: #2d3559;
`;

const AccountTextTow = styled.div`
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  padding: 20px;
  color: #2d3559;
`;

const AccountTextTwoSpan = styled.span`
  color: #35dad3;
  cursor: pointer;
  font: 12px;
`;

const GoogleBtn = styled.div`
  width: 160px;
  text-align: left;
  background: #4086f3;
  display: flex;
  font-weight: bold;
  padding: 2px;
  height: 39px;
  -webkit-border-radius: 4px;
  &:hover {
    background-color: #4169e1;
  }
`;

const Googletext = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: #e6e6e8;
  padding: 5px;
  line-height: 15px;
  margin-left: 3px;
  margin-top: 6px;
`;

const FooterText = styled.text``;

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiInput-root": {
      width: "100%",
    },
  },
}));

const BootstrapButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "8px 21px",
    border: "1px solid",
    lineHeight: 1.5,
    background: "#2d3559",
    borderColor: "#2d3559 ",
    color: "#fff",
    width: "100%",
    borderRadius: "2px",
    height: "50px",
    fontFamily: "Loto, sans-serif",
    "&:hover": {
      backgroundColor: "#242b48",
      borderColor: "#242b48",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#242b48",
      borderColor: "#242b48",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  },
})(Button);

const googleClientID = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";
console.log("Google client ID:", googleClientID);

const PublicHome = () => {
  const classes = useStyles();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [emailisverified, setEmailisverified] = useState(false);
  const [passwordisverified, setPasswordisverified] = useState(false);
  const [isSet, setIsSet] = useState(false);
  const [loginUser, { data }] = useMutation(login, {
    onError: (err) => toast.error("login failed"),
  });
  const handleLogin = (e: any) => {
    e.preventDefault();
    if (!userName) {
      setEmailisverified(true);
      return;
    }
    if (!password) {
      setPasswordisverified(true);
      return;
    }
    loginUser({
      variables: {
        input: {
          email: userName,
          password: password,
        },
      },
    });
  };
  useEffect(() => {
    console.log(isMobile);
    if (isMobile && data) window.location.href = "/mobile-registration";
  }, [data]);
  if (data) {
    if (isMobile) {
      console.log("yes");
    }
    console.log(isMobile);
    console.log(data);
    localStorage.setItem("user", JSON.stringify(data.POST_users_login));
    localStorage.setItem(
      "email",
      JSON.stringify(data["POST_users_login"]["email"])
    );
    localStorage.setItem("token", data.POST_users_login.id);
    localStorage.setItem("userId", data.POST_users_login.userId);
    data.POST_users_login.preferences.segmentsSelectedByUser
      ? (window.location.href = "/home")
      : (window.location.href = "/trial-offer");
  }
  useEffect(() => {
    if (userName) {
      setEmailisverified(false);
    }
  }, [userName]);

  useEffect(() => {
    if (password) {
      if (password.length > 5) {
        setPasswordisverified(false);
      }
    }
  }, [password]);
  return (
    <>
      {isSet && <Cookies />}
      <SignInWrap>
        <ToastContainer position="top-center" />
        <SignInLeft>
          <SignInLeftIn>
            <MainImage style={{ color: "white", width: "80px" }}></MainImage>
            <LogoWord
              style={{ color: "white", width: "273px", marginBottom: "7px" }}
            ></LogoWord>
            <SignInImg src="https://app.designwizard.com/images/signup-login/signup-login.png" />
          </SignInLeftIn>
        </SignInLeft>
        <SignInRight>
          <AccountText>
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "#35dad3" }}
            >
              <AccountTextSpan>Sign Up</AccountTextSpan>
            </Link>
          </AccountText>
          <SignInRightIn
            initial={{ x: 500 }}
            animate={{ x: 0 }}
            exit={{ x: -500 }}
            transition={{ duration: 1 }}
          >
            <WelcomeText>Welcome back!</WelcomeText>
            <SocialUI>
              <SocialList>
                {/* <GoogleLogin
                clientId={googleClientID}
                onSuccess={handleSuccessfulLogin}
                onFailure={handleFailureLogin}
              /> */}
                <GoogleBtn
                  onClick={() =>
                    (window.location.href =
                      "https://api.dwiz.io/auth/google?login=true")
                  }
                >
                  <GoogleIcon
                    style={{
                      backgroundColor: "white",
                      borderRadius: "50%",
                      marginTop: "3px",
                      marginLeft: "13px",
                    }}
                  />
                  <Googletext>Login with Google</Googletext>
                </GoogleBtn>
                {/* <SocialGoogle> */}
                {/* <SocialImg src={fb} />{" "} */}
                {/* <SocialListSpan>Login with Google</SocialListSpan> */}
                {/* </SocialGoogle> */}
              </SocialList>
              <SocialList>
                <SocialFacebook
                  onClick={() =>
                    (window.location.href =
                      "https://api.dwiz.io/auth/facebook?login=true")
                  }
                >
                  {/* <FacebookLogin appId="265529305571311" autoLoad={true} callback={responceFb}/> */}
                  <SocialImg src={google} />{" "}
                  <SocialListSpan>Login with Facebook</SocialListSpan>
                </SocialFacebook>
              </SocialList>
            </SocialUI>
            <LoginText>Or login with email</LoginText>
            <SignInForm>
              <SignInFormUL>
                <SignInFormList>
                  <SignInFormlable>Email</SignInFormlable>
                  <TextField
                    error={emailisverified}
                    helperText={emailisverified && "Email is Required"}
                    style={{
                      border: "1px solid #e6e6e8",
                      color: "#495057",
                      background: "#e6e6e8 ",
                      display: "block",
                      padding: "6px 12px",
                      maxWidth: "329px",
                      height: "26px",
                    }}
                    className={classes.root}
                    onChange={(e) => setUserName(e.target.value)}
                    id="outlined-basic,outlined-error-helper-text"
                  />
                </SignInFormList>
                <SignInFormList>
                  <SignInFormlable>Password</SignInFormlable>
                  <TextField
                    error={passwordisverified}
                    helperText={passwordisverified && "Password Is Required"}
                    style={{
                      border: "1px solid #e6e6e8",
                      color: "#495057",
                      background: "#e6e6e8 ",
                      display: "block",
                      padding: "6px 12px",
                      maxWidth: "329px",
                      height: "26px",
                    }}
                    className={classes.root}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      e.key === "Enter" && handleLogin(e);
                    }}
                    id="outlined-basic,outlined-error-helper-text"
                    type="password"
                  />
                </SignInFormList>
                <SignInFormList>
                  <ForgotPass>
                    <Link to="/forget-password">Forgot password? </Link>
                  </ForgotPass>
                </SignInFormList>
              </SignInFormUL>
              <BootstrapButton onClick={handleLogin}> LOG IN </BootstrapButton>
              <AccountTextTow>
                Don't have an account?{" "}
                <AccountTextTwoSpan>
                  <Link
                    to="/signup"
                    style={{ textDecoration: "none", color: "#35dad3" }}
                  >
                    Sign Up
                  </Link>
                </AccountTextTwoSpan>
                <div
                  style={{
                    fontSize: "11.2px",
                    opacity: "0.4",
                    marginTop: " 130px",
                    position: "fixed",
                  }}
                >
                  Copyright © 2022 Wavebreak Media. All rights reserved.
                </div>
              </AccountTextTow>
            </SignInForm>
          </SignInRightIn>
        </SignInRight>
      </SignInWrap>
    </>
  );
};
export default withRouter(PublicHome);
