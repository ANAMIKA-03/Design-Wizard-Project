import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import ResizeComponent from "../../home/ResizeComponent";
import {
  ActiveEditorContext,
  //MyDesignsContext,
} from "./../../../../components/layout/private";
import {
  WorkspaceHeader,
  ImgHeaders,
  StyledButton,
  Styledpara,
} from "./styledComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  PostUserComposition,
  UpdateUserComposition,
  CompositionDL,
  CheckStatus,
  DownloadImage,
  GetPrice,
  PublishComposition,
  //DesignCounts
} from "./../../../../lib/contexts/Queries";
import { useMutation } from "@apollo/client";
import { ReactComponent as Save } from "./../../../../assets/svg/save.svg";
import { ReactComponent as Share } from "./../../../../assets/svg/new-share-icon.svg";
import { ReactComponent as Download } from "./../../../../assets/svg/dowload.svg";
import ShareCustomPopup from "./ShareCustomPopup";
import DownloadCustomPopup from "./DownloadPopUp";
import ActivateEmailPopup from "./ActiveEmailPopUp";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import Divider from '@mui/material/Divider';
import Box from "@mui/material/Box";
import { AdminWorkspace } from "./AdminWorkspace";
import { ChangeUploadPopup } from "./ChangeUploadPopup";
import { useDispatch, useSelector } from "react-redux";
import { UnPaidDownloadPopup } from "./unPaidDownloadPopup";
import { CanvasSizeChangepopup } from "../../../../pages/private/dashboard/workspace/CanvasSizeChangepopup";
export interface ImageDetails {
  imageDetails: any[];
  title: any;
}

interface Props {
  hasActiveObject: any;
}

const ResizeBtnWrapper = styled.div`
  width: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SaveText = styled.p`
  font-size: 12px;
  margin: 0;
  color: #8c90aa;
  font-weight: bold;
`;

const SaveDropDownDiv = styled.div`
  z-index: 99999999999;
  -webkit-border-radius: 0;
  position: absolute;
  top: 100%;
  float: left;
  min-width: 10rem;
  padding: 0.5rem 0;
  margin: 0.125rem 0 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  right: 240px;
  font-family: Lato;
`;

const TextDivWrapper = styled.div`
  cursor: pointer;
  transition: 0.3s color ease;
  padding: 10px;
  background-color: transparent !important;
`;

const TextDiv = styled.div`
  display: block;
  padding: 0.25rem 1.5rem;
  clear: both;
  font-weight: 400;
  color: #212529;
  text-align: inherit;
  white-space: nowrap;
  border: 0;
  &: hover {
    color: #e59188;
  }
`;

const Divider = styled.div`
  height: 0;
  margin: 0.5rem 0;
  overflow: hidden;
  border-top: 1px solid #e9ecef;
`;

const IconWrapper = styled.div<Props>`
  width: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  height: 100%;
  justify-content: center;
  &: hover {
    background-color: ${(props: any) =>
      props.hasActiveObject === true ? "rgba(255,255,255,0.25)" : ""};
  }
`;
const Style = styled.div`
  width: 160px;
  font-size: 16px;
  font-family: "Lato", sans-serif;
  &:hover {
    color: #e87855;
  }
`;

const BannerDiv = styled.div`
  margin-left: 75px;
  width: 500px;
  height: 100%;
`;

const Banner = styled.a`
  width: 100%;
  height: 100%;
  display: block;
  background-image: url(https://app.designwizard.com/images/addBanner/stock_500x65.jpg);
  background-repeat: no-repeat;
`;

const Button = styled.div``;

const DotTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#000000",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#000000",
    color: "#ffffff",
    width: "50px",
    height: "15px",
    fontSize: "12px",
    textAlign: "center",
    fontFamily: "lato",
    border: "1px solid #dadde9",
    padding: 10,
  },
}));
const SaveTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#FFFFFF",
    color: "rgb(128,128,128)",
    width: "40px",
    height: "15px",
    textAlign: "center",
    border: "1px solid rgb(128,128,128)",
    borderOpacity: 0.1,
    padding: 5,
    borderRadius: "1px",
    fontSize: "12px",
    fontFamily: "Lato",
    bottom: "5px",
  },
}));
const DownloadTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#FFFFFF",
    color: "rgb(128,128,128)",
    width: "60px",
    height: "15px",
    fontSize: "12px",
    fontFamily: "Lato",
    textAlign: "center",
    border: "1px solid rgb(128,128,128)",
    padding: 5,
    borderRadius: "1px",
  },
}));
export const WorkspaceHeaderWrapper = (props: any) => {
  const {
    canvas,
    getComposition,
    imageDetails,
    setCanvasDim,
    resizeTitle,
    compositionIds,
    resizeTitleId,
  } = props;

  //States

  const activeEditorContext = useContext(ActiveEditorContext);
  const [open, setOpen] = useState(false);
  const [saveDrop, setSaveDrop] = useState(false);
  const [showPopup, setShowpopup] = useState(false);
  const [showDownPopup, setShowDownpopup] = useState(false);
  const [showActivateEmailPopup, setShowActivateEmailpopup] = useState(false);
  const [imgType, setImgType] = useState("jpg");
  const [downloadClick, setDownloadClick] = useState(false);
  const [hasActiveObject, setHasActiveObject] = useState(false);
  const [compositionId, setCompositionId] = useState(compositionIds);
  const [background, setBackground] = useState(null);
  const [owner, setOwner] = useState(null);
  const [thumb, setThumb] = useState("");
  const [downloadConfirm, setDownloadConfirm] = useState(false);
  const [imgData, setImgData] = useState<any>([]);
  const [keywords, setKeywords] = useState<any>([]);
  const [modelIds, setModelIds] = useState<any>([]);
  const [propertyIds, setPropIds] = useState<any>([]);
  const [paid, setPaid] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [shareCanvas, setShareCanvas] = useState(false);
  const [urlView, setUrlView] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [canvasSizeChange, setCanvasSizeChange] = useState(false);

  //Mutations

  const [saveDesign] = useMutation(PostUserComposition);
  const [updateUserDesign] = useMutation(UpdateUserComposition);
  const [compositionDL] = useMutation(CompositionDL);
  const [checkStatus] = useMutation(CheckStatus);
  const [downloadImg] = useMutation(DownloadImage);
  const [getPrice] = useMutation(GetPrice);
  const [publishCompositions] = useMutation(PublishComposition);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const toSave = useSelector((state: any) => {
    return state.toSave;
  });
  const title = useSelector((state: any) => {
    return state.title;
  });
  //UseEffects

  useEffect(() => {
    dispatch({
      type: "composition",
      compositionId: compositionId,
    });
  }, [compositionId]);

  useEffect(() => {
    if (toSave) {
      saveNewDesign().then(() => {
        dispatch({
          type: "toSave",
          toSave: false,
        });
      });
    }
  }, [toSave]);

  useEffect(() => {
    if (canvas) {
      if (canvas.backgroundColor) {
        setBackground(canvas.backgroundColor);
      }
      if (canvas.backgroundImage) {
        setBackground(canvas.backgroundImage);
      }
    }
  }, [canvas]);

  // When image is added in canvas, there keys are to be passed in composer_object

  useEffect(() => {
    if (canvas) {
      canvas.on("object:added", () => {
        setHasActiveObject(true);
        let results: any[] = [];
        for (let img of getComposition(canvas).objects) {
          if (img.type === "image" && activeEditorContext === "image") {
            let src = img.src;
            let subStr = src.split("fileData=")[1];
            let str22 = decodeURIComponent(subStr);
            let id = JSON.parse(str22);
            results.push(id);
          }
        }
        setImgData(results);
      });
      canvas.on("object:removed", () => {
        let results: any[] = [];
        for (let img of getComposition(canvas).objects) {
          if (img.type === "image" && activeEditorContext === "image") {
            let src = img.src;
            let subStr = src.split("fileData=")[1];
            let str22 = decodeURIComponent(subStr);
            let id = JSON.parse(str22);
            results.push(id);
          }
        }
        setImgData(results);
        if (getComposition(canvas).objects.length > 0) {
          setHasActiveObject(true);
        } else {
          setHasActiveObject(false);
        }
      });
    }
  }, [canvas]);

  //This setStates for modelId,propertyIds of images

  useEffect(() => {
    let imgId: any = [];
    for (let i of imgData) {
      imgId.push(i.assetId);
    }
    const filtered = Object.keys(imageDetails)
      .filter((key: any) => imgId.includes(key))
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: imageDetails[key],
        };
      }, {});
    const dataObj = Object.values(filtered);
    let keyW: any[] = [],
      modelId: any[] = [],
      propids: any[] = [],
      i: any = {};
    for (i of dataObj) {
      keyW.push(...i.keywords);
      modelId.push(...i.modelReleaseIds);
      propids.push(...i.propertyReleaseIDs);
    }
    setKeywords(keyW);
    setModelIds(modelId);
    setPropIds(propids);
    console.log("imageDetails", imageDetails);
    console.log("imageData", imgData);
  }, [imageDetails, imgData]);

  useEffect(() => {
    const user: any = localStorage.getItem("user");
    const userData = JSON.parse(user);
    console.log(userData);
    for (let i of userData.roles) {
      if (i.name === "admin") {
        setIsAdmin(true);
      }
    }
  }, []);

  const opens = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const token = `${localStorage.getItem("token")}`;
  //-----------------------------Composition Object ---------------------------------
  const getCompositionObject = () => {
    const canvasThumb = canvas.toDataURL({
      format: "jpeg",
      quality: 0.5,
    });
    const composer_obj = [
      {
        artboardId: 1, //artboardId
        background: background, //background description
        extension: imgType, //ext of images
        height: canvas.getHeight(), //height of canvas
        guides: { rows: 3, columns: 3 },
        keywords: keywords.toString(), //all keywords of images
        layers: canvas.toDatalessJSON(["angle", "flipX"]).objects, //getCompositions or Objects of canvas
        modelReleaseIds: modelIds, //from images
        propertyReleaseIDs: propertyIds, //from images
        scale: null, //scale
        thumb: canvasThumb, //image of canvas
        title: title, //title by user
        type: "default", //default always
        width: canvas.getWidth(), //width of canvas
      },
    ];
    console.log(composer_obj);
    return [composer_obj, canvasThumb];
  };

  //-----------------------------Composition for sharing ----------------------------
  const getCompositionObjectForSharing = () => {
    const composer_obj = [
      {
        extension: imgType, //ext of images
        height: canvas.getHeight(), //height of canvas
        title: title, //title by user
        width: canvas.getWidth(), //width of canvas
      },
    ];
    console.log(composer_obj);
    return [composer_obj];
  };
  //-----------------------------Save New Design -------------------------------------
  const saveNewDesign = async () => {
    console.log(resizeTitleId);
    const compositionData = getCompositionObject();
    const data = await saveDesign({
      variables: {
        token: token,
        input: {
          ownerId: localStorage.getItem("userId"),
          categoryId: resizeTitleId,
          statusId: 1,
          thumb: compositionData[1],
          templateId: null,
          customSize: null,
          version: 2,
          designType: "static",
          composer_object: JSON.stringify(compositionData[0]),
        },
      },
    });
    setCompositionId(data.data.POST_compositions.compositionId);
    setOwner(data.data.POST_compositions.ownerId);
    toast.success("Your design is saved");
    dispatch({
      type: "updateList",
      isListUpdate: true,
    });
    return data;
  };

  //-----------------------------Update Design -------------------------------------

  const updateDesign = async () => {
    if (compositionId === "") {
      console.log(compositionId);
      saveNewDesign();
    } else {
      const compositionData = getCompositionObject();
      const data = await updateUserDesign({
        variables: {
          token: token,
          compositionId: compositionId,
          ownerId: localStorage.getItem("userId"),
          input: {
            compositionId: compositionId,
            composer_object: JSON.stringify(compositionData[0]),
          },
        },
      });
      console.log(data);
      dispatch({
        type: "updateList",
        isListUpdate: true,
      });
    }
  };

  //-----------------------------Composition DL -------------------------------------

  const compositiondl = async (compId: string) => {
    const compositionData = getCompositionObject();
    const data = await compositionDL({
      variables: {
        token: token,
        input: JSON.stringify({
          composition: {
            categoryId: 256,
            compositionId: compositionId,
            composer_object: compositionData[0],
            customSize: null,
            designType: "static",
          },
        }),
      },
    });
    return data.data.POST_users_me_compositionDL.id;
  };
  //-----------------------------Status Check -------------------------------
  let count = 0;
  const statusCheck = async (id: any) => {
    let dataToreturn: any = "";
    const data = await checkStatus({
      variables: {
        token: token,
        input: JSON.stringify({ files: [`${id}_1.${imgType}`] }),
      },
    });
    console.log(count);
    if (
      data.data.POST_users_me_checkDownloadQueue.status === "queued" &&
      count < 20
    ) {
      count++;
      console.log(count);
      await statusCheck(id);
    }
    if (count > 20) {
      toast.error("Something went wrong");
      return;
    }
    if (data.data.POST_users_me_checkDownloadQueue.status === "ready") {
      dataToreturn = data;
    }
    return dataToreturn;
  };
  //----------------------------Get PRice-------------------------------------
  const gettingPrice = async () => {
    const compositionData = getCompositionObject();
    const data = await getPrice({
      variables: {
        input: JSON.stringify({ composer_object: compositionData[0] }),
        token: token,
      },
    });
    if (data.data.POST_compositions_getPrice.price !== 0) {
      setPaid(true);
    }
  };
  //-----------------------------Download Image -------------------------------
  const downloadImage = async (fileId: any) => {
    const input_obj = {
      files: [fileId],
      compositionId: compositionId,
    };
    const data = await downloadImg({
      variables: {
        token: token,
        input: JSON.stringify(input_obj),
      },
    });
    console.log(input_obj);
    return data.data.POST_users_me_downloadImages.url;
  };
  //-----------------------------Image Download -------------------------------
  const imgDownload = () => {
    compositiondl(compositionId)
      .then((datas: any) => {
        console.log(datas);
        return statusCheck(datas);
      })
      .then((data: any) => {
        if (data) {
          return downloadImage(
            data.data.POST_users_me_checkDownloadQueue.files[0]
          );
        }
      })
      .then((res: any) => {
        if (res) {
          console.log(res);
          window.open(res);
          setDownloadClick(false);
        }
      });
  };
  useEffect(() => {
    if (downloadConfirm === true) {
      imgDownload();
    }
  }, [downloadConfirm]);

  //Share Functionality API

  useEffect(() => {
    if (shareCanvas) {
      updateDesign()
        .then(() => {
          if (compositionId) {
            publishComposition();
          } else {
            return;
          }
        })
        .then((res: any) => {
          if (res && compositionId) {
            console.log(res);
            let viewUrl = JSON.parse(res).viewerUrl;
            setUrlView(viewUrl);
          } else {
            return;
          }
        });
    }
  }, [shareCanvas, compositionId]);

  let countForPublish = 0;
  const publishComposition = async (response = "") => {
    const compositionData = getCompositionObject();
    const compositionDataForShare = getCompositionObjectForSharing();
    let dataToreturn: any = "";
    let inputForapi = {};
    let input = {
      composition: {
        artboardId: 1,
        categoryId: 256,
        compositionId: compositionId,
        composer_object: compositionData[0],
        preview: true,
        designType: "static",
      },
    };
    if (countForPublish > 0) {
      inputForapi = {
        composition: {
          artboardId: 1,
          categoryId: 256,
          compositionId: compositionId,
          composer_object: compositionDataForShare[0],
          preview: true,
          designType: "static",
          shortCode: JSON.parse(response).id,
        },
        checkQ: false,
      };
      console.log(inputForapi);
    } else {
      inputForapi = input;
    }
    const data = await publishCompositions({
      variables: {
        token: token,
        userId: localStorage.getItem("userId"),
        input: JSON.stringify(inputForapi),
      },
    });
    console.log(countForPublish);
    if (
      JSON.parse(data.data.POST_users_publishComposition).status === "queued" &&
      countForPublish < 20
    ) {
      countForPublish++;
      console.log(countForPublish);
      await publishComposition(data.data.POST_users_publishComposition);
    }
    if (countForPublish >= 20) {
      toast.error("Something went wrong");
      return;
    }
    if (
      JSON.parse(data.data.POST_users_publishComposition).status === "ready"
    ) {
      dataToreturn = data;
    }
    return dataToreturn;
  };

  //Checks the price of the objects used

  useEffect(() => {
    if (downloadClick) {
      if (!compositionId) {
        gettingPrice().then(() => {
          saveNewDesign();
        });
      }
      if (compositionId) {
        gettingPrice().then(() => {
          updateDesign();
        });
      }
    }
  }, [downloadClick]);

  // open and close handlers

  const popupCloseHandler = (e: any) => {
    setShowpopup(e);
  };

  const popupCloseDownHandler = (e: any) => {
    setShowDownpopup(e);
  };
  const emailPopUpClose = (e: any) => {
    setShowActivateEmailpopup(e);
  };
  const imagetype = (img: any) => {
    setImgType(img);
  };
  const confirmDownload = (confirm: any) => {
    setDownloadConfirm(confirm);
  };
  const handleOpen = (val: any) => {
    setOpen(val);
  };
  const handleDownloadConfirm = (val: boolean) => {
    setDownloadConfirm(val);
  };
  const canvaschange = () => {
    setCanvasSizeChange(!canvasSizeChange);
  };
  return (
    <>
      <WorkspaceHeader id="WorkspaceHeader">
        {!isAdmin && (
          <>
            {!isAdmin && activeEditorContext === "image" ? (
              <ResizeBtnWrapper>
                <StyledButton
                  style={{ paddingTop: "15px" }}
                  onClick={() => setOpen(true)}
                >
                  <img
                    src="/canvas-resize-icon.svg"
                    color="#dde6ff"
                    height="30px"
                    width="30px"
                    alt="resize"
                    font-size="12px"
                  />
                  <Styledpara
                    style={{
                      fontSize: "9.6px",
                      padding: "1px",
                      height: "10px",
                      //marginTop: "4px",
                    }}
                  >
                    Resize
                  </Styledpara>
                </StyledButton>
              </ResizeBtnWrapper>
            ) : (
              <ResizeBtnWrapper></ResizeBtnWrapper>
            )}
            <BannerDiv>
              <Banner
                target="_blank"
                href="https://clk.tradedoubler.com/click?p(264322)a(3239682)g(22913638)epi(app)url(https://stock.adobe.com/promo/firstmonthfree)"
              ></Banner>
            </BannerDiv>
            {isOpen && <ChangeUploadPopup />}

            {!isAdmin && (
              <ImgHeaders>
                <SaveTooltip
                  title="Save"
                  placement="bottom-end"
                  enterDelay={1000}
                  leaveDelay={200}
                >
                  <IconWrapper
                    onClick={() => {
                      hasActiveObject && setSaveDrop((oldState) => !oldState);
                    }}
                    hasActiveObject={hasActiveObject}
                  >
                    <Save
                      style={{
                        color:
                          hasActiveObject === false ? "#8c90aa" : "#F0ECF5",
                        height: "25px",
                        width: "25px",
                      }}
                    />

                    <SaveText
                      style={{
                        color:
                          hasActiveObject === false ? "#8c90aa" : "#F0ECF5",
                      }}
                    >
                      Save
                    </SaveText>
                  </IconWrapper>
                </SaveTooltip>

                {saveDrop && hasActiveObject && (
                  <SaveDropDownDiv>
                    <TextDivWrapper>
                      <TextDiv
                        onClick={() => {
                          if (getComposition(canvas).objects.length > 1) {
                            updateDesign();
                            setSaveDrop((oldState: any) => !oldState);
                          } else {
                            toast.error(
                              "Please Add another image or text to complete your design"
                            );
                            setSaveDrop((oldState: any) => !oldState);
                          }
                        }}
                      >
                        SAVE CURRENT DESIGN
                      </TextDiv>
                    </TextDivWrapper>
                    <Divider />
                    <TextDivWrapper>
                      <TextDiv
                        onClick={() => {
                          if (getComposition(canvas).objects.length > 1) {
                            saveNewDesign();
                            setSaveDrop((oldState: any) => !oldState);
                            //downloadImage(token);}
                          } else {
                            toast.error(
                              "Please Add another image or text to complete your design"
                            );
                            setSaveDrop((oldState: any) => !oldState);
                          }
                        }}
                      >
                        SAVE AS NEW DESIGN
                      </TextDiv>
                    </TextDivWrapper>
                  </SaveDropDownDiv>
                )}
                {/* <IconWrapper
              hasActiveObject={hasActiveObject}
              onClick={(e: any) => {
                setShowpopup(!showPopup);
                setCanvasSs(canvas.toDataURL({ format: "jpeg", quality: 0.5 }));
              }}
            > */}

                <SaveTooltip
                  title="Share"
                  placement="bottom-end"
                  enterDelay={1000}
                  leaveDelay={200}
                >
                  <IconWrapper
                    hasActiveObject={hasActiveObject}
                    onClick={(e: any) => {
                      if (getComposition(canvas).objects.length > 1) {
                        const loginData: any = localStorage.getItem("user");
                        const data = JSON.parse(loginData);
                        let res = data.emailVerified;
                        if (res === true) {
                          setShowpopup(true);
                          setThumb(
                            canvas.toDataURL({ format: "jpeg", quality: 0.5 })
                          );
                          setShareCanvas(true);
                          return;
                        } else {
                          setShowActivateEmailpopup(!showActivateEmailPopup);
                          return;
                        }
                      } else {
                        toast.error(
                          "Please Add another image or text to complete your design"
                        );
                      }
                    }}
                  >
                    <Share
                      style={{
                        color:
                          hasActiveObject === false ? "#8c90aa" : "#F0ECF5",
                        height: "25px",
                        width: "25px",
                      }}
                    />
                    <SaveText
                      style={{
                        color:
                          hasActiveObject === false ? "#8c90aa" : "#F0ECF5",
                      }}
                    >
                      Share
                    </SaveText>
                  </IconWrapper>
                </SaveTooltip>
                <DownloadCustomPopup
                  onClose={popupCloseDownHandler}
                  show={showDownPopup}
                  title="Your design is ready!"
                  //image={canvasDown}
                  imagetype={imagetype}
                  confirmDownload={confirmDownload}
                  downloadConfirm={downloadConfirm}
                  thumb={thumb}
                  paid={paid}
                  handleDownloadConfirm={handleDownloadConfirm}
                >
                  <img
                    src={thumb}
                    alt="canvas"
                    height="80%"
                    width="80%"
                    style={{
                      marginBottom: "50px",
                      border: "1px solid #2d3559",
                    }}
                  />
                </DownloadCustomPopup>

                <ShareCustomPopup
                  onClose={popupCloseHandler}
                  show={showPopup}
                  title="Share Your Free Design!"
                  viewUrl={urlView}
                >
                  <img
                    src={thumb}
                    alt="canvas"
                    height="80%"
                    width="80%"
                    style={{
                      boxShadow: "20px 20px 50px grey",
                      marginBottom: "50px",
                    }}
                  />
                </ShareCustomPopup>

                {showActivateEmailPopup && (
                  <ActivateEmailPopup
                    show={showActivateEmailPopup}
                    onClose={emailPopUpClose}
                  />
                )}
                <DownloadTooltip
                  title="Download"
                  placement="bottom-end"
                  enterDelay={1000}
                >
                  <IconWrapper
                    hasActiveObject={hasActiveObject}
                    onClick={(e: any) => {
                      if (getComposition(canvas).objects.length >= 2) {
                        const loginData: any = localStorage.getItem("user");
                        const data = JSON.parse(loginData);
                        let res = data.POST_users_login
                          ? data.POST_users_login.emailVerified
                          : data.emailVerified;

                        if (res !== true) {
                          console.log(res);
                          setShowActivateEmailpopup(true);
                          //return;
                        } else {
                          setShowDownpopup(!showDownPopup);
                          setThumb(
                            canvas.toDataURL({ format: "jpeg", quality: 0.5 })
                          );
                          setDownloadClick(true);
                        }
                      } else {
                        toast.error(
                          "Please Add another image or text to complete your design"
                        );
                      }
                    }}
                  >
                    <Download
                      style={{
                        color:
                          hasActiveObject === false ? "#8c90aa" : "#F0ECF5",
                        height: "25px",
                        width: "25px",
                      }}
                    />
                    <SaveText
                      style={{
                        color:
                          hasActiveObject === false ? "#8c90aa" : "#F0ECF5",
                      }}
                    >
                      Download
                    </SaveText>
                  </IconWrapper>
                </DownloadTooltip>
              </ImgHeaders>
            )}
          </>
        )}
        {isAdmin && <AdminWorkspace />}
      </WorkspaceHeader>
      <ResizeComponent
        open={open}
        resizeTitle={resizeTitle}
        handleOpen={(val) => handleOpen(val)}
        setCanvasDim={(val1, val2, val3, val4) =>
          setCanvasDim(val1, val2, val3, val4)
        }
      />
      {canvasSizeChange && <CanvasSizeChangepopup handleClose={canvaschange} />}

      <ToastContainer position="top-center" />
    </>
  );
};
