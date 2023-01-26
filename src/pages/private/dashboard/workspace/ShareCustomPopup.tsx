import { useEffect, useState } from "react";
import popupStyles from "./custom-popup.module.css";
//import PropTypes from "prop-types";
import { ReactComponent as Facebook } from "./../../../../assets/svg/facebook.svg";
import { ReactComponent as Linkedin } from "./../../../../assets/svg/linkedin.svg";
import { ReactComponent as Twitter } from "./../../../../assets/svg/twitter.svg";
const ShareCustomPopup = (props: any) => {
  const [show, setShow] = useState(false);

  const closeHandler = (e: any) => {
    setShow(false);
    props.onClose(false);
  };

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  const handleFb = () => {
    FB.ui({
      method: "share",
      display: "popup",
      href: props.viewUrl,
    });
  };

  const handleTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=Hey%2C%20look%20at%20what%20I%20created%20via%20@getdesignwizard%20&url=${props.viewerUrl}`,
      "Twitter Share",
      "width=600,height=400"
    );
  };

  const handleLinkedin = () => {
    window.open(
      `https://www.linkedin.com/shareArticle?mini=true&url=${props.viewerUrl}`,
      "LinkedIn Share",
      "width=600,height=400"
    );
  };
  return (
    <div
      style={{
        visibility: show ? "visible" : "hidden",
        opacity: show ? "1" : "0",
      }}
      className={popupStyles.overlay}
    >
      <div className={popupStyles.popup} style={{ border: "2px solid black" }}>
        <h2>{props.title}</h2>
        <span className={popupStyles.close} onClick={closeHandler}>
          &times;
        </span>
        <div className={popupStyles.content}>{props.children}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "70%",
            color: "#303858",
            fontSize: "1.0em",
            fontWeight: "bold",
            borderBottom: "1px solid #303858",
            marginLeft: "70px",
            marginTop: "20px",
          }}
        >
          <div style={{ cursor: "pointer" }}>Social Media</div>
          <div style={{ cursor: "pointer" }}>Embed</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "70%",
            marginLeft: "70px",
            //height: "80px",
            marginTop: "20px",
          }}
        >
          <div onClick={handleFb} style={{ cursor: "pointer" }}>
            <Facebook />
          </div>
          <div onClick={handleLinkedin} style={{ cursor: "pointer" }}>
            <Linkedin />
          </div>
          <div onClick={handleTwitter} style={{ cursor: "pointer" }}>
            <Twitter />
          </div>
        </div>
      </div>
    </div>
  );
};

// CustomPopup.propTypes = {
//   title: PropTypes.string.isRequired,
//   show: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired
// };
export default ShareCustomPopup;
