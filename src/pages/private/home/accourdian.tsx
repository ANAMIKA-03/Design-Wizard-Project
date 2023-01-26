import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styled from "styled-components";
import PlayArrowOutlinedIcon from "@material-ui/icons/PlayArrowOutlined";
import { GetTutorialsFaq } from "../../../lib/contexts/Queries";
import { useQuery } from "@apollo/client";
import fetchJsonp from "fetch-jsonp";

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
    width: 100%;
    margin: 15px 0;
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
    position: relative;
    overflow: hidden;
    cursor: pointer;
    width: 225px;
    height: 126.58px;
    font: 16px;
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
   {
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
      &: hover ${PolyGon} {
        stroke: #2fc6c0;
        &:hover{
          transition: all 0.3s ease-in-out;
          stroke: #f296a3;
        }
      }
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

const AccourdianTextWrap = styled.div`
   {
    display: block;
  }
`;

const HeadingScroll = styled.div`
  margin-top: 0;
  font-size: 18px;
  font-weight: bold;
`;
const AssetsListController = styled.div`
  overflow: hidden;
  position: relative;
  transition: opacity 0.5s linear;
  &:hover {
    ::-webkit-scrollbar {
      width: 12px;
    }
    ::-webkit-scrollbar-track {
      background-color: #c0c0c0;
    }
    ::-webkit-scrollbar-thumb {
      background: #696969;
      border-radius: 6px;
      height: 20px;
      background-color: #c0c0c0;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #696969;
    }
    overflow-y: scroll;
  }
`;
const AssetsListResultScroller = styled.div`
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: -ms-flex;
  display: flex;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-justify-content: space-around;
  -moz-justify-content: space-around;
  -ms-justify-content: space-around;
  justify-content: space-around;
  -webkit-flex-wrap: wrap;
  -moz-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin: 0 10px;
  overflow-y: scroll;
  &:hover {
    ::-webkit-scrollbar {
      width: 10px;
    }
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
    ::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 6px;
      height: 20px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
    overflow-y: overlay;
  }
`;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(12),
      flexShrink: 0,
      fontFamily: ["Lato", "sans-serif  !important"].join(","),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(12),
      color: theme.palette.text.secondary,
    },
    accourdianBox: {
      background: "none",
      boxShadow: "none",
    },
    accourdianText: {
      color: "#fff1d3",
      fontSize: "12px",
      height: "70px",
      fontFamily: ["Lato", "sans-serif  !important"].join(","),
      width: "225px",
      lineHeight: "1.35",
      wordbreak: "break-word",
    },
    accourdianMainBox: {
      display: "block",
      height: "190px",
    },
  })
);

const Heading = styled.div``;
export default function ControlledAccordions(props: any) {
  //const [imgData, setImgData] = React.useState([{ id: "", src: "" }]);
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
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const GetTutorials = useQuery(GetTutorialsFaq, {
    variables: {
      filter: "{}",
      token: `${localStorage.getItem("token")}`,
    },
  });
  if (GetTutorials.loading) return <>Loading...</>;
  if (GetTutorials.error) return <>Error...</>;

  return (
    <div className={classes.root}>
      <HeadingScroll>Frequently Asked Questions</HeadingScroll>
      {GetTutorials.data.GET_tutorialsFAQs.map(
        (faqData: any, index: number) => {
          const videoProvider = getVideoId(faqData.videoUrl).provider;
          const videoId = getVideoId(faqData.videoUrl).id;
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
          if (faqData.isFAQ) {
            return (
              <Accordion
                className={classes.accourdianBox}
                expanded={expanded === `panel${index + 1}`}
                onChange={handleChange(`panel${index + 1}`)}
              >
                <AccordionSummary
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  style={{ padding: "0px" }}
                >
                  <span
                    className="caret"
                    style={{
                      marginLeft: "0px",
                      border: "solid #f296a3",
                      borderWidth: "0 2px 2px 0px",
                      height: "1px",
                      display: "inline-block",
                      padding: "3px",
                      transformOrigin: "3px 1px",
                      transform: "rotate(45deg)",
                      marginRight: "10px",
                    }}
                  ></span>
                  <Typography
                    className={classes.heading}
                    style={{
                      color: `${
                        expanded === `panel${index + 1}` ? "#f296a3" : "white"
                      }`,
                    }}
                  >
                    {faqData.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accourdianMainBox}>
                  <AccourdianTextWrap>
                    <Typography className={classes.accourdianText}>
                      <AssetsListController>
                        {/* <AssetsListResultScroller> */}
                        {faqData.body}
                        {/* </AssetsListResultScroller> */}
                      </AssetsListController>
                    </Typography>
                  </AccourdianTextWrap>
                  <AccourdianTextWrap>
                    <TutorialVideoUI>
                      <TutorialVideoList>
                        <VideoBox>
                          <Overlay>
                            <PlayBtn
                              onClick={() => {
                                props.vidData({
                                  title: faqData.title,
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
                                  Sorry, your browser does not support inline
                                  SVG.
                                </SVG>
                              </Polygon>
                            </PlayBtn>
                          </Overlay>
                          <NewFeature
                            src={
                              srcStr ? srcStr[0].src : "/videoPlaceHolder.png"
                            }
                          />
                        </VideoBox>
                      </TutorialVideoList>
                    </TutorialVideoUI>
                  </AccourdianTextWrap>
                </AccordionDetails>
              </Accordion>
            );
          }
        }
      )}
      {/* <Accordion
        className={classes.accourdianBox}
        expanded={expanded === "panel"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>How to add text.</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accourdianMainBox}>
          <AccourdianTextWrap>
            <Typography className={classes.accourdianText}>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
              feugiat. Aliquam eget maximus est, id dignissim quam. Nulla
              facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
              Aliquam eget maximus est, id dignissim quam. Nulla facilisi.
              Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
              maximus est, id dignissim quam.
            </Typography>
          </AccourdianTextWrap>
          <AccourdianTextWrap>
            <TutorialVideoUI>
              <TutorialVideoList>
                <VideoBox>
                  <Overlay>
                    <PlayBtn>
                      {" "}
                      <PlayArrowOutlinedIcon
                        style={{ color: "#f296a3", fontSize: "50px" }}
                      />{" "}
                    </PlayBtn>
                  </Overlay>
                  <NewFeature src="https://i.vimeocdn.com/video/736302964-84e04e41b6bcdce8ef603ca2f53211048750b2f00767a4b463b3d3dbe67fe3b2-d_640" />
                </VideoBox>
              </TutorialVideoList>
            </TutorialVideoUI>
          </AccourdianTextWrap>
        </AccordionDetails>
      </Accordion>
      <Accordion
        className={classes.accourdianBox}
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>
            How to download images.
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accourdianMainBox}>
          <AccourdianTextWrap>
            <Typography className={classes.accourdianText}>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
              feugiat. Aliquam eget maximus est, id dignissim quam. Nulla
              facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
              Aliquam eget maximus est, id dignissim quam. Nulla facilisi.
              Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
              maximus est, id dignissim quam.
            </Typography>
          </AccourdianTextWrap>
          <AccourdianTextWrap>
            <TutorialVideoUI>
              <TutorialVideoList>
                <VideoBox>
                  <Overlay>
                    <PlayBtn>
                      {" "}
                      <PlayArrowOutlinedIcon
                        style={{ color: "#f296a3", fontSize: "50px" }}
                      />{" "}
                    </PlayBtn>
                  </Overlay>
                  <NewFeature src="https://i.vimeocdn.com/video/736302964-84e04e41b6bcdce8ef603ca2f53211048750b2f00767a4b463b3d3dbe67fe3b2-d_640" />
                </VideoBox>
              </TutorialVideoList>
            </TutorialVideoUI>
          </AccourdianTextWrap>
        </AccordionDetails>
      </Accordion>
      <Accordion
        className={classes.accourdianBox}
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>
            How to download videos.
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accourdianMainBox}>
          <AccourdianTextWrap>
            <Typography className={classes.accourdianText}>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
              feugiat. Aliquam eget maximus est, id dignissim quam. Nulla
              facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
              Aliquam eget maximus est, id dignissim quam. Nulla facilisi.
              Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
              maximus est, id dignissim quam.
            </Typography>
          </AccourdianTextWrap>
          <AccourdianTextWrap>
            <TutorialVideoUI>
              <TutorialVideoList>
                <VideoBox>
                  <Overlay>
                    <PlayBtn>
                      {" "}
                      <PlayArrowOutlinedIcon
                        style={{ color: "#f296a3", fontSize: "50px" }}
                      />{" "}
                    </PlayBtn>
                  </Overlay>
                  <NewFeature src="https://i.vimeocdn.com/video/736302964-84e04e41b6bcdce8ef603ca2f53211048750b2f00767a4b463b3d3dbe67fe3b2-d_640" />
                </VideoBox>
              </TutorialVideoList>
            </TutorialVideoUI>
          </AccourdianTextWrap>
        </AccordionDetails>
      </Accordion>
      <Accordion
        className={classes.accourdianBox}
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>
            How to rename your design.
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accourdianMainBox}>
          <AccourdianTextWrap>
            <Typography className={classes.accourdianText}>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
              feugiat. Aliquam eget maximus est, id dignissim quam. Nulla
              facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
              Aliquam eget maximus est, id dignissim quam. Nulla facilisi.
              Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
              maximus est, id dignissim quam.
            </Typography>
          </AccourdianTextWrap>
          <AccourdianTextWrap>
            <TutorialVideoUI>
              <TutorialVideoList>
                <VideoBox>
                  <Overlay>
                    <PlayBtn>
                      {" "}
                      <PlayArrowOutlinedIcon
                        style={{ color: "#f296a3", fontSize: "50px" }}
                      />{" "}
                    </PlayBtn>
                  </Overlay>
                  <NewFeature src="https://i.vimeocdn.com/video/736302964-84e04e41b6bcdce8ef603ca2f53211048750b2f00767a4b463b3d3dbe67fe3b2-d_640" />
                </VideoBox>
              </TutorialVideoList>
            </TutorialVideoUI>
          </AccourdianTextWrap>
        </AccordionDetails>
      </Accordion>
      <Accordion
        className={classes.accourdianBox}
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel6bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>
            How to resize an image.
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accourdianMainBox}>
          <AccourdianTextWrap>
            <Typography className={classes.accourdianText}>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
              feugiat. Aliquam eget maximus est, id dignissim quam. Nulla
              facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
              Aliquam eget maximus est, id dignissim quam. Nulla facilisi.
              Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
              maximus est, id dignissim quam.
            </Typography>
          </AccourdianTextWrap>
          <AccourdianTextWrap>
            <TutorialVideoUI>
              <TutorialVideoList>
                <VideoBox>
                  <Overlay>
                    <PlayBtn>
                      {" "}
                      <PlayArrowOutlinedIcon
                        style={{ color: "#f296a3", fontSize: "50px" }}
                      />{" "}
                    </PlayBtn>
                  </Overlay>
                  <NewFeature src="https://i.vimeocdn.com/video/736302964-84e04e41b6bcdce8ef603ca2f53211048750b2f00767a4b463b3d3dbe67fe3b2-d_640" />
                </VideoBox>
              </TutorialVideoList>
            </TutorialVideoUI>
          </AccourdianTextWrap>
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
}
