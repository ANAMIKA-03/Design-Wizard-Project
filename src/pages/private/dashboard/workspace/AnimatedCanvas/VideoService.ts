import _, { reject } from "lodash";
import axios from "axios";
import fabric from "@wbm-npm/animated-canvas";
import { Videos } from "./Videos";
const customId = 1;
const hdVideo = 10;
const uhdVideo = 11;
const fourKVideo = 12;
const story = 13;
const videoParent = 113;
const storyParent = 114;
const padding = 250;
const videoIds: any = {
  hd: hdVideo,
  uhd: uhdVideo,
  "4k": fourKVideo,
  story,
};
const MAX_LAYERS = 60;
const MAX_IMAGE_LAYERS = 10;
const HdAnimation = 20;
const FourKAnimation = 21;

const getPadding = () => {
  return padding;
};

const isGroup = (object: any) => {
  return object.type === "group" && !object.assetId;
};

const getCurrentCategory = () => {
  return {
    displayHeight: "1080 px",
    displayWidth: "1920 px",
    dpi: 72,
    featuredTemplate: "cdfbfb60-89b1-11e8-82ec-dd629db35bef",
    height: 1080,
    id: 10,
    name: "Video",
    order: 14,
    parents: [{ id: 113 }],
    visible: true,
    webQualityDownload: true,
    width: 1920,
  };
};

const getStoryId = () => {
  return story;
};
const isWbmUser = () => {
  let dataFromStorage: any = localStorage.getItem("user");
  const userData = JSON.parse(dataFromStorage);
  for (let i of userData.roles) {
    if (i.realm === "wbm") {
      return true;
    }
  }
  return false;
};

const isUserAsset = (imageData: any) => {
  if (!imageData.key) {
    return false;
  }
  const keyParts = imageData.key.split("/");
  return keyParts.length === 3;
};

/**
 * Function that extracts the assetId from the key param of the assetData.
 * @param assetData Image data to check.
 * @returns {String} AssetId
 */
const getAssetIdFromElement = (assetData: any) => {
  if (assetData.assetId) {
    return assetData.assetId.split(".")[0];
  }

  if (assetData.wbmId) {
    return assetData.wbmId;
  }

  if (!assetData.key) {
    return;
  }
  const keyParts = assetData.key.split("/");
  let filename;
  if (keyParts.length === 2 && keyParts[0] === "assets") {
    filename = keyParts[1];
  } else if (keyParts.length === 3) {
    filename = keyParts[2];
  }

  if (!filename) {
    return;
  }

  /**
   * Remove extension. _a is the suffix for user uploaded videos.
   */
  return filename.replace(/.png|.jpg|.svg|_a.mov$/g, "");
};

/**
 * Track that user loaded an asset into the canvas.
 * @param data type: image/asset, image/user or template, id: id of the asset.
 */
//    const assetLoad = (data:any) => {
//     if (isWbmUser()) {
//       return;
//     }
//     gtmEvent(
//       {
//         event: 'assetLoadDwEv',
//         category: 'assetLoad',
//         action: 'click',
//         label: data.type,
//         value: 0,
//       },
//       data
//     );
//   }

const extractId = function (idOrObject: any) {
  if (
    idOrObject &&
    typeof idOrObject === "object" &&
    idOrObject.id !== undefined
  ) {
    return idOrObject.id;
  }
  return idOrObject;
};

const isCategory = function (idOrObject: any, testIds: any) {
  const categoryId = extractId(idOrObject);

  for (const cat in testIds) {
    if (videoIds[cat] === categoryId) {
      return true;
    }
  }
  return false;
};

const isVideoCategory = (category: any) => {
  return isCategory(category, videoIds);
};

/**
 * Returns true if category is story.
 * @param category
 * @return {boolean}
 */
const isStory = (category: any) => {
  return story === extractId(category);
};

const isAnimation = (category: any) => {
  return [HdAnimation, FourKAnimation].includes(category);
};

/**
 * Returns true if category is video or story, false otherwise.
 * @param category
 * @return {boolean}
 */
const isVideoBasedCategory = (category: any) => {
  return (
    isVideoCategory(category) || isStory(category) || isAnimation(category)
  );
};

const loadVideo = async (queryData: any) => {
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

const createVideo = async (
  data: any,
  clippingHeight: any,
  clippingWidth: any
) => {
  console.log("dataaa", data);
  return await addVideo(data, clippingHeight, clippingWidth);
};
const addVideo = async (data: any, clippingHeight: any, clippingWidth: any) => {
  const deferred = new Promise(async (resolve: any, reject: any) => {
    data = data.layer || data;

    if (!data || _.isEmpty(data)) {
      return reject("wrong-format");
    }

    const isUserAssets: any = isUserAsset(data);
    const assetId = getAssetIdFromElement(data);

    let fileType;
    if (data.fileType) {
      fileType = data.fileType;
    } else if (isUserAssets) {
      fileType = "webm";
    } else {
      fileType = data.ftype;
    }
    const opacity = data.opacity >= 0 && data.opacity <= 1 ? data.opacity : 1;
    const category = getCurrentCategory();
    if (isVideoBasedCategory(category)) {
      let keywords = [];
      let modelReleaseIds = [];
      let propertyReleaseIDs = [];
      if (data.keywords) {
        keywords =
          typeof data.keywords === "object"
            ? data.keywords
            : data.keywords.replace(/, /g, ",").split(",");
      }
      if (data.modelReleaseIds && data.modelReleaseIds !== "N/A") {
        modelReleaseIds =
          typeof data.modelReleaseIds === "object"
            ? data.modelReleaseIds
            : data.modelReleaseIds.replace(/ /g, "").split(",");
      }
      if (data.propertyReleaseIDs && data.propertyReleaseIDs !== "N/A") {
        propertyReleaseIDs =
          typeof data.propertyReleaseIDs === "object"
            ? data.propertyReleaseIDs
            : data.propertyReleaseIDs.replace(/ /g, "").split(",");
      }

      const fabricData = {
        assetId,
        source: isUserAssets ? "dw" : "wbm",
        keywords,
        modelReleaseIds,
        propertyReleaseIDs,
        description: data.description || "No description",
        thumb: data.thumb,
        price: data.price,
        promotion: data.promotion,
        fileType,
        isTransparent: !!data.isTransparent,
        lockUniScaling: true,
        lockRotation: true,
        lockScalingFlip: true,
        opacity,
        objectCaching: false,
        totalLength: data.duration,
        duration: data.duration,
        offset: 0,
        key: data.key,
        videoContainerId: "",
        poster: "",
        is4k: false,
        width: "",
        height: "",
        maxHeight: "",
        maxWidth: "",
        top: 0,
        left: 0,
        scaleX: 1,
        scaleY: 1,
        src: "",
      };

      let maxWidth: any;
      let maxHeight: any;
      let is4kPreview = false;
      let videoWidth: any;
      let videoHeight: any;
      if (isUserAssets) {
        maxWidth = data.width;
        maxHeight = data.height;
        videoHeight = 360;
        videoWidth = Math.round((videoHeight * data.width) / data.height);
      } else {
        maxWidth = category.width === 4096 && data.is4k ? 4096 : 1920;
        maxHeight = category.height === 2160 && data.is4k ? 2160 : 1080;
        is4kPreview = maxWidth === 4096 && maxHeight === 2160;
        videoWidth = is4kPreview ? 682 : 640;
        videoHeight = 360;
      }

      await loadVideo({
        assetId,
        source: fabricData.source,
        extension: data.isTransparent || isUserAsset ? "mp4" : "mp4",
        is4kPreview,
        isUserAsset,
      })
        .then((blob: any) => {
          console.log(blob);
          fabricData.videoContainerId = "canvas-videos";
          fabricData.poster = data.thumb;
          fabricData.is4k = data.is4k;
          fabricData.width = clippingWidth;
          fabricData.height = clippingHeight;
          fabricData.maxWidth = maxWidth;
          fabricData.maxHeight = maxHeight;
          fabricData.isTransparent = data.isTransparent;
          fabricData.assetId = assetId;
          fabricData.src = `${
            process.env.REACT_APP_API_REDIRECT
          }/assets/getFileV2?access_token=${localStorage.getItem(
            "token"
          )}&fileData=${JSON.stringify({
            assetId,
            source: fabricData.source,
            extension: data.isTransparent || isUserAsset ? "mp4" : "mp4",
            is4kPreview,
            isUserAsset,
          })}`;

          if (data.hasOwnProperty("top")) {
            console.log("--", data);
            fabricData.top = 250 + data.top;
            fabricData.left = 250 + data.left;
            fabricData.scaleX = data.scaleX;
            fabricData.scaleY = data.scaleY;
          } else {
            fabricData.top = 250 + category.height / 2 - maxHeight / 2;
            fabricData.left = 250 + category.width / 2 - maxWidth / 2;
            //console.log(maxWidth/videoWidth)
            fabricData.scaleX = category.width / clippingWidth;
            fabricData.scaleY = category.height / clippingHeight;
          }

          resolve(new fabric.Video(URL.createObjectURL(blob), fabricData));
        })
        .catch((err: any) => {
          reject(err);
        });
    } else {
      reject("wrong-video-category");
    }
  });
  return deferred;
};
/**
 * Count the remaining layers for the current artboard
 * @param isImage check remaining image layers
 * @return {integer} the remaining layers
 */
const getRemainingLayers = (isImage: any, canvas: any) => {
  const objectsLength = countCurrentLayers(canvas);

  let remainingLayers = MAX_LAYERS - objectsLength;

  if (isImage) {
    remainingLayers = Math.min(
      remainingLayers,
      MAX_IMAGE_LAYERS - countImageLayers(canvas)
    );
  }
  return Math.max(0, remainingLayers);
};

/**
 * Counts the number of layers on the current artboard.
 * @return {integer} The number of layers
 */
function countCurrentLayers(canvas: any) {
  let objectsLength = 0;
  canvas.forEachObject((object: any) => {
    // Exclude lines from the grid
    if (!object.skipObject) {
      if (isGroup(object) && object.layers) {
        objectsLength += object.layers.length;
      } else {
        objectsLength++;
      }
    }
  });
  return objectsLength;
}

/**
 * Return the number of image/videos in canvas.
 * @return {number}
 */
function countImageLayers(canvas: any) {
  const mediaAssets = [];
  const objects = canvas.getObjects();
  objects.forEach((object: any) => {
    if (fabric.Object.prototype.isMediaAsset.apply(object)) {
      mediaAssets.push(object);
    } else if (fabric.Object.prototype.isGroup.apply(object)) {
      const groupObjects = object.getObjects();
      groupObjects.forEach((groupObject: any) => {
        if (fabric.Object.prototype.isMediaAsset.apply(object)) {
          mediaAssets.push(groupObject);
        }
      });
    }
  });
  return mediaAssets.length;
}

function getVideoObjects(canvas: any) {
  return canvas.getObjects("video");
}
//---------------Video Service Function Starts ------------------------
export const VideoService = (
  canvas: any,
  clippingHeight: any,
  clippingWidth: any
) => {
  Videos(canvas, clippingHeight, clippingWidth);
  console.log(canvas);
  const extensions = ["mp4", "mov", "webm"];
  const videoCodecs = [
    {
      name: "Lib x264",
      code: "libx264",
    },
    {
      name: "M-JPEG",
      code: "mjpeg",
    },
    {
      name: "Prores",
      code: "prores_ks",
    },
  ];

  //let fabricCanvas:any;
  let isVideoPlaying = false;
  const STORY_MAX_SECONDS = 40;

  const stopAllVideos = function () {
    if (self.isVideoPlaying() && canvas.isInDesignMode()) {
      self.playVideosElement(false);
      //$rootScope.$apply();
    }
  };

  var self = {
    setCanvas(c: any) {
      canvas = c;
      canvas.on("video:ended", stopAllVideos);
    },

    getDefaultCodec() {
      return "libx264";
    },

    getDefaultVideoMode() {
      return "simple";
    },

    getCodecs() {
      return videoCodecs;
    },

    getExtensions() {
      return extensions;
    },

    getTransparentVideoSupport() {
      // transparent videos on canvas with webm extension only works on firefox and chrome for now
      return ["chrome", "firefox"];
    },

    isVideoExtension(extension: any) {
      return extensions.indexOf(extension) !== -1;
    },

    isVideoLayer(layer: any) {
      return self.isVideoExtension(layer.fileType);
    },

    /**
     * Returns the number of current video elements
     * @returns {number}
     */
    numberOfVideosElement() {
      return (canvas && getVideoObjects(canvas).length) || 0;
    },

    /**
     * @param {object} newVideo canvas video object
     */
    setNewVideoStartTime(newVideo: any) {
      // The new video has not yet been added to the canvas it will not be in this list
      const videos = _.sortBy(getVideoObjects(canvas), "startTime");
      let startTime = 0;
      for (const video of videos) {
        if (startTime + newVideo.duration <= video.startTime) {
          break;
        }
        startTime = video.startTime + video.duration;
      }
      newVideo.setStartTime(startTime);
    },

    /**
     * returns true if the video preview is playing
     * @returns {boolean}
     */
    isVideoPlaying() {
      return isVideoPlaying;
    },

    async checkVideoResolution(assetId: any) {
      const queryRequest = {
        query: `id:${assetId}`,
        page: 0,
        library: "wbmvideo",
      };
      return await axios
        .post(
          `${process.env.REACT_APP_API_REDIRECT}assets/search`,
          queryRequest
        )
        .then((response: any) => {
          if (
            _.has(response, "data.hits.hits") &&
            response.data.hits.hits.length > 0
          ) {
            return response.data.hits.hits[0]._source.is4k ? "4k" : "hd";
          }
          return undefined;
        })
        .catch(() => undefined);
    },

    /**
     * play or pause the child video elements
     * @param play True to play videos, false to stop.
     */
    playVideosElement(play: any) {
      const videos = getVideoObjects(canvas);
      isVideoPlaying = play;

      let minDuration = play
        ? videos.reduce((min: any, video: any) => {
            return Math.min(min, video.totalLength);
          }, Number.MAX_SAFE_INTEGER)
        : null;

      videos.forEach((video: any) => {
        if (play) {
          video.setDuration(minDuration);
          video.playVideo();
        } else {
          video.pauseVideo();
        }
      });
    },

    /**
     * Updates the Video asset in the Elastic Search.
     * @param ids {array} VideoId(s) to update.
     * @param body {object} .
     */
    async updateVideos(ids: any, body: any) {
      return await axios
        .put(`${process.env.REACT_APP_API_REDIRECT}users/updateEsVideos`, {
          index: process.env.REACT_APP_API_REDIRECT,
          type: "asset",
          ids,
          body,
        })
        .then((response: any) => response.data);
    },

    /**
     * Create video object and add it to canvas.
     * @param data [Elastic search _source object | User upload record]
     * @return {Promise}
     */
    addVideoToCanvas(data: any) {
      const videoLayerLimit = isWbmUser() ? 3 : 1;
      const inStoryMode = true;
      if (!inStoryMode && self.numberOfVideosElement() >= videoLayerLimit) {
        console.log("Maximum number of video layers reached.");
        // return $q.reject('max_video_layers');
      }

      if (getRemainingLayers(false, canvas) === 0) {
        console.log("Maximum number of layers reached.");
        //return $q.reject('max_layers');
      }

      if (inStoryMode) {
        const videoObjects = getVideoObjects(canvas);
        let currentDuration = 0;
        videoObjects.forEach((video: any) => {
          currentDuration += video.duration;
        });

        if (currentDuration + data.duration > STORY_MAX_SECONDS * 1000) {
          console.log("Sorry! The maximum length for stories is 40 seconds.");
          //return $q.reject('max_story_length');
        }
      }

      return createVideo(data, clippingHeight, clippingWidth).then(
        (object: any) => {
          //   assetLoad({
          //     type: 'video',
          //     labelId: getAssetIdFromElement(data),
          //   });

          if (inStoryMode) {
            self.setNewVideoStartTime(object);
          }
          console.log("objectAdded ", object);
          canvas.add(object);
          object.renderFirstFrame();
          object.setCoords();
          canvas.renderAll();
          console.log("Video is ready for preview.");
        }
      );
      // .catch((err:any) => {
      //   if (err === 'wrong-video-category') {
      //     // return $state.go(
      //     //   'dashboard.workspace.change-category',
      //     //   {
      //     //     categoryId: getStoryId(), // TODO
      //     //     video: data,
      //     //   },
      //     //   {
      //     //     location: false,
      //     //   }
      //     // );
      //     console.log(err)
      //   } else if (err) {
      //     // concat error + '' to see error on notification
      //     console.log(`${err}`);
      //   } else {
      //     console.log(
      //       'There was an error loading the asset, please try again later.'
      //     );
      //   }
      // });
    },

    /**
     * Set codec and extension on each artboard of the composition.
     * @param composition Object
     * @param codec String
     * @param extension String
     */
    setVideoCodec(composition: any, codec: any, extension: any) {
      if (!isVideoBasedCategory(composition.categoryId)) {
        return;
      }

      composition.composer_object.forEach((artboard: any) => {
        artboard.extension = extension;
        artboard.videoCodec = codec;
        artboard.videoMode = self.getDefaultVideoMode();
        artboard.layers.forEach((layer: any) => {
          if (self.isVideoExtension(layer.fileType)) {
            layer.fileType = extension;
          }
        });
      });
    },

    getStoryMaxSeconds() {
      return STORY_MAX_SECONDS;
    },
  };
  return self;
};
