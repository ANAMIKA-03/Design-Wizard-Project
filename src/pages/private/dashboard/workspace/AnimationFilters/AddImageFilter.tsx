import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import styled from "styled-components";
import { animation } from "../AnimationText/animation";
import {
  ImgUpload,
  UploadInnerDiv,
  UploadDiv,
  UploadImg,
  UploadPara,
  UploadSpan,
  TransperencySlider,
  UnPaidPopup,
} from "../styledComponent";
import {
  ColorPickerPanel,
  ColorPickerPanelSeparator,
  ColorPickerLibrary,
  SavedColorsList,
} from "../ColorPicker";
import rgbHex from "rgb-hex";
import { usePrevious } from "../../../../../lib/usePreviosHook";
import { fontss } from "../fonts";
import NativeSelect from "@material-ui/core/NativeSelect";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { ReactComponent as LeftAlign } from "../../../../../assets/svg/animationIcons/align-left.svg";
import { ReactComponent as RightAlign } from "../../../../../assets/svg/animationIcons/align-right.svg";
import { ReactComponent as CenterAlign } from "../../../../../assets/svg/animationIcons/align-center.svg";
import { ReactComponent as TopAlign } from "../../../../../assets/svg/animationIcons/align-top.svg";
import { ReactComponent as MiddleAlign } from "../../../../../assets/svg/animationIcons/align-middle.svg";
import { ReactComponent as BottomAlign } from "../../../../../assets/svg/animationIcons/align-bottom.svg";
import { RightSidePanelColorPicker } from "../styledComponent";
import { ArrowBackIos } from "@material-ui/icons";
import { UploadImage } from "../../../../../lib/contexts/Queries";
import { useMutation } from "@apollo/client";
import { UploadPopUp } from "../UploadPopUp";

const MainDiv = styled.div`
  width: 90%;
  overflow-y: hidden;
  overflow-x: hidden;
  height: 80vh;
  margin: 2%;
  &:hover {
    ::-webkit-scrollbar {
      width: 12px;
    }
    ::-webkit-scrollbar-track {
      background-color: #c0c0c0;
    }
    ::-webkit-scrollbar-thumb {
      background: #696969;
      border-radius: 6px;
      height: 20px;
      background-color: #c0c0c0;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #696969;
    }
    overflow-y: overlay;
  }
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
    if (colorChange === "sColor") {
      setSubTextProp({
        ...subTextProp,
        sColor: { ...subTextProp.sColor, value: colorFromPicker },
      });
    }
  }, [colorFromPicker]);

  useEffect(() => {
    if (colorChange === "sColor") {
      setSubTextProp({
        ...subTextProp,
        sColor: { ...subTextProp.sColor, value: selectedColor },
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

export const AddImage = (props: any) => {
  const classes = useStyles();
  const {
    canvas,
    configuration,
    mainText,
    subText,
    setSubText,
    disabledEffects,
  } = props;
  const [fadeIn, setFadeIn] = useState<boolean>(false);
  const [fadeOut, setFadeOut] = useState<boolean>(false);
  const [mainTextProp, setMainTextProp] = useState<any>({});
  const [subTextProp, setSubTextProp] = useState<any>({});
  const [colorChange, setColorChange] = useState<string>("");
  const [original, setOriginal] = useState<string>("");
  const [showPicker, setShowPicker] = useState(false);
  const [logo, setLogos] = useState("");
  const [base, setFileBase] = useState("");
  const [paidSubscriber, setPaidSubscriber] = useState(false);
  const [uploadImg] = useMutation(UploadImage);

  useEffect(() => {
    const user: any = localStorage.getItem("user");
    const paid = JSON.parse(user);
    setPaidSubscriber(paid.paidSubscriber);
  }, []);

  useEffect(() => {
    if (base !== "") {
      uploadFile(base);
    }
  }, [base]);

  const fileUpload = (e: any, cb: any) => {
    let file = e.target.files[0];
    console.log(file);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      /* eslint-disable-next-line */
      console.log("Error: ", error);
    };
  };

  const uploadFile = (base: string) => {
    const func = async () => {
      const res = await uploadImg({
        variables: {
          token: `${localStorage.getItem("token")}`,
          input: {
            base64: base,
          },
        },
      });
      return res;
    };
    func().then((data) => {
      if (data) {
        handleUploadedImage(data.data.POST_users_me_userUpload);
        setFileBase("");
      }
    });
  };

  const logoToUrl = (logo: any) =>
    animation(canvas).logoToUrl(logo, "50x50", "");

  const setLogo = (item: any) => {
    console.log(item);
    const { key, width, height, type } = item;
    let extension = "";
    let assetId = "";
    if (key) {
      let [path, fileType] = key.split(".");
      extension = fileType;
      assetId = path.split("/").pop();
    }

    const logo = {
      key,
      width,
      height,
      extension,
      assetId,
      type,
    };
    const activeObj = canvas.getActiveObject();
    activeObj.setLogo(logo);
    const logos = activeObj.getLogo();
    setLogos(logoToUrl(logo));
    // $scope.uploadText = REPLACE_TEXT;
  };

  const handleUploadedImage = (item: any) => {
    setLogo({ ...item, type: "image/user" });
  };

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

  useEffect(() => {
    if (canvas && canvas.getActiveObject()) {
      let activeObj = canvas.getActiveObject();
      console.log(
        "Object.values(mainTextProp)====>",
        Object.values(mainTextProp)
      );
      activeObj.setConfiguration([
        ...Object.values(mainTextProp),
        ...Object.values(subTextProp),
      ]);
    }
  }, [mainTextProp, subTextProp]);

  useEffect(() => {
    if (canvas && canvas.getActiveObject()) {
      {
        if (!disabledEffects.includes("fadeIn")) {
          setFadeIn(true);
        } else {
          setFadeIn(false);
        }
      }
      {
        if (!disabledEffects.includes("fadeOut")) {
          setFadeOut(true);
        } else {
          setFadeOut(false);
        }
      }
    }
  }, [disabledEffects]);

  const handleSwitchChange = (e: any) => {
    let name = e.target.name;
    let activeObj = canvas.getActiveObject();
    let disabledEffects = activeObj.disabledEffects;

    if (name === "fadeIn") setFadeIn(e.target.checked);

    if (name === "fadeOut") setFadeOut(e.target.checked);

    if (!e.target.checked) {
      disabledEffects.push(name);
      activeObj.setDisabledEffects(disabledEffects);
    }
    if (e.target.checked) {
      if (disabledEffects.includes(name)) {
        let disabled = disabledEffects.filter((item: any) => {
          return item !== name;
        });
        activeObj.setDisabledEffects(disabled);
      }
    }
  };

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
      {!showPicker && (
        <MainDiv>
          <UploadDiv>
            {paidSubscriber ? (
              <ImgUpload
                type="file"
                onChange={(e: any) => {
                  fileUpload(e, (res: any) => {
                    setFileBase(res.toString());
                  });
                }}
              />
            ) : (
              <UnPaidPopup onClick={() => props.togglePopup()}></UnPaidPopup>
            )}
            <UploadInnerDiv>
              <UploadImg
                src="/cloud_black_24dp.svg"
                height="40px"
                width="40px"
              />
              <UploadPara>
                <b>Drag </b>
                <UploadSpan>
                  or Click to
                  <br />
                  upload <br />
                  image/Video.
                </UploadSpan>
              </UploadPara>
            </UploadInnerDiv>
          </UploadDiv>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div>
              <span style={{ color: "white", fontSize: "14px" }}>Fade In</span>
              <Switch
                checked={fadeIn}
                name="fadeIn"
                onChange={handleSwitchChange}
                color="secondary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            </div>
            <div>
              <span style={{ color: "white", fontSize: "14px" }}>Fade Out</span>
              <Switch
                checked={fadeOut}
                name="fadeOut"
                onChange={handleSwitchChange}
                color="secondary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "100%",
              marginTop: "10px",
            }}
          >
            {mainTextProp && mainTextProp.mPadding && (
              <div style={{ width: "45%" }}>
                <span style={{ color: "white", fontSize: "12px" }}>
                  Image Size
                </span>
                <TransperencySlider
                  aria-label="Small steps"
                  step={10}
                  min={-30}
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
                      mPadding: { ...mainTextProp.mPadding, value: value },
                    });
                  }}
                />
              </div>
            )}
            {mainTextProp && mainTextProp.mRatio && (
              <div style={{ width: "45%" }}>
                <span style={{ color: "white", fontSize: "12px" }}>Ratio</span>
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
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
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
              justifyContent: "space-evenly",
              marginTop: "20px",
            }}
          >
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
                subTextProp && subTextProp.sWeight && subTextProp.sWeight.value
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
          <div style={{ height: "33px" }}>
            <TextareaAutosize
              aria-label="empty textarea"
              style={{
                backgroundColor: "#505886",
                color: "white",
                width: "100%",
                height: "80px",
                borderRadius: "5px",
              }}
              className={classes.textarea}
              value={subText}
              onChange={(e: any) => {
                let activeObj = canvas.getActiveObject();
                activeObj.setText(mainText, e.target.value);
                setSubText(e.target.value);
              }}
            />
          </div>
          <div style={{ width: "60px", marginTop: "55px" }}>
            <span style={{ color: "white", fontSize: "12px" }}>Text</span>
            {subTextProp && subTextProp.sColor && subTextProp.sColor.value && (
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
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
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
                cursor: "pointer",
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
                cursor: "pointer",
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
                cursor: "pointer",
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
                cursor: "pointer",
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
                cursor: "pointer",
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
              justifyContent: "space-evenly",
              width: "100%",
              marginTop: "10px",
            }}
          >
            {subTextProp && subTextProp.sPadding && (
              <div style={{ width: "45%" }}>
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
              </div>
            )}
            {subTextProp && subTextProp.sLineSpacing && (
              <div style={{ width: "45%" }}>
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
              </div>
            )}
          </div>
        </MainDiv>
      )}
    </>
  );
};
