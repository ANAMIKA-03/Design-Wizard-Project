export const addDefaultSettings = (editor: any, fabric: any) => {
  editor.canvas.selectionColor = "rgba(9, 168, 129, 0.3)";
  editor.canvas.selectionBorderColor = "rgb(9, 168, 129)";
  editor.canvas.selectionLineWidth = 1;
  editor.canvas.controlsAboveOverlay = true;

  editor.canvas.enableRetinaScaling = false;
  editor.canvas.preserveObjectStacking = true;
  fabric.Group.prototype.lockUniScaling = true;

  // Default properties for fabric Objects
  fabric.Object.prototype.transparentCorners = false;
  fabric.Object.prototype.cornerSize = 15;
  fabric.Object.prototype.cornerStyle = "circle";
  fabric.Object.prototype.cornerColor = "rgb(35, 36, 40)";
  fabric.Object.prototype.cornerStrokeColor = "rgb(255, 255, 255)";
  fabric.Object.prototype.borderColor = "rgb(35, 36, 40)";

  // Click only pixels that are not transparent (except for text objects)
  fabric.Object.prototype.perPixelTargetFind = true;
  fabric.IText.prototype.perPixelTargetFind = false;
  fabric.Group.prototype.perPixelTargetFind = false;
  fabric.Textbox.prototype.perPixelTargetFind = false;

  fabric.Object.prototype.strokeUniform = true;

  fabric.Line.prototype.noScaleCache = false;
  fabric.Rect.prototype.noScaleCache = false;
  fabric.Ellipse.prototype.noScaleCache = false;
  fabric.Triangle.prototype.noScaleCache = false;
  fabric.Textbox.prototype.noScaleCache = false;
  fabric.IText.prototype.noScaleCache = false;
  fabric.Line.prototype.objectCaching = false;
  fabric.Rect.prototype.objectCaching = false;
  fabric.Ellipse.prototype.objectCaching = false;
  fabric.Triangle.prototype.objectCaching = false;
  fabric.Textbox.prototype.objectCaching = false;
  fabric.Group.prototype.objectCaching = false;
  fabric.IText.prototype.objectCaching = false;
};
