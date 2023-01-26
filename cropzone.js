/*! Copyright Wavebreak Media 2019 */

/**
 * How crop works in fabric.
 * =========================
 *
 * 1) About images width and height.
 * Before starting with the explanation we have to talk about image's
 * width and height. When an image is loaded width and height will contain
 * the full size of the image. When the image is rescaled, these two don't
 * change, instead scaleX and scaleY will be the ones that contain how much
 * each dimension has changed. For example:
 * We load an image who is originally 400x400 pixels. In the canvas will be
 * scaled down to 200x200. This image will have the next set of properties:
 * { width: 400, height: 400, scaleX: 0.5, scaleY: 0.5 }
 *
 * 2) Crop zone.
 * Crop zone is the object (fabric Rect) that we will use to select the
 * portion of the image that will be visible after the crop is applied. It
 * is rendered on top of the image, and it can't be moved or scaled outside
 * the limits of the image.
 *
 * 3) Crop.
 * cropX, cropY, width and height are the four properties involved when
 * cropping an image. We have to identify two scenarios:
 *
 * 3.1) Image is not flipped.
 * When the image is not flipped, cropX and cropY are the amount of pixels
 * from left and top edges of the image that will be cropped from the image.
 * If we are going to crop right or bottom part of the image we will have to
 * use width and height to achieve this. For example we have an image that is
 * 5x5 pixels. We want to crop it to get an image that is 3x3 pixels. We want
 * to crop 1 pixel from each edge. The properties would be like this:
 * { width: 3, height: 3, cropX: 1, cropY: 1 }. If we only wanted to crop
 * 1 pixel from top and left edges, the properties would be like this:
 * { width: 4, height: 4, cropX: 1, cropY: 1 }.
 *
 * 3.2) Image is flipped (either vertically, horizontally or both).
 * When the image is flipped, for example horizontally (it applies the same
 * when the image is flipped vertically), the left edge will be now on the
 * right. CropX in this case will be the amount of pixels we crop from the
 * right edge of the image (originally left edge) towards the center. Width
 * in this case will behave as in the previous scenario (3.1).
 *
 * 4) Apply crop to an image.
 * When a user applies some cropping to a portion of the image, we want this
 * to remain in the same position. In order to do this we have to calculate
 * new top and left of the image. Width and height will be equal to cropZone.width
 * and cropZone.height divided by the scale (x and y) of the image. We
 * identify again two scenarios:
 *
 * 4.1) Image is not rotated.
 *
 * New left and new top will be the same as crop zone's left and top value.
 *
 * 4.2) Image is rotated.
 *
 * When the image is rotated, we move it back to a horizontal position and
 * to the center of the canvas so we can keep the crop zone within the limits
 * of the image (otherwise the calculation doesn't work correctly and the rect
 * wouldn't behave correctly). In order to calculate new left and top values,
 * we'll have to use some trigonometry, here is an example:
 * {@link https://wavebreakmedia.atlassian.net/wiki/spaces/COMPOSER/pages/275644417/DesignWizard+crop+rotated+images+explanation}
 * In the graph we want to calculate t and l, which are the amount of pixels
 * that the image has moved (x and y axis) after cropping it with a given
 * angle.
 *
 * 4.2.1) Image is not flipped.
 * When the image is not flipped, we get cropX (cx in the graph) and cropY
 * (cy in the graph) straight away (cropZone.left - image.left). This will
 * be used to calculate t and l.
 *
 * 4.2.2) Image is flipped (either vertically, horizontally or both).
 * When the image is flipped in either dimension, we can't use cropX/cropY
 * values as they would be pixels from the right/bottom edge. Instead we have
 * to calculate how much left and top edges have moved once the crop is applied.
 *
 *        Image
 * +-------------------+ --
 * |                   |  T
 * |    **********     | --
 * |    *   CZ   *     |  CZ height
 * |    **********     | --
 * |                   |  cropY
 * +-------------------+ --
 *   L  |   CZ   |cropX|
 *         width
 *
 * In order to do this we use the following formula:
 *
 * L = imageWidth - cropX - cropZone.width
 * T = imageHeight - cropY - cropZone.height
 *
 * With these, we would have the necessary values to calculate the new top
 * and left position of the cropped image.
 *
 * 5) Note about algorithm.
 *
 * When the image is rotated, everything gets more complicated. We have to
 * save current top and left, as the image is moved to the center of the
 * canvas. We have to take this into account when doing calculations. That's
 * why in some formulas we use lastLeft or lastTop (left and top, before image
 * was moved), so we can put it back where it should be.
 */

composer.factory("cropZone", [
  "canvas",
  function (canvas) {
    /**
     * Enable crop mode, restart crop values so user can see full image.
     */
    fabric.Image.prototype.cropOn = function () {
      this.lastCropX = this.cropX;
      this.lastCropY = this.cropY;
      this.lastWidth = this.width;
      this.lastHeight = this.height;
      this.lastTop = this.top;
      this.lastLeft = this.left;
      this.lastAngle = this.angle;
      this.lastSkewX = this.skewX;
      this.lastSkewY = this.skewY;
      // Let's put the image on top, so no other objects will block the view
      this.lastzIndex = canvas.fabric.getObjects().indexOf(this);
      canvas.fabric.bringToFront(this);
      this.angle = 0;
      this.width = this.initialWidth;
      this.height = this.initialHeight;
      if (this.lastAngle !== 0) {
        // If image is rotated, we will move it the center of the canvas for cropping
        const currentCategory = canvas.getCurrentCategory();
        this.left =
          currentCategory.width / 2 -
          this.getScaledWidth() / 2 +
          canvas.getPadding();
        this.top =
          currentCategory.height / 2 -
          this.getScaledHeight() / 2 +
          canvas.getPadding();
      } else {
        if (this.flipX) {
          this.left -=
            (this.initialWidth - this.lastWidth - this.cropX) * this.scaleX;
        } else {
          this.left -= this.cropX * this.scaleX;
        }
        if (this.flipY) {
          this.top -=
            (this.initialHeight - this.lastHeight - this.cropY) * this.scaleY;
        } else {
          this.top -= this.cropY * this.scaleY;
        }
      }
      this.cropX = 0;
      this.cropY = 0;
      this.skewX = 0;
      this.skewY = 0;
    };

    /**
     * Apply crop properties to an image.
     * @param cropZone Object to select visible part of image.
     */
    fabric.Image.prototype.applyCrop = function (cropZone) {
      // Amount of cropping on x and y
      let cropX;
      let cropY;
      if (this.flipX) {
        cropX =
          this.left +
          this.getScaledWidth() -
          (cropZone.left + cropZone.getScaledWidth());
      } else {
        cropX = cropZone.left - this.left;
      }

      if (this.flipY) {
        // Image bottom edge - crop zone bottom edge
        cropY =
          this.top +
          this.getScaledHeight() -
          (cropZone.top + cropZone.getScaledHeight());
      } else {
        cropY = cropZone.top - this.top;
      }

      /**
       * cropX and cropY are affected by the scale of the image, so in order to
       * get equivalent pixels in the canvas we have to divide them by scaleX
       * and scaleY.
       */
      this.cropX = cropX / this.scaleX;
      this.cropY = cropY / this.scaleY;
      if (!this.lastAngle) {
        // Image is not rotated
        this.left = cropZone.left;
        this.top = cropZone.top;
      } else {
        /**
         * Difference between current crop and previous one (multiply by scale
         * to obtain screen pixels)
         */
        let cropXDelta;
        let cropYDelta;
        if (this.flipX) {
          // Have a look at section 4.2.2 to get an explanation
          const newLeftGap =
            this.getScaledWidth() -
            this.cropX * this.scaleX -
            cropZone.getScaledWidth();
          const oldLeftGap =
            this.getScaledWidth() -
            Math.abs(this.lastCropX - this.lastWidth) * this.scaleX;
          cropXDelta = newLeftGap - oldLeftGap;
        } else {
          cropXDelta = (this.cropX - this.lastCropX) * this.scaleX;
        }
        if (this.flipY) {
          // Have a look at section 4.2.2 to get an explanation
          const newTopGap =
            this.getScaledHeight() -
            this.cropY * this.scaleY -
            cropZone.getScaledHeight();
          const oldTopGap =
            this.getScaledHeight() -
            Math.abs(this.lastCropY - this.lastHeight) * this.scaleY;
          cropYDelta = newTopGap - oldTopGap;
        } else {
          cropYDelta = (this.cropY - this.lastCropY) * this.scaleY;
        }
        /**
         * Image is rotated have a look here
         * {@link https://wavebreakmedia.atlassian.net/wiki/spaces/COMPOSER/pages/275644417/DesignWizard+crop+rotated+images+explanation}
         * for the explanation.
         */
        const sinAlpha = Math.sin(fabric.util.degreesToRadians(this.lastAngle));
        const tanAlpha = Math.tan(fabric.util.degreesToRadians(this.lastAngle));
        const topDelta = sinAlpha * (cropXDelta + cropYDelta / tanAlpha);
        const leftDelta = topDelta / tanAlpha - cropYDelta / sinAlpha;
        this.left = this.lastLeft + leftDelta;
        this.top = this.lastTop + topDelta;
      }
      this.width = cropZone.getScaledWidth() / this.scaleX;
      this.height = cropZone.getScaledHeight() / this.scaleY;
      this.angle = this.lastAngle;
      this.skewX = this.lastSkewX;
      this.skewY = this.lastSkewY;
      // Let's put the image back to where it was before cropping (z-index)
      // -2 because the crop zone will be the object on top now
      canvas.fabric
        .remove(canvas.fabric.item(canvas.fabric.size() - 2))
        .insertAt(this, this.lastzIndex);
      this.setCoords();
      delete this.lastCropX;
      delete this.lastCropY;
      delete this.lastWidth;
      delete this.lastHeight;
      delete this.lastTop;
      delete this.lastLeft;
      delete this.lastAngle;
      delete this.lastzIndex;
      delete this.lastSkewX;
      delete this.lastSkewY;
    };

    /**
     * Apply last crop properties to the object.
     */
    fabric.Image.prototype.cancelCrop = function () {
      this.cropX = this.lastCropX;
      this.cropY = this.lastCropY;
      this.width = this.lastWidth;
      this.height = this.lastHeight;
      this.left = this.lastLeft;
      this.top = this.lastTop;
      this.angle = this.lastAngle;
      this.skewX = this.lastSkewX;
      this.skewY = this.lastSkewY;
      // Let's put the image back to where it was before cropping (z-index)
      // -2 because the crop zone will be the object on top now
      canvas.fabric
        .remove(canvas.fabric.item(canvas.fabric.size() - 2))
        .insertAt(this, this.lastzIndex);
      this.setCoords();
      delete this.lastCropX;
      delete this.lastCropY;
      delete this.lastWidth;
      delete this.lastHeight;
      delete this.lastTop;
      delete this.lastLeft;
      delete this.lastAngle;
      delete this.lastzIndex;
      delete this.lastSkewX;
      delete this.lastSkewY;
    };

    /**
     * Remove previously saved properties. Original values should have been
     * already set after the call to cropOn.
     */
    fabric.Image.prototype.resetCrop = function () {
      this.setCoords();
      delete this.lastCropX;
      delete this.lastCropY;
      delete this.lastWidth;
      delete this.lastHeight;
      delete this.lastTop;
      delete this.lastLeft;
      delete this.lastAngle;
      delete this.lastzIndex;
      delete this.lastSkewX;
      delete this.lastSkewY;
    };

    fabric.CropZone = fabric.util.createClass(fabric.Rect, {
      perPixelTargetFind: false,
      lockSkewingX: true,
      lockSkewingY: true,
      skipObject: true,
      excludeFromExport: true,
      lockScalingFlip: true,
      minScaleLimit: 0.1,
      fill: "transparent",
      hasBorders: false,
      originX: "left",
      originY: "top",
      cornerColor: "rgba(221, 63, 212, 1)",
      cornerSize: 8,
      transparentCorners: false,
      lockRotation: true,
      hasRotatingPoint: false,
      strokeUniform: false,
      _render(ctx) {
        this.callSuper("_render", ctx);

        const dashWidth = 7;

        // Set original scale
        const flipX = this.flipX ? -1 : 1;
        const flipY = this.flipY ? -1 : 1;
        const scaleX = flipX / this.scaleX;
        const scaleY = flipY / this.scaleY;

        ctx.scale(scaleX, scaleY);

        // Overlay rendering
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        this._renderOverlay(ctx);

        // First lines rendering with black
        ctx.strokeStyle = "rgba(221, 63, 212, 1)";
        this._renderBorders(ctx);

        // Set dashed borders
        if (ctx.setLineDash !== undefined) {
          ctx.setLineDash([dashWidth, dashWidth]);
        } else if (ctx.mozDash !== undefined) {
          ctx.mozDash = [dashWidth, dashWidth];
        }

        ctx.strokeStyle = "rgba(221, 63, 212, 0.4)";
        this._renderGrid(ctx);

        // Re render lines in white
        ctx.lineDashOffset = dashWidth;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        this._renderGrid(ctx);

        // Reset scale
        ctx.scale(1 / scaleX, 1 / scaleY);
      },

      _renderOverlay(ctx) {
        const ctxCanvas = ctx.canvas;

        //
        //    x0    x1        x2      x3
        // y0 +------------------------+
        //    |\\\\\\\\\\\\\\\\\\\\\\\\|
        //    |\\\\\\\\\\\\\\\\\\\\\\\\|
        // y1 +------+---------+-------+
        //    |\\\\\\|         |\\\\\\\|
        //    |\\\\\\|    0    |\\\\\\\|
        //    |\\\\\\|         |\\\\\\\|
        // y2 +------+---------+-------+
        //    |\\\\\\\\\\\\\\\\\\\\\\\\|
        //    |\\\\\\\\\\\\\\\\\\\\\\\\|
        // y3 +------------------------+
        //
        const x0 = Math.ceil(-this.getScaledWidth() / 2 - this.getCanvasLeft());
        const x1 = Math.ceil(-this.getScaledWidth() / 2);
        const x2 = Math.ceil(this.getScaledWidth() / 2);
        const x3 = Math.ceil(
          this.getScaledWidth() / 2 +
            (ctxCanvas.width / canvas.zoomLevel -
              this.getScaledWidth() -
              this.getCanvasLeft())
        );

        const y0 = Math.ceil(-this.getScaledHeight() / 2 - this.getCanvasTop());
        const y1 = Math.ceil(-this.getScaledHeight() / 2);
        const y2 = Math.ceil(this.getScaledHeight() / 2);
        const y3 = Math.ceil(
          this.getScaledHeight() / 2 +
            (ctxCanvas.height / canvas.zoomLevel -
              this.getScaledHeight() -
              this.getCanvasTop())
        );

        ctx.beginPath();

        // Draw outer rectangle.
        // Numbers are +/-1 so that overlay edges don't get blurry.
        ctx.moveTo(x0 - 1, y0 - 1);
        ctx.lineTo(x3 + 1, y0 - 1);
        ctx.lineTo(x3 + 1, y3 + 1);
        ctx.lineTo(x0 - 1, y3 - 1);
        ctx.lineTo(x0 - 1, y0 - 1);
        ctx.closePath();

        // Draw inner rectangle.
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1, y2);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x2, y1);
        ctx.lineTo(x1, y1);

        ctx.closePath();
        ctx.fill();
      },

      _renderBorders(ctx) {
        ctx.beginPath();
        ctx.moveTo(-this.getScaledWidth() / 2, -this.getScaledHeight() / 2); // upper left
        ctx.lineTo(this.getScaledWidth() / 2, -this.getScaledHeight() / 2); // upper right
        ctx.lineTo(this.getScaledWidth() / 2, this.getScaledHeight() / 2); // down right
        ctx.lineTo(-this.getScaledWidth() / 2, this.getScaledHeight() / 2); // down left
        ctx.lineTo(-this.getScaledWidth() / 2, -this.getScaledHeight() / 2); // upper left
        ctx.stroke();
      },

      _renderGrid(ctx) {
        // Vertical lines
        ctx.beginPath();
        ctx.moveTo(
          -this.getScaledWidth() / 2 + (1 / 3) * this.getScaledWidth(),
          -this.getScaledHeight() / 2
        );
        ctx.lineTo(
          -this.getScaledWidth() / 2 + (1 / 3) * this.getScaledWidth(),
          this.getScaledHeight() / 2
        );
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(
          -this.getScaledWidth() / 2 + (2 / 3) * this.getScaledWidth(),
          -this.getScaledHeight() / 2
        );
        ctx.lineTo(
          -this.getScaledWidth() / 2 + (2 / 3) * this.getScaledWidth(),
          this.getScaledHeight() / 2
        );
        ctx.stroke();
        // Horizontal lines
        ctx.beginPath();
        ctx.moveTo(
          -this.getScaledWidth() / 2,
          -this.getScaledHeight() / 2 + (1 / 3) * this.getScaledHeight()
        );
        ctx.lineTo(
          this.getScaledWidth() / 2,
          -this.getScaledHeight() / 2 + (1 / 3) * this.getScaledHeight()
        );
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(
          -this.getScaledWidth() / 2,
          -this.getScaledHeight() / 2 + (2 / 3) * this.getScaledHeight()
        );
        ctx.lineTo(
          this.getScaledWidth() / 2,
          -this.getScaledHeight() / 2 + (2 / 3) * this.getScaledHeight()
        );
        ctx.stroke();
      },
    });

    return {};
  },
]);
