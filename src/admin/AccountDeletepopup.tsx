import React from "react";
import styled from "styled-components";
import { ReactComponent as Cross } from "../assets/svg/New folder/cross.svg";

const Modal = styled.div`
  transform: none;
  transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;
  margin-top: 75px;
  overflow: hidden;
  border: 3px solid #2d3559;
  border-radius: 10px;
  position: fixed;
  z-index: 999;
  width: 30%;
  left: 35%;
  top: 0px;
`;
// const PopupBox = styled.div`
//   position: fixed;
//   background: #00000050;
//   width: 100%;
//   height: 100vh;
//   top: 60px;
//   left: 0;
//   z-index: 999;
// `;
const ModalContent = styled.div`
  background-color: white;
  box-shadow: 0 0 50px 0 rgb(0 0 0 / 80%);
  border-radius: 0;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border: none;
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  outline: 0;
`;
const ModalHeader = styled.div`
  position: relative;
  padding: 15px;
  border-bottom: none;
  align-items: center;
  display: flex;
  -ms-flex-align: start;
  align-items: flex-start;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 1rem 1rem;
  border-top-left-radius: calc(0.3rem - 1px);
  border-top-right-radius: calc(0.3rem - 1px);
`;
const CancelBtn = styled.div`
background: transparent;
    width: 25px;
    height: 25px;
    border-radius: 25px;
    -webkit-border-radius: 25px;
    -moz-border-radius: 25px;
    position: relative;
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 10px;
    border-radius: 50%;
    z-index: 99999;
    opacity: 1;
    transition: background-color .25s ease;
    top: 20px;
    right: 20px;
}
`;
const Heading = styled.div`
  font-size: 1.425em;
  color: #11243b;
  font-weight: 400;
  text-align: center;
  margin: 0 auto;
  line-height: 1.5;
`;
const ModalBody = styled.div`
  position: relative;
  flex: 1 1 auto;
  padding: 1rem;
`;
const Para = styled.div`
  margin-top: 0;
  margin-bottom: 1rem;
`;
const ModalFooter = styled.div`
  border-top: none;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: end;
  justify-content: flex-end;
  padding: 0.75rem;
  border-bottom-right-radius: calc(0.3rem - 1px);
  border-bottom-left-radius: calc(0.3rem - 1px);
`;
const NoButton = styled.button`
  position: relative !important;
  margin-left: 3px;
  cursor: pointer;
  height: 30px;
  right: 5px;
`;
const NoButtonOne = styled.div`
  background: transparent;
  opacity: 1 !important;
  border: 1px solid transparent;
  z-index: 9999999999;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  transition: all 0.2s ease-in-out;
  -webkit-backface-visibility: hidden;
  animation-play-state: paused;
  animation-iteration-count: infinite;
  animation-duration: 0.3s;
  -webkit-animation-name: bounceInJ;
  animation-name: bounceInJ;
  -webkit-animation-duration: 0.75s;
  animation-duration: 0.75s;
`;
const YesButton = styled.button`
  position: relative;
  margin-left: 5px;
  cursor: pointer;
  height: 30px;
`;
const YesButtonOne = styled.div`
  background: transparent;
  opacity: 1 !important;
  border: 1px solid transparent;
  z-index: 9999999999;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  transition: all 0.2s ease-in-out;
  -webkit-backface-visibility: hidden;
  animation-play-state: paused;
  animation-iteration-count: infinite;
  animation-duration: 0.3s;
  -webkit-animation-name: bounceInJ;
  animation-name: bounceInJ;
  -webkit-animation-duration: 0.75s;
  animation-duration: 0.75s;
`;
export const AccountDeletepopup = (props: any) => {
  return (
    <div>
      {/* <PopupBox> */}
      <Modal>
        <ModalContent>
          <ModalHeader>
            <CancelBtn onClick={props.handleClose}>
              <Cross></Cross>
            </CancelBtn>
            <Heading>Confirm</Heading>
          </ModalHeader>
          <ModalBody>
            <Para>Do you wish to delete this user?</Para>
          </ModalBody>
          <ModalFooter>
            <NoButton
              onClick={() => {
                props.confirmation(false);
                props.handleClose();
              }}
            >
              NO
              <NoButtonOne></NoButtonOne>
            </NoButton>
            <YesButton
              onClick={() => {
                props.confirmation(true);
                props.handleClose();
              }}
            >
              YES
              <YesButtonOne></YesButtonOne>
            </YesButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* </PopupBox> */}
    </div>
  );
};
