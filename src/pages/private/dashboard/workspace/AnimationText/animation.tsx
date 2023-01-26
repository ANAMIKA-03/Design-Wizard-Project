import fabric from "@wbm-npm/animated-canvas";
import _ from "lodash";
import axios from "axios";
import { ClippingMask } from "../styledComponent";

const ANIMTION_BUCKET_URL = `${process.env.REACT_APP_S3_REDIRECT}/composer.production/animations/`;

const DEFAULT_LOGO_URL = `${ANIMTION_BUCKET_URL}preset-add-img-grahic.png`;

let animationObjects: any = {};
export const animation = (canvas: any) => {
  const getPadding = () => {
    return 250;
  };
  const getFontFamiliesFromAnimatedGroup = (animatedGroup: any) => {
    const fontFamilies: any = {};
    console.log(animatedGroup);
    animatedGroup.configuration.forEach((config: any) => {
      if (config.property === "fontFamily" && !fontFamilies[config.value]) {
        fontFamilies[config.value] = true;
      }
    });
    return Object.keys(fontFamilies);
  };

  const logoToUrl = (
    logo: any,
    size = "800x800",
    fallbackUrl = DEFAULT_LOGO_URL
  ) => {
    if (_.isEmpty(logo)) {
      return fallbackUrl;
    }
    const { key, type } = logo;
    if (type === "image/user" && key) {
      return `https://api.dwiz.io/api/users/${key.replace(
        "images",
        "getFile/800x800"
      )}?access_token=${localStorage.getItem("token")}`;
    }
    return fallbackUrl;
  };

  fabric.AnimatedGroup.loadSequence = (animationId: any) => {
    if (animationObjects[animationId]) {
      const deferred = new Promise((resolve: any) => {
        resolve(animationObjects[animationId]);
      });
      return deferred;
    }

    return axios
      .get(`${process.env.REACT_APP_API_REDIRECT}/animations/${animationId}`)
      .then((result: any) => {
        if (result.status === 200) {
          const animationObjectClone = _.cloneDeep(
            result.data.animation_object
          );
          animationObjectClone.title = result.data.title;
          animationObjectClone.animationId = result.data.animationId;

          /**
           * Load font families from object properties. Fonts from configuration
           * will be loaded on addPredefinedSequence and
           * fontsService.loadFontsFromLayers.
           */
          if (animationObjectClone.objects) {
            const fontFamilies: any = {};
            animationObjectClone.objects.forEach((object: any) => {
              if (object.properties && object.properties.fontFamily) {
                fontFamilies[object.properties.fontFamily] = true;
              }
            });

            if (!_.isEmpty(fontFamilies)) {
              //Object.keys(fontFamilies).forEach(fontsService.loadFont);
            }
          }
          return animationObjectClone;
        }
        return {};
      })
      .catch(() => ({}));
  };
  fabric.AnimatedGroup.logoToUrl = logoToUrl;
  let self: any;
  self = {
    animations: [],
    logoToUrl,
    filterAnimations(isImage: any) {
      return self.getAnimations().then((animations: any) => {
        animations.filter(({ hasImage }: any) => hasImage === isImage);
      });
    },
    //const promise2 = new Promise((resolve:any,reject:any)=>{
    async findAnimationWithImage() {
      return await self
        .getAnimations()
        .then((animations: any) =>
          animations.find(({ hasImage }: any) => hasImage === true)
        );
    },

    getAnimatedGroups() {
      return canvas.getAnimatedGroups();
    },

    async addItemToCanvas(item: any) {
      if (typeof item === "string") {
        return self.addPredefinedSequence(item);
      }

      return await self.findAnimationWithImage().then((imageAnimation: any) => {
        if (!imageAnimation) {
          //return reject();
          return;
        }
        return self
          .addPredefinedSequence(imageAnimation.animationId)
          .then((group: any) => {
            group.setLogo(item);
            return group;
          });
      });
    },

    addPredefinedSequence(animationId: any) {
      //const promises: any = [];
      let fontFamilies: any;
      const category = { width: canvas.getWidth(), height: canvas.getHeight() };
      let animation: any;
      const promise1 = new Promise((resolve: any, reject: any) => {
        self.getAnimations();
        // .then(() => {
        animation = self.getAnimationById(animationId);
        // .then(() => {
        // })
        console.log(animation);
        fontFamilies = getFontFamiliesFromAnimatedGroup(animation);
        fontFamilies.forEach((fontFamily: any) => {
          //promises.push(fontsService.loadFont(fontFamily));
        });
        console.log(animation);
        resolve(animation);
        // });
      });
      const res = promise1.then((res: any) => {
        console.log(res);
        const group = new fabric.AnimatedGroup(animation, category);
        const startTime = canvas.getNextSequenceStartTime();

        group.setStartTime(startTime);
        // Set the min duration to 3 seconds
        group.setDuration(3000);
        group.cornerStyle = "circle";
        group.transparentCorners = false;
        group.cornerColor = "black";
        group.borderColor = "grey";
        group.left += getPadding();
        group.top += getPadding();
        // group.scaleX = 1920/487;
        // group.scaleY = 1080/274;
        group.set("selection", true);
        console.log(group);
        canvas.add(group);
        canvas.renderAll();
        return group;
      });
      return res;
    },

    fillUnknownMissingValues(sequences: any, videos: any) {
      const { animation } = canvas;
      animation.init(sequences, videos);
      animation.updateCanvasObjectsToInitialValues();
      animation.fillUnknownMissingValues();
    },

    startAnimation(timeInMilliseconds: any) {
      canvas.startAnimation(timeInMilliseconds);
    },

    stopAnimation(triggerPausedEvent = true) {
      canvas.stopAnimation(triggerPausedEvent);
    },

    getAnimationById(animationId: any) {
      return animationObjects[animationId];
    },

    getAnimations() {
      if (self.animations.length) {
        //return resolve(self.animations);
        return self.animations;
      }

      const filter = {
        where: {
          active: 1,
        },
        order: "displayOrder ASC",
      };

      return axios
        .get(
          `${
            process.env.REACT_APP_API_REDIRECT
          }/animations?filter=${JSON.stringify(filter)}`
        )
        .then((result: any) => {
          console.log(result);
          if (result.status === 200) {
            const animations: any = [];
            animationObjects = {};
            result.data.forEach((animation: any) => {
              // Create a group to extract the posterFrame
              // This is calculated as when the in-effects end.
              const group = new fabric.AnimatedGroup(
                animation.animation_object
              );

              animations.push({
                title: animation.title,
                animationId: animation.animationId,
                preview: `${ANIMTION_BUCKET_URL + animation.animationId}.webm`,
                thumb: `${ANIMTION_BUCKET_URL + animation.animationId}.png`,
                posterFrame: group.posterFrame,
                hasImage: group.getLogo() !== undefined,
              });

              const object = _.cloneDeep(animation.animation_object);
              object.title = animation.title;
              object.animationId = animation.animationId;
              animationObjects[animation.animationId] = object;
            });
            console.log(animations);
            console.log(animationObjects);
            self.animations = animations;
            return animations;
          }
          self.animations = [];
          return [];
        })
        .catch((err: any) => console.log("error", err));
    },
  };
  return self;
};
