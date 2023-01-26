import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import fb from "../../../assets/ezgif.com-gif-maker.gif";
import AlertDialog from "./sizePopup";
import OtherViews from "./otherViews";
import { motion, AnimatePresence } from "framer-motion";
const HomeSectionDiv = styled.ul`
  margin: 0;
`;
const DivLiFormate = styled.li`
  list-style: none;
  display: inline-block;
  width: 15%;
  margin-right: 1.66%;
  color: #fff;
`;
const PlusIcon = styled.div`
  font-size: 34px;
  display: inline-block;
  border: 1px solid #fbfbff;
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: auto;
  display: block;
  text-align: center;
  &:hover {
    color: aqua;
    border: 1px solid aqua;
  }
`;
const TextTitle = styled.h1`
  color: #e87855;
  margin: 0px 10px 0 0px;
  font-size: 28px;
  font-weight: 500;
  font-family: "Lato", sans-serif;
`;

const TextHyperLink = styled.a`
  display: block;
  font-size: 12px;
  color: #fff;
  text-decoration: underline;
  cursor: pointer;
  margin: 5px 0 0 2px;
  outline: 0 none;
`;

const ItemNameInfo = styled.p`
  color: #fff;
  margin: 10px 0 0;
  text-align: center;
  position: relative;
  z-index: 2;
  will-change: color;
  font-size: 14px;
  font-family: "Lato", sans-serif;
  transition: color 0.3s linear;
  &:hover {
    color: aqua;
  }
`;

const NewFeature = styled.img`
  width: 90%;
  height: 100px;
  margin: auto;
  display: block;
  transition: all 0.3s ease-in-out;
  box-shadow: rgb(0 0 0 / 40%) 0 23px 24px -12px;
  &:hover {
    transition: all 0.3s ease-in-out;
    box-shadow: rgb(0 0 0 / 40%) 0 43px 24px -12px;
    transform: translate(0, -10px);
  }
`;
const DynamicImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  vertical-align: middle;
  border-style: none;
  //margin: auto;
  //display: block;
  top: 0;
  left: 0;
  transition: all 0.3s ease-in-out;
  box-shadow: rgb(0 0 0 / 40%) 0 23px 24px -12px;
`;
const CoustomImage = styled.div`
  width: 90%;
  height: 100px;
  margin: auto;
  display: block;
  transition: all 0.3s ease-in-out;
  background-repeat: repeat;
  background-size: 12px !important;
  background-image: url(https://app.designwizard.com/images/transparent-image-ps.png);
  &:hover {
    transition: all 0.3s ease-in-out;
    box-shadow: rgb(0 0 0 / 40%) 0 43px 24px -12px;
    transform: translate(0, -10px);
  }
`;
const CoustomImageShade = styled.div`
  width: 100%;
  height: 100px;
  margin: auto;
  display: block;
  color: #592e6f;
  background: radial-gradient(
    ellipse at center,
    rgba(255, 255, 255, 0.8) 30%,
    rgba(255, 255, 255, 0) 100%
  );
  transition: all 0.3s ease-in-out;
  box-shadow: rgb(0 0 0 / 40%) 0 23px 24px -12px;
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
  top: -10px;
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
  right: -10px;
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
const LiDiv = styled.div`
  display: inline-block;
  position: relative;
  width: 75%;
  height: 0px;
  transform-origin: 0 0;
  transition: all 0.3s ease-in-out;
  margin: 25px auto 0;
  color: white;
  text-align: center;
  cursor: pointer;
  &:hover {
    transition: all 0.3s ease-in-out;
    box-shadow: rgb(0 0 0 / 40%) 0 43px 24px -12px;
    transform: translate(0, -10px);
  }
`;

export default function DefaultViews(props: any) {
  const [show, setShow] = useState(true);
  const [defaultCoverBoxes, setDefaultCoverBoxes] = useState([] as any);
  const updateCoverBoxes: any = (data: any) => {
    let newValue = [...data];
    setDefaultCoverBoxes(newValue);
  };
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        key="homePage"
        transition={{ delay: 0.3 }}
      >
        <HomeSectionDiv>
          {show ? (
            <div>
              <DivLiFormate>
                <div style={{ height: "10px" }}></div>
                <TextTitle>Your sizes:</TextTitle>
                <TextHyperLink style={{ marginBottom: "10%" }}>
                  <AlertDialog
                    updateCoverBoxes={(data: any) => updateCoverBoxes(data)}
                    getData={props.getData}
                  />
                </TextHyperLink>
              </DivLiFormate>
              <DivLiFormate>
                <Link
                  to={{
                    pathname: "/dashboard/workspace",
                    state: { editor: "video" },
                  }}
                >
                  <NewFeature src={fb} />
                </Link>
                <ItemNameInfo> Video </ItemNameInfo>
              </DivLiFormate>
              {defaultCoverBoxes.map((data: any) => {
                return (
                  <DivLiFormate key={data.id}>
                    <Link
                      to={{
                        pathname: "/dashboard/workspace",
                        state: {
                          editor: "image",
                          height: data.height,
                          width: data.width,
                          title: data.name,
                          id: data.id,
                        },
                      }}
                    >
                      <LiDiv
                        style={{
                          paddingBottom: `${
                            data.width > data.height
                              ? (data.height / data.width) * 75
                              : 75
                          }%`,
                          width: `${
                            data.width >= data.height
                              ? 75
                              : (data.width / data.height) * 75
                          }%`,
                          marginLeft: `${(data.height / data.width) * 12}%`,
                          //  marginRight:`${data.width >= data.height?"auto": ((data.width / data.height)*75 )}%`
                        }}
                      >
                        <HorizontalLine>
                          <HorizontalLabel>{data.displayWidth}</HorizontalLabel>
                          <LeftArrow />
                          <RightArrow />
                        </HorizontalLine>
                        <VerticalLine>
                          <VerticalLabel>{data.displayHeight}</VerticalLabel>
                          <VerticalTopArrow />
                          <VerticalBottomArrow />
                        </VerticalLine>
                        <DynamicImage
                          src={`${
                            process.env.REACT_APP_S3_REDIRECT
                          }/composer.templates.thumbs/${
                            data.featuredTemplate !== null
                              ? data.featuredTemplate
                              : "2a005420-57f8-11e7-a691-8137a121c2f2"
                          }.jpg`}
                        />
                      </LiDiv>
                    </Link>
                    <ItemNameInfo>{data.name}</ItemNameInfo>
                  </DivLiFormate>
                );
              })}
              {/* <DivLiFormate>
        <Link to="/dashboard/workspace">
        </Link>
        <ItemNameInfo> Facebook cover </ItemNameInfo>
      </DivLiFormate> */}
              <DivLiFormate onClick={() => setShow(!show)}>
                <CoustomImage>
                  <CoustomImageShade />
                </CoustomImage>
                <ItemNameInfo> Custom size </ItemNameInfo>
              </DivLiFormate>
              <DivLiFormate>
                <Link
                  style={{ textDecoration: "none", color: "#ffffff" }}
                  to="/dashboard/choose-type"
                >
                  <PlusIcon> + </PlusIcon>
                  <ItemNameInfo> MORE SIZES</ItemNameInfo>
                </Link>
              </DivLiFormate>
            </div>
          ) : (
            <OtherViews />
          )}
        </HomeSectionDiv>
      </motion.div>
    </AnimatePresence>
  );
}
