import styled from "styled-components";
import Slider from "@material-ui/core/Slider";
import Switch from "@material-ui/core/Switch";

export const StyledCanvasContainer = styled.div`
  background: #e6e6e8;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
  flex: 1;
  overflow: auto;
`;

export const StyledCanvasParentDiv = styled.div`
  flex: 0 0 30%;
  border: 2px solid #9c9ea3;
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const StyledButton = styled.button`
  padding: 2px 4px;
  cursor: pointer;
  background-color: #2c3459;
  font-family: "Lato", sans-serif !important;
  border: none;
  height: 20%;
  width: 100%;
  position: relative;
  &:hover {
    background-color: #363f6a;
  }
`;
export const ImgHeaders = styled.div`
  float: right;
  width: 278px;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  justify-content: space-around;
`;

export const Styledpara = styled.p`
  color: white;
  margin: 0;
  font-size: 0.1em;
`;

export const StyledCanvasActionContainer = styled.div`
  margin-bottom: 10px;
  text-align: right;
`;

export const WorkspaceHeader = styled.div`
  z-index: 21;
  position: relative;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: -ms-flex;
  display: flex;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  height: 65px;
  background-color: #2d3559;
  -webkit-align-items: center;
  -moz-align-items: center;
  -ms-align-items: center;
  align-items: center;
  -webkit-justify-content: space-between;
  -moz-justify-content: space-between;
  -ms-justify-content: space-between;
  padding: 0 35px 0 0;
`;

export const MainContentWrapper = styled.div`
  height: 100%;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: -ms-flex;
  display: flex;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  position: relative;
`;

export const StyledSidebar = styled.aside`
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

export const StyledSidebarNav = styled.div`
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: -ms-flex;
  display: flex;
  -webkit-flex-direction: column;
  -moz-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 75px;
  height: 100%;
  background-color: #2d3559;
  position: relative;
`;

export const ZoomControl = styled.div`
  position: absolute;
  bottom: 25px;
  left: 25px;
  z-index: 6;
`;

export const ZoomControlBtnWrapper = styled.div`
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: -ms-flex;
  display: flex;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
`;

export const ZoomControlMinusBtn = styled.button`
  background-color: #2d3559;
  color: #fff;
  width: 36px;
  cursor: pointer;
  font-weight: bold;
  border-radius: 4px 0 0 4px;
  -webkit-border-radius: 4px 0 0 4px;
  -moz-border-radius: 4px 0 0 4px;
  outline: none !important;
  border: 0 none;
  padding: 1px 6px;
  height: 30px;
`;

export const ZoomControlPlusBtn = styled.button`
  background-color: #2d3559;
  color: #fff;
  width: 36px;
  cursor: pointer;
  font-weight: bold;
  border-radius: 0 4px 4px 0;
  -webkit-border-radius: 0 4px 4px 0;
  -moz-border-radius: 0 4px 4px 0;
  outline: none !important;
  border: 0 none;
  padding: 1px 6px;
  height: 30px;
`;

export const ZoomControlPara = styled.p`
  display: inline-block;
  margin: 0;
  background-color: #fff;
  font-size: 12px;
  padding: 7px;
  min-width: 46px;
  text-align: center;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`;

export const StyledSection = styled.section`
  background-color: #e6e6e8;
  -webkit-flex: 1;
  -moz-flex: 1;
  -ms-flex: 1;
  flex: 1;
  overflow-y: auto;
  height: 100%;
  position: relative;
  overflow: visible !important;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  animation-duration: 0.5s;
`;

export const OldStyledSection = styled.section`
  background-color: #e6e6e8;
  -webkit-flex: 1;
  -moz-flex: 1;
  -ms-flex: 1;
  flex: 1;
  overflow-y: auto;
  height: 100vh;
  position: relative;
  overflow: visible !important;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  animation-duration: 0.5s;
`;

export const WorkspaceSpaceContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  overflow: hidden;
  clear: both;
  position: relative;
  z-index: 2;
  outline: none;
`;

export const BigPreloader = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  display: block;
  width: 100%;
  height: 100%;
  background-color: #e6e6e8;
  z-index: 22222222;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  display: none;
`;

export const WorkspaceBottom = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  cursor: pointer;
`;

export const WorkspaceScroll = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  cursor: initial;
  overflow: auto;
  display: flex;
  justify-content: center;
`;

export const WorkspaceCenterWrapper = styled.div`
  transition: top 0.3s ease, left 0.3s ease;
  position: relative;
`;

export const ButtonContainer = styled.div`
  top: -35px;
  right: -11px;
  display: block;
  position: absolute;
  z-index: 999;
`;

export const ClippingMask = styled.div`
  position: relative;
  transition: width 0.3s ease, height 0.3s ease;
  width: 365.333px;
  height: 274px;
`;

export const BorderLeft = styled.div`
  left: -2px;
  width: 2px;
  top: -2px;
  bottom: -2px;
  transition: all 0.2s ease-in-out;
  background: #9c9ea3;
  position: absolute;
  z-index: 1;
`;

export const BorderRight = styled.div`
  right: -2px;
  width: 2px;
  top: -2px;
  bottom: -2px;
  transition: all 0.2s ease-in-out;
  background: #9c9ea3;
  position: absolute;
  z-index: 1;
`;

export const BorderTop = styled.div`
  top: -2px;
  height: 2px;
  left: -2px;
  right: -2px;
  transition: all 0.2s ease-in-out;
  background: #9c9ea3;
  position: absolute;
  z-index: 1;
`;

export const BorderBottom = styled.div`
  bottom: -2px;
  height: 2px;
  left: -2px;
  right: -2px;
  transition: all 0.2s ease-in-out;
  background: #9c9ea3;
  position: absolute;
  z-index: 1;
`;

export const CanvasWrapper = styled.div`
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: -ms-flex;
  display: flex;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  -ms-justify-content: center;
  justify-content: center;
  -webkit-align-items: center;
  -moz-align-items: center;
  -ms-align-items: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const CanvasContainer = styled.div`
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
  user-select: none;
`;

export const CanvasControlsContainer = styled.div`
  z-index: 6;
  display: flex;
  flex-direction: row;
`;

export const CanvasControlsBtns = styled.button`
  padding: 0 10px;
  height: 100%;
  border-radius: 0;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  padding-top: 5px;
  cursor: pointer;
  background: none;
  border: none;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const ActionButtonSvg = styled.img`
  height: 20px;
  width: 20px;
`;

export const BgColorActionButton = styled.button`
  border: 1px solid #75777e;
  width: 20px;
  height: 20px;
  background: none;
  cursor: pointer;
`;

export const RightSidePanel = styled.div`
  position: relative;
  display: flex;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
`;

export const RightSidePanelContainer = styled.div`
  max-width: 300px;
  width: 300px;
  background-color: #343e63;
  height: 100%;
`;

export const RightSidePanelSwitch = styled.div`
  position: absolute;
  left: -15px;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 15px;
  border-radius: 8px 0 0 8px;
  height: 60px;
  background-color: #212741;
  z-index: 101;
`;

export const RightSidePanelOpenSwitchCarret = styled.div`
  position: relative;
  border: solid #fbfbff;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 2px;
  position: absolute !important;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 4px;
  height: 4px;
  transform: rotate(135deg);
  transition: transform 0.3s ease, right 0.3s ease;
  cursor: pointer;
  left: 4px;
`;

export const RightSidePanelCloseSwitchCarret = styled.div`
  border: solid #fbfbff;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 2px;
  position: absolute !important;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 4px;
  height: 4px;
  transform: rotate(-45deg);
  transition: transform 0.3s ease, right 0.3s ease;
  cursor: pointer;
  right: 4px;
`;

export const RightSidePanelTabs = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  color: #f0ecf5;
`;

export const RightSidePanelTabsBtnContainer = styled.div`
  margin: 0;
  width: 50% !important;
  height: 100%;
  background-color: #515988;
  border: none;
  position: relative;
  cursor: pointer;
  display: inline-block;
`;

export const RightSidePanelTabsBtn = styled.button`
  border-radius: 0;
  font-size: 14px;
  width: 100%;
  height: 100%;
  color: #fbfbff !important;
  outline: none !important;
  border: 1px solid transparent !important;
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
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const RightSidePanelTabsBtnIconContainer = styled.div`
  display: inline-block;
`;

export const RightSidePanelTabsBtnIcon = styled.img`
  width: 20px !important;
  height: 20px !important;
  line-height: 30px;
  vertical-align: middle;
  background: no-repeat;
`;

export const RightSidePanelTabsBtnTitle = styled.div`
  text-align: left;
  line-height: 30px;
  margin-left: 5px;
  display: inline-block;
  vertical-align: middle;
  z-index: 22;
  line-height: unset;
  font-size: 14px;
  font-family: "Lato", sans-serif !important;
`;

export const RightSidePanelActionContainer = styled.div`
  height: calc(100% - 0px);
`;

export const RightSidePanelActionPanel = styled.div`
  position: relative;
  background-color: #343e63;
  /* width: 182px; */
  height: 100%;
`;

export const RightSidePanelActionPanelContent = styled.div`
  padding: 0 30.5px 0 10.5px;
  display: flex;
  flex-direction: column;
  height: 73vh;
  overflow-y: scroll;
`;

export const LockCopyDelete = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 10.5px 0;
`;

export const Flipper = styled.section`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 3.5px 0 3.5px 0;
`;

export const Transperency = styled.section`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 10.5px 0 0 0;
  width: 100%;
`;

export const MoreActions = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10.5px 0;
`;

export const RightSidePanelActionPanelContentSectionFive = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 10.5px 0;
  width: 100%;
`;

export const LockCopyDeleteBtn = styled.button`
  border-radius: 2.8px;
  width: 24%;
  position: relative;
  font-size: 7px;
  padding: 3.5px;
  background-color: #515988;
  border: 0 none;
  color: #fff;
  height: 36px;
  cursor: pointer;
`;

export const RightSidePanelActionPanelP = styled.p`
  font-size: 12px;
  font-family: "Lato", sans-serif;
  min-width: 21px;
  margin-bottom: -3.5px;
  color: white;
  text-align: left;
  margin-top: 0;
`;

export const RightSidePanelActionPanelFiltersDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 3px;
`;

export const RightSidePanelActionPanelFiltersDivLabel = styled.label`
  position: relative;
  cursor: pointer;
  width: 30%;
  display: inline-block;
  margin-bottom: 0.5rem;
`;

export const RightSidePanelActionPanelFiltersDivLabelImg = styled.img`
  transition: box-shadow 0.3s ease;
  /* box-shadow: 0 0 0 3px #2fc6c0; */
  max-height: 56px;
  width: 100%;
  margin: 0 auto;
  display: block;
  vertical-align: middle;
  border-style: none;
`;

export const RightSidePanelActionPanelFiltersDivLabelP = styled.p`
  font-size: 11.2px;
  font-family: "Lato", sans-serif;
  padding: 2.1px 0 4.9px 0;
  margin-bottom: 0;
  text-align: center;
  color: white;
`;

export const TransperencySlider = styled(Slider)`
  &.MuiSlider-root {
    color: #e9e9e9;
    height: 4px;
    & span:first-child {
      height: 4px;
    }
    & span:nth-child(2) {
      height: 4px;
      border-radius: 4px;
    }
    & span:last-child {
      width: 13px;
      height: 13px;
      background: #2fc5c0;
    }
  }
`;

export const CropImageSection = styled.section`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0 0 10.5px 0;
  min-height: 37px;
`;

export const CropImageSectionInner = styled.div`
  z-index: 99;
  min-width: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

export const CropImageSectionInnerBtn = styled.button`
  border-radius: 3.5px;
  transition: background-color 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  padding: 3.5px;
  background-color: #515988;
  color: #fff;
  border: 1px solid #dee2e6 !important;
  width: 110px;
  height: 45px;
`;

export const AdvancedImgFilterLabel = styled.label`
  padding: 7px 0;
  margin-bottom: 7px;
  display: block;
  cursor: pointer;
  margin: 0;
  position: relative;
`;

export const AdvancedImgFilterLabelDiv = styled.div`
  height: 14.7px;
  width: 14.7px;
  border-radius: 100%;
  position: absolute;
  right: 161px;
  background: rgba(255, 255, 255, 0.3);
  top: 0;
`;

export const AdvancedImgFilterLabelDivSpan = styled.span`
  color: rgba(255, 255, 255, 0.5);
  position: absolute;
  left: 18.2px;
  font-size: 11.4px;
  line-height: 15.4px;
`;

export const AdvancedFiltersDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  transition: height 0.4s;
`;

export const AdvancedFiltersDivChild = styled.div`
  width: 47%;
`;

export const AdvancedFiltersDivChildP = styled.p`
  width: 30%;
  color: white;
  font-size: 12px;
  font-family: "Lato", sans-serif !important;
  text-transform: capitalize;
  line-height: 9px;
  margin: 7px 0 0 0;
  font-weight: 500;
`;

export const AdvancedFiltersSlider = styled(Slider)`
  &.MuiSlider-root {
    color: #e9e9e9;
    height: 4px;
    padding: 5px 0;
    & span:first-child {
      height: 4px;
    }
    & span:nth-child(2) {
      height: 4px;
      border-radius: 4px;
    }
    & span:last-child {
      width: 13px;
      height: 13px;
      background: #2fc5c0;
    }
  }
`;

export const GripPopupDiv = styled.div`
  min-width: 10rem;
  padding: 0.5rem 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
`;

export const GripPopupDivChild = styled.div`
  padding: 8px 10px;
`;

export const GripPopupDivChildLabel = styled.label`
  display: inline-block;
  margin: 2px 8px 0 0;
`;

export const GripPopupDivChildInput = styled.input`
  display: inline-block;
  width: 50px;
  text-align: center;
  height: 30px;
  border: 2px solid;
`;

export const GripPopupDivChildSpan = styled.span`
  margin: 1px 12px 0;
`;

export const GridSwitch = styled(Switch)``;

export const LayersContainer = styled.div`
  background: #2d3559;
  position: absolute;
  width: calc(300px);
  height: auto;
  top: 50px;
  bottom: 0;
  z-index: 100;
  margin: auto;
  transition: 0.2s all linear;
`;

export const LayersContainerList = styled.div`
  height: 100%;
  min-height: 210px;
  display: flex;
  flex-direction: column;
`;

export const LayersContainerListImgContainer = styled.div`
  height: 114px;
  width: 100%;
  position: relative;
  text-align: center;
  border-bottom: 1px solid #63636c;
`;

export const LayersContainerListImgContainerHolder = styled.div`
  position: relative;
  display: inline-block;
  overflow: hidden;
  width: 70px;
  height: 70px;
  border-radius: 70px;
  -webkit-border-radius: 70px;
  -moz-border-radius: 70px;
  margin-top: 14px;
  background-color: #3e497b;
  border: 1.4px solid #394371;
`;

export const LayersContainerListImgContainerOrder = styled.div`
  margin-top: 2px;
  width: 24.5px;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 35px;
  border-right: 1px solid #505467;
  transition: all 0.3s linear;
`;

export const LayersContainerListImgContainerOrderBtn = styled.button`
  margin: 1.4px;
  display: inline-block;
  width: calc(21px);
  height: calc(24.9px);
  font-size: 0.525em;
  background: transparent;
  padding: 0;
  border: none;
  box-shadow: none;
  cursor: pointer;
`;

export const LayersContainerListImgContainerOrderBtnSpan = styled.span`
  width: calc(14px);
  height: 11.2px;
  display: inline-block;
  position: relative;
`;

export const LayersContainerListImgContainerOrderBtnSpanIcon = styled.span`
  transform: rotate(-45deg);
  border-style: solid;
  border-width: calc(2.1px) calc(2.1px) 0 0;
  border-color: #f0ecf5;
  display: inline-block;
  height: calc(11.2px);
  position: relative;
  width: calc(11.2px);
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  display: block;
  backface-visibility: hidden;
`;

export const LayersContainerListScrollerContainer = styled.div`
  height: 84%;
  flex: 1;
  overflow-y: hidden !important;
  overflow-x: hidden !important;
  position: relative;
  touch-action: auto;
`;

export const LayersContainerListScrollerDiv = styled.div``;

export const LayersContainerListScrollerList = styled.ul`
  width: 100%;
  padding: 0;
  margin-top: 0;
`;

export const LayersContainerListScrollerListItem = styled.li`
  background: #3e497b;
  padding: 15px 15px 15px 45px;
  color: #fbfbff;
  border-bottom: 1px solid rgba(64, 64, 64, 0.5);
  cursor: pointer;
  outline: none;
  position: relative;
  transition: all 0.3s ease;
  list-style-type: none;
`;

export const LayersContainerListScrollerListItemCondition = styled.div`
  width: 35.5px;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  display: flex;
  transition: all 0.5s ease;
  background-color: #4f5d9d;
  align-items: center;
  justify-content: center;
`;

export const LayersContainerListScrollerListItemName = styled.span`
  font-size: 9px;
  text-overflow: ellipsis;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  max-width: 63px;
`;

export const LayersContainerListScrollerListItemBtn = styled.button`
  float: right;
  width: 24.5px;
  border-radius: 24.5px;
  -webkit-border-radius: 24.5px;
  -moz-border-radius: 24.5px;
  height: 24.5px;
  position: relative;
  top: 0;
  margin: 0 2px;
  transition: all 0.5s ease;
  border: none;
  box-shadow: none;
  background: transparent;
  cursor: pointer;
  display: inline-block;
`;

export const LayersContainerListScrollerListItemBtnHover = styled.div`
  background: transparent;
  opacity: 1 !important;
  border: 1pxsolid transparent;
  z-index: 9999999999;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  display: block;
  width: 24.5px;
  height: 24.5px;
  border-radius: 24.5px;
  transition: all 0.2s ease-in-out;
  animation-play-state: paused;
  animation-iteration-count: infinite;
  animation-duration: 0.3s;
  animation-name: bounceInJ;
  animation-duration: 0.75s;
`;

export const ArtboardWrapper = styled.div`
  position: relative;
  top: 0;
  right: 0;
  width: 265px;
  height: 100%;
  background-color: #f1f1f1;
  opacity: 1;
  text-align: center;
  border-left: 1px solid #11243b;
  cursor: auto;
`;
export const ArtboardWrapperContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 100px;
  z-index: 9;
  margin-top: 40px;
`;

export const ArtboardThumbnailDiv = styled.div``;
export const ArtboardThumbnailActions = styled.div`
  position: absolute;
  width: 100px;
  height: 100%;
  top: 0;
  will-change: transition;
  opacity: 0;
  text-align: right;
  transform: translate3d(0, 0, 0);
  transition: all 0.3s ease-in-out;
`;
export const ArtboardThumbnailWrapper = styled.div`
  margin-bottom: 15px;
  position: relative;
  @media (max-width: 1366px) {
    padding-right: 15px;
    margin-bottom: 10.5px;
    position: relative;
  }
  &:hover ${ArtboardThumbnailActions} {
    transform: translate3d(-100px, 0, 0);
    opacity: 1;
  }
`;

export const ArtboardThumbnailDuplicate = styled.div`
  cursor: pointer;
  left: 0;
  top: 30px;
  position: absolute;
  width: 80px;
`;
export const ArtboardThumbnailDuplicateSpan = styled.span`
  font-size: 0.8em;
  color: #592e6f;
  transition: 0.3s color linear;
  &:hover {
    color: #2fc6c0;
  }
`;
export const ArtboardThumbnailDelete = styled.div`
  position: absolute;
  left: 0;
  top: 3px;
  cursor: pointer;
  width: 80px;
  height: 20px;
`;
export const ArtboardThumbnailDeleteSpan = styled.span`
  font-size: 0.8em;
  color: #592e6f;
  transition: 0.3s color linear;
  &:hover {
    color: #2fc6c0;
  }
`;

export const ArtboardThumbnailContent = styled.div`
  width: 100px;
  margin: 0;
  border: 1px solid #fbfbff;
  overflow: hidden;
  outline: none;
  position: relative;
`;
export const ArtboardThumbnailContentDiv = styled.div`
  width: 100px;
  margin: 0;
  border: 1px solid #fbfbff;
  overflow: hidden;
  outline: none;
  position: relative;
  //background-image: url(https://staging.dwiz.io/images/transparent-image-ps.png);
  background-repeat: repeat;
  background-size: 15px;
  background-color: black;
`;

export const ArtboardThumbnailContentBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #0b0c0d;
  transition: opacity 0.3s linear;
  opacity: 0;
  visibility: hidden;
`;
export const ArtboardThumbnailLoadingDot = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background: rgba(251, 251, 255, 0.5);
  animation: custom-bounce-animation 1s infinite ease-in-out;
  position: relative;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  display: block;
`;
export const ArtboardThumbnailContentImg = styled.img`
  max-width: 100px;
  min-height: 40px;
`;

export const ArtboardAddNewBtn = styled.a`
  color: #444549;
  cursor: pointer;
  text-align: center;
  height: 64px;
  position: relative;
  display: inline-block;
  width: 100%;
  text-decoration: none;
  background-color: transparent;
  &::hover {
    color: #592e6f;
  }
`;

export const ArtboardAddNewBtnSpan1 = styled.span`
  width: 30px;
  height: 30px;
  -webkit-border-radius: 30px;
  -moz-border-radius: 30px;
  line-height: 28px;
  border: 1px solid #592e6f;
  color: #592e6f;
  font-size: 1.36em;
  display: inline-block;
  will-change: transition;
  transition: all 0.3s ease;
`;

export const ArtboardAddNewBtnSpan2 = styled.span`
  color: #d6d6d6;
  font-size: 0.75em;
  text-transform: uppercase;
  padding-top: 10px;
  display: inline-block;
  width: 100%;
  will-change: transition;
  transition: all 0.3s ease;

  &: hover {
    color: #592e6f;
  }
`;

export const ShapeFiltersWrapper = styled.div`
  margin-top: 0;
  z-index: 99;
  min-width: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ShapeFiltersLayer = styled.div`
  width: 100%;
`;

export const ShapeFiltersControls = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ShapeColorWrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ShapeColorWrapperItem = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ShapeColorWrapperItemTitle = styled.span`
  font-size: 9px;
  min-width: 21px;
  color: white;
`;

export const ShapeColorWrapperItemColor = styled.span`
  width: 31.5px;
  height: 31.5px;
  margin-top: 3.5px;
  border-radius: 50%;
  border: 1px solid #fff;
  cursor: pointer;
`;

export const ShapeOutlineWrapper = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 3.5px;
`;

export const ShapeOutlineInput = styled.input`
  padding: 4.9px 16.8px 2.8px 7px;
  margin: 2px 0 0;
  height: 24.5px;
  font-size: 9.8px;
  border: none;
  background-color: #515988;
  color: #fbfbff;
  user-select: none;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  border: none;
  outline: none;
`;

export const ShapeOutlineUl = styled.ul`
  width: 100%;
  max-height: 150px;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #515988;
  z-index: 99999999999;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  padding: 0.5rem 0;
  margin: 0.125rem 0 0;
  float: left;
`;

export const ShapeOutlineLi = styled.li`
  padding: 10px;
  background-color: transparent !important;
  cursor: pointer;
  display: block;
  width: 100%;
  clear: both;
  font-weight: 400;
  color: #fff;
  text-align: inherit;
  white-space: nowrap;
  border: 0;
  &:hover {
    background-color: #474f78 !important;
  }
`;

export const RightSidePanelColorPicker = styled.div`
  padding: 0 10.5px;
  height: 100%;
`;

export const EmptyFiltersWrapper = styled.div`
  padding: 0 10.5px;
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const SvgFilterWrapper = styled.div`
  position: relative;
  border-bottom: none;
  display: flex;
  justify-content: space-around;
`;

export const SvgFilterContainer = styled.div`
  z-index: 99;
  min-width: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const SvgFilterColorsContainer = styled.div`
  display: block;
`;

export const SvgColorSpan = styled.span`
  font-size: 9px;
  min-width: 21px;
  display: block;
  padding: 7px 10.5px 0;
  color: white;
`;

export const SvgColorBoxWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const SvgColorsContainer = styled.div`
  padding: 0 7px 3.5px 7px;
`;

export const SvgSingleColorSpan = styled.span`
  font-size: 9px;
  font-weight: bold;
  color: white;
`;

export const GroupFilterWrapper = styled.div`
  z-index: 99;
  min-width: 100%;
  width: 100%;
`;

export const GroupFilterBtn = styled.button`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 7px;
  padding: 3.5px;
  background-color: #515988;
  cursor: pointer;
  border: 1px solid #fff;
  outline: none;
  color: #fff;
`;

export const GroupFilterBtnSpan = styled.span`
  font-size: 12px;
  padding-left: 5px;
`;

export const TextFilterWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 90%;
  margin-left: 5%;
`;

export const VideoTimelineWrapper = styled.div`
  height: 170px;
  display: block;
  width: 100%;
  position: absolute;
  background-image: linear-gradient(
    121deg,
    #20273f 0,
    #262d46 43%,
    #252d46 100%
  );
  z-index: 100;
  animation-fill-mode: both;
  animation-duration: 0.5s;
  right: 0;
  bottom: 0px;
`;

export const VideoTimelineInnerWrapper = styled.div`
  flex-direction: row;
  position: absolute;
  left: 0;
  display: flex;
  height: 100%;
  right: 17px;
`;

export const PlayAnimationWrapper = styled.div`
  cursor: default;
  width: unset;
  padding: 15px;
  height: 100%;
  text-align: center;
  position: relative;
  border-right: 1px solid #fd9432;
`;

export const PlayAnimationBg = styled.div`
  margin-top: 0;
  width: 100px;
`;

export const PlayAnimationBtnWrapper = styled.div`
  cursor: default;
  width: 70px;
  height: 70px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  background-color: #20273f;
  background-clip: padding-box;
  border: solid 3px transparent;
  border-radius: 50px;
`;

export const PlayAnimationBtn = styled.button`
  position: absolute;
  top: 55%;
  left: 55%;
  transform: translate(-50%, -50%);
  padding: 0;
  margin: auto;
  background-color: transparent;
  border-radius: 8px;
  border: 0 none;
  outline: none !important;
`;

export const PlayAnimationScrollerWrapper = styled.div`
  position: relative;
  width: 100%;
  background-image: linear-gradient(
    0deg,
    rgba(32, 40, 65, 0.2) 0,
    #121625 100%
  );
  background-size: 100% 40px;
  background-repeat: no-repeat;
  overflow: hidden !important;
  overflow-anchor: none;
  touch-action: auto;
`;

export const ScrollZoneWrapper = styled.div`
  cursor: pointer;
  overflow: auto;
`;

export const ScrollZoneInnerWrapper = styled.div`
  width: 100%;
  position: relative;
`;

export const ScrollZone = styled.div`
  cursor: not-allowed;
  width: 2500px;
`;

export const TimelineRuler = styled.div`
  flex-direction: row;
  height: calc(32.9px);
  display: flex;
  color: #fd9432;
  position: relative;
  cursor: pointer;
`;

export const TimelineRulerSpan = styled.span`
  height: 14px;
  width: 210px;
  padding-left: 3.5px;
  padding-top: 5.6px;
  font-size: 7px;
  border-left: 1px solid #fd9432;
`;

export const AnimationTimeline = styled.div`
  height: 50px;
  position: relative;
  margin-bottom: 7px;
  cursor: not-allowed;
  width: 2500px;
`;

export const VideosTimeline = styled.div`
  height: 60px;
  position: relative;
  margin-bottom: 7px;
  cursor: not-allowed;
  width: 2500px;
`;

export const TimelineIndicator = styled.span`
  /* left: 0px; */
  width: 8.4px;
  position: absolute;
  top: 0;
  border-left: 2px solid #fd9432;
  height: 100%;
  z-index: 5;
`;

export const TimelineIndicatorScrubber = styled.span`
  width: 8.4px;
  /* left: -1.4px; */
  height: 14px;
  cursor: ew-resize;
  background-color: #fd9432;
  position: absolute;
`;

export const TimelineRailX = styled.div`
  left: 0px;
  bottom: 0px;
  width: 743px;
  margin-bottom: 7px;
  margin-right: 14px;
  opacity: 1 !important;
  background-color: transparent !important;
  height: 15px;
  position: absolute;
  -webkit-transition: background-color 0.2s linear, opacity 0.2s linear;
`;

export const TimelineRailXThumb = styled.div`
  left: 0px;
  width: 200px;
  background-color: #fd9432;
  border-radius: 6px;
  -webkit-transition: background-color 0.2s linear, height 0.2s ease-in-out;
  height: 6px;
  bottom: 2px;
  position: absolute;
`;

export const TimelineRailY = styled.div`
  top: 0px;
  right: 0px;
  display: none;
  opacity: 0;
  -webkit-transition: background-color 0.2s linear, opacity 0.2s linear;
  width: 15px;
  position: absolute;
`;

export const TimelineRailYThumb = styled.div`
  top: 0px;
  height: 0px;
  -webkit-transition: background-color 0.2s linear, width 0.2s ease-in-out;
  width: 6px;
  right: 2px;
  position: absolute;
  background-color: #aaa;
  border-radius: 6px;
`;

export const UploadImg = styled.img`
  position: relative;
  top: 15px;
  left: 40px;
`;

export const UploadPara = styled.p`
  color: #e87855;
  font-size: 0.75em;
  position: relative;
  top: -6px;
  left: 0px;
  text-align: center;
`;

export const UploadSpan = styled.span`
  color: #e6e6e8;
  font-size: "0.75em";
`;

export const UploadDiv = styled.div`
  display: block;
  border-bottom: 1px solid #b1b1b7;
  padding-bottom: 10px;
  width: 100%;
  margin: 0 auto 20px;
`;

export const UploadInnerDiv = styled.div`
  border-radius: 50%;
  margin: auto;
  position: relative;
  width: 42%;
  border: 1px dashed #e87855;
  cursor: pointer;
  height: 120px;
`;

export const ImgUpload = styled.input`
  opacity: 0;
  position: absolute;
  z-index: 1;
  left: 94px;
  top: 0;
  width: 111px;
  height: 124px;
  cursor: pointer;
`;

export const UnPaidPopup = styled.div`
  height: 22%;
  position: absolute;
  width: 40%;
  left: 26%;
  z-index: 111;
  cursor: pointer;
`;

export const CropFilterWrapper = styled.div`
  width: 100%;
  position: relative;
  border-bottom: none;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: -ms-flex;
  display: flex;
  -webkit-justify-content: space-between;
  -moz-justify-content: space-between;
  -ms-justify-content: space-between;
  justify-content: space-between;
`;

export const CropFilterPanel = styled.div`
  min-width: 100%;
  color: #fff;
  text-align: center;
  padding: 5px 0 0 0;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-around;
`;

export const VideoTimelineImageMainDiv = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  flex-direction: row;
  // position: relative;
  background-color: #423a6f;
  border-radius: 8px;
  border: 1px solid #423a6f;
  overflow: hidden;
  top: 1px;
  box-shadow: -5px 13px 16px 0 rgb(0 0 0 / 61%);
  cursor: move;
`;

export const AnimationTimelineMainDiv = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  flex-direction: row;
  position: absolute;
  background-color: #423a6f;
  border-radius: 8px;
  overflow: hidden;
  top: 1px;
  box-shadow: -5px 13px 16px 0 rgb(0 0 0 / 61%);
  cursor: move;
`;

export const AnimatedTextDiv = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
  color: white;
  flex: 1;
  text-align: center;
  padding: 4px 45px 0 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 42px;
  vertical-align: middle;
  font-size: 14px;
`;

export const LeftDurationHandle = styled.div`
  cursor: col-resize;
  height: 100%;
  position: absolute;
  z-index: 2;
  width: 20px;
`;

export const RightDurationHandle = styled.div`
  cursor: col-resize;
  height: 100%;
  position: absolute;
  right: 0;
  z-index: 2;
  width: 20px;
`;

export const VideoSliders = styled.span`
  height: 56%;
  width: 20px;
  display: inline-block;
  position: relative;
  top: 22%;
`;
export const DeleteButton = styled.div`
  z-index: 1000;
  position: absolute;
  bottom: 39px;
  &:hover {
    color: red;
  }
`;

export const DublicateButton = styled.div`
  &: hover {
    color: #2fc6c0;
  }
  position: absolute;
  top: 44px;
  z-index: 1000;
`;
export const HoverButton = styled.div`
  margin-top: 17px;
  font-size: 14px;
  margin-left: 17px;
  color: #592e6f;
`;
