import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import styled from "styled-components";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import { useQuery } from "@apollo/client";
import { templateCategories } from "../../../lib/contexts/Queries";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
interface Props {
  isActive: any;
}

const BootstrapButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "4px 10px",
    border: "none",
    lineHeight: 1.5,
    background: "#2fc6c0",
    borderColor: "#2fc6c0",
    marginLeft: "0",
    color: "#fbfbff",
    marginTop: "10px",
    fontFamily: "Loto, sans-serif",
    "&:hover": {
      backgroundColor: "#2fc6c0",
      borderColor: "#2fc6c0",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#2fc6c0",
      borderColor: "#2fc6c0",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  },
})(Button);

const SizeHeadWarp = styled.div`
  padding: 15px;
  border-bottom: 1px solid #b6b6bc;
  font-family: "Lato", sans-serif !important;
  width: 764px;
  height: 36px;
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
  font-size: 18px;
  list-style: none;
  font-weight: 400;
  color: ${(props: any) => (props.isActive ? "#ffffff" : "#212529")};
  background-color: ${(props: any) => (props.isActive ? "#592e6f" : "#ffffff")};
  cursor: pointer;
  font-family: "Lato", sans-serif !important;
`;

const SizesListRgt = styled.div`
  display: inline-block;
  height: 400px;
  //overflow-y: scroll;
  width: 75%;
  ::-webkit-scrollbar {
    width: 5px;
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

const SizeUlRgt = styled.ul`
  margin: 0 0 0 0;
  list-style: none;
`;

const SizeListRgtBox = styled.li`
  padding: 20px;
  display: inline-block;
  align-items: center;
  width: 22%;
  position: relative;
  z-index: 9;
`;

const SizeListPreview = styled.div`
  padding: 40px;
  background-color: #f2f2f2;
  margin: 0 auto 20px auto;
  width: 280px;
  height: auto;
  position: relative;
`;

const SizeListPreviewText = styled.span`
  position: absolute;
  font-size: 12px;
  top: 10px;
  left: 10px;
  color: #b6b6bc;
`;

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

const BannerImgTwo = styled.div`
  width: 100%;
  height: 157px;
  margin: 0 auto;
  cursor: pointer;
  outline: 0 none;
  transform-origin: 0 0;
  display: inline-grid;
  align-items: center;
  text-align: center;
  padding: 0;
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

const HeadTwo = styled.span`
  font-size: 24px;
  display: inline-block;
  color: #592e6f;
  margin-left: 30%;
`;

const CloseSpan = styled.span`
  position: absolute;
  right: 21px;
  cursor: pointer;
`;

const SizeForm = styled.ul`
  margin: 0;
  padding: 0 21px;
`;

const SizeFormList = styled.li`
  list-type: none;
  display: inline-block;
  position: relative;
  margin-right: 15px;
  font-family: "Lato", sans-serif !important;
`;

const SizeFormListLast = styled.li`
  list-type: none;
  display: inline-block;
  position: relative;
  margin-right: 0;
`;

const SizeFormListSpan = styled.span`
  display: block;
  color: #592e6f;
  font-size: 16px;
  margin-bottom: 5px;
`;

interface AlertDialogProps {
  updateCoverBoxes?: (data: any) => void;
  handleOpen: (val: any) => void;
  open: boolean;
  setCanvasDim: (val: any, val2: any, val3: any, val4: any) => void;
  resizeTitle: string;
}
export default function ResizeComponent(props: AlertDialogProps) {
  const [activeMenu, setactiveMenu] = useState(100);
  const [showDot, setShowDot] = useState([] as any);
  const [arrayValue, setArrayValue] = useState([] as any);
  const [filterdData, setFilterdData] = useState([] as any);
  const [temp, setTemp] = useState(true);
  const [cWidth, setCWidth] = useState(800);
  const [cHeight, setCHeight] = useState(800);
  //const [unit,setUnit] = useState('px')
  const { data, loading, error } = useQuery(templateCategories, {
    variables: {
      filter:
        '{"where":{"compositionId":"e16b7240-3af0-11ec-b097-2709b7f8c64e","composer_object":{"neq":null}}}',
      token: `${localStorage.getItem("token")}`,
    },
  });
  if (loading) return <></>;
  if (error) return <>`Error! ${error.message}`</>;
  let arr: any = [];
  const handleOpen = () => {
    props.handleOpen(false);
  };
  data.GET_templateCategories.map((val: any) => {
    if (val.parents === null) {
      arr.push(val);
    }
    return val;
  });
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleData = (values: any) => {
    let dataArray: any = [];
    data.GET_templateCategories.map((val: any) => {
      // console.log(val.parents,"parents")
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
    // temp = false
    setArrayValue(dataArray);
  };
  if (temp) {
    handleData(100);
    setTemp(false);
  }

  const currencies = [
    {
      value: "px",
      label: "px",
    },
    {
      value: "cm",
      label: "cm",
    },
    {
      value: "in",
      label: "in",
    },
  ];

  const handleClick = (values: any) => {
    // let dataArray: any = [];
    setactiveMenu(values);
    handleData(values);
    // console.log(values, "==>>>values");
    // data.GET_templateCategories.map((val: any) => {
    //   // console.log(val.parents,"parents")
    //   if (val.parents && val.parents.length > 0) {
    //     val.parents.map((id: any) => {
    //       let a = JSON.parse(id);
    //       if (a.id == values) {
    //         dataArray.push(val);
    //       }
    //     });
    //   }
    // });
    // setArrayValue(dataArray);
  };
  // const handleClose = () => {
  //   setOpen(false);
  // };
  const handleBannerData = (data: any) => {
    let newArrayValue = [...arrayValue];
    // let a:any = showDot;
    if (showDot.length >= 2) {
      showDot.shift();
      filterdData.shift();
      showDot.push(data.id);
      filterdData.push(data);
    } else {
      showDot.push(data.id);
      filterdData.push(data);
    }
    setShowDot(showDot);
    setFilterdData(filterdData);
    // props.updateCoverBoxes(filterdData);
    setArrayValue(newArrayValue);
    // console.log(showDot)
    if (data && data.width && data.height && data.name && data.id) {
      props.setCanvasDim(data.width, data.height, data.name, data.id);
    }
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
      >
        <DialogContent
          style={{
            padding: "0",
            width: "794px",
            height: "500.3px",
          }}
        >
          <DialogContentText id="alert-dialog-description">
            <SizeHeadWarp>
              <HeadTwo>Resize your {props.resizeTitle}</HeadTwo>
              <CloseSpan onClick={handleOpen}>
                <CloseIcon />
              </CloseSpan>
            </SizeHeadWarp>
            <SizeWrap>
              <SizesList>
                <SizesListUl>
                  {arr.map((val: any) => (
                    <SizesListUlLi
                      key={val.id}
                      isActive={activeMenu === val.id ? true : false}
                      onClick={() => handleClick(val.id)}
                    >
                      {val.name}
                    </SizesListUlLi>
                  ))}
                </SizesListUl>
              </SizesList>
              <SizesListRgt>
                <SizeUlRgt>
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
                        return data.id !== 1 ? (
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
                              console.log(data);
                              handleBannerData(data);
                              handleOpen();
                            }}
                          >
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
                              <SizeText>
                                <span>{data.name}</span>
                              </SizeText>
                            </BannerImg>
                            {showDot.indexOf(data.id) >= 0 ? (
                              <TickSpan>
                                <CheckCircleIcon
                                  style={{
                                    fontSize: "30px",
                                  }}
                                />
                              </TickSpan>
                            ) : null}
                          </div>
                        ) : (
                          <>
                            <SizeUlRgt>
                              <SizeListRgtBox>
                                <SizeListPreview>
                                  <SizeListPreviewText>
                                    Preview
                                  </SizeListPreviewText>
                                  <BannerImgTwo>
                                    <SizeText></SizeText>
                                  </BannerImgTwo>
                                </SizeListPreview>
                              </SizeListRgtBox>
                            </SizeUlRgt>
                            <SizeForm>
                              <SizeFormList>
                                <SizeFormListSpan>Width</SizeFormListSpan>
                                <TextField
                                  id="outlined-basic"
                                  value={cWidth}
                                  style={{
                                    width: "122px",
                                    border: "#ccc solid 1px",
                                  }}
                                  onChange={(e: any) =>
                                    setCWidth(e.target.value)
                                  }
                                />
                                <TextField
                                  id="standard-select-currency"
                                  style={{
                                    width: "48px",
                                    height: "55px",
                                    position: "absolute",
                                    right: "0",
                                  }}
                                  select
                                >
                                  {currencies.map((option) => (
                                    <MenuItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </SizeFormList>
                              <SizeFormList>
                                <SizeFormListSpan>Height</SizeFormListSpan>
                                <TextField
                                  id="outlined-basic"
                                  style={{
                                    width: "122px",
                                    border: "#ccc solid 1px",
                                  }}
                                  value={cHeight}
                                  onChange={(e: any) =>
                                    setCHeight(e.target.value)
                                  }
                                />
                                <TextField
                                  id="standard-select-currency"
                                  style={{
                                    width: "48px",
                                    height: "55px",
                                    position: "absolute",
                                    right: "0",
                                  }}
                                  select
                                >
                                  {currencies.map((option) => (
                                    <MenuItem
                                      style={{ height: "60px" }}
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </SizeFormList>
                              <SizeFormListLast>
                                {" "}
                                <Link
                                  to={{
                                    pathname: "/dashboard/workspace",
                                    state: {
                                      editor: "image",
                                      height: cHeight,
                                      width: cWidth,
                                    },
                                  }}
                                  style={{ textDecoration: "none" }}
                                >
                                  <BootstrapButton>Create</BootstrapButton>
                                </Link>
                              </SizeFormListLast>
                            </SizeForm>
                          </>
                        );
                      })}
                  </div>
                </SizeUlRgt>
                {/* <SizeUlRgt>
                  <SizeListRgtBox>
                    <SizeListPreview>
                      <SizeListPreviewText>Preview</SizeListPreviewText>
                      <BannerImgTwo>
                        <SizeText>fdf sfsf</SizeText>
                      </BannerImgTwo>
                    </SizeListPreview>
                  </SizeListRgtBox>
                </SizeUlRgt> */}
                {/* <SizeForm>
                  <SizeFormList>
                    <SizeFormListSpan>Width</SizeFormListSpan>
                    <TextField
                      id="outlined-basic"
                      style={{ width: "125px", border: "#ccc solid 1px" }}
                    />
                    <TextField
                      id="standard-select-currency"
                      style={{
                        width: "48px",
                        height: "55px",
                        position: "absolute",
                        right: "0",
                      }}
                      select
                    >
                      {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </SizeFormList>
                  <SizeFormList>
                    <SizeFormListSpan>Height</SizeFormListSpan>
                    <TextField
                      id="outlined-basic"
                      style={{ width: "125px", border: "#ccc solid 1px" }}
                    />
                    <TextField
                      id="standard-select-currency"
                      style={{
                        width: "48px",
                        height: "55px",
                        position: "absolute",
                        right: "0",
                      }}
                      select
                    >
                      {currencies.map((option) => (
                        <MenuItem
                          style={{ height: "60px" }}
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </SizeFormList>
                  <SizeFormListLast>
                    {" "}
                    <BootstrapButton>Create</BootstrapButton>
                  </SizeFormListLast>
                </SizeForm> */}
              </SizesListRgt>
            </SizeWrap>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
