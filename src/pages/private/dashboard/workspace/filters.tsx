import React, { useEffect, useRef, useState, useContext } from "react";
import rgbHex from "rgb-hex";
import { ArrowBackIos } from "@material-ui/icons";
import { fontss } from "./fonts";
//import {fabric} from 'fabric';
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";
import { ActiveEditorContext } from "../../../../components/layout/private";
import { ReactComponent as LeftAlign } from "../../../../assets/svg/animationIcons/align-left.svg";
import { ReactComponent as RightAlign } from "../../../../assets/svg/animationIcons/align-right.svg";
import { ReactComponent as CenterAlign } from "../../../../assets/svg/animationIcons/align-center.svg";
import {
  RightSidePanelTabs,
  RightSidePanelTabsBtnContainer,
  RightSidePanelTabsBtn,
  RightSidePanelTabsBtnIconContainer,
  RightSidePanelTabsBtnTitle,
  RightSidePanelActionContainer,
  RightSidePanelActionPanel,
  RightSidePanelActionPanelContent,
  LockCopyDelete,
  Flipper,
  Transperency,
  MoreActions,
  LockCopyDeleteBtn,
  RightSidePanelActionPanelP,
  RightSidePanelActionPanelFiltersDiv,
  RightSidePanelActionPanelFiltersDivLabel,
  RightSidePanelActionPanelFiltersDivLabelImg,
  RightSidePanelActionPanelFiltersDivLabelP,
  TransperencySlider,
  CropImageSection,
  CropImageSectionInner,
  CropImageSectionInnerBtn,
  AdvancedImgFilterLabel,
  AdvancedImgFilterLabelDiv,
  AdvancedImgFilterLabelDivSpan,
  AdvancedFiltersDiv,
  AdvancedFiltersDivChild,
  AdvancedFiltersDivChildP,
  AdvancedFiltersSlider,
  LayersContainer,
  LayersContainerList,
  LayersContainerListImgContainer,
  LayersContainerListScrollerContainer,
  LayersContainerListImgContainerHolder,
  LayersContainerListImgContainerOrder,
  LayersContainerListImgContainerOrderBtn,
  LayersContainerListImgContainerOrderBtnSpan,
  LayersContainerListImgContainerOrderBtnSpanIcon,
  LayersContainerListScrollerDiv,
  LayersContainerListScrollerList,
  LayersContainerListScrollerListItem,
  LayersContainerListScrollerListItemCondition,
  LayersContainerListScrollerListItemName,
  LayersContainerListScrollerListItemBtn,
  LayersContainerListScrollerListItemBtnHover,
  ArtboardWrapper,
  ArtboardThumbnailWrapper,
  ArtboardThumbnailDeleteSpan,
  ArtboardThumbnailDelete,
  ArtboardThumbnailDuplicateSpan,
  ArtboardThumbnailDiv,
  ArtboardThumbnailActions,
  ArtboardThumbnailContent,
  ArtboardAddNewBtn,
  ArtboardAddNewBtnSpan1,
  ArtboardThumbnailDuplicate,
  ArtboardWrapperContainer,
  ArtboardThumbnailLoadingDot,
  ArtboardAddNewBtnSpan2,
  ArtboardThumbnailContentBg,
  ArtboardThumbnailContentImg,
  ArtboardThumbnailContentDiv,
  ShapeFiltersWrapper,
  ShapeFiltersLayer,
  ShapeFiltersControls,
  ShapeColorWrapper,
  ShapeOutlineWrapper,
  ShapeColorWrapperItem,
  ShapeColorWrapperItemTitle,
  ShapeColorWrapperItemColor,
  ShapeOutlineInput,
  ShapeOutlineUl,
  ShapeOutlineLi,
  RightSidePanelColorPicker,
  EmptyFiltersWrapper,
  GroupFilterWrapper,
  GroupFilterBtn,
  GroupFilterBtnSpan,
  SvgFilterWrapper,
  SvgFilterContainer,
  SvgFilterColorsContainer,
  SvgColorSpan,
  SvgColorBoxWrapper,
  SvgColorsContainer,
  SvgSingleColorSpan,
  TextFilterWrapper,
  UploadImg,
  UploadPara,
  UploadSpan,
  ImgUpload,
  UploadInnerDiv,
  UploadDiv,
  CropFilterWrapper,
  CropFilterPanel,
  DeleteButton,
  DublicateButton,
  HoverButton,
} from "./styledComponent";
import { CustomTooltip } from "./../../../../components/CustomTooltip";
import { ReactComponent as Artboard } from "./../../../../assets/svg/artboard.svg";
import { ReactComponent as Layers } from "./../../../../assets/svg/layers.svg";
import { ReactComponent as Bin } from "./../../../../assets/svg/bin.svg";
import { ReactComponent as Duplicate } from "./../../../../assets/svg/duplicate.svg";
import { ReactComponent as LockOpen } from "./../../../../assets/svg/lockOpen.svg";
import { ReactComponent as Lock } from "./../../../../assets/svg/lock.svg";
import { ReactComponent as FlipHor } from "./../../../../assets/svg/flipHor.svg";
import { ReactComponent as FlipVer } from "./../../../../assets/svg/flipVer.svg";
import { ReactComponent as ApplyButton } from "./../../../../assets/svg/tick.svg";
import { ReactComponent as CancelBtn } from "./../../../../assets/svg/cross.svg";
import { ReactComponent as ResetBtn } from "./../../../../assets/svg/undo.svg";
import parrot_normal from "./../../../../assets/parrot-normal.png";
import parrot_polaroid from "./../../../../assets/parrot-polaroid.png";
import parrot_sepia from "./../../../../assets/parrot-sepia.png";
import parrot_technicolor from "./../../../../assets/parrot-technicolor.png";
import parrot_vintage from "./../../../../assets/parrot-vintage.png";
import parrot_grayscale from "./../../../../assets/parrot-grayscale.png";
import { ReactComponent as Crop } from "./../../../../assets/svg/crop.svg";
import { ReactComponent as LayersSolid } from "./../../../../assets/svg/layersSolid.svg";
import { ReactComponent as GroupIcon } from "./../../../../assets/svg/group.svg";
import { ReactComponent as UnGroupIcon } from "./../../../../assets/svg/ungroup.svg";
import {
  ColorPickerPanel,
  ColorPickerPanelSeparator,
  ColorPickerLibrary,
  SavedColorsList,
} from "./ColorPicker";
import { usePrevious } from "./../../../../lib/usePreviosHook";
import NativeSelect from "@material-ui/core/NativeSelect";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { deleteArtboard, duplicateArtboard } from "./artboard";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFilledInput-root": {
      height: "35px",
      color: "white",
    },
  },
  textarea: {
    resize: "none",
  },
}));

const fontSizes = [
  "4",
  "6",
  "8",
  "10",
  "12",
  "14",
  "16",
  "18",
  "20",
  "24",
  "30",
  "36",
  "40",
  "48",
  "52",
  "72",
  "80",
  "88",
  "90",
  "96",
  "104",
  "120",
  "144",
];

const FilterTabs = (props: any) => {
  const {
    setShowArtboard,
    setShowLayers,
    showArtboard,
    showLayers,
    setShowColorPicker,
  } = props;

  return (
    <RightSidePanelTabs>
      <RightSidePanelTabsBtnContainer
        style={{ borderRadius: 0, borderRight: "2px solid #666c84" }}
        onClick={() => {
          setShowArtboard((old: boolean) => !old);
          setShowLayers(false);
          setShowColorPicker(false);
        }}
      >
        <RightSidePanelTabsBtn>
          <RightSidePanelTabsBtnIconContainer>
            <Artboard style={{ height: "22px", width: "26px" }} />
          </RightSidePanelTabsBtnIconContainer>
          <RightSidePanelTabsBtnTitle>
            {!showArtboard ? "Artboards" : "Hide Panel"}
          </RightSidePanelTabsBtnTitle>
        </RightSidePanelTabsBtn>
      </RightSidePanelTabsBtnContainer>
      <RightSidePanelTabsBtnContainer
        onClick={() => {
          setShowLayers((old: boolean) => !old);
          setShowArtboard(false);
          setShowColorPicker(false);
        }}
      >
        <RightSidePanelTabsBtn>
          <RightSidePanelTabsBtnIconContainer>
            <Layers style={{ height: "22px", width: "26px" }} />
          </RightSidePanelTabsBtnIconContainer>
          <RightSidePanelTabsBtnTitle>
            {!showLayers ? "Layers" : "Hide Panel"}
          </RightSidePanelTabsBtnTitle>
        </RightSidePanelTabsBtn>
      </RightSidePanelTabsBtnContainer>
    </RightSidePanelTabs>
  );
};

const CommonFilters = (props: any) => {
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const {
    opacity,
    setOpacity,
    imageTransperency,
    canvas,
    flipImage,
    lockObject,
    unLockObject,
    cloneObject,
    deleteObject,
  } = props;

  useEffect(() => {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        if (isLocked) {
          lockObject(activeObject, canvas);
        } else {
          unLockObject(activeObject, canvas);
        }
      }
    }
  }, [isLocked, canvas, lockObject, unLockObject]);

  const cloneObjects = () => {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        cloneObject(activeObject, canvas);
      }
    }
  };

  const deleteObjects = () => {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        deleteObject(activeObject, canvas);
      }
    }
  };

  return (
    <>
      <LockCopyDelete>
        <LockCopyDeleteBtn onClick={() => setIsLocked((old) => !old)}>
          {isLocked ? (
            <LockOpen style={{ height: "18px", width: "18px" }} />
          ) : (
            <Lock style={{ height: "18px", width: "18px" }} />
          )}
        </LockCopyDeleteBtn>
        <LockCopyDeleteBtn onClick={cloneObjects}>
          <Duplicate style={{ height: "18px", width: "18px" }} />
        </LockCopyDeleteBtn>
        <LockCopyDeleteBtn
          onClick={deleteObjects}
          style={{ marginRight: "63px" }}
        >
          <Bin style={{ height: "18px", width: "18px" }} />
        </LockCopyDeleteBtn>
      </LockCopyDelete>
      <Flipper>
        <div style={{ width: "54%" }}>
          <RightSidePanelActionPanelP>Flip</RightSidePanelActionPanelP>
          <div style={{ marginTop: "10px" }}>
            <LockCopyDeleteBtn style={{ marginRight: "10px" }}>
              <FlipHor
                onClick={() => flipImage("flipX", canvas)}
                style={{ height: "18px", width: "18px" }}
              />
            </LockCopyDeleteBtn>
            <LockCopyDeleteBtn>
              <FlipVer
                onClick={() => flipImage("flipY", canvas)}
                style={{ height: "18px", width: "18px" }}
              />
            </LockCopyDeleteBtn>
          </div>
        </div>
      </Flipper>
      <Transperency>
        <RightSidePanelActionPanelP>Transparency</RightSidePanelActionPanelP>
        <div
          style={{ marginTop: "28px", width: "210px" }}
          className="transperency-slider"
        >
          <TransperencySlider
            aria-label="Small steps"
            defaultValue={1}
            step={0.1}
            min={0}
            max={1}
            valueLabelDisplay="off"
            value={opacity}
            onChange={(event, newValue) =>
              imageTransperency(newValue, canvas, setOpacity)
            }
          />
        </div>
      </Transperency>
    </>
  );
};

const ImageFilters = (props: any) => {
  const {
    imageColorFilter,
    canvas,
    applyFilter,
    clearFilter,
    applyFilterValue,
    brightness,
    setBrightness,
    saturation,
    setSaturation,
    contrast,
    setContrast,
    tint,
    setTint,
    hue,
    setHue,
    blur,
    setBlur,
    setCropImg,
    service,
  } = props;

  // let service = cropService(canvas)

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [isFilter, setIsFilter] = useState({
    gray: false,
    vintage: false,
    sepia: false,
    technicolor: false,
    polaroid: false,
  });
  const handleChange = (
    index: number,
    filter: string,
    newValue: any,
    method: any
  ) => {
    method(newValue);
    applyFilterValue(index, filter, parseFloat(newValue), canvas);
  };

  const handleFilters = (
    index: number,
    method: any,
    newValue: any,
    isTint: boolean
  ) => {
    method(newValue);
    applyFilter(index, newValue, isTint, canvas);
  };

  const clearAllfilters = () => {
    setBrightness(0);
    setSaturation(0);
    setContrast(0);
    setBlur(0);
    setTint(0);
    setHue(0);
    applyFilterValue(0, "brightness", parseFloat("0"), canvas);
    applyFilterValue(1, "saturation", parseFloat("0"), canvas);
    applyFilterValue(2, "contrast", parseFloat("0"), canvas);
    applyFilterValue(3, "blur", parseFloat("0"), canvas);
    applyFilter(4, 0, true, canvas);
    applyFilter(5, 0, false, canvas);
  };

  return (
    <div>
      <CropImageSection
        className="crop-image-section"
        onClick={() => {
          setCropImg(service);
          service.enableCrop(canvas.getActiveObject());
        }}
      >
        <CropImageSectionInner>
          <div style={{ flex: 1 }}>
            <CropImageSectionInnerBtn>
              <Crop height={30} width={40} />
              <span
                style={{ fontSize: "12px", fontFamily: "Lato, sans-serif" }}
              >
                Crop Image
              </span>
            </CropImageSectionInnerBtn>
          </div>
        </CropImageSectionInner>
      </CropImageSection>
      <RightSidePanelActionPanelP
        style={{ marginTop: "15px", marginBottom: "15px" }}
      >
        Filters
      </RightSidePanelActionPanelP>
      <RightSidePanelActionPanelFiltersDiv>
        <RightSidePanelActionPanelFiltersDivLabel
          onClick={() => {
            imageColorFilter(canvas, "normal");
            setIsFilter({
              gray: false,
              vintage: false,
              sepia: false,
              technicolor: false,
              polaroid: false,
            });
          }}
        >
          <RightSidePanelActionPanelFiltersDivLabelImg
            src={parrot_normal}
            alt="parrot_normal"
            style={{ boxShadow: "0 0 0 3px #2fc6c0" }}
          />
          <RightSidePanelActionPanelFiltersDivLabelP>
            normal
          </RightSidePanelActionPanelFiltersDivLabelP>
        </RightSidePanelActionPanelFiltersDivLabel>
        <RightSidePanelActionPanelFiltersDivLabel
          onClick={() => {
            !isFilter.gray && imageColorFilter(canvas, "grey");
            setIsFilter({
              gray: true,
              vintage: false,
              sepia: false,
              technicolor: false,
              polaroid: false,
            });
          }}
        >
          <RightSidePanelActionPanelFiltersDivLabelImg
            src={parrot_grayscale}
            alt="parrot_grayscale"
          />
          <RightSidePanelActionPanelFiltersDivLabelP>
            greyscale
          </RightSidePanelActionPanelFiltersDivLabelP>
        </RightSidePanelActionPanelFiltersDivLabel>
        <RightSidePanelActionPanelFiltersDivLabel
          onClick={() => {
            !isFilter.vintage && imageColorFilter(canvas, "vintage");
            setIsFilter({
              gray: false,
              vintage: true,
              sepia: false,
              technicolor: false,
              polaroid: false,
            });
          }}
        >
          <RightSidePanelActionPanelFiltersDivLabelImg
            src={parrot_vintage}
            alt="parrot_vintage"
          />
          <RightSidePanelActionPanelFiltersDivLabelP>
            vintage
          </RightSidePanelActionPanelFiltersDivLabelP>
        </RightSidePanelActionPanelFiltersDivLabel>
        <RightSidePanelActionPanelFiltersDivLabel
          onClick={() => {
            !isFilter.sepia && imageColorFilter(canvas, "sepia");
            setIsFilter({
              gray: false,
              vintage: false,
              sepia: true,
              technicolor: false,
              polaroid: false,
            });
          }}
        >
          <RightSidePanelActionPanelFiltersDivLabelImg
            src={parrot_sepia}
            alt="parrot_sepia"
          />
          <RightSidePanelActionPanelFiltersDivLabelP>
            sepia
          </RightSidePanelActionPanelFiltersDivLabelP>
        </RightSidePanelActionPanelFiltersDivLabel>
        <RightSidePanelActionPanelFiltersDivLabel
          onClick={() => {
            !isFilter.technicolor && imageColorFilter(canvas, "technicolor");
            setIsFilter({
              gray: false,
              vintage: false,
              sepia: false,
              technicolor: true,
              polaroid: false,
            });
          }}
        >
          <RightSidePanelActionPanelFiltersDivLabelImg
            src={parrot_technicolor}
            alt="parrot_technicolor"
          />
          <RightSidePanelActionPanelFiltersDivLabelP>
            technicolor
          </RightSidePanelActionPanelFiltersDivLabelP>
        </RightSidePanelActionPanelFiltersDivLabel>
        <RightSidePanelActionPanelFiltersDivLabel
          onClick={() => {
            !isFilter.polaroid && imageColorFilter(canvas, "polaroid");
            setIsFilter({
              gray: false,
              vintage: false,
              sepia: false,
              technicolor: false,
              polaroid: true,
            });
          }}
        >
          <RightSidePanelActionPanelFiltersDivLabelImg
            src={parrot_polaroid}
            alt="parrot_polaroid"
          />
          <RightSidePanelActionPanelFiltersDivLabelP>
            polaroid
          </RightSidePanelActionPanelFiltersDivLabelP>
        </RightSidePanelActionPanelFiltersDivLabel>
      </RightSidePanelActionPanelFiltersDiv>
      <AdvancedImgFilterLabel
        className={`advancedImgFilterLabel ${
          showAdvancedFilters ? "hideAdvancedFilters" : ""
        }`}
        onClick={() => setShowAdvancedFilters((old) => !old)}
      >
        <AdvancedImgFilterLabelDiv className="advancedImgFilterLabelDiv">
          <AdvancedImgFilterLabelDivSpan>
            {!showAdvancedFilters ? "ADVANCED" : "HIDE"}
          </AdvancedImgFilterLabelDivSpan>
        </AdvancedImgFilterLabelDiv>
      </AdvancedImgFilterLabel>
      {showAdvancedFilters && (
        <AdvancedFiltersDiv>
          <AdvancedFiltersDivChild>
            <AdvancedFiltersDivChildP>brightness</AdvancedFiltersDivChildP>
            <AdvancedFiltersSlider
              aria-label="Small steps"
              defaultValue={0}
              step={0.1}
              min={0}
              max={1}
              valueLabelDisplay="off"
              value={brightness}
              onChange={(event, newValue) =>
                handleChange(0, "brightness", newValue, setBrightness)
              }
            />
          </AdvancedFiltersDivChild>
          <AdvancedFiltersDivChild>
            <AdvancedFiltersDivChildP>saturation</AdvancedFiltersDivChildP>
            <AdvancedFiltersSlider
              aria-label="Small steps"
              defaultValue={0}
              step={0.1}
              min={0}
              max={1}
              valueLabelDisplay="off"
              value={saturation}
              onChange={(event, newValue) =>
                handleChange(1, "saturation", newValue, setSaturation)
              }
            />
          </AdvancedFiltersDivChild>
          <AdvancedFiltersDivChild>
            <AdvancedFiltersDivChildP>contrast</AdvancedFiltersDivChildP>
            <AdvancedFiltersSlider
              aria-label="Small steps"
              defaultValue={0}
              step={0.1}
              min={0}
              max={1}
              valueLabelDisplay="off"
              value={contrast}
              onChange={(event, newValue) =>
                handleChange(2, "contrast", newValue, setContrast)
              }
            />
          </AdvancedFiltersDivChild>
          <AdvancedFiltersDivChild>
            <AdvancedFiltersDivChildP>blur</AdvancedFiltersDivChildP>
            <AdvancedFiltersSlider
              aria-label="Small steps"
              defaultValue={0}
              step={0.1}
              min={0}
              max={1}
              valueLabelDisplay="off"
              value={blur}
              onChange={(event, newValue) =>
                handleChange(3, "blur", newValue, setBlur)
              }
            />
          </AdvancedFiltersDivChild>
          <AdvancedFiltersDivChild>
            <AdvancedFiltersDivChildP>tint</AdvancedFiltersDivChildP>
            <AdvancedFiltersSlider
              aria-label="Small steps"
              defaultValue={0}
              step={0.1}
              min={0}
              max={1}
              valueLabelDisplay="off"
              value={tint}
              onChange={(event, newValue) =>
                handleFilters(4, setTint, newValue, true)
              }
            />
          </AdvancedFiltersDivChild>
          <AdvancedFiltersDivChild>
            <AdvancedFiltersDivChildP>hue</AdvancedFiltersDivChildP>
            <AdvancedFiltersSlider
              aria-label="Small steps"
              defaultValue={0}
              step={0.1}
              min={0}
              max={1}
              valueLabelDisplay="off"
              value={hue}
              onChange={(event, newValue) =>
                handleFilters(5, setHue, newValue, false)
              }
            />
          </AdvancedFiltersDivChild>
          <AdvancedFiltersDivChild
            style={{ cursor: "pointer" }}
            onClick={() => clearAllfilters()}
          >
            <AdvancedFiltersDivChildP>Reset</AdvancedFiltersDivChildP>
          </AdvancedFiltersDivChild>
        </AdvancedFiltersDiv>
      )}
    </div>
  );
};

const ArtboardActions = (props: any) => {
  const {
    addArtBoard,
    activateArtBoard,
    updatedJson,
    loadCanvasOnArtBoard,
    canvas,
    setupdatedJson,
    setActivateArtBoard,
    currentWidth,
    currentHeight,
  } = props;
  const [purpleBorderIndex, setPurpleBorderIndex] = React.useState(0);

  return (
    <ArtboardWrapper>
      <ArtboardWrapperContainer>
        <ArtboardThumbnailDiv>
          {updatedJson.composer_object?.map((val: any, index: any) => (
            <ArtboardThumbnailWrapper
              className={
                index + 1 === activateArtBoard ? "activateArtBoard" : ""
              }
              key={index}
            >
              <ArtboardThumbnailActions>
                <ArtboardThumbnailDuplicate>
                  <ArtboardThumbnailDuplicateSpan
                    onClick={() =>
                      duplicateArtboard(
                        updatedJson,
                        val,
                        setupdatedJson,
                        canvas
                      )
                    }
                  >
                    duplicate
                  </ArtboardThumbnailDuplicateSpan>
                </ArtboardThumbnailDuplicate>
                {updatedJson.composer_object.length > 1 && (
                  <ArtboardThumbnailDelete>
                    <ArtboardThumbnailDeleteSpan
                      onClick={() =>
                        deleteArtboard(
                          updatedJson,
                          index,
                          setupdatedJson,
                          canvas,
                          setActivateArtBoard
                        )
                      }
                    >
                      delete
                    </ArtboardThumbnailDeleteSpan>
                  </ArtboardThumbnailDelete>
                )}
              </ArtboardThumbnailActions>
              <ArtboardThumbnailContent
                style={
                  index === purpleBorderIndex
                    ? { border: "2px solid #592e6f" }
                    : { border: "1px solid #fbfbff" }
                }
                onClick={() => {
                  console.log(val.thumb);
                  setPurpleBorderIndex(index);
                  //  setCurrentArtBoardId( val.artboardId)
                  loadCanvasOnArtBoard(
                    val.artboardId,
                    setActivateArtBoard,
                    updatedJson,
                    canvas
                  );
                }}
              >
                <ArtboardThumbnailContentDiv
                  style={{
                    backgroundColor:
                      canvas.getObjects.length > 0 ? "black" : "white",
                  }}
                >
                  <ArtboardThumbnailContentBg>
                    <ArtboardThumbnailLoadingDot />
                  </ArtboardThumbnailContentBg>
                  <ArtboardThumbnailContentImg
                    style={{ height: (100 * currentHeight) / currentWidth }}
                    src={val.thumb ? val.thumb : ""}
                    alt={`Artboard-${index + 1}`}
                  />
                </ArtboardThumbnailContentDiv>
              </ArtboardThumbnailContent>
            </ArtboardThumbnailWrapper>
          ))}
          <ArtboardAddNewBtn
            onClick={() => {
              setPurpleBorderIndex((old) => old + 1);
              addArtBoard(
                canvas,
                updatedJson,
                setupdatedJson,
                setActivateArtBoard
              );
            }}
          >
            <ArtboardAddNewBtnSpan1>+</ArtboardAddNewBtnSpan1>
            <ArtboardAddNewBtnSpan2>add new board</ArtboardAddNewBtnSpan2>
          </ArtboardAddNewBtn>
        </ArtboardThumbnailDiv>
      </ArtboardWrapperContainer>
    </ArtboardWrapper>
  );
};

const LayerListContainer = (props: any) => {
  const {
    canvas,
    setLayer,
    unLockObject,
    lockObject,
    cloneObject,
    deleteObject,
  } = props;
  const [activeObjectIndex, setActiveObjectIndex] = useState(1);
  const [layers, setLayers] = useState(canvas.getObjects() || []);
  const [isLocked, setIsLocked] = useState(false);
  const previousLayers: any = usePrevious(layers);

  useEffect(() => {
    if (canvas) {
      canvas.on("selection:updated", () => {
        setLayers(canvas.getObjects());
      });
      canvas.on("canvas:cleared", () => {
        setLayers([]);
      });
    }
  }, [canvas]);

  useEffect(() => {
    if (previousLayers && previousLayers.length !== layers.length) {
      setActiveObjectIndex(layers.length);
    }
  }, [layers, previousLayers]);

  return (
    <div key={isLocked ? "yes" : "no"}>
      {layers.map((val: any, index: any) => (
        <LayersContainerListScrollerListItem
          className={activeObjectIndex === index + 1 ? "active" : ""}
          key={index}
          onClick={() => {
            if (!val.locked) {
              setActiveObjectIndex(index + 1);
              setLayer(val, index, canvas);
              canvas.setActiveObject(canvas.getObjects()[index]);
              canvas.requestRenderAll();
            }
          }}
        >
          <LayersContainerListScrollerListItemCondition
            className={activeObjectIndex === index + 1 ? "item-indication" : ""}
          >
            {val.locked ? <Lock /> : null}
          </LayersContainerListScrollerListItemCondition>
          <LayersContainerListScrollerListItemName>
            {`${index + 1}. ${val.type}.Layer `}
          </LayersContainerListScrollerListItemName>
          <LayersContainerListScrollerListItemBtn className="layer-action-btns">
            <Bin />
            <LayersContainerListScrollerListItemBtnHover
              className="extra-hover"
              onClick={() => {
                deleteObject(val, canvas);
                setLayers(canvas.getObjects());
              }}
            />
          </LayersContainerListScrollerListItemBtn>
          <LayersContainerListScrollerListItemBtn className="layer-action-btns">
            {val.locked ? <LockOpen /> : <Lock />}
            <LayersContainerListScrollerListItemBtnHover
              className="extra-hover"
              onClick={() => {
                setIsLocked((old) => !old);
                val.locked
                  ? unLockObject(val, canvas)
                  : lockObject(val, canvas);
              }}
            />
          </LayersContainerListScrollerListItemBtn>
          <LayersContainerListScrollerListItemBtn className="layer-action-btns">
            <Duplicate />
            <LayersContainerListScrollerListItemBtnHover
              className="extra-hover"
              onClick={() => {
                setIsLocked((old) => !old);
                cloneObject(val, canvas);
                setLayers(canvas.getObjects());
              }}
            />
          </LayersContainerListScrollerListItemBtn>
        </LayersContainerListScrollerListItem>
      ))}
    </div>
  );
};

const LayersAction = (props: any) => {
  const {
    setImagePostion,
    canvas,
    setLayer,
    lockObject,
    unLockObject,
    cloneObject,
    deleteObject,
    transformStyle,
  } = props;

  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    if (
      canvas &&
      canvas.getActiveObject() &&
      canvas.getActiveObject().get("type") === "image" &&
      canvas.getActiveObject()._originalElement &&
      canvas.getActiveObject()._originalElement.currentSrc
    ) {
      setImgSrc(canvas.getActiveObject()._originalElement.currentSrc);
      canvas.on("object:added", () => {
        if (canvas.getActiveObject()) {
          setImgSrc(canvas.getActiveObject()._originalElement.currentSrc);
        }
      });
      canvas.on("selection:created", () => {
        console.log(canvas.getActiveObject()._originalElement.currentSrc);
        setImgSrc(canvas.getActiveObject()._originalElement.currentSrc);
      });
      canvas.on("selection:updated", () => {
        if (canvas.getActiveObject()._originalElement)
          setImgSrc(canvas.getActiveObject()._originalElement.currentSrc);
      });
      canvas.on("selection:cleared", () => {
        setImgSrc("");
      });
    }
  }, [canvas]);
  return (
    // <motion.div
    // initial={{ x: 200, opacity: 0 }}
    // animate={{ x: 0, opacity: 1 }}
    // transition={{transition:"linear" }}>
    <LayersContainer style={{ transform: transformStyle }}>
      <LayersContainerList>
        <LayersContainerListImgContainer>
          <LayersContainerListImgContainerHolder>
            {imgSrc && <img src={imgSrc} width="100%" height="100%" />}
          </LayersContainerListImgContainerHolder>
          <LayersContainerListImgContainerOrder className="layersContainerListImgContainerOrder">
            <CustomTooltip title="Bring to Front" placement="left">
              <LayersContainerListImgContainerOrderBtn
                onClick={() => setImagePostion("front", canvas)}
              >
                <LayersContainerListImgContainerOrderBtnSpan>
                  <LayersContainerListImgContainerOrderBtnSpanIcon />
                </LayersContainerListImgContainerOrderBtnSpan>
              </LayersContainerListImgContainerOrderBtn>
            </CustomTooltip>
            <CustomTooltip title="Bring Forward" placement="left">
              <LayersContainerListImgContainerOrderBtn
                onClick={() => setImagePostion("forword", canvas)}
              >
                <LayersContainerListImgContainerOrderBtnSpan>
                  <LayersContainerListImgContainerOrderBtnSpanIcon />
                </LayersContainerListImgContainerOrderBtnSpan>
              </LayersContainerListImgContainerOrderBtn>
            </CustomTooltip>
            <CustomTooltip title="Send Backward" placement="left">
              <LayersContainerListImgContainerOrderBtn
                onClick={() => setImagePostion("back", canvas)}
              >
                <LayersContainerListImgContainerOrderBtnSpan>
                  <LayersContainerListImgContainerOrderBtnSpanIcon />
                </LayersContainerListImgContainerOrderBtnSpan>
              </LayersContainerListImgContainerOrderBtn>
            </CustomTooltip>
            <CustomTooltip title="Send to Back" placement="left">
              <LayersContainerListImgContainerOrderBtn
                onClick={() => setImagePostion("backwords", canvas)}
              >
                <LayersContainerListImgContainerOrderBtnSpan>
                  <LayersContainerListImgContainerOrderBtnSpanIcon />
                </LayersContainerListImgContainerOrderBtnSpan>
              </LayersContainerListImgContainerOrderBtn>
            </CustomTooltip>
          </LayersContainerListImgContainerOrder>
        </LayersContainerListImgContainer>
        <LayersContainerListScrollerContainer>
          <LayersContainerListScrollerDiv>
            <LayersContainerListScrollerList className="layer-action-list">
              <LayerListContainer
                canvas={canvas}
                setLayer={setLayer}
                lockObject={lockObject}
                unLockObject={unLockObject}
                cloneObject={cloneObject}
                deleteObject={deleteObject}
              />
            </LayersContainerListScrollerList>
          </LayersContainerListScrollerDiv>
        </LayersContainerListScrollerContainer>
      </LayersContainerList>
    </LayersContainer>
    // </motion.div>
  );
};

const ShapesFilters = (props: any) => {
  const {
    objectType,
    canvas,
    setOutlineWidthOfShape,
    borderColor,
    bgColor,
    setShowColorPicker,
    setChangingBgColor,
    setCurrentColor,
  } = props;
  const [outlineValue, setOutline] = useState<number>(0);
  const [showOutlineList, setShowOutlineList] = useState<boolean>(false);

  const changeOutline = (outlineValue: number) => {
    if (canvas) {
      setOutline(outlineValue);
      setOutlineWidthOfShape(canvas, outlineValue);
    }
  };
  return (
    <ShapeFiltersWrapper>
      <ShapeFiltersLayer>
        <ShapeFiltersControls>
          <ShapeColorWrapper>
            <ShapeColorWrapperItem>
              <ShapeColorWrapperItemTitle>
                Border Color
              </ShapeColorWrapperItemTitle>
              <ShapeColorWrapperItemColor
                style={{ backgroundColor: borderColor }}
                onClick={() => {
                  setChangingBgColor(false);
                  setShowColorPicker(true);
                  let activeObj = canvas.getActiveObject();
                  setCurrentColor(activeObj.stroke);
                }}
              />
            </ShapeColorWrapperItem>
            {objectType !== "line" && (
              <ShapeColorWrapperItem>
                <ShapeColorWrapperItemTitle>
                  Fill Color
                </ShapeColorWrapperItemTitle>
                <ShapeColorWrapperItemColor
                  style={{ backgroundColor: bgColor }}
                  onClick={() => {
                    setChangingBgColor(true);
                    setShowColorPicker(true);
                    let activeObj = canvas.getActiveObject();
                    setCurrentColor(activeObj.fill);
                  }}
                />
              </ShapeColorWrapperItem>
            )}
          </ShapeColorWrapper>
          <ShapeOutlineWrapper>
            <ShapeOutlineInput
              type="text"
              value={outlineValue}
              onClick={() => setShowOutlineList((old) => !old)}
            />
            {showOutlineList && (
              <ShapeOutlineUl>
                <ShapeOutlineLi onClick={() => changeOutline(0)}>
                  0
                </ShapeOutlineLi>
                <ShapeOutlineLi onClick={() => changeOutline(1)}>
                  1
                </ShapeOutlineLi>
                <ShapeOutlineLi onClick={() => changeOutline(2)}>
                  2
                </ShapeOutlineLi>
                <ShapeOutlineLi onClick={() => changeOutline(3)}>
                  3
                </ShapeOutlineLi>
                <ShapeOutlineLi onClick={() => changeOutline(4)}>
                  4
                </ShapeOutlineLi>
                <ShapeOutlineLi onClick={() => changeOutline(8)}>
                  8
                </ShapeOutlineLi>
                <ShapeOutlineLi onClick={() => changeOutline(12)}>
                  12
                </ShapeOutlineLi>
                <ShapeOutlineLi onClick={() => changeOutline(16)}>
                  16
                </ShapeOutlineLi>
                <ShapeOutlineLi onClick={() => changeOutline(24)}>
                  24
                </ShapeOutlineLi>
                <ShapeOutlineLi onClick={() => changeOutline(36)}>
                  36
                </ShapeOutlineLi>
                <ShapeOutlineLi onClick={() => changeOutline(72)}>
                  72
                </ShapeOutlineLi>
              </ShapeOutlineUl>
            )}
          </ShapeOutlineWrapper>
        </ShapeFiltersControls>
      </ShapeFiltersLayer>
    </ShapeFiltersWrapper>
  );
};

const SvgFilters = (props: any) => {
  const {
    setShowColorPicker,
    canvas,
    setChangingSvgColor,
    // svgColor,
    // setSvgColor,
    canvasColors,
    setCanvasColors,
    setColorId,
    setSvgColor,
  } = props;
  useEffect(() => {
    if (canvas && canvas.getActiveObject()) {
      const colorObj = canvas.getActiveObject();
      if (colorObj._objects) {
        const colors = colorObj._objects.filter((item: any) => {
          if (item.fill !== "" && item.id !== null) {
            return { fill: item.fill, id: item.id };
          }
        });
        let unique;
        if (colors) {
          console.log(colors);
          unique = [
            ...new Map(colors.map((item: any) => [item["id"], item])).values(),
          ];
        }
        let allColors;
        if (unique) {
          allColors = unique.filter((item: any) => item.fill !== undefined);
        }
        setCanvasColors(allColors);
        canvas.renderAll();
      }
      if (colorObj.fill && !colorObj._objects && !colorObj.path) {
        const colors = colorObj.fill.colorStops.filter((item: any) => {
          if (item.color !== "" && item.id !== null) {
            return { fill: item.fill, id: item.id };
          }
        });
        let unique;
        if (colors) {
          console.log(colors);
          unique = [
            ...new Map(colors.map((item: any) => [item["id"], item])).values(),
          ];
        }
        let allColors;
        if (unique) {
          allColors = unique.filter((item: any) => item.fill !== undefined);
        }
        setCanvasColors(allColors);
        canvas.renderAll();
      }
      if (colorObj.path) {
        const colors = [
          {
            fill: colorObj.fill,
            id: colorObj.id,
          },
        ];
        setCanvasColors(colors);
        canvas.renderAll();
      }
    }
  }, [canvas]);
  return (
    <SvgFilterWrapper>
      <SvgFilterContainer>
        <SvgFilterColorsContainer>
          <SvgColorSpan>Color</SvgColorSpan>
          <SvgColorBoxWrapper>
            {/* to be mapped */}
            {canvasColors.map((item: any, index: any) => {
              return (
                <SvgColorsContainer
                  onClick={() => {
                    setShowColorPicker(true);
                    setChangingSvgColor(true);
                    setColorId(item.id);
                    setSvgColor(item.fill);
                  }}
                >
                  <SvgSingleColorSpan>Color {index + 1}</SvgSingleColorSpan>
                  <div
                    style={{
                      backgroundColor: `${item.fill}`,
                      height: "16.8px",
                      display: "block",
                      border: "1px solid white",
                      width: "100%",
                      cursor: "pointer",
                    }}
                  ></div>
                </SvgColorsContainer>
              );
            })}
          </SvgColorBoxWrapper>
        </SvgFilterColorsContainer>
      </SvgFilterContainer>
    </SvgFilterWrapper>
  );
};

const ColorPicker = (props: any) => {
  const {
    canvas,
    setBgColorOfShape,
    setBgColor,
    changingBgColor,
    setBorderColor,
    setBorderColorOfShape,
    setShowColorPicker,
    setSvgColor,
    changingSvgColor,
    colorId,
    setColorId,
    svgColor,
    setCanvasColors,
    setFontColor,
    changingFontColor,
    fontColor,
    currentColor,
  } = props;
  const [selectedColor, setSelectedColor] = useState<string>("null");
  const [colorFromPicker, setColorFromPicker] = useState<string>(
    `#${rgbHex(255, 255, 255, 1)}`
  );
  const prevColorFromPicker: string =
    usePrevious(colorFromPicker) || colorFromPicker;

  useEffect(() => {
    canvas.on("selection:created", () => {
      let activeObj = canvas.getActiveObject();
      setBgColor(activeObj.fill);
      setBorderColor(activeObj.stroke);
    });
    canvas.on("selection:updated", () => {
      let activeObj = canvas.getActiveObject();
      setBgColor(activeObj.fill);
      setBorderColor(activeObj.stroke);
    });
  }, [canvas]);

  useEffect(() => {
    if (colorFromPicker && prevColorFromPicker) {
      if (
        colorFromPicker.substring(0, 7) !== prevColorFromPicker.substring(0, 7)
      ) {
        if (changingBgColor) {
          setBgColorOfShape(canvas, colorFromPicker);
          setBgColor(colorFromPicker);
        } else if (changingSvgColor) {
          setSvgColor(colorFromPicker);
          console.log(colorFromPicker);
        } else if (changingFontColor) {
          setFontColor(colorFromPicker);
        } else {
          setBorderColorOfShape(canvas, colorFromPicker);
          setBorderColor(colorFromPicker);
        }
      }
    }
  }, [
    colorFromPicker,
    prevColorFromPicker,
    canvas,
    setBgColorOfShape,
    setBgColor,
    changingBgColor,
    setBorderColorOfShape,
    setBorderColor,
  ]);

  useEffect(() => {
    if (selectedColor !== "null") {
      if (changingBgColor) {
        setBgColorOfShape(canvas, selectedColor);
        setBgColor(selectedColor);
      } else {
        setBorderColorOfShape(canvas, selectedColor);
        setBorderColor(selectedColor);
      }
    }
  }, [
    selectedColor,
    canvas,
    setBgColorOfShape,
    setBgColor,
    changingBgColor,
    setBorderColorOfShape,
    setBorderColor,
  ]);
  useEffect(() => {
    const activeObject: any = canvas.getActiveObject();
    if (activeObject.get("type") === "group") {
      for (let i = 0; i < activeObject._objects.length; i++) {
        if (activeObject._objects[i].id === colorId)
          activeObject._objects[i].set({
            fill: svgColor,
          });
      }
      canvas.requestRenderAll();
    }
  }, [svgColor, canvas]);

  useEffect(() => {
    if (changingFontColor) {
      const activeObject: any = canvas.getActiveObject();
      activeObject.set("fill", fontColor);
      canvas.requestRenderAll();
    }
  }, [canvas, fontColor]);

  return (
    <RightSidePanelColorPicker>
      <ArrowBackIos
        style={{
          color: "rgb(255, 255, 255)",
          width: "30px",
          height: "30px",
          position: "absolute",
          top: "54px",
          cursor: "pointer",
        }}
        onClick={() => {
          setShowColorPicker(false);
          setColorId("");
          setSvgColor("");
          setCanvasColors([]);
          setSelectedColor("null");
          setColorFromPicker("");
        }}
      />
      <ColorPickerPanel>
        <SavedColorsList setBgColor={setSelectedColor} />
        <ColorPickerPanelSeparator />
        <ColorPickerLibrary
          setColorFromPicker={setColorFromPicker}
          colorFromPicker={colorFromPicker}
        />
      </ColorPickerPanel>
    </RightSidePanelColorPicker>
  );
};

const EmptyFilters = () => {
  return (
    <EmptyFiltersWrapper>
      <LayersSolid
        style={{
          width: "189px",
          height: "190px",
          opacity: 0.9,
          color: "#666d90",
        }}
      />
    </EmptyFiltersWrapper>
  );
};

const GroupsFilters = (props: any) => {
  const { canvas, isGrouped, setIsGrouped, groupObjects, unGroupObjects } =
    props;
  const gropuClick = () => {
    if (!isGrouped) {
      setIsGrouped(true);
      groupObjects(canvas);
    } else {
      setIsGrouped(false);
      unGroupObjects(canvas);
    }
  };

  return (
    <GroupFilterWrapper>
      <GroupFilterBtn onClick={gropuClick}>
        {isGrouped ? (
          <UnGroupIcon
            style={{
              color: "rgb(255, 255, 255)",
              width: "30px",
              height: "30px",
            }}
          />
        ) : (
          <GroupIcon
            style={{
              color: "rgb(255, 255, 255)",
              width: "30px",
              height: "30px",
            }}
          />
        )}
        <GroupFilterBtnSpan>GROUP</GroupFilterBtnSpan>
      </GroupFilterBtn>
    </GroupFilterWrapper>
  );
};

const TextFilter = (props: any) => {
  const {
    canvas,
    fontFamily,
    setFontFamily,
    decoration,
    setDecoration,
    fontSized,
    fontColor,
    setFontColor,
    setFontSized,
    setShowColorPicker,
    setChangingFontColor,
    lineSpace,
    setLineSpace,
    letterSpace,
    setLetterSpace,
  } = props;

  const [align, setAlign] = useState("left");

  useEffect(() => {
    if (canvas) {
      const activeObj = canvas.getActiveObject();
      setFontFamily(activeObj.fontFamily);
      setFontSized(activeObj.fontSize);
      setFontColor(activeObj.fill);
    }
  }, [canvas]);
  return (
    <TextFilterWrapper>
      <NativeSelect
        id="demo-customized-select-native"
        value={fontFamily}
        onChange={(e: any) => {
          setFontFamily(e.target.value);
          const activeObj = canvas.getActiveObject();
          activeObj.set("fontFamily", e.target.value);
          canvas.requestRenderAll();
        }}
        style={{
          color: "white",
          backgroundColor: "#505886",
          fontSize: "14px",
          marginBottom: "10px",
        }}
      >
        {fontss.map((font: any) => {
          return (
            <option
              value={font}
              style={{ backgroundColor: "#505886", fontFamily: `${font}` }}
            >
              {font}
            </option>
          );
        })}
      </NativeSelect>
      <div>
        <NativeSelect
          id="demo-customized-select-native"
          value={decoration}
          onChange={(e: any) => {
            setDecoration(e.target.value);
            const activeObj = canvas.getActiveObject();
            activeObj.set("fontWeight", e.target.value);
            canvas.requestRenderAll();
          }}
          style={{
            color: "white",
            backgroundColor: "#505886",
            width: "50%",
            fontSize: "14px",
            marginBottom: "10px",
            marginRight: "10px",
          }}
        >
          <option value={"normal"} style={{ backgroundColor: "#505886" }}>
            Regular
          </option>
          <option value={"bold"} style={{ backgroundColor: "#505886" }}>
            Bold
          </option>
        </NativeSelect>
        <NativeSelect
          id="demo-customized-select-native"
          value={fontSized}
          //input={<input/>}
          onChange={(e: any) => {
            setFontSized(e.target.value);
            const activeObj = canvas.getActiveObject();
            activeObj.set("fontSize", e.target.value);
            canvas.renderAll();
          }}
          style={{
            color: "white",
            backgroundColor: "#505886",
            width: "42%",
            fontSize: "14px",
            marginBottom: "15px",
            border: "none",
          }}
        >
          {fontSizes.map((size: any) => {
            return (
              <option value={size} style={{ backgroundColor: "#505886" }}>
                {size}
              </option>
            );
          })}
        </NativeSelect>
        {/* <div style={{width: "40%",display: "-webkit-inline-box"}}>
  <div>
    <form className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
      <input type="number" style={{width: "100%",backgroundColor: "#505886",border: "none",color: "white"}}/>
    </form>
    <ul className="dropdown-menu" aria-labelledby="navbarDarkDropdownMenuLink" style={{color: "white",
    backgroundColor: "#505886",}}>
    {fontSizes.map((size: any) => {
      return(
        <li>{size}</li>
      )
    })}
    </ul>
  </div>
</div> */}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "55px",
          paddingTop: "10px",
        }}
      >
        <div
          style={{
            backgroundColor: `${fontColor}`,
            height: "25px",
            display: "block",
            width: "25%",
            cursor: "pointer",
            borderRadius: "3px",
            border: "1px solid #a4b2c7",
          }}
          onClick={() => {
            setShowColorPicker(true);
            setChangingFontColor(true);
          }}
        ></div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "30px",
            paddingLeft: "20px",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{ cursor: "pointer", marginRight: "1.5rem" }}
            onClick={() => {
              setAlign("left");
              const activeObj = canvas.getActiveObject();
              activeObj.set("textAlign", "left");
              canvas.renderAll();
            }}
          >
            <LeftAlign
              height="25px"
              width="25px"
              style={{ fill: align === "left" ? "rgb(77, 180, 170)" : "white" }}
            />
          </div>
          <div
            style={{ cursor: "pointer", marginRight: "1.5rem" }}
            onClick={() => {
              setAlign("center");
              const activeObj = canvas.getActiveObject();
              activeObj.set("textAlign", "center");
              canvas.renderAll();
            }}
          >
            <CenterAlign
              height="25px"
              width="25px"
              style={{
                fill: align === "center" ? "rgb(77, 180, 170)" : "white",
              }}
            />
          </div>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              setAlign("right");
              const activeObj = canvas.getActiveObject();
              activeObj.set("textAlign", "right");
              canvas.renderAll();
            }}
          >
            <RightAlign
              height="25px"
              width="25px"
              style={{
                fill: align === "right" ? "rgb(77, 180, 170)" : "white",
              }}
            />
          </div>
        </div>
      </div>
      <div>
        <span
          style={{ color: "white", fontSize: "11px", marginRight: "100px" }}
        >
          Line Spacing
        </span>
        <span style={{ color: "white", fontSize: "11px" }}>{lineSpace}</span>
        <TransperencySlider
          aria-label="Small steps"
          step={0.1}
          defaultValue={lineSpace}
          min={0.1}
          max={5}
          valueLabelDisplay="off"
          value={lineSpace}
          onChange={(event, value) => {
            setLineSpace(value);
            const activeObj = canvas.getActiveObject();
            activeObj.set("lineHeight", lineSpace);
            canvas.renderAll();
          }}
        />
      </div>
      <div>
        <span style={{ color: "white", fontSize: "11px", marginRight: "80px" }}>
          Letter Spacing
        </span>
        <span style={{ color: "white", fontSize: "11px" }}>
          {letterSpace / 6}%
        </span>
        <TransperencySlider
          aria-label="Small steps"
          step={6}
          defaultValue={0}
          min={-300}
          max={600}
          valueLabelDisplay="off"
          value={letterSpace}
          onChange={(event, value) => {
            setLetterSpace(value);
            const activeObj = canvas.getActiveObject();
            activeObj.set("charSpacing", letterSpace);
            canvas.renderAll();
          }}
        />
      </div>
    </TextFilterWrapper>
  );
};

const CropFilter = (props: any) => {
  const { service, setIsCrop } = props;
  // let service = cropService(canvas)
  return (
    <CropFilterWrapper>
      <CropFilterPanel>
        <div style={{ width: "25%" }}>
          <ApplyButton
            style={{ height: "35px", width: "35px" }}
            onClick={() => {
              service.applyCrop();
              setIsCrop(false);
            }}
          >
            Enable Crop
          </ApplyButton>
        </div>
        <div style={{ width: "25%" }}>
          <CancelBtn
            style={{ height: "35px", width: "35px" }}
            onClick={() => {
              service.cancelCrop();
              setIsCrop(false);
            }}
          >
            Cancel
          </CancelBtn>
        </div>
        <div style={{ width: "25%" }}>
          <ResetBtn
            style={{ height: "35px", width: "35px" }}
            onClick={() => {
              service.resetCrop();
              setIsCrop(false);
            }}
          >
            Reset
          </ResetBtn>
        </div>
      </CropFilterPanel>
    </CropFilterWrapper>
  );
};

const FiltersContainer = (props: any) => {
  const activeEditor = useContext(ActiveEditorContext);
  const {
    showArtboard,
    showLayers,
    canvas,
    showColorPicker,
    isGrouped,
    setIsGrouped,
    setShowArtboard,
    setShowLayers,
  } = props;
  const [hasActiveObject, setHasActiveObject] = useState<boolean>(true);
  const [objectType, setObjectType] = useState<string>("");
  //const [svgUid, setSvgUid] = useState("");
  const [isCrop, setIsCrop] = useState<boolean>(false);
  const shapes = ["rect", "circle", "line", "triangle", "ellipse"];

  useEffect(() => {
    canvas.on("object:added", () => {
      setShowArtboard(false);
      setShowLayers(false);
    });
    canvas.on("object:removed", () => {
      if (canvas.getActiveObject()) {
        setHasActiveObject(true);
        setObjectType(canvas.getActiveObject().get("type"));
        if (canvas.getActiveObject().svgUid) {
          //setSvgUid(canvas.getActiveObject().svgUid);
          setObjectType("svg");
        }
        if (canvas.getActiveObject().fileType === "svg") {
          //setSvgUid("SVG_UID");
          setObjectType("svg");
        }
        if (
          canvas.getActiveObject() &&
          canvas.getActiveObject().get("type") === "crop"
        ) {
          setIsCrop(true);
        }
      } else {
        setObjectType("");
        setHasActiveObject(false);
        //setSvgUid("");
        setIsCrop(false);
      }
    });
    canvas.on("selection:created", () => {
      setShowArtboard(false);
      setShowLayers(false);
      if (canvas.getActiveObject()) {
        setHasActiveObject(true);
        setObjectType(canvas.getActiveObject().get("type"));
        if (canvas.getActiveObject().svgUid) {
          //setSvgUid(canvas.getActiveObject().svgUid);
          setObjectType("svg");
        }
        // else{
        //   setSvgUid('')
        // }
        if (canvas.getActiveObject().fileType === "svg") {
          //setSvgUid("SVG_UID");
          setObjectType("svg");
        }
        if (
          canvas.getActiveObject() &&
          canvas.getActiveObject().get("type") === "crop"
        ) {
          setIsCrop(true);
        }
      } else {
        setHasActiveObject(false);
        setObjectType("");
        //setSvgUid("");
        setIsCrop(false);
      }
    });
    canvas.on("selection:updated", () => {
      setShowArtboard(false);
      setShowLayers(false);
      if (canvas.getActiveObject()) {
        setHasActiveObject(true);
        console.log(canvas.getActiveObject());
        setObjectType(canvas.getActiveObject().get("type"));
        if (canvas.getActiveObject().svgUid) {
          //setSvgUid(canvas.getActiveObject().svgUid);
          setObjectType("svg");
        }
        if (canvas.getActiveObject().fileType === "svg") {
          //setSvgUid("SVG_UID");
          setObjectType("svg");
        }
        if (
          canvas.getActiveObject() &&
          canvas.getActiveObject().get("type") === "crop"
        ) {
          setIsCrop(true);
        }
      } else {
        setObjectType("");
        setHasActiveObject(false);
      }
    });
    canvas.on("selection:cleared", () => {
      setObjectType("");
      setHasActiveObject(false);
      setShowArtboard(false);
      setShowLayers(false);
    });
    if (canvas && canvas.getActiveObject()) {
      console.log(canvas.getActiveObject());
      setObjectType(canvas.getActiveObject().get("type"));
      if (canvas.getActiveObject().svgUid) {
        //setSvgUid(canvas.getActiveObject().svgUid);
        setObjectType("svg");
      }
      // else{
      //   setSvgUid('')
      // }
      if (
        canvas.getActiveObject() &&
        canvas.getActiveObject().get("type") === "crop"
      ) {
        setIsCrop(true);
      }
    } else {
      setObjectType("");
      setHasActiveObject(false);
    }
  }, [canvas]);

  return (
    <RightSidePanelActionContainer className="RightSidePanelActionContainer">
      {hasActiveObject && !showArtboard && !showLayers && !showColorPicker && (
        <>
          {activeEditor === "image" && (
            <LayersAction
              {...props}
              transformStyle="translate3d(265px, 0, 0)"
            />
          )}
          <RightSidePanelActionPanel>
            <RightSidePanelActionPanelContent>
              {activeEditor === "image" && <CommonFilters {...props} />}
              <MoreActions>
                {objectType === "image" && <ImageFilters {...props} />}
                {objectType === "svg" && <SvgFilters {...props} />}
                {shapes.indexOf(objectType) !== -1 && (
                  <ShapesFilters objectType={objectType} {...props} />
                )}
                {isCrop && (
                  <CropFilter
                    objectType={objectType}
                    setIsCrop={setIsCrop}
                    {...props}
                  />
                )}
                {(objectType === "activeSelection" ||
                  objectType === "group") && (
                  <GroupsFilters
                    isGrouped={isGrouped}
                    setIsGrouped={setIsGrouped}
                    {...props}
                  />
                )}
                {objectType === "textbox" && <TextFilter {...props} />}
                {/* {objectType === "animation" && <AnimationFilters {...props} />} */}
              </MoreActions>
            </RightSidePanelActionPanelContent>
          </RightSidePanelActionPanel>
        </>
      )}

      {!hasActiveObject && !showArtboard && !showLayers && !showColorPicker && (
        <>
          {" "}
          <EmptyFilters />
        </>
      )}

      {showArtboard && !showLayers && !showColorPicker && (
        <>
          <LayersAction {...props} transformStyle="translate3d(265px, 0, 0)" />
          <ArtboardActions {...props} />
        </>
      )}

      {showLayers && !showArtboard && !showColorPicker && (
        <LayersAction {...props} transformStyle="translate3d(0, 0, 0)" />
      )}

      {showColorPicker && !showLayers && !showArtboard && (
        <>
          <ColorPicker {...props} />
        </>
      )}
    </RightSidePanelActionContainer>
  );
};

export const CanvasFilters = (props: any) => {
  const activeEditor = useContext(ActiveEditorContext);
  const { canvas, cropService } = props;
  const [showArtboard, setShowArtboard] = useState(false);
  const [showLayers, setShowLayers] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [borderColor, setBorderColor] = useState<string>("rgb(77, 180, 170)");
  const [bgColor, setBgColor] = useState<string>("rgb(89, 46, 111)");
  const [changingBgColor, setChangingBgColor] = useState<boolean>(false);
  const [isGrouped, setIsGrouped] = useState(false);
  const [changingSvgColor, setChangingSvgColor] = useState<boolean>(false);
  const [svgColor, setSvgColor] = useState("");
  const [canvasColors, setCanvasColors] = useState([]);
  const [colorId, setColorId] = useState();
  const [fontFamily, setFontFamily] = useState<string>();
  const [decoration, setDecoration] = useState<string>("normal");
  const [fontSized, setFontSized] = useState<string>();
  const [fontColor, setFontColor] = useState();
  const [changingFontColor, setChangingFontColor] = useState<boolean>(false);
  const [lineSpace, setLineSpace] = useState(1);
  const [letterSpace, setLetterSpace] = useState(0);
  const [cropImg, setCropImg] = useState();
  const [currentColor, setCurrentColor] = useState("");
  let service = cropService(canvas);
  return (
    <>
      {activeEditor === "image" && (
        <FilterTabs
          setShowArtboard={setShowArtboard}
          setShowLayers={setShowLayers}
          showArtboard={showArtboard}
          showLayers={showLayers}
          setShowColorPicker={setShowColorPicker}
          {...props}
        />
      )}
      <FiltersContainer
        showArtboard={showArtboard}
        showLayers={showLayers}
        showColorPicker={showColorPicker}
        setShowColorPicker={setShowColorPicker}
        borderColor={borderColor}
        setBorderColor={setBorderColor}
        bgColor={bgColor}
        setBgColor={setBgColor}
        changingBgColor={changingBgColor}
        setChangingBgColor={setChangingBgColor}
        isGrouped={isGrouped}
        setIsGrouped={setIsGrouped}
        changingSvgColor={changingSvgColor}
        setChangingSvgColor={setChangingSvgColor}
        svgColor={svgColor}
        setSvgColor={setSvgColor}
        canvasColors={canvasColors}
        setCanvasColors={setCanvasColors}
        colorId={colorId}
        setColorId={setColorId}
        fontFamily={fontFamily}
        setFontFamily={setFontFamily}
        decoration={decoration}
        setDecoration={setDecoration}
        fontSized={fontSized}
        setFontSized={setFontSized}
        fontColor={fontColor}
        setFontColor={setFontColor}
        changingFontColor={changingFontColor}
        setChangingFontColor={setChangingFontColor}
        lineSpace={lineSpace}
        setLineSpace={setLineSpace}
        letterSpace={letterSpace}
        setLetterSpace={setLetterSpace}
        cropImg={cropImg}
        setCropImg={setCropImg}
        service={service}
        setShowLayers={setShowLayers}
        setShowArtboard={setShowArtboard}
        currentColor={currentColor}
        setCurrentColor={setCurrentColor}
        {...props}
      />
    </>
  );
};
