import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import NativeSelect from "@material-ui/core/NativeSelect";
import styled from "styled-components";
import { ArrowBackIos } from "@material-ui/icons";
import { fontss } from "../fonts";
import rgbHex from "rgb-hex";
import { usePrevious } from "../../../../../lib/usePreviosHook";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { TextFilterWrapper, TransperencySlider } from "../styledComponent";
import { ReactComponent as LeftAlign } from "../../../../../assets/svg/animationIcons/align-left.svg";
import { ReactComponent as RightAlign } from "../../../../../assets/svg/animationIcons/align-right.svg";
import { ReactComponent as CenterAlign } from "../../../../../assets/svg/animationIcons/align-center.svg";
import { ReactComponent as TopAlign } from "../../../../../assets/svg/animationIcons/align-top.svg";
import { ReactComponent as MiddleAlign } from "../../../../../assets/svg/animationIcons/align-middle.svg";
import { ReactComponent as BottomAlign } from "../../../../../assets/svg/animationIcons/align-bottom.svg";
import {
  ColorPickerPanel,
  ColorPickerPanelSeparator,
  ColorPickerLibrary,
  SavedColorsList,
} from "../ColorPicker";
import { RightSidePanelColorPicker } from "../styledComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFilledInput-root": {
      height: "35px",
      color: "white",
    },
  },
  textarea: {
    resize: "none",
  },
}));

const MainColorDiv = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: start;
`;

const ColorDiv = styled.div`
  width: 60px;
`;

const ColorDivSpan = styled.span`
  color: white;
  font-size: 12px;
`;

const Colors = styled.div`
  height: 25px;
  display: block;
  width: 100%;
  cursor: pointer;
  border-radius: 3px;
  border: 1px solid #a4b2c7;
`;

const ColorPicker = (props: any) => {
  const {
    setShowPicker,
    setSubTextProp,
    setMainTextProp,
    colorChange,
    mainTextProp,
    subTextProp,
    original,
  } = props;
  const [selectedColor, setSelectedColor] = useState<string>("null");
  const [colorFromPicker, setColorFromPicker] = useState<string>(
    `#${rgbHex(255, 255, 255, 1)}`
  );
  useEffect(() => {
    setColorFromPicker(original);
    setSelectedColor(original);
  }, []);
  const prevColorFromPicker: string =
    usePrevious(colorFromPicker) || colorFromPicker;

  useEffect(() => {
    if (colorChange === "mColor") {
      setMainTextProp({
        ...mainTextProp,
        mColor: { ...mainTextProp.mColor, value: colorFromPicker },
      });
    } else if (colorChange === "mLine") {
      setMainTextProp({
        ...mainTextProp,
        mLine: { ...mainTextProp.mLine, value: colorFromPicker },
      });
    } else if (colorChange === "mSec") {
      setMainTextProp({
        ...mainTextProp,
        mSec: { ...mainTextProp.mSec, value: colorFromPicker },
      });
    } else if (colorChange === "mPrim") {
      setMainTextProp({
        ...mainTextProp,
        mPrim: { ...mainTextProp.mPrim, value: colorFromPicker },
      });
    } else if (colorChange === "sColor") {
      setSubTextProp({
        ...subTextProp,
        sColor: { ...subTextProp.sColor, value: colorFromPicker },
      });
    } else if (colorChange === "sPrim") {
      setSubTextProp({
        ...subTextProp,
        sPrim: { ...subTextProp.sPrim, value: colorFromPicker },
      });
    } else if (colorChange === "sLine") {
      setSubTextProp({
        ...subTextProp,
        sLine: { ...subTextProp.sLine, value: colorFromPicker },
      });
    } else if (colorChange === "sSec") {
      setSubTextProp({
        ...subTextProp,
        sSec: { ...subTextProp.sSec, value: colorFromPicker },
      });
    }
  }, [colorFromPicker]);

  useEffect(() => {
    if (colorChange === "mColor") {
      setMainTextProp({
        ...mainTextProp,
        mColor: { ...mainTextProp.mColor, value: selectedColor },
      });
    } else if (colorChange === "mLine") {
      setMainTextProp({
        ...mainTextProp,
        mLine: { ...mainTextProp.mLine, value: selectedColor },
      });
    } else if (colorChange === "mSec") {
      setMainTextProp({
        ...mainTextProp,
        mSec: { ...mainTextProp.mSec, value: selectedColor },
      });
    } else if (colorChange === "mPrim") {
      setMainTextProp({
        ...mainTextProp,
        mPrim: { ...mainTextProp.mPrim, value: selectedColor },
      });
    } else if (colorChange === "sColor") {
      setSubTextProp({
        ...subTextProp,
        sColor: { ...subTextProp.sColor, value: selectedColor },
      });
    } else if (colorChange === "sPrim") {
      setSubTextProp({
        ...subTextProp,
        sPrim: { ...subTextProp.sPrim, value: selectedColor },
      });
    } else if (colorChange === "sLine") {
      setSubTextProp({
        ...subTextProp,
        sLine: { ...subTextProp.sLine, value: selectedColor },
      });
    } else if (colorChange === "sSec") {
      setSubTextProp({
        ...subTextProp,
        sSec: { ...subTextProp.sSec, value: selectedColor },
      });
    }
  }, [selectedColor]);

  return (
    <RightSidePanelColorPicker>
      <ArrowBackIos
        style={{
          color: "rgb(255, 255, 255)",
          width: "30px",
          height: "30px",
          position: "absolute",
          top: "54px",
          cursor: "pointer",
        }}
        onClick={() => setShowPicker(false)}
      />
      <ColorPickerPanel>
        <SavedColorsList setBgColor={setSelectedColor} />
        <ColorPickerPanelSeparator />
        <ColorPickerLibrary
          setColorFromPicker={setColorFromPicker}
          colorFromPicker={colorFromPicker}
        />
      </ColorPickerPanel>
    </RightSidePanelColorPicker>
  );
};

export const AnimationFilters = (props: any) => {
  const classes = useStyles();
  const { canvas, configuration, subText, mainText, setMainText, setSubText } =
    props;
  const [mainTextProp, setMainTextProp] = useState<any>({});
  const [subTextProp, setSubTextProp] = useState<any>({});
  const [showPicker, setShowPicker] = useState(false);
  const [colorChange, setColorChange] = useState<string>("");
  const [original, setOriginal] = useState<string>("");
  /** useEffect to segreggate main and sub text properties
      and set them in states, whenever the configuration changes
      i.e active object changes
  */

  useEffect(() => {
    const mainProps = configuration.filter((element: any) => {
      if (element.id.split("")[0] === "m") {
        return element;
      }
    });
    let mainPropObj = {};
    for (let i of mainProps) {
      let obj = {
        [i.id]: i,
      };
      mainPropObj = { ...mainPropObj, ...obj };
    }
    setMainTextProp(mainPropObj);
    const secProps = configuration.filter((element: any) => {
      if (element.id.split("")[0] === "s") {
        return element;
      }
    });
    let secPropObj = {};
    for (let i of secProps) {
      let obj = {
        [i.id]: i,
      };
      secPropObj = { ...secPropObj, ...obj };
    }
    setSubTextProp(secPropObj);
  }, [configuration]);

  /** useEffect to update properties whenever there is change in any
      property.
*/
  useEffect(() => {
    if (canvas && canvas.getActiveObject()) {
      let activeObj = canvas.getActiveObject();

      activeObj.setConfiguration([
        ...Object.values(mainTextProp),
        ...Object.values(subTextProp),
      ]);
    }
  }, [mainTextProp, subTextProp]);

  return (
    <>
      {showPicker && (
        <ColorPicker
          setMainTextProp={setMainTextProp}
          setSubTextProp={setSubTextProp}
          setShowPicker={setShowPicker}
          colorChange={colorChange}
          mainTextProp={mainTextProp}
          subTextProp={subTextProp}
          original={original}
        />
      )}
      {/** UI for main text */}
      {!showPicker && (
        <>
          <TextFilterWrapper>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <NativeSelect
                id="demo-customized-select-native"
                value={
                  mainTextProp && mainTextProp.mFont && mainTextProp.mFont.value
                }
                onChange={(e: any) => {
                  setMainTextProp({
                    ...mainTextProp,
                    mFont: { ...mainTextProp.mFont, value: e.target.value },
                  });
                }}
                style={{
                  color: "white",
                  backgroundColor: "#505886",
                  fontSize: "14px",
                  marginBottom: "10px",
                  width: "50%",
                }}
              >
                {fontss.map((font: any) => {
                  return (
                    <option
                      value={font}
                      style={{
                        backgroundColor: "#505886",
                        fontFamily: `${font}`,
                      }}
                    >
                      {font}
                    </option>
                  );
                })}
              </NativeSelect>
              <NativeSelect
                id="demo-customized-select-native"
                value={`${
                  mainTextProp &&
                  mainTextProp.mStyle &&
                  mainTextProp.mStyle.value
                },${
                  mainTextProp &&
                  mainTextProp.mWeight &&
                  mainTextProp.mWeight.value
                }`}
                onChange={(e: any) => {
                  let styles = e.target.value.split(",")[0];
                  let weights = e.target.value.split(",")[1];
                  setMainTextProp({
                    ...mainTextProp,
                    mStyle: { ...mainTextProp.mStyle, value: styles },
                    mWeight: { ...mainTextProp.mWeight, value: weights },
                  });
                }}
                style={{
                  color: "white",
                  backgroundColor: "#505886",
                  width: "40%",
                  fontSize: "14px",
                  marginBottom: "10px",
                }}
              >
                <option
                  value={"normal,normal"}
                  style={{ backgroundColor: "#505886" }}
                >
                  Regular
                </option>
                <option
                  value={"italic,400"}
                  style={{ backgroundColor: "#505886", fontStyle: "italic" }}
                >
                  Italic
                </option>
                <option
                  value={"normal,700"}
                  style={{ backgroundColor: "#505886", fontWeight: 900 }}
                >
                  Bold
                </option>
                <option
                  value={"italic,700"}
                  style={{
                    backgroundColor: "#505886",
                    fontWeight: 900,
                    fontStyle: "italic",
                  }}
                >
                  Bold Italic
                </option>
              </NativeSelect>
            </div>
            <div style={{ height: "60px" }}>
              <TextareaAutosize
                value={mainText}
                aria-label="empty textarea"
                style={{
                  backgroundColor: "#505886",
                  color: "white",
                  width: "100%",
                  border: "none",
                  height: "60px",
                }}
                className={classes.textarea}
                onChange={(e: any) => {
                  setMainText(e.target.value);
                  let activeObj = canvas.getActiveObject();
                  activeObj.setText(e.target.value, subText);
                }}
              />
            </div>
            <MainColorDiv>
              <ColorDiv>
                <ColorDivSpan>Text</ColorDivSpan>
                <Colors
                  style={{
                    backgroundColor:
                      mainTextProp &&
                      mainTextProp.mColor &&
                      mainTextProp.mColor.value,
                  }}
                  onClick={() => {
                    setColorChange("mColor");
                    setOriginal(mainTextProp.mColor.value);
                    setShowPicker(true);
                  }}
                ></Colors>
              </ColorDiv>
              {mainTextProp && mainTextProp.mPrim && mainTextProp.mPrim.value && (
                <div style={{ width: "60px", marginLeft: "10px" }}>
                  <span style={{ color: "white", fontSize: "12px" }}>
                    {mainTextProp.mPrim.title
                      ? mainTextProp.mPrim.title
                      : "Fill 1"}
                  </span>
                  <div
                    style={{
                      backgroundColor:
                        mainTextProp &&
                        mainTextProp.mPrim &&
                        mainTextProp.mPrim.value,
                      height: "25px",
                      display: "block",
                      width: "100%",
                      cursor: "pointer",
                      borderRadius: "3px",
                      border: "1px solid #a4b2c7",
                    }}
                    onClick={() => {
                      setColorChange("mPrim");
                      setOriginal(mainTextProp.mPrim.value);
                      setShowPicker(true);
                    }}
                  ></div>
                </div>
              )}
              {mainTextProp && mainTextProp.mLine && mainTextProp.mLine.value && (
                <div style={{ width: "60px", marginLeft: "10px" }}>
                  <span style={{ color: "white", fontSize: "12px" }}>Line</span>
                  <div
                    style={{
                      backgroundColor:
                        mainTextProp &&
                        mainTextProp.mLine &&
                        mainTextProp.mLine.value,
                      height: "25px",
                      display: "block",
                      width: "100%",
                      cursor: "pointer",
                      borderRadius: "3px",
                      border: "1px solid #a4b2c7",
                    }}
                    onClick={() => {
                      setColorChange("mLine");
                      setOriginal(mainTextProp.mLine.value);
                      setShowPicker(true);
                    }}
                  ></div>
                </div>
              )}
              {mainTextProp && mainTextProp.mSec && mainTextProp.mSec.value && (
                <div style={{ width: "60px", marginLeft: "10px" }}>
                  <span style={{ color: "white", fontSize: "12px" }}>
                    {mainTextProp.mSec.title
                      ? mainTextProp.mSec.title
                      : "Fill 2"}
                  </span>
                  <div
                    style={{
                      backgroundColor:
                        mainTextProp &&
                        mainTextProp.mSec &&
                        mainTextProp.mSec.value,
                      height: "25px",
                      display: "block",
                      width: "100%",
                      cursor: "pointer",
                      borderRadius: "3px",
                      border: "1px solid #a4b2c7",
                    }}
                    onClick={() => {
                      setColorChange("mSec");
                      setOriginal(mainTextProp.mSec.value);
                      setShowPicker(true);
                    }}
                  ></div>
                </div>
              )}
            </MainColorDiv>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginTop: "10px",
              }}
            >
              <LeftAlign
                style={{
                  height: "20px",
                  width: "20px",
                  cursor: "pointer",
                  fill:
                    mainTextProp &&
                    mainTextProp.mAlign &&
                    mainTextProp.mAlign.value === "left"
                      ? "rgb(77, 180, 170)"
                      : "white",
                }}
                onClick={() => {
                  setMainTextProp({
                    ...mainTextProp,
                    mAlign: { ...mainTextProp.mAlign, value: "left" },
                  });
                }}
              />
              <CenterAlign
                style={{
                  height: "20px",
                  width: "20px",
                  cursor: "pointer",
                  fill:
                    mainTextProp &&
                    mainTextProp.mAlign &&
                    mainTextProp.mAlign.value === "center"
                      ? "rgb(77, 180, 170)"
                      : "white",
                }}
                onClick={() => {
                  setMainTextProp({
                    ...mainTextProp,
                    mAlign: { ...mainTextProp.mAlign, value: "center" },
                  });
                }}
              />
              <RightAlign
                style={{
                  height: "20px",
                  width: "20px",
                  cursor: "pointer",
                  fill:
                    mainTextProp &&
                    mainTextProp.mAlign &&
                    mainTextProp.mAlign.value === "right"
                      ? "rgb(77, 180, 170)"
                      : "white",
                }}
                onClick={() => {
                  setMainTextProp({
                    ...mainTextProp,
                    mAlign: { ...mainTextProp.mAlign, value: "right" },
                  });
                }}
              />
              <TopAlign
                style={{
                  height: "20px",
                  width: "20px",
                  cursor: "pointer",
                  fill:
                    mainTextProp &&
                    mainTextProp.mValign &&
                    mainTextProp.mValign.value === "top"
                      ? "rgb(77, 180, 170)"
                      : "white",
                }}
                onClick={() => {
                  setMainTextProp({
                    ...mainTextProp,
                    mValign: { ...mainTextProp.mValign, value: "top" },
                  });
                }}
              />
              <MiddleAlign
                style={{
                  height: "20px",
                  width: "20px",
                  cursor: "pointer",
                  transform: "rotate(90deg)",
                  fill:
                    mainTextProp &&
                    mainTextProp.mValign &&
                    mainTextProp.mValign.value === "center"
                      ? "rgb(77, 180, 170)"
                      : "white",
                }}
                onClick={() => {
                  setMainTextProp({
                    ...mainTextProp,
                    mValign: { ...mainTextProp.mValign, value: "center" },
                  });
                }}
              />
              <BottomAlign
                style={{
                  height: "20px",
                  width: "20px",
                  cursor: "pointer",
                  fill:
                    mainTextProp &&
                    mainTextProp.mValign &&
                    mainTextProp.mValign.value === "bottom"
                      ? "rgb(77, 180, 170)"
                      : "white",
                }}
                onClick={() => {
                  setMainTextProp({
                    ...mainTextProp,
                    mValign: { ...mainTextProp.mValign, value: "bottom" },
                  });
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginTop: "10px",
              }}
            >
              <div style={{ width: "45%" }}>
                {mainTextProp &&
                  mainTextProp.mPadding &&
                  mainTextProp.mPadding.value && (
                    <>
                      {" "}
                      <span style={{ color: "white", fontSize: "12px" }}>
                        Font Size
                      </span>
                      <TransperencySlider
                        aria-label="Small steps"
                        step={10}
                        defaultValue={0}
                        min={-200}
                        max={200}
                        valueLabelDisplay="off"
                        value={
                          mainTextProp &&
                          mainTextProp.mPadding &&
                          mainTextProp.mPadding.value
                        }
                        onChange={(event, value: any) => {
                          setMainTextProp({
                            ...mainTextProp,
                            mPadding: {
                              ...mainTextProp.mPadding,
                              value: value,
                            },
                          });
                        }}
                      />
                    </>
                  )}
              </div>
              <div style={{ width: "45%" }}>
                {mainTextProp &&
                  mainTextProp.mRatio &&
                  mainTextProp.mRatio.value && (
                    <>
                      <span style={{ color: "white", fontSize: "12px" }}>
                        Ratio
                      </span>
                      <TransperencySlider
                        aria-label="Small steps"
                        step={0.1}
                        min={0.1}
                        max={0.9}
                        valueLabelDisplay="off"
                        value={
                          mainTextProp &&
                          mainTextProp.mRatio &&
                          mainTextProp.mRatio.value
                        }
                        onChange={(event, value: any) => {
                          setMainTextProp({
                            ...mainTextProp,
                            mRatio: { ...mainTextProp.mRatio, value: value },
                          });
                        }}
                      />
                    </>
                  )}
              </div>
            </div>
          </TextFilterWrapper>
          <TextFilterWrapper>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <NativeSelect
                id="demo-customized-select-native"
                value={
                  subTextProp && subTextProp.sFont && subTextProp.sFont.value
                }
                onChange={(e: any) => {
                  setSubTextProp({
                    ...subTextProp,
                    sFont: { ...subTextProp.sFont, value: e.target.value },
                  });
                }}
                style={{
                  color: "white",
                  backgroundColor: "#505886",
                  fontSize: "14px",
                  marginBottom: "10px",
                  width: "50%",
                }}
              >
                {fontss.map((font: any) => {
                  return (
                    <option
                      value={font}
                      style={{
                        backgroundColor: "#505886",
                        fontFamily: `${font}`,
                      }}
                    >
                      {font}
                    </option>
                  );
                })}
              </NativeSelect>
              <NativeSelect
                id="demo-customized-select-native"
                value={`${
                  subTextProp && subTextProp.sStyle && subTextProp.sStyle.value
                },${
                  subTextProp &&
                  subTextProp.sWeight &&
                  subTextProp.sWeight.value
                }`}
                onChange={(e: any) => {
                  let styles = e.target.value.split(",")[0];
                  let weights = e.target.value.split(",")[1];
                  setSubTextProp({
                    ...subTextProp,
                    sStyle: { ...subTextProp.sStyle, value: styles },
                    sWeight: { ...subTextProp.sWeight, value: weights },
                  });
                }}
                style={{
                  color: "white",
                  backgroundColor: "#505886",
                  width: "40%",
                  fontSize: "14px",
                  marginBottom: "10px",
                }}
              >
                <option
                  value={"normal,normal"}
                  style={{ backgroundColor: "#505886" }}
                >
                  Regular
                </option>
                <option
                  value={"italic,400"}
                  style={{ backgroundColor: "#505886", fontStyle: "italic" }}
                >
                  Italic
                </option>
                <option
                  value={"normal,700"}
                  style={{ backgroundColor: "#505886", fontWeight: 900 }}
                >
                  Bold
                </option>
                <option
                  value={"italic,700"}
                  style={{
                    backgroundColor: "#505886",
                    fontWeight: 900,
                    fontStyle: "italic",
                  }}
                >
                  Bold Italic
                </option>
              </NativeSelect>
            </div>
            <div style={{ height: "60px" }}>
              <TextareaAutosize
                value={subText}
                aria-label="empty textarea"
                style={{
                  backgroundColor: "#505886",
                  color: "white",
                  width: "100%",
                  border: "none",
                  height: "60px",
                }}
                className={classes.textarea}
                onChange={(e: any) => {
                  setSubText(e.target.value);
                  let activeObj = canvas.getActiveObject();
                  activeObj.setText(mainText, e.target.value);
                }}
              />
            </div>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "start",
              }}
            >
              {subTextProp && subTextProp.sColor && subTextProp.sColor.value && (
                <div style={{ width: "60px" }}>
                  <span style={{ color: "white", fontSize: "12px" }}>Text</span>
                  <div
                    style={{
                      backgroundColor:
                        subTextProp &&
                        subTextProp.sColor &&
                        subTextProp.sColor.value,
                      height: "25px",
                      display: "block",
                      width: "100%",
                      cursor: "pointer",
                      borderRadius: "3px",
                      border: "1px solid #a4b2c7",
                    }}
                    onClick={() => {
                      setColorChange("sColor");
                      setOriginal(subTextProp.sColor.value);
                      setShowPicker(true);
                    }}
                  ></div>
                </div>
              )}
              {subTextProp && subTextProp.sPrim && subTextProp.sPrim.value && (
                <div style={{ width: "60px", marginLeft: "10px" }}>
                  <span style={{ color: "white", fontSize: "12px" }}>
                    {subTextProp.sPrim.title
                      ? subTextProp.sPrim.title
                      : "Fill 1"}
                  </span>
                  <div
                    style={{
                      backgroundColor:
                        subTextProp &&
                        subTextProp.sPrim &&
                        subTextProp.sPrim.value,
                      height: "25px",
                      display: "block",
                      width: "100%",
                      cursor: "pointer",
                      borderRadius: "3px",
                      border: "1px solid #a4b2c7",
                    }}
                    onClick={() => {
                      setColorChange("sPrim");
                      setOriginal(subTextProp.sPrim.value);
                      setShowPicker(true);
                    }}
                  ></div>
                </div>
              )}
              {subTextProp && subTextProp.sLine && subTextProp.sLine.value && (
                <div style={{ width: "60px", marginLeft: "10px" }}>
                  <span style={{ color: "white", fontSize: "12px" }}>Line</span>
                  <div
                    style={{
                      backgroundColor:
                        subTextProp &&
                        subTextProp.sLine &&
                        subTextProp.sLine.value,
                      height: "25px",
                      display: "block",
                      width: "100%",
                      cursor: "pointer",
                      borderRadius: "3px",
                      border: "1px solid #a4b2c7",
                    }}
                    onClick={() => {
                      setColorChange("sLine");
                      setOriginal(subTextProp.sLine.value);
                      setShowPicker(true);
                    }}
                  ></div>
                </div>
              )}
              {subTextProp && subTextProp.sSec && subTextProp.sSec.value && (
                <div style={{ width: "60px", marginLeft: "10px" }}>
                  <span style={{ color: "white", fontSize: "12px" }}>
                    {subTextProp.sSec.title ? subTextProp.sSec.title : "Fill 2"}
                  </span>
                  <div
                    style={{
                      backgroundColor:
                        subTextProp &&
                        subTextProp.sSec &&
                        subTextProp.sSec.value,
                      height: "25px",
                      display: "block",
                      width: "100%",
                      cursor: "pointer",
                      borderRadius: "3px",
                      border: "1px solid #a4b2c7",
                    }}
                    onClick={() => {
                      setColorChange("sSec");
                      setOriginal(subTextProp.sSec.value);
                      setShowPicker(true);
                    }}
                  ></div>
                </div>
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginTop: "10px",
              }}
            >
              <LeftAlign
                style={{
                  height: "20px",
                  width: "20px",
                  cursor: "pointer",
                  fill:
                    subTextProp &&
                    subTextProp.sAlign &&
                    subTextProp.sAlign.value === "left"
                      ? "rgb(77, 180, 170)"
                      : "white",
                }}
                onClick={() => {
                  setSubTextProp({
                    ...subTextProp,
                    sAlign: { ...subTextProp.sAlign, value: "left" },
                  });
                }}
              />
              <CenterAlign
                style={{
                  height: "20px",
                  width: "20px",
                  fill:
                    subTextProp &&
                    subTextProp.sAlign &&
                    subTextProp.sAlign.value === "center"
                      ? "rgb(77, 180, 170)"
                      : "white",
                }}
                onClick={() => {
                  setSubTextProp({
                    ...subTextProp,
                    sAlign: { ...subTextProp.sAlign, value: "center" },
                  });
                }}
              />
              <RightAlign
                style={{
                  height: "20px",
                  width: "20px",
                  fill:
                    subTextProp &&
                    subTextProp.sAlign &&
                    subTextProp.sAlign.value === "right"
                      ? "rgb(77, 180, 170)"
                      : "white",
                }}
                onClick={() => {
                  setSubTextProp({
                    ...subTextProp,
                    sAlign: { ...subTextProp.sAlign, value: "right" },
                  });
                }}
              />
              <TopAlign
                style={{
                  height: "20px",
                  width: "20px",
                  fill:
                    subTextProp &&
                    subTextProp.sValign &&
                    subTextProp.sValign.value === "top"
                      ? "rgb(77, 180, 170)"
                      : "white",
                }}
                onClick={() => {
                  setSubTextProp({
                    ...subTextProp,
                    sValign: { ...subTextProp.sValign, value: "top" },
                  });
                }}
              />
              <MiddleAlign
                style={{
                  height: "20px",
                  width: "20px",
                  transform: "rotate(90deg)",
                  fill:
                    subTextProp &&
                    subTextProp.sValign &&
                    subTextProp.sValign.value === "center"
                      ? "rgb(77, 180, 170)"
                      : "white",
                }}
                onClick={() => {
                  setSubTextProp({
                    ...subTextProp,
                    sValign: { ...subTextProp.sValign, value: "center" },
                  });
                }}
              />
              <BottomAlign
                style={{
                  height: "20px",
                  width: "20px",
                  fill:
                    subTextProp &&
                    subTextProp.sValign &&
                    subTextProp.sValign.value === "bottom"
                      ? "rgb(77, 180, 170)"
                      : "white",
                }}
                onClick={() => {
                  setSubTextProp({
                    ...subTextProp,
                    sValign: { ...subTextProp.sValign, value: "bottom" },
                  });
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginTop: "10px",
              }}
            >
              <div style={{ width: "45%" }}>
                {subTextProp &&
                  subTextProp.sPadding &&
                  subTextProp.sPadding.value && (
                    <>
                      <span style={{ color: "white", fontSize: "12px" }}>
                        Font Size
                      </span>
                      <TransperencySlider
                        aria-label="Small steps"
                        step={10}
                        defaultValue={0}
                        min={-200}
                        max={200}
                        valueLabelDisplay="off"
                        value={
                          subTextProp &&
                          subTextProp.sPadding &&
                          subTextProp.sPadding.value
                        }
                        onChange={(event, value: any) => {
                          setSubTextProp({
                            ...subTextProp,
                            sPadding: { ...subTextProp.sPadding, value: value },
                          });
                        }}
                      />
                    </>
                  )}
              </div>
              <div style={{ width: "45%" }}>
                {subTextProp &&
                  subTextProp.sLineSpacing &&
                  subTextProp.sLineSpacing.value && (
                    <>
                      <span style={{ color: "white", fontSize: "12px" }}>
                        Line Spacing
                      </span>
                      <TransperencySlider
                        aria-label="Small steps"
                        step={1}
                        defaultValue={0}
                        min={-100}
                        max={100}
                        valueLabelDisplay="off"
                        value={
                          subTextProp &&
                          subTextProp.sLineSpacing &&
                          subTextProp.sLineSpacing.value
                        }
                        onChange={(event, value: any) => {
                          setSubTextProp({
                            ...subTextProp,
                            sLineSpacing: {
                              ...subTextProp.sLineSpacing,
                              value: value,
                            },
                          });
                        }}
                      />
                    </>
                  )}
              </div>
            </div>
          </TextFilterWrapper>
        </>
      )}
    </>
  );
};
