/* const getDisplayPadding = (editor: any) => {
  const padding = editor.canvas.getPadding();
  return {
    paddingHeight: padding,
    paddingWidth: padding,
  };
}; */

export const defaultcanvasSettings = (editor: any) => {
  //editor.canvas.getDisplayPadding = getDisplayPadding(editor);
  editor.canvas.selectionColor = "rgba(9, 168, 129, 0.3)";
  editor.canvas.selectionBorderColor = "rgb(9, 168, 129)";
  editor.canvas.selectionLineWidth = 1;
  editor.canvas.controlsAboveOverlay = true;

  editor.canvas.enableRetinaScaling = false;
  // Prevent selected layer from being rendered on top
  editor.canvas.preserveObjectStacking = true;
  editor.Group.lockUniScaling = true;

  // Default properties for fabric Objects
  editor.Object.transparentCorners = false;
  editor.Object.cornerSize = 15;
  editor.Object.cornerStyle = "circle";
  editor.Object.cornerColor = "rgb(35, 36, 40)";
  editor.Object.cornerStrokeColor = "rgb(255, 255, 255)";
  editor.Object.borderColor = "rgb(35, 36, 40)";

  // Click only pixels that are not transparent (except for text objects)
  editor.Object.perPixelTargetFind = true;
  editor.IText.perPixelTargetFind = false;
  editor.Group.perPixelTargetFind = false;
  editor.Textbox.perPixelTargetFind = false;

  editor.Object.strokeUniform = true;

  editor.Line.noScaleCache = false;
  editor.Rect.noScaleCache = false;
  editor.Ellipse.noScaleCache = false;
  editor.Triangle.noScaleCache = false;
  editor.Textbox.noScaleCache = false;
  editor.IText.noScaleCache = false;
  editor.Line.objectCaching = false;
  editor.Rect.objectCaching = false;
  editor.Ellipse.objectCaching = false;
  editor.Triangle.objectCaching = false;
  editor.Textbox.objectCaching = false;
  editor.Group.objectCaching = false;
  editor.IText.objectCaching = false;
};
