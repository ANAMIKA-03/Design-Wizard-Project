export const updateJson = (json: any, canvas: any) => {
  const updatedJson = {
    version: json.version ? json.version : "4.6.0",
    ownerId: "f8ddb240-0fa2-11ec-af28-5f27ac5df26c", // change it
    compositionId: null,
    categoryId: 256, // change it
    templateId: null,
    status: null,
    createdAt: null,
    modifiedAt: null,
    statusId: 1, // change it
    price: 0, // change it
    designType: "static",
    composer_object: [
      {
        artboardId: 1, // change it
        width: 1200, // change it
        height: 900, // change it
        scale: null,
        extension: "jpg", // change it
        title: "Untitled",
        keywords: "",
        modelReleaseIds: [],
        propertyReleaseIDs: [],
        type: "default",
        background: null, // change it
        thumb: canvas.toDataURL(), // change it
        layers: json.objects ? json.objects : [],
      },
    ],
    groupId: null, // change it
    customSize: null, // change it
    thumb: canvas.toDataURL(), // change it
  };

  return updatedJson;
};

export const dummyJson = {
  version: "4.6.0",
  objects: [
    {
      type: "circle",
      version: "4.6.0",
      originX: "left",
      originY: "top",
      left: 100,
      top: 100,
      width: 40,
      height: 40,
      fill: "rgba(255, 255, 255, 0.0)",
      stroke: "#000000",
      strokeWidth: 1,
      strokeDashArray: null,
      strokeLineCap: "butt",
      strokeDashOffset: 0,
      strokeLineJoin: "miter",
      strokeUniform: false,
      strokeMiterLimit: 4,
      scaleX: 1,
      scaleY: 1,
      angle: 0,
      flipX: false,
      flipY: false,
      opacity: 1,
      shadow: null,
      visible: true,
      backgroundColor: "",
      fillRule: "nonzero",
      paintFirst: "fill",
      globalCompositeOperation: "source-over",
      skewX: 0,
      skewY: 0,
      radius: 20,
      startAngle: 0,
      endAngle: 6.283185307179586,
    },
  ],
};
