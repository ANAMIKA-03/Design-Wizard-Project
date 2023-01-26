import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { signUp } from "../../../lib/contexts/Queries";
import TextField from "@material-ui/core/TextField";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useHistory, Link } from "react-router-dom";
import google from "../../../assets/facebook.png";
import { ReactComponent as LogoWord } from "../../../assets/svg/designwizard.svg";
import { ReactComponent as MainImage } from "../../../assets/svg/logo.svg";
import ReCAPTCHA from "react-google-recaptcha";
//import { GoogleLogin } from "react-google-login";
import { ToastContainer, toast } from "react-toastify";
import { ReactComponent as GoogleIcon } from "../../../assets/svg/googleIcon.svg";
import { display, style } from "@mui/system";
import { motion } from "framer-motion";
import { Cookies } from "../../../components/layout/private/Cookies";

const SignInWrap = styled.div`
  display: flex;
`;
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
  padding: 172px 20px 30px;
  margin: auto;
  width: 397px;
  height: 100%;
`;

const SignInImg = styled.img`
  width: 100%;
  margin: auto;
  display: block;
  margin-top: 40px;
  width: 363px;
`;

const SignInRight = styled.div`
  flex: 1;
  position: relative;
  background-color: #fbfbff;
  overflow-y: scroll;
  height: 100%;
`;

const SignInRightIn = styled.div`
  margin: auto;
  width: 355px;
  height: 575px;
  padding: 20px 20px 30px;
  height: 100%;
`;

const SignInForm = styled.div``;

const SignInFormUL = styled.ul`
  padding: 0;
  list-style: none;
  margin-bottom: 15px;
`;

const SignInFormList = styled.li`
  margin-bottom: 1rem;
  margin-bottom: 30px;
`;

const SignInFormlable = styled.label`
  font-size: 14px;
`;

// const ForgotPass = styled.div`
//   cursor: pointer;
//   text-align: right;
//   border: none;
//   font-size: 12px;
//   font-weight: bold;
//   background-color: transparent;
//   color: #2d3559;
// `;

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
  margin: 0 auto;
  list-style: none;
  text-align: center;
`;

const SocialList = styled.li`
  display: inline-block;
  cursor: pointer;
  width: 171px;
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

// const AccountTextTwoSpan = styled.span`
//   color: #35dad3;
//   cursor: pointer;
// `;

const TermsText = styled.div`
  font-size: 10px;
  color: #2d3559;
`;

const TermsTextSpan = styled.span`
  color: #2d3559;
  cursor: pointer;
  text-decoration: underline;
`;

const GoogleBtn = styled.div`
  width: 160px;
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
  margin-top: 6px;
`;

const Signup = styled.div`
  margin-bottom: 30px;
  font-weight: bold !important;
  text-align: center;
  font-size: 1.3em;
  color: #2d3559;
  line-height: 1.2;
  height: 66px;
  width: 355px;
  line-height: 1.2;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 7px;
  padding-top: 30px;
`;
const FooterText = styled.text`
  color: #232428;
  font-size: 11.2px;
  opacity: 0.3;
  margin-left: 50px;
`;

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

const SignUp = () => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isverified, setisVerified] = useState(false);
  const [captchVerified, setCaptchVerified] = useState(false);
  const [nameisverified, setNameisverified] = useState(false);
  const [emailisverified, setEmailisverified] = useState(false);
  const [passwordisverified, setPasswordisverified] = useState(false);
  const [isSet, setIsSet] = useState(false);
  const [signUpUser, SIgnUp] = useMutation(signUp, {
    onError: (err) =>
      err.stack?.includes("Email already exists")
        ? toast.error("Email already exists")
        : toast.error("something went wrong"),
  });
  let history = useHistory();
  const handleSignUp = async (e: any) => {
    e.preventDefault();
    if (!name) {
      setNameisverified(true);
      return;
    }
    if (!email) {
      setEmailisverified(true);
      return;
    }
    if (password.length < 5) {
      setPasswordisverified(true);
      return;
    }
    if (!isverified) {
      setCaptchVerified(true);
      return;
    }

    if (name && email && password && isverified) {
      const data = await signUpUser({
        variables: {
          input: `{\"name\":\"${name}\",\"email\":\"${email}\",\"password\":\"${password}\",\"promoCode\":\"\",\"terms\":true,\"marketingConsent\":true}`,
        },
      });
      if (SIgnUp.loading) return <>Loading...</>;
      if (data) {
        console.log(SIgnUp.data);
        history.push("/");
      }
    }
  };
  function onChange(value: any) {
    console.log("Captcha value:", value);
    if (value) {
      setisVerified(true);
    }
  }

  useEffect(() => {
    if (name) {
      setNameisverified(false);
    }
  }, [name]);

  useEffect(() => {
    if (email) {
      setEmailisverified(false);
    }
  }, [email]);

  useEffect(() => {
    if (isverified) {
      setCaptchVerified(false);
    }
  }, [isverified]);

  useEffect(() => {
    if (password.length > 5) {
      setPasswordisverified(false);
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
        <SignInRight style={{ height: "100%" }}>
          <AccountText>
            Already have an account?{" "}
            <AccountTextSpan>
              <Link to="/" style={{ textDecoration: "none", color: "#35dad3" }}>
                Log In
              </Link>
            </AccountTextSpan>
          </AccountText>
          <motion.div
            initial={{ y: 500 }}
            animate={{ y: 0 }}
            transition={{ duration: 1 }}
          >
            <Signup>
              <h2 style={{ marginTop: "0", marginBottom: "-1px" }}>
                Start designing for free!
              </h2>
              <p
                style={{
                  fontSize: "14px",
                  marginTop: "7px",
                  marginBottom: "1rem",
                }}
              >
                Join our Basic plan and create your own design today.
              </p>
            </Signup>
            <SignInRightIn>
              <WelcomeText>Create an account</WelcomeText>
              <SocialUI>
                <SocialList>
                  <GoogleBtn
                    onClick={() =>
                      (window.location.href =
                        "https://api.dwiz.io/auth/google?login=false")
                    }
                  >
                    <GoogleIcon
                      style={{
                        backgroundColor: "white",
                        borderRadius: "50%",
                        marginTop: "3px",
                        marginLeft: "9px",
                      }}
                    />
                    <Googletext>Sign up with Google</Googletext>
                  </GoogleBtn>
                  {/* <GoogleLogin
                clientId={googleClientID}
                onSuccess={handleSuccessfulLogin}
                onFailure={handleFailureLogin}
              /> */}
                  {/* <SocialGoogle> */}
                  {/* <SocialImg src={fb} />{" "} */}
                  {/* <SocialListSpan>Login with Google</SocialListSpan> */}
                  {/* </SocialGoogle> */}
                </SocialList>
                <SocialList>
                  <SocialFacebook
                    onClick={() =>
                      (window.location.href =
                        "https://api.dwiz.io/auth/facebook?login=false")
                    }
                  >
                    {/* <FacebookLogin appId="265529305571311" autoLoad={true} onClick={handleClick} callback={responceFb}/> */}
                    <SocialImg src={google} />{" "}
                    <SocialListSpan>Sign up with Facebook</SocialListSpan>
                  </SocialFacebook>
                </SocialList>
              </SocialUI>
              <LoginText>Or sign up with email</LoginText>
              <SignInForm>
                <SignInFormUL>
                  <SignInFormList>
                    <SignInFormlable>Name</SignInFormlable>
                    <TextField
                      error={nameisverified}
                      helperText={nameisverified && "Name is Required"}
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
                      onChange={(e) => setName(e.target.value)}
                      id="outlined-basic, outlined-error-helper-text"
                    />
                  </SignInFormList>
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
                      onChange={(e) => setEmail(e.target.value)}
                      id="outlined-basic, outlined-error-helper-text"
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
                        height: "24px",
                      }}
                      className={classes.root}
                      onChange={(e) => setPassword(e.target.value)}
                      id="outlined-basic, outlined-error-helper-text"
                      type="password"
                    />
                  </SignInFormList>
                  <ReCAPTCHA
                    sitekey="6Lf0mzceAAAAAHKchMmQy0qPtdX-o3TXHNRf2TEW"
                    onChange={onChange}
                  />
                  {captchVerified && <p>Verify with captcha</p>}
                </SignInFormUL>
                <BootstrapButton onClick={(e: any) => handleSignUp(e)}>
                  {" "}
                  SIGN UP{" "}
                </BootstrapButton>
                <AccountTextTow>
                  Already have an account?
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "#35dad3" }}
                  >
                    Log In
                  </Link>
                </AccountTextTow>
                <TermsText>
                  By creating an account, I have read and agreed to Design
                  Wizard's{" "}
                  <TermsTextSpan
                    onClick={() =>
                      window.open(
                        "https://www.designwizard.com/terms-conditions/"
                      )
                    }
                  >
                    terms of use{" "}
                  </TermsTextSpan>
                  &{" "}
                  <TermsTextSpan
                    onClick={() =>
                      window.open("https://www.designwizard.com/privacy/")
                    }
                  >
                    Privacy Policy.
                  </TermsTextSpan>
                  <br />
                  <br />
                  <br />
                  <FooterText>
                    Copyright © 2022 Wavebreak Media. All rights reserved.
                  </FooterText>
                </TermsText>
              </SignInForm>
            </SignInRightIn>
          </motion.div>
        </SignInRight>
      </SignInWrap>
    </>
  );
};
// export default withRouter(PublicHome);
export default SignUp;
