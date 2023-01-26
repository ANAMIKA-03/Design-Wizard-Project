import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import styled from "styled-components";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import { useQuery, useMutation } from "@apollo/client";
import {
  templateCategories,
  updatedPosts,
  getUserPosts,
} from "../../../lib/contexts/Queries";
interface Props {
  isActive: any;
}

const SizeHeadWarp = styled.div`
  padding: 15px;
  border-bottom: 1px solid #b6b6bc;
`;

const SizeWrap = styled.div``;

const SizesList = styled.div`
  display: inline-block;
  width: 25%;
  height: 400px;
  //overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 6px;
    height: 20px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  overflow-y: overlay;
`;

const SizesListUl = styled.ul`
  margin: 0;
  padding: 0;
`;

const SizesListUlLi = styled.li<Props>`
  margin: 0;
  padding: 10px 0 10px 15px;
  font-size: 13px;
  list-style: none;
  font-weight: 400;
  color: ${(props: any) => (props.isActive ? "#ffffff" : "#212529")};
  background-color: ${(props: any) => (props.isActive ? "#592e6f" : "#ffffff")};
  cursor: pointer;
`;

const SizesListRgt = styled.div`
  display: inline-block;
  height: 400px;
  //overflow-y: scroll;
  width: 75%;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 6px;
    height: 20px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  overflow-y: overlay;
  &:hover {
    ::-webkit-scrollbar {
      width: 10px;
    }
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
    ::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 6px;
      height: 20px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
    overflow-y: overlay;
  }
`;

// const SizeUlRgt = styled.div`
//   margin: 0 0 0 0;
//   padding: 0;
//  // list-style: none;
//  display: flex;
//   flex-direction:row;
//   flex-wrap:wrap;
//  // width:100%

// `;

// const SizeListRgtBox = styled.div`
//   padding: 5px;
//  // align-items: center;
//   position: relative;
//   z-index: 9;
//   width: 33%;
// `;

const TickSpan = styled.span`
  position: absolute;
  bottom: -7px;
  left: 6px;
  z-index: 9999;
  opacity: 1;
  color: #2fc6c0;
  cursor: pointer;
`;
const BannerImg = styled.div`
  height: 105%;
  width: 100%;
  position: relative;
  margin: 25px auto 0;
  margin-left: auto !important;
  margin-right: auto !important;
  cursor: pointer;
  outline: 0 none;
  transform-origin: 0 0;
  display: inline-grid;
  align-items: center;
  text-align: center;
  padding: 0 10px;
  border: 2px solid #592e6f;
  box-shadow: rgb(0 0 0 / 40%) 0 23px 24px -12px;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: translate3d(0, -10px, 0);
  }
`;
const SizeText = styled.div`
  width: 100%;
  height: 100%;
  color: #592e6f;
  text-align: center;
  font-size: 11px;
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
`;

const HeadOne = styled.span`
  font-size: 10px;
  display: inline-block;
  color: #212529;
`;

const HeadTwo = styled.span`
  font-size: 18px;
  display: inline-block;
  color: #592e6f;
  margin-left: 110px;
`;

const CloseSpan = styled.span`
  position: absolute;
  right: 21px;
  cursor: pointer;
`;
// const TextInnerDiv = styled.div
// `
// width: 90%;
//     height: 120%;
//     color: #592e6f;
//     text-align: center;
//     font-size: 14px;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     position: absolute;
//     top: 0;
//     left: 0;
//     padding: 0 5px;
//     transition: all 0.3s ease-in-out;
// `
interface AlertDialogProps {
  updateCoverBoxes: (data: any) => void;
  getData: (data: any) => void;
}
export default function AlertDialog(props: AlertDialogProps) {
  const [open, setOpen] = useState(false);
  const [activeMenu, setactiveMenu] = useState(101);
  const [arrayValue, setArrayValue] = useState([] as any);
  const [filterdData, setFilterdData] = useState([] as any);
  const [temp, setTemp] = useState(true);
  const [dataId, setDataId] = useState([] as any);
  const [updatePostValue, { loading: updateLoading, error: updateErr }] =
    useMutation(updatedPosts);
  const {
    data,
    loading: templateloading,
    error: templateError,
  } = useQuery(templateCategories, {
    variables: {
      filter:
        '{"where":{"compositionId":"e16b7240-3af0-11ec-b097-2709b7f8c64e","composer_object":{"neq":null}}}',
      token: `${localStorage.getItem("token")}`,
    },
  });
  React.useEffect(() => {
    if (data && data.GET_templateCategories) {
      props.getData(data.GET_templateCategories);
    }
  }, [data]);

  React.useEffect(() => {
    if (data && data.GET_templateCategories) {
      console.log(dataId);
      let a = data.GET_templateCategories.filter((item: any) => {
        return dataId.includes(item.id);
      });
      console.log(a);
      setFilterdData(a);
    }
    if (dataId[2] === "clicked") {
      updatePrefInServer().then(() => userPostRefetch());
    }
  }, [dataId]);

  React.useEffect(() => {
    props.updateCoverBoxes(filterdData);
  }, [filterdData]);

  const updatePrefInServer = async () => {
    console.log(dataId);
    if (!dataId[0]) {
      dataId[0] = 0;
    }
    if (!dataId[1]) {
      dataId[1] = 0;
    }
    await updatePostValue({
      variables: {
        input: `{\"preferences\":{\"templateSearch\":null,\"templateNegativeSearch\":null,\"assetSearch\":null,\
        "assetNegativeSearch\":null,\"segmentsSelectedByUser\":\"LargeBusiness\",\"emailVerification\":
        {\"notificationViewed\":true},\"productTour\":{\"notificationViewed\":true},\"animated-image-coachmark\":true,\"savedCategories\":
        [${dataId[0]},${dataId[1]}],\"unlock-layer-coachmark\":true},\"lastUploadWarn\":null,\"other\":{},\"paidSubscriber\":false,\"wasSubscriberNew\":null,\"created\":\"2021-10-26T09:54:46.000Z\",\"marketingConsent\":false,\"storageUsed\":null}`,
        token: `${localStorage.getItem("token")}`,
      },
    });
    if (updateLoading) return <>'updating....'</>;
    if (updateErr) return <>`Submission error! ${updateErr.message}`</>;
  };

  const {
    data: userPostsData,
    loading: userpostsLoading,
    error: userPostsError,
    refetch: userPostRefetch,
  } = useQuery(getUserPosts, {
    variables: {
      filter:
        '{"where":{"compositionId":"e16b7240-3af0-11ec-b097-2709b7f8c64e","composer_object":{"neq":null}}}',
      token: `${localStorage.getItem("token")}`,
    },
  });
  React.useEffect(() => {
    if (userPostsData && userPostsData.GET_users_me.preferences.savedCategories)
      setDataId(userPostsData.GET_users_me.preferences.savedCategories);
  }, [userPostsData]);

  if (templateloading) return <></>;
  if (templateError) return <>`Error! ${templateError.message}`</>;
  if (userpostsLoading) return <></>;
  if (userPostsError) return <>`Error! ${userPostsError.message}`</>;
  let nullParentsData: any = [];
  let withParentsData: any = [];
  let sendDataArray: any = [];
  data.GET_templateCategories.map((val: any) => {
    if (val.parents === null) {
      nullParentsData.push(val);
    } else {
      withParentsData.push(val);
    }
    return val;
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleData = (values: any) => {
    let dataArray: any = [];

    data.GET_templateCategories.map((val: any) => {
      if (val.parents && val.parents.length > 0) {
        val.parents.map((id: any) => {
          let a = JSON.parse(id);

          if (a.id === values) {
            dataArray.push(val);
          }
          return id;
        });
      }
      return val;
    });
    setArrayValue(dataArray);
    console.log(dataArray);
  };
  if (temp) {
    handleData(101);
    withParentsData.map((val: any) => {
      if (
        userPostsData.GET_users_me.preferences.savedCategories &&
        (val.id === userPostsData.GET_users_me.preferences.savedCategories[0] ||
          val.id === userPostsData.GET_users_me.preferences.savedCategories[1])
      ) {
        sendDataArray.push(val);
      }
    });
    props.updateCoverBoxes(sendDataArray);
    setTemp(false);
  }

  const handleClick = (values: any) => {
    setactiveMenu(values);
    handleData(values);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleBannerData = (data: any) => {
    let newArrayValue = [...arrayValue];
    if (dataId[1] !== data.id && dataId[0] !== data.id) {
      setDataId([dataId[1], data.id, "clicked"]);
      //setFilterdData([filterdData[1],data])
    }
    //  props.updateCoverBoxes(filterdData);
    setArrayValue(newArrayValue);
  };
  return (
    <div>
      <Button
        style={{
          color: "#fff",
          textTransform: "inherit",
          fontSize: "12px",
          padding: "0",
          border: "none",
          textDecoration: "none",
          fontFamily: "Lato, sans-serif",
        }}
        color="primary"
        onClick={handleClickOpen}
      >
        Change your sizes
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogContent
          style={{
            padding: "0",
          }}
        >
          <DialogContentText id="alert-dialog-description">
            <SizeHeadWarp>
              <HeadOne>Choose your two favourite sizes</HeadOne>
              <HeadTwo>Select your sizes</HeadTwo>
              <CloseSpan>
                <CloseIcon onClick={handleClose} />
              </CloseSpan>
            </SizeHeadWarp>
            <SizeWrap>
              <SizesList>
                <SizesListUl>
                  {nullParentsData.map((val: any) => (
                    <SizesListUlLi
                      key={val.id}
                      isActive={activeMenu === val.id ? true : false}
                      onClick={() => {
                        console.log(val.id);
                        handleClick(val.id);
                      }}
                    >
                      {val.name}
                    </SizesListUlLi>
                  ))}
                </SizesListUl>
              </SizesList>
              <SizesListRgt>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    position: "relative",
                  }}
                >
                  {arrayValue &&
                    arrayValue.map((data: any) => {
                      return (
                        <div
                          style={{
                            width: "33%",
                            position: "relative",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: "50px",
                          }}
                          key={data.id}
                          onClick={() => {
                            handleBannerData(data);
                          }}
                        >
                          {/* <div style={{
                            width: '100%',
                            display: 'inline-block',
                            outline: '0 none'
                          }}> */}
                          <BannerImg
                            style={{
                              width: `${
                                data.width > data.height
                                  ? 75
                                  : (data.width / data.height) * 75
                              }%`,
                              height: "0px",
                              paddingBottom: `${
                                data.width > data.height
                                  ? (data.height / data.width) * 75
                                  : 75
                              }%`,
                            }}
                          >
                            {/* <TextInnerDiv> */}
                            <SizeText>
                              <span>{data.name}</span>
                            </SizeText>
                            {/* </TextInnerDiv> */}
                          </BannerImg>
                          {/* </div> */}
                          {dataId.includes(data.id) && (
                            <TickSpan>
                              <CheckCircleIcon
                                style={{
                                  fontSize: "30px",
                                }}
                              />
                            </TickSpan>
                          )}
                        </div>
                      );
                    })}
                </div>
              </SizesListRgt>
            </SizeWrap>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
