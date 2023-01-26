import React from "react";
import styled from "styled-components";
import { ReactComponent as D1Logo } from "../assets/svg/New folder/designwizard.svg";
import { ReactComponent as D2Logo } from "../assets/svg/New folder/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const MainDiv = styled.div`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CloseAccount = styled.div`
  color: #592e6f;
  width: 500px;
  margin: 150px auto 0;
  text-align: center;
`;

const LogoDiv = styled.div`
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: solid 1px #bebec3;
  display: flex;
`;

const CryDiv = styled.div`
  margin-bottom: 20px;
  height: 180px;
  background-image: url(./cry.png);
  background-repeat: no-repeat;
  background-position: center;
`;

const CryH2 = styled.h2`
  color: #592e6f;
`;

const CryPara = styled.p`
  margin-top: 0;
  margin-bottom: 1rem;
`;

const CanceleBtn = styled.div`
  cursor: pointer;
  border: 0.5px solid #592e6f;
  display: inline-block;
  text-align: center;
  font-size: 16px;
  padding: 9px 30px;
`;

const CloseBtn = styled.div`
  cursor: pointer;
  border: 0.5px solid #592e6f;
  display: inline-block;
  text-align: center;
  font-size: 16px;
  padding: 9px 30px;
  background-color: #592e6f;
  color: white;
  margin-left: 12px;
`;

export const DeleteAccount = () => {
  let txt = window.location.href;
  const handleAccClose = async (e: any) => {
    e.preventDefault();
    await axios
      .post(`https://api.dwiz.io/api/users/closeAccount?${txt.split("?")[1]}`)
      .then((res: any) => {
        if (res) {
          toast.success("Account Deleted");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("userId");
          localStorage.removeItem("email");
          setTimeout(() => {
            window.location.href = "https://app.dwiz.io";
          }, 3000);
        } else {
          toast.error("Something went Wrong");
        }
      });
  };
  const handleCancel = () => {
    window.location.href = "https://app.dwiz.io";
  };
  return (
    <MainDiv>
      <ToastContainer position="top-center" />
      <CloseAccount>
        <LogoDiv>
          <D2Logo
            style={{
              overflow: "hidden",
              verticalAlign: "middle",
              height: "100px",
            }}
          />
          <D1Logo
            style={{
              overflow: "hidden",
              verticalAlign: "middle",
              marginTop: "20px",
            }}
          />
        </LogoDiv>
        <div>
          <CryDiv></CryDiv>
          <CryH2>We're sad to see you go.</CryH2>
          <CryPara>
            Please click on the "close account" button below to confirm.
          </CryPara>
          <CanceleBtn onClick={handleCancel}>CANCEL</CanceleBtn>
          <CloseBtn onClick={handleAccClose}>CLOSE ACCOUNT</CloseBtn>
        </div>
      </CloseAccount>
    </MainDiv>
  );
};
