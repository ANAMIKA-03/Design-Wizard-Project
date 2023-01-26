import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as GoBackIcon } from "../../../../assets/svg/simpleArrow.svg";
import NativeSelect from "@material-ui/core/NativeSelect";
import { makeStyles } from "@material-ui/core/styles";
// import TextField from "@material-ui/core/TextField";
const DivMainContent = styled.div`
  background: #493652ad;
  background: url(https://app.designwizard.com/images/staticTemplatesBackground.jpg);
  width: 100%;
  margin-top: 0;
  background-size: cover;
  height: 120%;
  overflow-y: scroll;
  font-family: "Lato", sans-serif !important;
`;

const MainTitle = styled.h1`
  margin-top: 2% !important;
  color: #fff;
  text-align: center;
  margin: 5% auto 0 auto;
  font-weight: 300;
  font-size: 4em;
`;

const MainList = styled.ul`
  padding: 0 15%;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: -ms-flex;
  display: flex;
  -webkit-align-items: flex-end;
  -moz-align-items: flex-end;
  -ms-align-items: flex-end;
  align-items: flex-end;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  -ms-justify-content: center;
  justify-content: center;
  transition: transform 0.3s ease;
  -webkit-flex-wrap: wrap;
  -moz-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-align-items: center;
  -moz-align-items: center;
  -ms-align-items: center;
  align-items: center;
  -webkit-flex-grow: 3;
  -moz-flex-grow: 3;
  -ms-flex-grow: 3;
  flex-grow: 3;
  position: relative;
  transition: transform 0.3s ease-in-out;
  transform: translate3d(0, 50px, 0);
`;

const LeftArrow = styled.div`
  position: absolute;
  left: -2px;
  bottom: -3px;
  border-right: 8px solid #e87855;
  border-top: 3px solid transparent;
  border-bottom: 3px solid transparent;
`;
const RightArrow = styled.div`
  position: absolute;
  right: -2px;
  bottom: -3px;
  border-left: 8px solid #e87855;
  border-top: 3px solid transparent;
  border-bottom: 3px solid transparent;
`;

const HorizontalLine = styled.div`
  width: 100%;
  border-bottom: 1px solid #e87855;
  text-align: center;
  font-size: 12px;
  position: absolute;
  top: -15px;
  color: #fff;
`;

const HorizontalLabel = styled.label`
  color: #fff;
  font-size: 0.85em;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  display: block;
  top: -20px !important;
  font-weight: normal;
`;
const VerticalTopArrow = styled.div`
  position: absolute;
  left: -3px;
  top: -3px;
  border-bottom: 8px solid #e87855;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
`;

const VerticalBottomArrow = styled.div`
  position: absolute;
  left: -3px;
  bottom: -3px;
  border-top: 8px solid #e87855;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
`;

const VerticalLine = styled.div`
  height: 100%;
  border-left: 1px solid #e87855;
  color: #fff;
  font-size: 12px;
  position: absolute;
  right: -15px;
  padding-left: 3px;
`;

const VerticalLabel = styled.label`
  color: #fff;
  font-size: 0.85em;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  display: block;
  font-weight: normal;
  top: -36px !important;
  transform: rotate(90deg);
  height: 32px;
  white-space: nowrap;
`;

const LI = styled.li`
  -webkit-flex-direction: column;
  -moz-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  text-align: center;
  padding: 25px 25px 15px 25px;
  max-width: 27%;
  color: white;
  cursor: pointer;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  margin-top: 20px;
  &:hover {
    transition: all 0.3s ease-in-out;
    transform: translate(0px, -10px);
    z-index: 9999;
    color: #2fc6c0;
  }
  &: hover ${LeftArrow} {
    transition: all 0.3s ease-in-out;
    transform: translate(0px, 0px);
  }
  &: hover ${RightArrow} {
    transition: all 0.3s ease-in-out;
    transform: translate(0px, 0px);
  }
  &: hover ${HorizontalLine} {
    transition: all 0.3s ease-in-out;
    transform: translate(0px, -10px);
  }
  &: hover ${HorizontalLabel} {
    transition: all 0.3s ease-in-out;
    transform: translate(0px, 0px);
  }
  &: hover ${VerticalTopArrow} {
    transition: all 0.3s ease-in-out;
    transform: translate(0px, 0px);
  }
  &: hover ${VerticalBottomArrow} {
    transition: all 0.3s ease-in-out;
    transform: translate(0px, 0px);
  }
  &: hover ${VerticalLine} {
    transition: all 0.3s ease-in-out;
    transform: translate(0px, -10px);
  }
`;

const LIMore = styled.li`
  -webkit-flex-direction: column;
  -moz-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  text-align: center;
  padding: 25px 25px 15px 25px;
  max-width: 27%;
  color: white;
  cursor: pointer;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  margin-top: 20px;
`;

const LiDiv = styled.div`
  display: inline-block;
  position: relative;
  transform-origin: 0 0;
  transition: all 0.3s ease-in-out;
  margin: auto auto 15px auto;
  color: white;
  text-align: center;
  cursor: pointer;
`;

const LiName = styled.span`
  font-size: 1.15em;
  position: relative;
  z-index: 2;
  display: inline-block;
  width: 100%;
  transition: all 0.3s ease-in-out;
`;

const Img = styled.img`
  position: relative;
  z-index: 1;
  display: inline-block;
  max-width: 100%;
  //max-height: 280px;
  transition: all 0.3s ease-in-out;
  box-shadow: rgb(0 0 0 / 40%) 0 23px 24px -12px;
  max-height: 220px !important;
  &:hover {
    transform: translate(0px, -10px);
  }
`;

const GoBack = styled.div`
  position: fixed;
  left: 30px;
  top: 30px;
  font-size: 1.25em;
  cursor: pointer;
  z-index: 15;
`;

const GoBackInner = styled.div`
  outline: none;
  border: none !important;
  color: white;
`;

const GoBackText = styled.div`
  text-align: left;
  line-height: 30px;
  display: inline-block;
  vertical-align: middle;
  padding-left: 7px;
  margin-bottom: 22px;
  &:hover {
    color: #e87855;
  }
`;

const MoreBtn = styled.div`
  color: #e87855;
  border: 1px solid #858585;
  padding: 7px;
  background: transparent;
  outline: none !important;
  padding: 14px;
  border-color: white;
  cursor: pointer;
  &:hover {
    border: 1px solid #e87855;
  }
`;

const MoreText = styled.span`
  font-size: 1.25em;
  color: white;
  text-transform: capitalize;
  font-weight: 300;
  width: 100%;
  transition: all 0.3s ease-in-out;
  position: relative;
  z-index: 2;
`;

const CustomSize = styled.div`
  border: 4px solid #fbfbff;
  display: inline-grid;
  width: 270px;
  height: 250px;
  margin-top: 50px;
  position: relative;
  margin: 25px auto 0;
  cursor: pointer;
  outline: 0 none;
  transform-origin: 0 0;
  &:hover {
    transition: all 0.3s ease-in-out;
    box-shadow: rgb(0 0 0 / 40%) 0 43px 24px -12px;
    transform: translate(0px, -10px);
  }
`;
const Block = styled.div`
  margin-top: 100px;
  color: #e87855;
  position: relative;
  box-sizing: border-box;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
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

//let firstFive:any = [],rest:any = []
export const ChooseSize = () => {
  const classes = useStyles();
  const [firstFive, setFirstFive] = useState([]);
  const [rest, setRest] = useState([]);
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();
  const [widthUnit, setWidthUnit] = useState("px");
  const [heightUnit, setHeightUnit] = useState("px");
  const [isMore, setIsMore] = useState(true);
  const location: any = useLocation();
  useEffect(() => {
    let firstFive: any = [],
      rest: any = [];
    let temp: any = [];
    if (
      location.state.title != "Custom Size" &&
      location.state.data.length < 5
    ) {
      setIsMore(false);
      firstFive = location.state.data;
    } else if (location.state.title != "Custom Size") {
      temp = location.state.data.filter((item: any) => {
        if (item.featuredTemplate !== null) {
          return item;
        }
      });
      firstFive = temp.filter((card: any, index: number) => {
        if (index >= 0 && index < 5) {
          return card;
        }
      });
      rest = temp.filter((card: any, index: number) => {
        if (index >= 5) {
          return card;
        }
      });
    }
    setFirstFive(firstFive);
    setRest(rest);
  }, []);
  return (
    <>
      <DivMainContent>
        <MainTitle>
          <b>{location.state.title}</b>
        </MainTitle>
        <Link to="/dashboard/choose-type">
          {" "}
          <GoBack>
            <GoBackInner>
              <GoBackIcon style={{ height: "35px", width: "35px" }} />
              <GoBackText>Go Back</GoBackText>
            </GoBackInner>
          </GoBack>
        </Link>
        {location.state.title === "Custom Size" ? (
          <MainList>
            <CustomSize></CustomSize>
          </MainList>
        ) : (
          <MainList style={{ listStyle: "none", marginBottom: "30%" }}>
            {firstFive.map((val: any) => {
              return (
                <LI key={val.id}>
                  <Link
                    to={{
                      pathname: "/dashboard/choose-template",
                      state: {
                        title: val.name,
                        parentTitle: location.state.title,
                        id: val.id,
                      },
                    }}
                  >
                    <LiDiv>
                      <HorizontalLine>
                        <HorizontalLabel>{val.displayWidth}</HorizontalLabel>
                        <LeftArrow />
                        <RightArrow />
                      </HorizontalLine>
                      <VerticalLine>
                        <VerticalLabel>{val.displayHeight}</VerticalLabel>
                        <VerticalTopArrow />
                        <VerticalBottomArrow />
                      </VerticalLine>
                      <Img
                        src={`https://templates.designwizard.com/${val.featuredTemplate}.jpg`}
                      />
                    </LiDiv>
                  </Link>
                  <LiName>{val.name}</LiName>
                </LI>
              );
            })}
            {isMore && (
              <LIMore>
                <MoreBtn onClick={() => setIsMore(false)}>
                  <MoreText>More Sizes</MoreText>
                </MoreBtn>
              </LIMore>
            )}
            {!isMore &&
              rest &&
              rest.map((val: any) => {
                return (
                  <LI key={val.id}>
                    <Link to={{ pathname: "/dashboard/choose-template" }}>
                      <LiDiv>
                        <HorizontalLine>
                          <HorizontalLabel>{val.displayWidth}</HorizontalLabel>
                          <LeftArrow />
                          <RightArrow />
                        </HorizontalLine>
                        <VerticalLine>
                          <VerticalLabel>{val.displayHeight}</VerticalLabel>
                          <VerticalTopArrow />
                          <VerticalBottomArrow />
                        </VerticalLine>
                        <Img
                          src={`https://templates.designwizard.com/${val.featuredTemplate}.jpg`}
                        />
                      </LiDiv>
                    </Link>
                    <LiName>{val.name}</LiName>
                  </LI>
                );
              })}
          </MainList>
        )}
        <Form>
          <Block>
            <label>Width: </label>
            <br />
            <input
              type="number"
              value="800"
              id="text"
              style={{
                marginLeft: "6px",
                width: "150px",
                marginRight: "10px",
                padding: "5px",
                border: "1px solid #dc41d3",
                fontSize: "20px",
              }}
              onChange={(e: any) => setWidth(e.target.value)}
            />
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
                width: "50px",
                fontSize: "20px",
                height: "40px",
                marginRight: "10px",
                marginLeft: "-9px",
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
            <label>Height: </label>
            <br />
            <input
              type="number"
              value="600"
              style={{
                marginLeft: "6px",
                width: "150px",
                marginRight: "10px",
                padding: "5px",
                border: "1px solid #dc41d3",
                fontSize: "20px",
              }}
              onChange={(e: any) => setHeight(e.target.value)}
            />
            <NativeSelect
              className={classes.nativeSelect}
              id="demo-customized-select-native"
              value={heightUnit}
              onChange={(e: any) => {
                setHeightUnit(e.target.value);
              }}
              style={{
                color: "#000",
                backgroundColor: "#fff",
                width: "50px",
                fontSize: "20px",
                height: "40px",
                marginLeft: "-9px",
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
            <Link
              to={{
                pathname: "/dashboard/workspace",
                state: {
                  editor: "image",
                  height: height,
                  width: width,
                },
              }}
            >
              <button
                style={{
                  border: "none",
                  color: "white",
                  padding: "10px 25px",
                  textAlign: "center",
                  textDecoration: "none",
                  display: "inline-block",
                  fontSize: "16px",
                  marginLeft: "6px",
                  cursor: "pointer",
                  backgroundColor: "#2fc6c0",
                }}
              >
                Create
              </button>
            </Link>
          </Block>
        </Form>
      </DivMainContent>
      <DivMainContent></DivMainContent>
    </>
  );
};
