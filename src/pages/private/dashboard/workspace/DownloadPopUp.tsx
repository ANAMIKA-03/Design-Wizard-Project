import { useEffect, useState } from "react";
import popupStyles from "./custom-popup.module.css";
import NativeSelect from "@material-ui/core/NativeSelect";
//import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { ReactComponent as Tick } from "../../../../assets/svg/tick.svg";
import { padding } from "@mui/system";
import { UnPaidDownloadPopup } from "./unPaidDownloadPopup";

const Confirm = styled.div`
  width: 100%;
  height: 100%;
  min-height: 300px;
  margin-top: 30px;
`;

const ImageDiv = styled.div`
  background-size: cover;
  width: 100px;
  height: 100px;
  border-radius: 80px;
  background-color: white;
  background-repeat: no-repeat;
  background-position: center;
  margin: auto;
`;

const SuccessMsg = styled.p`
  margin-top: 35px;
  margin-bottom: 50px;
  padding: 0 70px;
  text-align: center;
  font-family: Arial !important;
  font-size: 12px;
`;

const HR = styled.hr`
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const ButtonWrapper = styled.div`
  width: 100%;
  margin: auto;
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const Buttons = styled.div`
  display: inline-block;
  margin-left: 15px;
`;

const CreateBtn = styled.div`
  color: #2d3559 !important;
  outline: none !important;
  border: 1px solid #2d3559 !important;
  padding: 7px;
  background-color: transparent;
  transition: border 0.3s ease, background-color 0.3s ease;
  background-image: none !important;
  min-height: 25px;
  min-width: 125px;
  border-radius: 3px;
  width: 100%;
  position: relative;
  overflow: hidden;
  z-index: 1 !important;
  cursor: pointer;
`;

const PurchaseBtn = styled.div`
  color: #fbfbff !important;
  outline: none !important;
  border: 1px solid #2d3559 !important;
  padding: 7px;
  background-color: #2d3559;
  transition: border 0.3s ease, background-color 0.3s ease;
  background-image: none !important;
  cursor: pointer;
  min-height: 25px;
  min-width: 125px;
  border-radius: 3px;
  width: 100%;
  position: relative;
  overflow: hidden;
  z-index: 1 !important;
`;

const Createtext = styled.span`
  text-align: center;
  padding-left: 0;
  line-height: 30px;
  margin-left: 5px;
  display: inline-block;
  vertical-align: middle;
  z-index: 22;
`;
const InnerSpan = styled.span`
  text-transform: uppercase;
  font-size: 16px;
  line-height: 16px;
  display: block;
`;
const DownloadCustomPopup = (props: any) => {
  const [show, setShow] = useState(false);
  const closeHandler = (e: any) => {
    setShow(false);
    props.onClose(false);
    props.handleDownloadConfirm(false);
  };

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  return (
    <div
      style={{
        visibility: show ? "visible" : "hidden",
        opacity: show ? "1" : "0",
      }}
      className={popupStyles.overlay}
    >
      <div>
        <div
          className={popupStyles.popup}
          style={{ border: "2px solid #2d3559", height: "450px" }}
        >
          {props.paid && (
            <div style={{ display: "flex", width: "400px" }}>
              <div
                style={{
                  marginTop: "76px",
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
                  <div style={{ marginLeft: "10px" }}>
                    Choose your file type:
                  </div>
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
                  Buy your image design now or get it free with our 7-Day Pro
                  Trial
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
          {!props.downloadConfirm && (
            <>
              <h2>{props.title}</h2>
              <span className={popupStyles.close} onClick={closeHandler}>
                &times;
              </span>
              <div
                style={{
                  overflow: "hidden",
                  maxHeight: " 44%",
                  marginLeft: "70px",
                  width: " 76%",
                  marginBottom: "34px",
                }}
                className={popupStyles.content}
              >
                {props.children}
              </div>
              <div
                style={{ marginLeft: "73px", width: "59%" }}
                className={popupStyles.choose}
              >
                <span>Choose your file type:</span>
                <NativeSelect
                  onChange={(e: any) => {
                    props.imagetype(e.target.value);
                    console.log(e.target.value);
                  }}
                  style={{ marginTop: "-4px" }}
                >
                  <option value="jpeg">JPG</option>
                  <option value="png">PNG</option>
                </NativeSelect>
              </div>
              {/* <Button
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
                  Download{" "}
                </a>
              </Button> */}
              <br />
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
                  Download{" "}
                </a>
              </div>
            </>
          )}
          {props.downloadConfirm && (
            <div
              style={{
                height: "100%",
                display: "block",
              }}
            >
              <span className={popupStyles.close} onClick={closeHandler}>
                &times;
              </span>
              <Confirm>
                <ImageDiv
                  style={{ backgroundImage: props.thumb, paddingTop: "50px" }}
                >
                  <img
                    src={props.thumb}
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: "50%",
                    }}
                  />
                </ImageDiv>
                <SuccessMsg>
                  Your image has been downloaded. You can view your downloaded
                  and shared images in your 'Purchase History' folder. Do you
                  want to create a new design?
                </SuccessMsg>
                <HR />
                <div>
                  <ButtonWrapper>
                    <Buttons style={{ marginRight: "25px" }}>
                      <Link to="/dashboard/workspace">
                        <CreateBtn onClick={() => props.confirmDownload(false)}>
                          <Createtext>
                            <InnerSpan>Create New Design</InnerSpan>
                          </Createtext>
                        </CreateBtn>
                      </Link>
                    </Buttons>
                    <Buttons>
                      <Link to="/dashboard/purchase-history">
                        <PurchaseBtn
                          onClick={() => props.confirmDownload(false)}
                        >
                          <Createtext>
                            <InnerSpan style={{ paddingLeft: "6px" }}>
                              Purchase History
                            </InnerSpan>
                          </Createtext>
                        </PurchaseBtn>
                      </Link>
                    </Buttons>
                  </ButtonWrapper>
                </div>
              </Confirm>
            </div>
          )}
        </div>
      </div>
      {/* <UnPaidDownloadPopup/> */}
    </div>
  );
};

// CustomPopup.propTypes = {
//   title: PropTypes.string.isRequired,
//   show: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired
// };
export default DownloadCustomPopup;
