import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TableContainer,
} from "@material-ui/core";
import moment from "moment";
import { Link } from "react-router-dom";
import TablePagination from "@material-ui/core/TablePagination";
import styled from "styled-components";
import CreateIcon from "@material-ui/icons/Create";
import { useQuery, useMutation } from "@apollo/client";
import {
  userCompositions,
  UpdateUserComposition,
  AllDesignComposition,
  TemplateDesign,
} from "../../../lib/contexts/Queries";
import TextField from "@material-ui/core/TextField";
import SimpleMenu from "./simpleMenu";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: "scroll",
    height: "36vh",
    cursor: "ponter",
    width: "920px",
    marginTop: "34px",
  },
  cell: {
    fontSize: "13.6px",
    fontFamily: "'Lato',sans-serif !important",
    color: "#11243b",
    transition: ".3s color linear",
    cursor: "ponter",
    "&:hover": {
      color: "#e87855",
    },
  },
}));
const TableImg = styled.img`
  transition: 0.3s all linear;
  max-width: 110px;
  cursor: pointer;
`;

const IconDiv = styled.div`
  display: inline-block;
`;

const IconSpan = styled.span`
  cursor: pointer;
  display: inline-block;
  margin-right: 10px; ;
`;
const ArrowUp = styled.i`
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  border-bottom: 6px solid #239590;
  top: -13px;
  width: 0;
  height: 0;
  position: relative;
  margin: auto 5px;
  bottom: 0;
  cursor: pointer;
`;
const ArrowDown = styled.i`
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;

  border-top: 6px solid #239590;
  bottom: 0px;
  transition: all 0.7s linear;
  width: 0;
  height: 0;
  position: relative;
  margin: auto 5px;
  top: 18px;
  right: 16px;
  cursor: pointer;
`;

// const TableWrap = styled.div``;
export default function ListView(props: any) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [nameSort, setnameSort] = useState("title DESC");
  const [modifySort, setmodifySort] = useState("modifiedAt DESC");
  const [sortParameter, setsortParameter] = useState("title DESC");
  const [dataTemp, setDataTemp] = useState([]) as any;
  const [isAdmin, setIsAdmin] = useState(false);
  const [listData, setListData] = useState([]) as any;
  const [apiFilter, setApiFilter] = useState(
    `{\"custom\":true,\"order\":\"${sortParameter}\",\"offset\":${
      page * rowsPerPage
    },\"limit\":${rowsPerPage}}`
  );
  const [selectIndex, setSelectIndex] = useState({
    idx: -1,
    isSelected: false,
  });
  const [updateTitle] = useMutation(UpdateUserComposition);
  const [nameUpAroow, setnameUpArrow] = useState("6px solid #239590");
  const [nameDownAroow, setnameDownArrow] = useState("6px solid #239590");
  const [modifyUpAroow, setmodifyUpArrow] = useState("6px solid #239590");
  const [modifyDownAroow, setmodifyDownArrow] = useState("6px solid #239590");

  useEffect(() => {
    if (props.menuName === "My Designs" && !props.toSearch) {
      setApiFilter(
        `{\"custom\":true,\"order\":\"${sortParameter}\",\"offset\":${
          page * rowsPerPage
        },\"limit\":${rowsPerPage}}`
      );
    }
    if (props.menuName === "All Design" && !props.toSearch) {
      setApiFilter(
        `{\"where\":{},\"custom\":true,\"order\":\"createdAt DESC\",\"offset\":${
          page * rowsPerPage
        },\"limit\":${rowsPerPage}}`
      );
    }
    if (props.menuName === "Templates" && !props.toSearch) {
      setApiFilter(
        `{\"where\":{},\"custom\":true,\"order\":\"createdAt DESC\",\"offset\":0,\"limit\":5}`
      );
    }
    if (props.toSearch) {
      setApiFilter(
        `{\"where\":{\"search\":"${props.searchValue}"},\"custom\":true,\"offset\":0,\"limit\":7}`
      );
    }
  }, [props.menuName, props.toSearch, page, rowsPerPage]);

  // const [sortParameter, setsortParameter] = useState("title DESC");
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const changeTitle = async (value: any, index: number) => {
    let temp1 = JSON.parse(value.composer_object);

    temp1[0].title = dataTemp[index].title;

    const data = await updateTitle({
      variables: {
        token: `${localStorage.getItem("token")}`,
        compositionId: value.compositionId,
        ownerId: localStorage.getItem("userId"),
        input: {
          compositionId: value.compositionId,
          composer_object: JSON.stringify(temp1),
        },
      },
    });
    if (data) {
      refetch();
    }
  };
  const { data, loading, error, refetch } = useQuery(
    props.menuName === "My Designs"
      ? userCompositions
      : props.menuName === "All Design"
      ? AllDesignComposition
      : TemplateDesign,
    {
      variables: {
        filter: apiFilter,
        token: `${localStorage.getItem("token")}`,
      },
    }
  );

  useEffect(() => {
    console.log(props.menuName);
  }, [props.menuName]);
  useEffect(() => {
    if (data) {
      if (props.menuName === "My Designs") {
        console.log(data, "my designs");
        var allData = data.GET_users_compositions;
        var newData = allData.map((element: any) => ({
          // console.log(element);
          ...element,
          isSelected: false,
          // element.push({isSelected:false})
        }));
      } else if (props.menuName === "All Design") {
        console.log(data, " all deisgn");
        allData = data.GET_all_design_compositions;
        newData = allData.map((element: any) => ({
          // console.log(element);
          ...element,
          isSelected: false,
          // element.push({isSelected:false})
        }));
      } else {
        console.log(data, "templateDesign");
        allData = data.GET_templates;
        newData = allData.map((element: any) => ({
          // console.log(element);
          ...element,
          isSelected: false,
          // element.push({isSelected:false})
        }));
      }
      console.log(newData);

      setListData(newData);
    }
  }, [data]);

  React.useEffect(() => {
    // console.log(data.GET_users_compositions)
    if (listData && listData.length && props.tempData) {
      // console.log(data.GET_users_compositions)
      // console.log(props.tempData)
      let c: any = [];
      for (var i = 0; i < listData.length; i++) {
        // console.log(data.GET_users_compositions[i].categoryId)
        for (var j = 0; j < props.tempData.length; j++) {
          if (props.tempData[j].id === listData[i].categoryId) {
            var timeAgo = moment(listData[i].modifiedAt).fromNow();
            c[i] = {
              name: props.tempData[j].name,
              width: props.tempData[j].displayWidth,
              height: props.tempData[j].displayHeight,
              clicked: false,
              modified: timeAgo,
              title: listData[i].title,
            };
          }
        }
      }
      setDataTemp(c);
    }
  }, [listData, props.tempData]);
  const updateList = () => {
    refetch();
    props.countRefetch();
  };

  React.useEffect(() => {
    console.log(sortParameter);
  }, [sortParameter]);

  React.useEffect(() => {
    const user: any = localStorage.getItem("user");
    const userData = JSON.parse(user);
    console.log(userData);
    for (let i of userData.roles) {
      if (i.name === "admin") {
        setIsAdmin(true);
      }
    }
  }, []);
  const handleSort = (nameOrmodify: string) => {
    if (nameOrmodify === "title") {
      if (nameSort === "title DESC") {
        console.log("yes");
        setsortParameter("title ASC");
        setnameSort("title ASC");
        setnameUpArrow("6px solid #e87855");
        setnameDownArrow("6px solid #239590");
        setmodifyDownArrow("6px solid #239590");
        setmodifyUpArrow("6px solid #239590");
      } else if (nameSort === "title ASC") {
        setsortParameter("title DESC");
        setnameSort("title DESC");
        setnameUpArrow("6px solid #239590");
        setnameDownArrow("6px solid #e87855");
        setmodifyDownArrow("6px solid #239590");
        setmodifyUpArrow("6px solid #239590");
      }
    } else if (nameOrmodify === "modify") {
      if (modifySort === "modifiedAt DESC") {
        setmodifySort("modifiedAt ASC");
        setsortParameter("modifiedAt ASC");
        setmodifyUpArrow("6px solid #e87855");
        setmodifyDownArrow("6px solid #239590");
        setnameUpArrow("6px solid #239590");
        setnameDownArrow("6px solid #239590");
      } else if (modifySort === "modifiedAt ASC") {
        setmodifySort("modifiedAt DESC");
        setsortParameter("modifiedAt DESC");
        setmodifyUpArrow("6px solid #239590");
        setmodifyDownArrow("6px solid #e87855");
        setnameUpArrow("6px solid #239590");
        setnameDownArrow("6px solid #239590");
      }
    }
    refetch();
  };
  if (loading) return <></>;
  if (error) return <>`Error! ${error.message}`</>;
  return (
    <React.Fragment>
      {/* <Paper> */}
      {!isAdmin && (
        <TableContainer className={classes.root}>
          <Table>
            <TableHead style={{ backgroundColor: "#d3d3d7" }}>
              <TableRow style={{ color: "#11243b" }}>
                <TableCell className={classes.cell}>Thumbnail Size</TableCell>
                <TableCell
                  className={classes.cell}
                  onClick={() => handleSort("title")}
                >
                  Name
                  <ArrowUp style={{ borderBottom: nameUpAroow }} />
                  <ArrowDown style={{ borderTop: nameDownAroow }} />
                </TableCell>
                <TableCell className={classes.cell}>Size</TableCell>
                <TableCell
                  className={classes.cell}
                  onClick={() => handleSort("modify")}
                >
                  Modified
                  <ArrowUp style={{ borderBottom: modifyUpAroow }} />
                  <ArrowDown style={{ borderTop: modifyDownAroow }} />
                </TableCell>
                <TableCell className={classes.cell}>Actions</TableCell>
              </TableRow>
            </TableHead>
            {listData.map((val: any, index: number) => (
              <TableBody key={val.compositionId}>
                <TableRow>
                  <Link
                    to={{
                      pathname: "/dashboard/workspace",
                      state: {
                        composer_object: val.composer_object,
                        composer_id: val.compositionId,
                        editor: "image",
                      },
                    }}
                  >
                    <TableCell>
                      <TableImg
                        src={`${process.env.REACT_APP_S3_REDIRECT}/composer.compositions.thumbs.staging/${val.compositionId}.jpg`}
                      />
                    </TableCell>
                  </Link>
                  <TableCell>
                    {dataTemp[index]
                      ? !dataTemp[index].clicked && <CreateIcon></CreateIcon>
                      : null}
                    {/* {console.log(val)} */}
                    <TextField
                      defaultValue={val.title}
                      style={{
                        border: "none",
                        color: "#fff",
                        padding: "0",
                        fontSize: "13px",
                      }}
                      onChange={(e) => {
                        let temp = [...dataTemp];
                        temp[index] = { ...temp[index], title: e.target.value };
                        setDataTemp([...temp]);
                        console.log(temp);
                      }}
                      onClick={() => {
                        let temp = [...dataTemp];
                        console.log(temp);
                        temp[index] = { ...temp[index], clicked: true };
                        setDataTemp([...temp]);
                        console.log(temp);
                        //console.log(data[index] && dataTemp[index].clicked)

                        console.log("d");
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                    {/* {console.log(dataTemp[index]!==null  dataTemp[index].clicked)} */}
                    {dataTemp[index]
                      ? dataTemp[index].clicked && (
                          <>
                            <IconDiv>
                              <IconSpan>
                                <CloseIcon
                                  onClick={() => {
                                    let temp = [...dataTemp];
                                    console.log(temp);
                                    temp[index] = {
                                      ...temp[index],
                                      clicked: false,
                                    };
                                    setDataTemp([...temp]);
                                  }}
                                />
                              </IconSpan>
                              <IconSpan>
                                <CheckIcon
                                  onClick={() => {
                                    let temp = [...dataTemp];
                                    console.log(temp);
                                    temp[index] = {
                                      ...temp[index],
                                      clicked: false,
                                    };
                                    setDataTemp([...temp]);
                                    console.log(val);
                                    changeTitle(val, index);
                                  }}
                                />
                              </IconSpan>
                            </IconDiv>
                          </>
                        )
                      : null}
                  </TableCell>
                  {dataTemp[index] && (
                    <>
                      <TableCell>{dataTemp[index].name}</TableCell>
                      <TableCell>{dataTemp[index].modified}</TableCell>
                    </>
                  )}
                  <TableCell>
                    <SimpleMenu
                      {...val}
                      updateList={updateList}
                      showList={props.showList}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
            <TableFooter />
          </Table>
          <TablePagination
            component="div"
            count={100}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}
      <div>
        {isAdmin && (
          <TableContainer className={classes.root}>
            <Table>
              <TableHead style={{ backgroundColor: "#d3d3d7" }}>
                <TableRow style={{ color: "#11243b" }}>
                  <TableCell className={classes.cell}>Select</TableCell>
                  <TableCell className={classes.cell}>Thumbnail Size</TableCell>
                  {(props.menuName === "All Design" ||
                    props.menuName === "Templates") && (
                    <TableCell className={classes.cell}>Owner</TableCell>
                  )}
                  <TableCell
                    className={classes.cell}
                    onClick={() => handleSort("title")}
                  >
                    Name
                    <ArrowUp style={{ borderBottom: nameUpAroow }} />
                    <ArrowDown style={{ borderTop: nameDownAroow }} />
                  </TableCell>
                  <TableCell className={classes.cell}>Size</TableCell>
                  <TableCell
                    className={classes.cell}
                    onClick={() => handleSort("modify")}
                  >
                    Modified
                    <ArrowUp style={{ borderBottom: modifyUpAroow }} />
                    <ArrowDown style={{ borderTop: modifyDownAroow }} />
                  </TableCell>
                  <TableCell className={classes.cell}>
                    Status
                    <ArrowUp style={{ borderBottom: modifyUpAroow }} />
                    <ArrowDown style={{ borderTop: modifyDownAroow }} />
                  </TableCell>
                </TableRow>
              </TableHead>
              {console.log("listCheck", listData)}
              {listData.map((val: any, index: number) => (
                <TableBody key={val.compositionId}>
                  <TableRow>
                    <TableCell>
                      <Checkbox color="primary" />
                    </TableCell>
                    <Link
                      to={{
                        pathname: "/dashboard/workspace",
                        state: {
                          composer_object: val.composer_object,
                          composer_id: val.compositionId,
                          editor: "image",
                        },
                      }}
                    >
                      <TableCell>
                        <TableImg
                          src={
                            props.menuName === "Templates"
                              ? `${process.env.REACT_APP_S3_REDIRECT}/composer.templates.thumbs.staging/${val.templateId}.jpg`
                              : `${process.env.REACT_APP_S3_REDIRECT}/composer.compositions.thumbs.staging/${val.compositionId}.jpg`
                          }
                        />
                      </TableCell>
                    </Link>
                    {(props.menuName === "All Design" ||
                      props.menuName === "Templates") && (
                      <TableCell>{val.email}</TableCell>
                    )}
                    <TableCell>
                      {dataTemp[index]
                        ? !dataTemp[index].clicked && <CreateIcon></CreateIcon>
                        : null}
                      {/* {console.log(val)} */}
                      <TextField
                        value={val.title}
                        style={{
                          border: "none",
                          color: "#fff",
                          padding: "0",
                          fontSize: "13px",
                        }}
                        onChange={(e) => {
                          let temp = [...dataTemp];
                          temp[index] = {
                            ...temp[index],
                            title: e.target.value,
                          };
                          setDataTemp([...temp]);
                          console.log(temp);
                        }}
                        onClick={() => {
                          let temp = [...dataTemp];
                          console.log(temp);
                          temp[index] = { ...temp[index], clicked: true };
                          setDataTemp([...temp]);
                          console.log(temp);
                          //console.log(data[index] && dataTemp[index].clicked)

                          console.log("d");
                        }}
                        InputLabelProps={{ shrink: true }}
                      />
                      {/* {console.log(dataTemp[index]!==null  dataTemp[index].clicked)} */}
                      {dataTemp[index]
                        ? dataTemp[index].clicked && (
                            <>
                              <IconDiv>
                                <IconSpan>
                                  <CloseIcon
                                    onClick={() => {
                                      let temp = [...dataTemp];
                                      console.log(temp);
                                      temp[index] = {
                                        ...temp[index],
                                        clicked: false,
                                      };
                                      setDataTemp([...temp]);
                                    }}
                                  />
                                </IconSpan>
                                <IconSpan>
                                  <CheckIcon
                                    onClick={() => {
                                      let temp = [...dataTemp];
                                      temp[index] = {
                                        ...temp[index],
                                        clicked: false,
                                      };
                                      setDataTemp([...temp]);
                                      console.log(val);
                                      changeTitle(val, index);
                                    }}
                                  />
                                </IconSpan>
                              </IconDiv>
                            </>
                          )
                        : null}
                    </TableCell>
                    {dataTemp[index] && (
                      <>
                        <TableCell>{dataTemp[index].name}</TableCell>
                        <TableCell>{dataTemp[index].modified}</TableCell>
                      </>
                    )}

                    <TableCell>
                      <SimpleMenu
                        {...val}
                        updateList={updateList}
                        showList={props.showList}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
              <TableFooter />
            </Table>
            <TablePagination
              component="div"
              count={100}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        )}

        {/* <Pagination /> */}
      </div>
    </React.Fragment>
  );
}
