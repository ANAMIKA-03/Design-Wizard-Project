import React, { useContext, useEffect, useState } from "react";
//import { CropSquare, AddCircle, Image } from "@material-ui/icons";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  StyledButton,
  StyledButtonContainer,
  StyledSidebar,
  StyledSidebarNav,
  Styledpara,
} from "./styledComponent";
import styled from "styled-components";
import { LeftSidePanel } from "./leftSidePanel";
import { ActiveEditorContext } from "./../../../../components/layout/private";

import { ReactComponent as videoIcon } from "./../../../../assets/svg/video.svg";
import { ReactComponent as addImageIcon } from "./../../../../assets/svg/add-image-icon.svg";
import { ReactComponent as uploadIcon } from "./../../../../assets/svg/upload.svg";
import { ReactComponent as templatesIcon } from "./../../../../assets/svg/templates.svg";
import { ReactComponent as myDesignsIcon } from "./../../../../assets/svg/myDesigns.svg";
import { ReactComponent as textIcon } from "./../../../../assets/svg/text-icon.svg";
import { ReactComponent as shapeIcon } from "./../../../../assets/svg/shape.svg";
import { ReactComponent as favouriteIcon } from "./../../../../assets/svg/favourite.svg";
import { ReactComponent as VideoDesignIcon } from "../../../../assets/svg/New folder/videoTemplates.svg";

import { motion, AnimatePresence } from "framer-motion";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
// import {ReactComponent as ResizeIcon} from "../../../../assets/svg/New folder/canvas-resize-icon.svg";
const SelectTriangle = styled.div`
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid #2fc6c0;
  transform: rotate(270deg);
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  display: block;
  right: auto;
  left: -2px;
`;
const LabelTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#FFFFFF",
    color: "rgb(128,128,128)",
    width: "60px",
    height: "17px",
    textAlign: "center",
    border: "1px solid rgb(128,128,128)",
    padding: 5,
    borderRadius: "1px",
    fontSize: "12.5px",
    fontFamily: "Lato",
    margin: "4px 0",
  },
}));

const imageEditorButtons = [
  {
    title: "Templates",
    id: "template",
    img: templatesIcon,
  },
  {
    title: "Images",
    id: "image",
    img: myDesignsIcon,
  },
  {
    title: "Text",
    id: "text",
    img: textIcon,
  },
  {
    title: "Shapes",
    id: "shapes",
    img: shapeIcon,
  },
  {
    title: "Uploads",
    id: "upload",
    img: uploadIcon,
  },
  {
    title: "Favourites",
    id: "favourite",
    img: favouriteIcon,
  },
];

const videoEditorButtons = [
  {
    title: "Templates",
    id: "video-template",
    img: templatesIcon,
  },
  {
    title: "Videos",
    id: "videos",
    img: videoIcon,
  },
  {
    title: "Add Images",
    id: "video-images",
    img: addImageIcon,
  },
  {
    title: "Text",
    id: "video-texts",
    img: textIcon,
  },
  {
    title: "Uploads",
    id: "upload",
    img: uploadIcon,
  },
  {
    title: "Favourites",
    id: "favourite",
    img: favouriteIcon,
  },
];
const SidebarButtons = (props: any) => {
  const { setSelected, selected, buttons } = props;
  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key="modal"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          exit={{ x: -200 }}
          transition={{ duration: 2 }}
        >
          {buttons.map((btn: any, index: number) => (
            <LabelTooltip
              title={btn.title}
              placement="bottom-end"
              enterDelay={1000}
              leaveDelay={200}
            >
              <StyledButton
                style={{ paddingTop: "15px" }}
                onClick={() => {
                  setSelected(btn.id);
                  console.log(btn.id);
                }}
                key={index}
              >
                {selected === btn.id && <SelectTriangle />}
                <div>
                  <btn.img className="sidebarBtnsSvg" />
                </div>
                <Styledpara style={{ fontSize: "9.8px", fontWeight: "bold" }}>
                  {btn.title}
                </Styledpara>
              </StyledButton>
            </LabelTooltip>
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export const Sidebar = (props: any) => {
  const {
    onAddCircle,
    addImg,
    addText,
    canvas,
    dummy,
    addSvg,
    SvgCheck,
    svgs,
    addLine,
    onAddRectangle,
    addTriangle,
    addPhrase,
    addVideo,
    setVideoList,
    videoList,
    setCurrentPlayingVideoId,
    getComposition,
    ImageKeys,
    imageKeysArray,
    clippingWidth,
    clippingHeight,
    addVideoText,
    resizeTitleId,
    resizeTitle,
  } = props;
  const [selected, setSelected] = useState("template");
  const [isAdmin, setIsAdmin] = useState(false);
  const activeEditorContext = useContext(ActiveEditorContext);

  useEffect(() => {
    setSelected(
      activeEditorContext === "video" ? "video-template" : "template"
    );
  }, [activeEditorContext]);

  useEffect(() => {
    const user: any = localStorage.getItem("user");
    const userData = JSON.parse(user);
    console.log(userData);
    if (activeEditorContext === "video") {
      for (let i of userData.roles) {
        if (i.name === "admin") {
          setIsAdmin(true);
          console.log(i);
        }
      }
    }
  }, []);
  useEffect(() => {
    if (isAdmin) {
      let check = false;
      for (let i of videoEditorButtons) {
        if (i.id != "videodesign") {
          check = true;
        }
      }
      if (check) {
        videoEditorButtons.splice(1, 0, {
          title: "Video Design",
          id: "videodesign",
          img: VideoDesignIcon,
        });
        check = false;
      }
    }
  }, [isAdmin]);
  return (
    <StyledSidebar>
      <StyledSidebarNav>
        <StyledButtonContainer>
          <SidebarButtons
            selected={selected}
            setSelected={setSelected}
            buttons={
              activeEditorContext === "video"
                ? videoEditorButtons
                : imageEditorButtons
            }
            {...props}
          />
        </StyledButtonContainer>
      </StyledSidebarNav>
      <DndProvider backend={HTML5Backend}>
        {canvas && (
          <LeftSidePanel
            name=""
            canvas={canvas}
            src={dummy}
            src2={svgs}
            addImg={addImg}
            addText={addText}
            addSvg={addSvg}
            selected={selected}
            setSelected={setSelected}
            onAddCircle={onAddCircle}
            SvgCheck={SvgCheck}
            addLine={addLine}
            addPhrase={addPhrase}
            onAddRectangle={onAddRectangle}
            addTriangle={addTriangle}
            addVideo={addVideo}
            setVideoList={setVideoList}
            videoList={videoList}
            setCurrentPlayingVideoId={setCurrentPlayingVideoId}
            getComposition={getComposition}
            ImageKeys={ImageKeys}
            imageKeysArray={imageKeysArray}
            clippingWidth={clippingWidth}
            clippingHeight={clippingHeight}
            addVideoText={addVideoText}
            resizeTitleId={resizeTitleId}
            resizeTitle={resizeTitle}
            PanelSwitchClicked={props.PanelSwitchClicked}
            categoryId={resizeTitleId}
          />
        )}
      </DndProvider>
    </StyledSidebar>
  );
};
