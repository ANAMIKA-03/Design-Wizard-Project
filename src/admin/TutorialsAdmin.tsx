import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Title } from "@material-ui/icons";
import { TextField } from "@material-ui/core";
import { TutorialsRightSide } from "./TutorialsRightSide";
import { useMutation, useQuery } from "@apollo/client";
import { LeftSideTutorial } from "../lib/contexts/Queries";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import { ReactComponent as Cancel } from "../assets/svg/cross.svg";
import { title } from "process";
import { TutorialsFAQ } from "../lib/contexts/Queries";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const MainDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  fontfamily: Lato, sans-serif;
`;

const Tutorials = styled.div`
  width: 100%;
`;

const LeftSide = styled.div`
  overflow: hidden;
  min-width: 300px;
  width: 300px;
  background: #283d4e;
  color: #e5e6e6;
  padding: 20px;
  height: 100%;
`;

const TemplateControl = styled.div`
  position: relative;
  transition: opacity 0.5s linear;
  margin: 0px 4px;
  height: 80vh;
  overflow: hidden;
  font-size: 14px;
  &:hover {
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background-color: #c0c0c0;
    }
    ::-webkit-scrollbar-thumb {
      background: #696969;
      border-radius: 6px;
      height: 20px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #696969;
    }
    overflow-y: overlay;
  }
`;

const HeadingScroll = styled.div`
  margin-top: 0;
  font-size: 24px;
  font-weight: bolder;
  font-family: "Lato", sans-serif;
  margin-bottom: "8px";
  padding-bottom: 18px;
`;
const Top = styled.div`
  font-size: 0.75em;
`;
const Data = styled.div``;
const Body = styled.input``;
const Button = styled.div`
  display: flex;
  margin: 0;
  height: 49px;
  align-items: center;
  margin-top: 10px;
`;

export const TutorialsAdmin = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [title, setTitle] = React.useState("");
  const [faqBody, setFaqBody] = useState("");
  const [updateFAQ] = useMutation(TutorialsFAQ);
  const [active, setActive] = useState(-1);
  const [activeFaq, setActiveFaq] = useState(false);
  const [faqId, setFaqid] = React.useState(-1);
  const [rightsidetutorialFaq, setRightsidetutorialFaq] = React.useState([]);

  const tutorialsFAQ = async (item: any) => {
    await updateFAQ({
      variables: {
        token: `${localStorage.getItem("token")}`,
        input: {
          title: title,
          faqUniqueTitle: item.faqUniqueTitle,
          useOrigin: item.useOrigin,
          videoUrl: item.videoUrl,
          body: faqBody,
          isFAQ: item.isFAQ,
          parentId: item.parentId,
          active: activeFaq,
          order: item.order,
          id: item.id,
        },
        tutorialsFAQsId: `${item.id}`,
      },
    }).then(() => {
      refetch();
      setExpanded(false);
    });
  };
  const handleChange =
    (panel: string, item: any) =>
    (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
      setTitle(item.title);
      setFaqBody(item.body);
      setActiveFaq(item.active);
    };

  const { data, error, loading, refetch } = useQuery(LeftSideTutorial, {
    variables: {
      filter: "{}",
      token: `${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    console.log(data);
    if (data && data.GET_tutorialsFAQs)
      setRightsidetutorialFaq(data.GET_tutorialsFAQs);
  }, [data]);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <MainDiv style={{ height: "100%", fontSize: "12px" }}>
      <LeftSide style={{ width: "300px" }}>
        <HeadingScroll>Frequently Asked Questions</HeadingScroll>
        <TemplateControl>
          {rightsidetutorialFaq.map((item: any, index: number) => {
            if (item.isFAQ === true) {
              return (
                <Accordion
                  expanded={expanded === `panel${item.id}`}
                  onChange={handleChange(`panel${item.id}`, item)}
                >
                  <AccordionSummary
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    style={{
                      padding: "0px",
                      background: "#283d4e",
                      color: "white",
                      paddingLeft: "15px",
                    }}
                  >
                    <span
                      className="caret"
                      style={{
                        border: "solid #f296a3",
                        borderWidth: "0 2px 2px 0px",
                        height: "1px",
                        display: "inline-block",
                        padding: "3px",
                        transformOrigin: "3px 1px",
                        transform: "rotate(45deg)",
                        marginRight: "10px",
                        marginBottom: "6px",
                      }}
                    ></span>

                    <Typography
                      style={{
                        color: `${
                          expanded === `panel${index + 1}` ? "#f296a3" : "white"
                        }`,
                        fontSize: "12px",
                        fontFamily: "Lato,sans-serif",
                      }}
                    >
                      {" "}
                      {item.title}
                      {!item.active && (
                        <Cancel
                          style={{ width: "15px", color: "red" }}
                        ></Cancel>
                      )}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    style={{
                      background: "#283d4e",
                      color: "white",
                      paddingLeft: "30px",
                    }}
                  >
                    <Typography>
                      <Top style={{ fontFamily: "lato,sans-serif" }}>
                        Faq title
                      </Top>
                      <TextField
                        style={{
                          backgroundColor:
                            title.length > 0 ? "lightgreen" : "pink ",
                          width: "237px",
                          marginTop: "10px",
                        }}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <Data>
                        <span
                          style={{
                            width: "70%",
                            fontSize: ".75em",
                            display: "inline-block",
                            marginTop: "0.6rem",
                            fontFamily: "lato,sans-serif",
                          }}
                        >
                          FAQ Body
                        </span>

                        <span
                          style={{
                            width: "30%",
                            fontSize: ".75em",
                            display: "inline-block",
                            marginTop: "0.5rem",
                            fontFamily: "lato,sans-serif",
                          }}
                        >
                          Active
                          <Checkbox
                            color="primary"
                            inputProps={{ "aria-label": "secondary checkbox" }}
                            style={{
                              width: " 0px",
                              height: "0px",
                              margin: "0px 10px 0px",
                              background: "white",
                              fontFamily: "lato,sans-serif",
                              marginBottom: "10px",
                              border: "0px",
                            }}
                            checked={activeFaq}
                            value={activeFaq}
                            onChange={(e: any) => {
                              setActiveFaq(!activeFaq);
                            }}
                          />
                        </span>
                      </Data>
                      <TextareaAutosize
                        style={{
                          fontSize: "16px",
                          fontFamily: "Lato,sans-serif",
                          backgroundColor: "lightgreen",
                          height: "100px",
                          width: "95%",
                          color: "black",
                          border: "0px",
                          outline: "none",
                        }}
                        value={faqBody}
                        onChange={(e: any) => setFaqBody(e.target.value)}
                      />
                      <Button>
                        <Button
                          style={{
                            background: "#444549",
                            border: "none",
                            color: "white",
                            minWidth: "85px",
                            marginRight: "25px",
                            fontFamily: "lato,sans-serif",
                            paddingLeft: "26pX",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setExpanded(false);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          style={{
                            backgroundColor: "#444549",
                            border: "none",
                            color: "black",
                            minWidth: "90px",
                            background: "#f296a3",
                            fontFamily: "lato,sans-serif",
                            paddingLeft: "26pX",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            tutorialsFAQ(item);
                          }}
                        >
                          Save FAQ
                        </Button>
                      </Button>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              );
            }
          })}
        </TemplateControl>
      </LeftSide>
      <TutorialsRightSide
        faqData={rightsidetutorialFaq}
        getFaqId={(item: any) => {
          setExpanded(item.id ? `panel${item.id}` : false);
          setTitle(item.title);
          setFaqBody(item.body);
          setActiveFaq(item.active);
        }}
        refetch={refetch}
      />
    </MainDiv>
  );
};
