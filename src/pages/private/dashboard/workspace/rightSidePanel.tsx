import React, { useContext, useEffect } from "react";
import { AnimationFilters } from "./AnimationFilters/AnimationFilter";
import {
  RightSidePanel,
  RightSidePanelContainer,
  RightSidePanelSwitch,
  RightSidePanelOpenSwitchCarret,
  RightSidePanelCloseSwitchCarret,
  StyledSidebar,
} from "./styledComponent";
import { ActiveEditorContext } from "../../../../components/layout/private";
import { CanvasFilters } from "./filters";
import { AddImage } from "./AnimationFilters/AddImageFilter";

export const RideSideActionPanel = (props: any) => {
  const activeEditor = useContext(ActiveEditorContext);
  const {
    imageColorFilter,
    canvas,
    showRightSidePanel,
    setShowRightSidePanel,
    flipImage,
    imageTransperency,
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
    opacity,
    setOpacity,
    setImagePostion,
    LayerListContainer,
    setLayer,
    addArtBoard,
    updatedJson,
    loadCanvasOnArtBoard,
    activateArtBoard,
    setupdatedJson,
    setActivateArtBoard,
    setBgColorOfShape,
    setBorderColorOfShape,
    setOutlineWidthOfShape,
    lockObject,
    cropService,
    unLockObject,
    cloneObject,
    deleteObject,
    isSvg,
    colorObj,
    groupObjects,
    unGroupObjects,
    cropImg,
    togglePopup,
    currentWidth,
    currentHeight,
  } = props;
  const [hasAnimation, setHasAnimation] = React.useState(false);
  const [configuration, setConfiguration] = React.useState([]);
  const [mainText, setMainText] = React.useState("");
  const [subText, setSubText] = React.useState("");
  const [hasLogo, setHasLogo] = React.useState(false);
  const [disabledEffects, setDisabledEffects] = React.useState([]);
  React.useEffect(() => {
    props.PanelSwitchClicked();
  }, [showRightSidePanel]);
  useEffect(() => {
    if (canvas) {
      canvas.on("object:added", ({ target: object }: any) => {
        if (object && object.animationId && canvas.getActiveObject()) {
          setHasAnimation(true);
          setConfiguration(object.configuration);
          setMainText(object.mainText);
          setSubText(object.subText);
          if (object.hasLogo) {
            setHasLogo(true);
            setDisabledEffects(object.disabledEffects);
          }
          console.log("configuration------->", object);
        }
      });
      canvas.on("canvas:cleared", () => {
        setHasAnimation(false);
        setHasLogo(false);
      });
      canvas.on("selection:created", (data: any) => {
        if (
          data.target &&
          data.target.configuration &&
          canvas.getActiveObject()
        ) {
          if (canvas && canvas.getActiveObject()) {
            let activeObj = canvas.getActiveObject();
            console.log("activeObj", activeObj);
            setConfiguration(activeObj.configuration);
          }
          setHasAnimation(true);
          setMainText(data.target.mainText);
          setSubText(data.target.subText);
          if (data.target.hasLogo) {
            setHasLogo(true);
            setDisabledEffects(data.target.disabledEffects);
          }
        }
      });
      canvas.on("selection:updated", (data: any) => {
        if (canvas && canvas.getActiveObject()) {
          let activeObj = canvas.getActiveObject();
          setConfiguration(activeObj.configuration);
          console.log("activeObj", activeObj);
        }
        if (
          data.target &&
          data.target.configuration &&
          canvas.getActiveObject()
        ) {
          setHasAnimation(true);
          setMainText(data.target.mainText);
          setSubText(data.target.subText);
          if (data.target.hasLogo) {
            setHasLogo(true);
            setDisabledEffects(data.target.disabledEffects);
          }
        }
      });
      canvas.on("selection:cleared", () => {
        setHasAnimation(false);
        setHasLogo(false);
        setDisabledEffects([]);
      });
    }
  }, [canvas]);
  return (
    <StyledSidebar>
      <RightSidePanel>
        <RightSidePanelSwitch
          onClick={() => setShowRightSidePanel((old: boolean) => !old)}
        >
          {showRightSidePanel ? (
            <RightSidePanelCloseSwitchCarret />
          ) : (
            <RightSidePanelOpenSwitchCarret />
          )}
        </RightSidePanelSwitch>
        {showRightSidePanel && (
          <RightSidePanelContainer>
            {activeEditor === "image" && (
              <CanvasFilters
                imageColorFilter={imageColorFilter}
                canvas={canvas}
                flipImage={flipImage}
                imageTransperency={imageTransperency}
                applyFilter={applyFilter}
                clearFilter={clearFilter}
                applyFilterValue={applyFilterValue}
                brightness={brightness}
                setBrightness={setBrightness}
                saturation={saturation}
                setSaturation={setSaturation}
                contrast={contrast}
                setContrast={setContrast}
                tint={tint}
                setTint={setTint}
                hue={hue}
                setHue={setHue}
                blur={blur}
                setBlur={setBlur}
                opacity={opacity}
                setOpacity={setOpacity}
                setImagePostion={setImagePostion}
                LayerListContainer={LayerListContainer}
                setLayer={setLayer}
                addArtBoard={addArtBoard}
                updatedJson={updatedJson}
                loadCanvasOnArtBoard={loadCanvasOnArtBoard}
                activateArtBoard={activateArtBoard}
                setupdatedJson={setupdatedJson}
                setActivateArtBoard={setActivateArtBoard}
                setBorderColorOfShape={setBorderColorOfShape}
                setBgColorOfShape={setBgColorOfShape}
                setOutlineWidthOfShape={setOutlineWidthOfShape}
                lockObject={lockObject}
                cropService={cropService}
                unLockObject={unLockObject}
                cloneObject={cloneObject}
                deleteObject={deleteObject}
                colorObj={colorObj}
                isSvg={isSvg}
                groupObjects={groupObjects}
                unGroupObjects={unGroupObjects}
                cropImg={cropImg}
                currentWidth={currentWidth}
                currentHeight={currentHeight}
              />
            )}
            {activeEditor === "video" && hasAnimation && !hasLogo && (
              <AnimationFilters
                canvas={canvas}
                configuration={configuration}
                mainText={mainText}
                subText={subText}
                setMainText={setMainText}
                setSubText={setSubText}
              />
            )}
            {activeEditor === "video" && hasAnimation && hasLogo && (
              <AddImage
                canvas={canvas}
                configuration={configuration}
                subText={subText}
                mainText={mainText}
                setSubText={setSubText}
                disabledEffects={disabledEffects}
                togglePopup={togglePopup}
              />
            )}
          </RightSidePanelContainer>
        )}
      </RightSidePanel>
    </StyledSidebar>
  );
};
