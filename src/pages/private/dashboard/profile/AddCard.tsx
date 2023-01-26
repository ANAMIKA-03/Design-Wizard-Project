import React from "react";
import styled from "styled-components";
import { ReactComponent as Cross } from "../../../../assets/svg/New folder/cross.svg";

const PopupBox = styled.div`
  position: fixed;
  background: #00000050;
  width: 100%;
  height: 100vh;
  top: 60px;
  left: 0;
  z-index: 999;
`;
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
const ModalContentTwo = styled.div``;

const ModalBody = styled.div`
  position: relative;
  text-align: left;
  transition: opacity 0.3s ease;
  padding: 40px 50px 40px 50px;
`;

const Close = styled.div`
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
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;

const Content = styled.div`
  margin-bottom: 30px;
`;

const Text = styled.div`
  outline: none;
`;
const Maintext = styled.div`
  text-align: center;
  color: #2d3559;
  font-weight: bold;
`;

const ContentTwo = styled.div`
  margin-bottom: 30px;
`;
const PaymentForm = styled.div`
  outline: none;
`;
const Cardnumbergroup = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;
const LabelOne = styled.div`
  padding-top: calc(0.375rem + 1px);
  padding-bottom: calc(0.375rem + 1px);
  margin-bottom: 0;
  font-size: inherit;
  line-height: 1.5;
  display: inline-block;
  margin-bottom: 0.5rem;
`;

const CardNumberInput = styled.input`
  padding-right: 51px;
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  border-radius: 0 !important;
  -webkit-border-radius: 0 !important;
  -moz-border-radius: 0 !important;
`;
const ContentThree = styled.div`
  margin-bottom: 30px;
`;

const Buttons = styled.div`
  width: 80%;
  margin: auto;
  margin-top: 20px;
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

const CancelButton = styled.div`
  flex: 1;
`;

const SecondRow = styled.div`
  display: flex;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
`;
const FormGroupOne = styled.div`
  flex: 1;
  margin-bottom: 1rem;
`;
const LableTwo = styled.div`
  padding-top: calc(0.375rem + 1px);
  padding-bottom: calc(0.375rem + 1px);
  margin-bottom: 0;
  font-size: inherit;
  line-height: 1.5;
  display: inline-block;
`;
const FlexContainer = styled.div`
  display: -ms-flex;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  background-position: 100% 50%;
  background-repeat: no-repeat;
`;

const ExpYear = styled.select`
  -webkit-flex: 1;
  -moz-flex: 1;
  -ms-flex: 1;
  flex: 1;
  margin-right: 5px;
  height: 38px;
  border: 1px solid #ced4da;
`;
const CCExpYear = styled.select`
  margin-right: 15px;
  -webkit-flex: 1;
  -moz-flex: 1;
  -ms-flex: 1;
  flex: 1;
  border: 1px solid #ced4da;
`;
const FormGroupTwo = styled.div`
  flex: 1;
  margin-bottom: 1rem;
`;

const LableThree = styled.div`
  padding-top: calc(0.375rem + 1px);
  padding-bottom: calc(0.375rem + 1px);
  margin-bottom: 0;
  font-size: inherit;
  line-height: 1.5;
  display: inline-block;
`;

const CvvInput = styled.input`
  flex: 1;
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

const Button = styled.div`
  margin: 0;
  width: 100%;
  cursor: pointer;
`;

const Wbmbutton = styled.div`
  min-width: 60px;
  min-height: 25px;
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

const SubmitButton = styled.div`
  margin-left: 15px;
`;

const ButtonOne = styled.div`
  margin: 0;
  width: 100%;
  cursor: pointer;
`;
const WbmbuttonOne = styled.div`
  min-width: 139px;
  min-height: 25px;
  color: #fbfbff !important;
  outline: none !important;
  border: 1px solid #2d3559 !important;
  padding: 7px;
  background-color: #2d3559;
  background-image: linear-gradient(30deg, #131726, #242b48, #363b6a, #51478c);
  transition: border 0.3s ease, background-color 0.3s ease;
  background-image: none !important;
`;

const Buttontext = styled.div`
  padding: 0px;
  text-align: center;
`;
export const AddCard = (props: any) => {
  return (
    <PopupBox>
      <ModalContent style={{ width: "30%", marginLeft: "36%", height: "53%" }}>
        <ModalContentTwo>
          <ModalBody>
            <Close onClick={props.handleClose}>
              <Cross></Cross>
            </Close>
            <Content>
              <Text>
                <Maintext>
                  <span style={{ fontSize: "1.9em" }}>Add card</span>
                </Maintext>
              </Text>
            </Content>

            <ContentTwo>
              <PaymentForm>
                <Cardnumbergroup>
                  <LabelOne>Card number</LabelOne>
                  <CardNumberInput
                    type="number"
                    placeholder="Card Number"
                  ></CardNumberInput>
                </Cardnumbergroup>

                <SecondRow>
                  <FormGroupOne>
                    <LableTwo>Expiry date</LableTwo>
                    <FlexContainer>
                      <ExpYear>
                        <option></option>
                        <option>01</option>
                        <option>02</option>
                        <option>03</option>
                        <option>04</option>
                        <option>05</option>
                        <option>06</option>
                        <option>07</option>
                        <option>08</option>
                        <option>09</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                      </ExpYear>
                      <CCExpYear>
                        <option></option>
                        <option>2022</option>
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                        <option>2026</option>
                        <option>2027</option>
                        <option>2028</option>
                        <option>2029</option>
                        <option>2030</option>
                        <option>2031</option>
                        <option>2032</option>
                        <option>2033</option>
                        <option>2034</option>
                        <option>2035</option>
                        <option>2036</option>
                        <option>2037</option>
                      </CCExpYear>
                    </FlexContainer>
                  </FormGroupOne>

                  <FormGroupTwo>
                    <LableThree>CVV</LableThree>
                    <CvvInput placeholder="CVV"></CvvInput>
                  </FormGroupTwo>
                </SecondRow>
              </PaymentForm>
            </ContentTwo>

            <ContentThree>
              <Buttons>
                <CancelButton>
                  <Button></Button>
                  <Wbmbutton
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      props.handleClose();
                    }}
                  >
                    <Buttontext>
                      <span>Cancel</span>
                    </Buttontext>
                  </Wbmbutton>
                </CancelButton>

                <SubmitButton>
                  <ButtonOne></ButtonOne>
                  <WbmbuttonOne>
                    <Buttontext>
                      <span style={{}}>Submit</span>
                    </Buttontext>
                  </WbmbuttonOne>
                </SubmitButton>
              </Buttons>
            </ContentThree>
          </ModalBody>
        </ModalContentTwo>
      </ModalContent>
    </PopupBox>
  );
};
