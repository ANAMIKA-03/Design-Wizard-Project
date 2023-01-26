import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import { MenuItem, TextField } from "@material-ui/core";
import { ReactComponent as Add } from "../assets/svg/add.svg";
import Checkbox from "@material-ui/core/Checkbox";
import { CategoriesFAQ } from "../lib/contexts/Queries";
import { useMutation, useQuery } from "@apollo/client";
import { tutorialCategoriesFAQ } from "../lib/contexts/Queries";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { PosttutorialsFAQ } from "../lib/contexts/Queries";
import { useHistory } from "react-router-dom";
import { ReactComponent as Cancel } from "../assets/svg/cross.svg";
import Divider from "@mui/material/Divider";
import { PUTtutorialCategoriesFAQ } from "../lib/contexts/Queries";
import { PUT_tutorialsFAQ } from "../lib/contexts/Queries";
import { Menu } from "@mui/material";

const MainDiv = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  padding: 0 40px;
  min-width: 500px;
  height: 100%;
  font-weight: bolder;
`;
const RightSide = styled.div`
  font-size: 32px;
  font-family: "Lato", sans-serif;
  color: white;
  padding-right: 20px;
  font-weight: 300;
`;
const Categories = styled.div`
  font-size: 17.6px;
  margin: 20px 0;
`;
const Allcategories = styled.div`
  position: static;
  display: flex;
`;

const DatacategoriesTutorial = styled.div`
  padding: 0;
  color: white;
  font-size: 14px;
  font-family: "Lato", sans-serif;
  height: 60vh;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-height: 1.2;
  word-break: break-all;
  display: flex;
  flex-direction: column;
  height: 55vh;
  width: 280px;
  overflow: hidden;
  &:hover {
    ::-webkit-scrollbar {
      width: 10px;
    }
    ::-webkit-scrollbar-track {
      background-color: #c0c0c0;
    }
    ::-webkit-scrollbar-thumb {
      background: #696969;
      border-radius: 6px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #696969;
    }
    overflow-y: overlay;
  }
`;

const Datacategories = styled.div`
  padding: 0;
  color: white;
  font-size: 14px;
  font-family: "Lato", sans-serif;
  height: 60vh;
  display: flex;
  margin: 0 150px;
  flex-direction: column;
  height: 55vh;
  overflow: hidden;
  width: 333px;
  &:hover {
    ::-webkit-scrollbar {
      width: 10px;
    }
    ::-webkit-scrollbar-track {
      background-color: #c0c0c0;
    }
    ::-webkit-scrollbar-thumb {
      background: #696969;
      border-radius: 6px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #696969;
    }
    overflow-y: overlay;
  }
`;

const Firstcategories = styled.div`
  height: 40px;
  padding-bottom: 10px;
`;
const FirstcategoriesTutorial = styled.div`
  height: 20px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: row;
`;

const MainButton = styled.div`
  position: absolute;
  bottom: 35px;
  // justify-content: space-between;
  // margin: 0;
  // width: 280px;
`;

const Category = styled.div``;
const Title = styled.div`
  color: White;
  font-size: 12px;
  margin-bottom: -7px;
  margin-top: 13px;
`;
const Button = styled.div`
  display: flex;
  margin: 0;
  height: 49px;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 20px;
`;
const Button1 = styled.div`
  width: 300px;
`;

const Top = styled.div`
  font-size: 0.75em;
`;
const Orderid = styled.div`
  color: #f296a3;
  font-size: 14px;
  float: left;
  cursor: pointer;
`;
const TutotialTitle = styled.div`
  cursor: pointer;
  color: white;
`;
const EditButton = styled.div`
  verticalalign: top;
  line-height: 20px;
  color: #f296a3;
  font-size: 0.75em;
  marginleft: 10px;
  margintop: 1px;
  cursor: pointer;
`;

const TutorialOptions = styled.div`
  display: flex;
`;
const TutorialBody = styled.div`
  flex: 4;
  overflow: hidden;
  transition: height 0.3s;
  height: 110px;
`;
const PopupTitle = styled.div`
  display: block;
  color: #fbfbff;
  margin-bottom: 8px;
`;
const Titleorder = styled.div`
  color: white;
  font-size: 12px;
  margin-bottom: 5px;
`;
const Activecheckbox = styled.div``;
const Tutorialfaqtitle = styled.div`
  flex: 4;
  transition: height 0.3s;
`;
const Different = styled.div`
  color: white;
  margin-top: 30px;
  font-size: 12px;
`;
const Activemaindiv = styled.div`
  height: 40px;
`;
const Active = styled.div`
  color: white;
  font-size: 12px;
`;
const Faq = styled.div`
  color: white;
  font-size: 12px;
`;
const Tutorialorder = styled.div`
  width: 84px;
`;
const DropDown = styled.div`
  margin-left: 2rem;
  position: relative;
  border: solid white;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 5px;
  transform: rotate(45deg);
  z-index: 2;
`;
const Tutorialtitlebody = styled.div``;
const Accordion = withStyles({
  root: {
    border: "0px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

export const TutorialsRightSide = (props: any) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [title, setTitle] = React.useState("");
  const [order, setOrder] = useState("");
  const [tutorialFAQ] = useMutation(CategoriesFAQ);
  const [editindex, setEditindex] = React.useState(-1);
  const [editClose, setEditClose] = React.useState("");
  const [editindexTutorial, setEditindexTutorial] = React.useState(-1);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [categoryid, setCategoryid] = React.useState(0);
  const [editindex1, setEditindex1] = React.useState(-1);
  const [selectedCategories, setSelectedCategories] = React.useState("");
  const [faqData, setFQAData] = React.useState([]);
  const [faqCheck, setFaqCheck] = React.useState(false);
  const [faqUniqueTitle, setFaqUniqueTitle] = React.useState("");
  const [faqUniqueTitleadd, setFaqUniqueTitleadd] = React.useState("");
  const [videoUrl, setVideoUlr] = React.useState("");
  const [body, setBody] = React.useState("");
  const [tutorialTitle, setTutorialTitle] = React.useState("");
  const [isFAQ, setIsFAQ] = React.useState(false);
  //const [parentId, setParentId] = React.useState("");
  const [active, setActive] = React.useState(false);
  const [orderfaq, setOrderFaq] = React.useState("");
  const [categoriesTutorialFAQ] = useMutation(PosttutorialsFAQ);
  const history = useHistory();
  const [rightSideTitle, setRightSideTitle] = React.useState("");
  const [rightSidevideoUrl, setRightSideVideoUrl] = React.useState("");
  const [rightSidebody, setRightSideBody] = React.useState("");
  const [rightSidefaqCheck, setRightSideFaqCheck] = React.useState(false);
  const [rightSideorderfaq, setRightSideOrderFaq] = React.useState("");
  //const [tutorialFaqData, setTutorialFaqData] = React.useState([]);
  const [PUTCCategoriesFAQ] = useMutation(PUTtutorialCategoriesFAQ);
  const [titlePutCategories, setTitlePutCategories] = React.useState("");
  const [orderPutCategories, setOrderPutCategories] = React.useState("");
  const [PUTtutorials] = useMutation(PUT_tutorialsFAQ);
  const [different, setDifferent] = React.useState(false);
  const [differentadd, setDifferentadd] = React.useState(false);
  const [faqTitleColor, setFaqTitleColor] = React.useState("");
  const [faqTitledifferent, setFaqTitledifferent] = React.useState("");
  const [isDropdownOPne, setIsDropdownOPne] = React.useState(false);
  const [itemName, setItemName] = React.useState("select category");

  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleClose = () => {
    history.push("/dashboard/workspace");
  };
  useEffect(() => {
    console.log(categoryid);
    var data = props.faqData.filter((item: any) => {
      return categoryid === item.parentId;
    });
    console.log("faqData", data);
    setFQAData(data);
  }, [categoryid, props.faqData]);

  useEffect(() => {
    console.log("Checked");
  }, [faqCheck]);

  useEffect(() => {
    if (!different) {
      setFaqUniqueTitle(rightSideTitle);
    } else {
      setFaqUniqueTitle(faqTitleColor);
    }
  }, [different]);

  useEffect(() => {
    if (!differentadd) {
      setFaqUniqueTitleadd(tutorialTitle);
    } else {
      setFaqUniqueTitleadd(faqTitledifferent);
    }
  }, [differentadd]);

  const titleFAQ = async () => {
    await tutorialFAQ({
      variables: {
        token: `${localStorage.getItem("token")}`,
        input: {
          title: title,
          order: order,
        },
      },
    }).then(() => {
      refetch();
      setExpanded(false);
      setOrder("");
      setTitle("");
    });
  };

  const passFaqId = (item: any) => {
    props.getFaqId(item);
  };
  const dataFAQ = async () => {
    await categoriesTutorialFAQ({
      variables: {
        token: `${localStorage.getItem("token")}`,
        input: {
          title: tutorialTitle,
          faqUniqueTitle: faqUniqueTitle,
          videoUrl: videoUrl,
          body: body,
          isFAQ: faqCheck,
          parentId: categoryid,
          active: active,
          order: Number(orderfaq),
        },
      },
    }).then(() => {
      refetch();
      props.refetch();
      setExpanded(false);
      setTutorialTitle("");
      setVideoUlr("");
      setBody("");
      setOrderFaq("");
      setActive(false);
      setFaqCheck(false);
      setFaqUniqueTitle("");
      setDifferent(false);
    });
  };

  const PutCategories = async (item: any) => {
    await PUTCCategoriesFAQ({
      variables: {
        token: `${localStorage.getItem("token")}`,
        input: {
          title: titlePutCategories,
          order: orderPutCategories,
        },
        tutorialCategoriesFAQsId: String(item.id),
      },
    }).then(() => {
      refetch();
      setEditindex(-1);
      setExpanded(false);
    });
  };

  const PUTFaqTutorials = async (item: any) => {
    await PUTtutorials({
      variables: {
        token: `${localStorage.getItem("token")}`,
        input: {
          title: rightSideTitle,
          faqUniqueTitle: faqUniqueTitle,
          videoUrl: rightSidevideoUrl,
          body: rightSidebody,
          isFAQ: rightSidefaqCheck,
          parentId: categoryid,
          active: active,
          order: Number(rightSideorderfaq),
          useOrigin: different,
        },
        tutorialsFAQsId: `${item.id}`,
      },
    }).then(() => {
      props.refetch();
      refetch();
      setEditindexTutorial(-1);
    });
  };
  useEffect(() => {
    console.log("selectedCategories", selectedCategories);
  }, [selectedCategories]);

  const handleChange =
    (pane1: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      if (categoryid !== 0 && pane1 === "panel2") {
        setExpanded(isExpanded ? pane1 : false);
      } else if (pane1 === "pane2") {
        setExpanded(isExpanded ? pane1 : false);
        setCategoryid(0);
      }
    };
  const { data, error, loading, refetch } = useQuery(tutorialCategoriesFAQ, {
    variables: {
      filter: "{}",
      token: `${localStorage.getItem("token")}`,
    },
  });
  //useEffect(() => {
  //if (data && data.GET_tutorialCategoriesFAQ)
  //setTutorialFaqData(data.GET_tutorialCategoriesFAQ);
  //}, [data]);

  //useEffect(() => {
  //console.log(tutorialFaqData);
  //}, [tutorialFaqData]);
  if (loading) return <>"Loading..."</>;
  if (error) return <>`Error! ${error.message}`</>;

  const Popup = (index: number, item: any) => {
    setEditindex(index);
    setTitlePutCategories(item.title);
    setOrderPutCategories(item.order);

    if (item.order) {
      console.log(item.order);
    }
  };

  const rightsidePopup = (index: number, item: any) => {
    console.log(item);
    setEditindexTutorial(index);
    setEditClose(item);
    setRightSideTitle(item.title);
    setFaqUniqueTitle(item.faqUniqueTitle);
    setRightSideVideoUrl(item.videoUrl);
    setRightSideBody(item.body);
    setRightSideFaqCheck(item.isFAQ);
    setCategoryid(item.parentId);
    setActive(item.active);
    setRightSideOrderFaq(item.order);
    //setDifferent(item.faqUniqueTitle ? true: false);
    setDifferent(item.useOrigin);
    setFaqTitleColor(item.faqUniqueTitle);

    if (item.order) {
      console.log(item.order);
    }
  };

  //const popuptutorial = (index: number) => {
  //setEditindex1(index);
  //};
  return (
    <MainDiv style={{ height: "100%", backgroundColor: "#101010" }}>
      <RightSide>
        <span style={{ paddingRight: "20px", fontWeight: "300" }}>
          {" "}
          Tutorials
        </span>
        <span style={{ paddingRight: "20px", fontWeight: "300" }}>
          Management
        </span>
        <Cancel
          onClick={handleClose}
          style={{
            width: "28px",
            height: "32px",
            color: "#D3D3D3",
            marginLeft: "683px",
            position: "sticky",
          }}
        ></Cancel>
      </RightSide>
      <Categories>
        <span
          style={{
            color: "#f296a3",
            verticalAlign: "text-top",
            display: "inline-block",
          }}
        >
          Categories
        </span>
        <div style={{ display: "inline-flex" }}>
          <span
            style={{
              color: "#f296a3",
              verticalAlign: "text-top",
              display: "inline-block",
              marginLeft: "340px",
            }}
          >
            Tutorials in Categories:
          </span>
          <div onClick={handleClick}>
            <span
              style={{
                color: "white",
                marginLeft: "1rem",
                fontWeight: "initial",
              }}
            >
              {itemName}
            </span>
            <DropDown></DropDown>
          </div>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            style={{ height: "400px", width: "300px", marginTop: "0.7rem" }}
          >
            {data.GET_tutorialCategoriesFAQ.map((item: any) => {
              return (
                <>
                  <MenuItem
                    style={{
                      background: "rgba(255,255,255,0.95)",
                      whiteSpace: "break-spaces",
                      padding: " 0 5px 0 15px",
                      // borderBottom: "1px solid #444549",
                      // borderWidth: "90%",
                    }}
                    value={selectedCategories}
                    onClick={() => {
                      setIsDropdownOPne(false);
                      setItemName(item.title);
                      setSelectedCategories(item.id);
                      setCategoryid(item.id);
                      handleCloseMenu();
                    }}
                  >
                    {item.title}
                  </MenuItem>
                  <hr style={{ width: "90%" }} />
                </>
              );
            })}
          </Menu>
        </div>
        {/* <span>
          <select
            style={{ background: "white" }}
            onChange={(e) => {
              setSelectedCategories(e.target.value);
              setCategoryid(Number(e.target.value));
            }}
            onClick={() => setIsDropdownOPne(true)}
            value={selectedCategories}
          >
            {!isDropdownOPne && <option>select category</option>}
            {data.GET_tutorialCategoriesFAQ.map((item: any) => {
              return (
                <option
                  style={{
                    background: "rgba(255,255,255,0.95)",
                    padding: "0px",
                    paddingTop: "5px",
                  }}
                  value={item.id}
                  onClick={() => setIsDropdownOPne(false)}
                >
                  {item.title}
                </option>
              );
            })}
          </select>
          )
        </span> */}
      </Categories>
      <Allcategories>
        <DatacategoriesTutorial>
          {data.GET_tutorialCategoriesFAQ.map((item: any, index: number) => {
            return (
              <>
                <Firstcategories>
                  <span
                    style={{
                      color: "#f296a3",
                      fontSize: "1em",
                      float: "left",
                      cursor: "pointer",
                    }}
                  >
                    {item.id}.
                  </span>
                  <span
                    style={{
                      cursor: "pointer",
                      color: categoryid === item.id ? "#f296a3" : "white",
                      textDecoration:
                        categoryid === item.id ? "underline #f296a3" : "none",
                    }}
                    onClick={() => {
                      setCategoryid(item.id);
                      setSelectedCategories(item.id);
                      setItemName(item.title);
                      setExpanded(false);
                    }}
                  >
                    {item.title}
                  </span>
                  <span
                    style={{
                      verticalAlign: "top",
                      lineHeight: "20px",
                      color: "#f296a3",
                      fontSize: " .75em",
                      marginLeft: "10px",
                      marginTop: "1px",
                      cursor: "pointer",
                    }}
                    onClick={() => Popup(index, item)}
                  >
                    (edit)
                  </span>
                </Firstcategories>
                {index === editindex && (
                  <Typography>
                    <Top style={{ fontFamily: "lato,sans-serif" }}>
                      Category Name
                    </Top>
                    <TextField
                      style={{
                        backgroundColor: titlePutCategories
                          ? "lightgreen"
                          : "pink ",
                        width: "249px",
                        marginTop: "5px",
                        marginBottom: "5px",
                      }}
                      value={titlePutCategories}
                      onChange={(e) => setTitlePutCategories(e.target.value)}
                    />
                    <Top style={{ fontFamily: "lato,sans-serif" }}>
                      Category Order
                    </Top>
                    <TextField
                      style={{
                        backgroundColor: orderPutCategories
                          ? "lightgreen"
                          : "pink ",
                        width: "249px",
                        marginTop: "10px",
                      }}
                      type="number"
                      value={orderPutCategories}
                      onChange={(e) => setOrderPutCategories(e.target.value)}
                    />
                    <Button>
                      <Button
                        style={{
                          background: "#444549",
                          border: "none",
                          color: "white",
                          minWidth: "95px",
                          marginRight: "5px",
                          fontFamily: "lato,sans-serif",
                          paddingLeft: "26pX",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setEditindex(-1);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        style={{
                          backgroundColor: "#444549",
                          border: "none",
                          color: "black",
                          minWidth: "100px",
                          background: "#f296a3",
                          fontFamily: "lato,sans-serif",
                          paddingLeft: "26pX",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          PutCategories(item);
                        }}
                      >
                        Confirm
                      </Button>
                    </Button>
                  </Typography>
                )}
              </>
            );
          })}
        </DatacategoriesTutorial>
        <Datacategories>
          {faqData.map((item: any, index: number) => {
            return (
              <>
                <FirstcategoriesTutorial>
                  <Orderid>{index + 1}.</Orderid>

                  <TutotialTitle>{item.title}</TutotialTitle>

                  <EditButton onClick={() => rightsidePopup(index, item)}>
                    (edit)
                  </EditButton>
                  {item.isFAQ && (
                    <span
                      style={{
                        width: "20px",
                        height: "10px",
                        display: " inline-block",
                        verticalAlign: "top",
                        marginTop: "4px",
                        color: "#d9a45b",
                        fontSize: "10px",
                        marginLeft: "5px",
                        marginRight: " -5px",
                        lineHeight: " 1",
                        fontWeight: "200",
                        fontStyle: " italic",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        passFaqId(item);
                      }}
                    >
                      FAQ
                    </span>
                  )}
                  {!item.active && (
                    <Cancel
                      style={{
                        width: "14px",
                        color: "red",
                        marginLeft: "15px",
                      }}
                    ></Cancel>
                  )}
                </FirstcategoriesTutorial>
                {index === editindexTutorial && (
                  <Typography>
                    <Category>
                      <Title>Tutorial Title</Title>
                      <TextField
                        style={{
                          backgroundColor: rightSideTitle
                            ? "lightgreen"
                            : "pink ",
                          width: "320px",
                          marginTop: "10px",
                        }}
                        value={rightSideTitle}
                        onChange={(e) => setRightSideTitle(e.target.value)}
                      />
                      <Title>Tutorial VideoUrl</Title>
                      <TextField
                        style={{
                          backgroundColor: rightSidevideoUrl
                            ? "lightgreen"
                            : "pink ",
                          width: "320px",
                          marginTop: "5px",
                          marginBottom: "5px",
                        }}
                        value={rightSidevideoUrl}
                        onChange={(e) => {
                          setRightSideVideoUrl(e.target.value);
                        }}
                      />
                      <TutorialOptions>
                        <TutorialBody>
                          {rightSidefaqCheck && (
                            <PopupTitle
                              style={{
                                fontSize: "12px",
                                marginBottom: "8px",
                              }}
                            >
                              Tutorial Body
                            </PopupTitle>
                          )}
                          {rightSidefaqCheck && (
                            <Tutorialtitlebody>
                              <TextareaAutosize
                                style={{
                                  backgroundColor: rightSidebody
                                    ? "lightgreen"
                                    : "pink ",
                                  height: "83px",
                                  width: "220px",
                                  border: "0px",
                                  fontSize: "16px",
                                  fontFamily: "Lato,sans-serif",
                                  overflowY: "scroll",
                                  outline: "none",
                                }}
                                value={rightSidebody}
                                onChange={(e) => {
                                  setRightSideBody(e.target.value);
                                }}
                              />
                            </Tutorialtitlebody>
                          )}
                        </TutorialBody>
                        <Tutorialorder>
                          <Titleorder>Order</Titleorder>
                          <TextField
                            type="number"
                            style={{
                              width: "70px",
                              background: rightSideorderfaq
                                ? "lightgreen"
                                : "pink ",
                              marginBottom: "12px",
                              height: "1.8rem",
                            }}
                            value={rightSideorderfaq}
                            onChange={(e) => {
                              setRightSideOrderFaq(e.target.value);
                            }}
                          />
                          <Activecheckbox>
                            <Activemaindiv>
                              <Active>Active</Active>
                              <Checkbox
                                color="primary"
                                inputProps={{
                                  "aria-label": "secondary checkbox",
                                }}
                                style={{
                                  width: " 0px",
                                  height: "0px",
                                  background: "white",
                                  fontFamily: "lato,sans-serif",
                                  border: "0px",
                                  left: "41px",
                                  bottom: "21px",
                                  margin: "0px 10px 0px",
                                  marginBottom: "10px",
                                }}
                                checked={active}
                                onChange={() => {
                                  setActive(!active);
                                }}
                              />
                            </Activemaindiv>
                            <Faq>FAQ</Faq>
                            <Checkbox
                              color="primary"
                              inputProps={{
                                "aria-label": "secondary checkbox",
                              }}
                              style={{
                                width: " 0px",
                                height: "0px",
                                margin: "0px 10px 0px",
                                background: "white",
                                fontFamily: "lato,sans-serif",
                                marginBottom: "10px",
                                border: "0px",
                                left: "41px",
                                bottom: "21px",
                              }}
                              checked={rightSidefaqCheck}
                              onChange={() => {
                                setRightSideFaqCheck(!rightSidefaqCheck);
                              }}
                            />
                          </Activecheckbox>
                        </Tutorialorder>
                      </TutorialOptions>

                      {rightSidefaqCheck && (
                        <TutorialOptions>
                          <Tutorialfaqtitle>
                            <PopupTitle
                              style={{
                                fontSize: "12px",
                                marginBottom: "8px",
                              }}
                            >
                              FAQ Title
                            </PopupTitle>
                            <Tutorialtitlebody>
                              <TextField
                                style={{
                                  background: faqUniqueTitle
                                    ? "white"
                                    : "lightgreen",
                                  border: "0px",
                                  width: "220px",
                                  height: "30px",
                                }}
                                value={faqUniqueTitle}
                                onChange={(e) => {
                                  setFaqUniqueTitle(e.target.value);
                                  setFaqTitleColor(e.target.value);
                                }}
                              />
                            </Tutorialtitlebody>
                          </Tutorialfaqtitle>

                          <Tutorialorder>
                            <Activemaindiv>
                              <Different>different</Different>
                              <Checkbox
                                color="primary"
                                inputProps={{
                                  "aria-label": "secondary checkbox",
                                }}
                                style={{
                                  width: " 0px",
                                  height: "0px",
                                  background: "white",
                                  fontFamily: "lato,sans-serif",
                                  border: "0px",
                                  left: "41px",
                                  bottom: "21px",
                                  margin: "0px 10px 0px",
                                  marginBottom: "10px",
                                }}
                                checked={different}
                                onClick={() => {
                                  setDifferent(!different);
                                }}
                              />
                            </Activemaindiv>
                          </Tutorialorder>
                        </TutorialOptions>
                      )}

                      <Button>
                        <Button
                          style={{
                            background: "#444549",
                            border: "none",
                            color: "white",
                            minWidth: "115px",
                            marginRight: "10px",
                            fontFamily: "lato,sans-serif",
                            paddingLeft: "50pX",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setEditindexTutorial(-1);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          style={{
                            backgroundColor: "#444549",
                            border: "none",
                            color: "black",
                            minWidth: "115px",
                            background: "#f296a3",
                            fontFamily: "lato,sans-serif",
                            paddingLeft: "31pX",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            PUTFaqTutorials(item);
                          }}
                        >
                          Save Tutorial
                        </Button>
                      </Button>
                    </Category>
                  </Typography>
                )}
              </>
            );
          })}
        </Datacategories>
        <MainButton>
          <div style={{ position: "absolute", bottom: "50px" }}>
            <Button1>
              <Accordion
                expanded={expanded === `pane2`}
                onChange={handleChange(`pane2`)}
                style={{ backgroundColor: "rgb(16, 16, 16)" }}
              >
                <AccordionSummary
                  style={{ background: "#f296a3" }}
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Add
                    style={{
                      width: "30px",
                      color: "white",
                      marginRight: "20px",
                    }}
                  ></Add>
                  <Typography>Add New Category</Typography>
                </AccordionSummary>
                <AccordionDetails
                  style={{
                    padding: "0px",
                  }}
                >
                  <Typography>
                    <Category>
                      <Title>Category Name</Title>
                      <TextField
                        style={{
                          backgroundColor:
                            title.length > 0 ? "lightgreen" : "pink ",
                          width: "300px",
                          marginTop: "10px",
                          background: "pink",
                        }}
                        //onChange={(e) => SetTextFeildColor(e.target.value)}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <Title>Category order</Title>
                      <TextField
                        type="number"
                        style={{
                          backgroundColor:
                            order.length > 0 ? "lightgreen" : "pink ",
                          width: "300px",
                          marginTop: "10px",
                          background: "pink",
                        }}
                        //onChange={(e) => SetTextFeildColor2(e.target.value)}
                        value={order}
                        onChange={(e) => setOrder(e.target.value)}
                      />
                      <Button>
                        <Button
                          style={{
                            background: "#444549",
                            border: "none",
                            color: "white",
                            minWidth: "102px",
                            marginRight: "25px",
                            fontFamily: "lato,sans-serif",
                            paddingLeft: "39pX",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setExpanded(false);
                            setOrder("");
                            setTitle("");
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          style={{
                            backgroundColor: "#444549",
                            border: "none",
                            color: "black",
                            minWidth: "97px",
                            background: "#f296a3",
                            fontFamily: "lato,sans-serif",
                            paddingLeft: "36pX",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            titleFAQ();
                          }}
                        >
                          Confirm
                        </Button>
                      </Button>
                    </Category>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Button1>
          </div>
          <div>
            <Button1
              style={{
                marginLeft: "20px",
              }}
            >
              <Accordion
                square
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
                style={{
                  backgroundColor: "rgb(16, 16, 16)",
                  float: "left",
                  left: "411px",
                  bottom: "50px",
                }}
              >
                <AccordionSummary
                  style={{ background: "#f296a3" }}
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Add
                    style={{
                      width: "30px",
                      color: "white",
                      marginRight: "20px",
                    }}
                  ></Add>
                  <Typography>Add New Tutorial To This Category</Typography>
                </AccordionSummary>
                <AccordionSummary
                  style={{
                    padding: "0px",
                  }}
                >
                  <Typography>
                    <Category>
                      <Title>Tutorial Title</Title>
                      <TextField
                        style={{
                          backgroundColor:
                            tutorialTitle.length > 0 ? "lightgreen" : "pink ",
                          width: "97%",
                          marginTop: "10px",
                        }}
                        value={tutorialTitle}
                        onChange={(e) => setTutorialTitle(e.target.value)}
                      />
                      <Title>Tutorial videoUrl</Title>
                      <TextField
                        style={{
                          backgroundColor: videoUrl ? "lightgreen" : "pink ",
                          width: "97%",
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                        value={videoUrl}
                        onChange={(e) => {
                          setVideoUlr(e.target.value);
                        }}
                      />
                      <TutorialOptions>
                        <TutorialBody>
                          {faqCheck && (
                            <PopupTitle
                              style={{
                                fontSize: "12px",
                                marginBottom: "8px",
                              }}
                            >
                              Tutorial Body
                            </PopupTitle>
                          )}
                          {faqCheck && (
                            <Tutorialtitlebody>
                              <TextareaAutosize
                                style={{
                                  background: "pink",
                                  height: "83px",
                                  width: "225px",
                                  border: "0px",
                                  fontSize: "16px",
                                  fontFamily: "Lato,sans-serif",
                                  overflowY: "scroll",
                                  outline: "none",
                                }}
                                value={body}
                                onChange={(e) => {
                                  setBody(e.target.value);
                                }}
                              />
                            </Tutorialtitlebody>
                          )}
                        </TutorialBody>

                        <Tutorialorder>
                          <Titleorder>Order</Titleorder>
                          <TextField
                            type="number"
                            style={{
                              width: "70px",
                              background: "pink",
                              marginBottom: "12px",
                              height: "1.8rem",
                            }}
                            value={orderfaq}
                            onChange={(e) => {
                              setOrderFaq(e.target.value);
                            }}
                          />
                          <Activecheckbox>
                            <Activemaindiv>
                              <Active>Active</Active>
                              <Checkbox
                                color="primary"
                                inputProps={{
                                  "aria-label": "secondary checkbox",
                                }}
                                style={{
                                  width: " 0px",
                                  height: "0px",
                                  background: "white",
                                  fontFamily: "lato,sans-serif",
                                  border: "0px",
                                  left: "41px",
                                  bottom: "21px",
                                  margin: "0px 10px 0px",
                                  marginBottom: "10px",
                                }}
                                checked={active}
                                onChange={() => {
                                  setActive(!active);
                                }}
                              />
                            </Activemaindiv>
                            <Faq>FAQ</Faq>
                            <Checkbox
                              color="primary"
                              inputProps={{
                                "aria-label": "secondary checkbox",
                              }}
                              style={{
                                width: " 0px",
                                height: "0px",
                                margin: "0px 10px 0px",
                                background: "white",
                                fontFamily: "lato,sans-serif",
                                marginBottom: "10px",
                                border: "0px",
                                left: "41px",
                                bottom: "21px",
                              }}
                              checked={faqCheck}
                              onChange={() => {
                                setFaqCheck(!faqCheck);
                              }}
                            />
                          </Activecheckbox>
                        </Tutorialorder>
                      </TutorialOptions>

                      {faqCheck && (
                        <TutorialOptions>
                          <Tutorialfaqtitle>
                            <PopupTitle
                              style={{
                                fontSize: "12px",
                                marginBottom: "8px",
                              }}
                            >
                              FAQ Title
                            </PopupTitle>
                            <Tutorialtitlebody>
                              <TextField
                                style={{
                                  background: differentadd
                                    ? faqUniqueTitleadd
                                      ? "lightgreen"
                                      : "pink"
                                    : "white",
                                  border: "0px",
                                  width: "220px",
                                  height: "30px",
                                }}
                                value={faqUniqueTitleadd}
                                onChange={(e) => {
                                  setFaqUniqueTitleadd(e.target.value);
                                  setFaqTitledifferent(e.target.value);
                                }}
                              />
                            </Tutorialtitlebody>
                          </Tutorialfaqtitle>

                          <Tutorialorder>
                            <Activemaindiv>
                              <Different>different</Different>
                              <Checkbox
                                color="primary"
                                inputProps={{
                                  "aria-label": "secondary checkbox",
                                }}
                                style={{
                                  width: " 0px",
                                  height: "0px",
                                  background: "white",
                                  fontFamily: "lato,sans-serif",
                                  border: "0px",
                                  left: "41px",
                                  bottom: "21px",
                                  margin: "0px 10px 0px",
                                  marginBottom: "10px",
                                }}
                                checked={differentadd}
                                onClick={() => {
                                  setDifferentadd(!differentadd);
                                }}
                              />
                            </Activemaindiv>
                          </Tutorialorder>
                        </TutorialOptions>
                      )}

                      <Button>
                        <Button
                          style={{
                            background: "#444549",
                            border: "none",
                            color: "white",
                            minWidth: "130px",
                            marginRight: "10px",
                            fontFamily: "lato,sans-serif",
                            paddingLeft: "60pX",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setExpanded(false);
                            setTutorialTitle("");
                            setVideoUlr("");
                            setBody("");
                            setOrderFaq("");
                            setActive(false);
                            setFaqCheck(false);
                            setFaqUniqueTitle("");
                            setDifferent(false);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          style={{
                            backgroundColor: "#444549",
                            border: "none",
                            color: "black",
                            minWidth: "137px",
                            background: "#f296a3",
                            fontFamily: "lato,sans-serif",
                            paddingLeft: "45pX",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            dataFAQ();
                          }}
                        >
                          Save Tutorial
                        </Button>
                      </Button>
                    </Category>
                  </Typography>
                </AccordionSummary>
              </Accordion>
            </Button1>
          </div>
        </MainButton>
      </Allcategories>
    </MainDiv>
  );
};
