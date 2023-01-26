import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Popover from "@material-ui/core/Popover";
import { ChromePicker } from "react-color";
import rgbHex from "rgb-hex";

import { usePrevious } from "./../../../../lib/usePreviosHook";

const ColorPickerPopover = styled.div`
  background-color: #343e63;
  border-radius: 0;
  border: 1px solid #fff;
  width: 170px;
`;

const ColorPickerPopoverBody = styled.div`
  padding: 0.5rem 0.75rem;
  color: #212529;
`;

export const ColorPickerPanel = styled.div`
  width: 145px;
  margin-left: 10%;
`;

const ColorPickerPanelTitle = styled.p`
  text-align: center;
  color: #fff;
`;

const ColorPickerPanelPresetColors = styled.div`
  height: 60.2px;
  margin: 10.5px 0;
  padding-top: 3.5px;
  overflow: hidden !important;
  overflow-anchor: none;
  -ms-overflow-style: none;
  touch-action: auto;
`;

const ColorPickerPanelPresetColorsList = styled.ul`
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  margin: 0;
`;

const ColorPickerPanelPresetColorsListLi = styled.li`
  width: 24.5px;
  height: 24.5px;
  border-radius: 24.5px;
  -webkit-border-radius: 24.5px;
  -moz-border-radius: 24.5px;
  border: 1.4px solid #dedfe1;
  margin: 2.1px 4.2px;
  cursor: pointer;
`;

export const ColorPickerPanelSeparator = styled.hr`
  border-color: rgba(255, 255, 255, 0.1);
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const ColorPickerPanelAddColorBtn = styled.a`
  font-size: 10px;
  display: inline-block;
  color: #fff;
  cursor: pointer;
  text-decoration: underline;
  transition: 0.3s all linear;
  font-size: 14px;
`;

export const ColorPickerLibrary = (props: any) => {
  return (
    <>
      <ColorPickerPanelAddColorBtn>Save Color</ColorPickerPanelAddColorBtn>
      <ChromePicker
        color={props.colorFromPicker}
        alpha={1}
        onChangeComplete={(color: any) => {
          props.setColorFromPicker(
            "#" + rgbHex(color.rgb.r, color.rgb.g, color.rgb.b, color.rgb.a)
          );
        }}
        width={148}
      />
    </>
  );
};

export const SavedColorsList = (props: any) => {
  const { setBgColor } = props;
  return (
    <>
      <ColorPickerPanelTitle>Set Colour</ColorPickerPanelTitle>
      <ColorPickerPanelPresetColors>
        <ColorPickerPanelPresetColorsList>
          <ColorPickerPanelPresetColorsListLi
            className="transperent-bg-color"
            onClick={() => setBgColor("")}
          />
          <ColorPickerPanelPresetColorsListLi
            className="white-bg-color"
            onClick={() => setBgColor("white")}
          />
          <ColorPickerPanelPresetColorsListLi
            className="light-grey-bg-color"
            onClick={() => setBgColor("#cecece")}
          />
          <ColorPickerPanelPresetColorsListLi
            className="dark-grey-bg-color"
            onClick={() => setBgColor("#606060")}
          />
          <ColorPickerPanelPresetColorsListLi
            className="light-black-bg-color"
            onClick={() => setBgColor("#232428")}
          />
          <ColorPickerPanelPresetColorsListLi
            className="black-bg-color"
            onClick={() => setBgColor("#000000")}
          />
          <ColorPickerPanelPresetColorsListLi
            className="purple-bg-color"
            onClick={() => setBgColor("#592e6f")}
          />
          <ColorPickerPanelPresetColorsListLi
            className="sea-green-bg-color"
            onClick={() => setBgColor("#4db4aa")}
          />
          <ColorPickerPanelPresetColorsListLi
            className="orange-bg-color"
            onClick={() => setBgColor("#e87855")}
          />
          <ColorPickerPanelPresetColorsListLi
            className="blue-bg-color"
            onClick={() => setBgColor("#40b3e9")}
          />
        </ColorPickerPanelPresetColorsList>
      </ColorPickerPanelPresetColors>
    </>
  );
};

export const BgColorPicker = (props: any) => {
  const { setBgColor, id, open, anchorEl, handleClose } = props;
  const [colorFromPicker, setColorFromPicker] = useState<string>(
    `#${rgbHex(255, 255, 255, 1)}`
  );
  const prevColorFromPicker: string =
    usePrevious(colorFromPicker) || colorFromPicker;

  useEffect(() => {
    if (colorFromPicker && prevColorFromPicker) {
      if (
        colorFromPicker.substring(0, 7) !== prevColorFromPicker.substring(0, 7)
      ) {
        setBgColor(colorFromPicker);
      }
    }
  }, [colorFromPicker, prevColorFromPicker, setBgColor]);

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
      <ColorPickerPopover>
        <ColorPickerPopoverBody>
          <ColorPickerPanel>
            <SavedColorsList setBgColor={setBgColor} />
            <ColorPickerPanelSeparator />
            <ColorPickerLibrary
              setColorFromPicker={setColorFromPicker}
              colorFromPicker={colorFromPicker}
            />
          </ColorPickerPanel>
        </ColorPickerPopoverBody>
      </ColorPickerPopover>
    </Popover>
  );
};
