import React, { useState } from "react";
import styled from "styled-components";
import ControlledAccordions from "./accourdian";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { makeStyles, TextField } from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import { ReactComponent as Cancel } from "./../../../assets/svg/cross.svg";
import { ReactComponent as BackArrow } from "./../../../assets/svg/simpleArrowintut.svg";
import {
  GetTutorialsFaq,
  GetTutorialsFaqOrder,
} from "../../../lib/contexts/Queries";
import { useQuery } from "@apollo/client";
import ReactPlayer from "react-player";
import fetchJsonp from "fetch-jsonp";

const PopupBox = styled.div`
  position: fixed;
  background-color: transparent;
  width: 100%;
  height: 100vh;
  top: 72px;
  left: 68px;
  z-index: 999;
`;
const Boxx = styled.div`
   {
    position: relative;
    width: 100%;
    margin: 0 auto;
    height: auto;
    max-height: 100vh;
    margin-top: 0;
    background: #222841eb;
    border-radius: 0;
    padding: 0;
    overflow: auto;
  }
`;
// const CloseIcon = styled.span`
//    {
//     content: "x";
//     cursor: pointer;
//     position: fixed;
//     right: 32px;
//     top: 81px;
//     background: #ffffff;
//     color: #000000;
//     width: 25px;
//     height: 25px;
//     border-radius: 50%;
//     line-height: 20px;
//     text-align: center;
//     border: 1px solid #999;
//     font-size: 20px;
//   }
// `;
const PlanBox = styled.div`
   {
    margin: 0 auto;
  }
`;

const TutorialWrap = styled.div`
   {
    display: flex;
    flex: 1;
  }
`;

const LeftSide = styled.div`
   {
    overflow: hidden;
    width: 265px;
    background: #283d4e;
    color: #e5e6e6;
    padding: 20px;
    height: 720px;
  }
`;

const RightSide = styled.div`
   {
    flex: 1;
    padding: 10px 40px;
    min-width: 500px;
    height: calc(100vh - 135px) !important;
    overflow: auto;
    position: relative;
  }
`;

const RightSideHead = styled.h1`
   {
    font-size: 32px;
    font-weight: 600;
    color: #fff;
    margin: 0px;
    margin-bottom: 4px;
  }
`;

const RightSideHeadSpan = styled.span`
   {
    color: #f296a3;
    font-weight: 300;
    display: inline-block;
    margin-left: 30px;
  }
`;

const TutorialBoxMain = styled.div`
   {
  }
`;

const TutorialBox = styled.div`
   {
    margin-bottom: 100px;
  }
`;

const TutorialHeadTwo = styled.h2`
   {
    color: #f296a3;
    font-size: 1.5em;
    font-weight: 300;
    padding-bottom: 10px;
    border-bottom: 1px solid #f296a3;
  }
`;

const TutorialVideoUI = styled.ul`
   {
    padding: 0;
    margin: 0 auto;
    text-align: center;
  }
`;

const TutorialVideoList = styled.li`
   {
    list-style: none;
    display: inline-block;
    width: 80%;
    margin: 0 20px;
  }
`;

const NewFeature = styled.img`
  width: 100%;
  margin: auto;
  display: block;
`;

const VideoBox = styled.div`
   {
    width: 100%;
    margin: auto;
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }
`;

const Polygon = styled.div`
  transform: rotate(90deg);
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  display: block;
  width: 70px;
  height: 70px;
  transition: stroke 0.5s ease;
  stroke: #2fc6c0;
`;
const PolyGon = styled.polygon`
  stroke: #f296a3;
  &:hover {
    stroke: #f296a3;
  }
`;
const SVG = styled.svg``;
const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.55);
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  display: block;
  transition: background-color 0.5s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.765);
    transition: background-color 0.5s;
  }
  &: hover ${PolyGon} {
    transition: all 0.3s ease-in-out;
    stroke: #2fc6c0;
  }
`;

const PlayBtn = styled.div`
   {
    transition: transform 0.5s;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    display: block;
    width: 39px;
    height: 39px;
  }
`;

const PlayBtnSpan = styled.span`
   {
    margin-top: 15px;
    color: white;
    text-align: center;
    font-size: 16px;
    display: inline-block;
  }
`;

const SearchBox = styled.div`
   {
    text-align: right;
    margin-right: 70px;
  }
`;

const GoBack = styled.p`
  margin-top: 0;
  width: 100%;
  text-align: left;
  line-height: 30px;
  display: inline-block;
  vertical-align: super;
  padding-left: 7px;
  font-size: 17.6px;
  font-family: Lato, sans-serif;
`;

const BootstrapButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    top: "10px",
    padding: "7px 21px",
    border: "1px solid",
    lineHeight: 1.5,
    background: "#2fc6c0",
    borderColor: "#2fc6c0 ",
    color: "#fff",
    minWidth: "135px",
    minheight: "100px",
    borderRadius: "2px",
    marginTop: "-4px",
    fontFamily: "Lato, sans-serif",
    "&:hover": {
      backgroundColor: "#099892",
      borderColor: "#099892",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#099892",
      borderColor: "#099892",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  },
})(Button);

const useStyles = makeStyles(() => ({
  textField: {
    width: "100%",
    padding: "13px 0px 0px 0px",
    fontWeight: 500,
    borderWidth: "0",
  },
}));
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const VideoPlayer = (props: any) => {
  const [url, setUrl] = useState(props.videoData.url);
  const [title, setTitle] = useState(props.videoData.title);
  React.useEffect(() => {
    setUrl(props.videoData.url);
    setTitle(props.videoData.title);
  }, [props.videoData.url, props.videoData.title]);
  var getVideoId = function (videoUrl: string) {
    const match = videoUrl.match(
      /(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
    );

    if (match && match[0].indexOf("vimeo") !== -1) {
      return { provider: "vimeo", id: match[6] };
    } else if (match && match[0].indexOf("youtube") !== -1) {
      return { provider: "youtube", id: match[6] };
    }
    return { provider: "noProvider", id: "" };
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              cursor: "pointer",
              width: "19%",
            }}
            onClick={() => props.goBack(false)}
          >
            <BackArrow style={{ height: "25px", width: "25px" }} />
            <GoBack>Go back</GoBack>
          </div>
          <h2
            style={{
              paddingLeft: "20%",
              fontSize: "32px",
              marginTop: "0",
              width: "100%",
            }}
          >
            {title}
          </h2>
        </div>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            paddingTop: "56.25%",
            marginTop: "0",
            marginLeft: "5%",
          }}
        >
          <ReactPlayer
            url={url}
            controls={true}
            width="100%"
            height="100%"
            style={{
              width: "100% !important",
              height: "100% !important",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "6%",
          alignItems: "center",
          width: "40%",
          height: "61vh",
          overflowY: "scroll",
          marginRight: "1%",
        }}
      >
        {props.toVid.map((item: any) => {
          const videoProvider = getVideoId(item.videoUrl).provider;
          const videoId = getVideoId(item.videoUrl).id;
          const vidUrl =
            videoProvider === "youtube"
              ? `https://www.youtube.com/embed/${videoId}`
              : `https://player.vimeo.com/video/${videoId}`;
          let srcStr: any;
          if (props.imgData.length > 2) {
            srcStr = props.imgData.filter((item: any) => {
              if (item.id === videoId) {
                return item.src;
              }
            });
          }
          return (
            <div
              style={{
                textAlign: "center",
              }}
            >
              <VideoBox style={{ marginLeft: "29%", width: "60%" }}>
                <Overlay>
                  <PlayBtn
                    onClick={() => {
                      setUrl(vidUrl);
                      setTitle(item.title);
                    }}
                  >
                    <Polygon>
                      <SVG height="70" width="70">
                        <PolyGon
                          points="35,10, 60,57,10,57"
                          style={{
                            strokeWidth: "3",
                            fill: "transparent",
                          }}
                        ></PolyGon>
                        Sorry, your browser does not support inline SVG.
                      </SVG>
                    </Polygon>
                  </PlayBtn>
                </Overlay>
                <NewFeature
                  src={srcStr ? srcStr[0].src : "/videoPlaceHolder.png"}
                  style={{
                    backgroundImage: "url('/videoPlaceHolder.png')",
                  }}
                />
              </VideoBox>
              <div
                style={{
                  marginLeft: "21%",
                  marginBottom: "10%",
                  marginTop: "2%",
                }}
              >
                {item.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const TutorialPopup = (props: any) => {
  const [showVid, setShowVideo] = useState(false);
  const [videoData, setVideoData] = useState({});
  const [open, setOpen] = useState(false);
  const [searchInput, setsearchInput] = useState([]) as any;
  const [imgData, setImgData] = useState([{ id: "", src: "" }]);
  const [displayState, setDisplayState] = useState([]) as any;
  const [displayCategory, setDisplayCategory] = useState([]) as any;
  const goBack = (val: boolean) => {
    setShowVideo(false);
  };
  const vidData = (value: any) => {
    setVideoData(value);
    setShowVideo(true);
  };
  var getVideoId = function (videoUrl: string) {
    const match = videoUrl.match(
      /(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
    );

    if (match && match[0].indexOf("vimeo") !== -1) {
      return { provider: "vimeo", id: match[6] };
    } else if (match && match[0].indexOf("youtube") !== -1) {
      return { provider: "youtube", id: match[6] };
    }
    return { provider: "noProvider", id: "" };
  };
  const {
    data: GetTutorialsData,
    error: GetTutorialsError,
    loading: GetTutorialsLoading,
  } = useQuery(GetTutorialsFaq, {
    variables: {
      filter: "{}",
      token: `${localStorage.getItem("token")}`,
    },
  });
  React.useEffect(() => {
    console.log(imgData);
    // console.log(displayCategory);
  }, [imgData]);

  const handleThumbNial = async () => {
    let srcArr: any = [];
    const getData = GetTutorialsData.GET_tutorialsFAQs.map((item: any) => {
      return new Promise(async (resolve: any, reject) => {
        let obj: any;
        const videoProvider = getVideoId(item.videoUrl).provider;
        const videoId = getVideoId(item.videoUrl).id;
        if (videoProvider === "youtube") {
          // console.log("youtube")
          obj = {
            id: videoId,
            src: `https://i3.ytimg.com/vi/${videoId}/mqdefault.jpg`,
          };
          srcArr.push(obj);
          resolve(srcArr);
        } else if (videoProvider === "vimeo") {
          //  console.log("not youtube")
          let data = await fetchJsonp(
            `https://vimeo.com/api/v2/video/${videoId}.json?callback=JSON_CALLBACK&_=${new Date().getTime()}`
          );
          let dta2 = await data.json();
          let dt3 = await dta2[0].thumbnail_large;
          console.log(videoId, dt3);
          obj = { id: videoId, src: dt3 };
          console.log(obj);
          srcArr.push(obj);
          resolve(srcArr);
        } else {
          obj = { id: "", src: "/videoPlaceHolder.png" };
          srcArr.push(obj);
          resolve(srcArr);
        }
      });
    });
    Promise.all(getData).then(() => {
      setImgData(srcArr);
    });
  };
  React.useEffect(() => {
    if (GetTutorialsData) {
      setDisplayState(GetTutorialsData.GET_tutorialsFAQs);
      handleThumbNial();
    }
  }, [GetTutorialsData]);
  const GetTutorialsOrder = useQuery(GetTutorialsFaqOrder, {
    variables: {
      filter: "{}",
      token: `${localStorage.getItem("token")}`,
    },
  });
  const classes = useStyles();
  React.useEffect(() => {
    if (GetTutorialsOrder.data) {
      // console.log(GetTutorialsOrder.data.GET_tutorialCategoriesFAQ);
      setDisplayCategory(GetTutorialsOrder.data.GET_tutorialCategoriesFAQ);
    }
  }, [GetTutorialsOrder.data]);

  if (GetTutorialsLoading || GetTutorialsOrder.loading) return <>Loading...</>;
  if (GetTutorialsError || GetTutorialsOrder.error) return <>Error...</>;
  const toVid = GetTutorialsData.GET_tutorialsFAQs.filter(
    (item: any, index: number) => {
      return index < 6;
    }
  );
  const handleSearchClick = () => {
    // console.log(GetTutorialsData.GET_tutorialsFAQs);
    // console.log(GetTutorialsOrder.data.GET_tutorialCategoriesFAQ);
    console.log(searchInput);
    let temp = GetTutorialsData.GET_tutorialsFAQs.filter((item: any) => {
      if (item.title.includes(searchInput)) return item;
    });
    setDisplayState([...temp]);
    let temp2 = GetTutorialsOrder.data.GET_tutorialCategoriesFAQ.filter(
      (item: any) => {
        if (temp.some((x: any) => x.parentId === item.id)) return item;
      }
    );
    setDisplayCategory([...temp2]);
    console.log(temp);

    console.log(temp2);
  };
  // console.log(toVid);
  return (
    <PopupBox>
      <Boxx>
        {props.content}
        <PlanBox>
          <SearchBox>
            {/* <InputBase
                style={{
                  border: "1px solid #ced4da",
                  color: "#495057",
                  background: "#fff",
                  padding: " 2px 21px",
                }}
                placeholder="Search tutorials ..."
              /> */}
            <div>
              {GetTutorialsData && (
                <Autocomplete
                  sx={{
                    color: "#495057",
                    background: "#fff",
                    display: "inline-block",
                    padding: "-40px",
                    width: "300px",
                    height: "40px",
                    borderWidth: 0,
                  }}
                  disableClearable
                  freeSolo
                  open={open}
                  onInputChange={(event, value) => {
                    setsearchInput(value);
                    value.length > 0 ? setOpen(true) : setOpen(false);
                  }}
                  id="custom-input-demo"
                  options={GetTutorialsData.GET_tutorialsFAQs.map(
                    (option: any) => option.title
                  )}
                  renderInput={(params) => (
                    <TextField
                      className={classes.textField}
                      {...params}
                      placeholder="Search tutorials...."
                      InputProps={{
                        ...params.InputProps,
                        type: "search",
                      }}
                    />
                  )}
                />
              )}

              <BootstrapButton
                onMouseEnter={() => setOpen(false)}
                onClick={handleSearchClick}
              >
                {" "}
                Search{" "}
              </BootstrapButton>
              <Cancel
                onClick={props.handleClose}
                style={{
                  width: "28px",
                  height: "24px",
                  color: "#D3D3D3",
                  marginLeft: "35px",
                }}
              ></Cancel>
            </div>
          </SearchBox>
          <TutorialWrap>
            <LeftSide>
              <ControlledAccordions vidData={vidData} imgData={imgData} />
            </LeftSide>
            <RightSide>
              <RightSideHead
                style={
                  showVid
                    ? {
                        borderBottom: "1px solid #f296a3",
                        marginBottom: "10px",
                        paddingBottom: "10px",
                      }
                    : {}
                }
              >
                Tutorials
                <RightSideHeadSpan>All categories</RightSideHeadSpan>
              </RightSideHead>
              {showVid && (
                <VideoPlayer
                  videoData={videoData}
                  toVid={toVid}
                  imgData={imgData}
                  goBack={goBack}
                />
              )}
              {!showVid && (
                <TutorialBoxMain>
                  {displayCategory.map((cateogory: any) => {
                    return (
                      <TutorialBox>
                        <TutorialHeadTwo
                          style={{ width: "1248px", height: "36px" }}
                        >
                          {cateogory.title}
                        </TutorialHeadTwo>
                        <TutorialVideoUI>
                          <Carousel
                            responsive={responsive}
                            swipeable={false}
                            ssr={true} // means to render carousel on server-side.
                            infinite={true}
                            autoPlaySpeed={100000}
                          >
                            {displayState.map((categoryData: any) => {
                              const videoProvider = getVideoId(
                                categoryData.videoUrl
                              ).provider;
                              const videoId = getVideoId(
                                categoryData.videoUrl
                              ).id;
                              const vidUrl =
                                videoProvider === "youtube"
                                  ? `https://www.youtube.com/embed/${videoId}`
                                  : `https://player.vimeo.com/video/${videoId}`;
                              let srcStr: any;
                              if (imgData.length > 2) {
                                srcStr = imgData.filter((item) => {
                                  if (item.id === videoId) {
                                    return item.src;
                                  }
                                });
                              }
                              if (
                                categoryData.parentId === cateogory.id &&
                                categoryData.isFAQ === false
                              ) {
                                return (
                                  <TutorialVideoList>
                                    <VideoBox>
                                      <Overlay>
                                        <PlayBtn
                                          onClick={() => {
                                            setShowVideo(true);
                                            setVideoData({
                                              title: categoryData.title,
                                              url: vidUrl,
                                            });
                                          }}
                                        >
                                          <Polygon>
                                            <SVG height="70" width="70">
                                              <PolyGon
                                                points="35,10, 60,57,10,57"
                                                style={{
                                                  strokeWidth: "3",
                                                  fill: "transparent",
                                                }}
                                              ></PolyGon>
                                              Sorry, your browser does not
                                              support inline SVG.
                                            </SVG>
                                          </Polygon>
                                        </PlayBtn>
                                      </Overlay>
                                      <NewFeature
                                        src={
                                          srcStr
                                            ? srcStr[0].src
                                            : "/videoPlaceHolder.png"
                                        }
                                        style={{
                                          backgroundImage:
                                            "url('/videoPlaceHolder.png')",
                                        }}
                                      />
                                    </VideoBox>
                                    <PlayBtnSpan>
                                      {categoryData.title}
                                    </PlayBtnSpan>
                                  </TutorialVideoList>
                                );
                              }
                            })}
                          </Carousel>
                        </TutorialVideoUI>
                      </TutorialBox>
                    );
                  })}
                </TutorialBoxMain>
              )}
            </RightSide>
          </TutorialWrap>
        </PlanBox>
      </Boxx>
    </PopupBox>
  );
};
export default TutorialPopup;
