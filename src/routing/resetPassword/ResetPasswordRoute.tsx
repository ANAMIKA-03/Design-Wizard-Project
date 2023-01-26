import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { resetPasswordMailApi } from "../../lib/contexts/Queries";
import { ReactComponent as Logo } from "../../assets/svg/resetpassword/logo.svg";
import { ReactComponent as DesignLogo } from "../../assets/svg/resetpassword/designwizard.svg";
import { ToastContainer, toast } from "react-toastify";
// ***Styled Components

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
  background-color: #343e63;
`;

const MainBox = styled.div`
  width: 320px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  display: block;
  text-align: center;
  opacity: 1;
  z-index: 2;
  visibility: visible;
  transition: opacity 1s ease-in-out;
  height: 490px;
`;

const InnerWrapper = styled.div`
  width: 100%;
  height: 284px;
  padding: 20px;
`;

const Header = styled.header`
  color: #fbfbff;
  text-align: center;
`;
const Section = styled.section`
  display: block;
`;

const Footer = styled.footer`
  position: absolute;
  bottom: -35px;
  display: block;
`;

const LogoWrapper = styled.div`
  height: 85px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const NewPassword = styled.h2`
  font-size: 1.25em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  font-weight: 500;
  line-height: 1.2;
`;

const Group = styled.div`
  width: 100%;
  padding: 10px 0;
  display: inline-block;
  text-align: left;
`;

const Labels = styled.label`
  font-size: 14px;
  margin-bottom: 2px;
  color: #fbfbff;
  text-align: left;
  width: 100%;
`;

const Inputs = styled.input`
  background-color: #e6e6e8 !important;
  height: 40px;
  color: #444549;
  box-shadow: none;
  border: none;
  margin: 7px 0 !important;
  position: relative;
  flex: 1 1 auto;
  width: 1%;
  width: 100%;
  border-radius: 5px;
`;

const BtnBox = styled.div`
  width: 100%;
  margin: 14px 0 15px 0;
  display: inline-block;
`;

const ResetBtn = styled.button`
  height: 50px;
  font-weight: bold;
  color: #fbfbff !important;
  outline: none !important;
  border: 1px solid #2fcba9 !important;
  padding: 7px;
  background-color: #2fcba9;
  transition: border 0.3s ease, background-color 0.3s ease;
  background-image: none !important;
  min-height: 50px;
  min-width: 125px;
  width: 100%;
  position: relative;
  overflow: hidden;
  z-index: 1 !important;
  border-radius: 5px;
  font-size: 20px;
  cursor: pointer;
`;

const FooterSpan = styled.span`
  color: #e6e6e8;
  font-size: 0.7em;
  text-align: center;
`;

const ErrorSpan = styled.span`
  color: red;
`;
export const ResetPassword = () => {
  let tokenUrl = window.location.href;
  let access_token = tokenUrl.split("access_token=")[1];
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [check, setCheck] = useState(false);
  const [resetPassword] = useMutation(resetPasswordMailApi);

  useEffect(() => {
    if (!password || !confirm) {
      return;
    }
    if (password && confirm) {
      handleSubmit();
    }
  }, [check]);

  const handleSubmit = async () => {
    if (password !== confirm) {
      console.log("error");
      toast.error("Passwords Do not match");
      return;
    }
    await resetPassword({
      variables: {
        token: access_token,
        input: JSON.stringify({
          confirmation: confirm,
          password: password,
        }),
      },
    }).then((res: any) => {
      if (res) {
        toast.success("Password Changed Successfully");
      } else {
        toast.error("Something went wrong");
      }
    });
  };
  return (
    <>
      <MainDiv>
        <ToastContainer position="top-center" />
        <MainBox>
          <InnerWrapper>
            <Header>
              <LogoWrapper>
                <Logo />
                <DesignLogo />
              </LogoWrapper>
              <NewPassword>New Password</NewPassword>
            </Header>
            <Section>
              <form>
                <Group>
                  <Labels>Type your Password</Labels>
                  <br />
                  <Inputs
                    type="password"
                    placeholder="Type your password"
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                  />
                  {check && password.length < 1 && (
                    <ErrorSpan>*This Field is required</ErrorSpan>
                  )}
                </Group>
                <Group>
                  <Labels>Repeat your Password</Labels>
                  <br />
                  <Inputs
                    type="password"
                    placeholder="Repeat your Password"
                    value={confirm}
                    onChange={(e: any) => setConfirm(e.target.value)}
                  />
                  {check && confirm.length < 1 && (
                    <ErrorSpan>*This Field is required</ErrorSpan>
                  )}
                </Group>
                <BtnBox>
                  <ResetBtn
                    onClick={(e: any) => {
                      e.preventDefault();
                      setCheck(!check);
                    }}
                  >
                    RESET
                  </ResetBtn>
                </BtnBox>
              </form>
            </Section>
            <Footer>
              <FooterSpan>
                Copyright © 2022 Wavebreak Media. All rights reserved.
              </FooterSpan>
            </Footer>
          </InnerWrapper>
        </MainBox>
      </MainDiv>
      <MainDiv></MainDiv>
    </>
  );
};
