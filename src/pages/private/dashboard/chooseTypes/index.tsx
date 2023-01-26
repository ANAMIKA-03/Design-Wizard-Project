import React, { useState } from "react";
import styled from "styled-components";
import fb from "../../../../assets/ezgif.com-gif-maker.gif";
import { templateCategories } from "../../../../lib/contexts/Queries";
import { useQuery } from "@apollo/client";
//import { any } from "cypress/types/bluebird";
import { Link, useHistory } from "react-router-dom";

const DivMainContent = styled.div`
  background: #493652ad;
  background: url(https://app.designwizard.com/images/staticTemplatesBackground.jpg);
  width: 100%;
  margin-top: 0;
  background-size: cover;
  height: 120%;
  overflow-y: scroll;
`;

const DivContainer = styled.div`
  width: 1409px;
  margin: auto;
`;

const DivTitle = styled.h1`
  text-align: center;
  font-size: 64px;
  color: #fff;
  margin-top: 10px;
  font-weight: 300;
  // margin: 84.3889px 0px 0px;
  padding-top: 80px;
  padding-bottom: 50px;
  font-family: "Lato", sans-serif;
`;

const UlSection = styled.ul`
  width: 100%;
  padding: 0;
  display: block;
`;

const LiSection = styled.li`
  max-width: 165px;
  list-style: none;
  min-height: 80px;
  vertical-align: bottom;
  display: inline-block;
  margin-right: 26px;
  padding: 9px;
  min-width: 45px;
  cursor: pointer;
  &:last-child {
    margin-right: 0px;
  }
`;

const LiSectionTwo = styled.li`
  max-width: 226px;
  list-style: none;
  min-height: 80px;
  vertical-align: bottom;
  display: inline-block;
  margin-right: 80px;
  padding: 9px;
  min-width: 45px;
  cursor: pointer;
  &:last-child {
    margin-right: 0px;
  }
`;

const LiBorder = styled.div`
  border: 3px solid #fff;
  height: 142px;
  width: 150px;
  &:hover {
    transition: all 0.3s ease-in-out;
    box-shadow: rgb(0 0 0 / 40%) 0 43px 24px -12px;
    transform: translate(0px, -10px);
  }
`;

const NewFeature = styled.img`
  //height: 100px;
  object-fit: contain;
  height: 100%;
  width: 100%;
  margin: auto;
  display: block;
  transition: all 0.3s ease-in-out;
  box-shadow: rgb(0 0 0 / 40%) 0 23px 24px -12px;
  &:hover {
    transition: all 0.3s ease-in-out;
    box-shadow: rgb(0 0 0 / 40%) 0 43px 24px -12px;
    transform: translate(0px, -10px);
  }
`;

const ImgContent = styled.h5`
  margin: 0;
  text-align: center;
  color: #fff;
  font-size: 18.4px;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  cursor: pointer;
  padding-top: 10px;
  &:hover {
    color: #2fc6c0;
  }
`;

const Button = styled.button`
  color: #e87855;
  border: 1px solid #858585;
  padding: 7px;
  background: transparent;
  outline: none !important;
  margin: auto;
  margin-top: 27px;
  display: block;
  font-size: 16px;
  font-family: "Lato", sans-serif;
  line-height: 30px;
  cursor: pointer;
  &:hover {
    border: 1px solid #e87855;
  }
`;

const BottmContent = styled.p`
  text-align: center;
  padding-top: 20px;
  padding-bottom: 30px;
  position: relative;
  z-index: 99;
  outline: none;
  color: white;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: #2fc6c0;
  }
`;

// const LiSectionTwo = styled.li`
//   list-style: none;
//   min-height: 80px;
//   vertical-align: bottom;
//   display: inline-block;
//   margin-right: 5px;
//   padding: 9px;
//   min-width: 232px;
//   cursor: pointer;
//   &:last-child {
//     margin-right: 0px;
//   }
// `;

// const NewFeatureTwo = styled.img`
//   height: 100px;
//   margin: auto;
//   display: block;
//   transition: all 0.3s ease-in-out;
//   box-shadow: rgb(0 0 0 / 40%) 0 23px 24px -12px;
//   &:hover {
//     transition: all 0.3s ease-in-out;
//     box-shadow: rgb(0 0 0 / 40%) 0 43px 24px -12px;
//     margin-top: -58px;
//   }
// `;
let skip = false,
  firstRow: any = [],
  secondRow: any = [];
export function ChooseTypes() {
  const [open, setOpen] = useState<boolean>(false);
  const history = useHistory();
  const templateData = useQuery(templateCategories, {
    variables: {
      filter: "{}",
      token: `${localStorage.getItem("token")}`,
    },
    skip: skip,
  });
  if (templateData.loading) return <>loading..</>;
  if (templateData.error) return <>Error..</>;
  if (templateData.data) {
    firstRow = templateData.data.GET_templateCategories.filter(
      (value: any, index: number) => {
        if (index > 7 && index < 13) return value;
      },
      firstRow.push(templateData.data.GET_templateCategories[1])
    );
    secondRow = templateData.data.GET_templateCategories.filter(
      (value: any, index: number) => {
        if (index > 12 && index < 18) return value;
      }
    );
    //setFirstRow(firstRow)
    //skip = true
  }

  const onListSelected = (id: any, titles: any) => {
    //let all:any = []
    const children = templateData.data.GET_templateCategories.filter(
      (value: any) => {
        if (value.parents !== null) {
          for (let prnt of value.parents) {
            const parent = JSON.parse(prnt);
            if (parent.id === id) {
              return value;
            }
          }
        }
      }
    );
    history.push({
      pathname: "/dashboard/choose-size",
      state: { data: children, title: titles },
    });
  };
  return (
    <>
      <DivMainContent>
        <DivContainer>
          <DivTitle> What would you like to create? </DivTitle>

          <UlSection>
            <Link
              to={{
                pathname: "/dashboard/choose-template",
                state: {
                  title: "Video",
                  parentTitle: "Videos",
                  id: 13,
                },
              }}
            >
              {" "}
              <LiSection>
                <NewFeature src={fb} />
                <ImgContent>Videos</ImgContent>
              </LiSection>
            </Link>
            {firstRow.map((val: any) => {
              return (
                <LiSection
                  key={val.id}
                  onClick={() => onListSelected(val.id, val.name)}
                >
                  <NewFeature
                    src={`https://templates.designwizard.com/${val.featuredTemplate}.jpg`}
                  />
                  <ImgContent>{val.name} </ImgContent>
                </LiSection>
              );
            })}
            <Link
              to={{
                pathname: "/dashboard/choose-size",
                state: { data: null, title: "Custom Size" },
              }}
            >
              <LiSection>
                <LiBorder></LiBorder>
                <ImgContent>Custom Size </ImgContent>
              </LiSection>
            </Link>
          </UlSection>

          {!open && (
            <div style={{ paddingTop: "80px", bottom: "10px" }}>
              <Button
                onClick={() => {
                  setOpen((old: any) => !old);
                }}
              >
                MORE TYPES
              </Button>
            </div>
          )}
          {open && (
            <UlSection>
              <div>
                {secondRow.map((item: any) => {
                  return (
                    <LiSectionTwo
                      style={{ marginRight: "30px" }}
                      onClick={() => onListSelected(item.id, item.name)}
                    >
                      <NewFeature
                        src={`https://templates.designwizard.com/${item.featuredTemplate}.jpg`}
                      />
                      <ImgContent>{item.name}</ImgContent>
                    </LiSectionTwo>
                  );
                })}
              </div>
            </UlSection>
          )}
        </DivContainer>
        <Link
          to={{
            pathname: "/dashboard/workspace",
            state: { editor: "image" },
          }}
        >
          <Link
            to={{
              pathname: "/dashboard/workspace",
              state: { editor: "video" },
            }}
          ></Link>
          <BottmContent style={{ marginBottom: "200px" }}>
            Skip and start from blank canvas (size of Facebook post)
          </BottmContent>
        </Link>
      </DivMainContent>
      <DivMainContent></DivMainContent>
    </>
  );
}
