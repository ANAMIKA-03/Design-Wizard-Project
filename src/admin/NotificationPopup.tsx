import React, { useState, useEffect } from "react";
import styled from "styled-components";
import proGray from "../assets/svg/New folder/proGrey.png";
import Gift from "../assets/svg/New folder/gift.png";
import Clock from "../assets/svg/New folder/clock.png";
import { ReactComponent as Cross } from "../assets/svg/New folder/cross.svg";

const LeftSide = styled.div`
  margin-top: 0px;
  padding: 20px;
  flex: 1;
  overflow: hidden;
  width: 81%;
  height: 102%;
`;
const Header = styled.div`
  position: absolute;
  top: 91px;
  color: #000000;
  text-decoration: underline #fbfbff;
`;
const LeftSideContent = styled.div`
  margin: auto;
  display: block;
  height: 75%;
  width: 100% !important;
  position: relative;
  background-color: #e6e6e8;
`;
const ModalTitle = styled.div`
  position: relative;
  overflow: hidden;
  background-image: linear-gradient(
    30deg,
    #110915,
    #4b275d,
    #6e3581,
    #a544a5
  ) !important;
  text-align: left;
  font-size: 1.125em;
  line-height: 1.7;
  color: #fbfbff;
  height: 60px;
`;
const Label = styled.input`
  // display: none;
  margin: 10px 0 22px 20px;
  color: black;
  width: 100%;
  background-color: transparent;
  border: none;
  font-size: 18px;
  font-family: "Lato", sans-serif;
  &: focus {
    background-color: #d9d9dc !important;
    height: 60%;
    outline: none;
  }
`;
const InputOne = styled.div`
  margin: 15px;
  width: calc(100% - 15px);
  background-color: transparent;
  border: none;
`;
const LabelOne = styled.textarea`
  // margin: 20px 0 60px 20px;
  color: black;
  font-size: 14px;
  height: 80px;
  width: 96%;
  padding: 12px;
  font-size: 14px;
  font-family: "Lato", sans-serif;
  background: transparent;
  resize: none;
  border: none;
  &: focus {
    background-color: #d9d9dc !important;
    outline: none;
  }
`;
const Preview = styled.div`
  margin: 15px;
  position: relative;
  height: 300px;
  overflow: hidden;
`;
const Footer = styled.div`
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: end;
  justify-content: flex-end;
  padding: 0.75rem;
  border-top: 1px solid #dee2e6;
  border-bottom-right-radius: calc(0.3rem - 1px);
  border-bottom-left-radius: calc(0.3rem - 1px);
`;
const OptionWrapper = styled.div`
  display: flex;
  padding-bottom: 15px;
`;
const Option = styled.div`
  flex: 1;
  text-align: center;
  width: 200px;
`;
const OptionText = styled.div`
  display: inline-block;
  vertical-align: middle;
`;
const OptionTwo = styled.div`
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  flex: 1;
  text-align: center;
  height: 95px;
`;
const OptionDiv = styled.div`
  display: inline-block;
  vertical-align: middle;
`;
const OptionThree = styled.div`
  flex: 1;
  text-align: center;
`;
const OptionThreeDiv = styled.div`
  display: inline-block;
  vertical-align: middle;
`;
const RightSide = styled.div`
  top: 14%;
  left: 52vw;
  position: absolute;
`;
const RightSideContent = styled.div`
  position: absolute;
  top: 70%;
  width: 388px;
  padding: 15px;
  max-width: 400px;
  height: 116px;
  background-color: #e6e6e8;
  flex-direction: row;
  min-width: 22%;
  display: flex;
  margin-left: 73%;
  margin-top: -88%;
  height: 84px;
`;
const PreviewOne = styled.div`
  width: 100%;
  position: relative;
  flex: 2;
`;
const PreviewOneContent = styled.div`
  // border: 42px solid #ccc;
  width: 33%;
  margin-top: 8px;
  margin-left: 4px;
  margin-bottom: -15px;
  // margin-right: 96px;
`;
const Element = styled.div`
  flex: 3;
  margin-left: -20px;
  width: 100%;
  position: relative;
`;
const ElementHead = styled.input`
  margin: 6px 0 10px 0;
  color: black;
  font-weight: 600;
  font-size: 13px;
  background-color: transparent;
  border: none;
  width: 100%;
  &: focus {
    background-color: #d9d9dc !important;
    outline: none;
  }
`;
const ElementLabel = styled.textarea`
  margin-bottom: 3px;
  font-weight: normal;
  text-overflow: ellipsis;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-box;
  font-size: 14px;
  font-family: "Lato", sans-serif;
  line-height: 1.3;
  max-height: 2.6 em;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  resize: none;
  border: none;
  width: 100%;
  background: transparent;
  font-size: 0.85em;
  color: black;
  &: focus {
    background-color: #d9d9dc !important;
    outline: none;
  }
`;
const Para = styled.div`
  font-size: 0.75em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const UpgradeNoti = styled.div`
  text-align: center;
  margin-left: -15px;
  min-height: -7px;
  min-width: 96px;
  margin-top: 50px;
  margin-bottom: 30px;
  font-size: 14px;
  font-family: "Lato", sans-serif;
  color: #fbfbff !important;
  background-color: #e87855;
  height: 16px;
  padding: 12px 15px 22px;
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

// const hr = styled.hr`
// color:#dde6ff;
// margin-top:50px;
// `
export const NotificationPopup = (props: any) => {
  const [fulTitle, setFullTitle] = useState("");
  const [fullBody, setFullBody] = useState("");
  const [compactTitle, setCompactTitle] = useState("");
  const [compactBody, setCompactBody] = useState("");
  // const [popupData, setPopupData] = useState<any>({});
  useEffect(() => {
    if (props.otherData) {
      setFullTitle(props.otherData.fullTitle);
      setFullBody(props.otherData.fullBody);
      setCompactTitle(props.otherData.compactTitle);
      setCompactBody(props.otherData.compactBody);
    }
    console.log("props", props);
  }, [props]);

  // useEffect(() => {
  //   setFullBody(props.otherData.fullBody);
  // }, [props]);
  // useEffect(() => {
  //   setCompactTitle(props.otherData.compactTitle);
  // }, [props]);
  // useEffect(() => {
  //   setCompactBody(props.otherData.compactBody);
  //   console.log("props",props);
  // }, [props]);
  return (
    <>
      <div
        style={{
          height: "100vh",
          position: "absolute",
          marginLeft: "13%",
          top: "18px",
          left: "451px",
          zIndex: "9999",
        }}
        id="notify"
      >
        <LeftSide>
          <LeftSideContent>
            {props.from !== "accountMenu" ? (
              <ModalTitle>
                <Label
                  placeholder="notification full title"
                  onChange={(e) => {
                    setFullTitle(e.target.value);
                  }}
                  value={fulTitle}
                />

                <InputOne></InputOne>
              </ModalTitle>
            ) : (
              <ModalTitle
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div
                  style={{
                    color: "black",
                    textAlign: "center",
                    paddingTop: "15px",
                    paddingLeft: "180px",
                  }}
                >
                  {props.propsDetail.name}
                </div>
                <Cross
                  style={{
                    color: "white",
                    width: "25px",
                    height: "66px",
                    marginRight: "3px",
                    marginTop: "-14px",
                  }}
                  onClick={() => {
                    props.setOpenPopUp(false);
                  }}
                ></Cross>
              </ModalTitle>
            )}

            {props.from !== "accountMenu" ? (
              <LabelOne
                rows={5}
                placeholder="Describe Notification Body here...."
                onChange={(e) => {
                  setFullBody(e.target.value);
                }}
                value={fullBody}
              />
            ) : (
              <div
                style={{ color: "black", fontSize: "12px", padding: "30px" }}
              >
                {" "}
                {props.propsDetail.body}
              </div>
            )}

            <Preview>
              {props.otherData && props.otherData.name === "giftTime" && (
                <video
                  width="560px"
                  height="300px"
                  //  autoPlay="autoPlay"
                  loop
                  autoPlay
                >
                  <source
                    src={`https://templates.designwizard.com/339351f0-1fe7-11e9-a3ac-e1091dd0d76b.mp4`}
                    type="video/mp4"
                  />
                </video>
              )}
            </Preview>
            <Footer>
              <OptionWrapper>
                <Option>
                  <img
                    src={proGray}
                    style={{
                      marginRight: "400px",
                      verticalAlign: "middle",
                      marginLeft: "51px",
                    }}
                  />
                  <OptionText>
                    <span
                      style={{
                        marginTop: "-49px",
                        marginLeft: "113px",
                        fontWeight: " bold",
                        color: "#854f8f",
                        display: "block",
                        lineHeight: "1.2",
                        textAlign: "left",
                      }}
                    >
                      Upgrade to{" "}
                    </span>
                    <span style={{ color: " #444549", marginLeft: "102px" }}>
                      Free Trial
                    </span>
                  </OptionText>
                </Option>
                <OptionTwo>
                  <img src={Gift} />
                  <OptionDiv>
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "#854f8f",
                        display: "block",
                        lineHeight: " 1.2",
                        textAlign: "left",
                      }}
                    >
                      5 Free Videos{" "}
                    </span>
                    <span style={{ color: "#444549" }}>
                      {props.otherData && props.otherData.offersLeft} deals
                      left!
                    </span>
                  </OptionDiv>
                </OptionTwo>
                <OptionThree>
                  <img src={Clock} />
                  <OptionThreeDiv>
                    <span
                      style={{
                        color: "#f06b8e",
                        fontWeight: "bold",
                        lineHeight: "1.2",
                        textAlign: "left",
                      }}
                    >
                      {props.otherData && props.otherData.durationInDays} days
                      left
                    </span>
                    <span
                      style={{
                        color: " #444549",
                        display: " block",
                        lineHeight: "1.2",
                        textAlign: "left",
                        marginBottom: "32px",
                      }}
                    >
                      Hurry up!
                    </span>
                  </OptionThreeDiv>
                  <UpgradeNoti
                    onClick={() => {
                      props.setOpenPopUp(false);
                    }}
                  >
                    AND GET FREE VIDEOS
                  </UpgradeNoti>
                </OptionThree>
              </OptionWrapper>
            </Footer>
          </LeftSideContent>
        </LeftSide>
      </div>
      <RightSide id="rightPopup">
        <RightSideContent>
          <PreviewOne>
            <PreviewOneContent>
              {props.otherData && props.otherData.name === "giftTime" && (
                <video
                  width="126px"
                  height="71px"
                  //  autoPlay="autoPlay"
                  loop
                  autoPlay
                >
                  <source
                    src={`https://templates.designwizard.com/339351f0-1fe7-11e9-a3ac-e1091dd0d76b.mp4`}
                    type="video/mp4"
                  />
                </video>
              )}
            </PreviewOneContent>
          </PreviewOne>
          <Element>
            <ElementHead
              placeholder="notification compact title"
              onChange={(e) => {
                setCompactTitle(e.target.value);
              }}
              value={compactTitle}
            />
            <ElementLabel
              placeholder="Describe Notification Compact Body here..."
              onChange={(e) => {
                setCompactBody(e.target.value);
              }}
              value={compactBody}
            />
            <Para>
              <span style={{ color: " red" }}>
                {props.otherData && props.otherData.offersLeft} Offers left
              </span>
              <span
                style={{ textDecoration: " underline", marginRight: "6px" }}
              >
                Learn more
              </span>
            </Para>
          </Element>
        </RightSideContent>
      </RightSide>
    </>
  );
};
