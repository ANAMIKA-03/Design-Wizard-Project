import { List } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as UnlockIcon } from "../../../../assets/svg/New folder/unlockIcon.svg";
import { ReactComponent as CheckMarkIcon } from "../../../../assets/svg/New folder/checkMarkIcon.svg";
import { ReactComponent as Cross } from "../../../../assets/svg/New folder/cross.svg";
import PaymentPopup from "../payService/PaymentPopup";
const Border = styled.div`
  background-color: white;
  box-shadow: 0 0 50px 0 rgb(0 0 0 / 80%);
  -webkit-border-radius: 0;
  border: none;
  transform: none;
  box-sizing: border-box;
  outline: none;
  width: 30%;
  border: 3px solid #2d3559;
  transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;
  transform: none;
  margin-top: 75px;
  overflow: hidden;
  border-radius: 10px;
  margin-top: 75px;
  margin: auto;
`;
const PopupBox = styled.div`
  position: fixed;
  background: #00000050;
  width: 100%;
  height: 100vh;
  top: 60px;
  left: 0;
  z-index: 999;
`;
const Wrapper = styled.div`
  position: relative;
  flex: 1 1 auto;
  padding: 1rem;
`;
const InnerDiv = styled.div`
  margin-bottom: 0;
  flex: 1;
`;
const CrossBtn = styled.div`
  background: transparent;
  width: 25px;
  height: 25px;
  border-radius: 25px;
  -webkit-border-radius: 25px;
  -moz-border-radius: 25px;
  position: relative;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
  border-radius: 50%;
  z-index: 99999;
  opacity: 1;
  transition: background-color 0.25s ease;
  &: hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;
const Text = styled.div`
  display: flex;
  flex-direction: row;
`;
const InnerText = styled.div`
  font-size: 0.78em;
  margin: 0 5%;
`;
const Heading = styled.span`
  color: #2d3559;
  font-size: 2.75em;
  line-height: 1.2;
  font-weight: bold;
  display: block;
  text-align: center;
`;
const InnerHead = styled.span`
  color: #4db3a9;
`;
const TextWrapper = styled.div`
  color: #2d3559;
  width: 90%;
  margin: auto;
  margin-bottom: 20px;
`;
const ListTwo = styled.div`
  margin-right: 4px;
  vertical-align: middle;
  padding: 3px 0;
  display: flex;
  flex-direction: row;
  line-height: 0%;
`;
const Upgrade = styled.div`
  margin-top: 30px;
  font-size: 1.25em;
  letter-spacing: 1px;
  font-weight: bolder;
  text-align: center;
`;
const Button = styled.div`
  display: block;
  max-width: 100%;
  margin: auto;
  color: #fbfbff !important;
  outline: none !important;
  border: 1px solid #2d3559 !important;
  padding: 7px;
  background-color: #2d3559;
  background-image: linear-gradient(30deg, #131726, #242b48, #363b6a, #51478c);
  transition: border 0.3s ease, background-color 0.3s ease;
  background-image: none !important;
  text-transform: capitalize;
  font-size: 14px;
  line-height: 14px;
  display: block;
  margin-bottom: 2px;
  font-weight: bold;
  &: hover {
    background-color: #242b48 !important;
    color: #fbfbff !important;
    border-color: #242b48 !important;
    border: 1px solid #2d3559 !important;
  }
`;
const ButtonSpan = styled.div`
  text-align: center;
  padding-left: 0;
`;
const Unlock = styled.div`
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: left;
`;
export const UploadPopUp = (props: any) => {
  const [isPaymentPopupOpen, setIsPaymentPopupOpen] = useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);

  useEffect(() => {
    const user: any = localStorage.getItem("user");
    const userData = JSON.parse(user);
    for (let i of userData.roles) {
      if (i.name === "admin") {
        setIsAdmin(true);
      }
    }
  }, []);

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
      {!isAdmin && (
        <PopupBox>
          <Border>
            <Wrapper>
              <InnerDiv>
                <CrossBtn onClick={props.handleClose}>
                  <Cross></Cross>
                </CrossBtn>
                <Text>
                  <InnerText>
                    <Heading>
                      Unlock
                      <InnerHead> image uploads </InnerHead>
                      by upgrading to Pro
                    </Heading>
                  </InnerText>
                </Text>
                <Unlock>
                  <UnlockIcon
                    style={{
                      width: "100%",
                      height: "70px",
                      marginBottom: "30px",
                      marginTop: "30px",
                    }}
                  ></UnlockIcon>
                </Unlock>
                <TextWrapper>
                  <p style={{ marginTop: "0", marginBottom: "1rem" }}>
                    <b style={{ fontWeight: "bolder", fontSize: "22px" }}>
                      With Design Wizard Pro you get:
                    </b>
                  </p>
                  <List style={{ padding: "0" }}></List>
                  <ListTwo>
                    <CheckMarkIcon
                      style={{
                        color: "rgb(77, 179, 169)",
                        width: "30px",
                        marginTop: "20px",
                      }}
                    />
                    <h4>60 image design downloads per month.</h4>
                  </ListTwo>
                  <ListTwo>
                    <CheckMarkIcon
                      style={{
                        color: "rgb(77, 179, 169)",
                        width: "30px",
                        marginTop: "20px",
                      }}
                    />
                    <h4 style={{ color: "rgb(77, 179, 169)" }}>
                      Image uploads
                    </h4>
                  </ListTwo>
                  <ListTwo>
                    <CheckMarkIcon
                      style={{
                        color: "rgb(77, 179, 169)",
                        width: "30px",
                        marginTop: "20px",
                      }}
                    />
                    <h4>Font uploads</h4>
                  </ListTwo>
                  <ListTwo>
                    <CheckMarkIcon
                      style={{
                        color: "rgb(77, 179, 169)",
                        width: "30px",
                        marginTop: "20px",
                      }}
                    />
                    <h4>Free previews</h4>
                  </ListTwo>
                  <ListTwo>
                    <CheckMarkIcon
                      style={{
                        color: "rgb(77, 179, 169)",
                        width: "30px",
                        marginTop: "20px",
                      }}
                    />
                    <h4>1GB storage</h4>
                  </ListTwo>
                  <Upgrade>
                    <em>Try Pro free for 7 days</em>
                  </Upgrade>
                  <br />
                  <Button>
                    <ButtonSpan
                      style={{
                        fontSize: "1.5em",
                        lineHeight: "1.5em",
                        marginBottom: "0",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setIsPaymentPopupOpen(true);
                      }}
                    >
                      Start trial Now{" "}
                    </ButtonSpan>
                  </Button>
                </TextWrapper>
              </InnerDiv>
            </Wrapper>
          </Border>
        </PopupBox>
      )}
    </>
  );
};
