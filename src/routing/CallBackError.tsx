import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SignUp = styled.div`
  margin: auto;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 45%;
  color: #fbfbff !important;
  background-color: #e87855;
  height: auto;
  padding: 15px;
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

export const LoginCallBackErr = () => {
  return (
    <div
      style={{
        margin: "auto",
      }}
    >
      <p
        style={{
          width: "100%",
          marginTop: "50%",
        }}
      >
        Oops! Looks like your email doesn't exist in our System. Please use the
        Sign Up button instead.
      </p>
      <Link to="/signup">
        <SignUp style={{ height: "auto" }}>Go to Sign Up Page</SignUp>
      </Link>
    </div>
  );
};
