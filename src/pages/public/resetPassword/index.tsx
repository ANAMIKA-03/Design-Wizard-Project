import React, { useState } from "react";
import styled from "styled-components";
import logo from "../../../assets/designwizard-logo.png";
// import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// import { useMutation } from "@apollo/client";
// import { resetPassword } from "../../../lib/contexts/Queries";
// import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const ForgotPassWrap = styled.div`
  background-color: #343e63;
  color: #fff;
  padding: 120px 0;
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
  font-size: 1.25em;
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const ResetFormWrap = styled.div`
  width: 320px;
  margin: auto;
  margin-top: 20px;
`;

const ResetFormlable = styled.label`
  font-size: 14px;
  margin-bottom: 10px;
  color: #fbfbff;
  text-align: left;
  width: 100%;
  display: block;
`;

const BootstrapButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: "20.8px",
    padding: "8px 21px",
    border: "1px solid",
    lineHeight: 1.5,
    background: "#2fcba9",
    borderColor: "#2fcba9 ",
    color: "#fff",
    width: "100%",
    borderRadius: "4px",
    height: "50px",
    marginTop: "30px",
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

export const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const handleReset = (e: any) => {
    e.preventDefault();
    console.log(email);
  };
  return (
    <div>
      {/* <ToastContainer position="top-center" /> */}
      <ForgotPassWrap>
        <LogoWrap>
          <MainLogo src={logo} />
        </LogoWrap>
        <ResetPasstext>New password</ResetPasstext>
        <ResetFormWrap>
          <ResetFormlable>Type your Password</ResetFormlable>
          <TextField
            style={{
              border: "1px solid #e6e6e8",
              color: "#495057",
              background: "#e6e6e8 ",
              display: "block",
              width: "100%",
              padding: "4px 0",
              borderRadius: "4px",
            }}
            onChange={(e) => setEmail(e.target.value)}
            id="outlined-basic"
          />
          <br />
          <ResetFormlable>Repeat your Password</ResetFormlable>
          <TextField
            style={{
              border: "1px solid #e6e6e8",
              color: "#495057",
              background: "#e6e6e8 ",
              display: "block",
              width: "100%",
              padding: "4px 0",
              borderRadius: "4px",
            }}
            onChange={(e) => setEmail(e.target.value)}
            id="outlined-basic"
          />
          <BootstrapButton onClick={handleReset}>RESET</BootstrapButton>
        </ResetFormWrap>
      </ForgotPassWrap>
    </div>
  );
};
