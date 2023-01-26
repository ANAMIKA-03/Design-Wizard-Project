import React from "react";
import styled from "styled-components";
import { ReactComponent as LogoWord } from "../assets/svg/designwizard.svg";
import { ReactComponent as Logo } from "../assets/svg/logo.svg";
import { confirm_Email } from "../lib/contexts/Queries";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

const MainDiv1 = styled.div`
  max-height: 0;
  overflow: hidden;
  transition: max-height 1s;
  display: block;
  font-size: 16px;
`;
const MainDiv2 = styled.div`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-image: -webkit-linear-gradient(
    83deg,
    #455b98 0,
    #2d3559 43%,
    #11243b 100%
  );
  font-family: "Lato", sans-serif !important;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: left;
`;
const MainDiv3 = styled.div`
  color: #e6e6e8;
  width: 680px;
  margin: 32px auto 0;
  text-align: center;
`;
const LogoWrapper = styled.div`
  height: 85px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: #e6e6e8;
  width: 680px;
  margin: 150px auto 0;
  text-align: center;
`;
const Header1 = styled.span`
  color: #2fcba9;
  margin-bottom: 20px;
  font-weight: 500;
  line-height: 1.2;
  margin-top: 0;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  text-align: center;
  font-family: "Lato", sans-serif !important;
`;
const Header2 = styled.span`
  color: #2fcba9;
  margin-bottom: 20px;
  font-size: 2rem;
  font-weight: 500;
  line-height: 1.2;
  margin-top: 0;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
`;
const Circle = styled.div`
  background-color: #2fcba9;
  padding: 0;
  margin: 0;
  width: 30px !important;
  height: 30px !important;
  outline: none;
  -webkit-border-radius: 30px;
  display: inline-block;
  position: relative;
  text-align: center;
`;
const ButtonContainer = styled.div`
  margin-top: 30px;
  width: 150px;
  cursor: pointer;
  display: inline-block;
  margin-left: 15px;
  color: #e6e6e8;
`;
const Button = styled.button`
  color: #fbfbff !important;
  outline: none !important;
  border: 1px solid #2fc6c0 !important;
  padding: 7px;
  background-color: #2fc6c0;
  background-image: linear-gradient(30deg, #208884, #2ab1ac, #3dcbd1, #67b9db);
  min-height: 50px;
  -webkit-appearance: button;
  min-width: 125px;
  border-radius: 3px;
  width: 100%;
  position: relative;
  overflow: hidden;
  z-index: 1 !important;
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  &:hover {
    background-color: #1b7470 !important;
    color: #fbfbff !important;
    border-color: #1b7470 !important;
    border: 1px solid #2fc6c0 !important;
  }
`;
const ButtonSpan = styled.span`
  text-align: center;
  padding-left: 0;
  width: 100%;
  line-height: 30px;
  margin-left: 5px;
  display: inline-block;
  vertical-align: middle;
  z-index: 22;
  color: #fbfbff !important;
  outline: none !important;
  border: 0;
  padding: 7px;
  background-color: #2fc6c0;
  background-image: linear-gradient(30deg, #208884, #2ab1ac, #3dcbd1, #67b9db);
  transition: border 0.3s ease, background-color 0.3s ease;
`;

export const EmailVerified = () => {
  const [confirmEmail, confirmEmaildata] = useMutation(confirm_Email);
  const history = useHistory();

  React.useEffect(() => {
    sendConfirmEmail();
  }, []);

  const sendConfirmEmail = async () => {
    let location = window.location.href;
    let uid = location.split("uid=")[1].split("&")[0];
    let tok = location.split("uid=")[1].split("token=")[1];
    const data = await confirmEmail({
      variables: {
        uid: uid,
        token: tok,
      },
    });
    console.log(data);
  };

  const handleStartOnClick = () => {
    history.push("/choose-business");
  };

  return (
    <>
      <MainDiv1>
        <MainDiv2>
          <MainDiv3>
            <LogoWrapper>
              <Logo
                style={{
                  color: "rgb(255, 255, 255)",
                  width: "85px",
                  height: "85px",
                }}
              />
              <LogoWord
                style={{
                  color: "rgb(255, 255, 255)",
                  width: "270px",
                  display: "inline-block",
                  marginTop: "13px",
                }}
              />
            </LogoWrapper>
            <Header1>
              <Circle></Circle>
              <Header2>Success! You have verified your account.</Header2>
            </Header1>
            <p>
              Welcome to Design Wizard! You can now start creating , sharing and
              downloading your designs!
            </p>
            <ButtonContainer>
              <Button onClick={handleStartOnClick}>
                <ButtonSpan>Start now</ButtonSpan>
              </Button>
            </ButtonContainer>
          </MainDiv3>
        </MainDiv2>
      </MainDiv1>
      ;
    </>
  );
};
