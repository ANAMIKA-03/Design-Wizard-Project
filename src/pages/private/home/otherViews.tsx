import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import DefaultViews from "./defaultViews";
import { makeStyles } from "@material-ui/core/styles";
import NativeSelect from "@material-ui/core/NativeSelect";
import { Link } from "react-router-dom";

const HomeSectionDivTwo = styled.ul`
  margin: 0 auto;
  text-align: center;
  padding: 0;
`;

const DivLiFormateTwo = styled.li`
  list-style: none;
  display: inline-block;
  width: 25%;
  margin-right: 1.66%;
  color: #fff;
  vertical-align: middle; ;
`;

const TextTitleTwo = styled.h2`
  color: #fbfbff;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 500;
  cursor: pointer;
  text-align: right;
`;

const OtherSize = styled.ul`
  margin: 20px 0 0 0;
`;

const OtherSizeList = styled.li`
  list-style: none;
  display: flex;
  margin-bottom: 15px;
`;

const OtherSizeListFirst = styled.span`
  display: inline-block;
  width: 70px;
  color: #e87855;
  margin-right: 2px;
`;

const OtherSizeTextField = styled.span`
  display: inline-block;
  background-color: #fbfbff;
`;

const BlankBox = styled.div`
  transition: all 0.3s ease-in-out;
  box-shadow: rgb(0 0 0 / 40%) 0 23px 24px -12px;
  border: 4px solid #fbfbff;
  width: 200px;
  height: 150px;
  cursor: pointer;
  &:hover {
    transition: all 0.3s ease-in-out;
    box-shadow: rgb(0 0 0 / 40%) 0 43px 24px -12px;
    margin-top: -20px;
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root .MuiInput-root .MuiInput-underline": {
      height: "35px",
      backgroundColor: "white",
    },
  },
  nativeSelect: {
    "& .MuiInputBase-root": {
      width: "20%",
      color: "black",
    },
  },
}));

export default function OtherViews() {
  const classes = useStyles();
  const [show, setShow] = useState(true);
  const [widthUnit, setWidthUnit] = useState("px");
  const [heigthUnit, setHeightUnit] = useState("px");
  const [cHeight, setcHeight] = useState(600);
  const [cWidth, setcWidth] = useState(800);
  return (
    <HomeSectionDivTwo>
      {show ? (
        <div>
          <DivLiFormateTwo>
            <TextTitleTwo onClick={() => setShow(false)}>
              Other Sizes:
            </TextTitleTwo>
          </DivLiFormateTwo>
          <DivLiFormateTwo>
            <OtherSize>
              <OtherSizeList>
                <OtherSizeListFirst>Width:</OtherSizeListFirst>
                <OtherSizeTextField>
                  <TextField
                    type="number"
                    defaultValue="800"
                    style={{
                      border: "#fff solid 1px",
                      color: "#fff",
                      padding: "0 5px",
                      width: "132px",
                    }}
                    className={classes.root}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e: any) => setcWidth(e.target.value)}
                  />
                </OtherSizeTextField>
                <NativeSelect
                  className={classes.nativeSelect}
                  id="demo-customized-select-native"
                  value={widthUnit}
                  onChange={(e: any) => {
                    setWidthUnit(e.target.value);
                  }}
                  style={{
                    color: "#000",
                    backgroundColor: "#fff",
                    width: "20%",
                    fontSize: "14px",
                    height: "36px",
                  }}
                >
                  <option value={"px"} style={{ backgroundColor: "#fff" }}>
                    px
                  </option>
                  <option value={"in"} style={{ backgroundColor: "#fff" }}>
                    in
                  </option>
                  <option value={"cm"} style={{ backgroundColor: "#fff" }}>
                    cm
                  </option>
                </NativeSelect>
              </OtherSizeList>
              <OtherSizeList>
                <OtherSizeListFirst>Height:</OtherSizeListFirst>
                <OtherSizeTextField>
                  <TextField
                    type="number"
                    defaultValue="600"
                    style={{
                      border: "#fff solid 1px",
                      color: "#fff",
                      padding: "0 5px",
                      width: "132px",
                    }}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e: any) => setcHeight(e.target.value)}
                  />
                </OtherSizeTextField>
                <NativeSelect
                  className={classes.nativeSelect}
                  id="demo-customized-select-native"
                  value={heigthUnit}
                  onChange={(e: any) => {
                    setHeightUnit(e.target.value);
                  }}
                  style={{
                    color: "#000",
                    backgroundColor: "#fff",
                    width: "20%",
                    fontSize: "14px",
                    height: "36px",
                  }}
                >
                  <option value={"px"} style={{ backgroundColor: "#fff" }}>
                    px
                  </option>
                  <option value={"in"} style={{ backgroundColor: "#fff" }}>
                    in
                  </option>
                  <option value={"cm"} style={{ backgroundColor: "#fff" }}>
                    cm
                  </option>
                </NativeSelect>
              </OtherSizeList>
              <OtherSizeList>
                <OtherSizeListFirst></OtherSizeListFirst>
                <Link
                  to={{
                    pathname: "/dashboard/workspace",
                    state: { editor: "image", height: cHeight, width: cWidth },
                  }}
                >
                  <Button
                    style={{
                      color: "#fbfbff",
                      background: "#2fc6c0",
                      padding: "6px 43px",
                      fontSize: "1rem",
                      textDecoration: "none",
                    }}
                  >
                    {" "}
                    Create{" "}
                  </Button>
                </Link>
              </OtherSizeList>
            </OtherSize>
          </DivLiFormateTwo>
          <DivLiFormateTwo>
            <BlankBox
              style={{ width: cWidth / 4, height: cHeight / 4 }}
            ></BlankBox>
          </DivLiFormateTwo>
        </div>
      ) : (
        <DefaultViews />
      )}
    </HomeSectionDivTwo>
  );
}
