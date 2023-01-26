import React from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const PopupBox = styled.div`
   {
    position: fixed;
    background: #00000050;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 999;
  }
`;
const Box = styled.div`
   {
    position: relative;
    width: 40%;
    margin: 0 auto;
    height: auto;
    max-height: 100vh;
    margin-top: 8%;
    background: #fff;
    border-radius: 10px;
    padding: 0;
    overflow: auto;
    border: 3px solid #2d3559;
    z-index: 99999;
  }
`;

const PlanBox = styled.div`
   {
    margin: 0 auto;
    text-align: center;
    padding: 50px;
  }
`;
const HeadOne = styled.h1`
   {
    font-weight: 500;
    font-size: 25px;
    color: #303858;
    margin: 0 0 18px 0;
    text-align: center;
  }
`;

const HeadTow = styled.h2`
   {
    font-weight: 500;
    font-size: 16px;
    color: #303858;
    margin: 0 0 18px 0;
    text-align: center;
  }
`;

const BootstrapButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "8px 21px",
    border: "1px solid",
    lineHeight: 1.5,
    background: "#2d3559",
    borderColor: "#2d3559",
    color: "#fff",
    width: "20%",
    borderRadius: "2px",
    "&:hover": {
      backgroundColor: "#242b48",
      borderColor: "#242b48",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#733cfe",
      borderColor: "#733cfe",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  },
})(Button);

const RequestSuccessPopup = (props: any) => {
  return (
    <PopupBox>
      <Box>
        {props.content}
        <PlanBox>
          <HeadOne>Your DesignWizard information</HeadOne>
          <HeadTow>
            `We are preparing your information.It could take up to 30 days. Once
            it is ready we'll send you an email with the link to the file. For
            more information on our user request process,click{" "}
            <a href="here"></a>`
          </HeadTow>
          <BootstrapButton onClick={props.handleClose}>OK</BootstrapButton>
        </PlanBox>
      </Box>
    </PopupBox>
  );
};
export default RequestSuccessPopup;
