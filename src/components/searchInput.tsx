import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import styled from "styled-components";
import { GetVideoSubTypes, GetAssetSubTypes } from "../lib/contexts/Queries";
import { useQuery } from "@apollo/client";
import { ReactComponent as CancelIcon } from "../assets/svg/cross.svg";
import { ReactComponent as Cancel } from "../assets/svg/cross1.svg";
import { ReactComponent as Filter } from "../assets/svg/filter.svg";
// import { ReactComponent as Cross} from "../assets/svg/New folder/cross.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    display: "flex",
    alignItems: "center",
    width: "100%",
    borderRadius: "unset",
    marginBottom: "1rem",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export interface Video {
  active?: any;
  property?: any;
  people?: any;
  filter?: any;
  quality?: any;
  prop?: any;
}

const VideoFlterWrapper = styled.div`
  padding: 0;
  margin-top: 9px;
  width: 355px;
  border-radius: 0 5px 5px 0;
  max-height: 75vh;
  position: absolute;
  background-color: white;
  z-index: 100000;
  top: 40px;
`;

const ShowBtnWrapper = styled.div`
  width: 100%;
  display: block;
  height: 50px;
`;
const ShowResultBtn = styled.div`
  float: right;
  margin: 5px;
  background-color: #2fc6c0;
  padding: 0 10px;
  color: white;
  height: 30px;
  font-size: 14px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: #2fc6c0;
    border: 1px solid #2fc6c0;
  }
`;

const ClearBtn = styled.div`
  display: flex;
  float: left;
  margin: 5px;
  background-color: white;
  padding: 0 10px;
  color: #dc7070;
  height: 30px;
  font-size: 14px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: #dc7070;
    color: white;
    border: 1px solid #dc7070;
  }
`;

const VideoQuality = styled.div`
  margin: 10px 15px 0 15px;
  font-size: 18px;
  font-weight: bolder;
  color: #374658;
`;

const VideoFilterBtnWrapper = styled.div`
  display: flex;
  justify-content: start;
  padding: 11px;
  flex-wrap: wrap;
`;

// const ClearBtnn = styled.div`
// background: transparent;
//     width: 25px;
//     height: 25px;
//     border-radius: 25px;
//     -webkit-border-radius: 25px;
//     -moz-border-radius: 25px;
//     position: relative;
//     cursor: pointer;
//     display: block;
//     z-index: 999;
//     outline: none;
//     position: absolute;
//     top: 10px;
//     right: 30px;
//     padding-left: 0px;
//     &: hover {
//       border: 1px solid #e6e6e8;
//     }
// `;

const VideoFilterBtn = styled.div<Video>`
  padding: 0 6px;
  min-width: 70px;
  height: 30px;
  display: block;
  border: 1px solid #2d3559;
  background-color: #dcdbde;
  position: relative;
  border-radius: 3px;
  margin: 3px;
  outline: none;
  font-size: 12px;
  text-align: center;
  color: #464555;
  line-height: 30px;
  &: hover {
    background-color: #2d3559;
    color: white;
    border: 1px solid #2d3559;
  }
  ${({ active, property, people, quality, prop }) =>
    (active || property || people || quality || prop) &&
    `
  background-color: #2d3559;
  color: white;
  border: 1px solid #2d3559;
  `}
`;

const ChooseFilterBtn = styled.div<Video>`
  padding: 0 6px;
  min-width: 70px;
  height: 50px;
  display: block;
  border: 1px solid #2d3559;
  background-color: #dcdbde;
  position: relative;
  border-radius: 3px;
  margin: 3px;
  outline: none;
  cursor: pointer;
  font-size: 0.8em;
  text-align: center;
  color: #464555;
  line-height: 80px;
  &: hover {
    background-color: #2d3559;
    color: white;
    border: 1px solid #2d3559;
  }
  ${({ filter }) =>
    filter &&
    `
  background-color: #2d3559;
  color: white;
  border: 1px solid #2d3559;
  `}
`;

// const FilterImg = styled.img`
//   height: 30px;
//   width: 30px;
//   margin-left: 5px;
// `;
const searchFilter = [
  { name: "Backgrounds", filter: "backdrop" },
  { name: "People", filter: "human" },
  { name: "Illustrations", filter: "graphic" },
  { name: "ID", filter: "wbmId", access: "TEMPLATE_EDIT" },
  { name: "File", filter: "originalPath", access: "TEMPLATE_EDIT" },
  { name: "Icons", filter: "wbm_icon" },
  { name: "Effects", filter: "wbm_effects" },
  { name: "Logos", filter: "wmb_logo" },
  { name: "Arrows", filter: "wbm_line" },
  { name: "Borders", filter: "wbm_border" },
  { name: "Frames", filter: "wbm_frame" },
  { name: "Bubbles", filter: "wbm_bubble" },
  { name: "Promos", filter: "wbm_promo" },
  { name: "Infographics", filter: "wbm_infographic" },
  { name: "Labels", filter: "wbm_label" },
  { name: "Characters", filter: "wbm_character" },
  { name: "Text", filter: "wbm_text" },
  { name: "Patterns", filter: "wbm_pattern" },
  { name: "Swirls", filter: "wbm_swirl" },
  { name: "Textures", filter: "wbm_texture" },
  { name: "Silhouettes", filter: "wbm_sillhoutte" },
];
const VideoFilter = (props: any) => {
  const { getVidFilter, setShowFilter, setFilterColor } = props;
  const [quality, setQuality] = useState("all");
  const [prop, setProp] = useState("false");
  const [people, setPeople] = useState("");
  const [filter, setFilter] = useState("");
  const [clearIcon, setClearIcon] = useState({
    quality: "all",
    prop: "false",
    people: "",
    filter: "",
  });
  useEffect(() => {
    if (filter) {
      setFilterColor("video");
    }
  }, [filter]);
  useEffect(() => {
    if (clearIcon.filter === "") {
      setFilter("");
    }
    if (clearIcon.prop === "all") {
      setProp("all");
    }
    if (clearIcon.quality === "all") {
      setQuality("all");
    }
    if (clearIcon.people === "") {
      setPeople("");
    }
  }, [clearIcon]);
  const getVidSubType = useQuery(GetVideoSubTypes, {
    variables: {
      token: `${localStorage.getItem("token")}`,
    },
  });
  if (getVidSubType.loading) return <>Loading</>;
  if (getVidSubType.error) return <>Error: {getVidSubType.error}</>;
  const style = {
    height: "15px",
    width: "15px",
    fill: "#dc7070",
    top: "-4px",
    right: "-5px",
    cursor: "pointer",
    backgroundColor: "#dc7070",
    borderRadius: "50%",
    zIndex: 1000000,
  };
  return (
    <VideoFlterWrapper>
      <ShowBtnWrapper>
        {quality && prop && people && filter && (
          <ClearBtn
            onClick={() => {
              setFilterColor("");
              setFilter("");
              setQuality("all");
              setProp("false");
              setPeople("");
            }}
          >
            <span>
              <Cancel
                style={{ width: "20px", height: "15px", paddingTop: "38%" }}
              />
            </span>
            Clear Filters
          </ClearBtn>
        )}
        <ShowResultBtn
          onClick={() => {
            const filters = {
              filter: filter != "" ? `wbm_${filter.toLowerCase()}` : null,
              is4k: quality === "4k" ? true : false,
              library: "wbmvideo",
              noOfModels: Number(people),
              page: 0,
              resultsPerPage: 45,
              transparent: prop === "true" ? true : null,
            };
            getVidFilter(JSON.stringify(filters));
            setShowFilter(false);
            console.log(filters);
          }}
        >
          Show Results
        </ShowResultBtn>
      </ShowBtnWrapper>
      <div>
        <VideoQuality>Video Quality</VideoQuality>
        <VideoFilterBtnWrapper>
          <VideoFilterBtn
            active={quality === "all" ? quality : ""}
            onClick={() => {
              setQuality("all");
            }}
          >
            All
            {quality === "all" && (
              <CancelIcon
                style={{ ...style, position: "absolute" }}
                onClick={() => setQuality("all")}
              />
            )}
          </VideoFilterBtn>
          <VideoFilterBtn active={quality === "4k" ? quality : ""}>
            <div
              onClick={() => {
                setQuality("4k");
                setClearIcon({ ...clearIcon, quality: "4k" });
              }}
            >
              4K{" "}
            </div>
            {quality === "4k" && (
              <CancelIcon
                style={{ ...style, position: "absolute" }}
                onClick={() => setQuality("all")}
              />
            )}
          </VideoFilterBtn>
          <VideoFilterBtn active={quality === "hd" ? quality : ""}>
            <div
              onClick={() => {
                setQuality("hd");
                setClearIcon({ ...clearIcon, quality: "hd" });
              }}
            >
              HD{" "}
            </div>
            {quality === "hd" && (
              <CancelIcon
                style={{ ...style, position: "absolute" }}
                onClick={() => setQuality("all")}
              />
            )}
          </VideoFilterBtn>
        </VideoFilterBtnWrapper>
      </div>
      <div>
        <VideoQuality>Video Properties</VideoQuality>
        <VideoFilterBtnWrapper>
          <VideoFilterBtn
            property={prop === "all" ? prop : ""}
            onClick={() => setProp("all")}
          >
            All
            {prop === "all" && (
              <CancelIcon
                style={{ ...style, position: "absolute" }}
                onClick={() => setProp("all")}
              />
            )}
          </VideoFilterBtn>
          <VideoFilterBtn property={prop === "transparent" ? prop : ""}>
            <div
              onClick={() => {
                setProp("transparent");
                setClearIcon({ ...clearIcon, prop: "true" });
              }}
            >
              Transparent{" "}
            </div>
            {prop === "transparent" && (
              <CancelIcon
                style={{ ...style, position: "absolute" }}
                onClick={() => {
                  setProp("all");
                  // setClearIcon({...clearIcon,prop : "all"});
                }}
              />
            )}
          </VideoFilterBtn>
        </VideoFilterBtnWrapper>
      </div>
      <div>
        <VideoQuality>People</VideoQuality>
        <VideoFilterBtnWrapper>
          <VideoFilterBtn people={people === "0" ? people : ""}>
            <div
              onClick={() => {
                setPeople("0");
                setClearIcon({ ...clearIcon, people: "0" });
              }}
            >
              None
            </div>
            {people === "0" && (
              <CancelIcon
                style={{ ...style, position: "absolute" }}
                onClick={() => {
                  setPeople("");
                }}
              />
            )}
          </VideoFilterBtn>
          <VideoFilterBtn people={people === "1" ? people : ""}>
            <div
              onClick={() => {
                setPeople("1");
                setClearIcon({ ...clearIcon, people: "1" });
              }}
            >
              One Person
            </div>
            {people === "1" && (
              <CancelIcon
                style={{ ...style, position: "absolute" }}
                onClick={() => {
                  setPeople("");
                }}
              />
            )}
          </VideoFilterBtn>
          <VideoFilterBtn people={people === "2" ? people : ""}>
            <div
              onClick={() => {
                setPeople("2");
                setClearIcon({ ...clearIcon, people: "2" });
              }}
            >
              Two Person
            </div>
            {people === "2" && (
              <CancelIcon
                style={{ ...style, position: "absolute" }}
                onClick={() => {
                  setPeople("");
                }}
              />
            )}
          </VideoFilterBtn>
          <VideoFilterBtn people={people === "9999" ? people : ""}>
            <div
              onClick={() => {
                setPeople("9999");
                setClearIcon({ ...clearIcon, people: "9999" });
              }}
            >
              Group of People
            </div>
            {people === "9999" && (
              <CancelIcon
                style={{ ...style, position: "absolute" }}
                onClick={() => {
                  setPeople("");
                }}
              />
            )}
          </VideoFilterBtn>
        </VideoFilterBtnWrapper>
      </div>
      <div>
        <VideoQuality>Choose a filter</VideoQuality>
        <div style={{ overflowY: "scroll", height: "180px" }}>
          <VideoFilterBtnWrapper>
            {getVidSubType.data.GET_videoSubTypes.map(
              (item: any, index: number) => {
                return (
                  <ChooseFilterBtn
                    key={index}
                    filter={filter === item ? item : ""}
                  >
                    <div
                      onClick={() => {
                        setFilter(item);
                        setClearIcon({ ...clearIcon, filter: item });
                      }}
                    >
                      {item}
                    </div>
                    {filter === item && (
                      <CancelIcon
                        style={{ ...style, position: "absolute" }}
                        onClick={() => {
                          setFilter("");
                        }}
                      />
                    )}
                  </ChooseFilterBtn>
                );
              }
            )}
          </VideoFilterBtnWrapper>
        </div>
      </div>
    </VideoFlterWrapper>
  );
};

const ImageFilter = (props: any) => {
  const { getVidFilter, setShowFilter, setFilterColor } = props;
  const [quality, setQuality] = useState("all");
  const [prop, setProp] = useState("all");
  const [filter, setFilter] = useState("");
  const [clearIcon, setClearIcon] = useState({
    quality: "all",
    prop: "all",
    filter: "",
  });
  useEffect(() => {
    if (filter) {
      setFilterColor("image");
    }
  }, [filter]);
  useEffect(() => {
    // console.log("something2", clearIcon);
    if (clearIcon.filter === "") {
      setFilter("");
    }
    if (clearIcon.prop === "all") {
      setProp("all");
    }
    if (clearIcon.quality === "all") {
      setQuality("all");
    }
  }, [clearIcon]);
  const getAssetSubType = useQuery(GetAssetSubTypes, {
    variables: {
      token: `${localStorage.getItem("token")}`,
    },
  });
  if (getAssetSubType.loading) return <>Loading</>;
  if (getAssetSubType.error) return <>Error: {getAssetSubType.error}</>;
  const style = {
    height: "15px",
    width: "15px",
    fill: "#dc7070",
    top: "-4px",
    right: "-5px",
    cursor: "pointer",
    backgroundColor: "#dc7070",
    borderRadius: "50%",
    zIndex: 1000000,
  };
  return (
    <VideoFlterWrapper>
      <ShowBtnWrapper>
        {quality && prop && filter && (
          <ClearBtn
            onClick={() => {
              setFilterColor("");
              setFilter("");
              setQuality("all");
              setProp("false");
            }}
          >
            <span>
              <Cancel
                style={{ width: "20px", height: "15px", paddingTop: "38%" }}
              />
            </span>
            Clear Filters
          </ClearBtn>
        )}
        <ShowResultBtn
          onClick={() => {
            let obj: any = searchFilter.find((o) => o.name === filter);
            const filters = {
              filter: filter != "" ? obj.filter : null,
              library: "dw",
              page: 0,
              resultsPerPage: 45,
              transparent: prop === "true" ? true : null,
            };
            getVidFilter(JSON.stringify(filters));
            setShowFilter(false);
            console.log(filters);
          }}
        >
          Show Results
        </ShowResultBtn>
      </ShowBtnWrapper>
      <div>
        <VideoQuality>Choose a Library</VideoQuality>
        <VideoFilterBtnWrapper>
          <VideoFilterBtn
            quality={quality === "all" ? quality : ""}
            onClick={() => {
              setQuality("all");
            }}
          >
            All
            {quality === "all" && (
              <CancelIcon
                style={{ ...style, position: "absolute" }}
                onClick={() => setQuality("all")}
              />
            )}
          </VideoFilterBtn>
          <VideoFilterBtn quality={quality === "components" ? quality : ""}>
            <div
              onClick={() => {
                setQuality("components");
                setClearIcon({ ...clearIcon, quality: "components" });
                console.log("something3");
              }}
            >
              Components
            </div>
            {quality === "components" && (
              <CancelIcon
                style={{ ...style, position: "absolute" }}
                onClick={() => {
                  setQuality("all");
                }}
              />
            )}
            {/* <CancelIcon height="15px" width="15px" /> */}
          </VideoFilterBtn>
          <VideoFilterBtn quality={quality === "images" ? quality : ""}>
            <div
              onClick={() => {
                setQuality("images");
                setClearIcon({ ...clearIcon, quality: "images" });
                // console.log("something3");
              }}
            >
              Images
            </div>
            {quality === "images" && (
              <CancelIcon
                style={{ ...style, position: "absolute" }}
                onClick={() => {
                  setQuality("all");
                }}
              />
            )}
          </VideoFilterBtn>
        </VideoFilterBtnWrapper>
      </div>
      <div>
        <VideoQuality>Image Properties</VideoQuality>
        <VideoFilterBtnWrapper>
          <VideoFilterBtn
            prop={prop === "all" ? prop : ""}
            onClick={() => {
              setProp("all");
            }}
          >
            All
            {prop === "all" && (
              <CancelIcon
                style={{ ...style, position: "absolute" }}
                onClick={() => setProp("all")}
              />
            )}
          </VideoFilterBtn>
          <VideoFilterBtn prop={prop === "transparent" ? prop : ""}>
            <div
              onClick={() => {
                setProp("transparent");
                setClearIcon({ ...clearIcon, prop: "transparent" });
              }}
            >
              Transparent
            </div>
            {prop === "transparent" && (
              <CancelIcon
                style={{ ...style, position: "absolute" }}
                onClick={() => {
                  setProp("all");
                  // setClearIcon({ ...clearIcon, prop: "all" });
                }}
              />
            )}
          </VideoFilterBtn>
        </VideoFilterBtnWrapper>
      </div>
      <div>
        <VideoQuality>Choose a filter</VideoQuality>
        <div style={{ overflowY: "scroll", height: "180px" }}>
          <VideoFilterBtnWrapper>
            {getAssetSubType.data.GET_assetSubTypes.map(
              (item: any, index: number) => {
                return (
                  <ChooseFilterBtn
                    key={index}
                    filter={filter === item ? item : ""}
                  >
                    <div
                      onClick={() => {
                        setFilter(item);
                        setClearIcon({ ...clearIcon, filter: item });
                      }}
                    >
                      {item}
                    </div>
                    {filter === item && (
                      <CancelIcon
                        style={{ ...style, position: "absolute" }}
                        onClick={() => {
                          // setClearIcon({ ...clearIcon, filter: "" });
                          setFilter("");
                        }}
                      />
                    )}
                  </ChooseFilterBtn>
                );
              }
            )}
          </VideoFilterBtnWrapper>
        </div>
      </div>
    </VideoFlterWrapper>
  );
};

export const SearchInput = (props: any) => {
  const classes = useStyles();
  const {
    selected,
    getVidFilter,
    getTextBlockFilter,
    fontsBtn,
    getTemplateFilter,
    categoryId,
  } = props;
  const [placeHolder, setPlaceHolder] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterColor, setFilterColor] = useState("");
  const [query, setQuery] = useState("");
  useEffect(() => {
    if (selected === "template" || selected === "video-template") {
      setPlaceHolder("Templates...");
    } else if (selected === "image") {
      setPlaceHolder("Images...");
    } else if (selected === "text") {
      if (fontsBtn) {
        setPlaceHolder("Fonts...");
      } else {
        setPlaceHolder("Phrases...");
      }
    } else if (selected === "template" || selected === "video-template") {
      setPlaceHolder("videos...");
    }
  }, [selected, fontsBtn]);

  const search = () => {
    if (selected === "image") {
      getVidFilter(
        JSON.stringify({
          page: 0,
          query: query,
          resultsPerPage: 45,
        })
      );
    }
    if (selected === "video-template") {
      getTemplateFilter(
        `{"from":0,"size":20,"body":{"query":{"bool":{"must":[{"term":{"categoryId":13}},{"multi_match":{"query":"${query}","fields":["displayTitle^3","categorizationKeywords^2","title","keywords","tags"]}}]}},"sort":[{"starRating":"desc"},{"createdAt":"desc"}]}}`
      );
    }
    if (selected === "template") {
      getTemplateFilter(
        `{"from":0,"size":20,"body":{"query":{"bool":{"must":[{"term":{"categoryId":${categoryId}}},{"multi_match":{"query":"${query}","fields":["displayTitle^3","categorizationKeywords^2","title","keywords","tags"]}}]}}}}`
      );
    }
    if (selected === "videos") {
      getVidFilter(
        JSON.stringify({
          library: "wbmvideo",
          page: 0,
          query: query,
          resultsPerPage: 45,
        })
      );
    }
    if (selected === "text" && !fontsBtn) {
      getTextBlockFilter(
        JSON.stringify({
          body: {
            query: {
              bool: {
                must: [
                  {
                    query_string: {
                      fields: ["content"],
                      query: query,
                    },
                  },
                ],
              },
            },
          },
          from: 0,
          size: 20,
        })
      );
    }
  };

  const onInputSearchChange = (e: any) => {
    setQuery(e.target.value);
    props.onSearchInputChange(e.target.value);
  };
  return (
    <Paper component="form" className={classes.root}>
      {(selected === "videos" || selected === "image") && (
        <Filter
          style={{
            color: filterColor.length > 0 ? "rgb(77, 180, 170)" : "black",
            height: "30px",
            width: "30px",
            marginLeft: "5px",
          }}
          onClick={() => {
            setShowFilter((old: boolean) => !old);
          }}
        />
      )}
      <InputBase
        className={classes.input}
        placeholder={`Search ${placeHolder}`}
        inputProps={{ "aria-label": "search google maps" }}
        value={query}
        style={{ fontSize: ".75em", fontFamily: "Lato, sans-serif " }}
        onChange={(e: any) => {
          // setQuery(e.target.value);
          onInputSearchChange(e);
        }}
        onKeyDown={(e) => {
          //
          if (e.key === "Enter") {
            e.preventDefault();
            search();
          }
        }}
      />
      <IconButton
        className={classes.iconButton}
        aria-label="search"
        onClick={search}
      >
        <SearchIcon />
      </IconButton>
      {showFilter && selected === "videos" && (
        <VideoFilter
          setFilterColor={setFilterColor}
          getVidFilter={getVidFilter}
          setShowFilter={setShowFilter}
          getTemplateFilter={getTemplateFilter}
        />
      )}
      {showFilter && selected === "image" && (
        <ImageFilter
          setFilterColor={setFilterColor}
          getVidFilter={getVidFilter}
          setShowFilter={setShowFilter}
        />
      )}
    </Paper>
  );
};
