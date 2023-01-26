import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, Link, useHistory } from "react-router-dom";
import { ReactComponent as GoBackIcon } from "../../../../assets/svg/simpleArrow.svg";
import { ReactComponent as SearchIcon } from "../../../../assets/svg/search.svg";
import { useMutation } from "@apollo/client";
import { TemplateSearch } from "../../../../lib/contexts/Queries";

const DivMainContent = styled.div`
  background: #493652ad;
  background: url(https://app.designwizard.com/images/staticTemplatesBackground.jpg);
  width: 100%;
  margin-top: 0;
  background-size: cover;
  height: 120%;
  overflow-y: scroll;
`;

const MainHeading = styled.h1`
  color: #fff;
  text-align: center;
  margin: 5% auto 0 auto;
  font-weight: 300;
  font-size: 3.7em !important;
`;

const BreadCrumSpan = styled.span`
  text-align: center;
  color: #fbfbff;
  margin-top: 0;
  margin-bottom: 1rem;
`;

const BreadCrumFirst = styled.span`
  color: #e87855;
  text-decoration: underline;
  transition: color 0.3s;
  cursor: pointer;
`;

const BreadCrumLast = styled.span`
  color: #b1b1b7;
  cursor: default;
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

const SearchDiv = styled.div`
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: -ms-flex;
  display: flex;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
`;

const SearchInnerDiv = styled.div`
  width: 375px;
  margin: auto auto 20px auto;
`;

const InputGroup = styled.div`
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-align: stretch;
  align-items: stretch;
  width: 100%;
  height: 10px;
`;

const InputAddOn = styled.div`
  border-radius: 0;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  background: #fbfbff;
  outline: none;
  padding: 6px !important;
  border: 1px solid #ccc !important;
  border-right: none !important;
`;

const Input = styled.input`
  background: #fbfbff;
  border: none;
  outline: none;
  padding: 0;
  border-radius: 0;
  font-size: 12px;
  height: 35px;
  width: 84%;
`;

const SearchBtn = styled.div`
  border: 1px solid #ccc !important;
  border-left: none !important;
  border-radius: 0;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  background: #fbfbff;
  border: none;
  outline: none;
  padding: 6px !important;
  width: 1%;
`;

const Button = styled.button`
  position: absolute;
  padding: 7px;
  top: 0;
  right: 0;
`;

const TemplatesDiv = styled.div`
  position: relative;
  padding-right: 20px;
  display: flex;
  -webkit-flex: 1;
  -moz-flex: 1;
  -ms-flex: 1;
  flex: 1;
  touch-action: auto;
`;

// const MainList = styled.ul`
//   padding: 0 15%;
//   display: -webkit-flex;
//   display: -moz-flex;
//   display: -ms-flexbox;
//   display: -ms-flex;
//   display: flex;
//   -webkit-align-items: flex-end;
//   -moz-align-items: flex-end;
//   -ms-align-items: flex-end;
//   align-items: flex-end;
//   -webkit-justify-content: center;
//   -moz-justify-content: center;
//   -ms-justify-content: center;
//   justify-content: center;
//   transition: transform 0.3s ease;
//   -webkit-flex-wrap: wrap;
//   -moz-flex-wrap: wrap;
//   -ms-flex-wrap: wrap;
//   flex-wrap: wrap;
//   -webkit-align-items: center;
//   -moz-align-items: center;
//   -ms-align-items: center;
//   align-items: center;
//   -webkit-flex-grow: 3;
//   -moz-flex-grow: 3;
//   -ms-flex-grow: 3;
//   flex-grow: 3;
//   position: relative;
//   transition: transform 0.3s ease-in-out;
//   transform: translate3d(0, 50px, 0);
// `;

const OpenLabel = styled.label`
  cursor: pointer;
  display: inline-block;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  display: block;
  color: white;
  text-transform: uppercase;
  font-size: 1.3em;
  //opacity: 0;
  height: 30px;
  text-align: center;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  animation-duration: 0.3s;
`;

const CanvasPara = styled.p`
  height: 52px;
  text-align: center;
  position: absolute;
  top: 50%;
  right: 0;
  left: 0;
  margin: -26px auto 0 auto;
  color: #666;
  font-size: 1.2em;
`;

const InnerLi = styled.div`
  background-color: rgba(232, 120, 85, 0.8);
  border: 5px dashed #592e6f;
  opacity: 0;
  z-index: 99;
  height: auto;
  position: absolute;
  animation-fill-mode: both;
  animation-duration: 0.3s;
  transition: opacity 0.3s ease;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: auto;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  padding-top: 18%;
`;
const HoverDiv = styled.div`
  position: relative;
  width: 24%;
  margin-right: 5%;
  margin-bottom: 5%;
  &:hover ${InnerLi} {
    opacity: 1;
  }
  &:hover ${CanvasPara} {
    color: white;
    z-index: 100;
  }
`;

// const LI = styled.li`
//   -webkit-flex-direction: column;
//   -moz-flex-direction: column;
//   -ms-flex-direction: column;
//   flex-direction: column;
//   text-align: center;
//   padding: 25px 25px 15px 25px;
//   max-width: 27%;
//   max-height: 27%;
//   color: white;
//   cursor: pointer;
//   -webkit-animation-duration: 1s;
//   animation-duration: 1s;
//   -webkit-animation-fill-mode: both;
//   animation-fill-mode: both;
//   margin-top: 20px;
//   display: flex;
//   // flex-direction: "row",
//   &:hover ${InnerLi} {
//     //visibility: visible;
//     opacity: 1;
// // content: '';
// // text-transform: uppercase;
// //opacity: 0;
// text-align: center;
// color: white;
// //position: absolute;
// // top: 0;
// // bottom: 0;
// // right: 0;
// // left: 0;
// margin: auto;
// //display: block;
// width: auto;
// height: auto;
// //margin: 15px 10px 10px 10px;
// //padding-top: 18%;
// background-color: rgba(232,120,85,0.8);
// border: 5px dashed #592e6f;
// z-index: 9999;
// }
//   &:hover ${OpenLabel}{
//     opacity: 1;
//   }
// `;

// const LiDiv = styled.div`
//   display: inline-block;
//   position: relative;
//   transform-origin: 0 0;
//   transition: all 0.3s ease-in-out;
//   margin: auto auto 15px auto;
//   color: white;
//   text-align: center;
//   // padding: 25px 25px 15px 25px;
//   // max-width: 27%;
//   cursor: pointer;
// `;

const Img = styled.img`
  position: relative;
  z-index: 1;
  display: inline-block;
  max-width: 100%;
  max-height: 100%;
  transition: all 0.3s ease-in-out;
  box-shadow: rgb(0 0 0 / 40%) 0 23px 24px -12px;
  //max-height: 220px !important;
`;

// const TemplateContainer = styled.div`
// display: -webkit-flex;
// display: -moz-flex;
// display: -ms-flexbox;
// display: -ms-flex;
// display: flex;
// -webkit-flex-direction: row;
// -moz-flex-direction: row;
// -ms-flex-direction: row;
// flex-direction: row;
// -webkit-flex-wrap: wrap;
// -moz-flex-wrap: wrap;
// -ms-flex-wrap: wrap;
// flex-wrap: wrap;
// `;

// const TemplateOuter = styled.div`
// -webkit-animation-duration: 1s;
// animation-duration: 1s;
// -webkit-animation-fill-mode: both;
// animation-fill-mode: both;
// -webkit-animation-name: fadeInUpShort;
// animation-name: fadeInUpShort;
// animation-duration: .3s;
// width: 20%;
// padding: 5px 10px 10px 10px;
//     cursor: pointer;
//     width: 25%;
//     position: relative;
//     -webkit-align-items: center;
//     -moz-align-items: center;
//     -ms-align-items: center;
//     align-items: center;
// `;

const Templateinner = styled.div`
  background-image: url("https://image.shutterstock.com/image-vector/transparent-photoshop-background-grid-260nw-1023662581.jpg");
  position: relative;
  z-index: 1;
  display: inline-block;
  width: 100%;
  //max-height: 280px;
  transition: all 0.3s ease-in-out;
  box-shadow: rgb(0 0 0 / 40%) 0 23px 24px -12px;
  height: 100%;
`;
// const Img = styled.img`
// max-width: 100%;
// max-height: 100%;
// margin: auto;
// border-top: 10px solid transparent;
// transition: border-top-color .5s ease;
// box-shadow: rgb(0 0 0 / 40%) 0 26px 24px -17px;
// `

// const Scroll = styled.div `
//  top: 0px;
//  right: 10px;
//  height:158px;
//  display: block;
//  background-color: #e87855;
//  width: 3px
// `;

// const Template = styled.div `
//  display: "flex",
//  flex-wrap: "wrap",
//  flex-direction: "row",
// `;

export const ChooseTemplate = () => {
  const history = useHistory();
  const [templates, templateData] = useMutation(TemplateSearch);
  const [data, setData] = useState([]);
  const location: any = useLocation();
  useEffect(() => {
    getTempData();
  }, []);

  const getTempData = async () => {
    const data = await templates({
      variables: {
        input: `${
          location.state.id === 13
            ? '{"from":0,"size":15,"body":{"query":{"bool":{"must":[{"term":{"categoryId":13}}]}},"sort":[{"price":{"order":"asc"}},{"starRating":"desc"},{"createdAt":"desc"}]}}'
            : `{"from":0,"size":20,"body":{"query":{"bool":{"must_not":[{"terms":{"categoryId":[${location.state.id}]}}]}},"sort":[{"starRating":"desc"},{"createdAt":"desc"}]}}`
        }`,
        token: `${localStorage.getItem("token")}`,
      },
    });
    if (templateData.loading) return <>"loading..."</>;
    if (templateData.error) return <>`Error! ${templateData.error.message}`</>;
    else {
      setData(data.data.POST_templates_search.hits);
      console.log(data.data.POST_templates_search.templates);
    }
  };
  const handleClick = () => {
    history.push("/dashboard/workspace");
  };
  return (
    <>
      <DivMainContent>
        <MainHeading>{location.state.title}</MainHeading>
        <Link to="/dashboard/choose-type">
          {" "}
          <GoBack>
            <GoBackInner>
              <GoBackIcon style={{ height: "35px", width: "35px" }} />
              <GoBackText>Go Back</GoBackText>
            </GoBackInner>
          </GoBack>
        </Link>
        <p style={{ textAlign: "center", color: "#fbfbff" }}>
          <BreadCrumSpan>
            <BreadCrumFirst>All Sizes</BreadCrumFirst>/
            <BreadCrumFirst>{location.state.parentTitle}</BreadCrumFirst>/
            <BreadCrumLast>{location.state.title}</BreadCrumLast>
          </BreadCrumSpan>
        </p>
        <SearchDiv>
          <SearchInnerDiv>
            <InputGroup>
              <InputAddOn></InputAddOn>
              <Input type="text" placeholder="Search Templates..." />
              <SearchBtn>
                <Button>
                  <SearchIcon />
                </Button>
              </SearchBtn>
            </InputGroup>
          </SearchInnerDiv>
        </SearchDiv>
        <TemplatesDiv style={{ marginLeft: "10%" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              transform: "translate3d(0, 50px, 0)",
            }}
          >
            {/* <div
              style={{
                width: "24%",
                marginRight: "5%",
                marginBottom: "5%",
              }}
            > */}
            <HoverDiv>
              <Templateinner>
                <CanvasPara>BLANK CANVAS</CanvasPara>
              </Templateinner>
              <InnerLi>
                <OpenLabel>BLANK CANVAS</OpenLabel>
              </InnerLi>
            </HoverDiv>
            {/* </div> */}
            {data.map((cat: any) => {
              return (
                <HoverDiv>
                  <InnerLi onClick={handleClick}>
                    <OpenLabel>OPEN</OpenLabel>
                  </InnerLi>
                  <Img
                    src={`https://s3-eu-west-1.amazonaws.com/composer.templates.thumbs.staging/${cat._id}.jpg`}
                  />
                </HoverDiv>
              );
            })}
          </div>
        </TemplatesDiv>
      </DivMainContent>
      <DivMainContent></DivMainContent>
    </>
  );
};
