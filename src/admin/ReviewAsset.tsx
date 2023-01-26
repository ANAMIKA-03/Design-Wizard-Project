import React, { useEffect, useState } from "react";
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import styled from "styled-components";
import TablePagination from "@material-ui/core/TablePagination";
import { AssetsSearch } from "../lib/contexts/Queries";
import { useMutation, useQuery } from "@apollo/client";
import { ItemTypes } from "../lib/canvas/common";
import { POSTassetssearch } from "../lib/contexts/Queries";
import { result } from "lodash";
import { REVISIONassetssearch } from "../lib/contexts/Queries";

const TableWarpDiv = styled.div`
  padding: 50px;
  background: #e5e6e6;
  height: 100vh;
  overflow-y: auto;
`;

const HeadStyle = styled.h1`
  color: #11243b;
  font-size: 28px;
  margin: 10px 0 15px 0;
  font-weight: 500;
`;

const HeadStyleSpan = styled.span`
  color: #2fc6c0;
  font-size: 16px;
`;

const HeadingDiv = styled.div`
  display: flex;
`;

const VideoAssets = styled.div`
  margin: 20px;
`;

const ImageAssets = styled.div`
  margin: 20px;
`;

const Button = styled.div`
  background: white;
  align-items: center;
  width: 147px;
  height: 34px;
  padding-left: 30px;
  padding-top: 10px;
  margin-left: 30px;
  cursor: pointer;
  color: rgb(0, 123, 255);
  &:hover {
    color: #0056b3;
  }
`;

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "#2324284d",
      color: "#11243b",
      border: "1px solid #23242833",
    },
    body: {
      fontSize: 16,
      // backgroundColor: "#e5e6e6",
      border: "1px solid #23242833",
      fontFamily: "Lato, sans-serif",
      // width: "300px",
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "white",
    },
  })
)(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    overflowWrap: "anywhere",
  },
  root: {
    "& .MuiTableCell-root": {
      wordBreak: " break-word",
      minWidth: "340px",
      background: "red",
    },
  },
  head: {
    "& .MuiTableHead-root": {
      fontSize: "16px",
      fontWeight: 600,
      width: "20%",
    },
  },
});

export const ReviewAsset = () => {
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [AssetsData] = useMutation(AssetsSearch);
  const [page, setPage] = React.useState(1);
  const [resultsPerPage, setResultsPerPage] = React.useState(10);
  const [assetspage, setAssetsPage] = React.useState(0);
  const [dataAssets, setDataAssets] = React.useState([]);
  const [Assetssearch] = useMutation(POSTassetssearch);
  const [library, setLibrary] = React.useState("wbmvideo");
  const [transparent, setTransparent] = React.useState(false);
  const [pageImage, setPageImage] = React.useState(1);
  const [resultsPerPageImage, setResultsPerPageImage] = React.useState(45);
  const [buttonName, setButtonName] = React.useState("");
  const [RevisionAssest] = useMutation(REVISIONassetssearch);
  const [reviewPrice, setReviewPrice] = React.useState(1);
  const [reviewQuality, setReviewQuality] = React.useState(1);
  const [reviewactive, setReviewactive] = React.useState(0);
  const [reviewlimit, setReviewlimit] = React.useState(10);
  const [reviewoffset, setReviewoffset] = React.useState(0);

  const classes = useStyles();

  const AssetsSearchData = async () => {
    await AssetsData({
      variables: {
        token: `${localStorage.getItem("token")}`,
        input: JSON.stringify({
          page: assetspage,
          resultsPerPage: resultsPerPage,
          library: library,
          transparent: transparent,
        }),
      },
    }).then((result) => {
      console.log(JSON.parse(result.data.POST_assets_search).hits.hits[0]);
      setDataAssets(JSON.parse(result.data.POST_assets_search).hits.hits);
    });
  };

  const Assetssearchimage = async () => {
    await Assetssearch({
      variables: {
        token: `${localStorage.getItem("token")}`,
        input: JSON.stringify({
          page: pageImage,
          resultsPerPage: resultsPerPageImage,
        }),
      },
    }).then((result) => {
      console.log(JSON.parse(result.data.POST_assets_search).hits.hits);
      setDataAssets(JSON.parse(result.data.POST_assets_search).hits.hits);
    });
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const Revisionreviewassets = async () => {
    await RevisionAssest({
      variables: {
        token: `${localStorage.getItem("token")}`,
        input: JSON.stringify({
          reviewPrice: reviewPrice,
          reviewQuality: reviewQuality,
          active: reviewactive,
          limit: reviewlimit,
          offset: reviewoffset,
        }),
      },
    }).then((result) => {
      console.log(JSON.parse(result.data.POST_assets_search).hits.hits);
      setDataAssets(JSON.parse(result.data.POST_assets_search).hits.hits);
    });
  };

  return (
    <TableWarpDiv>
      <HeadingDiv>
        <Button
          onClick={() => {
            Revisionreviewassets();
            setButtonName("revision Assets");
          }}
        >
          Assets Revision
        </Button>
        <Button
          onClick={() => {
            Assetssearchimage();
            setButtonName("image Assets");
          }}
        >
          All Image Assets
        </Button>

        <Button
          onClick={() => {
            AssetsSearchData();
            setButtonName("video Assets");
          }}
        >
          All Video Assets
        </Button>
      </HeadingDiv>
      <HeadStyle>Video Assers Meta revision</HeadStyle>
      <TableContainer
        style={{ border: "1px solid rgba(35,36,40,0.2)", overflow: "hidden" }}
      >
        <Table className={classes.table} aria-label="customized table">
          <TableHead className={classes.head}>
            <StyledTableRow>
              <StyledTableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  //indeterminate={numSelected > 0 && numSelected < rowCount}
                  //checked={rowCount > 0 && numSelected === rowCount}
                  //onChange={onSelectAllClick}
                  //inputProps={{ 'aria-label': 'select all desserts' }}
                />
              </StyledTableCell>
              <StyledTableCell
                style={{
                  fontWeight: "600",
                  fontSize: "16px",
                  fontFamily: "Lato, sans-serif",
                  width: "200px",
                }}
              >
                {buttonName === "revision Assets" ||
                buttonName === "image Assets"
                  ? "Image"
                  : "Videos"}
              </StyledTableCell>
              <StyledTableCell
                style={{
                  fontWeight: "600",
                  fontSize: "16px",
                  width: "35%",
                  fontFamily: "Lato, sans-serif",
                }}
              >
                {buttonName === "revision Assets" ? "Review Price" : "Keywords"}
              </StyledTableCell>
              <StyledTableCell
                style={{
                  fontWeight: "600",
                  fontSize: "16px",
                  fontFamily: "Lato, sans-serif",
                }}
              >
                {buttonName === "revision Assets" ? "Price" : "Title"}
              </StyledTableCell>
              <StyledTableCell
                style={{
                  fontWeight: "600",
                  fontSize: "16px",
                  fontFamily: "Lato, sans-serif",
                }}
              >
                {buttonName === "revision Assets"
                  ? "Review Quality"
                  : "Description"}
              </StyledTableCell>
              <StyledTableCell
                style={{
                  fontWeight: "600",
                  fontSize: "16px",
                  fontFamily: "Lato, sans-serif",
                  width: "15%",
                }}
              >
                {buttonName === "revision Assets" ? "Active" : "Sub Types"}
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {dataAssets.map((item: any) => (
              <TableRow>
                <StyledTableCell padding="checkbox">
                  <Checkbox color="primary" />
                </StyledTableCell>
                <TableCell
                  className={classes.root}
                  style={{
                    fontWeight: "300",
                    fontSize: "16px",
                    fontFamily: "Lato, sans-serif",
                    backgroundColor: "#e5e6e6",
                  }}
                >
                  <img src={item._source.thumb} width="70%" height="70%" />
                </TableCell>
                <TableCell
                  className={classes.root}
                  style={{
                    fontWeight: "100",
                    fontSize: "16px",
                    fontFamily: "Lato, sans-serif",
                    backgroundColor: "#e5e6e6",
                  }}
                >
                  <p>{item._source.keywords} </p>
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "300",
                    fontSize: "16px",
                    fontFamily: "Lato, sans-serif",
                    backgroundColor: "#e5e6e6",
                  }}
                >
                  {item._source.title}
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "300",
                    fontSize: "16px",
                    fontFamily: "Lato, sans-serif",
                    backgroundColor: "#e5e6e6",
                  }}
                >
                  {item._source.description}
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "300",
                    fontSize: "16px",
                    fontFamily: "Lato, sans-serif",
                    backgroundColor: "#e5e6e6",
                  }}
                ></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </TableWarpDiv>
  );
};
