import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as LogoWord } from "../../../assets/svg/designwizard.svg";
import { ReactComponent as MainImage } from "../../../assets/svg/logo.svg";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { ReactComponent as ArrowBackIcon } from "./../../../assets/svg/arrows.svg";
import { useMutation } from "@apollo/client";
import { resetPassword } from "../../../lib/contexts/Queries";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const ForgotPassWrap = styled.div`
  background-color: #343e63;
  color: #fff;
  padding: 110px 0;
  height: 100vh;
`;

const LogoWrap = styled.div`
  text-align: center;
`;

const MainLogo = styled.img`
  margin-top: 40px;
`;

const ResetPasstext = styled.h1`
  text-align: center;
  font-size: 1.28em;
  text-transform: uppercase;
  font-weight: 500;
  margin-top: 0px;
`;

const ResetFormWrap = styled.div`
  width: 320px;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 100px;
`;

const ResetFormlable = styled.label`
  font-size: 14px;
  color: #fbfbff;
  text-align: left;
  width: 100%;
  margin-left: 20px;
`;

const Returntext = styled.div`
  text-align: center;
  margin-top: 15px;
`;

const ReturntextSpan = styled.span`
  color: #fbfbff;
  font-weight: bold;
  font-size: 15px;
  display: inline-block;
  position: relative;
  cursor: pointer;
  margin-bottom: 80px;
`;

const FooterText = styled.text`
  color: "white";
  font-size: 11.2px;
  margin-left: 20px;
  opacity: 0.9;
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
    fontSize: 20.8,
    padding: "7px",
    border: "1px solid",
    lineHeight: 1.5,
    background: "#2fcba9",
    borderColor: "#2fcba9 ",
    color: "#fff",
    width: "290px",
    borderRadius: "4px",
    height: "53px",
    marginTop: "30px",
    marginLeft: "20px",
    fontFamily: "Loto, sans-serif",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#1fbc9a",
      borderColor: "#242b48",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#1fbc9a",
      borderColor: "#242b48",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  },
})(Button);

export const ForgetPassword = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [emailisverified, setEmailisverified] = useState(false);
  const [resetPass, { data: resetPassReq, loading: resetPassReqLoading }] =
    useMutation(resetPassword, {
      onError: (err) => toast.error("Email Not Found"),
    });
  const handleReset = (e: any) => {
    e.preventDefault();
    if (!email) {
      setEmailisverified(true);
      return;
    }
    console.log(email);
    resetPass({
      variables: {
        input: `{\"email\":\"${email}\"}`,
      },
    });
    if (resetPassReqLoading) return <>'loading...'</>;
    // if (loginErr) return <>`Submission error! {loginErr.message}`</>;
    if (resetPassReq) {
      toast.success(resetPassReq.POST_request_password_reset);
    }
  };

  useEffect(() => {
    if (email) {
      setEmailisverified(false);
    }
  }, [email]);

  return (
    <div>
      <ToastContainer position="top-center" />
      <ForgotPassWrap>
        <motion.div
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <LogoWrap>
            {" "}
            <MainImage
              style={{ color: "white", width: "82px", marginTop: "50px" }}
            ></MainImage>
            <LogoWord
              style={{ color: "white", width: "278px", marginBottom: "5px" }}
            ></LogoWord>
          </LogoWrap>
          <ResetPasstext>Reset password</ResetPasstext>
          <ResetFormWrap>
            <ResetFormlable>Type your email</ResetFormlable>
            <TextField
              error={emailisverified}
              helperText={emailisverified && "Email is Required"}
              style={{
                border: "1px solid #e6e6e8",
                color: "#495057",
                background: "#e6e6e8 ",
                display: "block",
                width: "266px",
                padding: "6px 12px",
                borderRadius: "4px",
                marginTop: "10px",
                marginLeft: "15px",
                maxWidth: "329px",
                height: "30px",
                fontFamily: "loto, sans-serif",
              }}
              className={classes.root}
              onChange={(e) => setEmail(e.target.value)}
              id="outlined-basic,outlined-error-helper-text"
            />
            <BootstrapButton onClick={handleReset}>
              {" "}
              Reset Password{" "}
            </BootstrapButton>
            <Returntext>
              <ReturntextSpan>
                <ArrowBackIcon
                  style={{
                    color: "#ffffff",
                    width: "20px",
                    height: "20px",
                    transform: "rotate(180deg)",
                    position: "absolute",
                    top: "4px",
                    bottom: "0",
                    right: "0",
                    left: "-135px",
                    margin: "auto",
                    display: "block",
                  }}
                ></ArrowBackIcon>{" "}
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: "#ffffff",
                    opacity: "0.9",
                    fontWeight: "bold",
                  }}
                >
                  Return to Login
                </Link>
              </ReturntextSpan>
            </Returntext>
            <FooterText>
              Copyright © 2022 Wavebreak Media. All rights reserved.
            </FooterText>
          </ResetFormWrap>
        </motion.div>
      </ForgotPassWrap>
    </div>
  );
};
