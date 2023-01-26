import { useMutation, useQuery } from "@apollo/client";
import _ from "lodash";
import React, { FC, useEffect, useState, useRef, useContext } from "react";
//import { DragImgOnCanvas } from "@wbm-npm/dw-canvas";
// import Loader from "react-js-loader";CSSProperties
// import { useDrag } from "react-dnd";
// import { fabric } from "fabric";
import styled from "styled-components";
//import { DragImgOnCanvas } from "@wbm-npm/dw-canvas";
//import { phrasesData } from "./phrases";
import { SearchInput } from "./../../../../components/searchInput";
import { animation } from "./AnimationText/animation";
import { ActiveEditorContext } from "../../../../components/layout/private";
import { UploadPopUp } from "./UploadPopUp";
import { BrowseCategoriesPopup } from "./browseCategoriesPopUp";
import { ReactComponent as UpArrow } from "../../../../assets/svg/up-arrow-black.svg";
// import { Transition } from 'react-transition-group';f
import "./leftSidePanel.css";
import load from "../../../../assets/load.gif";
import { motion, AnimatePresence } from "framer-motion";
// import { Transition } from 'react-transition-group';
import { addTemplate } from "./AddTemplate";
import { VideoService } from "./AnimatedCanvas/VideoService";
import {
  AddFavourite,
  GetUserUpload,
  UploadFont,
  GetFont,
  DeleteFont,
  DeleteFavourite,
  GetFileV2,
  ImageSearch,
  TemplateSearch,
  TextBlockSearch,
  UploadImage,
  UserFavourites,
  VideoText,
} from "./../../../../lib/contexts/Queries";
import { fontss } from "./fonts";
import "./fonts.css";
//import { ItemTypes } from "./../../../../lib/canvas/common";
// import {CloudUpload} from '@material-ui/icons';
//const fabric = require("fabric").fabric;
//import { VideoListWrapper } from "./videoList";
import { ReactComponent as Delete } from "./../../../../assets/svg/bin.svg";
import { toast } from "react-toastify";
// import { flexbox } from "@mui/system";
// import { data } from "cypress/types/jquery";
// import Dialog from "@material-ui/core/Dialog";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import CloseIcon from "@material-ui/icons/Close";
//import { VideoListWrapper } from "./videoList";
//import _ from "lodash";
import { VideoListWrapper } from "./videoList";
//import {animation} from './AnimationText/animation'
export interface ImageProps {
  name: string;
  canvas: any;
  src: string;
  src2: string;
  addImg: any;
  addText: any;
  addSvg: any;
  selected: string;
  setSelected: any;
  onAddCircle: any;
  SvgCheck: any;
  addLine: any;
  addPhrase: any;
  onAddRectangle: any;
  addTriangle: any;
  addVideo: any;
  getComposition: any;
  ImageKeys: any;
  imageKeysArray: any;
  addVideoText: any;
}

// interface DropResult {
//   name: string;
// }
// const style: CSSProperties = {
//   cursor: "move",
// };

const PanelContainer = styled(motion.div)`
  background-color: #212741;
  height: 100%;
`;

const PanelInnerContainer = styled.div`
  position: relative;
  height: 100%;
  max-width: 0;
  min-width: 0;
  width: 0;
  transition: max-width 0.3s ease-in-out, min-width 0.3s ease-in-out;
  max-width: 300px;
  min-width: 300px;
`;

const PanelSwitch = styled(motion.div)`
  position: absolute;
  right: -15px;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 15px;
  border-radius: 0 8px 8px 0;
  height: 60px;
  background-color: #212741;
  z-index: 3;
  cursor: pointer;
`;
// const duration = 1000;

// const leftSidePanelStyle = styled.div`
// transition: width ${duration}ms;
// `;
const PanelSwitchCarret = styled.div`
  position: absolute !important;
  top: 0;
  bottom: 0;
  right: 6px;
  margin: auto;
  width: 4px;
  height: 4px;
  position: relative;
  border: solid #fbfbff;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 2px;
  transform: rotate(-45deg);
  transition: transform 0.3s ease, right 0.3s ease;
`;

const PanelSwitchOpenCarret = styled.div`
  position: absolute !important;
  top: 0;
  bottom: 0;
  right: 2px;
  margin: auto;
  width: 4px;
  height: 4px;
  border: solid #fbfbff;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 2px;
  transform: rotate(135deg);
  transition: transform 0.3s ease, right 0.3s ease;
`;

const AssetsList = styled.div`
  display: block;
  height: 100%;
`;

const AssetsInnerList = styled.div`
  height: 100%;
  position: relative;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: -ms-flex;
  display: flex;
  -webkit-flex-direction: column;
  -moz-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
`;

const AssetsHeader = styled.header`
  z-index: 0;
  position: relative;
`;

const AssetsHeaderInner = styled.div`
  margin: 10px;
  width: 90%;
  font-size: 0.6em;
  outline: 0 none;
  cursor: pointer;
  color: #fff;
  font-size: 12px;
  position: relative;
`;

const AssetsHeaderBtnContainer = styled.div`
  width: 100%;
  margin: 0;
  display: inline-block;
  width: 280px;
  height: 49px;
`;

const AssetsHeaderBtn = styled.button`
  transition: ease-in-out 0.3s;
  color: white !important;
  color: #f0ecf5 !important;
  outline: none !important;
  border: 1px solid #f0ecf5 !important;
  padding: 7px;
  background-color: transparent;
  background-image: linear-gradient(
    30deg,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0),
    rgba(13, 13, 13, 0),
    rgba(38, 38, 38, 0)
  );
  transition: border 0.3s ease, background-color 0.3s ease;
  min-height: 50px;
  min-width: 125px;
  border-radius: 3px;
  width: 100%;
  position: relative;
  overflow: hidden;
  z-index: 1 !important;
  transition: color 0.3s ease-in-out;
  font-size: 18px;
  font-family: inherit;
`;

const AssetsListController = styled.div`
  overflow: hidden;
  position: relative;
  transition: opacity 0.5s linear;
  &:hover {
    ::-webkit-scrollbar {
      width: 12px;
    }
    ::-webkit-scrollbar-track {
      background-color: #c0c0c0;
    }
    ::-webkit-scrollbar-thumb {
      background: #696969;
      border-radius: 6px;
      height: 20px;
      background-color: #c0c0c0;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #696969;
    }
    overflow-y: overlay;
  }
`;
const TemplateControl = styled.div`
  position: relative;
  transition: opacity 0.5s linear;
  margin: 0px 4px;
  height: 66vh;
  overflow: hidden;
  &:hover {
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background-color: #c0c0c0;
    }
    ::-webkit-scrollbar-thumb {
      background: #696969;
      border-radius: 6px;
      height: 20px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #696969;
    }
    overflow-y: overlay;
  }
`;

const VideoTemplateControl = styled.div`
  position: relative;
  transition: opacity 0.5s linear;
  margin: 0px 4px;
  height: 80vh;
  overflow: hidden;
  &:hover {
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background-color: #c0c0c0;
    }
    ::-webkit-scrollbar-thumb {
      background: #696969;
      border-radius: 6px;
      height: 20px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #696969;
    }
    overflow-y: overlay;
  }
`;
const ImageControl = styled.div`
  position: relative;
  transition: opacity 0.5s linear;
  margin: 0px 4px;
  height: 80vh;
  overflow: hidden;
  &:hover {
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background-color: #c0c0c0;
    }
    ::-webkit-scrollbar-thumb {
      background: #696969;
      border-radius: 6px;
      height: 20px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #696969;
    }
    overflow-y: overlay;
  }
`;
const AssetsListResultScroller = styled.div`
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: -ms-flex;
  display: flex;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-justify-content: space-around;
  -moz-justify-content: space-around;
  -ms-justify-content: space-around;
  justify-content: space-around;
  -webkit-flex-wrap: wrap;
  -moz-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin: 0 10px;
  overflow: hidden;
`;

const AssetsListResultScrollerTemplate = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  overflow: hidden;
  padding-right: 4px;
`;

// const TempData = styled.div`
// cursor: pointer;
// display: -webkit-flex;
// display: -moz-flex;
// display: -ms-flexbox;
// display: -ms-flex;
// display: -webkit-box;
// display: -webkit-flex;
// display: -ms-flexbox;
// display: flex;
// -webkit-align-items: center;
// -moz-align-items: center;
// -ms-align-items: center;
// -webkit-align-items: center;
// -webkit-box-align: center;
// -ms-flex-align: center;
// align-items: center;
// margin: 7px;
// position: relative;
// text-align: center;
// min-width: 70px;
// min-height: 55px;
// -webkit-box-pack: center;
// -webkit-justify-content: center;
// -ms-flex-pack: center;
// justify-content: center;
// `;

const Loaders = styled.div`
margin: 24px;
  width: 30px;
  height: 30px;
  border-radius: 40px;
  background: rgba(230,230,232,0.5);
  position: relative;
  position: absolute;
  bottom:620px;
  margin: auto;
  display: block;
  left: 43%;
  justify-content: center;
  z-index: 999;
  -webkit-transition: .4s;
  transition: .4s;
  animation: zoom-in-zoom-out 2s ease infinite;
}

@keyframes zoom-in-zoom-out {
  0% {
    transform: scale(1, 1);
    background:white;
  }
  30% {
    transform: scale(1,1);
    background:rgba(230,230,232,0.5);
  }
  50% {
    transform: scale(1.3, 1.3);
    background:white;
    opacity:0.7

  }
  70% {
    transform: scale(1.5, 1.5);
    background:rgba(230,230,232,0.5);
  }
  100% {
    transform: scale(0.5,0.5);
    background:white;
  }
`;

const AssetsContainer = styled.div`
  flex: 1;
`;

const AssetsListItem = styled.div`
  display: inline-block;
  width: 100%;
`;

const Textdiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;
const H3 = styled.h3`
  padding: 5px 25px 0 25px;
  font-weight: bold;
  font-size: 16px;
  text-transform: capitalize;
  cursor: default;
  margin-right: 109px;
`;

const HeadingDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Lato;
  padding: 24px 0 0 0;
  margin: 20px;
  border-top: 1px solid #e8e8e9;
`;

const TextButton = styled.span`
  padding: 5px;
  border: 1px solid #e1e2e3;
  background-color: #e1e2e3;
  font-size: 14px;
  color: #303d4e;
  width: 100%;
  text-align: center;
`;

const RectangleFilled = styled.div`
  width: 70px;
  height: 40px;
  background: #e6e6e8;
  margin-bottom: 40px;
`;

const Line = styled.hr`
  border: 2px solid #e6e6e8;
  width: 70px;
  height: 0px;
  margin-bottom: 40px;
  margin-left: 0;
`;

const CircleFilled = styled.div`
  width: 70px;
  height: 70px;
  background: #e6e6e8;
  border-radius: 50%;
  margin-bottom: 40px;
  cursor: pointer;
`;

const TriangleFilled = styled.div`
  width: 0;
  height: 0;
  border-left: 35px solid transparent;
  border-right: 35px solid transparent;
  border-bottom: 35px solid #e6e6e8;
  margin-bottom: 40px;
`;

const RectangleOutLine = styled.div`
  width: 70px;
  height: 40px;
  border: 3px solid #e6e6e8;
  margin-bottom: 40px;
`;

const CircleOutLined = styled.div`
  width: 70px;
  height: 70px;
  border: 3px solid #e6e6e8;
  border-radius: 50%;
  margin-bottom: 40px;
`;

const TriangleOutLined = styled.div`
  width: 0;
  height: 0;
  border-left: 35px solid transparent;
  border-right: 35px solid transparent;
  border-bottom: 35px solid #e6e6e8;
  margin-bottom: 40px;
`;

const InnerTriangle = styled.div`
  position: relative;
  top: -7px;
  left: -12px;
  width: 0;
  height: 0;
  border-top: 25px solid transparent;
  border-bottom: 25px solid transparent;
  border-right: 25px solid #212741;
  transform: rotate(90deg);
`;

const FontsDiv = styled.div`
  display: block;
  width: 100%;
  margin-left: 20px;
  margin-right: 20px;
  height: 25vh;
`;

const FontsScrollDiv = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
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

const PhrasesDiv = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 2;
  margin-left: -15px;
  margin-right: 22px;
  justify-content: space-between;
`;
const OutPhrasesDiv = styled.div`
  color: #ffffff;
  padding: 10px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  cursor: pointer;
`;

const FontsP = styled.div`
  color: rgba(251, 251, 255, 0.7);
  fontsize: "1.1em";
  border-bottom: 1px dashed rgba(251, 251, 255, 0.7);
  padding-bottom: 10px;
  max-width: 100%;
  display: block;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    color: #fbfbff;
  }
`;

const PriceTagOuterDiv = styled.div`
  position: absolute;
  bottom: 0px;
  right: 4px;
  z-index: 2;
  height: 17px;
  text-align: right;
  opacity: 0;
  cursor: pointer;
`;
const ImagePriceDiv = styled.div`
  position: absolute;
  bottom: -47px;
  right: 4px;
  z-index: 2;
  height: 17px;
  text-align: right;
  opacity: 0;
  cursor: pointer;
`;

const PriceTagInnerDiv = styled.div`
  padding: 1px 4px;
  font-size: 0.65em;
  color: #232428;
  background-color: rgba(47, 198, 192, 0.85);
  display: inline-block;
  border-radius: 10px;
  text-transform: capitalize;
  font-weight: bold;
  height: 17px;
  vertical-align: top;
  transition: 0.3s background-color linear;
`;

const FavouritesIconDiv = styled.div`
  height: 20px !important;
  width: 20px !important;
  -webkit-border-radius: 20px;
  cursor: pointer;
  background-color: #5442a0;
  opacity: 0;
  transition: opacity 0.5s linear;
  position: absolute;
  top: 0px;
  right: 0px;
`;

const DeleteIconDiv = styled.div`
  height: 21px !important;
  width: 21px !important;
  align-items: center;
  -webkit-border-radius: 20px;
  cursor: pointer;
  background-color: #5442a0;
  opacity: 0;
  transition: opacity 0.5s linear;
  position: relative;
  top: -100px;
  right: -100px;
`;

const EditDiv = styled.div`
  height: 17px !important;
  width: 42px !important;
  -webkit-border-radius: 20px;
  cursor: pointer;
  background-color: #5442a0;
  opacity: 0;
  transition: opacity 0.5s linear;
  position: absolute;
  bottom: 4px;
  right: 26px;
  border-radius: 10px;
  color: #fbfbff;
  font-size: 0.5em;
`;

const AssetsListItemFigure = styled.figure`
  cursor: pointer;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: -ms-flex;
  display: flex;
  -webkit-align-items: center;
  -moz-align-items: center;
  -ms-align-items: center;
  align-items: center;
  margin: 7px;
  position: relative;
  text-align: center;
  min-width: 70px;
  min-height: 55px;
  justify-content: center;
  &:hover ${PriceTagOuterDiv} {
    opacity: 1;
  }
  &: hover ${ImagePriceDiv} {
    opacity: 1;
  }
  &: hover ${FavouritesIconDiv} {
    opacity: 1;
  }
  &: hover ${EditDiv} {
    opacity: 1;
  }
`;
const TemplateFigure = styled.figure`
  cursor: pointer;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: -ms-flex;
  display: flex;
  -webkit-align-items: center;
  -moz-align-items: center;
  -ms-align-items: center;
  align-items: center;
  margin: 7px;
  position: relative;
  text-align: center;
  min-width: 70px;
  min-height: 55px;
  &:hover ${PriceTagOuterDiv} {
    opacity: 1;
  }
  &: hover ${ImagePriceDiv} {
    opacity: 1;
  }
  &: hover ${FavouritesIconDiv} {
    opacity: 1;
  }
  &: hover ${EditDiv} {
    opacity: 1;
  }
`;

const VideoHover = styled.div`
  height: 20px !important;
  width: 20px !important;
  -webkit-border-radius: 20px;
  cursor: pointer;
  position: absolute;
  top: 0px;
  right: 8px;
  &:hover ${FavouritesIconDiv} {
    opacity: 1;
  }
  &:hover ${PriceTagOuterDiv} {
    opacity: 1;
  }
  &:hover ${ImagePriceDiv} {
    opacity: 1;
  }
`;
const UploadDiv = styled.div`
  display: block;
  border-bottom: 1px solid #b1b1b7;
  padding-bottom: 10px;
  width: 100%;
  margin: 0 auto 20px;
  height: 132px;
`;

const UploadInnerDiv = styled.div`
  border-radius: 50%;
  margin: auto;
  position: relative;
  width: 42%;
  border: 1px dashed #e87855;
  cursor: pointer;
  height: 120px;
  top: 10px;
`;

const UploadImg = styled.img`
  position: relative;
  top: 15px;
  left: 40px;
`;

const UploadPara = styled.p`
  color: #e87855;
  font-size: 0.75em;
  position: relative;
  top: -6px;
  left: 0px;
  text-align: center;
`;
const UploadSpan = styled.span`
  color: #e6e6e8;
  font-size: "0.75em";
`;

const FavouritesDiv = styled.div`
  margin-top: 20px;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex: 2;
  flex-wrap: wrap;
`;

const FavouritesInnerDiv = styled.div`
  margin-bottom: 10px;
  &: hover ${DeleteIconDiv} {
    opacity: 1;
  }
`;

const ImgUpload = styled.input`
  opacity: 0;
  position: absolute;
  left: 3px;
  top: 0;
  z-index: 1;
  width: 111px;
  height: 124px;
  cursor: pointer;
`;

const FontInput = styled.input`
  opacity: 0;
  position: absolute;
  z-index: 111;
  left: 1px;
  top: 3px;
  width: 65px;
  height: 53px;
  cursor: pointer;
`;

const UploadImgDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  //overflow-y: scroll;
  height: 300px;
  flex-direction: row;
`;

const UploadImages = styled.img`
  max-width: 100px;
  min-width: 20px;
  min-height: 20px;
  margin: -12px 10px 20px 10px;
`;

const AddTextx = styled.h4`
  margin: -7px 25px 8px 25px;
  font-size: 1em;
`;

const UploadFontDiv = styled.div`
  position: absolute;
  right: 20px;
  top: 15px;
  text-align: center;
  cursor: pointer;
`;

const UploadArrow = styled.img`
  color: #e87855;
  height: 40px;
  width: 40px;
`;

const AddHeadingDiv = styled.div`
  height: 23px;
  width: 140px;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const AddSubHeading = styled.div`
  height: 20px;
  width: 154px;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const AddPara = styled.div`
  height: 12px;
  width: 91px;
  font-size: 14px;
  margin-bottom: 20px;
`;
const Loading = styled.img`
  //height: 100px;
  object-fit: contain;
  height: 40px;
  width: 40px;
  margin-left: 75%;
  display: inline;
`;
const DeleteSpan = styled.span`
  float: right;
  margin-right: 15%;
  cursor: pointer;
`;

const VideoTextDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  height: 81vh;
  width: 95%;
  margin: 10px;
  justify-content: space-between;
  overflow: hidden;
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

export const LeftSidePanel: FC<any> = function Box({
  name,
  canvas,
  src,
  src2,
  addImg,
  addText,
  addSvg,
  selected,
  setSelected,
  onAddCircle,
  SvgCheck,
  addLine,
  addPhrase,
  onAddRectangle,
  addTriangle,
  addVideo,
  videoList,
  setVideoList,
  setCurrentPlayingVideoId,
  getComposition,
  ImageKeys,
  imageKeysArray,
  clippingWidth,
  clippingHeight,
  addVideoText,
  resizeTitleId,
  resizeTitle,
  PanelSwitchClicked,
  categoryId,
}) {
  const [showPanel, setShowPanel] = useState(true);
  const [searchedValue, setSearchedValue] = useState("");
  const activeEditorContext = useContext(ActiveEditorContext);
  // const [{ isDragging }, drag] = useDrag(() => ({
  //   type: ItemTypes.BOX,
  //   item: { name, canvas, src },
  //   end: (item, monitor) => {
  //     const dropResult = monitor.getDropResult<DropResult>();
  //     if (item && dropResult) {
  //       fabric.Image.fromURL(src, (img) => {
  //         img.scale(0.75);
  //         if (canvas !== undefined) {
  //           canvas.canvas.add(img);
  //           canvas.canvas.centerObject(img);
  //           canvas.canvas.setActiveObject(img);
  //           canvas.canvas.renderAll();
  //         }
  //       });
  //     }
  //   },
  //   collect: (monitor) => ({
  //     isDragging: monitor.isDragging(),
  //     handlerId: monitor.getHandlerId(),
  //   }),
  // }));
  let call2 = false;
  const getVideoText = useQuery(VideoText, {
    variables: {
      filter: '{"where":{"active":1},"order":"displayOrder ASC"}',
      token: `${localStorage.getItem("token")}`,
    },
    skip: call2,
  });
  //---------------Favourites Data ----------------------
  const favData = useQuery(UserFavourites, {
    variables: {
      token: `${localStorage.getItem("token")}`,
      filter: `${
        activeEditorContext === "video"
          ? `{"where":{"or":[{"favoriteType":"videos"},{"favoriteType":"videoTemplates"}]},"offset":0,"limit":30,"order":"id DESC"}`
          : `{"where":{"or":[{"favoriteType":"images"},{"favoriteType":"templates"}]},"offset":0,"limit":30,"order":"id DESC"}`
      }`,
    },
  });
  if (favData.loading) {
    <>"loading..."</>;
  }
  if (favData.error) {
    <>`Error! ${favData.error.message}`</>;
  }
  //---------------Getting Upload Data ---------------------------------------
  const getUpload = useQuery(GetUserUpload, {
    variables: {
      token: `${localStorage.getItem("token")}`,
    },
    skip: selected !== "upload",
  });
  if (getUpload.loading) {
    <>"loading..."</>;
  }
  if (getUpload.error) {
    <>`Error! ${getUpload.error.message}`</>;
  }

  const [imageData, imgData] = useMutation(ImageSearch);
  // eslint-disable-next-line no-redeclare
  const [templateData, temData] = useMutation(TemplateSearch);
  const [textBlock, blockData] = useMutation(TextBlockSearch);
  const [addFav] = useMutation(AddFavourite);
  const [deleteFav] = useMutation(DeleteFavourite);
  const [uploadImg] = useMutation(UploadImage);
  const [uploadFont] = useMutation(UploadFont);
  const [deletesFont] = useMutation(DeleteFont);
  //const [favData,setFavData] = useState([])
  // eslint-disable-next-line
  const [isOpen, setIsOpen] = useState(false);
  const [isBrowseOpen, setIsBrowseOpen] = useState(false);
  const [tempData, setTempData] = useState([] as any);
  const [tempVidData, setTempVidData] = useState([] as any);
  const [videos, setVideos] = useState([] as any);
  const [images, setImages] = useState([] as any);
  const [isMust, setIsMust] = useState(true);
  // const [templates, setTemplates] = useState([] as any);
  // const [vidTemplate, setVidTemplate] = useState([] as any);
  const [fontsBtn, setFontsBtn] = useState(true);
  const [base, setFileBase] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [v2FileData, setV2File] = useState({
    _id: "",
    _index: "",
    _source: { originalFileType: "" },
  });
  const [fontsData, setFontsData] = useState([] as any);
  const [isSvg, setisSvg] = useState(false);
  const [textPage, setTextPage] = useState([0, 20]);
  const [textBlockFilter, setTextBlockFilter] = useState(
    `{"from":${textPage[0]},"size":${textPage[1]},"body":{}}`
  );
  const [imgPage, setImgPage] = useState(0);
  const [vidPage, setVidPage] = useState(0);

  const [vidFilter, setVidFilter] = useState(
    `{"page":${vidPage},"library":"wbmvideo","resultsPerPage":45}`
  );
  const [imgFilter, setImgFilter] = useState(
    `{"page":${imgPage},"resultsPerPage":45}`
  );
  const [templatePage, setTemplatePage] = useState(0);
  const [vidTemplatePage, setVidTemplatePage] = useState(0);
  const [templateFilter, setTemplateFilter] = useState(
    `{"from":${templatePage},"size":20,"body":{"query":{"bool":{"must":[{"terms":{"categoryId":[${categoryId}]}}]}},"sort":[{"starRating":"desc"},{"createdAt":"desc"}]}}`
  );
  const [searchTemp, setSearchTemp] = useState(
    `{"from":${templatePage},"size":20,"body":{"query":{"bool":{"must":[{"terms":{"categoryId":[${categoryId}]}}]}},"sort":[{"starRating":"desc"},{"createdAt":"desc"}]}}`
  );
  const [vidTemplateFilter, setVidTemplateFilter] = useState(
    `{"from":${vidTemplatePage},"size":20,"body":{"query":{"bool":{"must":[{"terms":{"categoryId":[13]}}]}},"sort":[{"starRating":"desc"},{"createdAt":"desc"}]}}`
  );
  const [searchVidoFilter, setSearchVidoFilter] = useState(
    `{"from":${vidTemplatePage},"size":20,"body":{"query":{"bool":{"must":[{"terms":{"categoryId":[13]}}]}},"sort":[{"starRating":"desc"},{"createdAt":"desc"}]}}`
  );
  const textBlockScroll = useRef<HTMLDivElement>(null);
  const imageScroll = useRef<HTMLDivElement>(null);
  const videoScroll = useRef<HTMLDivElement>(null);
  const imgTempScroll = useRef<HTMLDivElement>(null);
  const vidTempScroll = useRef<HTMLDivElement>(null);

  const getPrice = (id: any) => {
    //We are stringifying the object because 4k is the key of price object and object keys
    //starting with numbers are not allowed in JS
    let originalPrice = id._source.price;
    const price = JSON.stringify(id._source.price);
    let finalPrice: any;
    if (id._source.is4k) {
      finalPrice = price.split("4k")[1].substring(2, 7);
    } else {
      finalPrice = originalPrice.sd === 0 ? "Free" : originalPrice.sd;
    }
    return finalPrice;
  };
  //-------------------------------GetFonts------------------------------------------
  const getFonts = useQuery(GetFont, {
    variables: {
      token: `${localStorage.getItem("token")}`,
    },
  });
  if (getFonts.error) console.log("Error..");
  if (getFonts.loading) console.log("Loading");

  const onTextBlockScroll = () => {
    if (textBlockScroll.current) {
      const { scrollTop, scrollHeight, clientHeight } = textBlockScroll.current;
      if (scrollTop + clientHeight + 20 >= scrollHeight / 2) {
        setTextPage((oldValue: any) => {
          const newValue1 = oldValue[0] + 20;
          const newValue2 = oldValue[1];
          return [newValue1, newValue2];
        });
      }
    }
  };

  useEffect(() => {
    const data: any = localStorage.getItem("user");
    const paidUser = data
      .split("paidSubscriber")[1]
      .split(",")[0]
      .includes("false");
    if (!paidUser) {
      setIsPaid(true);
    }
  }, []);
  const toggleBrowsePopUp = () => {
    setIsBrowseOpen(!isBrowseOpen);
  };
  const onImgSroll = () => {
    if (imageScroll.current) {
      const { scrollTop, scrollHeight, clientHeight } = imageScroll.current;
      if (scrollTop + clientHeight + 1 >= scrollHeight) {
        setImgPage((oldValue: any) => {
          const newValue = oldValue + 1;
          return newValue;
        });
      }
    }
  };

  const onVidScroll = () => {
    if (videoScroll.current) {
      const { scrollTop, scrollHeight, clientHeight } = videoScroll.current;
      if (scrollTop + clientHeight + 1 >= scrollHeight) {
        setVidPage((oldValue: any) => {
          const newValue = oldValue + 1;
          return newValue;
        });
      }
    }
  };

  const onImgTemp = () => {
    if (imgTempScroll.current) {
      const { scrollTop, scrollHeight, clientHeight } = imgTempScroll.current;
      if (scrollTop + clientHeight + 1 >= scrollHeight) {
        setTemplatePage((oldValue: any) => {
          const newValue = oldValue + 20;
          return newValue;
        });
      }
    }
  };
  const onVidTempSroll = () => {
    if (!searchedValue && vidTempScroll.current) {
      const { scrollTop, scrollHeight, clientHeight } = vidTempScroll.current;
      if (scrollTop + clientHeight + 1 >= scrollHeight) {
        setVidTemplatePage((oldValue: any) => {
          const newValue = oldValue + 20;
          return newValue;
        });
      }
    }
  };

  //---------------Images Data ------------------------------------------
  let getVidFilter = (filters: any) => {
    if (selected === "videos") {
      setVidFilter(filters);
      setVideos([]);
    } else {
      setImgFilter(filters);
      setImages([]);
    }
  };
  let getTextBlockFilter = (filter: any) => {
    setTextBlockFilter(filter);
    setFontsData([]);
  };
  useEffect(() => {
    getTextBlock();
  }, [textBlockFilter]);

  useEffect(() => {
    getImageData();
    //setVideos([]);
    //setImages([]);
  }, [vidFilter, imgFilter]);

  const getImageData = async () => {
    const data = await imageData({
      variables: {
        input: `${selected === "videos" ? vidFilter : imgFilter}`,
        token: `${localStorage.getItem("token")}`,
      },
    });
    console.log(imgData);
    if (imgData.loading) return <>"loading..."</>;
    if (imgData.error) return <>`Error! ${imgData.error.message}`</>;
    else {
      console.log("data" + imgData);
      let finalData = JSON.parse(data.data.POST_assets_search);
      if (finalData.hits !== null && selected === "image") {
        let imgsData = finalData.hits.hits.filter(
          (item: any) => item._source.thumb && item._source.thumb !== null
        );
        console.log(imgsData);
        if (images) {
          setImages((old: any[]) => {
            return [...old, ...imgsData];
          });
        } else {
          setImages(imgsData);
        }
      }
      if (selected === "videos") {
        let finalData = JSON.parse(data.data.POST_assets_search);
        let vidData = finalData.hits.hits.filter(
          (item: any) => item._source.thumb !== null
        );
        if (videos) {
          setVideos((old: any[]) => {
            return [...old, ...vidData];
          });
        } else {
          setVideos(finalData.hits.hits);
        }
      }
    }
  };

  //---------------Template Data -------------------------------------------
  const getTemplateFilter = (filters: any) => {
    if (selected === "template") {
      if (!searchedValue) {
        setTemplateFilter(filters);
      } else {
        setSearchTemp(filters);
      }
    } else {
      if (!searchedValue) {
        setVidTemplateFilter(filters);
      } else {
        setSearchVidoFilter(filters);
      }
    }
  };
  useEffect(() => {
    if (selected === "video-template") {
      getTempVidData();
    }
    if (selected === "template") {
      getTempData();
    }
  }, [templateFilter, vidTemplateFilter]);

  useEffect(() => {
    if (selected === "video-template" && searchedValue) {
      getVidoSearch();
    }
    if (selected === "template" && searchedValue) {
      getTempSearchData();
    }
  }, [searchTemp, searchVidoFilter]);

  //------------------------Templates --------------------------------------
  const getTempData = async () => {
    const data = await templateData({
      variables: {
        input: templateFilter,
        token: `${localStorage.getItem("token")}`,
      },
    });
    if (temData.loading) return <>"loading..."</>;
    if (temData.error) return <>`Error! ${temData.error.message}`</>;
    if (data) {
      let templatesData = data.data.POST_templates_search.templates;
      let totalData = data.data.POST_templates_search.total;
      if (templatesData !== null && selected === "template") {
        if (tempData.length > 0) {
          setTempData((old: any[]) => {
            return [...old, ...templatesData];
          });
        } else {
          if (totalData <= 20) {
            setTempData((old: any[]) => {
              return [...old, ...templatesData];
            });
            setIsMust(false);
            if (!searchedValue) {
              setTemplateFilter(
                `{"from":${templatePage},"size":20,"body":{"query":{"bool":{"must_not":[{"terms":{"categoryId":[10,11,12,13,${categoryId}]}}]}},"sort":[{"starRating":"desc"},{"createdAt":"desc"}]}}`
              );
            } else {
              setSearchTemp(
                `{"from":${templatePage},"size":20,"body":{"query":{"bool":{"must_not":[{"terms":{"categoryId":[10,11,12,13,${categoryId}]}}]}},"sort":[{"starRating":"desc"},{"createdAt":"desc"}]}}`
              );
            }
          } else {
            setIsMust(true);
            setTempData((old: any[]) => {
              return [...old, ...templatesData];
            });
          }
        }
      }
    }
  };

  const getTempSearchData = async () => {
    const data = await templateData({
      variables: {
        input: searchTemp,
        token: `${localStorage.getItem("token")}`,
      },
    });
    if (temData.loading) return <>"loading..."</>;
    if (temData.error) return <>`Error! ${temData.error.message}`</>;
    if (data && data.data.POST_templates_search.templates.length > 0) {
      let templatesData = data.data.POST_templates_search.templates;

      if (templatesData.length > 0 && selected === "template") {
        console.log("tempData.length > 0");
        setTempData((old: any[]) => {
          return [...templatesData];
        });
      }
    } else {
      setTempData([]);
    }
  };

  const getTempVidData = async () => {
    const data = await templateData({
      variables: {
        input: vidTemplateFilter,
        token: `${localStorage.getItem("token")}`,
      },
    });
    if (temData.loading) return <>"loading..."</>;
    if (temData.error) return <>`Error! ${temData.error.message}`</>;
    else {
      if (
        data.data.POST_templates_search.hits.length > 0 &&
        selected === "video-template"
      ) {
        let vidTemplatesData = data.data.POST_templates_search.hits;
        if (tempVidData.length > 0) {
          setTempVidData((old: any[]) => {
            return [...old, ...vidTemplatesData];
          });
        } else {
          setTempVidData(data.data.POST_templates_search.hits);
        }
      }
    }
  };

  const getVidoSearch = async () => {
    const data = await templateData({
      variables: {
        input: searchVidoFilter,
        token: `${localStorage.getItem("token")}`,
      },
    });
    if (temData.loading) return <>"loading..."</>;
    if (temData.error) return <>`Error! ${temData.error.message}`</>;
    console.log("DATTAAAA", data);
    if (data && data.data.POST_templates_search.hits.length > 0) {
      var vidTemplatesData = data.data.POST_templates_search.hits;
      if (vidTemplatesData.length > 0 && selected === "video-template") {
        setTempVidData((old: any[]) => {
          return [...vidTemplatesData];
        });
      }
    } else {
      setTempVidData([]);
    }
    console.log("vidTemplatesData", vidTemplatesData);
  };

  //---------------TextBlock Data ------------------------------------------
  const getTextBlock = async () => {
    const data = await textBlock({
      variables: {
        input: textBlockFilter,
        token: `${localStorage.getItem("token")}`,
      },
    });
    if (blockData.loading) return <>"loading..."</>;
    if (blockData.error) return <>`Error! ${blockData.error.message}`</>;
    else {
      /* eslint-disable-next-line */
      console.log(data);
      if (fontsData) {
        const old = fontsData;
        setFontsData([...old, ...data.data.POST_textBlocksSearch.textBlocks]);
      } else {
        setFontsData(data.data.POST_textBlocksSearch.textBlocks);
      }
    }
  };
  //---------------Add Favourite Data ------------------------------------------
  const addFavourite = async (itemid: string) => {
    await addFav({
      variables: {
        token: `${localStorage.getItem("token")}`,
        input: {
          userId: `${localStorage.getItem("userId")}`,
          folders: ["All"],
          itemId: itemid,
          favoriteType: selected === "videos" ? "videos" : "images",
          source: "dw",
        },
      },
    }).then(() => {
      if (selected === videos) {
        toast.success("Images added to your favourites");
      } else {
        toast.success("Videos added to your favourites ");
      }
      favData.refetch();
    });
  };
  //---------------Delete Favourite Data ----------------------------------------
  const delFav = async (id: string) => {
    await deleteFav({
      variables: {
        token: `${localStorage.getItem("token")}`,
        id: id,
      },
    }).then(() => {
      toast.success("Favourites Deleted");
      favData.refetch();
    });
  };
  //---------------UseEffect to fetch Data ------------------------------------
  useEffect(() => {
    if (selected === "image") {
      getImageData();
    }
    // if (selected === "template") {
    //   getTempData();
    // }
    // if (selected === "text") {
    //   getTextBlock();
    // }
    // if (selected === "video-template") {
    //   getTempVidData();
    // }
    if (selected === "videos") {
      getImageData();
    }
  }, [selected]);

  useEffect(() => {
    getTextBlock();
  }, [textPage]);

  useEffect(() => {
    setImgFilter(() => `{"page":${imgPage},"resultsPerPage":45}`);
  }, [imgPage]);

  useEffect(() => {
    setVidFilter(
      () => `{"page":${vidPage},"library":"wbmvideo","resultsPerPage":45}`
    );
  }, [vidPage]);

  useEffect(() => {
    if (!searchedValue) {
      setTemplateFilter(
        () =>
          `{"from":${templatePage},"size":20,"body":{"query":{"bool":{"${
            isMust ? "must" : "must_not"
          }":[{"terms":{"categoryId":[${
            isMust ? "" : "10,11,12,13,"
          }${categoryId}]}}]}},"sort":[{"starRating":"desc"},{"createdAt":"desc"}]}}`
      );
    } else {
      setSearchTemp(
        () =>
          `{"from":${templatePage},"size":20,"body":{"query":{"bool":{"${
            isMust ? "must" : "must_not"
          }":[{"terms":{"categoryId":[${
            isMust ? "" : "10,11,12,13,"
          }${categoryId}]}}]}},"sort":[{"starRating":"desc"},{"createdAt":"desc"}]}}`
      );
    }
  }, [templatePage]);

  useEffect(() => {
    setTempData([]);
    setTemplatePage(0);
    setIsMust(true);
    if (!searchedValue) {
      setTemplateFilter(
        () =>
          `{"from":${templatePage},"size":20,"body":{"query":{"bool":{"must":[{"terms":{"categoryId":[${categoryId}]}}]}},"sort":[{"starRating":"desc"},{"createdAt":"desc"}]}}`
      );
    } else {
      setSearchTemp(
        () =>
          `{"from":${templatePage},"size":20,"body":{"query":{"bool":{"must":[{"terms":{"categoryId":[${categoryId}]}}]}},"sort":[{"starRating":"desc"},{"createdAt":"desc"}]}}`
      );
    }
  }, [categoryId]);

  useEffect(() => {
    if (!searchedValue) {
      setVidTemplateFilter(
        () =>
          `{"from":${vidTemplatePage},"size":20,"body":{"query":{"bool":{"must":[{"terms":{"categoryId":[13]}}]}},"sort":[{"starRating":"desc"},{"createdAt":"desc"}]}}`
      );
    } else {
      setSearchVidoFilter(
        () =>
          `{"from":${vidTemplatePage},"size":20,"body":{"query":{"bool":{"must":[{"terms":{"categoryId":[13]}}]}},"sort":[{"starRating":"desc"},{"createdAt":"desc"}]}}`
      );
    }
  }, [vidTemplatePage]);

  //---------------Upload File ----------------------------------------
  useEffect(() => {
    PanelSwitchClicked();
  }, [showPanel]);

  const fileUpload = (e: any, cb: any) => {
    let file = e.target.files[0];
    console.log(file);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      /* eslint-disable-next-line */
      console.log("Error: ", error);
    };
  };
  useEffect(() => {
    if (base !== "" && selected === "upload") {
      uploadFile(base);
    } else if (base !== "" && selected === "text") {
      uploadFonts(base);
    }
  }, [base]);

  const uploadFonts = (base: string) => {
    const func = async () => {
      const res = await uploadFont({
        variables: {
          token: `${localStorage.getItem("token")}`,
          input: JSON.stringify({
            extension: "ttf",
            file: base,
          }),
        },
      });
      return res;
    };
    func().then((data) => {
      if (data) {
        global.window.alert("Font uploaded succesfully");
        setFileBase("");
        getFonts.refetch();
      }
    });
  };

  const uploadFile = (base: string) => {
    const func = async () => {
      const res = await uploadImg({
        variables: {
          token: `${localStorage.getItem("token")}`,
          input: {
            base64: base,
          },
        },
      });
      return res;
    };
    func().then((data) => {
      if (data) {
        getUpload.refetch();
        global.window.alert("image uploaded succesfully");
        setFileBase("");
      }
    });
  };
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  //-------------------------Delete Font----------------------------------------

  const deleteFont = (font: string) => {
    deletesFont({
      variables: {
        token: `${localStorage.getItem("token")}`,
        input: font,
      },
    }).then(() => {
      global.window.alert("Font deleted succesfully");
      getFonts.refetch();
    });
  };

  //---------------Main File Call for svg/img/template---------------------------

  let call = true;
  if (v2FileData._id) {
    call = false;
  } else {
    call = true;
  }

  const V2File = useQuery(GetFileV2, {
    variables: {
      access_token: `${localStorage.getItem("token")}`,
      fileData: `{"source":"${v2FileData._index.split("-")[0]}","assetId": "${
        v2FileData._id
      }","extension": "svg"}`,
      //`"source":${v2FileData._index ? v2FileData._index.split('-')[0]: "dw"},"assetId":${v2FileData._id},"extension":${(v2FileData._source ? v2FileData._source.isSvg ? v2FileData._source.isSvg === true: "svg" : "png")}`
    },
    skip: call,
  });

  if (V2File.loading) {
    return <>Loading.</>;
  }

  if (V2File.error) return <PanelContainer>Error..</PanelContainer>;
  if (V2File.data && V2File.data.GET_getFileV2) {
    if (isSvg) {
      const response = addSvg(`${V2File.data.GET_getFileV2}`);
      SvgCheck(true, "response");
    }
    setV2File({ _id: "", _index: "", _source: { originalFileType: "" } });
    console.log(V2File.data);
    console.log(V2File.data.GET_getFileV2);
    setisSvg(false);
  }

  //const opacity = isDragging ? 0.4 : 1;
  const getFileV2 = (imgData: any) => {
    if (isSvg === false) {
      console.log(imgData);
      let url = `${
        process.env.REACT_APP_API_REDIRECT
      }/assets/getFileV2?access_token=${localStorage.getItem(
        "token"
      )}&fileData=${JSON.stringify({
        source: imgData._index ? imgData._index.split("-")[0] : "dw",
        assetId: imgData._id,
        extension: imgData._source.originalFileType === "tif" ? "png" : "jpg",
      })}`;
      addImg(url);
      console.log(url);
    }
  };

  const getFavFile = (favFile: any) => {
    let url = `${process.env.REACT_APP_API_REDIRECT}/users/${
      favFile.ownerId
    }/getFile/800x800/${favFile.fileName}?access_token=${localStorage.getItem(
      "token"
    )}`;
    addImg(url);
    console.log(url);
  };
  if (getVideoText.loading)
    return (
      <>
        <PanelContainer>
          <PanelInnerContainer>
            {" "}
            <SearchInput /> <Loaders className="loader"></Loaders>
          </PanelInnerContainer>
        </PanelContainer>
      </>
    );
  if (getVideoText.error) return <>error</>;
  if (getVideoText.data) {
    call2 = true;
  }

  return (
    <AnimatePresence>
      <PanelContainer>
        <PanelSwitch
          onClick={() => {
            setShowPanel((old: boolean) => !old);
          }}
        >
          {showPanel ? <PanelSwitchOpenCarret /> : <PanelSwitchCarret />}
        </PanelSwitch>
        <motion.div>
          {showPanel && (
            <PanelInnerContainer>
              <AssetsList className="assetslist">
                <AssetsInnerList>
                  {(selected === "template" ||
                    selected === "video-template" ||
                    selected === "videos" ||
                    selected === "image" ||
                    selected === "text") && (
                    <SearchInput
                      selected={selected}
                      getVidFilter={getVidFilter}
                      getTextBlockFilter={getTextBlockFilter}
                      fontsBtn={fontsBtn}
                      getTemplateFilter={getTemplateFilter}
                      categoryId={categoryId}
                      onSearchInputChange={(data: any) => {
                        setSearchedValue(data);
                        console.log(data, "search input");
                      }}
                    />
                  )}
                  {selected === "template" && (
                    <>
                      <AssetsHeader>
                        <AssetsHeaderInner>
                          <AssetsHeaderBtnContainer>
                            <AssetsHeaderBtn onClick={toggleBrowsePopUp}>
                              Browse Categories
                            </AssetsHeaderBtn>
                          </AssetsHeaderBtnContainer>
                        </AssetsHeaderInner>
                      </AssetsHeader>
                      {isBrowseOpen && (
                        <BrowseCategoriesPopup
                          resizeTitleId={resizeTitleId}
                          resizeTitle={resizeTitle}
                          handleClose={toggleBrowsePopUp}
                        />
                      )}
                      <TemplateControl onScroll={onImgTemp} ref={imgTempScroll}>
                        <AssetsListResultScrollerTemplate>
                          {tempData.length > 0 &&
                          selected === "template" &&
                          !temData.error ? (
                            tempData.map((item: any) => {
                              return (
                                <>
                                  <AssetsContainer>
                                    <AssetsListItem>
                                      <TemplateFigure
                                        onClick={() => {
                                          console.log(item);
                                          addTemplate(
                                            item,
                                            canvas,
                                            clippingWidth,
                                            clippingHeight,
                                            addSvg
                                          );
                                        }}
                                      >
                                        {/* <div
                                  ref={drag}
                                  // eslint-disable-next-line jsx-a11y/aria-role
                                  role="Image"
                                  style={{ ...style, opacity }}
                                  data-testid={`box-${name}`}
                                >  */}
                                        <img
                                          width="100%"
                                          // name={name}
                                          src={`${process.env.REACT_APP_S3_REDIRECT}/composer.templates.thumbs.staging/${item.templateId}.jpg`}
                                          //src={src}
                                          // src = { "https://api.dwiz.io/api/assets/getFileV2?access_token=" +
                                          // localStorage.getItem("token") +
                                          // "&" +
                                          // JSON.parse(JSON.parse(item.composer_object))[0].layers.src.split("&")[1]}
                                          alt="canvas"
                                        />
                                        <PriceTagOuterDiv className="outer">
                                          <PriceTagInnerDiv>
                                            <span>
                                              {
                                                item.price === 0
                                                  ? "Free"
                                                  : "$" + "2"
                                                // item._source.price
                                              }
                                            </span>
                                            {/* <span>$2</span> */}
                                          </PriceTagInnerDiv>
                                        </PriceTagOuterDiv>
                                        <FavouritesIconDiv
                                          onClick={() => {
                                            let id = "";
                                            id = item._id;
                                            addFavourite(id);
                                          }}
                                        >
                                          <img
                                            src="/heart.svg"
                                            height="15px"
                                            width="15px"
                                            alt="hearts"
                                          />
                                        </FavouritesIconDiv>
                                      </TemplateFigure>
                                    </AssetsListItem>
                                  </AssetsContainer>
                                </>
                              );
                            })
                          ) : (
                            <Loaders className="loader"></Loaders>
                          )}
                        </AssetsListResultScrollerTemplate>
                      </TemplateControl>
                    </>
                  )}
                  {selected === "video-template" && (
                    <>
                      <VideoTemplateControl
                        onScroll={onVidTempSroll}
                        ref={vidTempScroll}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "row",
                            width: "280px",
                            flexWrap: "wrap",
                            marginLeft: "10px",
                          }}
                        >
                          <AssetsListResultScrollerTemplate>
                            {tempVidData.length > 0 &&
                            selected === "video-template" &&
                            !temData.error ? (
                              tempVidData.map((item: any) => {
                                return (
                                  <>
                                    <AssetsContainer>
                                      <AssetsListItem>
                                        <AssetsListItemFigure>
                                          <div
                                            style={{
                                              display: "inline-block",
                                              marginBottom: "10px",
                                              cursor: "pointer",
                                            }}
                                            key={item._id}
                                            onClick={() =>
                                              animation(canvas).addItemToCanvas(
                                                item
                                              )
                                            }
                                          >
                                            <video
                                              width="126px"
                                              height="71px"
                                              onMouseOver={(e: any) => {
                                                e.target.play();
                                              }}
                                              onMouseOut={(e: any) => {
                                                e.target.pause();
                                              }}
                                              poster={`${process.env.REACT_APP_S3_REDIRECT}/composer.templates.thumbs.staging/${item._id}.jpg`}
                                              id={item._id}
                                            >
                                              <source
                                                src={`${process.env.REACT_APP_S3_REDIRECT}/composer.templates.thumbs.staging/${item._id}.mp4`}
                                              />
                                            </video>
                                            <PriceTagOuterDiv
                                              className="outer"
                                              style={{
                                                bottom: "15px",
                                                right: "4px",
                                              }}
                                            >
                                              <PriceTagInnerDiv>
                                                <span>
                                                  {item._source.price === 0
                                                    ? "Free"
                                                    : "$" + item._source.price}
                                                </span>
                                                {/* <span>$2</span> */}
                                              </PriceTagInnerDiv>
                                            </PriceTagOuterDiv>
                                          </div>
                                        </AssetsListItemFigure>
                                      </AssetsListItem>
                                    </AssetsContainer>
                                  </>
                                );
                              })
                            ) : (
                              <Loaders className="loader"></Loaders>
                            )}
                          </AssetsListResultScrollerTemplate>
                        </div>
                      </VideoTemplateControl>
                    </>
                  )}
                  {/*  */}
                  {selected === "image" && (
                    <ImageControl onScroll={onImgSroll} ref={imageScroll}>
                      <AssetsListResultScroller>
                        {selected === "image" &&
                        !imgData.error &&
                        images.length !== 0 ? (
                          images.map((item: any) => {
                            // {imgData.loading && <Loader type="bubble-ping" bgColor={"#FFFFFF"} title={"bubble-ping"} color={'#FFFFFF'} size={100} />}
                            return (
                              <>
                                <AssetsContainer>
                                  <AssetsListItem>
                                    <AssetsListItemFigure
                                      onClick={() => {
                                        if (item._source.isSVG) {
                                          setisSvg(true);
                                          setV2File(item);
                                        } else {
                                          getFileV2(item);
                                          const imgKeys = ImageKeys(item);
                                          imageKeysArray(imgKeys);
                                        }
                                      }}
                                    >
                                      {/* <div
                                  ref={drag}
                                  // eslint-disable-next-line jsx-a11y/aria-role
                                  role="Image"
                                  style={{ ...style, opacity }}
                                  data-testid={`box-${name}`}
                                >  */}
                                      <img
                                        // name={name}
                                        src={
                                          //selected === "image"
                                          //? item._source.thumb !== null &&
                                          item._source.thumb
                                          //: `${process.env.REACT_APP_S3_REDIRECT}/composer.templates.thumbs.staging/${item._id}.jpg`
                                        }
                                        alt="canvas"
                                      />
                                      <VideoHover>
                                        <FavouritesIconDiv
                                          onClick={() => {
                                            let id = "";
                                            id = item._id;
                                            addFavourite(id);
                                          }}
                                        >
                                          <img
                                            src="/heart.svg"
                                            height="15px"
                                            width="15px"
                                            alt="hearts"
                                          />
                                        </FavouritesIconDiv>
                                        <ImagePriceDiv className="outer">
                                          <PriceTagInnerDiv>
                                            <span>
                                              {item._source.price === 0
                                                ? "Free"
                                                : "$" + item._source.price}
                                            </span>
                                          </PriceTagInnerDiv>
                                        </ImagePriceDiv>
                                      </VideoHover>
                                      {item._source.isSVG && (
                                        <EditDiv>
                                          <span>EDITABLE</span>
                                        </EditDiv>
                                      )}
                                    </AssetsListItemFigure>
                                  </AssetsListItem>
                                </AssetsContainer>
                              </>
                            );
                          })
                        ) : (
                          <Loaders className="loader"></Loaders>
                        )}
                      </AssetsListResultScroller>
                    </ImageControl>
                  )}

                  {selected === "text" && (
                    <>
                      <AssetsHeader>
                        <AssetsHeaderInner>
                          <div style={{ display: "inline-block" }}>
                            <Textdiv>
                              <H3>FONTS/PHRASES</H3>
                              <AddTextx>add text to the canvas</AddTextx>
                            </Textdiv>
                            <UploadFontDiv className="container">
                              {isPaid ? (
                                <FontInput
                                  type="file"
                                  onChange={(e) =>
                                    fileUpload(e, (res: any) => {
                                      setFileBase(res.toString());
                                    })
                                  }
                                />
                              ) : (
                                <div
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    position: "absolute",
                                    zIndex: 11111,
                                  }}
                                  onClick={() => {
                                    setIsOpen(true);
                                  }}
                                ></div>
                              )}
                              <UploadArrow
                                src="/cloud_black_24dp.svg"
                                alt="logo5"
                              />
                              <UpArrow className="child" />
                              <p style={{ marginTop: "-5px" }}>Upload Font</p>
                            </UploadFontDiv>
                          </div>
                          <div>
                            <HeadingDiv>
                              <AddHeadingDiv
                                onClick={() => addText("Lato", 96, "heading")}
                              >
                                Add Heading
                              </AddHeadingDiv>
                              <AddSubHeading
                                onClick={() =>
                                  addText("Lato", 64, "subHeading")
                                }
                              >
                                Add Sub Heading
                              </AddSubHeading>
                              <AddPara
                                onClick={() => addText("Lato", 90, "para")}
                              >
                                Add Paragraph
                              </AddPara>
                              <TextButton
                                onClick={() => setFontsBtn(!fontsBtn)}
                              >
                                {fontsBtn === true
                                  ? "Switch to Phrases"
                                  : "Show Fonts Only"}
                              </TextButton>
                            </HeadingDiv>
                          </div>
                        </AssetsHeaderInner>
                      </AssetsHeader>
                      <FontsScrollDiv
                        onScroll={onTextBlockScroll}
                        ref={textBlockScroll}
                      >
                        <FontsDiv>
                          {getFonts.data &&
                            getFonts.data.GET_users_me_userFonts.map(
                              (item: any) => {
                                return (
                                  <FontsP
                                    style={{
                                      fontSize: "1.3em",
                                      fontFamily: `${item.font}`,
                                      fontStyle: `${
                                        item.fontStyle === "regular"
                                          ? "normal"
                                          : item.fontStyle
                                      }`,
                                    }}
                                  >
                                    {item.font}
                                    <DeleteSpan
                                      onClick={() => deleteFont(item.font)}
                                    >
                                      <Delete />
                                    </DeleteSpan>
                                  </FontsP>
                                );
                              }
                            )}
                          {getFonts.data.GET_users_me_userFonts.length > 0 && (
                            <FontsP style={{ marginTop: "25px" }}>
                              Other Fonts:
                            </FontsP>
                          )}
                          {fontsBtn &&
                            fontss.map((font: string) => {
                              return (
                                <FontsP
                                  style={{ fontFamily: `${font}` }}
                                  onClick={() => {
                                    addText(font, 90, "font");
                                  }}
                                >
                                  {font}
                                </FontsP>
                              );
                            })}
                          <PhrasesDiv>
                            {!fontsBtn &&
                              fontsData.map((item: any) => {
                                let minWidth = 110;
                                if (item.boundingBox.aspect >= 5) {
                                  minWidth = 250;
                                }
                                const OutDiv = styled.div`
                                  width: ${minWidth}px;
                                  height: ${minWidth /
                                  item.boundingBox.aspect}px;
                                  position: relative;
                                `;
                                let ratio = item.boundingBox.width / minWidth;
                                return (
                                  <OutPhrasesDiv
                                    onClick={() => {
                                      addPhrase(item);
                                    }}
                                  >
                                    <OutDiv>
                                      {item.layers.map((inner: any) => {
                                        const InnerSpan = styled.span`
                                          color: white;
                                          font-family: ${inner.fontFamily
                                            .replace(/([A-Z])/g, " $1")
                                            .trim()
                                            .replace(/S C$/, "SC")};
                                          font-style: ${inner.fontStyle};
                                          font-weight: ${inner.fontWeight};
                                          height: ${inner.height / ratio}px;
                                          left: ${inner.left / ratio}px;
                                          top: ${inner.top / ratio}px;
                                          width: ${inner.width / ratio}px;
                                          text-align: ${inner.textAlign
                                            ? inner.textAlign
                                            : ""};
                                          font-size: ${inner.fontSize /
                                          ratio}px;
                                          line-height: ${inner.lineHeight};
                                          position: absolute;
                                        `;
                                        return (
                                          <InnerSpan>{inner.value}</InnerSpan>
                                        );
                                      })}
                                    </OutDiv>
                                  </OutPhrasesDiv>
                                );
                              })}
                          </PhrasesDiv>
                        </FontsDiv>
                      </FontsScrollDiv>
                      {isOpen && <UploadPopUp handleClose={togglePopup} />}
                    </>
                  )}
                  {selected === "shapes" && (
                    <AssetsListController>
                      <AssetsListResultScroller>
                        <>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              flexDirection: "row",
                              height: "100%",
                              width: "75%",
                              margin: "10px",
                              justifyContent: "space-between",
                            }}
                          >
                            <Line onClick={addLine} />
                            <RectangleFilled
                              onClick={() => onAddRectangle(false)}
                            />
                            <CircleFilled onClick={() => onAddCircle(false)} />
                            <TriangleFilled
                              onClick={() => addTriangle(false)}
                            />
                            <RectangleOutLine
                              onClick={() => onAddRectangle(true)}
                            />
                            <CircleOutLined onClick={() => onAddCircle(true)} />
                            <TriangleOutLined onClick={() => addTriangle(true)}>
                              <InnerTriangle />
                            </TriangleOutLined>
                          </div>
                        </>
                      </AssetsListResultScroller>
                    </AssetsListController>
                  )}
                  {selected === "favourite" && (
                    <AssetsListController>
                      <AssetsListResultScroller>
                        <FavouritesDiv>
                          {favData.data &&
                          favData.data.GET_users_favorites.length > 0 ? (
                            favData.data.GET_users_favorites.map(
                              (item: any) => {
                                return (
                                  <FavouritesInnerDiv>
                                    <img
                                      src={item._source.thumb}
                                      style={{
                                        maxWidth: "100px",
                                        minWidth: "20px",
                                        minHeight: "20px",
                                        margin: "0 10px 20px 10px",
                                      }}
                                      alt="logo"
                                    />
                                    <DeleteIconDiv
                                      onClick={() => delFav(item._id)}
                                    >
                                      <img
                                        src="/delete.svg"
                                        height="15px"
                                        width="15px"
                                        alt="delete"
                                        style={{
                                          marginTop: "3px",
                                          marginLeft: "3px",
                                        }}
                                      />
                                    </DeleteIconDiv>
                                  </FavouritesInnerDiv>
                                );
                              }
                            )
                          ) : (
                            <p
                              style={{
                                color: "#e6e6e8",
                                fontSize: "16px",
                                fontFamily: [
                                  '"Lato"',
                                  "sans-serif  !important",
                                ].join(","),
                                width: "100%",
                                fontWeight: "400",
                                textAlign: "center",
                                padding: "20px",
                              }}
                            >
                              No favourites for{" "}
                              <span
                                style={{ color: "#da96a3" }}
                              >{`${activeEditorContext}s`}</span>{" "}
                              found
                            </p>
                          )}
                        </FavouritesDiv>
                      </AssetsListResultScroller>
                    </AssetsListController>
                  )}
                  {selected === "upload" && (
                    <AssetsListController>
                      <AssetsListResultScroller>
                        <>
                          <UploadDiv className="containeruploads">
                            <div
                              style={{
                                opacity: 0,
                                position: "absolute",
                                left: "94px",
                                top: "9px",
                                width: "111px",
                                height: "124px",
                                cursor: "pointer",
                                zIndex: isPaid === false ? 2 : 0,
                              }}
                              onClick={() => setIsOpen(!isOpen)}
                            ></div>
                            <UploadInnerDiv className="containeruploads">
                              <ImgUpload
                                type="file"
                                onChange={(e) =>
                                  fileUpload(e, (res: any) => {
                                    setFileBase(res.toString());
                                  })
                                }
                              />
                              <UploadImg
                                src="/cloud_black_24dp.svg"
                                height="40px"
                                width="40px"
                              />
                              <UpArrow className="childuploads" />
                              <UploadPara>
                                <b>Drag </b>
                                <UploadSpan>
                                  or{" "}
                                  <b
                                    style={{
                                      color: "#e87855",
                                      textDecoration: "underline",
                                    }}
                                  >
                                    {" "}
                                    Click
                                  </b>{" "}
                                  to
                                  <br />
                                  upload <br />
                                  image/Video.
                                </UploadSpan>
                              </UploadPara>
                            </UploadInnerDiv>
                          </UploadDiv>
                          <p style={{ color: "white", textAlign: "center" }}>
                            You haven't uploaded anything yet.
                          </p>
                          <UploadImgDiv>
                            {getUpload.data &&
                              getUpload.data.GET_users_uploads.map(
                                (item: any) => {
                                  return (
                                    <FavouritesInnerDiv
                                      onClick={() => {
                                        getFavFile(item);
                                      }}
                                    >
                                      <UploadImages
                                        src={item.thumb}
                                        alt="logo"
                                      />
                                    </FavouritesInnerDiv>
                                  );
                                }
                              )}
                          </UploadImgDiv>
                          {isOpen && <UploadPopUp handleClose={togglePopup} />}
                        </>
                      </AssetsListResultScroller>
                    </AssetsListController>
                  )}
                  {selected === "video-images" && (
                    <div>
                      <VideoTextDiv>
                        {getVideoText.data.GET_animations.map(
                          (item: any, index: number) => {
                            if (index === 0) {
                              return (
                                <div
                                  style={{ marginBottom: "10px" }}
                                  onClick={() => {
                                    animation(canvas).addPredefinedSequence(
                                      item.animationId
                                    );
                                  }}
                                >
                                  <AssetsContainer>
                                    <AssetsListItem>
                                      <AssetsListItemFigure>
                                        <video
                                          width="126px"
                                          height="71px"
                                          onMouseOver={(e: any) =>
                                            e.target.play()
                                          }
                                          onMouseOut={(e: any) => {
                                            e.target.pause();
                                          }}
                                          poster={`${process.env.REACT_APP_S3_REDIRECT}/composer.production/animations/${item.animationId}.png`}
                                        >
                                          <source
                                            src={`${process.env.REACT_APP_S3_REDIRECT}/composer.production/animations/${item.animationId}.webm`}
                                            type="video/webm"
                                          />
                                        </video>
                                      </AssetsListItemFigure>
                                    </AssetsListItem>
                                  </AssetsContainer>
                                </div>
                              );
                            }
                          }
                        )}
                      </VideoTextDiv>
                    </div>
                  )}
                  {selected === "video-texts" && (
                    <div>
                      <VideoTextDiv>
                        {getVideoText.data.GET_animations.map(
                          (item: any, index: number) => {
                            if (index > 0) {
                              return (
                                <div
                                  style={{ marginBottom: "10px" }}
                                  onClick={() => {
                                    animation(canvas).addPredefinedSequence(
                                      item.animationId
                                    );
                                  }}
                                >
                                  <AssetsContainer>
                                    <AssetsListItem>
                                      <AssetsListItemFigure>
                                        <video
                                          width="126px"
                                          height="71px"
                                          onMouseOver={(e: any) =>
                                            e.target.play()
                                          }
                                          onMouseOut={(e: any) => {
                                            e.target.pause();
                                          }}
                                          poster={`${process.env.REACT_APP_S3_REDIRECT}/composer.production/animations/${item.animationId}.png`}
                                        >
                                          <source
                                            src={`${process.env.REACT_APP_S3_REDIRECT}/composer.production/animations/${item.animationId}.webm`}
                                            type="video/webm"
                                          />
                                        </video>
                                      </AssetsListItemFigure>
                                    </AssetsListItem>
                                  </AssetsContainer>
                                </div>
                              );
                            }
                          }
                        )}
                      </VideoTextDiv>
                    </div>
                  )}
                  {selected === "videos" && (
                    <ImageControl onScroll={onVidScroll} ref={videoScroll}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: "row",
                          width: "280px",
                          flexWrap: "wrap",
                          marginLeft: "10px",
                        }}
                      >
                        {videos.map((item: any) => {
                          return (
                            <AssetsContainer>
                              <AssetsListItem>
                                <AssetsListItemFigure>
                                  <div
                                    style={{
                                      display: "inline-block",
                                      marginBottom: "10px",
                                      cursor: "pointer",
                                    }}
                                    key={item._id}
                                  >
                                    <video
                                      width="126px"
                                      height="71px"
                                      onMouseOver={(e: any) => {
                                        e.target.play();
                                      }}
                                      onMouseOut={(e: any) => {
                                        e.target.pause();
                                      }}
                                      poster={item._source.thumb}
                                      id={item._source.thumb}
                                      onClick={() => {
                                        VideoService(
                                          canvas,
                                          clippingHeight,
                                          clippingWidth
                                        ).addVideoToCanvas(item._source);
                                      }}
                                    >
                                      <source
                                        src={item._source.preview}
                                        type="video/mp4"
                                      />
                                    </video>
                                    <VideoHover>
                                      <FavouritesIconDiv
                                        onClick={() => {
                                          let id = "";
                                          id = item._id;
                                          addFavourite(id);
                                        }}
                                      >
                                        <img
                                          src="/heart.svg"
                                          height="15px"
                                          width="15px"
                                          alt="hearts"
                                        />
                                      </FavouritesIconDiv>
                                      <PriceTagOuterDiv
                                        className="outer"
                                        style={{
                                          bottom: "-50px",
                                          right: "-10px",
                                        }}
                                      >
                                        <PriceTagInnerDiv>
                                          <span>{getPrice(item)}</span>
                                          {/* <span>$2</span> */}
                                        </PriceTagInnerDiv>
                                      </PriceTagOuterDiv>
                                    </VideoHover>
                                  </div>
                                </AssetsListItemFigure>
                              </AssetsListItem>
                            </AssetsContainer>
                          );
                        })}
                      </div>
                    </ImageControl>
                  )}
                </AssetsInnerList>
              </AssetsList>
            </PanelInnerContainer>
          )}
        </motion.div>
      </PanelContainer>
    </AnimatePresence>
  );
};
