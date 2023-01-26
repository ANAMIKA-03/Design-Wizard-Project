import styled from "styled-components";
import React from "react";
import { motion } from "framer-motion";
const Overlay = styled(motion.div)`
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 20;
`;
const MainDiv = styled.div`
  transform: translateY(-50%) scale(0.9) !important;
  top: 50%;
  margin-top: 0;
  margin-left: 36%;
  margin_right: auto;
  right: 0;
  left: 0;
  position: absolute;
  overflow: hidden;
  max-width: 500px;
  //width: auto;
  display: block;
  visibility: hidden;
  opacity: 0;

  // z-index: 100;
`;
const PopupBox = styled.div`
background-color: white;
box-shadow: 0 0 50px 0 rgb(0 0 0 / 80%);
border: 3px solid #2d3559;
border-radius: 10px;
margin-top:0%;
margin-bottom:30%
position: relative;
display: flex;
flex-direction: column;
    width: 80%;
    pointer-events: auto;
    background-clip: padding-box;
    outline: 0;
    font-size: 16px;

`;
const PlanBox = styled.div`
  margin-bottom: 20px;
  text-align: center;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  display: block;
`;
const HeadOne = styled.h1`
  color: #2d3559;
  font-weight: bold;
  font-family: Arial !important;
  font-size: 1.8em;
  margin: 0 0 18px 0;
  line-height: 1.5;
  text-align: center;
`;
const Cross = styled.h1`
  // margin-top:0;
  // margin-bottom:0;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 0;
  border-radius: 50%;
  z-index: 99999;
  opacity: 1;
  //transition: background-color .25s ease;
  padding: 0;
  border: 0;
  float: right;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  color: "grey";
  text-shadow: 0 1px 0 #fff;
  margin: 70px auto;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  width: 30%;
  position: relative;
  transition: all 5s ease-in-out;
  margin: 0;
  &:hover {
    transition: background-color 0.25s ease;
  }
`;

const Box = styled.div`
  position: relative;
  flex: 1 1 auto;
  ont-family: Arial !important;
  padding: 40px 60px 40px 60px;
  background-color: white;
  display: block;
`;
const DiscardSavePopup = (props: any) => {
  const closeHandler = (e: any) => {
    props.onClose(false);
  };
  return (
    <Overlay
      initial={{ opacity: 0, y: 300, scale: 1.3, x: 10 }}
      animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
      transition={{ transition: "linear" }}
    >
      <MainDiv>
        <PopupBox>
          <Box>
            <Cross>
              <span onClick={closeHandler}>&times;</span>
            </Cross>
            <PlanBox>
              <HeadOne>Activate your account</HeadOne>
            </PlanBox>
          </Box>
        </PopupBox>
      </MainDiv>
    </Overlay>
  );
};
export default DiscardSavePopup;
