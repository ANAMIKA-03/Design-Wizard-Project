import React, { useEffect, useState, useRef } from "react";
import range from "lodash/range";
import _ from "lodash";
import get from "lodash/get";
import Draggable from "react-draggable";
import DragResizeContainer from "react-drag-resize";
//import { Resizable } from 'react-resizable';
import { animation } from "./AnimationText/animation";
import { Resizable } from "re-resizable";
import { Rnd } from "react-rnd";
import {
  VideoTimelineWrapper,
  VideoTimelineInnerWrapper,
  PlayAnimationWrapper,
  PlayAnimationBg,
  PlayAnimationBtnWrapper,
  PlayAnimationBtn,
  PlayAnimationScrollerWrapper,
  ScrollZoneWrapper,
  ScrollZone,
  TimelineRuler,
  TimelineRulerSpan,
  AnimationTimeline,
  VideosTimeline,
  TimelineIndicator,
  TimelineIndicatorScrubber,
  //TimelineRailX,
  //TimelineRailXThumb,
  TimelineRailY,
  TimelineRailYThumb,
  ScrollZoneInnerWrapper,
  VideoTimelineImageMainDiv,
  LeftDurationHandle,
  VideoSliders,
  RightDurationHandle,
  AnimationTimelineMainDiv,
  AnimatedTextDiv,
} from "./styledComponent";

import { ReactComponent as PlayAnimationBgSvg } from "./../../../../assets/svg/animationPlayBckg.svg";
import { ReactComponent as PlayAnimationBtnSvg } from "./../../../../assets/svg/playAnim.svg";
import { ReactComponent as PauseAnimationBtnSvg } from "./../../../../assets/svg/pauseAnim.svg";
import { ReactComponent as Delete } from "./../../../../assets/svg/timelineDelete.svg";

const REFRESH_INTERVAL = 200;
let draggingItem: any;
const maxSeconds = 40;
const timeLengthMilliseconds = maxSeconds * 1000;
let resizingObject: any;
const MIN_DURATION = 3000;
let scrollZoneElement: any;
let scrollZoneWidth: any;
let windowElement: any;
let selectedSequenceId: any = null;
let currentTime: any = "0";
const LOGO_URL =
  "https://s3-eu-west-1.amazonaws.com/composer.production/animations/preset-add-img-grahic.png";
/**
 * play or pause the child video elements
 * @param play True to play videos, false to stop.
 */
// function playVideosElement(play:any,canvas:any,isVideoPlaying:any) {
//   const videos = getVideoObjects(canvas);
//   isVideoPlaying = play;

//   let minDuration = play
//     ? videos.reduce((min:any, video:any) => {
//         return Math.min(min, video.totalLength);
//       }, Number.MAX_SAFE_INTEGER)
//     : null;

//   videos.forEach((video:any) => {
//     if (play) {
//       video.setDuration(minDuration);
//       video.playVideo();
//     } else {
//       video.pauseVideo();
//     }
//   });
// }

// /**
//  * when video is paused
//  * @param videoList
//  * @param canvas
//  * @param pauseVideo
//  */
// const onPause = (videoList: any[], canvas: any, pauseVideo: any) => {
//   if (videoList.length === 1) {
//     pauseVideo(videoList, canvas, 0);
//   } else {
//     let paused = false;
//     for (let i = 0; i < videoList.length; i++) {
//       if (
//         videoList[i].videoElement.currentTime <
//           videoList[i].videoElement.duration &&
//         !videoList[i].videoElement.ended
//       ) {
//         pauseVideo(videoList, canvas, i);
//         paused = true;
//       }
//     }
//     if (!paused) {
//       pauseVideo(videoList, canvas, 0);
//     }
//   }
// };

/**
 * display button
 * @param props
 * @returns
 */
const PlayVideoBtn = (props: any) => {
  const {
    playVideo,
    videoList,
    disableBtn,
    canvas,
    isVideoPlaying,
    setIsVideoPlaying,
    pauseVideo,
    setIndicatorLeft,
    currentTime,
    videos,
    animations,
  } = props;

  /**
   * Play/stop videos and animations in canvas.
   */
  const videoPreview = () => {
    console.log(animations);
    if (!videos.length && !animations.length) {
      return;
    }
    //selectedSequenceId = null;
    if (isVideoPlaying) {
      console.log("stop==>");
      animation(canvas).stopAnimation();
    } else {
      console.log("start==>");
      animation(canvas).startAnimation(currentTime);
    }
  };

  return (
    <PlayAnimationWrapper>
      <PlayAnimationBg
        onClick={() => {
          videoPreview();
        }}
      >
        <PlayAnimationBgSvg className="playAnimationBgSvg" />
        <div id="starting-point" />
        <PlayAnimationBtnWrapper className="playAnimationBtnWrapper">
          <PlayAnimationBtn
            style={
              disableBtn
                ? { opacity: 0.5, cursor: "default" }
                : { opacity: 1, cursor: "pointer" }
            }
          >
            {isVideoPlaying ? (
              <PauseAnimationBtnSvg className="playAnimationBtnSvg" />
            ) : (
              <PlayAnimationBtnSvg className="playAnimationBtnSvg" />
            )}
          </PlayAnimationBtn>
        </PlayAnimationBtnWrapper>
      </PlayAnimationBg>
    </PlayAnimationWrapper>
  );
};

/**
 * video timeline images
 * @param props
 * @returns
 */
const VideoTimelineImage = (props: any) => {
  const {
    img,
    index,
    videoDurationArray,
    width,
    left,
    canvas,
    element,
    onStartDraggingObject,
    updateStartTime,
    onStartResize,
    onResize,
    onStopResize,
  } = props;
  const [tWidth, setTwidth] = useState(width);
  const [tempLeft, setTempLeft] = useState(left);
  function removeElement(object: any) {
    if (!object) {
      object = canvas.getActiveObject();
    }
    if (object) {
      setTimeout(() => {
        // if (object.isGroup()) {
        //   groupService.removeGroup(object);
        // } else {
        canvas.remove(object);
        // }
        canvas.renderAll();
      }, 10);
    }
  }
  /**
   * Delete animation or video from canvas.
   * @param event Click event data.
   * @param object Animation or video to be deleted.
   */
  const deleteObject = (object: any) => {
    const type = object.type === "video" ? "clip" : "text";
    if (window.confirm(`Do you want to delete this ${type} from your video?`)) {
      removeElement(object.object);
      canvas.renderAll();
    }
  };
  const style = {
    transform: "translate(0,0)",
  };
  return (
    <>
      <Rnd
        className="videos-timeline videoStrip"
        size={{ width: tWidth, height: "60px" }}
        style={{
          height: "60px",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          // position: relative,
          backgroundColor: "#423a6f",
          borderRadius: "8px",
          border: "1px solid #423a6f",
          overflow: "hidden",
          top: "1px",
          boxShadow: "-5px 13px 16px 0 rgb(0 0 0 / 61%)",
          cursor: "move",
        }}
        onResizeStart={(e: any, dir: any, ele: any) =>
          onStartResize(e, element, canvas)
        }
        onResizeStop={(e: any, dir: any, ele: any, delta: any, position: any) =>
          onStopResize(e, element, canvas, dir, position.x, ele.style.width)
        }
        onResize={(e: any, dir: any, ele: any, delta: any, position: any) => {
          onResize(e, element, canvas, dir, position.x, ele.style.width);
          setTwidth(ele.style.width);
          // let divss:any = document.getElementById('videoImage')
          // console.log(divss)
          // setTempLeft(divss.style.left)
        }}
        onDragStart={() => onStartDraggingObject(element)}
        onDrag={(e: any, data: any) => {
          updateStartTime(element, data.x);
        }}
        dragAxis="x"
        dragHandleClassName="handle"
        resizeHandleClasses={{
          left: "left-duration-handle",
          right: "right-duration-handle",
        }}
        resizeHandleStyles={{
          left: { width: "20px", zIndex: 25 },
          right: { width: "20px", zIndex: 25 },
        }}
        bounds="parent"
        enableResizing={{
          top: false,
          right: true,
          left: true,
          bottom: false,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false,
        }}
      >
        {/* <VideoTimelineImageMainDiv
          // style={{ width: tWidth, left: left }}
          className="videoStrip"
          id='videoImage'
        > */}
        <LeftDurationHandle>
          <VideoSliders className="sliderss"></VideoSliders>
        </LeftDurationHandle>
        <Delete
          style={{
            right: "35px",
            top: "19px",
            position: "absolute",
            zIndex: 3,
            cursor: "pointer",
          }}
          onClick={() => deleteObject(element)}
        />
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            zIndex: 2,
            left: left,
          }}
          className="handle"
        ></div>
        <div
          style={{
            position: "absolute",
            left: `${left}px`,
            backgroundImage: `url(${img})`,
            backgroundSize: "contain",
            width: "100%",
            height: "100%",
            display: "flex",
            cursor: "move ",
          }}
        ></div>
        <RightDurationHandle>
          <VideoSliders className="rightsliderss"></VideoSliders>
        </RightDurationHandle>
        {/* </VideoTimelineImageMainDiv> */}
      </Rnd>
    </>
  );
};

const AnimationTimelinesImage = (props: any) => {
  const {
    img,
    index,
    width,
    left,
    canvas,
    element,
    text,
    onStartDraggingObject,
    updateStartTime,
    hasLogo,
    logoUrl,
  } = props;
  useEffect(() => {
    console.log(element);
  }, [element]);

  function removeElement(object: any) {
    if (!object) {
      object = canvas.getActiveObject();
    }
    if (object) {
      setTimeout(() => {
        // if (object.isGroup()) {
        //   groupService.removeGroup(object);
        // } else {
        canvas.remove(object);
        // }
        canvas.renderAll();
      }, 10);
    }
  }
  /**
   * Delete animation or video from canvas.
   * @param event Click event data.
   * @param object Animation or video to be deleted.
   */
  const deleteObject = (object: any) => {
    // event.stopPropagation();
    const type = object.type === "video" ? "clip" : "text";

    if (window.confirm(`Do you want to delete this ${type} from your video?`)) {
      removeElement(object.object);
      canvas.renderAll();
    }
  };
  return (
    <>
      <Draggable
        axis="x"
        bounds={{ left: 0 }}
        onStart={() => onStartDraggingObject(element)}
        onDrag={(e: any, data: any) => {
          updateStartTime(element, data.x);
        }}
      >
        <AnimationTimelineMainDiv
          style={{ width: width, left: left }}
          className="videoStrip"
        >
          <LeftDurationHandle>
            <VideoSliders className="sliderss"></VideoSliders>
          </LeftDurationHandle>
          <Delete
            style={{
              right: "35px",
              top: "11px",
              position: "absolute",
              zIndex: 3,
              cursor: "pointer",
            }}
            onClick={() => deleteObject(element)}
          />
          <AnimatedTextDiv>
            {console.log(hasLogo)}
            {logoUrl ? (
              <img
                src={logoUrl ? logoUrl : LOGO_URL}
                height="30px"
                width="35px"
                style={{
                  marginTop: "5px",
                }}
              />
            ) : (
              <span>{text}</span>
            )}
          </AnimatedTextDiv>
          <div
            style={{
              position: "absolute",
              left: `${left}px`,
              backgroundColor: "#423a6f",
              width: "100%",
              height: "100%",
              display: "flex",
              cursor: "move ",
            }}
          ></div>
          <RightDurationHandle>
            <VideoSliders className="rightsliderss"></VideoSliders>
          </RightDurationHandle>
        </AnimationTimelineMainDiv>
      </Draggable>
    </>
  );
};

/**
 * video timeline scroller
 * @param props
 * @returns
 */
const PlayAnimationScroller = (props: any) => {
  const {
    videoTimelineImages,
    videoDurationArray,
    indicatorLeft,
    videos,
    canvas,
    animations,
    onStartDraggingObject,
    updateStartTime,
    onStartResize,
    onResize,
    onStopResize,
  } = props;
  console.log(videos);
  return (
    <PlayAnimationScrollerWrapper>
      <ScrollZoneWrapper className="ScrollZoneWrapper">
        <ScrollZoneInnerWrapper>
          <ScrollZone>
            <TimelineRuler>
              {range(0, 40).map((num: number) => (
                <TimelineRulerSpan style={{ opacity: num % 3 === 0 ? 1 : 0 }}>
                  {num}
                </TimelineRulerSpan>
              ))}
            </TimelineRuler>
          </ScrollZone>
          <AnimationTimeline className="animationTimeline">
            {animations.map((element: any, index: number) => {
              console.log("element", element);
              return (
                <AnimationTimelinesImage
                  left={element.left}
                  img={element.thumb}
                  width={element.width}
                  index={index}
                  canvas={canvas}
                  text={element.text}
                  element={element}
                  onStartDraggingObject={onStartDraggingObject}
                  updateStartTime={updateStartTime}
                  hasLogo={element.hasLogo}
                  logoUrl={element.logoUrl}
                />
              );
            })}
          </AnimationTimeline>
          <VideosTimeline className="videosTimeline">
            {videos.map((element: any, index: number) => (
              <VideoTimelineImage
                left={element.left}
                img={element.thumb}
                width={element.width}
                index={index}
                videoDurationArray={videoDurationArray}
                indicatorLeft={indicatorLeft}
                canvas={canvas}
                element={element}
                onStartDraggingObject={onStartDraggingObject}
                updateStartTime={updateStartTime}
                onStartResize={onStartResize}
                onResize={onResize}
                onStopResize={onStopResize}
              />
            ))}
          </VideosTimeline>
          <Draggable axis="x" bounds={{ left: 0 }}>
            <TimelineIndicator style={{ left: `${indicatorLeft}px` }}>
              <TimelineIndicatorScrubber
                className="timelineIndicatorScrubber"
                style={{ left: `${0 - 1.4}px` }}
              />
            </TimelineIndicator>
          </Draggable>
        </ScrollZoneInnerWrapper>
      </ScrollZoneWrapper>
      <TimelineRailY>
        <TimelineRailYThumb />
      </TimelineRailY>
    </PlayAnimationScrollerWrapper>
  );
};

/**
 * video timeline
 * @param props
 * @returns
 */
export const VideoTimeline = (props: any) => {
  const { videoList, currentPlayingVideoId, canvas, setVideoList } = props;
  const [disableBtn, setDisableBtn] = useState<boolean>(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [videoTimelineImages, setVideoTimelineImages] = useState<string[]>([]);
  const [videoDurationArray, setVideoDurationArray] = useState<number[]>([]);
  const [currentPlayingVideoElement, setCurrentPlayingVideoElement] =
    useState<any>(null);
  const [timer, setTimer] = useState(0);
  const [startTimer, setStartTimer] = useState(false);
  const [indicatorLeft, setIndicatorLeft] = useState<number>(0);
  //const [currentTime, setCurrentTime] = useState<any>();
  const [videos, setVideos] = useState<any>([]);
  const [animations, setAnimations] = useState<any>([]);
  const [called, setCalled] = useState(false);
  const intervalRef: any = useRef();

  const setCurrentTimes = _.throttle((milliseconds) => {
    animation(canvas).stopAnimation(false);
    setIsVideoPlaying(false);
    currentTime = milliseconds;
    setIndicatorLeft(timeToWidth(milliseconds));
    setObjectsToTime();
  }, REFRESH_INTERVAL);

  /**
   * Store the dragging animation for when it is dropped.
   * {@link http://api.jqueryui.com/draggable/} For information about params.
   * @param event
   * @param ui
   * @param item Object that is being dragged.
   */
  const onStartDraggingObject = (item: any) => {
    console.log(item);
    animation(canvas).stopAnimation();
    updateScrollZoneElementWidth();
    draggingItem = item;
    draggingItem.originalStartTime = item.startTime;
  };

  /**
   * Update startTime and endTime of object that is being dragged.
   * {@link http://api.jqueryui.com/resizable/} For information about params.
   * @param event
   * @param ui
   */
  const updateStartTime = (item: any, left: any) => {
    const rect = scrollZoneElement.getBoundingClientRect().width;
    scrollZoneWidth = rect;
    draggingItem = item;
    draggingItem.startTime = (left / scrollZoneWidth) * timeLengthMilliseconds;
    console.log("left", left);
    console.log("scrollZoneWidth", scrollZoneWidth);
    console.log("timeLengthMilliseconds", timeLengthMilliseconds);
    draggingItem.endTime = draggingItem.startTime + draggingItem.duration;
    setObjectsToTime();
    draggingItem.object.setStartTime(draggingItem.startTime);
    console.log("draggingItem", draggingItem);
    // $scope.$apply();
  };

  /**
   * Convert a width in pixels to milliseconds.
   * @param width Width of the element in pixels.
   * @return {number} Milliseconds
   */
  const widthToDuration = (width: any) => {
    const duration = (width / scrollZoneWidth) * maxSeconds * 1000;
    return Math.round(duration * 100) / 100;
  };

  /**
   * Convert a time in milliseconds to a percentage of the timeline.
   * @param timeInMilliseconds Duration of the animation/video in milliseconds.
   * @return {string} Number with percentage.
   */
  const timeToPercent = (timeInMilliseconds: any) =>
    `${(Math.round(timeInMilliseconds) / timeLengthMilliseconds) * 100}%`;

  /**
   * Convert a x coordinate to time in milliseconds.
   * @param position X coordinate.
   * @return {number} Milliseconds.
   */
  const positionToTime = (position: any) =>
    Math.round((position / scrollZoneWidth) * maxSeconds * 1000);

  const getVideoObjects = (canvas: any) => {
    return canvas.getObjects("videos");
  };

  const percentToWidth = (percent: string) => {
    let widthInpPercent = parseFloat(percent.split("%")[0]);
    return widthInpPercent * 25;
  };

  const updateScrollZoneElementWidth = () => {
    scrollZoneElement =
      document.getElementsByClassName("videosTimeline")[0] || null;
    console.log(scrollZoneElement);
    const rect = scrollZoneElement.getBoundingClientRect().width;
    scrollZoneWidth = rect;
  };

  const onStartResize = (event: any, ui: any, canvas: any) => {
    // animation(canvas).stopAnimation();
    updateScrollZoneElementWidth();
    console.log(ui);
    // debugger;
    const objectId = ui.uid;
    const isVideo = ui.type === "video";
    const objects = isVideo ? videos : animations;
    resizingObject = _.find(objects, (object) => object.uid === objectId);
    console.log(resizingObject);
    console.log(objects);
    //  debugger;
    resizingObject.previousWidth = percentToWidth(ui.width);
    resizingObject.previousStartTime = resizingObject.startTime;
  };

  const calcResize = (ui: any, dir: any, x: any, actualWidth: any) => {
    // Get the left and right of the resizing object
    console.log(resizingObject);
    // debugger
    const left = positionToTime(x);
    const right = positionToTime(x + percentToWidth(actualWidth));
    console.log(x, percentToWidth(actualWidth));
    const isResizingFromLeft = dir === "left" ? true : false;
    // ui.originalPosition.left - ui.left !== 0;
    const isResizingFromRight = dir === "right" ? true : false;
    // !isResizingFromLeft && ui.width - resizingObject.previousWidth !== 0;

    // If the limits are exceeded stop resizing.
    const stopResizing =
      (isResizingFromLeft && left <= resizingObject.minStart) ||
      (isResizingFromRight && right >= resizingObject.maxEnd);

    // Change the start/end time, depending on the resize direction.
    // When moving from the left the endTime cannot change.
    if (isResizingFromLeft) {
      console.log(resizingObject);
      // debugger
      resizingObject.startTime = Math.max(left, resizingObject.minStart);
      console.log(left, resizingObject.minStart);
      // debugger
    } else if (isResizingFromRight) {
      resizingObject.endTime = Math.min(right, resizingObject.maxEnd);
      console.log(resizingObject);
    }

    // Set the duration based on the start end time. Only one of these values has changed and
    // the other one is constrained e.g. Math.min(right, resizingObject.maxEnd)
    // Therefor the duration cannot exceed the max duration
    console.log(resizingObject);
    // debugger
    resizingObject.duration = resizingObject.endTime - resizingObject.startTime;
    console.log(resizingObject);
    // debugger
    // For videos recalculate the offset at the start or end.
    // Again only one of these will have changed.
    if (resizingObject.type === "video") {
      if (isResizingFromLeft) {
        resizingObject.offset = Math.max(
          resizingObject.totalLength -
            resizingObject.duration -
            resizingObject.endOffset,
          0
        );
      } else if (isResizingFromRight) {
        resizingObject.endOffset = Math.max(
          resizingObject.totalLength -
            resizingObject.duration -
            resizingObject.offset,
          0
        );
      }
    }

    // Store values for next loop
    resizingObject.previousStartTime = resizingObject.startTime;
    resizingObject.previousWidth = percentToWidth(ui.width);

    return stopResizing;
  };

  const setResizeClasses = (object: any) => {
    console.log(object);
    // debugger
    const canReduceDuration = object.duration > MIN_DURATION;
    let canResizeToLeft = object.minStart < object.startTime;
    let canResizeToRight = object.endTime < object.maxEnd;

    if (object.type === "video") {
      canResizeToLeft = canResizeToLeft && object.offset > 0;
      canResizeToRight = canResizeToRight && object.endOffset > 0;
    }

    object.resizeStart = "none";
    if (canResizeToLeft && canReduceDuration) {
      object.resizeStart = "both";
    } else if (canResizeToLeft) {
      object.resizeStart = "left";
    } else if (canReduceDuration) {
      object.resizeStart = "right";
    }

    object.resizeEnd = "none";
    if (canResizeToRight && canReduceDuration) {
      object.resizeEnd = "both";
    } else if (canReduceDuration) {
      object.resizeEnd = "left";
    } else if (canResizeToRight) {
      object.resizeEnd = "right";
    }
  };

  const findAnimationAtTime = (timeInMilliseconds: any) => {
    for (const animation of animations) {
      if (
        animation.startTime <= timeInMilliseconds &&
        animation.endTime >= timeInMilliseconds
      ) {
        return animation;
      }
    }
    return null;
  };

  const methodToNonActiveAnimations = (activeAnimation: any, method: any) => {
    animations
      .filter((animation: any) => animation !== activeAnimation)
      .forEach(({ object }: any) => method(object));
  };

  const lockAnimations = (activeAnimation: any) => {
    methodToNonActiveAnimations(activeAnimation, "lockObject");
  };

  const hideAnimations = (activeAnimation: any) => {
    methodToNonActiveAnimations(activeAnimation, "hide");
  };

  const activateAnimation = (time = currentTime) => {
    selectedSequenceId = null;
    canvas.discardActiveObject();
    const activeAnimation = findAnimationAtTime(time);
    lockAnimations(activeAnimation);
    hideAnimations(activeAnimation);

    if (activeAnimation) {
      const { object, sequenceId } = activeAnimation;
      selectedSequenceId = sequenceId;
      object.show();
      unlockObject(object);
      canvas.setActiveObject(object);
    }
  };

  const activateVideo = (milliseconds: any = currentTime) => {
    getVideos(canvas).forEach((video: any) => {
      const eneTime = video.startTime + video.duration;
      if (video.startTime > milliseconds || eneTime < milliseconds) {
        // The video is not active hide it
        video.hide();
        // Set the time to it's offset; this should help avoid seek delays
        // as it is the correct start time for the video; unless the timeline is clicked
        // or the video edited.
        video.setCurrentTime(video.offset);
      } else {
        // the video is active show it and calculate it's current time
        video.show();
        video.setCurrentTime(currentTime - video.startTime + video.offset);
      }
    });
  };

  const setObjectsToTime = (time = currentTime) => {
    canvas.setCanvasObjectsToAnimationTime(time);
    activateAnimation(time);
    activateVideo(time);
    canvas.renderAll();
  };

  /**
   * Handler for on resize event, update startTime, duration and endTime of
   * object.
   * {@link http://api.jqueryui.com/resizable/} For information about params.
   * @param event
   * @param ui
   */
  const onResize = function onResize(
    event: any,
    ui: any,
    canvas: any,
    dir: any,
    x: any,
    actualWidth: any
  ) {
    if (calcResize(ui, dir, x, actualWidth)) {
      // $(this:any)
      //   .resizable('widget')
      //   .trigger('mouseup');
    }
    resizingObject.object.setStartTime(resizingObject.startTime);
    resizingObject.object.setDuration(resizingObject.duration);

    if (resizingObject.type === "video") {
      resizingObject.object.setOffset(resizingObject.offset);
    }

    setResizeClasses(resizingObject);
    setObjectsToTime(currentTime);
  };

  /**
   * Handler for on stop resize event. Update startTime, duration and offset
   * of canvas object. The correct values for these are calculated in the
   * onResize() method.
   */
  const onStopResize = (
    event: any,
    ui: any,
    canvas: any,
    dir: any,
    x: any,
    actualWidth: any
  ) => {
    calcResize(ui, dir, x, actualWidth);
    resizingObject.object.setStartTime(resizingObject.startTime);
    resizingObject.object.setDuration(resizingObject.duration);

    if (resizingObject.type === "video") {
      resizingObject.object.setOffset(resizingObject.offset);
    }
    reloadList(
      resizingObject.type === "video",
      resizingObject.type !== "video"
    );
    setObjectsToTime(currentTime);
    // setTimeout(() => {
    //   // currentCompositionService.updateComposition();
    // });
  };

  function lockObject(obj: any) {
    obj.set({
      locked: true,
      selectable: false,
      evented: false,
      lockMovementX: true,
      lockMovementY: true,
      lockRotation: true,
      lockScalingX: true,
      lockScalingY: true,
      lockUniScaling: true,
      hasControls: false,
      hasBorders: false,
    });
  }

  function unlockObject(object: any) {
    object.set({
      locked: false,
      selectable: true,
      evented: true,
      lockMovementX: false,
      lockMovementY: false,
      lockRotation: false,
      lockScalingX: false,
      lockScalingY: false,
      lockUniScaling: false,
      hasControls: true,
      hasBorders: true,
    });
  }

  /**
   * Set the max amounts that each object in the list can be resized by in both directions.
   *
   * @param {Array} orderedList
   */
  const setLeftRightBounds = (orderedList: any) => {
    orderedList.forEach((object: any, index: any, list: any) => {
      // 0 or the end of the previous object
      object.minStart = index > 0 ? list[index - 1].endTime : 0;
      // max timeline length or the start of the next object
      object.maxEnd =
        index < list.length - 1
          ? list[index + 1].startTime
          : timeLengthMilliseconds;

      if (object.type === "video") {
        // A video can only be increased to the left by the seconds cut off by its offset
        object.minStart = Math.max(
          object.minStart,
          object.startTime - object.offset
        );
        // A video can only be increased to the right by the time cut off the end
        object.maxEnd = Math.min(
          object.maxEnd,
          object.endTime + object.endOffset
        );
      }
      console.log(object);
      setResizeClasses(object);
    });
  };

  const getVideos = (canvas: any) => canvas.getObjects("video");
  /**
   * Load videos from canvas and build data structure to be rendered in
   * timeline.
   */
  const loadTimesFromVideos = (canvas: any) => {
    const videosToget = getVideos(canvas);
    let videoss: any = [];
    console.log(videosToget);
    videosToget.forEach((video: any) => {
      const { duration, totalLength, startTime, offset } = video;

      videoss.push({
        type: "video",
        duration,
        totalLength,
        startTime: Math.round(startTime),
        endTime: Math.round(startTime + duration),
        offset,
        endOffset: totalLength - offset - duration,
        uid: video.uid,
        left: timeToPercent(startTime),
        width: timeToPercent(duration),
        poster: video.poster,
        thumb: video.thumb,
        object: video,
        resizeOptions: {
          containment: ".videos-timeline",
          handles: {
            e: ".right-duration-handle",
            w: ".left-duration-handle",
          },
          // Don't round otherwise jQuery might not let the video be reduced to the min size
          // E.g. 3:01 instead of 3:00
          minWidth: timeToWidth(MIN_DURATION),
          start: onStartResize,
          resize: onResize,
          stop: onStopResize,
        },
      });

      videoss = videoss.sort((a: any, b: any) => a.startTime - b.startTime);
      console.log(videos);
    });
    setVideos(videoss);
  };

  useEffect(() => {
    setLeftRightBounds(videos);
  }, [videos]);
  /**
   * Load animations from canvas and build data structure to be rendered in
   * timeline.
   */
  const loadTimesFromGroups = (canvas: any) => {
    const groups = animation(canvas).getAnimatedGroups();
    console.log("groups", groups);
    let animations: any = [];

    groups.forEach((group: any) => {
      const {
        hasLogo,
        logo,
        sequence: { startTime, endTime, sequenceId },
      } = group;
      console.log("group", group);
      const text = group.getText();
      const startOfPosterFrame = group.getStartOfPosterFrame();

      const logoUrl = hasLogo ? animation(canvas).logoToUrl(logo, "30x30") : "";

      animations.push({
        type: "animation",
        startTime: Math.round(startTime),
        endTime: Math.round(endTime),
        duration: Math.round(endTime - startTime),
        startOfPosterFrame,
        sequenceId,
        uid: sequenceId,
        text,
        left: timeToPercent(startTime),
        width: timeToPercent(endTime - startTime),
        logoUrl,
        object: group,
        resizeOptions: {
          containment: ".animations-timeline",
          handles: {
            e: ".right-duration-handle",
            w: ".left-duration-handle",
          },
          // Don't round otherwise jQuery might not let the animation be reduced to the min size
          // E.g. 3:01 instead of 3:00
          minWidth: timeToWidth(
            Math.max(MIN_DURATION, group.sequence.getMinDuration())
          ),
          start: onStartResize,
          resize: onResize,
          stop: onStopResize,
        },
      });
    });

    animations = animations.sort((a: any, b: any) => a.startTime - b.startTime);
    setAnimations(animations);
    // setLeftRightBounds(animations);
  };
  useEffect(() => {
    setLeftRightBounds(animations);
  }, [animations]);

  const reloadList = (reloadVideos: any, reloadAnimations: any) => {
    if (reloadVideos) {
      loadTimesFromVideos(canvas);
    }
    if (reloadAnimations) {
      loadTimesFromGroups(canvas);
    }
    // Some effects use undefined for initial values, meaning to use the current value
    // We playing a full animation these values are calculated before start. However,
    // when jumping around the timeline the values can get messed up. Calling this method
    // whenever anything changes fill the unknowns with the correct values
    setCalled(!called);
  };

  const updatePositionIndicator = (data: any) => {
    console.log("inside updatePositionIndicator", data);
    setTimeout(() => {
      currentTime = data.elapsedMilliseconds;
      setIndicatorLeft(timeToWidth(data.elapsedMilliseconds));
    });
  };
  /**
   * Render animations and videos every time an object is added from the
   * canvas. Update selectedSequenceId if animation is added.
   *
   */
  const onObjectAdded = ({ target: object }: any) => {
    // if (isInStoryMode()) {
    const { sequenceId, posterFrame, skipObject } = object;
    if (skipObject) {
      return;
    }

    let offset = 0;
    if (sequenceId) {
      selectedSequenceId = sequenceId;
      offset = posterFrame;
    }
    if (object && !object.sequenceId) {
      lockObject(object);
    }
    console.log(object);

    updateScrollZoneElementWidth();
    reloadList(true, true);
    setObjectsToTime(offset + object.startTime);
    // }
  };

  const onSelectionUpdated = (data: any) => {
    if (data.target.type === "AnimatedGroup") {
      selectedSequenceId = data.target.sequence.sequenceId;
    }
  };

  const onSelectionCleared = () => {
    selectedSequenceId = null;
  };

  const onCanvasCleared = () => {
    setAnimations([]);
    setVideos([]);
    selectedSequenceId = null;
    currentTime = 0;
    setIndicatorLeft(0);
  };

  /**
   * Render animations and videos every time an object is deleted from the
   * canvas. Update selectedSequenceId if selected animation is deleted.
   */
  const onObjectRemoved = (data: any) => {
    // if (!canvas.isInStoryMode()) {
    //   return;
    // }

    // If the grid is active, this callback is executed when the lines are
    // removed, in that case we do nothing
    if (data.target.type === "line" && data.target.excludeFromExport) {
      return;
    }

    animation(canvas).stopAnimation();
    if (selectedSequenceId === data.target.sequenceId) {
      selectedSequenceId = null;
    }
    updateScrollZoneElementWidth();
    reloadList(true, true);
  };

  const animationStarted = () => {
    lockAnimations(null);
    setTimeout(() => {
      setIsVideoPlaying(true);
    });
  };

  const animationStopped = () => {
    setTimeout(() => {
      setIsVideoPlaying(false);
      // ensure the active animation is editable (has a fabric control box)
      setObjectsToTime();
    });
  };

  useEffect(() => {
    if (canvas) {
      if (animations || videos) {
        console.log(animations, videos);
        animation(canvas).fillUnknownMissingValues(
          animations.map(({ object }: any) => object.getSequence()),
          videos.map(({ object }: any) => object)
        );
      }
    }
  }, [called]);

  useEffect(() => {
    if (canvas) {
      canvas.on("animation:frame-updated", updatePositionIndicator);
      canvas.on("object:added", onObjectAdded);
      canvas.on("selection:created", onSelectionUpdated);
      canvas.on("selection:updated", onSelectionUpdated);
      canvas.on("selection:cleared", onSelectionCleared);
      canvas.on("canvas:cleared", onCanvasCleared);
      canvas.on("object:removed", onObjectRemoved);
      canvas.on("animation:started", animationStarted);
      canvas.on("animation:ended", animationStopped);
      canvas.on("animation:paused", animationStopped);
    }
  }, [canvas]);
  /**
   * when video is added to canvas, update the settings
   */
  const timeToWidth = (timeInMilliseconds: any) =>
    2500 * (timeInMilliseconds / 40000);
  // useEffect(() => {
  //   if (Array.isArray(videoList) && videoList.length > 0) {
  //     setDisableBtn(false);
  //     //setIsPlaying(true);
  //     let temp: number = 0;
  //     const images = [];
  //     const durationArray = [];
  //     for (let i = 0; i < videoList.length; i++) {
  //       const videoId = get(videoList[i], "videoId", "");
  //       console.log(videoList);
  //       console.log(videoId);
  //       // when video is ended, reset the settings
  //       videoList[i].videoElement.onended = (e: any) => {
  //         console.log(e);
  //         setIsPlaying(false);
  //         if (videoList.length > i + 1) {
  //           videoList[i + 1].videoElement.play();
  //           canvas.bringToFront(videoList[i + 1].video);
  //           setIsPlaying(true);
  //         }
  //       };

  //       if (videoId) {
  //         const element: any = document.getElementById(videoId) || null;
  //         console.log(element.playbackRate);
  //         if (element) {
  //           temp = temp + (element.duration || 0);
  //           if (element.duration) {
  //             durationArray.push(element.duration);
  //           }
  //           if (element.poster) {
  //             images.push(element.poster);
  //           }
  //           if (currentPlayingVideoId === videoId) {
  //             setCurrentPlayingVideoElement(element);
  //           }
  //         }
  //       }
  //     }
  //     setTotalVideoDuration(temp);
  //     setVideoTimelineImages(images);
  //     setVideoDurationArray(durationArray);
  //   } else {
  //     //setDisableBtn(true);
  //     setTotalVideoDuration(0);
  //   }
  // }, [videoList, currentPlayingVideoId, canvas]);

  /**
   * when video is playing move the scroller
   */
  const videoId = get(videoList[0], "videoId", "");
  const element: any = document.getElementById(videoId) || null;
  useEffect(() => {
    console.log("indicatorLeft", indicatorLeft);
    console.log(element && element.currentTime);
  }, [currentPlayingVideoElement, indicatorLeft, isVideoPlaying, timer]);

  //
  return (
    <VideoTimelineWrapper>
      <VideoTimelineInnerWrapper>
        <PlayVideoBtn
          disableBtn={disableBtn}
          isVideoPlaying={isVideoPlaying}
          setIsVideoPlaying={setIsVideoPlaying}
          setIndicatorLeft={setIndicatorLeft}
          timer={timer}
          setTimer={setTimer}
          startTimer={startTimer}
          setStartTimer={setStartTimer}
          currentTime={currentTime}
          videos={videos}
          animations={animations}
          {...props}
        />
        <PlayAnimationScroller
          videos={videos}
          videoTimelineImages={videoTimelineImages}
          videoDurationArray={videoDurationArray}
          indicatorLeft={indicatorLeft}
          animations={animations}
          onStartDraggingObject={onStartDraggingObject}
          updateStartTime={updateStartTime}
          onStartResize={onStartResize}
          onResize={onResize}
          onStopResize={onStopResize}
          {...props}
        />
      </VideoTimelineInnerWrapper>
    </VideoTimelineWrapper>
  );
};
