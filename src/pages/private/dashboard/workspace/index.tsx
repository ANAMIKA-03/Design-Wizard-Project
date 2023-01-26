import React, { useContext, useEffect, useState } from "react";
import { DwCanvasHOC } from "@wbm-npm/dw-canvas";
import "./style.less";
import { ExternalCanvasForVideo } from "./VideoCanvas";
import { useDispatch } from "react-redux";
import {
  MainContentWrapper,
  StyledSection,
  WorkspaceSpaceContainer,
  BigPreloader,
  WorkspaceBottom,
  WorkspaceScroll,
  WorkspaceCenterWrapper,
  ClippingMask,
  BorderLeft,
  BorderRight,
  BorderTop,
  BorderBottom,
  CanvasWrapper,
  CanvasContainer,
} from "./styledComponent";
import { useLocation } from "react-router";
import dummy from "./../../../../assets/dummy.png";
import svgs from "./../../../../assets/svgs.png";
import { Sidebar } from "./sidebar";
import { ZoomButtons } from "./zoom";
import { ActionButtons } from "./actionButtons";
import { RideSideActionPanel } from "./rightSidePanel";
import { loadCanvasOnArtBoard, addArtBoard } from "./artboard";
import { WorkspaceHeaderWrapper } from "./workspaceHeader";
import { ActiveEditorContext } from "./../../../../components/layout/private";
import { VideoTimeline } from "./videoTimeline";
const _ = require("lodash");
const ExternalCanvas = (props: any) => {
  const {
    canvas,
    addCircle,
    addRectangle,
    redoCanvasAction,
    undoCanvasAction,
    clearCanvas,
    disableUndo,
    disableRedo,
    addImg,
    addText,
    addSvg,
    setBgColor,
    clippingWidth,
    clippingHeight,
    getComposition,
    imageColorFilter,
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
    updatedJson,
    setupdatedJson,
    activateArtBoard,
    setActivateArtBoard,
    removeGrid,
    drawGrid,
    setBgColorOfShape,
    setBorderColorOfShape,
    setOutlineWidthOfShape,
    lockObject,
    unLockObject,
    cloneObject,
    deleteObject,
    groupObjects,
    unGroupObjects,
    addLine,
    addPhrase,
    addTriangle,
    addVideo,
    playVideo,
    pauseVideo,
    setClippingHeight,
    setClippingWidth,
    cropImg,
    addVideoText,
    title,
    cropService,
    setDesignCount,
    setZoomLevel,
    setZoomRatio,
    getCurrentWH,
  } = props;

  const activeEditorContext = useContext(ActiveEditorContext);
  const [showRightSidePanel, setShowRightSidePanel] = useState(false);
  const [isSvg, setIsSvg] = useState();
  const [colorObj, setColorObj] = useState();
  const [videoList, setVideoList] = useState<any[]>([]);
  const [currentPlayingVideoId, setCurrentPlayingVideoId] =
    useState<string>("");
  const [imageArr, setImageArr] = useState<any[]>([]);
  const [imageDetails, setImageDetails] = useState({});
  const [canvasTop, setCanvasTop] = useState(-50);
  const [canvasLeft, setCanvasLeft] = useState(-50);
  const [resizeTitle, setResizeTitle] = useState("Facebook post");
  const [compositionId, setCompositionId] = useState("");
  const [resizeTitleId, setResizeTitleId] = useState(256);
  const [disableZoomIn, setDisableZoomIn] = useState(1);
  const [disableZoomOut, setDisableZoomOut] = useState(1);
  const [zoomPercent, setZoomPercent] = useState(30);
  const [currentWidth, setCurrentWidth] = useState(1200);
  const [currentHeight, setCurrentHeight] = useState(900);
  const [canvasId, setCanvasId] = useState<any>("canvas");
  const location: any = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (canvas) {
      canvas.on("object:added", () => {
        dispatch({
          type: "storeCanvas",
          canvas: canvas,
        });
      });
      canvas.on("object:removed", () => {
        dispatch({
          type: "storeCanvas",
          canvas: canvas,
        });
      });
    }
  }, [canvas]);

  useEffect(() => {
    if (location.state && location.state.title) {
      setResizeTitle(location.state.title);
    }
    if (location.state && location.state.id) {
      setResizeTitleId(location.state.id);
    }
    if (location.state && location.state.height && location.state.width) {
      setCurrentWidth(location.state.width);
      setCurrentHeight(location.state.height);
      canvasResize(location.state.width, location.state.height);
    } else if (location.state && location.state.composer_object) {
      setCompositionId(location.state.composer_id);
      if (canvas) {
        const comp_obj = JSON.parse(location.state.composer_object);
        setCurrentWidth(comp_obj[0].width);
        setCurrentHeight(comp_obj[0].height);
        canvasResize(comp_obj[0].width, comp_obj[0].height);
        let layers = comp_obj[0].layers.map((item: any) => {
          if (item.type === "image") {
            let src = item.src.replace(
              /=.*&/,
              "=" + localStorage.getItem("token") + "&"
            );
            let obj = { ...item, src };
            return obj;
          } else {
            return item;
          }
        });
        var a = {
          version: "4.6.0",
          objects: layers,
        };
        setTimeout(() => {
          canvas.loadFromJSON(a, () => {
            canvas.renderAll();
          });
        }, 1000);
      }
    } else {
      canvasResize(currentWidth, currentHeight);
    }
  }, [location, canvas]);
  const PanelSwitchClicked = () => {
    canvasResize(currentWidth, currentHeight);
  };

  window.addEventListener("resize", function (event) {
    canvasResize(currentWidth, currentHeight);
  });

  const canvasResize = (resizeWidth: any, resizeHeight: any) => {
    getCurrentWH(resizeWidth, resizeHeight);
    if (document && document.getElementById("WorkspaceSpaceContainer")) {
      let tempEl: any =
        document.getElementById("WorkspaceSpaceContainer") || null;
      if (tempEl.getBoundingClientRect()) {
        let divHeight: any = tempEl.getBoundingClientRect().height || null;
        let divWidth: any = tempEl.getBoundingClientRect().width || null;
        let clipHeight = 0;
        let clipWidth = 0;
        if (divHeight - 150 > resizeHeight && divWidth - 250 > resizeWidth) {
          clipHeight = resizeHeight;
          clipWidth = resizeWidth;
        } else {
          clipHeight = divHeight - 150;
          clipWidth = (resizeWidth / resizeHeight) * clipHeight;
          if (divWidth - 250 <= clipWidth) {
            clipWidth = divWidth - 250;
            clipHeight = (resizeHeight / resizeWidth) * clipWidth;
          }
        }

        setZoomLevel((clipHeight / resizeHeight) * 100);
        setZoomPercent(Math.round((clipHeight / resizeHeight) * 100));
        setClippingHeight(clipHeight);
        setClippingWidth(clipWidth);
        setCanvasTop(Math.max((divHeight - clipHeight) / 2, 50));
        setCanvasLeft(Math.max((divWidth - clipWidth) / 2, 50));
      }
    }
  };
  const zoomIn = () => {
    if (
      canvas.width + 0.1 * canvas.width <= 2000 &&
      canvas.height + 0.1 * canvas.height <= 2000
    ) {
      if (document && document.getElementById("WorkspaceSpaceContainer")) {
        let tempEl: any =
          document.getElementById("WorkspaceSpaceContainer") || null;
        if (tempEl.getBoundingClientRect()) {
          let divHeight: any = tempEl.getBoundingClientRect().height || null;
          let divWidth: any = tempEl.getBoundingClientRect().width || null;
          const addWidth = currentWidth * 0.1;
          const addHeight = (10 * currentHeight) / 100;
          let clipHeight = clippingHeight + addHeight;
          let clipWidth = clippingWidth + addWidth;
          setZoomLevel((clipHeight / currentHeight) * 100);
          setZoomRatio(canvas.getZoom() + 0.1);
          setClippingWidth(clipWidth);
          setClippingHeight(clipHeight);
          setCanvasTop(Math.max((divHeight - clipHeight) / 2, 50));
          setCanvasLeft(Math.max((divWidth - clipWidth) / 2, 50));
          setZoomPercent((old: any) => old + 10);
          if (
            clipWidth + 0.1 * clipWidth > 2000 ||
            clipHeight + 0.1 * clipHeight > 2000
          ) {
            setDisableZoomIn(0.6);
          }
        }
      }
    }
  };

  useEffect(() => {
    if (zoomPercent) {
      if (zoomPercent - 10 <= 10) setDisableZoomOut(0.6);
      else setDisableZoomOut(1);
    }
  }, [zoomPercent]);

  const zoomOut = () => {
    if (zoomPercent - 10 > 10) {
      if (document && document.getElementById("WorkspaceSpaceContainer")) {
        let tempEl: any =
          document.getElementById("WorkspaceSpaceContainer") || null;
        if (tempEl.getBoundingClientRect()) {
          let divHeight: any = tempEl.getBoundingClientRect().height || null;
          let divWidth: any = tempEl.getBoundingClientRect().width || null;
          const reduceWidth = (10 * currentWidth) / 100;
          const reduceHeight = (10 * currentHeight) / 100;
          let clipHeight = clippingHeight - reduceHeight;
          let clipWidth = clippingWidth - reduceWidth;
          setZoomLevel((clipHeight / currentHeight) * 100);
          setZoomRatio(canvas.getZoom() - 0.1);
          setClippingWidth(clipWidth);
          setClippingHeight(clipHeight);
          setCanvasTop(Math.max((divHeight - clipHeight) / 2, 50));
          setCanvasLeft(Math.max((divWidth - clipWidth) / 2, 50));
          setZoomPercent((old: any) => old - 10);
          if (
            clipWidth + 0.1 * clipWidth < 2000 ||
            clipHeight + 0.1 * clipHeight < 2000
          ) {
            setDisableZoomIn(1);
          }
        }
      }
    }
  };

  useEffect(() => {
    if (canvas) {
      const composition = getComposition(canvas);
      if (composition.objects && composition.objects.length > 0) {
        setShowRightSidePanel(true);
      }
    }
  }, [canvas, getComposition]);

  const SvgCheck = (isSvg: any, objs: any) => {
    setIsSvg(isSvg);
    setColorObj(objs);
  };
  const ImageKeys = (imageData: any) => {
    const imgObj = {
      [imageData._id]: {
        keywords: imageData._source.keywords,
        modelReleaseIds: imageData._source.modelReleaseIds,
        propertyReleaseIDs: imageData._source.propertyReleaseIDs,
        originalFileType: imageData._source.originalFileType,
      },
    };
    return imgObj;
  };

  const imageKeysArray = (obj: any) => {
    const arr = [...imageArr];
    arr.push(obj);
    let keys: any[] = [];
    for (let i = 0; i < arr.length; i++) {
      keys.push(...Object.keys(arr[i]));
    }
    var unique = keys.filter((v, i, a) => a.indexOf(v) === i);
    let finalUniqueArr: any = {};
    for (let i = 0; i < arr.length; i++) {
      finalUniqueArr = { ...finalUniqueArr, ...arr[i] };
    }
    const filteredObj = _.pick(finalUniqueArr, unique);
    setImageArr(arr);
    setImageDetails(filteredObj);
  };

  const setCanvasDim = (
    width: number,
    height: number,
    name: string,
    id: number
  ) => {
    setCurrentWidth(width);
    setCurrentHeight(height);
    canvasResize(width, height);
    setResizeTitle(name);
    setResizeTitleId(id);
  };
  return (
    <>
      <WorkspaceHeaderWrapper
        compositionIds={compositionId}
        setDesignCount={setDesignCount}
        canvas={canvas}
        getComposition={getComposition}
        imageDetails={imageDetails}
        setCanvasDim={setCanvasDim}
        title={title}
        resizeTitle={resizeTitle}
        resizeTitleId={resizeTitleId}
      />
      <MainContentWrapper>
        <Sidebar
          onAddCircle={addCircle}
          onAddRectangle={addRectangle}
          addImg={addImg}
          addText={addText}
          addSvg={addSvg}
          canvas={canvas}
          dummy={dummy}
          svgs={svgs}
          SvgCheck={SvgCheck}
          addLine={addLine}
          addPhrase={addPhrase}
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
          PanelSwitchClicked={PanelSwitchClicked}
        />
        <StyledSection>
          <WorkspaceSpaceContainer id="WorkspaceSpaceContainer">
            <BigPreloader></BigPreloader>
            <WorkspaceBottom id="workspaceBottom">
              <WorkspaceScroll
                id="outerDiv"
                style={
                  activeEditorContext === "image"
                    ? { display: "block", justifyContent: "unset" }
                    : {}
                }
              >
                <WorkspaceCenterWrapper
                  style={
                    activeEditorContext === "video"
                      ? { marginTop: "70px" }
                      : {
                          top: `${canvasTop}px`,
                          left: `${canvasLeft}px`,
                          display: "inline-block",
                          position: "absolute",
                        }
                  }
                >
                  <ActionButtons
                    undo={undoCanvasAction}
                    disableUndo={disableUndo}
                    redo={redoCanvasAction}
                    disableRedo={disableRedo}
                    clearCanvas={clearCanvas}
                    setBgColor={setBgColor}
                    canvas={canvas}
                    removeGrid={removeGrid}
                    drawGrid={drawGrid}
                    currentWidth={currentWidth}
                    currentHeight={currentHeight}
                  />
                  <ClippingMask
                    className="clipping-mask"
                    id="clipping-mask"
                    style={{
                      width: Number(clippingWidth),
                      height: Number(clippingHeight),
                      top: 0,
                      left: 0,
                    }}
                  >
                    <BorderLeft></BorderLeft>
                    <BorderRight></BorderRight>
                    <BorderTop></BorderTop>
                    <BorderBottom></BorderBottom>
                  </ClippingMask>
                  <CanvasWrapper
                    style={{
                      width: `${
                        Number(clippingWidth) +
                        Number(500 * (clippingHeight / currentHeight))
                      }px`,
                      height: `${
                        Number(clippingHeight) +
                        Number(500 * (clippingHeight / currentHeight))
                      }px`,
                      top: -250 * (clippingHeight / currentHeight),
                      left: -250 * (clippingHeight / currentHeight),
                    }}
                  >
                    <CanvasContainer>
                      <canvas id={canvasId} style={{ overflow: "hidden" }} />
                    </CanvasContainer>
                  </CanvasWrapper>
                </WorkspaceCenterWrapper>
              </WorkspaceScroll>
            </WorkspaceBottom>
          </WorkspaceSpaceContainer>
          {activeEditorContext === "video" && (
            <VideoTimeline
              setVideoList={setVideoList}
              videoList={videoList}
              playVideo={playVideo}
              canvas={canvas}
              pauseVideo={pauseVideo}
              currentPlayingVideoId={currentPlayingVideoId}
            />
          )}
          {activeEditorContext === "image" && (
            <ZoomButtons
              manageZoomOut={zoomOut}
              disableZoomOutBtn={disableZoomOut}
              zoomLevel={zoomPercent}
              manageZoomIn={zoomIn}
              disableZoomInBtn={disableZoomIn}
            />
          )}
        </StyledSection>
        <RideSideActionPanel
          canvas={canvas}
          imageColorFilter={imageColorFilter}
          showRightSidePanel={showRightSidePanel}
          setShowRightSidePanel={setShowRightSidePanel}
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
          setBgColorOfShape={setBgColorOfShape}
          setBorderColorOfShape={setBorderColorOfShape}
          setOutlineWidthOfShape={setOutlineWidthOfShape}
          lockObject={lockObject}
          unLockObject={unLockObject}
          cloneObject={cloneObject}
          deleteObject={deleteObject}
          isSvg={isSvg}
          colorObj={colorObj}
          groupObjects={groupObjects}
          unGroupObjects={unGroupObjects}
          cropImg={cropImg}
          cropService={cropService}
          PanelSwitchClicked={PanelSwitchClicked}
          currentWidth={currentWidth}
          currentHeight={currentHeight}
        />
      </MainContentWrapper>
    </>
  );
};

const CombineView = (props: any) => {
  const { canvasWidth, canvasHeight } = props;
  const activeEditorContext = useContext(ActiveEditorContext);
  const [defaultSettings, setDefaultSettings] = useState<any>({
    composition: {},
    defaultWidth: 458.667,
    defaultHeight: 258,
    defaultPadding: 250,
    defaultVerticalPadding: 150,
  });

  useEffect(() => {
    if (activeEditorContext === "video") {
      setDefaultSettings({
        composition: {},
        defaultWidth: 640,
        defaultHeight: 360,
        defaultPadding: 250,
        defaultVerticalPadding: 150,
      });
    } else {
      setDefaultSettings({
        composition: {},
        defaultWidth: canvasWidth,
        defaultHeight: canvasHeight,
        defaultPadding: 250,
        defaultVerticalPadding: 150,
      });
    }
  }, [activeEditorContext, canvasWidth, canvasHeight]);
  const HOCComponent = DwCanvasHOC(defaultSettings)(
    activeEditorContext === "image" ? ExternalCanvas : ExternalCanvasForVideo
  );
  return <HOCComponent {...props} />;
};

export const DasboardWorkspace = CombineView;
