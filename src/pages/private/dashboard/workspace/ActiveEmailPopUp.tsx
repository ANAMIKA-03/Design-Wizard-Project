import styled from "styled-components";
import { ReactComponent as EmailIcon } from "./../../../../assets/svg/email.svg";
import popupStyles from "./custom-popup.module.css";
import React from "react";
import { resendEmail } from "./../../../../lib/contexts/Queries";
import { useLazyQuery } from "@apollo/client";
import { motion } from "framer-motion";
const Overlay = styled(motion.div)`
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.7);
  z-index: 20;
`;
const MainDiv = styled.div`
  transform: translateY(-50%) scale(0.9) !important;
  top: 50%;
  margin-top: 0;
  margin-left: 36%;
  margin_right: auto;
  right: 0;
  left: 0;
  position: absolute;
  overflow: hidden;
  max-width: 500px;
  //width: auto;
  display: block;
  visibility: hidden;
  opacity: 0;

  // z-index: 100;
`;
const PopupBox = styled.div`
background-color: white;
box-shadow: 0 0 50px 0 rgb(0 0 0 / 80%);
border: 3px solid #2d3559;
border-radius: 10px;
margin-top:0%;
margin-bottom:30%
position: relative;
display: flex;
flex-direction: column;
    width: 80%;
    pointer-events: auto;
    background-clip: padding-box;
    outline: 0;
    font-size: 16px;

`;

const Box = styled.div`
  position: relative;
  flex: 1 1 auto;
  ont-family: Arial !important;
  padding: 40px 51px 51px 41px;
  background-color: white;
  display: block;
`;

const PlanBox = styled.div`
  margin-bottom: 20px;
  text-align: center;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  display: block;
`;
const HeadOne = styled.h1`
  color: #2d3559;
  font-weight: bold;
  font-family: Arial !important;
  font-size: 1.8em;
  margin: 0 0 18px 0;
  line-height: 1.5;
  text-align: center;
  padding: 4px;
`;

const Cross = styled.h1`
  // margin-top:0;
  // margin-bottom:0;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 0;
  border-radius: 50%;
  z-index: 99999;
  opacity: 1;
  //transition: background-color .25s ease;
  padding: 0;
  border: 0;
  float: right;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  color: "grey";
  text-shadow: 0 1px 0 #fff;
  margin: 0;
  &:hover {
    transition: background-color 0.25s ease;
  }
`;

const IconWrapper = styled.div`
padding: 10px;
transform: scale(0.9) !important;
background-color: #f0f0f0;
border-radius: 50%;
display: inline-block;
text-align: center;
margin-bottom: 10px;
font-weight: 400;
line-height: 1.5;
}
`;
const HeadTow = styled.h2`
   {
    font-size: 17.8px;
    color: #2d3559;
    font-weight: bolder;
    font-family: Arial !important;
    text-align: center;
    line-height: 1.5;
    margin-bottom: 20px
    font-family: Arial !important;
}
`;
const Contact = styled.h2`
   {
    font-size: 17.8px;
    color: #2d3559;
    font-weight: bolder;
    font-family: Arial !important;
    text-align: center;
    line-height: 1.5;
    margin-bottom: 20px
    font-family: Arial !important;
    padding: 4px;
}
`;
const HeadTwo = styled.h2`
   {
    font-size: 19.8px;
    color: #2d3559;
    font-weight: bolder;
    font-family: Arial !important;
    text-align: center;
    line-height: 1.5;
    margin-bottom: 20px
    font-family: Arial !important;
}
`;
const HeadThree = styled.h2`
  font-size: 20px;
  color: #2fc6c0 !important;
  text-decoration: underline;
  text-align: center;
  line-height: 1.5;
  cursor: pointer;
  font-family: Arial;
  font-weight: 700;
`;

const EmailSent = styled.div`
  min-height: 30px;
`;

const ActivateEmailPopup = (props: any) => {
  const closeHandler = (e: any) => {
    props.onClose(false);
    setShow(false);
  };
  const [showEmailSent, setShowEmailSent] = React.useState(false);
  const [show, setShow] = React.useState(false);
  //const[emailSentMsg,setEmailSentMsg]=React.useState("email sent")

  const [resendEmailData] = useLazyQuery(resendEmail, {
    fetchPolicy: "cache-and-network",
    onCompleted: (e: any) => {
      setShowEmailSent(true);
    },
    // onError: (e: any) => {

    // },
  });

  React.useEffect(() => {
    setShow(props.show);
  }, [props.show]);
  React.useEffect(() => {
    if (showEmailSent) {
      handleEmailTImeOut();
    }
  }, [showEmailSent]);
  const handleEmailTImeOut = () => {
    setTimeout(() => {
      setShowEmailSent(false);
    }, 2500);
  };
  return (
    // <Overlay initial={{ opacity: 0, y:20}}
    // animate={{ opacity: 1, y:0 }}
    // transition={{ transiton:linear }}>

    <Overlay
      initial={{ opacity: 0, y: 300, scale: 1.3, x: 10 }}
      animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
      transition={{ transition: "linear" }}
    >
      <MainDiv
        style={{
          visibility: show ? "visible" : "hidden",
          opacity: show ? 1 : 0,
        }}
      >
        <PopupBox>
          <Box>
            <Cross>
              <span className={popupStyles.close} onClick={closeHandler}>
                &times;
              </span>
            </Cross>
            <PlanBox>
              <IconWrapper>
                <EmailIcon
                  style={{
                    color: "rgb(45, 53, 89)",
                    width: "65px",
                    height: "55px",
                    marginTop: "0",
                  }}
                />
              </IconWrapper>
              <HeadOne>Activate your account</HeadOne>
              <HeadTow>
                {` To activate your account please verify your email:`}
              </HeadTow>
              <HeadTwo>{localStorage.getItem("email")}</HeadTwo>

              <HeadThree
                onClick={() => {
                  resendEmailData({
                    variables: {
                      token: `${localStorage.getItem("token")}`,
                    },
                  });
                }}
              >
                Send verification email
              </HeadThree>
              <HeadTow>
                Please check your inbox and follow the instructions to activate
                your account.
              </HeadTow>
              <Contact>
                If you don't receive this email in the next few minutes, please
                click{" "}
                <a
                  style={{ color: " #2d3559" }}
                  href="mailto:info@designwizard.com"
                >
                  contact
                </a>{" "}
                support.
              </Contact>
              <EmailSent>
                {showEmailSent && (
                  <a
                    style={{ color: "#2d3559" }}
                    href="mailto:info@designwizard.com"
                  >
                    <p> Email sent</p>{" "}
                  </a>
                )}
              </EmailSent>
            </PlanBox>
          </Box>
        </PopupBox>
      </MainDiv>
    </Overlay>
  );
};
export default ActivateEmailPopup;
