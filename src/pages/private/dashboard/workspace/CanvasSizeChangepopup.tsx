import React from "react";
import styled from "styled-components";

const Modalwindow = styled.div`
  z-index: 1050;
  display: block;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  display: none;
  width: 100%;
  height: 100%;
  overflow: hidden;
  outline: 0;
`;

const Modalialog = styled.div`
  -webkit-transform: none;
  transform: none;
  transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;
  margin-top: 75px;
  overflow: hidden;
  border: 3px solid #2d3559;
  border-radius: 10px;
  max-width: 500px;
  margin: 1.75rem auto;
  position: relative;
  width: auto;
  margin: 0.5rem;
  pointer-events: none;
`;

const Modalcontent = styled.div`
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

const Modal = styled.div`
  outline: none;
  box-sizing: border-box;
`;

const Modalheader = styled.div`
  display: none;
  position: relative;
  padding: 15px;
  border-bottom: none;
  align-items: center;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: start;
  align-items: flex-start;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 1rem 1rem;
  border-bottom: 1px solid #dee2e6;
  border-top-left-radius: calc(0.3rem - 1px);
  border-top-right-radius: calc(0.3rem - 1px);
`;

const Button = styled.div`
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
  transition: background-color 0.25s ease;
  top: 20px;
  right: 20px;
  padding: 1rem 1rem;
  margin: -1rem -1rem -1rem auto;
`;

const Modaltitle = styled.div`
  font-size: 1.425em;
  color: #11243b;
  font-weight: 400;
  text-align: center;
  margin: 0 auto;
  line-height: 1.5;
`;

const Modalbody = styled.div`
  padding: 40px 50px 40px 50px;
  text-align: center;
  position: relative;
  position: relative;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 1rem;
`;

const Contentwrapper = styled.div`
  margin-bottom: 0;
`;

const Textrow = styled.div`
  outline: none;
`;

const Maintext = styled.div`
  text-align: center;
  color: #2d3559;
  font-weight: bold;
`;

const Modalfooter = styled.div`
  margin-top: -40px;
  text-align: center;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: end;
  justify-content: flex-end;
  padding: 0.75rem;
  border-top: 1px solid #dee2e6;
  border-bottom-right-radius: calc(0.3rem - 1px);
  border-bottom-left-radius: calc(0.3rem - 1px);
  border-top: none;
`;

const Buttons = styled.div`
  width: 100%;
  width: 80%;
  margin: 20px auto 40px auto;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: -ms-flex;
  display: flex;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  -ms-justify-content: center;
  justify-content: center;
`;

const ButtonOne = styled.div`
  flex: unset;
  min-width: 180px;
  display: inline-block;
`;

const Cancel = styled.div`
  margin: 0;
  width: 100%;
  cursor: pointer;
  position: relative !important;
  margin-left: 3px;
`;

const Wbmbutton = styled.div`
  min-width: 60px;
  min-height: 45px;
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
`;

const Buttontext = styled.div`
  padding: 0;
  text-align: center;
  padding-left: 0;
  text-align: left;
  line-height: 30px;
  margin-left: 5px;
  display: inline-block;
  vertical-align: middle;
  z-index: 22;
`;

const Line0 = styled.div`
  text-transform: unset;
  font-size: 1.5em;
  line-height: 1em;
  display: block;
  font-weight: bold;
  letter-spacing: 1px;
`;

const Buttonwrapper = styled.div`
  margin-left: 15px;
  flex: unset;
  min-width: 180px;
`;

const ButtonwrapperBody = styled.div`
  margin: 0;
  width: 100%;
  cursor: pointer;
  position: relative;
  margin-left: 5px;
`;

const WbmbuttonOne = styled.div`
  min-width: 60px;
  min-height: 45px;
  color: #fbfbff !important;
  outline: none !important;
  border: 1px solid #2d3559 !important;
  padding: 7px;
  background-color: #2d3559;
  background-image: linear-gradient(30deg, #131726, #242b48, #363b6a, #51478c);
  transition: border 0.3s ease, background-color 0.3s ease;
  background-image: none !important;
`;

const ButtontextOne = styled.div`
  padding: 0;
  text-align: center;
  padding-left: 0;
  line-height: 30px;
  margin-left: 5px;
  display: inline-block;
  vertical-align: middle;
  z-index: 22;
`;

const Line0One = styled.div`
  text-transform: unset;
  font-size: 1.5em;
  line-height: 1em;
  display: block;
  font-weight: bold;
  letter-spacing: 1px;
`;

export const CanvasSizeChangepopup = (props: any) => {
  return (
    <div>
      <Modalwindow>
        <Modalialog>
          <Modalcontent>
            <Modal>
              <Modalheader>
                <Button></Button>
                <Modaltitle></Modaltitle>
              </Modalheader>

              <Modalbody>
                <Contentwrapper>
                  <Textrow>
                    <Maintext>
                      <span style={{ fontSize: "1.5em", display: "block" }}>
                        Would you like to change the canvas size?
                      </span>
                    </Maintext>
                  </Textrow>
                </Contentwrapper>
              </Modalbody>

              <Modalfooter>
                <Buttons>
                  <ButtonOne>
                    <Cancel>
                      <Wbmbutton>
                        <Buttontext>
                          <Line0>Load onClick={props.handleClose} </Line0>
                          <span style={{ fontSize: ".7em" }}>
                            (Instagram image)
                          </span>
                        </Buttontext>
                      </Wbmbutton>
                    </Cancel>
                  </ButtonOne>

                  <Buttonwrapper>
                    <ButtonwrapperBody>
                      <WbmbuttonOne>
                        <ButtontextOne>
                          <Line0One>
                            Keep current
                            <span style={{ fontSize: ".7em" }}>
                              (Twitter post)
                            </span>
                          </Line0One>
                        </ButtontextOne>
                      </WbmbuttonOne>
                    </ButtonwrapperBody>
                  </Buttonwrapper>
                </Buttons>
              </Modalfooter>
            </Modal>
          </Modalcontent>
        </Modalialog>
      </Modalwindow>
    </div>
  );
};
