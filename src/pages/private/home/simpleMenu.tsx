import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import AlertDialog from "./deletePopup";
import DownloadCustomPopup from "../dashboard/workspace/DownloadPopUp";

export default function SimpleMenu(props: any) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showDownPopup, setShowDownpopup] = useState(false);
  const [downloadConfirm, setDownloadConfirm] = useState(false);
  const [paid, setPaid] = useState(true);
  const [imgType, setImgType] = useState("jpg");

  useEffect(() => {
    console.log(props);
  }, [anchorEl]);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const popupCloseDownHandler = (e: any) => {
    setShowDownpopup(e);
  };

  const confirmDownload = (confirm: any) => {
    setDownloadConfirm(confirm);
  };

  const handleDownloadConfirm = (val: boolean) => {
    setDownloadConfirm(val);
  };

  const imagetype = (img: any) => {
    setImgType(img);
  };

  return (
    <div>
      <Button
        style={{
          minWidth: "inherit",
          padding: "0",
          bottom: "10px",
          right: "8px",
        }}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {props.showGrid && (
          <MoreHorizIcon
            style={{ color: "white", bottom: "16px", fontSize: "32px" }}
          ></MoreHorizIcon>
        )}
        {props.showList && (
          <MoreVertIcon
            style={{ color: "black", bottom: "16px", fontSize: "32px" }}
          ></MoreVertIcon>
        )}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          style={{ color: "#616161", fontSize: "14px" }}
          onClick={() => {
            setShowDownpopup(true);
            handleClose();
          }}
        >
          Download
        </MenuItem>
        <MenuItem
          style={{ color: "#cd3333", fontSize: "14px" }}
          onClick={handleClose}
        >
          <AlertDialog {...props} />
        </MenuItem>
      </Menu>
      <DownloadCustomPopup
        onClose={popupCloseDownHandler}
        show={showDownPopup}
        title="Your design is ready!"
        //image={canvasDown}
        imagetype={imagetype}
        confirmDownload={confirmDownload}
        downloadConfirm={downloadConfirm}
        thumb={`https://s3-eu-west-1.amazonaws.com/composer.compositions.thumbs.staging/${props.compositionId}.jpg`}
        paid={paid}
        handleDownloadConfirm={handleDownloadConfirm}
      >
        <img
          src={`https://s3-eu-west-1.amazonaws.com/composer.compositions.thumbs.staging/${props.compositionId}.jpg`}
          alt="canvas"
          height="80%"
          width="80%"
          style={{
            marginBottom: "50px",
            border: "1px solid #2d3559",
          }}
        />
      </DownloadCustomPopup>
    </div>
  );
}
