import React, { useEffect, useState } from "react";
import Popover from "@material-ui/core/Popover";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import styled from "styled-components";
import {
  ButtonContainer,
  CanvasControlsContainer,
  CanvasControlsBtns,
  ActionButtonSvg,
  BgColorActionButton,
  GripPopupDiv,
  GripPopupDivChild,
  GripPopupDivChildLabel,
  GripPopupDivChildInput,
  GripPopupDivChildSpan,
  GridSwitch,
} from "./styledComponent";
import { BgColorPicker } from "./ColorPicker";

import { ReactComponent as Cross } from "./../../../../assets/svg/cross.svg";
import { ReactComponent as Gridlogo } from "./../../../../assets/svg/grid.svg";
import { ReactComponent as Redo_icon } from "./../../../../assets/svg/redo.svg";
import { ReactComponent as Undo_icon } from "./../../../../assets/svg/undo.svg";
import { width } from "@mui/system";

const GridTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#000000",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#000000",
    color: "#ffffff",
    width: "40px",
    height: "20px",
    fontSize: "14px",
    fontFamily: '"lato", "sans-serif"',
  },
}));
const BackgroundTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#000000",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#000000",
    color: "#ffffff",
    width: "120px",
    height: "20px",
    fontSize: "14px",
    fontFamily: '"lato", "sans-serif"',
  },
}));

const GridPopup = (props: any) => {
  const {
    id,
    open,
    anchorEl,
    handleClose,
    canvas,
    removeGrid,
    drawGrid,
    cleared,
    setCleared,
    currentWidth,
    currentHeight,
  } = props;
  const [checked, setChecked] = useState(false);
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(3);

  const toggleChecked = () => {
    removeGrid(canvas);
    setChecked((prev) => !prev);
  };

  useEffect(() => {
    if (checked && rows && columns && canvas) {
      console.log(">>>>>>>>>>>>>grid");
      // const currentCategoryHeight =
      //   document.getElementsByClassName("clipping-mask")[0].clientHeight;
      // const currentCategoryWidth =
      //   document.getElementsByClassName("clipping-mask")[0].clientWidth;
      drawGrid(canvas, rows, columns, currentHeight, currentWidth);
      canvas.renderAll();
    }
  }, [checked, rows, columns]);

  useEffect(() => {
    if (cleared) setChecked(false);
    setCleared(false);
  }, [cleared]);

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <GripPopupDiv>
        <GripPopupDivChild>
          <GripPopupDivChildLabel>Columns:</GripPopupDivChildLabel>
          <GripPopupDivChildInput
            defaultValue={columns}
            type="number"
            min="1"
            disabled={!checked}
            onChange={(e: any) => {
              removeGrid(canvas);
              setColumns(e.target.value);
            }}
          />
          <GripPopupDivChildSpan>x</GripPopupDivChildSpan>
          <GripPopupDivChildLabel>Rows:</GripPopupDivChildLabel>
          <GripPopupDivChildInput
            defaultValue={rows}
            type="number"
            min="1"
            disabled={!checked}
            onChange={(e: any) => {
              removeGrid(canvas);
              setRows(e.target.value);
            }}
          />
        </GripPopupDivChild>
        <GripPopupDivChild>
          <FormGroup>
            <FormControlLabel
              control={
                <GridSwitch
                  size="small"
                  checked={checked}
                  onChange={toggleChecked}
                />
              }
              label="Show grid"
              className="grid-switch"
            />
          </FormGroup>
        </GripPopupDivChild>
      </GripPopupDiv>
    </Popover>
  );
};

export const ActionButtons = (props: any) => {
  const {
    canvas,
    undo,
    disableUndo,
    redo,
    disableRedo,
    clearCanvas,
    setBgColor,
    drawGrid,
    removeGrid,
    currentWidth,
    currentHeight,
  } = props;

  const [colorPickerAnchorEl, setColorPickerAnchorEl] =
    useState<HTMLButtonElement | null>(null);
  const handleBgColorClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setColorPickerAnchorEl(event.currentTarget);
  };
  const handleBgColorClose = () => {
    setColorPickerAnchorEl(null);
  };
  const colorPickerOpen = Boolean(colorPickerAnchorEl);
  const colorPickerPopoverId = colorPickerOpen
    ? "color-picker-simple-popover"
    : undefined;

  const [gridAnchorEl, setGridAnchorEl] = useState<HTMLButtonElement | null>(
    null
  );
  const handleGridClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setGridAnchorEl(event.currentTarget);
  };
  const handleGridClose = () => {
    setGridAnchorEl(null);
  };
  const gridOpen = Boolean(gridAnchorEl);
  const gridPopoverId = colorPickerOpen ? "grid-simple-popover" : undefined;
  const [cleared, setCleared] = useState(false);

  return (
    <>
      <ButtonContainer>
        <CanvasControlsContainer>
          <GridTooltip title="Grid" placement="top-start" arrow>
            <CanvasControlsBtns
              aria-describedby={gridPopoverId}
              onClick={handleGridClick}
            >
              <Gridlogo
                style={{ color: "#5d5e63", width: "20px", height: "20px" }}
              ></Gridlogo>
            </CanvasControlsBtns>
          </GridTooltip>
          <GridTooltip title="Undo" placement="top-start" arrow>
            <CanvasControlsBtns onClick={undo} disabled={disableUndo}>
              <Undo_icon
                style={{ color: "#5d5e63", width: "20px", height: "20px" }}
              ></Undo_icon>
            </CanvasControlsBtns>
          </GridTooltip>
          <GridTooltip title="Redo" placement="top-start" arrow>
            <CanvasControlsBtns onClick={redo} disabled={disableRedo}>
              <Redo_icon
                style={{ color: "#5d5e63", width: "20px", height: "20px" }}
              ></Redo_icon>
            </CanvasControlsBtns>
          </GridTooltip>
          <GridTooltip title="Clear" placement="top-start" arrow>
            <CanvasControlsBtns
              onClick={() => {
                setCleared(true);
                clearCanvas();
              }}
            >
              <Cross
                style={{ color: "#5d5e63", width: "20px", height: "20px" }}
              ></Cross>
            </CanvasControlsBtns>
          </GridTooltip>
          <BackgroundTooltip
            title="Background Color"
            placement="top-start"
            arrow
          >
            <CanvasControlsBtns>
              <BgColorActionButton
                aria-describedby={colorPickerPopoverId}
                onClick={handleBgColorClick}
              />
            </CanvasControlsBtns>
          </BackgroundTooltip>
        </CanvasControlsContainer>
      </ButtonContainer>
      <BgColorPicker
        setBgColor={setBgColor}
        id={colorPickerPopoverId}
        open={colorPickerOpen}
        anchorEl={colorPickerAnchorEl}
        handleClose={handleBgColorClose}
      />
      <GridPopup
        id={gridPopoverId}
        open={gridOpen}
        anchorEl={gridAnchorEl}
        handleClose={handleGridClose}
        canvas={canvas}
        removeGrid={removeGrid}
        drawGrid={drawGrid}
        currentWidth={currentWidth}
        currentHeight={currentHeight}
        cleared={cleared}
        setCleared={setCleared}
      />
    </>
  );
};
