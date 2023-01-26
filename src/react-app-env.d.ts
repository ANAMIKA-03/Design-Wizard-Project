/// <reference types="react-scripts" />

declare module "@wbm-npm/dw-canvas";

declare module "react-color";

declare module "@wbm-npm/animated-canvas";

declare module "react-google-recaptcha";

declare module "react-facebook-login";

declare module "react-multi-carousel";

declare module "react-datepicker";

declare module "rgb-hex";

declare module "react-resizable";

declare module "react-drag-resize";

declare global {
  interface Window {
    FB: any;
  }
}

let FB = window.FB;
