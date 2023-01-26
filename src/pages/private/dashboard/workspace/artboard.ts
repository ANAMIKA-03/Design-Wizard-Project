export const loadCanvasOnArtBoard = (
  artId: any,
  setActivateArtBoard: any,
  updatedJson: any,
  canvas: any
) => {
  setActivateArtBoard(artId);
  var json = updatedJson.composer_object[artId - 1];
  console.log(json);
  var a = {
    version: updatedJson.version,
    objects: json && (json.layers ? json.layers : {}),
  };
  //console.log(json.layers);
  console.log(a);
  canvas.loadFromJSON(a, function () {
    canvas.renderAll();
  });
};

export const addArtBoard = (
  canvas: any,
  updatedJson: any,
  setupdatedJson: any,
  setActivateArtBoard: any
) => {
  canvas.clear();
  const thumb = canvas.toDataURL({
    format: "jpeg",
    left: 250,
    top: 250,
    quality: 0.75,
  });
  console.log(canvas.getObjects());
  const len = updatedJson.composer_object.length + 1;
  setActivateArtBoard(len);
  var compoObj = {
    artboardId: len, // change it
    width: canvas?.getWidth(), // change it
    height: canvas?.getHeight(), // change it
    scale: null,
    extension: "jpg", // change it
    title: "Untitled",
    keywords: "",
    modelReleaseIds: [],
    propertyReleaseIDs: [],
    type: "default",
    background: canvas?.backgroundColor, // change it
    thumb: thumb, // change it
    layers: [],
  };
  setupdatedJson((prevState: any) => {
    var b = {
      ...prevState,
      composer_object: [...prevState.composer_object, compoObj],
    };
    return b;
  });
};

export const duplicateArtboard = (
  updatedJson: any,
  val: any,
  setupdatedJson: any,
  canvas: any
) => {
  const temp = Object.assign({}, updatedJson);
  const duplicateBoard = Object.assign({}, val);
  duplicateBoard.artboardId = updatedJson.composer_object.length + 1;
  temp.composer_object.push(duplicateBoard);
  setupdatedJson(temp);
  canvas.renderAll();
};

export const deleteArtboard = (
  updatedJson: any,
  index: any,
  setupdatedJson: any,
  canvas: any,
  setActivateArtBoard: any
) => {
  const temp = Object.assign({}, updatedJson);
  temp.composer_object.splice(index, 1);
  temp.composer_object.map((t: any, ind: number) => {
    t.artboardId = ind + 1;
    return t;
  });
  setupdatedJson(temp);
  loadCanvasOnArtBoard(
    temp.composer_object.length,
    setActivateArtBoard,
    temp,
    canvas
  );
};
