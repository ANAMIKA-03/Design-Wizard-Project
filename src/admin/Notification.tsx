import React, { useState } from "react";
import styled from "styled-components";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { NotificationPopup } from "./NotificationPopup";
import { Checkbox } from "@mui/material";
import { NotificationDetails } from "../lib/contexts/Queries";
import { useQuery, useMutation } from "@apollo/client";
import { ToastContainer, toast } from "react-toastify";
import { NotificationData } from "../lib/contexts/Queries";
import { AdminNotificationPutData } from "../lib/contexts/Queries";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const Main = styled.div`
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: -ms-flex;
  display: flex;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  height: calc(100% - 72px);
  position: relative;
`;
const Aside = styled.div`
  position: relative;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-orient: horizontal;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: -ms-flex;
  display: flex;
`;
const Section = styled.div`
  -webkit-flex: 1;
  -moz-flex: 1;
  -ms-flex: 1;
  flex: 1;
  overflow-y: auto;
  height: 1000000px;
`;
const Panel = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;
const PanelContent = styled.div`
  outline: none;
`;
const FormView = styled.div`
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: -ms-flex;
  display: flex;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  height: calc(100vh - 72px);
  padding: 0%;
  flex: 1;
`;
const LeftSide = styled.div`
  margin-top: 1%;
  padding: 2%;
  flex: 1;
  max-width: 50%;
  overflow: hidden;
`;
const Header = styled.div`
  position: absolute;
  top: 20px;
  color: #fbfbff;
  text-decoration: underline #fbfbff;
  font-size: 1.5rem;
`;
const LeftSideContent = styled.div`
  outline: none;
`;
const ModalTitle = styled.div`
  margin-bottom: 0;
  line-height: 1.5;
`;
const Label = styled.div`
  margin: 27px 0 10px 0;
  color: #8f9197;
`;
const Input = styled.input`
  min-width: 35%;
  display: block;
  padding: 4px;
  font-size: 16px;
  font-family: "Lato", sans-serif;
`;
const RightSide = styled.div`
  margin-left: -48px;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: -ms-flex;
  display: flex;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-justify-content: space-between;
  -moz-justify-content: space-between;
  -ms-justify-content: space-between;
  justify-content: space-between;
`;
const RightHead = styled.div`
  position: absolute;
  top: 20px;
  color: #fbfbff;
  text-decoration: underline #fbfbff;
  font-size: 24px;
  font-family: "Lato", sans-serif;
`;
const RightSideContent = styled.div`
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: -ms-flex;
  display: flex;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  min-width: 40%;
`;
const LabelOne = styled.div`
  margin: 40px 0 10px 0;
  color: #8f9197;
  padding-top: 10%;
`;
const InputOne = styled.input`
  min-width: 95%;
  display: block;
  padding: 4px;
  font-size: 16px;
  font-family: "Lato", sans-serif;
`;
const LabelTwo = styled.div`
  margin: 20px 0 10px 0;
  color: #8f9197;
  padding-top: 10px;
`;
const Button = styled.div`
  position: absolute;
  bottom: -108px;
`;
const Btn = styled.div`
  cursor: pointer;
  display: inline-block;
  margin-left: 15px;
`;
const BtnOne = styled.div`
  color: #fbfbff !important;
  outline: none !important;
  border: 1px solid #d9a45b !important;
  padding: 8px;
  background-color: #d9a45b;
  background-image: linear-gradient(30deg, #bc7f2c, #d49946, #deb970, #e7e199);
  transition: border 0.3s ease, background-color 0.3s ease;
  min-height: 36px;
  min-width: 90px;
  width: 100%;
  position: relative;
  text-align: center;
  overflow: hidden;
  z-index: 1 !important;
  transition: color 0.3s ease-in-out;
  &: hover {
    &:hover {
      background-image: linear-gradient(
        30deg,
        #a77127,
        // #fbfbff,
        #a77127,
        #d9a45b
      );
    }
  }
`;
const Save = styled.div`
  display: inline-block;
  margin-left: 164px;
  width: 120px;
  height: 10px;
  cursor: pointer;
`;
const SaveBtn = styled.div`
  color: #fbfbff !important;
  outline: none !important;
  border: 1px solid #e6e6e8 !important;
  padding: 12px;
  background-color: #e87855;
  background-image: linear-gradient(30deg, #d4481d, #e5663f, #eb946b, #f1cb98);
  transition: border 0.3s ease, background-color 0.3s ease;
  &: hover {
    &:hover {
      background-image: linear-gradient(
        30deg,
        #7a2a11,
        #a73917,
        #d4581d,
        #e59e3f
      );
    }
  }
`;
const SaveBtnOne = styled.div`
  text-align: center;
  padding-left: 22px;
  line-height: 30px;
  margin-left: 5px;
  display: inline-block;
  vertical-align: middle;
  z-index: 22;
  cursor: pointer;
`;
const CancelBtn = styled.div`
  text-align: center;
  padding-left: 0;
  line-height: 30px;
  margin-left: -2px;
  margin-top: 5px;
  display: inline-block;
  vertical-align: middle;
  z-index: 22;
`;
const ButtonOne = styled.div`
  position: absolute;
  bottom: -86px;
`;
const NotificationOpt = styled.div`
  flex: 1;
  width: 18%;
  border-left: 1px solid #e6e6e8;
  right: 35px;
  position: absolute;
  height: 111%;
`;
const NotificationBody = styled.div`
  overflow-x: hidden;
  height: 100%;
`;
const DatePickerStyled = styled.div`
  margin-left: 65px;
  height: 66px;
`;
const NotiHead = styled.div`
  position: absolute;
  top: 2%;
  right: 5%;
  color: #fbfbff;
  text-decoration: underline #fbfbff;
  font-size: 1.5rem;
`;

const NotificationHead = styled.div`
  padding-left: 74px;
  // margin: -44px 0 10px 0;
  color: #8f9197;
  padding-top: 10px;
`;
const NotificationInput = styled.input`
  min-width: 70%;
  display: block;
  margin: 13px 10px 56px 65px;
  padding: 4px;
  font-size: 16px;
  font-family: "Lato", sans-serif;
`;
const NotiStartAt = styled.div`
  padding-left: 74px;
  margin: -29px 0 10px 0;
  color: #8f9197;
`;
const DurationDay = styled.div`
  display: block;
  width: 100%;
  padding-left: 72px;
  margin: -34px 0 10px 0;
  color: #8f9197;
`;
const OfferLabel = styled.div`
  display: block;
  width: 100%;
  padding-left: 69px;
  margin: -34px 0 10px 0;
  color: #8f9197;
`;
const Thumbnail = styled.div`
  display: block;
  width: 100%;
  padding-left: 69px;
  margin: -34px 0 10px 0;
  color: #8f9197;
`;
const PreviewLabel = styled.div`
  height: 0;
  width: 100%;
  padding-left: 69px;
  margin: -21px 0 10px 0;
  color: #8f9197;
  margin-top: -51px;
`;

const Update = styled.div`
  position: absolute;
  right: 70px;
  bottom: -109px;
  cursor: pointer;
  display: inline-block;
  margin-left: 15px;
  width: 125px;
`;
const UpdateBtn = styled.div`
  color: #fbfbff !important;
  outline: none !important;
  border: 1px solid #2fc6c0 !important;
  padding: 12px;
  background-color: #2fc6c0;
  background-image: linear-gradient(30deg, #208884, #2ab1ac, #3dcbd1, #67b9db);
  transition: border 0.3s ease, background-color 0.3s ease;
  &: hover {
    &:hover {
      background-image: linear-gradient(
        30deg,
        #1b7470,
        // #fbfbff,
        #1b7470,
        #2fc6c0
      );
    }
  }
`;
const UpdateSpan = styled.div`
  text-align: center;
  padding-left: 0;
  line-height: 30px;
  margin-left: 20px;
  display: inline-block;
  vertical-align: middle;
  z-index: 22;
`;
const FooterText = styled.text`
  position: absolute;
  bottom: -130px;
  left: 100px;
  display: block;
`;
const FooterSpan = styled.span`
  color: #ccc;
  font-size: 0.7em;
`;
export const Notification = () => {
  // const [isOpen, setIsOpen] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  // const [dropData, setIsDropData] = useState([]);
  const [otherData, setOtherData] = useState<any>({
    id: 0,
    name: "",
    compactBody: "",
    compactTitle: "",
    fullBody: "",
    fullTitle: "",
    useForPlan: "",
    startAt: new Date(),
    durationInDays: 1,
    thumbnail: "",
    offersLeft: 1,
  });
  const [dates, setDates] = useState(new Date());
  const [addNotificationData] = useMutation(NotificationData);
  const [addPutNotfication] = useMutation(AdminNotificationPutData);
  const notificationPopup = () => {
    setIsCheck(!isCheck);
  };
  // const formSubmitHandler = (event: any) =>{
  //   event.preventDefault();
  // }

  const { data, loading, error, refetch } = useQuery(NotificationDetails, {
    variables: {
      filter: `{}`,
      token: `${localStorage.getItem("token")}`,
    },
  });

  if (loading) return <>loading...";</>;
  if (error) return <>`Error! ${error.message}`</>;
  console.log(data);
  // if (data) {
  //   setIsDropData(data.GET_inAppNotifications)
  // }

  const addNewNotificationData = async () => {
    if (Object.values(otherData).length === 0) {
      toast.error("Please fill out all fields");
      return;
    }

    await addNotificationData({
      variables: {
        token: `${localStorage.getItem("token")}`,
        input: {
          name: otherData.name,
          compactTitle: otherData.compactTitle,
          fullTitle: otherData.fullTitle,
          useForPlan: otherData.useForPlan,
          fullBody: otherData.fullBody,
          compactBody: otherData.compactBody,
          durationInDays: otherData.durationInDays,
          offersLeft: otherData.offersLeft,
          thumbnail: otherData.thumbnail,
          startAt: otherData.startAt,
        },
      },
    }).then(() => {
      refetch();
      toast.success(`Notification Saved ${otherData.name}`);
    });
  };
  const addPutNotificationData = async () => {
    if (Object.values(otherData).length === 0) {
      toast.error(
        "!!! You didn't change anything!!!  Notification Update error"
      );
      return;
    }
    await addPutNotfication({
      variables: {
        token: `${localStorage.getItem("token")}`,
        inAppNotificationsId: otherData.id,
        input: {
          id: otherData.id,
          name: otherData.name,
          compactBody: otherData.compactBody,
          compactTitle: otherData.compactTitle,
          fullBody: otherData.fullBody,
          fullTitle: otherData.fullTitle,
          useForPlan: otherData.useForPlan,
          startAt: otherData.startAt,
          durationInDays: otherData.durationInDays,
          thumbnail: otherData.thumbnail,
          offersLeft: otherData.offersLeft,
        },
      },
    }).then(() => {
      refetch();
      toast.success(`Notification Saved ${otherData.name}`);
    });
  };
  const errorNotify = () => {
    setOtherData({
      ...otherData,
      id: 0,
      name: "",
      compactBody: "",
      compactTitle: "",
      fullBody: "",
      fullTitle: "",
      useForPlan: "",
      startAt: new Date(),
      durationInDays: 1,
      thumbnail: "",
      offersLeft: 1,
    });
    if (Object.values(otherData).length === 0) {
      toast.error("Please fill out all fields");
    }
  };
  return (
    <div>
      <Main>
        <ToastContainer position="top-center" />
        <Aside></Aside>
        <Section>
          <Panel>
            <PanelContent>
              <FormView>
                <LeftSide>
                  <Header>Notification Modal View Data:</Header>
                  {isCheck && (
                    <NotificationPopup
                      handleClose={notificationPopup}
                      otherData={otherData}
                    />
                  )}
                  {!isCheck && (
                    <LeftSideContent>
                      <ModalTitle>
                        <Label>Notification full title</Label>
                        <Input
                          type="text"
                          placeholder="notification full title"
                          value={otherData && otherData.fullTitle}
                          required
                          onChange={(e) =>
                            setOtherData({
                              ...otherData,
                              fullTitle: e.target.value,
                            })
                          }
                        />
                      </ModalTitle>
                      <Label>Notification Full Body</Label>
                      <TextareaAutosize
                        aria-label="empty textarea"
                        placeholder="Describe Notification Body here..."
                        style={{
                          width: "300px",
                          height: "100px",
                          fontFamily: "Lato, sans-serif",
                          fontSize: "16px",
                        }}
                        value={otherData && otherData.fullBody}
                        required
                        onChange={(e) =>
                          setOtherData({
                            ...otherData,
                            fullBody: e.target.value,
                          })
                        }
                      />
                    </LeftSideContent>
                  )}
                </LeftSide>
                <RightSide>
                  <RightHead>Notification Compact View Data:</RightHead>
                  {!isCheck && (
                    <RightSideContent>
                      <div style={{ width: "100%" }}>
                        <LabelOne>Notification compact title</LabelOne>
                        <InputOne
                          type="text"
                          placeholder="notification compact title"
                          required
                          value={otherData && otherData.compactTitle}
                          onChange={(e) =>
                            setOtherData({
                              ...otherData,
                              compactTitle: e.target.value,
                            })
                          }
                        ></InputOne>
                        <LabelTwo>Notification Compact Body</LabelTwo>
                        <TextareaAutosize
                          aria-label="empty textarea"
                          placeholder="Describe Notification Compact Body here..."
                          style={{
                            width: "311px",
                            height: "51px",
                            fontFamily: "Lato, sans-serif",
                            fontSize: "16px",
                          }}
                          value={otherData && otherData.compactBody}
                          required
                          onChange={(e) =>
                            setOtherData({
                              ...otherData,
                              compactBody: e.target.value,
                            })
                          }
                        />
                      </div>
                    </RightSideContent>
                  )}
                  <Button>
                    <Btn>
                      <BtnOne>
                        <CancelBtn onClick={errorNotify}>
                          <span>Cancel</span>
                        </CancelBtn>
                      </BtnOne>
                    </Btn>
                  </Button>
                  <ButtonOne>
                    <Save>
                      <SaveBtn>
                        <SaveBtnOne>
                          <span
                            typeof="submit"
                            onClick={() => {
                              addNewNotificationData();
                            }}
                          >
                            {" "}
                            Save
                          </span>
                        </SaveBtnOne>
                      </SaveBtn>
                    </Save>
                  </ButtonOne>
                  <NotificationBody>
                    <NotiHead>Notification Options:</NotiHead>
                  </NotificationBody>
                  <NotificationOpt>
                    <NotificationBody>
                      <select
                        style={{
                          padding: "10px",
                          margin: "60px 0px 4px 62px",
                          width: "75%",
                          // marginTop: "70px",
                          // marginLeft: "62px",
                        }}
                        value={otherData && otherData.useForPlan}
                        onChange={(e) =>
                          setOtherData({
                            ...otherData,
                            useForPlan: e.target.value,
                          })
                        }
                      >
                        <option>Select plan</option>
                        <option value="apprentice">Apprentice</option>
                        <option value="master">Master</option>
                        <option value="expert">Expert</option>
                      </select>
                      <NotificationHead>Notification name</NotificationHead>
                      <NotificationInput
                        type="text"
                        value={otherData && otherData.name}
                        onChange={(e) =>
                          setOtherData({ ...otherData, name: e.target.value })
                        }
                      ></NotificationInput>
                      <NotiStartAt>Notification startAt</NotiStartAt>
                      <DatePickerStyled>
                        <DatePicker
                          type="date"
                          dateFormat="dd/MM/yyyy"
                          selected={dates}
                          value={otherData && otherData.startAt}
                          onChange={(e: any) =>
                            setOtherData({
                              ...otherData,
                              startAt: e,
                            })
                          }
                        ></DatePicker>
                      </DatePickerStyled>
                      <DurationDay>Duration in days</DurationDay>
                      <NotificationInput
                        type="number"
                        value={otherData && otherData.durationInDays}
                        onChange={(e) =>
                          setOtherData({
                            ...otherData,
                            durationInDays: e.target.value,
                          })
                        }
                      ></NotificationInput>
                      <OfferLabel>Offers left</OfferLabel>
                      <NotificationInput
                        type="number"
                        value={otherData && otherData.offersLeft}
                        onChange={(e) =>
                          setOtherData({
                            ...otherData,
                            offersLeft: e.target.value,
                          })
                        }
                      ></NotificationInput>
                      <Thumbnail>Notification thumbnail (asset ID)</Thumbnail>
                      <NotificationInput
                        type="text"
                        value={otherData && otherData.thumbnail}
                        onChange={(e) =>
                          setOtherData({
                            ...otherData,
                            thumbnail: e.target.value,
                          })
                        }
                      ></NotificationInput>
                      <br />
                      <br />
                      <br />
                      <PreviewLabel>
                        Notification Preview:
                        <Checkbox
                          color="primary"
                          inputProps={{ "aria-label": "secondary checkbox" }}
                          style={{
                            width: "0px",
                            height: "0px",
                            margin: "0px 10px 0px",
                            background: "white",
                            fontFamily: "lato,sans-serif",
                          }}
                          onChange={(e) => {
                            setIsCheck(e.target.checked);
                            console.log(e.target.checked);
                          }}
                        ></Checkbox>
                      </PreviewLabel>

                      <select
                        style={{
                          padding: "10px",
                          margin: "66px",
                          width: "244px",
                        }}
                        onChange={(e: any) => {
                          const item = data.GET_inAppNotifications.filter(
                            (item: any) => {
                              return item.name === e.target.value;
                            }
                          );
                          setOtherData(item[0]);
                          console.log(item[0]);
                        }}
                      >
                        <option>Select to edit</option>
                        {data.GET_inAppNotifications.map(
                          (item: any, index: any) => {
                            return (
                              <option key={index} value={item.name}>
                                {item.name}
                              </option>
                            );
                          }
                        )}
                      </select>
                    </NotificationBody>
                  </NotificationOpt>
                </RightSide>
              </FormView>
            </PanelContent>
            <Update>
              <UpdateBtn>
                <UpdateSpan>
                  <span
                    onClick={() => {
                      addPutNotificationData();
                    }}
                  >
                    Update
                  </span>
                </UpdateSpan>
              </UpdateBtn>
            </Update>
          </Panel>
        </Section>
        <FooterText>
          <FooterSpan>
            Copyright © 2022 Wavebreak Media. All rights reserved.
          </FooterSpan>
        </FooterText>
      </Main>
    </div>
  );
};
