import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/svg/logo.svg";
import { Link } from "react-router-dom";

const Main = styled.div`
  position: "absolute";
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  @media only screen and (max-width: 479px),
    only screen and (min-width: 479px) and (max-width: 959px) {
    overflow-y: auto;
  }
`;
const MobileRegistration = styled.div`
  width: 100%;
  height: 100%;
  background-color: #343e63;
`;
const MobileRegistrationContent = styled.div`
  background-color: #343e63;
  width: 100%;
  min-width: 520px;
  padding: 30px 10px;
  text-align: center;
  font-size: 16px;
  font-family: "Lato", sans-serif !important;
  @media only screen and (max-width: 479px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    min-width: 300px;
  }
`;
const IconDIv = styled.div`
  display: inline-block;
  width: 100px;
  height: 147px;
  margin: 10px 0 30px 0;
  color: #fbfbff;
  @media only screen and (max-width: 479px) {
    width: 100px;
    height: 120px;
  }
`;
const VideoDiv = styled.div`
  margin: 30px 0;
  display: block;
  //width: 450px;
  //height: 281px;
`;

const Msg = styled.p`
  max-width: 450px;
  margin: auto;
  color: #fbfbff;
`;

const LinkTag = styled(Link)`
  max-width: 450px;
  margin: auto;
  color: #fbfbff;
  text-decoration: underline;
`;
export const PageResponsiveMsg = () => {
  return (
    <Main>
      <MobileRegistration>
        <MobileRegistrationContent>
          <IconDIv>
            <Logo />
          </IconDIv>
          <Msg>
            {" "}
            For the best experience of DesignWizard please log in to your
            account on a PC or Laptop.
          </Msg>

          <VideoDiv>
            <iframe
              src="https://www.youtube.com/embed/W1VMVboz0xY?rel=0&showinfo=0"
              title="video"
              allow="autoplay; encrypted-media"
            />
          </VideoDiv>
          <LinkTag to="https://www.designwizard.com/">
            Back to DesignWizard
          </LinkTag>
        </MobileRegistrationContent>
      </MobileRegistration>
    </Main>
  );
};
