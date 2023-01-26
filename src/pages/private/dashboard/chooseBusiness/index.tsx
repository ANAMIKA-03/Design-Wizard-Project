import styled from "styled-components";
import { SystemPref } from "../../../../lib/contexts/Queries";
import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
//import { data } from "cypress/types/jquery";

const HeadOne = styled.h1`
  color: #2d3559;
  font-size: 2.6em;
  font-weight: bolder;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
  line-height: 1.2;
  margin-top: 150px;
`;
const HeadWrap = styled.div`
  box-sizing: border-box;
  color: #4a5793;
  text-align: center;
  font-size: 16px;
  font-family: "Lato", sans-serif !important;
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;
const Button = styled.button`
  height: 55px;
  max-height: 5vw;
  font-size: 1.4vw;
  border: 0.3vw solid #fbfbff;
  background-color: #f8f9fa;
  color: #4a5793;
  border-radius: 6px;
  min-height: 3vw;
  width: 23%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5px;
  margin: 15px 0;
  transition: border 0.3s ease, color 0.3s ease;
  font-weight: bolder;
  box-sizing: border-box;
  box-shadow: 0 6px 12px 0 rgb(0 0 0 / 6%), 0 13px 13px 0 rgb(0 0 0 / 8%),
    0 20px 15px 0 rgb(0 0 0 / 4%);
  font-family: "Lato", sans-serif !important;
  cursor: pointer;
  &:hover {
    border: 4px solid #00c9a3;
    background-color: #e9fbf8;
    color: #36907d;
  }
`;
const MainDiv = styled.div`
  color: #4a5793;
  text-align: center;
  background-color: #f8f9fa;
  overflow-y: auto;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  font-size: 16px;
  font-family: "Lato", sans-serif !important;
`;
//   const SecondDiv=styled.div`
//   font-weight: 400;
//     line-height: 1.5;
//     font-size: 16px;
//     -webkit-text-size-adjust: 100%;
//     -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
// `;
// width: 65% !important;
//    background-color: #f8f9fa;
//    font-size: 16px;
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: space-between;
//     font-weight: bolder
//     margin-left:"20%"
//   //margin-top:0
//   textDecoration: 'none
const StyledLink = styled.div`
  width: 65% !important;
  background-color: #f8f9fa;
  font-size: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-weight: bold;
  font-family: "Lato", sans-serif !important;
  margin-left-: 17%;
`;

//   const ButtonWrap = styled.div`
//   width: 65% !important;
//   background-color:#f8f9fa;
//   font-size: 16px;
//    display: flex;
//    flex-wrap: wrap;
//    justify-content:space-between;
//   font-weight:bolder;
//   font-family:'Lato',sans-serif !important;
//    margin-left:auto;
// `;

export const ChooseBusiness = () => {
  const history = useHistory();
  const [pref, prefData] = useMutation(SystemPref);
  const [prdata, setPrdata] = useState("");
  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current) {
      handleClick();
    } else {
      isMounted.current = true;
    }
  }, [prdata]);

  const handleClick = async () => {
    const data = await pref({
      variables: {
        input: JSON.stringify({
          preferences: {
            segmentsSelectedByUser: prdata,
          },
        }),
        token: `${localStorage.getItem("token")}`,
      },
    });
    if (prefData.loading) return <>"loading..."</>;
    if (prefData.error) return <>`Error! ${prefData.error.message}`</>;
    else {
      history.push("/dashboard/choose-type");
      console.log(data);
    }
  };
  return (
    <MainDiv>
      <HeadWrap>
        <HeadOne>
          Choose the one that best describes{" "}
          <span
            style={{
              color: "#7d6cc2",
              textDecorationLine: "grammarError",
              textDecorationThickness: "0.01em",
            }}
          >
            you
          </span>
        </HeadOne>
      </HeadWrap>
      {/* <ButtonWrap> */}
      <StyledLink style={{ marginLeft: "17%" }}>
        <Button onClick={() => setPrdata("Large Business")}>
          {" "}
          <span> Large Business</span>
        </Button>
        <Button onClick={() => setPrdata("Medium Business")}>
          Medium Business
        </Button>
        <Button onClick={() => setPrdata("Small Business")}>
          Small Business
        </Button>
        <Button onClick={() => setPrdata("Entrepreneur")}>Entrepreneur</Button>
        <Button onClick={() => setPrdata("Personal")}>Personal</Button>
        <Button onClick={() => setPrdata("Student")}>Student </Button>
        <Button onClick={() => setPrdata("Teacher")}>Teacher</Button>
        <Button onClick={() => setPrdata("Non-Profit")}>Non-Profit</Button>
      </StyledLink>
      {/* </ButtonWrap> */}
    </MainDiv>
  );
};
