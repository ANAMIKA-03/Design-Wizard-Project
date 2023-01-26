import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// import DownloadLink from "react-download-link";
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useQuery, useMutation } from "@apollo/client";
import styled from "styled-components";
import { Purchased } from "../../../../lib/contexts/Queries";
import { ReactComponent as Download } from "../../../../assets/svg/New folder/download2.svg";
import { ReactComponent as Share } from "../../../../assets/svg/New folder/share.svg";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import moment from "moment";
import TablePagination from "@material-ui/core/TablePagination";
import ShareCustomPopup from "../workspace/ShareCustomPopup";
import {
  DownloadImage,
  AdminPurchaseHistoryCount,
  PurchaseHistoryDownloadComposition,
  CheckStatus,
  PublishComposition,
} from "../../../../lib/contexts/Queries";
import { any } from "prop-types";

const TableWarpDiv = styled.div`
  padding: 50px;
  background: #e5e6e6;
  height: 100vh;
  overflow-y: auto;
`;

const HeadStyle = styled.h1`
  color: #11243b;
  font-size: 1.375em;
  margin: 0 0 30px 0;
  font-weight: 500;
`;

const HeadStyleSpan = styled.span`
  color: #2fc6c0;
  font-size: 16px;
`;
const FooterText = styled.text`
  position: absolute;
  bottom: -130px;
  left: 100px;
  display: block;
`;
const FooterSpan = styled.span`
  color: #ccc;
  font-size: 0.7em;
`;
const DownloadTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#000000",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#000000",
    color: "#ffffff",
    width: "80px",
    height: "20px",
    fontSize: "14px",
    fontFamily: "Lato",
    textAlign: "center",
    border: "1px solid rgb(128,128,128)",
    padding: 8,
    borderRadius: "5px",
  },
}));
const ShareTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#000000",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#000000",
    color: "#ffffff",
    width: "60px",
    height: "20px",
    fontSize: "14px",
    fontFamily: "Lato",
    textAlign: "center",
    border: "1px solid rgb(128,128,128)",
    padding: 8,
    borderRadius: "5px",
  },
}));
const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "#2324284d",
      color: "#11243b",
      border: "1px solid #23242833",
    },
    body: {
      fontSize: 14,
      // backgroundColor: "#e5e6e6",
      border: "1px solid #23242833",
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
  },
});

export const PurchaseHistory = () => {
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [page, setPage] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [sharePopUp, setSharePopUp] = useState(false);
  const [show, setShow] = useState(false);
  const [shareThumb, setShareThumb] = useState("");
  const [urlView, setUrlView] = useState("");
  const [imgDownload] = useMutation(DownloadImage);
  const [publishCompositions] = useMutation(PublishComposition);
  const [compositionDlDownload] = useMutation(
    PurchaseHistoryDownloadComposition
  );
  const [checkStatus] = useMutation(CheckStatus);
  const classes = useStyles();
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 7));
    setPage(0);
  };

  const { data, loading, error, refetch } = useQuery(Purchased, {
    variables: {
      filter: `{\"order\":\"createdAt DESC\",\"limit\":${rowsPerPage},\"offset\":${
        page * rowsPerPage
      },\"where\":{\"composer_object\":{\"neq\":null}}}`,
      token: `${localStorage.getItem("token")}`,
    },
  });

  const count = useQuery(AdminPurchaseHistoryCount, {
    variables: {
      where: '{"composer_object":{"neq":null}}',
      token: `${localStorage.getItem("token")}`,
    },
  });

  //-----------------------------CompositionDL-------------------------------

  const imgDownloadData = async (item: any) => {
    let composer_object = JSON.parse(item.composer_object);
    var ext = JSON.parse(item.composer_object);
    var e = ext[0].extension;
    console.log("download image called");
    await compositionDlDownload({
      variables: {
        token: `${localStorage.getItem("token")}`,
        input: JSON.stringify({
          composition: {
            categoryId: item.categoryId,
            compositionId: item.compositionId,
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
          item
        );
      }
      console.log(result.data.POST_users_me_compositionDL.status);
    });
  };

  //-----------------------------Download Image -------------------------------

  const downloadImage = async (item: any, result: any) => {
    console.log("download image", item);
    var ext = JSON.parse(item.composer_object);
    console.log(result.files, " ", item.compositionId);
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
      console.log(
        result.data.POST_users_me_downloadImages.url,
        "abc",
        ext.extension
      );
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
    console.log("IDD s", item);
    let dataToreturn: any = "";
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
          return downloadImage(
            item,
            result.data.POST_users_me_checkDownloadQueue
          );
        }
      });
    }, 3000);
  };

  //-----------------------------Share Image -------------------------------

  let publishCount = 0;
  const publishComposition = async (item: any, response = "") => {
    let composer_object = JSON.parse(item.composer_object);
    let dataToreturn: any = "";
    let inputforapi = {};
    let input = {
      composition: {
        artboardId: 1,
        categoryId: item.categoryId,
        compositionId: item.compositionId,
        composer_object: composer_object,
        // designType: "static",
        preview: true,
      },
    };
    if (publishCount > 0) {
      inputforapi = {
        composition: {
          artboardId: 1,
          categoryId: item.categoryId,
          compositionId: item.compositionId,
          composer_object: composer_object,
          // designType: "static",
          preview: true,
          shortCode: JSON.parse(response).id,
        },
        checkQ: false,
      };
    } else {
      inputforapi = input;
    }
    setTimeout(async () => {
      await publishCompositions({
        variables: {
          token: `${localStorage.getItem("token")}`,
          userId: localStorage.getItem("userId"),
          input: JSON.stringify(inputforapi),
        },
      }).then(async (res: any) => {
        if (res && item.compositionId) {
          console.log(res);
          if (
            JSON.parse(res.data.POST_users_publishComposition).status ===
              "queued" &&
            publishCount < 20
          ) {
            publishCount++;
            console.log(
              res.data.POST_users_publishComposition,
              "status queued"
            );
            await publishComposition(
              item,
              res.data.POST_users_publishComposition
            );
          }
          if (
            JSON.parse(res.data.POST_users_publishComposition).status ===
            "ready"
          ) {
            setSharePopUp(true);
            let viewUrl = JSON.parse(
              res.data.POST_users_publishComposition
            ).viewerUrl;
            setUrlView(viewUrl);
            setShareThumb(JSON.parse(item.composer_object)[0].layers[0].thumb);
            console.log(
              res.data.POST_users_publishComposition,
              "status queued"
            );
          }
          // return dataToreturn;
        } else {
          return;
        }
      });
    }, 3000);

    console.log(localStorage.getItem("userId"));

    console.log(inputforapi);
  };

  useEffect(() => {
    if (count) {
      // let adminCount = JSON.parse(count.data.GET_usage_count);
      console.log(count);
    }
  }, [count]);

  useEffect(() => {
    if (data) {
      var value = data.GET_users_me_usage;
      console.log(value);
    }
  }, [data]);

  const popupCloseHandler = (e: any) => {
    setSharePopUp(e);
  };

  if (loading) return "loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <ShareCustomPopup
        onClose={popupCloseHandler}
        show={sharePopUp}
        title="Share Your Free Design!"
        viewUrl={urlView}
      >
        <img
          src={shareThumb}
          alt="canvas"
          height="80%"
          width="80%"
          style={{
            boxShadow: "20px 20px 50px grey",
            marginBottom: "50px",
          }}
        />
      </ShareCustomPopup>
      <TableWarpDiv>
        <HeadStyle>
          Purchase History{" "}
          <HeadStyleSpan>
            ({count.data && JSON.parse(count.data.GET_usage_count).count})
          </HeadStyleSpan>
        </HeadStyle>
        <TableContainer
          style={{ border: "1px solid rgba(35,36,40,0.2)", overflow: "hidden" }}
        >
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell
                  style={{
                    fontWeight: "300",
                    fontSize: "13.6px",
                    fontFamily: "Lato, sans-serif",
                  }}
                >
                  Thumbnail Size
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    fontWeight: "300",
                    fontSize: "13.6px",
                    fontFamily: "Lato, sans-serif",
                  }}
                >
                  Name
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    fontWeight: "300",
                    fontSize: "13.6px",
                    fontFamily: "Lato, sans-serif",
                  }}
                >
                  Type and Size
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    fontWeight: "300",
                    fontSize: "13.6px",
                    fontFamily: "Lato, sans-serif",
                  }}
                >
                  Quality
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    fontWeight: "300",
                    fontSize: "13.6px",
                    fontFamily: "Lato, sans-serif",
                  }}
                >
                  Purchase Date
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    fontWeight: "300",
                    fontSize: "13.6px",
                    fontFamily: "Lato, sans-serif",
                  }}
                >
                  Price
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    fontWeight: "300",
                    fontSize: "13.6px",
                    fontFamily: "Lato, sans-serif",
                  }}
                >
                  Download/Share/Invoice
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableHead>
              {data.GET_users_me_usage.map((item: any) => (
                <StyledTableRow key={item.email}>
                  <StyledTableCell
                    style={{
                      fontWeight: "300",
                      fontSize: "13.6px",
                      fontFamily: "Lato, sans-serif",
                      width: "15px",
                      backgroundColor: "#e5e6e6",
                    }}
                  >
                    <img
                      src={JSON.parse(item.composer_object)[0].layers[0].thumb}
                      width="60%"
                      height="60%"
                    />
                  </StyledTableCell>
                  <StyledTableCell
                    style={{
                      fontWeight: "300",
                      fontSize: "13.6px",
                      fontFamily: "Lato, sans-serif",
                      width: "15px",
                      backgroundColor: "#e5e6e6",
                    }}
                  >
                    {item.compositionTitle}
                  </StyledTableCell>
                  <StyledTableCell
                    style={{
                      fontWeight: "300",
                      fontSize: "13.6px",
                      fontFamily: "Lato, sans-serif",
                      width: "15px",
                      backgroundColor: "#e5e6e6",
                    }}
                  >
                    <p>{item.credits ? "Facebook post" : "Video"}</p>
                    <span style={{ fontSize: "12px" }}>
                      {JSON.parse(item.composer_object)[0].width} px{" "}
                      <span> x </span>
                    </span>
                    <span style={{ fontSize: "12px" }}>
                      {JSON.parse(item.composer_object)[0].height} px{" "}
                    </span>
                  </StyledTableCell>
                  <StyledTableCell
                    style={{
                      fontWeight: "300",
                      fontSize: "13.6px",
                      fontFamily: "Lato, sans-serif",
                      width: "15px",
                      backgroundColor: "#e5e6e6",
                    }}
                  >
                    <p>
                      {JSON.parse(item.composer_object)[0].layers[0].type ===
                      "image"
                        ? "Web (72dpi)"
                        : "HD"}
                    </p>
                  </StyledTableCell>
                  <StyledTableCell
                    style={{
                      fontWeight: "300",
                      fontSize: "13.6px",
                      fontFamily: "Lato, sans-serif",
                      width: "15px",
                      backgroundColor: "#e5e6e6",
                    }}
                  >
                    {moment(item.createdAt).format("DD/MM/YYYY")}
                  </StyledTableCell>
                  <StyledTableCell
                    style={{
                      fontWeight: "300",
                      fontSize: "13.6px",
                      width: "15px",
                      fontFamily: "Lato, sans-serif",
                      backgroundColor: "#e5e6e6",
                    }}
                  >
                    {item.videoCredits ? item.videoCredits : item.credits}{" "}
                    credit
                  </StyledTableCell>
                  <StyledTableCell
                    style={{
                      fontWeight: "300",
                      fontSize: "13.6px",
                      fontFamily: "Lato, sans-serif",
                      width: "15px",
                      backgroundColor: "#e5e6e6",
                    }}
                  >
                    <DownloadTooltip title="Download" placement="bottom">
                      <a>
                        <Download
                          style={{
                            margin: "4 14px",
                            height: "40px",
                            width: "40px",
                            cursor: "pointer",
                            color: "000000",
                          }}
                          onClick={() => {
                            imgDownloadData(item);
                          }}
                        />
                      </a>
                    </DownloadTooltip>
                    <ShareTooltip title="Share" placement="bottom">
                      <Share
                        style={{
                          margin: "11 14px",
                          height: "30px",
                          width: "30px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          publishComposition(item);
                        }}
                      />
                    </ShareTooltip>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableHead>
          </Table>
          {data.GET_users_me_usage && data.GET_users_me_usage.length <= 0 && (
            <p
              style={{
                textAlign: "center",
                fontWeight: "300",
                fontSize: "13.6px",
                fontFamily: "Lato, sans-serif",
                padding: "5px",
              }}
            >
              You don't have any designs :( go and
              <Link
                to={{
                  pathname: "/dashboard/workspace",
                  state: { editor: "video" },
                }}
              >
                <a
                  style={{
                    color: "#007bff",
                    textDecoration: "none",
                    backgroundColor: "transparent",
                  }}
                >
                  {" "}
                  create one{" "}
                </a>{" "}
              </Link>
              {"!"}
            </p>
          )}
          {count.data && JSON.parse(count.data.GET_usage_count).count > 0 && (
            <TablePagination
              component="div"
              count={count.data && JSON.parse(count.data.GET_usage_count).count}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </TableContainer>
      </TableWarpDiv>
    </>
  );
};
