import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { TemplateSearch } from "./../../../../lib/contexts/Queries";
import { useMutation } from "@apollo/client";
import LeftSideBrowsre from "./leftSideBrowseCategories";
const MainDiv1 = styled.div`
  z-index: 1050;
  display: block;
  eft: 70px;
  top: 45px;
  position: fixed;
  width: 100%;
  height: 100%;
  outline: 0;
  transition: opacity 0.15s linear;
`;

const MainDiv2 = styled.div`
margin-top: 0;
    margin-bottom: 0;
    width: 100%;
    max-width: none;
    border: none;
    border-radius: 0;
    transform: none;
    margin: 1.75rem auto;
    position: relative;
    pointer-events: none;
}

`;

const MainDiv3 = styled.div`
  //background-color: transparent;
  height: calc(100vh - 72px);
  box-shadow: none;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  outline: 0;
  background-clip: padding-box;
`;
const MainDiv4 = styled.div``;
const MainDiv5 = styled.div`
  display: block;
`;
const MainDiv6 = styled.div`
display: flex;
    color: #e5e6e6;
    padding: 0;
    padding-right: 35px;
    position: relative;
    flex: 1 1 auto;
}
`;

const CloseIcon = styled.span`
   {
    content: "x";
    cursor: pointer;
    position: fixed;
    right: 32px;
    top: 81px;
    background: #ffffff;
    color: #000000;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    line-height: 20px;
    text-align: center;
    border: 1px solid #999;
    font-size: 20px;
  }
`;

const RightSide = styled.div`
   {
    flex: 1;
    //overflow: hidden;
    background-color: rgba(28, 43, 63, 0.75);
    height: calc(100vh - 72px);
  }
`;
const BodyHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0;
  color: #e5e6e6;
  pointer-events: auto;
  font-size: 16px;
  font-family: "Lato", sans-serif !importan;
`;
const Heading = styled.h2`
margin-top: 30px;
    margin-bottom: 22px;
    font-size: 2rem;
    font-weight: 500;
    line-height: 1.2;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
        color: #e5e6e6;
}
`;

const Input = styled.input`

    width: 100px;
    position: relative;
    height: 35px;
    flex: 1 1 auto;
    min-width: 0;
    margin-bottom: 0;
    padding: 0
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    -webkit-border-radius: 0 !important;
    overflow: visible;
    margin: 0;
    font-family: inherit;

`;
// const ButtonDiv = styled.div`
//   margin-left: -1px;
//   display: flex;
// `;
const ButtonCover = styled.button`
  margin-left: 0;
  display: inline-block;
  color: #e5e6e6;
  padding: 0;
  border-radius: 3px;
  border: none;
`;
const SearchButton = styled.button`
  height: 38px;
  min-height: auto;
  color: #fbfbff !important;
  outline: none !important;
  border: 1px solid #2fc6c0 !important;
  padding: 7px;
  background-color: #2fc6c0;
  background-image: linear-gradient(30deg, #208884, #2ab1ac, #3dcbd1, #67b9db);
  transition: border 0.3s ease, background-color 0.3s ease;
  min-width: 125px;
  border-radius: 3px;
  width: 100%;
  position: relative;
  overflow: hidden;
  z-index: 1 !important;
`;

// const ButtonSpan = styled.span`
//   text-align: center;
//   padding-left: 0;
//   line-height: 30px;
//   margin-left: 5px;
//   display: inline-block;
//   vertical-align: middle;
//   z-index: 22;
// `;
const Span = styled.span`
  line-height: 30px;
  color: #fbfbff !important;
`;
const TemplateScroller = styled.div`
  position: relative;
  height: 90%;
  padding-left: 45px;
  padding-right: 45px;
  touch-action: auto;
  overflow-y: scroll;
`;
// const Templatekeep = styled.div`
//   //display: block;
//   line-height: 1.5;
// `;
const TemplateContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-wrap: wrap;
`;
const TempWrapper = styled.ul`
  width: 100%;
  padding: 0;
  margin-top: 0;
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
`;
// const TempData = styled.li`
//   list-style-type: none;
// `;
const TagWapper = styled.div``;
const PriceTagWrapper = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  z-index: 9;
  padding: 1px 4px;
  font-size: 0.65em;
  color: #232428;
  background-color: rgba(77, 180, 170, 0.85);
  transition: 0.3s background-color linear;
  display: inline-block;
  border-radius: 10px;
  text-transform: capitalize;
  font-weight: bold;
  height: 17px;
  vertical-align: top;
`;
const TempFigure = styled.li`
  list-style-type: none;
  padding: 5px 10px 10px 10px;
  width: 30%;
  position: relative;
  align-items: center;
  margin: 0 0 1rem;
  display: flex;
`;

const TempImage = styled.img`
width: 100%;
    max-width: 100%;
    max-height: 100%;
    margin: auto;
    cursor: pointer;
    border-top: 10px solid transparent;
    transition: border-top-color .5s ease;
    box-shadow: rgb(0 0 0 / 40%) 0 26px 24px -17px;
    vertical-align: middle;
    border-style: none;
}
`;

const SearchBox = styled.div`
  position: relative;
  padding-left: 350px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 45%;
  height: 40px;
`;

// const BootstrapButton = withStyles({
//   root: {
//     boxShadow: "none",
//     textTransform: "none",
//     fontSize: 16,
//     padding: "7px 21px",
//     border: "1px solid",
//     lineHeight: 1.5,
//     background: "#2fc6c0",
//     borderColor: "#2fc6c0 ",
//     color: "#fff",
//     minWidth: "125px",
//     borderRadius: "2px",
//     marginTop: "-5px",
//     "&:hover": {
//       backgroundColor: "#099892",
//       borderColor: "#099892",
//       boxShadow: "none",
//     },
//     "&:active": {
//       boxShadow: "none",
//       backgroundColor: "#099892",
//       borderColor: "#099892",
//     },
//     "&:focus": {
//       boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
//     },
//   },
// })(Button);

export const BrowseCategoriesPopup = (props: any) => {
  const { resizeTitleId, resizeTitle } = props;
  const [templateData, temData] = useMutation(TemplateSearch);
  const [templatePage, setTemplatePage] = useState(0);
  const [imageId, setImageId] = useState("_id");
  const [templateBlock, setTemplateBlock] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [templateFilter, setTemplateFilter] = useState(
    `{"from":0,"size":50,"body":{"query":{"bool":{"must":[{"terms":{"categoryId":[${resizeTitleId}]}}]}},"sort":[{"starRating":"desc"},{"createdAt":"desc"}]}}`
  );
  const [tempData, setTempData] = useState([] as any);

  const imgTempScroll = useRef<HTMLDivElement>(null);
  const handleLeftSideClose = () => {
    props.handleClose();
  };

  const handleLeftSideCLick = (TempData: any) => {
    setTempData(TempData);
    setImageId("templateId");
  };

  useEffect(() => {
    // console.log(templateFilter)
    if (templateFilter) getTempData();
  }, [templateFilter]);

  useEffect(() => {
    console.log(templatePage);
    if (templatePage > 0)
      setTemplateFilter(`{"from":${templatePage},"size":50,"body":{"query":{"bool":{"must":[{"terms":
    {"categoryId":[${resizeTitleId}]}}]}},"sort":[{"starRating":"desc"},{"createdAt":"desc"}]}}`);
  }, [templatePage]);

  const handleSearchClick = () => {
    setTempData([]);
    console.log("yyy");
    if (searchInput === "") {
      setTemplateFilter(`{"from":0,"size":20,"body":{"query":{"bool":{"must_not":[{"terms":
  {"categoryId":[10]}}]}},"sort":[{"starRating":"desc"},{"createdAt":"desc"}]}}`);
    } else {
      console.log("y");
      setTemplateFilter(
        `{"from":0,"size":20,"body":{"query":{"bool":{"must_not":[{"terms":{"categoryId":[10]}}],"must":[{"multi_match":{"query":"${searchInput}","fields":["displayTitle^3","categorizationKeywords^2","title","keywords","tags"]}}]}}}}`
      );
    }
  };

  const getTempData = async () => {
    const data = await templateData({
      variables: {
        input: templateFilter,
        token: `${localStorage.getItem("token")}`,
      },
    });
    if (temData.loading) return <>"loading..."</>;
    if (temData.error) return <>`Error! ${temData.error.message}`</>;
    else {
      console.log(data);
      if (data.data.POST_templates_search.hits !== null) {
        let templatesData = data.data.POST_templates_search.hits;
        if (tempData) {
          setTempData((old: any[]) => {
            return [...old, ...templatesData];
          });
        } else {
          setTempData(templatesData);
        }
        //  console.log(templatesData);
      }
    }
  };

  const onImgTemp = () => {
    if (imgTempScroll.current) {
      // console.log(imgTempScroll.current)
      const { scrollTop, scrollHeight, clientHeight } = imgTempScroll.current;
      console.log("Top" + imgTempScroll.current.scrollTop);
      console.log("height" + imgTempScroll.current.scrollHeight);
      console.log("clint" + imgTempScroll.current.clientHeight);
      if (scrollTop + clientHeight + 1 >= scrollHeight) {
        console.log("enter");
        if (imageId === "_id") {
          setTemplatePage((oldValue: any) => {
            const newValue = oldValue + tempData.length;
            return newValue;
          });
        } else if (imageId === "templateId") {
          setTemplateBlock((oldValue: any) => {
            const newValue = oldValue + 20;
            return newValue;
          });
        }
      }
    }
  };
  return (
    <MainDiv1>
      <MainDiv2>
        <MainDiv3>
          <MainDiv4>
            <MainDiv5>
              <MainDiv6>
                <LeftSideBrowsre
                  templateBlock={templateBlock}
                  close={handleLeftSideClose}
                  click={handleLeftSideCLick}
                  resizeTitle={resizeTitle}
                />
                <RightSide>
                  <BodyHeader>
                    <Heading> What are you looking for?</Heading>
                  </BodyHeader>
                  <SearchBox>
                    <Input onChange={(e) => setSearchInput(e.target.value)} />
                    <ButtonCover>
                      <SearchButton onClick={handleSearchClick}>
                        <Span> Search </Span>
                      </SearchButton>
                    </ButtonCover>
                  </SearchBox>
                  <CloseIcon onClick={props.handleClose}>x</CloseIcon>
                  {props.content}
                  <TemplateScroller onScroll={onImgTemp} ref={imgTempScroll}>
                    <TemplateContainer>
                      <TempWrapper>
                        {console.log(tempData)}
                        {tempData.map((item: any) => {
                          return (
                            <TempFigure>
                              <TagWapper>
                                <PriceTagWrapper></PriceTagWrapper>
                              </TagWapper>

                              <TempImage
                                src={`${process.env.REACT_APP_S3_REDIRECT}/composer.templates.thumbs.staging/${item[imageId]}.jpg`}
                                alt="canvas"
                              />
                            </TempFigure>
                          );
                        })}
                      </TempWrapper>
                    </TemplateContainer>
                  </TemplateScroller>
                </RightSide>
              </MainDiv6>
            </MainDiv5>
          </MainDiv4>
        </MainDiv3>
      </MainDiv2>
    </MainDiv1>
  );
};
export default BrowseCategoriesPopup;
