import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const OuterDiv = styled(motion.div)`
  z-index: 1050;
  display: block;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  outline: 0;
  transition: opacity 0.15s linear;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 500ms;
`;
const Model = styled.div`
  margin-top: 75px;
  overflow: hidden;
  margin-left: 35%;
  border: 3px solid #2d3559;
  border-radius: 10px;
  position: relative;
  width: 30%;
  pointer-events: none;
`;

const ModalContent = styled.div`
  background-color: white;
  box-shadow: 0 0 50px 0 rgb(0 0 0 / 80%);
  border: none;
  position: relative;
  display: flex;
  flex-direction: column;
  pointer-events: auto;
  background-clip: padding-box;
  outline: 0;
`;

const ConfirmStyled = styled.div`
  outline: none;
`;

const ModalBody = styled.div`
  padding: 40px 50px 40px 50px;
  text-align: center;
  position: relative;
  flex: 1 1 auto;
`;

const ModalBodyOne = styled.h1`
  background: transparent;
  width: 25px;
  height: 25px;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: -10px;
  padding-bottom: 5px;
  border-radius: 50%;
  z-index: 99999;
  opacity: 1;
  transition: background-color 0.25s ease;
  float: right;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  //color: #000;
  text-shadow: 0 1px 0 #fff;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;
const ContentWrapper = styled.div`
  margin-bottom: 30px;
`;
const Textrow = styled.div`
  outline: none;
`;
const Maintext = styled.div`
  text-align: center;
  color: #2d3559;
  font-weight: bold;
`;
const ContentWrappertwo = styled.div`
  margin-bottom: 0;
`;
const Buttonswrapper = styled.div`
  width: 80%;
  margin: auto;
  margin-left: 20%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;
const Buttonwrapperone = styled.div`
  flex: 1;
`;
const Discard = styled.div`
  margin: 0;
  width: 100%;
  cursor: pointer;
`;
const DiscardButton = styled.div`
  min-width: 60px;
  min-height: 45px;
`;
const Discardbuttontext = styled.div`
  padding: 0;
  margin-right: 20px;
`;
const DiscardText = styled.div`
  text-transform: capitalize;
  font-size: 1.5em;
  line-height: 1em;
  display: block;
  font-weight: bold;
  letter-spacing: 1px;

  color: #2d3559 !important;
  outline: none !important;
  border: 1px solid #2d3559 !important;
  padding: 7px;
  background-color: transparent;
  background-image: linear-gradient(
    30deg,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0),
    rgba(13, 13, 13, 0),
    rgba(38, 38, 38, 0)
  );
  transition: border 0.3s ease, background-color 0.3s ease;
  background-image: none !important;
  margi-right: 30px;
`;
const Buttonwrappertwo = styled.div`
  margin-left: 15px;
`;
const Confirm = styled.div`
  margin: 0;
  width: 100%;
  cursor: pointer;
`;
const ConfirmButton = styled.div`
  min-width: 60px;
  min-height: 45px;
  border-radius: 3px;
`;
const ConfirmButtonText = styled.div`
  padding: 0;
  width: 117px;
`;

const ConfirmText = styled.div`
  text-transform: capitalize;
  font-size: 1.5em;
  line-height: 1em;
  display: block;
  font-weight: bold;
  letter-spacing: 1px;

  color: #fbfbff !important;
  outline: none !important;
  border: 1px solid #2d3559 !important;
  padding: 7px;
  background-color: #2d3559;
  background-image: linear-gradient(30deg, #131726, #242b48, #363b6a, #51478c);
  transition: border 0.3s ease, background-color 0.3s ease;
  background-image: none !important;
`;
export const ChangeUploadPopup = (props: any) => {
  return (
    <OuterDiv
      initial={{ opacity: 0, y: 300, scale: 1.3, x: 10 }}
      animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
      transition={{ transition: "linear" }}
    >
      <Model>
        <ModalContent>
          <ConfirmStyled>
            <ModalBody>
              <ModalBodyOne onClick={props.handleClose}>
                <span style={{ color: "#cbcbd0" }}>x</span>
              </ModalBodyOne>
              <ContentWrapper>
                <Textrow>
                  <Maintext>
                    <span style={{ fontSize: "1.9em" }}>
                      Do you wish to save your Design?
                    </span>
                    <br />
                    <br />
                    <span style={{ fontSize: "1.3em" }}>
                      Your saved designs will be stored in <em>My Designs</em>
                    </span>
                  </Maintext>
                </Textrow>
              </ContentWrapper>

              <ContentWrappertwo>
                <Buttonswrapper>
                  <Buttonwrapperone>
                    <Discard onClick={() => props.confirmation("discard")}>
                      <DiscardButton>
                        <Discardbuttontext>
                          <DiscardText>Discard</DiscardText>
                        </Discardbuttontext>
                      </DiscardButton>
                    </Discard>
                  </Buttonwrapperone>
                  <Confirm onClick={() => props.confirmation("save")}>
                    <ConfirmButton>
                      <ConfirmButtonText>
                        <ConfirmText>Save</ConfirmText>
                      </ConfirmButtonText>
                    </ConfirmButton>
                  </Confirm>
                  <Buttonwrappertwo></Buttonwrappertwo>
                </Buttonswrapper>
              </ContentWrappertwo>
            </ModalBody>
          </ConfirmStyled>
        </ModalContent>
      </Model>
    </OuterDiv>
  );
};
