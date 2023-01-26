import axios from "axios";

const getSvg = async (src: any) => {
  const data = await axios.get(src);
  return data.data;
};
export const addTemplate = async (
  item: any,
  canvas: any,
  clippingWidth: any,
  clippingHeight: any,
  addSvg: any
) => {
  console.log(JSON.parse(JSON.parse(item.composer_object)));
  //console.log(clippingWidth/1200)
  // console.log(clippingHeight/900)
  //let currentZoomLevel = clippingHeight / 900;
  //console.log(JSON.parse(JSON.parse(item.composer_object))[0].layers);
  let composition = JSON.parse(JSON.parse(item.composer_object));
  //   //set background
  const bgColor = composition[0].background;
  let layers = JSON.parse(JSON.parse(item.composer_object))[0].layers;
  // console.log(layers)
  // console.log(bgColor)
  // console.log(composition)
  const finalLayers = [];
  for (let i of layers) {
    console.log(i);

    if (i.type === "image") {
      let src =
        "https://api.dwiz.io/api/assets/getFileV2?access_token=" +
        localStorage.getItem("token") +
        "&" +
        i.src.split("&")[1];

      let obj = {
        ...i,
        src,
        crossOrigin: "Anonymous",
        // scaleX: i.scaleX * currentZoomLevel,
        // scaleY: i.scaleY * currentZoomLevel,
        left: i.left + 250,
        top: i.top + 250,
        // originX:"center",
        //originY:"center",
      };
      finalLayers.push(obj);
      console.log(finalLayers);
    } else if (i.type === "svg") {
      let src =
        "https://api.dwiz.io/api/assets/getFileV2?access_token=" +
        localStorage.getItem("token") +
        "&" +
        i.sourcePath.split("&")[1];
      const data = await getSvg(src);
      console.log(data);
      addSvg(data);
      // let obj = { ...i, src, type: "image", crossOrigin: "Anonymous" };

      // finalLayers.push(obj);
      // console.log(finalLayers);
    } else if (i.type === "group") {
      let groupArray = [];
      for (let k of i.objects) {
        if (k.type === "img") {
          let src =
            "https://api.dwiz.io/api/assets/getFileV2?access_token=" +
            localStorage.getItem("token") +
            "&" +
            k.src.split("&")[1];
          let obj = { ...k, src, crossOrigin: "Anonymous" };
          groupArray.push(obj);
          console.log(groupArray);
        } else if (k.type === "svg") {
          let src =
            "https://api.dwiz.io/api/assets/getFileV2?access_token=" +
            localStorage.getItem("token") +
            "&" +
            k.sourcePath.split("&")[1];
          let obj = { ...k, src, type: "image", crossOrigin: "Anonymous" };
          groupArray.push(obj);
        } else {
          groupArray.push(k);
        }
      }
      let newObj = {
        ...i,
        left: i.left + 250,
        top: i.top + 250,
        objects: groupArray,
      };
      finalLayers.push(newObj);
    } else {
      console.log(clippingWidth, clippingHeight);

      // let obj = { ...i, width:i.width*currentZoomLevel,height:i.height*currentZoomLevel,
      //   fontSize:i.fontSize*currentZoomLevel,fontWeight:i.fontWeight*currentZoomLevel,
      // };
      let obj = {
        ...i,
        left: i.left + 250,
        top: i.top + 250,
      };
      console.log("real", obj);
      // finalLayers.push(obj);
      finalLayers.push(obj);
    }
  }
  let obj = {
    version: "4.6.0",
    objects: finalLayers,
  };
  console.log(finalLayers);
  canvas.loadFromJSON(obj, () => {
    canvas.setBackgroundColor(bgColor);
    canvas.renderAll();
  });
};
