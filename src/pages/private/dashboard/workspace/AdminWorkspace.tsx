import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import ResizeComponent from "../../home/ResizeComponent";
import { ReactComponent as Save } from "./../../../../assets/svg/save.svg";
import { ReactComponent as Share } from "./../../../../assets/svg/new-share-icon.svg";
import { ReactComponent as Download } from "./../../../../assets/svg/dowload.svg";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import {
  WorkspaceHeader,
  ImgHeaders,
  StyledButton,
  Styledpara,
} from "./styledComponent";
import { ActiveEditorContext } from "./../../../../components/layout/private";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

interface Props {
  hasActiveObject: any;
}
const ResizeBtnWrapper = styled.div`
  // height: 100%;
  width: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
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
const Style = styled.div`
width: 160px;
font-size: 16px;
font-family:"Lato", sans-serif;
&:hover {
  color: #e87855;
`;
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

export const AdminWorkspace = () => {
  const activeEditorContext = useContext(ActiveEditorContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [open, setOpen] = useState(false);
  const [hasActiveObject, setHasActiveObject] = useState(false);
  const [saveDrop, setSaveDrop] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpen = (val: any) => {
    setOpen(val);
  };
  const opens = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
  return (
    <>
      <ResizeBtnWrapper>
        <StyledButton style={{ marginBottom: 0 }} onClick={() => setOpen(true)}>
          <img
            src="/canvas-resize-icon.svg"
            color="#dde6ff"
            height="30px"
            width="30px"
            alt="resize"
            font-size="12px"
          />
          <Styledpara
            style={{ fontSize: "9px", padding: "1px", height: "10px" }}
          >
            Resize
          </Styledpara>
        </StyledButton>
      </ResizeBtnWrapper>
      <ImgHeaders>
        <IconWrapper
          onClick={() => {
            hasActiveObject && setSaveDrop((oldState) => !oldState);
          }}
          hasActiveObject={hasActiveObject}
        >
          <Save
            style={{
              color: hasActiveObject === true ? "#8c90aa" : "#F0ECF5",
              height: "27.05px",
              width: "28px",
            }}
          />
          <SaveTooltip title="Save">
            <SaveText
              style={{
                color: hasActiveObject === true ? "#8c90aa" : "#F0ECF5",
              }}
            >
              Save Temp
            </SaveText>
          </SaveTooltip>
        </IconWrapper>
        {saveDrop && hasActiveObject && (
          <SaveDropDownDiv>
            <TextDivWrapper>
              <TextDiv
              // onClick={() => {
              //   if (getComposition(canvas).objects.length > 1) {
              //     updateDesign();
              //     setSaveDrop((oldState: any) => !oldState);
              //   } else {
              //     toast.error(
              //       "Please Add another image or text to complete your design"
              //     );
              //     setSaveDrop((oldState: any) => !oldState);
              //   }
              // }}
              >
                SAVE CURRENT DESIGN
              </TextDiv>
            </TextDivWrapper>
            <Divider />
            <TextDivWrapper>
              <TextDiv
              // onClick={() => {
              //   if (getComposition(canvas).objects.length > 1) {
              //     saveNewDesign();
              //     setSaveDrop((oldState: any) => !oldState);
              //     //downloadImage(token);}
              //   } else {
              //     toast.error(
              //       "Please Add another image or text to complete your design"
              //     );
              //     setSaveDrop((oldState: any) => !oldState);
              //   }
              // }}
              >
                SAVE AS NEW DESIGN
              </TextDiv>
            </TextDivWrapper>
          </SaveDropDownDiv>
        )}
        <IconWrapper
          hasActiveObject={hasActiveObject}
          //   onClick={(e: any) => {
          //     setShowpopup(!showPopup);
          //     setCanvasSs(canvas.toDataURL({ format: "jpeg", quality: 0.5 }));
          //   }}
        >
          <Save
            style={{
              color: hasActiveObject === false ? "#8c90aa" : "#F0ECF5",
              height: "25px",
              width: "25px",
            }}
          />
          <SaveTooltip title="Save">
            <SaveText
              style={{
                color: hasActiveObject === false ? "#8c90aa" : "#F0ECF5",
              }}
            >
              Save
            </SaveText>
          </SaveTooltip>
        </IconWrapper>

        <DotTooltip title="More..." placement="bottom">
          <div style={{ display: "inline-block", verticalAlign: "super" }}>
            <div
              style={{
                fontSize: "2em",
                color: " white",
                padding: "0px 46px 23px 0px",
                cursor: "pointer",
              }}
              onClick={handleClick}
            >
              ...
            </div>
          </div>
        </DotTooltip>
        {activeEditorContext === "image" && (
          <Menu
            anchorEl={anchorEl}
            onClose={handleClose}
            onClick={handleClose}
            open={opens}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&: before": {
                  //  content: ' ""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 32,
                  height: 10,
                  // bgcolor: 'background.paper',
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>
              <Style>Share</Style>
            </MenuItem>
            <Divider />
            <MenuItem>
              <Style>Download as JPG</Style>
            </MenuItem>
            <Divider />
            <MenuItem>
              <Style>Download as PNG</Style>
            </MenuItem>
            <Divider />
            <MenuItem>
              <Style>Download as SVG</Style>
            </MenuItem>
            <Divider />
            <MenuItem>
              <Style>Lib x264</Style>
            </MenuItem>
            <MenuItem>
              <Style>M-JPEG</Style>
            </MenuItem>
            <MenuItem>
              <Style>Prores</Style>
            </MenuItem>
          </Menu>
        )}
        {activeEditorContext === "video" && (
          <Menu
            anchorEl={anchorEl}
            onClose={handleClose}
            onClick={handleClose}
            open={opens}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&: before": {
                  //  content: ' ""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 32,
                  height: 10,
                  // bgcolor: 'background.paper',
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>
              <Style>Share</Style>
            </MenuItem>
            <Divider />
            <MenuItem>
              <Style>Download Video</Style>
            </MenuItem>
            <MenuItem>
              <Style>Lib x264</Style>
            </MenuItem>
            <MenuItem>
              <Style>M-JPEG</Style>
            </MenuItem>
            <MenuItem>
              <Style>prores</Style>
            </MenuItem>
          </Menu>
        )}
      </ImgHeaders>
    </>
  );
};
