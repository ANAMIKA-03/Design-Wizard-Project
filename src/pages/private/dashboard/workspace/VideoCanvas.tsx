import React, { useContext, useEffect, useState } from "react";
import fabric from "@wbm-npm/animated-canvas";
import { Videos } from "./AnimatedCanvas/Videos";
import "./style.less";
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
import { updateJson } from "./../../../../lib/canvas/jsonUtils";
import { JsonContainer } from "./../../../../components/jsonContainer";
import { RideSideActionPanel } from "./rightSidePanel";
import { loadCanvasOnArtBoard, addArtBoard } from "./artboard";
import { WorkspaceHeaderWrapper } from "./workspaceHeader";
import { ActiveEditorContext } from "./../../../../components/layout/private";
import { VideoTimeline } from "./videoTimeline";
import { UploadPopUp } from "./UploadPopUp";
import { useDispatch, useSelector } from "react-redux";

//import { MyDesignsContext } from "../../../../components/layout/private";
const _ = require("lodash");

export const ExternalCanvasForVideo = (props: any) => {
  const {
    addCircle,
    addRectangle,
    // redoCanvasAction,
    // undoCanvasAction,
    // clearCanvas,
    // disableUndo,
    //disableRedo,
    addImg,
    addText,
    addSvg,
    //setBgColor,
    manageZoomIn,
    manageZoomOut,
    disableZoomInBtn,
    disableZoomOutBtn,
    clippingWidth,
    clippingHeight,
    zoomLevel,
    getComposition,
    imageColorFilter,
    flipImage,
    imageTransperency,
    applyFilter,
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
    //removeGrid,
    //drawGrid,
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
    setZoomLevel,
    cropImg,
    addVideoText,
    title,
    cropService,
    setDesignCount,
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
  const [currentWidth, setCurrentWidth] = useState(1920);
  const [currentHeight, setCurrentHeight] = useState(1080);
  const [canvas, setCanvas] = useState<any>();
  const [canvasId, setCanvasId] = useState<any>("videoCanvas");
  const [isOpen, setIsOpen] = useState(false);
  const location: any = useLocation();
  const dispatch = useDispatch();
  const selector = useSelector((state: any) => {
    return state.canvas;
  });
  useEffect(() => {
    if (canvas) {
      canvas.on("object:added", () => {
        // save()
        dispatch({
          type: "storeCanvas",
          canvas: canvas,
        });
      });
      canvas.on("object:removed", () => {
        // save()
        dispatch({
          type: "storeCanvas",
          canvas: canvas,
        });
      });
      canvas.on("object:modified", () => save());
    }
  }, [canvas]);

  useEffect(() => {
    save();
  }, [selector]);
  const setAnimatedCanvas = () => {
    const localCanvas = new fabric.AnimatedCanvas("videoCanvas");
    localCanvas.setHeight(
      clippingHeight + (500 * clippingHeight) / currentHeight
    );
    localCanvas.setWidth(
      clippingWidth + (500 * clippingHeight) / currentHeight
    );

    // localCanvas.clipPath = new fabric.Rect({
    //   width: currentWidth,
    //   height: currentHeight,
    //   top: 250,
    //   left:250
    // });
    localCanvas.renderAll();
    setCanvas(localCanvas);
    setCanvasId("videoCanvas");
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  // const setImageCanvas = () => {
  //   console.log(props.canvas)
  //     setCanvas(props.canvas)
  //     setCanvasId('canvas')
  //     setClippingHeight(478)
  //   setClippingWidth(732)
  // }
  useEffect(() => {
    if (canvas) {
      //  canvas.setWidth((Number(clippingHeight) + Number(500*(clippingHeight / currentHeight))));
      //canvas.setHeight(Number(clippingWidth) + Number(500*(clippingHeight / currentHeight)));
      canvas.zoomToPoint(
        new fabric.Point(0, 0),
        clippingHeight / currentHeight
      );
      canvas.renderAll();
      canvas.setDimensions({
        height:
          Number(clippingHeight) +
          Number(500 * (clippingHeight / currentHeight)),
        width:
          Number(clippingWidth) +
          Number(500 * (clippingHeight / currentHeight)),
      });
      let clipPath = new fabric.Rect({
        width: currentWidth,
        height: currentHeight,
        top: 250,
        left: 250,
      });
      canvas.clipPath = clipPath;
      canvas.renderAll();
    }
  }, [clippingWidth, clippingHeight, canvas]);

  useEffect(() => {
    setAnimatedCanvas();
    canvasResize(currentWidth, currentHeight);
    //Videos()
  }, []);

  // useEffect(() => {
  //   if (canvas) {
  //     console.log(canvas);
  //     canvas.renderAll();
  //   }
  // }, [canvas]);

  // useEffect(() => {
  //   if (canvas) {
  //     canvas.on("object:added", () => {
  //       console.log(getComposition(canvas));
  //     });
  //   }
  // }, [canvas]);

  // useEffect(() => {
  //   if (location.state && location.state.title) {
  //     setResizeTitle(location.state.title);
  //   }
  //   if (location.state && location.state.id) {
  //     setResizeTitleId(location.state.id);
  //   }
  //   if (location.state && location.state.height && location.state.width) {
  //     //   console.log(document.getElementById('WorkspaceSpaceContainer'))
  //     setCurrentWidth(location.state.width);
  //     setCurrentHeight(location.state.height);
  //     canvasResize(location.state.width, location.state.height);
  //   } else if (location.state && location.state.composer_object) {
  //     setCompositionId(location.state.composer_id);
  //     if (canvas) {
  //       const comp_obj = JSON.parse(location.state.composer_object);
  //       setCurrentWidth(comp_obj[0].width);
  //       setCurrentHeight(comp_obj[0].height);
  //       canvasResize(comp_obj[0].width, comp_obj[0].height);
  //       console.log(comp_obj[0]);
  //       console.log(canvas);
  //       let layers = comp_obj[0].layers.map((item: any) => {
  //         if (item.type === "image") {
  //           let src = item.src.replace(
  //             /=.*&/,
  //             "=" + localStorage.getItem("token") + "&"
  //           );
  //           let obj = { ...item, src };
  //           return obj;
  //         } else {
  //           return item;
  //         }
  //       });
  //       console.log(layers);
  //       var a = {
  //         version: "4.6.0",
  //         objects: layers,
  //       };
  //       console.log(a);
  //       setTimeout(() => {
  //         canvas.loadFromJSON(a, () => {
  //           canvas.renderAll();
  //         });
  //       }, 1000);
  //     }
  //   } else {
  //     canvasResize(currentWidth, currentHeight);
  //   }
  // }, [location, canvas]);
  const PanelSwitchClicked = () => {
    // console.log("called");
    canvasResize(currentWidth, currentHeight);
  };

  const [canvasState, setCanvasState] = useState<string>("");
  const [undoState, setUndoState] = useState<Array<string>>([]);
  const [redoState, setRedoState] = useState<Array<string>>([]);
  const [disableUndo, setDisableUndo] = useState<boolean>(true);
  const [disableRedo, setDisableRedo] = useState<boolean>(true);

  const save = () => {
    if (canvas) {
      console.log("entered...........Save");
      setCanvasState(JSON.stringify(canvas.toJSON()));
      canvas.includeDefaultValues = false;
      setUndoState([...undoState, canvasState]);
      setDisableUndo(false);
      // const data: any = canvas.toDatalessJSON();
      // setupdatedJson((prevState: any) => {
      //   const comp = prevState.composer_object[activateArtBoard - 1];
      //   const a = { ...comp, layers: data.objects, thumb: data.objects? canvas.toDataURL():null };
      //   prevState.composer_object[activateArtBoard - 1] = a;
      //   return prevState;
      // });
    }
  };
  const redoCanvasAction = () => {
    canvasState && undoState?.push(canvasState);
    setUndoState(undoState);
    var pstate = redoState.pop() || "";
    setCanvasState(pstate);
    if (canvas) {
      setDisableUndo(true);
      setDisableRedo(true);
      canvas.clear();
      canvas.loadFromJSON(pstate, function () {
        canvas.renderAll();
        setDisableUndo(false);
        if (redoState.length) setDisableRedo(false);
      });
    }
  };
  const undoCanvasAction = () => {
    //setDisableRedo(false)
    canvasState && redoState?.push(canvasState);
    setRedoState(redoState);
    var pstate = undoState.pop() || "";
    setCanvasState(pstate);
    if (canvas) {
      setDisableRedo(false);
      setDisableUndo(true);
      canvas.clear();
      canvas.loadFromJSON(pstate, function () {
        canvas.renderAll();
        setDisableRedo(false);
        if (undoState.length) setDisableUndo(false);
      });
    }
  };
  const removeGrid = (canvas: any) => {
    var objects = canvas.getObjects("line");
    for (let i in objects) {
      canvas.remove(objects[i]);
    }
    canvas.renderAll();
  };

  const drawGrid = (
    canvas: any,
    rows: number,
    columns: number,
    currentCategoryHeight: number,
    currentCategoryWidth: number
  ) => {
    let rowHeight;
    let columnWidth;
    const canvasLeft = 250;
    const canvasTop = 250;
    console.log(".............>>>drawGrid");

    if (rows > 1) {
      rowHeight = currentCategoryHeight / rows;
    }
    if (columns > 1) {
      columnWidth = currentCategoryWidth / columns;
    }
    if (rowHeight) {
      for (let i = 1; i < rows; ++i) {
        canvas.add(
          new fabric.Line(
            [
              canvasLeft,
              i * rowHeight + canvasTop,
              currentCategoryWidth + canvasLeft,
              i * rowHeight + canvasTop,
            ],
            {
              stroke: "purple",
              skipObject: true,
              excludeFromExport: true,
              lockMovementX: true,
              lockMovementY: true,
            }
          )
        );
      }
    }

    if (columnWidth) {
      for (let j = 1; j < columns; ++j) {
        canvas.add(
          new fabric.Line(
            [
              j * columnWidth + canvasLeft,
              canvasTop,
              j * columnWidth + canvasLeft,
              currentCategoryHeight + canvasTop,
            ],
            {
              stroke: "purple",
              selectable: false,
              skipObject: true,
              excludeFromExport: true,
              lockMovementX: true,
              lockMovementY: true,
            }
          )
        );
      }
    }
  };
  const clearCanvas = () => {
    setRedoState([]);
    setDisableRedo(true);
    save();
    canvas.clear();
  };
  const setBgColor = (color: string) => {
    canvas.backgroundColor = color;
    canvas.renderAll();
    save();
  };

  window.addEventListener("resize", function (event) {
    canvasResize(currentWidth, currentHeight);
  });

  const canvasResize = (resizeWidth: any, resizeHeight: any) => {
    if (document && document.getElementById("WorkspaceSpaceContainer")) {
      let tempEl: any =
        document.getElementById("WorkspaceSpaceContainer") || null;
      if (tempEl.getBoundingClientRect()) {
        let divHeight: any = tempEl.getBoundingClientRect().height || null;
        //let divHeight:any=document.getElementById('WorkspaceSpaceContainer').getBoundingClientRect().height || null
        let divWidth: any = tempEl.getBoundingClientRect().width || null;
        let clipHeight = 0;
        let clipWidth = 0;
        console.log(divHeight, divWidth);
        clipHeight = divHeight / 2;
        clipWidth = (resizeWidth / resizeHeight) * clipHeight;
        setZoomPercent(Math.round((clipHeight / resizeHeight) * 100));
        setClippingHeight(clipHeight);
        setClippingWidth(clipWidth);
        setCanvasTop(Math.max((divHeight - clipHeight) / 3.33, 50));
        setCanvasLeft(Math.max((divWidth - clipWidth) / 2, 50));
        setZoomLevel((clipHeight / resizeHeight) * 100);
      }
    }
  };
  const zoomIn = () => {
    if (
      clippingWidth + 0.1 * clippingWidth <= 2000 &&
      clippingHeight + 0.1 * clippingHeight <= 2000
    ) {
      if (document && document.getElementById("WorkspaceSpaceContainer")) {
        let tempEl: any =
          document.getElementById("WorkspaceSpaceContainer") || null;
        if (tempEl.getBoundingClientRect()) {
          let divHeight: any = tempEl.getBoundingClientRect().height || null;
          let divWidth: any = tempEl.getBoundingClientRect().width || null;
          const addWidth = (10 * clippingWidth) / 100;
          const addHeight = (10 * clippingHeight) / 100;
          let clipHeight = clippingHeight + addHeight;
          let clipWidth = clippingWidth + addWidth;

          setClippingWidth(clipWidth);
          setClippingHeight(clipHeight);
          setCanvasTop(Math.max((divHeight - clipHeight) / 3.33, 50));
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
          const reduceWidth = (10 * clippingWidth) / 100;
          const reduceHeight = (10 * clippingHeight) / 100;
          let clipHeight = clippingHeight - reduceHeight;
          let clipWidth = clippingWidth - reduceWidth;
          setClippingWidth(clipWidth);
          setClippingHeight(clipHeight);
          setCanvasTop(Math.max((divHeight - clipHeight) / 3.33, 50));
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
      } else {
        setShowRightSidePanel(false);
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
    console.log(imgObj);
    return imgObj;
  };

  const imageKeysArray = (obj: any) => {
    const arr = [...imageArr];
    arr.push(obj);
    let keys: any[] = [];
    for (let i = 0; i < arr.length; i++) {
      console.log(arr[i]);
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
            <div id="canvas-videos" style={{ display: "none" }}></div>
            <WorkspaceBottom id="workspaceBottom">
              <WorkspaceScroll
                id="outerDiv"
                style={{ display: "block", justifyContent: "unset" }}
              >
                <WorkspaceCenterWrapper
                  style={{
                    top: `${canvasTop}px`,
                    left: `${canvasLeft}px`,
                    display: "inline-block",
                    position: "absolute",
                  }}
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
                      width: clippingWidth,
                      height: clippingHeight,
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
                        clippingWidth + (+500 * clippingHeight) / currentHeight
                      }px`,
                      height: `${
                        clippingHeight + (+500 * clippingHeight) / currentHeight
                      }px`,

                      top: -250 * (clippingHeight / currentHeight) + "px",
                      left: -250 * (clippingHeight / currentHeight) + "px",
                    }}
                  >
                    <CanvasContainer>
                      {/* <div style={{ overflow: "hidden", clear: "both" }}>
                          <div> */}
                      <canvas id={canvasId} />
                      {/* </div>
                        </div> */}
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
          togglePopup={togglePopup}
        />
        {/* <JsonContainer
            json={canvas ? getComposition(canvas) : {}}
            updateJson={updateJson}
            canvas={canvas}
          /> */}
        {isOpen && <UploadPopUp handleClose={togglePopup} />}
      </MainContentWrapper>
    </>
  );
};
