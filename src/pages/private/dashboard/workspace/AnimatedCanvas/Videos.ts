import fabric from "@wbm-npm/animated-canvas";
import axios from "axios";
const isUserAsset = (imageData: any) => {
  if (!imageData.key) {
    return false;
  }
  const keyParts = imageData.key.split("/");
  return keyParts.length === 3;
};

const loadVideo = async (queryData: any) => {
  console.log("queryData", queryData);
  return await axios
    .get(
      `${
        process.env.REACT_APP_API_REDIRECT
      }/assets/getFileV2?access_token=${localStorage.getItem(
        "token"
      )}&fileData=${JSON.stringify(queryData)}`,
      { responseType: "blob" }
    )
    .then((response: any) => response.data);
};
export function Videos(canvas: any, clippingHeight: any, clippingWidth: any) {
  fabric.Video = fabric.util.createClass(fabric.Image, {
    type: "video",
    lockUniScaling: true,
    lockRotation: true,
    lockScalingFlip: true,
    selectable: false,

    initialize(element: any, options: any) {
      console.log(options);
      const videoElement = document.createElement("video");
      if (options) {
        videoElement.id =
          options.videoElementId || Math.random().toString(36).substr(2, 9); // random id for the video element
        videoElement.src = element;
        videoElement.poster = options.poster;
        videoElement.preload = "auto";
        videoElement.loop = false;
        videoElement.muted = true;
        videoElement.width = clippingWidth;
        videoElement.height = clippingHeight;
        videoElement.crossOrigin = "anonymous";

        this.videoContainer = options.videoContainerId
          ? document.getElementById(options.videoContainerId)
          : document.body;
        this.videoContainer.appendChild(videoElement);
      }
      this._onObjectAdded = this._onObjectAdded.bind(this);
      this._onObjectRemoved = this._onObjectRemoved.bind(this);
      this._onVideoEnded = this._onVideoEnded.bind(this);
      this._onVideoSeeked = this._onVideoSeeked.bind(this);
      videoElement.addEventListener("ended", this._onVideoEnded, true);
      videoElement.addEventListener("seeked", this._onVideoSeeked, true);
      this.on("added", this._onObjectAdded);
      this.on("removed", this._onObjectRemoved);

      this.startTime = 0;
      this.offset = 0;
      this.renderAfterSeek = true;
      this.callSuper("initialize", videoElement, options);
      if (this.offset) {
        this.setCurrentTime(this.offset);
      }
    },

    setStartTime(startTime: any) {
      this.startTime = startTime;
    },

    setDuration(duration: any) {
      this.duration = duration;
    },

    setOffset(offset: any) {
      this.offset = offset;
    },

    setCurrentTime(timeInMilliseconds = 0) {
      const currentTime = isNaN(timeInMilliseconds) ? 0 : timeInMilliseconds;
      this.getElement().currentTime = currentTime;
      this.dirty = true;
    },

    getCurrentTime() {
      return Math.round(this.getElement().currentTime * 1000);
    },

    renderVideo() {
      const self = this;
      fabric.util.requestAnimFrame(function render() {
        canvas.renderAll();
        if (self.isVideoPlaying) {
          if (self.getCurrentTime() > self.duration) {
            self.isVideoPlaying = false;
            return;
          }
          // if isVideoPlaying is true, loops the requestAnimFrame
          fabric.util.requestAnimFrame(render);
        }
      });
    },

    renderFirstFrame() {
      const self = this;
      const now = Date.now();
      const renderInterval = setInterval(() => {
        self.renderVideo();
        if (Date.now() >= now + 1000) {
          clearInterval(renderInterval);
        }
      }, 200);
    },

    playVideo(offset: any) {
      const video = this.getElement();
      video.currentTime = (offset || 0) / 1000;
      video.play();
      this.set({
        isVideoPlaying: true,
      });
      this.renderVideo();
    },

    pauseVideo() {
      this.getElement().pause();
      this.set({
        isVideoPlaying: false,
      });
    },

    is4kVideo() {
      return this.is4k || (this.maxWidth && this.maxWidth > 1920);
    },

    toObject(propertiesToInclude: any) {
      return fabric.util.object.extend(
        this.callSuper("toObject", propertiesToInclude),
        {
          poster: this.poster,
          isTransparent: this.isTransparent,
          assetId: this.assetId,
          id: this.id,
          videoContainerId: this.videoContainerId,
          is4k: this.is4k,
          totalLength: this.totalLength,
          duration: this.duration,
          startTime: this.startTime,
          offset: this.offset,
        }
      );
    },

    _onObjectAdded() {
      canvas.on("canvas:cleared", this._onObjectRemoved);
      this.off("added", this._onObjectAdded);
    },

    _onObjectRemoved() {
      const video = this.getElement();
      this.off("removed", this._onObjectRemoved);
      canvas.off("canvas:cleared", this._onObjectRemoved);
      video.removeEventListener("ended", this._onVideoEnded);
      video.removeEventListener("seeked", this._onVideoSeeked);
      this.videoContainer.removeChild(video);
      this.videoContainer = null;
    },

    _onVideoSeeked() {
      this.trigger("video:seeked", { target: this });
      canvas.trigger("video:seeked", { target: this });
      if (this.renderAfterSeek && this.canvas) {
        canvas.requestRenderAll();
      }
    },

    _onVideoEnded() {
      this.trigger("video:ended", { target: this });
      canvas.trigger("video:ended", { target: this });
    },
  });

  fabric.Video.fromObject = function (object: any, callback: any) {
    console.log(object);
    const isUserAssets: any = isUserAsset(object);
    loadVideo({
      assetId: object.assetId,
      source: object.source,
      extension: object.isTransparent || isUserAssets ? "webm" : "mp4",
      is4kPreview: object.maxWidth === 4096 && object.maxHeight === 2160,
      isUserAsset,
    }).then((blob: any) => {
      console.log(blob);
      callback(new fabric.Video(URL.createObjectURL(blob), object));
    });
  };

  fabric.Object.prototype.lockObject = function () {
    this.set({
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
  };
  fabric.Object.prototype.show = function () {
    this.set({ visible: true });
  };
  fabric.Object.prototype.hide = function () {
    this.set({ visible: false });
  };
  return {};
}
