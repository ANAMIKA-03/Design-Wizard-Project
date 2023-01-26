import React, { useState } from "react";
import popupStyles from "./custom-popup.module.css";
import NativeSelect from "@material-ui/core/NativeSelect";
import { ReactComponent as Tick } from "../../../../assets/svg/tick.svg";
import Button from "@material-ui/core/Button";

export const UnPaidDownloadPopup = (props: any) => {
  const [show, setShow] = useState(false);
  const closeHandler = (e: any) => {
    setShow(false);
    props.onClose(false);
    props.handleDownloadConfirm(false);
  };
  return (
    <div>
      {!props.paid && (
        <div style={{ display: "flex" }}>
          <div
            style={{
              marginTop: "76px",
              width: "202px",
              marginLeft: "10px",
            }}
          >
            <div
              style={{ overflowY: "hidden", marginLeft: "0px" }}
              className={popupStyles.content}
            >
              {props.children}
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ marginLeft: "10px" }}>Choose your file type:</div>
              <NativeSelect
                onChange={(e: any) => {
                  props.imagetype(e.target.value);
                  console.log(e.target.value);
                }}
              >
                <option value="jpeg">JPG</option>
                <option value="png">PNG</option>
              </NativeSelect>
            </div>
          </div>
          <div style={{ height: "890px" }}>
            <h2>Your Design is ready:</h2>
            <span className={popupStyles.close} onClick={closeHandler}>
              &times;
            </span>
            <div className={popupStyles.content}>
              Buy your image design now or get it free with our 7-Day Pro Trial
              <p style={{ fontWeight: "bold" }}>
                With Design Wizard Pro you get:
              </p>
              <div style={{ display: "flex" }}>
                <Tick
                  style={{ width: "30px", height: "30px", color: "green" }}
                ></Tick>
                <p style={{ margin: "0px" }}>
                  {" "}
                  60 image design downloads per month
                </p>
              </div>
              <div style={{ display: "flex" }}>
                <Tick
                  style={{
                    width: "30px",
                    height: "30px",
                    color: "green",
                    marginTop: "5px",
                  }}
                ></Tick>
                <p style={{ margin: "0px" }}>Image uploads </p>
              </div>
              <div style={{ display: "flex" }}>
                <Tick
                  style={{
                    width: "30px",
                    height: "30px",
                    color: "green",
                    marginTop: "5px",
                  }}
                ></Tick>
                <p style={{ margin: "0px" }}>Fonts uploads</p>
              </div>
              <div style={{ display: "flex" }}>
                <Tick
                  style={{
                    width: "30px",
                    height: "30px",
                    color: "green",
                    marginTop: "5px",
                  }}
                ></Tick>
                <p style={{ margin: "0px" }}>Free previews</p>
              </div>
              <div style={{ display: "flex" }}>
                <Tick
                  style={{
                    width: "30px",
                    height: "30px",
                    color: "green",
                    marginTop: "5px",
                  }}
                ></Tick>{" "}
                <p style={{ margin: "0px" }}>1GB storage</p>
              </div>
            </div>

            <div className={popupStyles.choose}>
              <span></span>
            </div>
            <div
              className={popupStyles.download}
              onClick={() => props.confirmDownload(true)}
            >
              <a
                //href={props.image}
                download
                style={{
                  textDecoration: "none",
                  color: "white",
                  margin: "auto",
                  textAlign: "center",
                }}
              >
                Try Pro Free{" "}
              </a>
            </div>
            <br />
            <div>
              <Button
                style={{
                  width: "74%",
                  marginLeft: "50px",
                  cursor: "pointer",
                  height: "45px",
                  fontSize: "20px",
                  fontWeight: "bold",
                  textAlign: "center",
                  padding: "10px",
                  borderRadius: "2px",
                  marginBottom: "20px",
                  textTransform: "capitalize",
                }}
                variant="outlined"
              >
                <a
                  //href={props.image}
                  download
                  style={{
                    textDecoration: "none",
                    color: "#2d3559",
                    margin: "auto",
                  }}
                >
                  Pay $2 (ex.tax){" "}
                </a>
              </Button>
              <br />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
