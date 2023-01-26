import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ViewComfyIcon from "@material-ui/icons/ViewComfy";
import ViewListIcon from "@material-ui/icons/ViewList";
import { useQuery, useMutation } from "@apollo/client";
import {
  DesignCounts,
  userCompositions,
  TemplateSearch,
  CompositionDL,
  DownloadImage,
  CheckStatus,
  AllDesignCount,
  TemplateCount,
} from "../../../lib/contexts/Queries";
import { Link, useHistory } from "react-router-dom";
import ListView from "../home/listView";
import GridView from "../home/gridView";
import SearchAppBar from "./searchfield";
import DefaultViews from "./defaultViews";
import { ReactComponent as Icon } from "../../../assets/svg/create.svg";
import { ReactComponent as Edit } from "../../../assets/svg/New folder/edit.svg";
import { ReactComponent as Bin } from "../../../assets/svg/New folder/bin.svg";
import { ReactComponent as Download2 } from "../../../assets/svg/New folder/download2.svg";
import { ReactComponent as TextOutline } from "../../../assets/svg/New folder/textOutline.svg";
import { ReactComponent as Status } from "../../../assets/svg/New folder/status.svg";
import { ReactComponent as TickCircle } from "../../../assets/svg/New folder/tick-circle.svg";
import { ReactComponent as ClipBoard } from "../../../assets/svg/New folder/clipboards.svg";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { motion, AnimatePresence } from "framer-motion";
// import {ReactComponent as Search} from "../../../assets/svg/New folder/search.svg";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { AvailableTask } from "../../../admin/AvailableTask";

const ContentSection = styled.div`
  background: #e5e6e6;
  min-height: 89vh;
`;
const BackgroundColor = styled(motion.div)`
  background-color: #222841;
  position: relative;
  z-index: auto;
  padding: 100px 0 30px 0;
  position: relative;
  box-shadow: inset 0 -25px 40px -25px black;
`;

const DivContainer = styled.div`
  width: 1170px;
  margin: auto;
`;

const DivContainer2 = styled.div`
  width: 1170px;
  margin: auto;
`;

const ToggleUPIcon = styled.div`
  width: 48px;
  height: 48px;
  position: absolute;
  border: 1px solid #000;
  margin: auto;
  display: block;
  left: 0;
  right: 0;
  box-shadow: 0 0 10px;
  border-radius: 100%;
  margin-top: 4px;
  background: #e5e6e6;
  cursor: pointer;
`;

const AddMoreSlideArea = styled.div`
  min-height: auto;
  overflow: auto;
  overflow-x: hidden;
`;

const AddMoreInnerDiv = styled.div`
  padding: 40px 80px 15px 80px;
`;

const MyDesignUl = styled.ul`
  margin: 0;
  display: inline;
  padding: 0;
  width: 50%;
`;

const MyDesignLi = styled.li`
  display: inline-block;
  list-style: none;
  font-weight: 400;
  color: #232428;
  font-size: 1.15em;
  vertical-align: top;
  cursor: pointer;
`;
const Span = styled.span`
  display: inline-block;
  margin: 0 25px 0 35px;
  border-right: 1px solid #b1b1b1;
  height: 20px;
  margin-top: 4px;
  cursor: inherit;
`;

const Count = styled.span`
  font-size: 0.75em;
  color: #592e6f;
`;

const AddSlideSection = styled.div`
  width: 276px;
  height: 190px;
  border: 5px dashed #592e6f;
  margin-top: 40px;
  cursor: pointer;
  &:hover {
    background-color: #441b59;
  }
`;

const Plus = styled.h1`
  margin: 0;
  text-align: center;
  font-size: 80px;
  color: #592e6f;
  padding-top: 21px;
`;

const Design = styled.p`
  color: #e87855;
  text-align: center;
  margin: 0;
`;

const MyDesignrightUl = styled.ul`
  width: 50%;
  float: right;
  margin: 0;
  text-align: right;
`;

const MyDesignright = styled.li`
  display: inline-block;
  list-style: none;
  font-weight: 400;
  color: #232428;
  font-size: 1.15em;
  vertical-align: top;
  cursor: pointer;
  margin-right: 10px;
`;

const CreateNewDesignButton = styled.button`
  position: absolute;
  top: 10px;
  height: 51px;
  width: 205px;
  color: #e87855;
  border: 1px solid #858585;
  textalign: center;
  padding: 7px;
  background: transparent;
  outline: none !important;
  right: 42%;
  font-size: 16px;
  font-weight: 250;
  display: flex;
  fontfamily: inherit;
  cursor: pointer;
  &:hover {
    border-color: #e87855;
  }
`;
const RightSide = styled.div`
  flex: 0 !important;
`;
const RightUlside = styled.ul`
  text-align: center;
  list-style: none;
`;
const RightLiSide = styled.li`
  color: white;
  cursor: pointer;
  outline: none;
`;
const DropDown = styled.div`
  margin-left: 5px;
  margin-top: -5px;
  position: relative;
  border: solid #592e6f;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(45deg);
  z-index: 2;
`;
const StyleDiv = styled.div`
  text-align: center;
  width: 120px;
  &: hover {
    color: #592e6f;
  }
`;
const TemplateControlScrollBar = styled.div`
  position: relative;
  transition: opacity 0.5s linear;
  margin: 0px 4px;
  height: 40vh;
  overflow: hidden;
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

// const StyledLink = styled.div`
// color: #212529;
// text-decoration: none;
// fontSize: 16px;
// fontFamily: ['"Lato"', "sans-serif  !important"].join(",");
// &:hover {
//   color: #e87855;
//  background-color: #fff;
// `;
const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#000000",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#000000",
    color: "#ffffff",
    width: "80px",
    height: "15px",
    fontSize: "12px",
    textAlign: "center",
    border: "1px solid #dadde9",
    padding: 10,
  },
}));
const EditTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    width: "60px",
    height: "15px",
    fontSize: "12px",
    textAlign: "center",
    border: "1px solid #dadde9",
    padding: 10,
    // letterSpacing: "0.1em",
  },
}));
export const PrivateHome = () => {
  const [searchValue, setSearchValue] = useState("");
  const [toSearch, setToSearch] = useState(false);
  const [show, setShow] = useState(true);
  const [showList, setShowList] = useState(false);
  const [thumbDetails, setThumbDetails] = useState({}) as any;
  const [checkStatus] = useMutation(CheckStatus);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [showGrid, setShowGrid] = useState(false);
  const [showDiv, setShowDiv] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTask, setIsTask] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [tempData, setTempData] = useState([]) as any;
  const [templateData] = useMutation(TemplateSearch);
  const [compositionDL] = useMutation(CompositionDL);
  const [imgDownload] = useMutation(DownloadImage);
  const [isSelected, setIsSelected] = useState(false);
  const [menuName, setMenuName] = useState("My Designs");
  const [gridCount, setGridCount] = useState(0);
  const tempScroll = useRef<HTMLDivElement>(null);
  const [imgPage, setImgPage] = useState(0);
  const [offSet, setOffSet] = useState(0);
  const [imgFilter, setImgFilter] = useState(
    `{"page":${imgPage},"resultsPerPage":20}`
  );
  const history = useHistory();
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const getData = (val: any) => {
    setTempData(val);
    console.log(val, "GET_templateCategories");
  };
  const {
    data,
    loading,
    error,
    refetch: countRefetch,
  } = useQuery(
    menuName === "My Designs"
      ? DesignCounts
      : menuName === "All Design"
      ? AllDesignCount
      : TemplateCount,
    {
      variables: {
        where: {},
        token: `${localStorage.getItem("token")}`,
      },
    }
  );
  const {
    data: myDsigndata,
    loading: myDesignloading,
    error: myDesignerror,
  } = useQuery(userCompositions, {
    variables: {
      filter: `{\"custom\":true,\"offset\":0,\"limit\":20}`,
      token: `${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    setImgFilter(() => `{"page":${imgPage},"resultsPerPage":20}`);
  }, [imgPage]);

  useEffect(() => {
    if (myDsigndata) {
      let c = myDsigndata && myDsigndata.GET_users_compositions.length !== 0;
      setShowGrid(c);
      setShowDiv(!c);
    }
  }, [myDsigndata]);
  useEffect(() => {
    if (data) {
      if (menuName === "My Designs") {
        console.log(data.GET_users_compositions_count.count, "mydesigndata");
        setGridCount(data.GET_users_compositions_count.count);
      } else if (menuName === "All Design") {
        console.log(data.GET_all_design_compositions_count.count, "data");
        setGridCount(data.GET_all_design_compositions_count.count);
      } else {
        console.log(data.GET_templates_count.count, "templatecount");
        setGridCount(data.GET_templates_count.count);
      }
    }
  }, [data]);

  //-----------------------------EditButton-------------------------------

  const getTempData = async () => {
    if (!isSelected) {
      await templateData({
        variables: {
          input:
            '{"from":0,"size":20,"body":{"query":{"bool":{"must":[{"term":{"categoryId":256}}]}},"sort":[{"starRating":"desc"},{"createdAt":"desc"}]}}',
          token: `${localStorage.getItem("token")}`,
        },
      }).then((result: any) => {
        history.push("/dashboard/workspace");
      });
    }
  };

  //-----------------------------Download CompositionDL-------------------------------

  const compositiondl = async () => {
    console.log(thumbDetails.composer_object);

    let composer_object = JSON.parse(thumbDetails.composer_object);
    var ext = JSON.parse(thumbDetails.composer_object);
    var e = ext[0].extension;
    await compositionDL({
      variables: {
        token: `${localStorage.getItem("token")}`,
        input: JSON.stringify({
          composition: {
            categoryId: thumbDetails.categoryId,
            compositionId: thumbDetails.compositionId,
            composer_object: composer_object,
            customSize: null,
            // designType: "static",
          },
        }),
      },
    }).then((result) => {
      if (
        result &&
        result.data.POST_users_me_compositionDL.status === "queued"
      ) {
        return statusCheck(
          result.data.POST_users_me_compositionDL.id,
          e,
          result.data.POST_users_me_compositionDL,
          thumbDetails
        );
      }
      console.log(result.data.POST_users_me_compositionDL.status);
    });
  };

  //-----------------------------Download Image -------------------------------

  const downlaodImage = async (item: any, result: any) => {
    await imgDownload({
      variables: {
        token: `${localStorage.getItem("token")}`,
        input: JSON.stringify({
          files: result.files,
          compositionId: item.compositionId,
        }),
      },
    }).then((result) => {
      setDownloadUrl(result.data.POST_users_me_downloadImages.url);

      var element = document.createElement("a");
      var file = new Blob([result.data.POST_users_me_downloadImages.url], {
        // type: "image/*",
        type: "text/plain;charset=utf-8}",
      });
      element.href = result.data.POST_users_me_downloadImages.url;
      element.download = "image.jpg";
      element.click();
    });
  };

  //-----------------------------Status Check -------------------------------
  let downloadCount = 0;
  const statusCheck = async (
    id: any,
    e: any,
    compositionDl: any,
    item: any
  ) => {
    setTimeout(async () => {
      await checkStatus({
        variables: {
          token: `${localStorage.getItem("token")}`,
          input: JSON.stringify({ files: [`${id}_1.${e}`] }),
        },
      }).then(async (result) => {
        if (
          result.data.POST_users_me_checkDownloadQueue.status === "queued" &&
          downloadCount < 20
        ) {
          downloadCount++;
          console.log(downloadCount);
          await statusCheck(id, e, compositionDl, item);
        }

        if (result.data.POST_users_me_checkDownloadQueue.status === "ready") {
          console.log(result);
          return downlaodImage(
            item,
            result.data.POST_users_me_checkDownloadQueue
          );
        }
      });
    }, 5000);
  };

  useEffect(() => {
    const user: any = localStorage.getItem("user");
    const userData = JSON.parse(user);
    console.log(userData);
    for (let i of userData.roles) {
      if (i.name === "admin") {
        setIsAdmin(true);
      }
    }
  }, []);
  const handleShowList = () => {
    setShowGrid(false);
    setShowList(true);
    setShowDiv(false);
  };
  const getSearchText = (val: any) => {
    setSearchValue(val);
  };
  const setSearch = (val: any) => {
    setToSearch(val);
  };

  const handleShowGrid = () => {
    setShowGrid(true);
    setShowList(false);
    setShowDiv(false);
  };
  const handleShowDiv = () => {
    setShowGrid(false);
    setShowList(false);
    setShowDiv(true);
  };
  const toggleTaskPopup = () => {
    console.log("toggleCalled");
    setIsTask(!isTask);
  };

  const onTempScroll = () => {
    if (tempScroll.current) {
      const { scrollTop, scrollHeight, clientHeight } = tempScroll.current;
      if (scrollTop + clientHeight + 1 >= scrollHeight) {
        setOffSet((oldValue: any) => {
          const newValue = oldValue + 5;
          return newValue;
        });
      }
    }
  };

  if (loading) return "loading...";
  if (error) return `Error! ${error.message}`;
  if (myDesignloading) return <>"loading..."</>;
  if (myDesignerror) return `Error! ${myDesignerror.message}`;

  return (
    <>
      {isTask && <AvailableTask handleTaskClose={toggleTaskPopup} />}
      <ContentSection style={{ height: "100%" }}>
        {!show && (
          <CreateNewDesignButton onClick={() => setShow(true)}>
            <Icon
              style={{
                width: "35px",
                height: "35px",
                color: "white",
                marginTop: "5px",
              }}
            />
            <span style={{ marginTop: "15px", marginLeft: "10px" }}>
              Create New Design
            </span>
          </CreateNewDesignButton>
        )}
        <AnimatePresence>
          {show ? (
            <BackgroundColor
              key="box"
              initial={{ y: -200 }}
              animate={{ y: 0 }}
              exit={{ y: -200 }}
              transition={{ transition: "linear" }}
            >
              <DivContainer>
                <DefaultViews getData={getData} />
              </DivContainer>
              <ToggleUPIcon onClick={() => setShow(!show)}>
                <KeyboardArrowUpIcon
                  style={{ color: "#592e6f", padding: "2px", fontSize: "42px" }}
                />
              </ToggleUPIcon>
            </BackgroundColor>
          ) : null}
        </AnimatePresence>
        {/* add more content */}
        <AddMoreSlideArea>
          <DivContainer2>
            <AddMoreInnerDiv>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {!isAdmin && (
                  <MyDesignUl>
                    <MyDesignLi>
                      My Designs
                      <Count>({data.GET_users_compositions_count.count})</Count>
                    </MyDesignLi>
                    <MyDesignLi>
                      <Span> </Span>
                    </MyDesignLi>
                    <Link to="/dashboard/purchase-history">
                      <MyDesignLi> Purchased </MyDesignLi>
                    </Link>
                  </MyDesignUl>
                )}
                {isAdmin && (
                  <div>
                    <MyDesignUl onClick={handleClick}>
                      <MyDesignLi>
                        {menuName}
                        <Count>({gridCount})</Count>
                      </MyDesignLi>
                      <DropDown></DropDown>
                    </MyDesignUl>
                    <Menu
                      style={{ marginTop: 50, padding: 35 }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      onClick={handleClose}
                      PaperProps={{
                        elevation: 0,
                      }}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      {/* {anchorEl && <div style={{backgroundColor: "white",position: "absolute", zIndex: "1000",float: "left"}}> */}
                      <MenuItem
                        onClick={() => {
                          setMenuName("My Designs");
                          console.log("mydesign");
                        }}
                      >
                        {menuName === "My Designs" && (
                          <TickCircle
                            style={{
                              width: "30px",
                              height: "30px",
                              color: "#592e6f",
                            }}
                          />
                        )}
                        <StyleDiv
                          style={{
                            fontSize: "16px",
                            fontFamily: "Lato, sans-serif",
                          }}
                        >
                          My Designs
                        </StyleDiv>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setMenuName("All Design");
                        }}
                      >
                        {menuName === "All Design" && (
                          <TickCircle
                            style={{
                              width: "30px",
                              height: "30px",
                              color: "#592e6f",
                              padding: 0,
                            }}
                          />
                        )}

                        <StyleDiv
                          style={{
                            fontSize: "16px",
                            fontFamily: "Lato, sans-serif",
                          }}
                        >
                          All Design
                        </StyleDiv>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setMenuName("Templates");
                        }}
                      >
                        {menuName === "Templates" && (
                          <TickCircle
                            style={{
                              width: "30px",
                              height: "30px",
                              color: "#592e6f",
                            }}
                          />
                        )}
                        <StyleDiv
                          style={{
                            fontSize: "16px",
                            fontFamily: "Lato, sans-serif",
                          }}
                        >
                          Templates
                        </StyleDiv>
                      </MenuItem>
                      {/* </div>} */}
                    </Menu>
                  </div>
                )}
                {/* right side navigation */}
                <MyDesignrightUl>
                  {/* <MyDesignright>  </MyDesignright> */}
                  <MyDesignright>
                    <div style={{ marginRight: "10px", marginTop: "0px" }}>
                      <SearchAppBar
                        getSearchText={getSearchText}
                        setSearch={setSearch}
                        searchValue={searchValue}
                      />
                    </div>
                  </MyDesignright>
                  <MyDesignright>
                    {" "}
                    <ViewComfyIcon
                      onClick={() => {
                        myDsigndata.GET_users_compositions.length !== 0
                          ? handleShowGrid()
                          : handleShowDiv();
                      }}
                      style={{
                        color: "#592e6f",
                        width: "36px",
                        height: "35px",
                        fontFamily: "Lato, sans-serif",
                        fontSize: "16px",
                      }}
                    />{" "}
                  </MyDesignright>
                  <MyDesignright>
                    {" "}
                    <ViewListIcon
                      onClick={() => {
                        myDsigndata.GET_users_compositions.length !== 0
                          ? handleShowList()
                          : handleShowDiv();
                      }}
                      style={{
                        color: "#592e6f",
                        width: "36px",
                        height: "35px",
                        fontFamily: "Lato, sans-serif",
                        fontSize: "16px",
                      }}
                    />{" "}
                  </MyDesignright>
                </MyDesignrightUl>
              </div>

              {/* add more slider click */}
              <div
                style={{
                  display: "flex",
                }}
              >
                {showList ? (
                  <ListView
                    tempData={tempData}
                    searchValue={searchValue}
                    toSearch={toSearch}
                    showList={showList}
                    menuName={menuName}
                    offSet={offSet}
                    countRefetch={countRefetch}
                    setSearch={setSearch}
                  />
                ) : null}
                {console.log(tempData)}

                <div
                  style={{
                    display: "flex",
                    marginTop: "1rem",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <TemplateControlScrollBar
                      onScroll={onTempScroll}
                      ref={tempScroll}
                    >
                      {/* <TemplateControlScrollBar> */}
                      {showGrid ? (
                        <GridView
                          tempData={tempData}
                          searchValue={searchValue}
                          toSearch={toSearch}
                          showGrid={showGrid}
                          menuName={menuName}
                          setIsSelected={setIsSelected}
                          setThumbDetails={setThumbDetails}
                          offSet={offSet}
                          countRefetch={countRefetch}
                          setSearch={setSearch}
                          // }}
                        />
                      ) : null}
                      {/* </TemplateControlScrollBar> */}
                    </TemplateControlScrollBar>
                    {/* <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                  }}
                > */}
                    {/* <ul> */}
                    {isAdmin && (
                      <>
                        {/* <RightSide> */}
                        <RightUlside>
                          <hr
                            style={{
                              width: "100%",
                              marginTop: "1.8rem",
                              borderTop: "1px dashed rgba(89,46,111,0.2)",
                            }}
                          />
                          <EditTooltip title="Open" placement="bottom" arrow>
                            <RightLiSide>
                              <div style={{ display: "inline-block" }}>
                                <Edit
                                  style={{
                                    color: isSelected ? "#333333" : "grey",
                                    width: "44px",
                                  }}
                                  onClick={() => {
                                    getTempData();
                                  }}
                                />
                              </div>
                            </RightLiSide>
                          </EditTooltip>
                          <EditTooltip title="Delete" placement="bottom" arrow>
                            <RightLiSide>
                              <div style={{ display: "inline-block" }}>
                                <Bin
                                  style={{
                                    color: isSelected ? "#333333" : "grey",
                                    width: "35.43px",
                                    height: "43.31px",
                                  }}
                                />
                              </div>
                            </RightLiSide>
                          </EditTooltip>
                          <EditTooltip
                            title="Download"
                            placement="bottom"
                            arrow
                          >
                            <RightLiSide>
                              <div style={{ display: "inline-block" }}>
                                <Download2
                                  style={{
                                    color: isSelected ? "#333333" : "grey",
                                    width: "44px",
                                  }}
                                  onClick={() => {
                                    compositiondl();
                                  }}
                                />
                              </div>
                            </RightLiSide>
                          </EditTooltip>
                          <HtmlTooltip
                            title="Edit Keywords"
                            placement="bottom"
                            arrow
                          >
                            <RightLiSide>
                              <div style={{ display: "inline-block" }}>
                                <TextOutline
                                  style={{
                                    color: isSelected ? "#333333" : "grey",
                                    width: "44px",
                                  }}
                                />
                              </div>
                            </RightLiSide>
                          </HtmlTooltip>
                          <HtmlTooltip
                            title="Change Status"
                            placement="bottom"
                            arrow
                          >
                            <RightLiSide>
                              <div style={{ display: "inline-block" }}>
                                <Status
                                  style={{
                                    color: isSelected ? "#333333" : "grey",
                                    width: "44px",
                                  }}
                                />
                              </div>
                            </RightLiSide>
                          </HtmlTooltip>
                          <HtmlTooltip
                            title="Add to Task"
                            placement="bottom"
                            arrow
                          >
                            <RightLiSide>
                              <div style={{ display: "inline-block" }}>
                                <ClipBoard
                                  style={{
                                    color: isSelected ? "#333333" : "grey",
                                    width: "44px",
                                    opacity: isSelected ? 1 : 0.5,
                                  }}
                                  onClick={toggleTaskPopup}
                                />
                              </div>
                            </RightLiSide>
                          </HtmlTooltip>
                        </RightUlside>
                        {/* </RightSide> */}
                      </>
                    )}
                    {/* </ul> */}
                  </div>
                </div>
              </div>
              {/* </div> */}
              {showDiv ? (
                <AddSlideSection>
                  <Link
                    to={{
                      pathname: "/dashboard/workspace",
                      state: { editor: "image" },
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    <Plus> + </Plus>
                    <Design> Design </Design>
                  </Link>
                </AddSlideSection>
              ) : null}
            </AddMoreInnerDiv>
          </DivContainer2>
        </AddMoreSlideArea>
      </ContentSection>
    </>
  );
};
