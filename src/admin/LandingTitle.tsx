import React from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";

const MainDiv = styled.div`
  height: 100%;
  background: #e8e8e8;
  overflow-x: auto;
`;
const Header = styled.div`
  width: 90%;
  color: #11243b;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 10px;
  letter-spacing: 2px;
  padding-left: 150px;
  background-repeat: no-repeat;
  line-height: 88px;
  vertical-align: middle;
  position: relative;
  font-family: Lato;
  height: 87px;
  fontfamily: Lato;
`;

const Contain = styled.div`
  width: 20%;
  height: 85%;
  box-sizing: border-box;
  padding: 0 10px 0 10px;
  border-right: 1px solid #5d5e63;
  float: left;
`;
const Containtext = styled.div`
  position: relative;
  font-size: 20px;
`;
const Tab = styled.div`
  color: #11243b;
  margin: 10px 0;
`;
const Button = styled.div`
  width: 80px;
  height: 30px;
  border: 1px solid #e87855;
  opacity: 0.5;
  background: transparent;
  color: #e87855;
  transition: 0.3s ease-out;
  margin-right: 10px;
  text-align: center;
  padding-top: 5px;
  float: left;
  &:hover {
    color: #e87855;
    opacity: 1;
  }
`;
const Buttons = styled.div``;
const Form = styled.div``;
const Top = styled.div``;

const ButtonSearch = styled.div`
  width: 70px;
  height: 25px;
  border: 1px solid #592e6f;
  opacity: 0.5;
  background: transparent;
  color: #592e6f;
  transition: 0.3s ease-out;
  float: right;
  margin: 6px 4px 10px 0;
  padding-top: 5px;
  text-align: center;
  &:hover {
    color: #592e6f;
    opacity: 1;
  }
`;
const Bottom = styled.div`
  width: 100%;
  height: 78%;
  overflow-x: hidden;
  border: 1px solid #5d5e63;
`;
const LeftSide = styled.div`
  position: relative;
  border: 1px solid #5d5e63;
  width: 38%;
  margin: 0 10px;
  float: left;
  box-sizing: border-box;
`;
const Title = styled.div`
    color: #11243b;
    text-align: center;
    position: relative;
    font-size: 32px;
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
}
`;
const End = styled.div`
  height: 74vh;
  overflow-x: hidden;
  margin-bottom: 0;
  padding: 10px;
`;
const FooterText = styled.text`
  color: #232428;
  font-size: 11.2px;
  opacity: 0.3;
  margin-left: 5px;
`;

export const LandingTitle = (props: any) => {
  return (
    <MainDiv style={{ height: "100%" }}>
      <Header style={{ fontSize: "32px" }}>
        <Top>Landing Pages JSON Creator</Top>
      </Header>
      <Contain>
        <Containtext>
          <span>Currently </span>
          <span>Creating:{props.name}</span>
        </Containtext>
        <Tab>
          Tab:
          <TextField
            style={{
              outline: "0 none",
              color: "#dedfe1",
              background: "#5d5e63",
              border: "1px solid #82848b",
              width: "50%",
              marginTop: "5px",
              height: "30px",
            }}
          />
        </Tab>
        <Buttons>
          <Button>Save</Button>
          <Button>Cancle</Button>
        </Buttons>
        <Form>
          <TextField
            placeholder="Search..."
            style={{
              position: "relative",
              width: "87%",
              height: "30px",
              paddingLeft: " 5px",
              margin: "15px 10px 10px 0",
              color: "black",
              background: " white",
              border: "1px solid #ccc",
            }}
          />
          <TextField
            style={{
              position: "relative",
              width: "60%",
              height: "30px",
              paddingLeft: "5px",
              margin: "5px 10px 15px 0",
              color: "black",
              background: " white",
              border: "1px solid #ccc",
            }}
          />
          <ButtonSearch>Search</ButtonSearch>
        </Form>
        <Bottom></Bottom>
      </Contain>
      <LeftSide>
        <Title>
          Print templates
          <span
            style={{
              position: "absolute",
              right: "50px",
              fontSize: "25px",
              color: "#000",
            }}
          >
            total:0
          </span>
        </Title>
        <End></End>
      </LeftSide>
      <LeftSide>
        <Title>
          Print templates
          <span
            style={{
              position: "absolute",
              right: "50px",
              fontSize: "25px",
              color: "#000",
            }}
          >
            total:0
          </span>
        </Title>
        <End></End>
      </LeftSide>
      <FooterText>
        Copyright © 2022 Wavebreak Media. All rights reserved.
      </FooterText>
    </MainDiv>
  );
};
