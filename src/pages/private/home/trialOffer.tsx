import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as Check } from "../../../assets/svg/checkMarkIcon.svg";
import { Link } from "react-router-dom";
import PaymentPopup from "../dashboard/payService/PaymentPopup";

const MainDiv = styled.div`
  background-color: #2d3559;
  color: #fbfbff;
  z-index: 99;
  height: 100%;
  width: 100vw;
  position: absolute;
  padding-top: 80px;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

const ImageDiv = styled.div`
  margin-top: 27px;
`;

const TextDiv = styled.div`
  padding-left: 50px;
  font-family: Arial, Helvetica, sans-serif;
  margin-top: 25px;
  width: 37%;
`;

const Heading = styled.h2`
  font-size: 2.6em;
  font-weight: 200;
  margin-top: 17px;
  margin-bottom: 8px;
  line-height: 1.2;
`;

const TextSpan = styled.span`
  width: 96%;
  font-size: 1.08em;
  display: block;
  line-height: 1.8;
`;

const ListWrapper = styled.div`
  margin: 35px 0 40px;
  color: #fbfbff;
`;

const LI = styled.li`
  font-weight: bold;
  font-size: 1.1em;
  padding: 4px 0;
  text-transform: capitalize;
`;

const StartBtn = styled.div`
  color: #fbfbff;
  min-width: 270px;
  display: inline-block;
  padding: 0 20px;
  height: 55px;
  background-color: #733cfe;
  border-radius: 10px;
  line-height: 55px;
  text-align: center;
  font-size: 1.8em;
  font-weight: bold;
  cursor: pointer;
`;

const NotNow = styled.span`
  font-size: 0.85em;
  text-decoration: underline;
  margin: 0;
  display: table;
  border: 1px solid transparent;
  transition: color 0.25s;
  padding: 9px 0;
  cursor: pointer;
  color: #fff;
`;

export const TrialOffer = () => {
  const [isPaymentPopupOpen, setIsPaymentPopupOpen] = useState(false);
  const proPlan = [
    {
      title: "60 image design downloads per month",
    },
    {
      title: "Image uploads",
    },
    {
      title: "Font uploads",
    },
    {
      title: "Free previews",
    },
    {
      title: "1GB storage",
    },
  ];
  return (
    <>
      {isPaymentPopupOpen && (
        <PaymentPopup
          isPaymentPopupOpen={isPaymentPopupOpen}
          setIsPaymentPopupOpen={setIsPaymentPopupOpen}
          paymentTitle="Pro Plan"
          paymentAmount="$9.99"
          paymentList={proPlan}
          planName="Start Pro Trial"
          isMonthlyPlan={true}
        />
      )}
      <MainDiv>
        <ContentWrapper>
          <ImageDiv>
            <img
              src="https://composer.wavebreaklabs.com/images/freeTrialOnSignup/pro-sign-up-compressor.png"
              alt=""
            />
          </ImageDiv>
          <TextDiv>
            <Heading>Try Design Wizard Pro</Heading>
            <Heading>FREE for 7 Days</Heading>
            <TextSpan>
              Create eye-catching social media posts, ads, posters, cards and
              flyers
              <br />
              in minutes. Get 7 days FREE now and then join the Pro plan for{" "}
              <span style={{ color: "#2fc6c0" }}>$9.99</span>
              <br />
              per month (ex. tax).
            </TextSpan>
            <ListWrapper>
              <ul style={{ listStyle: "none", marginLeft: "-6%" }}>
                <LI>
                  <Check style={{ marginRight: "4px" }} />
                  60 Image Design Downloads Per Month
                </LI>
                <LI>
                  <Check style={{ marginRight: "4px" }} />
                  Image Uploads
                </LI>
                <LI>
                  <Check style={{ marginRight: "4px" }} />
                  Font Uploads
                </LI>
                <LI>
                  <Check style={{ marginRight: "4px" }} />
                  Free Previews
                </LI>
                <LI>
                  <Check style={{ marginRight: "4px" }} />
                  1GB Storage
                </LI>
              </ul>
            </ListWrapper>
            <StartBtn onClick={() => setIsPaymentPopupOpen(true)}>
              Start Pro Trial
            </StartBtn>
            <Link to="/choose-business/">
              <NotNow>I don't want a pro trial,take me to basic</NotNow>
            </Link>
          </TextDiv>
        </ContentWrapper>
      </MainDiv>
      <div style={{ zIndex: 999999, backgroundColor: "#2d3559" }}></div>
    </>
  );
};
