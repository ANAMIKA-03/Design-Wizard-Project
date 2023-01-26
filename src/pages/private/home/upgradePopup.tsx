import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DoneIcon from "@material-ui/icons/Done";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { Switch } from "@material-ui/core";
import { motion } from "framer-motion";
import { ReactComponent as CancelBtn } from "../../../assets/svg/cross.svg";
//import PaymentPopup from "../dashboard/payService/PaymentPopup";
import { SettingsApplications } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";

const PopupBox = styled(motion.div)`
  position: fixed;
  background: #00000050;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 999;
  font-family: Arial !important;
`;
const Box = styled.div`
   {
    position: relative;
    width: 100%;
    margin: 0 auto;
    height: auto;
    max-height: 100vh;
    margin-top: 0;
    background: rgb(246, 246, 246);
    border-radius: 4px;
    padding: 0;
    overflow: auto;
    z-index: 9999;
  }
`;
const CloseIcon = styled.span`
   {
    //content: "x";
    cursor: pointer;
    position: fixed;
    right: 32px;
    top: 20px;
    background:rgb(246, 246, 246);
    color: #000000;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    line-height: 20px;
    text-align: center;
    border: 1px solid #999;
     transition: all 0.3s ease-in-out;
      transition: all 0.3s ease-out-in
    font-size: 10px;
    &:hover{
    transition: all 0.3s ease-in-out;
     transition: all 0.3s ease-out-in;
     transform:rotate(90deg)
    }
  }
`;
const PlanBox = styled.div`
   {
    margin: 0 auto;
  }
`;
const HeadOne = styled.h1`
   {
    font-weight: bold;
    font-size: 39px;
    color: #303858;
    margin: 95px 0 20px 0;
    text-align: center;
    font-family: Arial !important;
  }
`;

const HeadTow = styled.h2`
   {
    font-weight: bold;
    font-size: 18px;
    color: #303858;
    margin: 0 0 18px 0;
    text-align: center;
  }
`;
const AnnualUL = styled.ul`
  margin: 0;
  padding: 0;
  margin: 0 auto 30px auto;
  text-align: center;
`;
const AnnualList = styled.li`
  font-weight: bold;
  font-size: 16px;
  margin: 0;
  color: #2d3559;
  display: inline-block;
`;
const AnnualListSpan = styled.span`
  font-size: 10px;
`;

const Plan = styled.ul`
  margin: 0;
  padding-left: 24px;
  margin: 0 auto;
  text-align: center;
  display: flex;
`;

const PlanlList = styled.li`
  margin: 0 9px;
  color: #2d3559;
  display: inline-block;
  border-radius: 10px;
  border: 1px solid #2d3559;
  width: 262px;
  color: #fbfbff;
  background-color: #2d3559;
  margin-bottom: 40px;
  position: relative;
  padding-bottom: 30px;
  height: 426px;
  flex: 1;
`;

const PlanHeadOne = styled.h1`
   {
    font-size: 28px;
    font-weight: bold;
    text-align: center;
    margin: 20px 0 0 0;
  }
`;

const PlanHeadTwo = styled.h2`
   {
    font-size: 28px;
    font-weight: bold;
    text-align: center;
    margin-top: 0;
    margin-bottom: 10px;
  }
`;

const PlanHeadThree = styled.h3`
   {
    color: #35dad3;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    margin-top: 18px;
    margin-bottom: 18px;
  }
`;

const PlanMost = styled.p`
   {
    text-align: center;
    color: #fff;
    background-color: #2d3559;
    padding: 4px 35px;
    border-radius: 8px 8px 0 0;
    position: relative;
    left: 0;
    top: -21px;
    font-size: 0.9em;
    font-weight: bold;
    display: inline-block;
    right: 0;
    position: absolute;
    width: 92px;
    margin: 0 auto;
  }
`;

const PlanHeadTwoSpan = styled.span`
   {
    font-size: 12px;
  }
`;

const ListULList = styled.li`
  width: 75%;
  margin: 0 auto;
  padding-bottom: 10px;
  font-size: 11px;
  list-style: none;
  text-align: left;
  font-weight: 600;
`;

const ListULListSpan = styled.span`
  color: #35dad3;
`;

const PlanBoxTable = styled.div`
   {
    background-color: #2d3559;
    padding: 100px;
    margin-top: 28px;
  }
`;

const PlanTableWrap = styled.div`
   {
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    color: #2d3559;
    padding: 40px;
  }
`;

const PlanTableOne = styled.div`
   {
    flex: 2;
  }
`;

const PlanTableTwo = styled.div`
   {
    flex: 1;
    border-left: 1px solid #e5e6e6;
  }
`;

const PlanTableHead = styled.h3`
   {
    height: 35px;
    font-weight: bold;
    font-size: 28px;
    margin: 0 0 40px 0;
    text-align: center;
  }
`;

const PlanTableUL = styled.ul`
  padding: 0;
  margin: 0;
`;

const PlanTableULList = styled.li`
  width: 75%;
  margin: 0 auto;
  font-size: 13px;
  list-style: none;
  text-align: left;
  font-weight: 600;
  height: 33px;
`;

const PlanTableULTwo = styled.ul`
  padding: 0;
  margin: 0;
`;

const PlanTableULListTwo = styled.li`
  margin: 0 auto;
  font-size: 12px;
  list-style: none;
  text-align: left;
  font-weight: 600;
  height: 33px;
  text-align: center;
`;

const PlanTableULListTwoSpan = styled.span`
  font-size: 12px;
  font-weight: bold;
`;

const FaqMain = styled.div`
  padding-bottom: 100px;
`;

const FaqWrap = styled.div`
  display: flex;
  width: 100%;
  color: #2d3559;
`;

const FaqUL = styled.ul`
  padding: 0 90px;
  margin: 0;
  flex: 1;
  list-style: none;
`;

const FaqULList = styled.li`
  margin-bottom: 15px;
`;

const FaqULListHead = styled.h4`
  color: #35dad3;
  font-weight: bold;
  font-size: 22px;
  margin: 0 0 13px 0;
`;

const FaqULListText = styled.p`
  font-size: 12px;
  margin: 0;
  color: #2d3559;
  opacity: 0.9;
  margin-bottom: 1rem;
`;
const CartDiv = styled.div`
border-radius: 50%;
    margin: auto;
    position: relative;
    width: 34px;
    border: 1px solid #909090;
    cursor: pointer;
    height: 35px;
    top: 10px;
    margin-bottom: 5px;
    }
  `;
const FirstPage = styled.div`
  padding: 0 140px;
  margin: auto;
  text-align: center;
  display: bolck;
`;
const PlanPage = styled.div`
  display: flex;
  justify-content: center;
`;
const BootstrapButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "8px 21px",
    border: "1px solid",
    lineHeight: 1.5,
    background: "#733cfe",
    borderColor: "#733cfe",
    color: "#fff",
    width: "79%",
    fontFamily: "Arial",
    borderRadius: "2px",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#733cfe",
      borderColor: "#733cfe",
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

const UpgradePopup = (props: any) => {
  // const [isPaymentPopupOpen, setIsPaymentPopupOpen] = useState(false);
  // const [paymentTitle, setPaymentTitle] = useState("");
  // const [paymentAmount, setPaymentAmount] = useState("");
  // const [isMonthlyPlan, setIsMonthlyPlan] = useState(true);
  // const [planName, setPlanName] = useState("");
  // const [paymentList, setPaymentList] = useState(
  //   isMonthlyPlan ? [{ title: "" }] : [{ question: "", answer: "" }]
  // );

  const isPopupClosed = useSelector((state: any) => {
    return state.isPopupClosed;
  });
  const dispatch = useDispatch();

  const proPlan = [
    {
      title: "60 image design downloads per month",
    },
    {
      title: "Image uploads",
    },
    {
      title: "Font uploads",
    },
    {
      title: "Free previews",
    },
    {
      title: "1GB storage",
    },
  ];

  const businessPlan = [
    {
      title: "Unlimited Standard Video Downloads",
    },
    {
      title: "1 Premium Video Per Month",
    },
    {
      title: "Unlimited Image Design Downloads",
    },
    {
      title: "Video Uploads",
    },
    {
      title: "Add Text & Images to Video",
    },
    {
      title: "10GB Storage",
    },
  ];

  const annualPlan = [
    {
      question: "Is my payment secure?",
      answer:
        "Yes. We use Stripe, one of the world leaders in online payments to process our payments.",
    },
    {
      question: "Can I change plans?",
      answer:
        "Sure! You can upgrade to an even better value plan via your profile.",
    },
    {
      question: "When will my account be debited?",
      answer:
        "Your account will be debited once per month (every 30 days) on the date which you began your subscription.",
    },
    {
      question: "How long does my subscription last for?",
      answer:
        " Your subscription will continue on a monthly basis, but you can cancel anytime.",
    },
  ];

  // useEffect(() => {
  //   console.log("Plan", isMonthlyPlan);
  // }, [isMonthlyPlan]);

  useEffect(() => {
    console.log("isPopupClosed upgrate popup", isPopupClosed);
    if (isPopupClosed) {
      console.log("isPopupClosed in if condition", isPopupClosed);
      props.setIsPaymentPopupOpen(false);
      dispatch({
        type: "closePopup",
        isPopupClosed: false,
      });
    }
  }, [isPopupClosed]);

  return (
    <div>
      {/* {isPaymentPopupOpen && (
        <PaymentPopup
          isPaymentPopupOpen={isPaymentPopupOpen}
          setIsPaymentPopupOpen={setIsPaymentPopupOpen}
          paymentTitle={paymentTitle}
          paymentAmount={paymentAmount}
          paymentList={paymentList}
          isMonthlyPlan={isMonthlyPlan}
          planName={planName}
        />
      )} */}
      <PopupBox
        initial={{ opacity: 0, scale: 0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box>
          {/* <motion.div animate={{
        rotate: close ? 90 : 0
      }}> */}
          <CloseIcon onClick={props.handleClose}>
            <CancelBtn
              style={{ height: "35px", width: "28px", color: "#A0A0A0" }}
            />
          </CloseIcon>
          {props.content}
          {/* </motion.div> */}
          <PlanBox>
            <HeadOne>Choose a plan that's right for you</HeadOne>
            <HeadTow>
              Start a free trial or join a plan today. Cancel anytime.
            </HeadTow>
            <AnnualUL>
              <AnnualList>
                Monthly{" "}
                <Switch
                  onChange={() => {
                    props.setIsMonthlyPlan(!props.isMonthlyPlan);
                  }}
                  style={{ color: " #35dad3" }}
                />{" "}
              </AnnualList>
              <AnnualList>
                Annual<AnnualListSpan> (save 25%)</AnnualListSpan>
              </AnnualList>
            </AnnualUL>
            <FirstPage>
              <PlanPage>
                <Plan>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <PlanlList>
                      <PlanHeadOne>Basic</PlanHeadOne>
                      <PlanHeadTwo>$0</PlanHeadTwo>
                      <PlanHeadThree></PlanHeadThree>
                      <br />
                      <ul
                        style={{
                          padding: 0,
                          margin: "20px auto 40px auto",
                          height: props.isMonthlyPlan ? "12.5rem" : "11rem",
                        }}
                      >
                        <ListULList>
                          Pay As You Go Image & Video Downloads
                        </ListULList>
                        <ListULList>Resize Image Designs</ListULList>
                        <ListULList>
                          Add Text, Images & Shapes to Designs
                        </ListULList>
                        <ListULList>Custom Colour Palette</ListULList>
                        <ListULList>Reseller Rights</ListULList>
                        <ListULList>Lifetime Licence</ListULList>
                        <ListULList>Ad Sponsored</ListULList>
                      </ul>
                    </PlanlList>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.3, duration: 0.5 }}
                  >
                    <PlanlList>
                      <PlanHeadOne>Pro</PlanHeadOne>
                      <PlanHeadTwo>
                        {props.isMonthlyPlan ? "$9.99" : "$7.42"}{" "}
                        <PlanHeadTwoSpan>/mo</PlanHeadTwoSpan>{" "}
                      </PlanHeadTwo>
                      {!props.isMonthlyPlan && (
                        <p style={{ fontSize: "12px" }}>$89 Billed Annually</p>
                      )}
                      <PlanHeadThree>All Basic features +</PlanHeadThree>
                      <ul
                        style={{
                          padding: 0,
                          margin: "20px auto 40px auto",
                          height: props.isMonthlyPlan ? "12.5rem" : "11rem",
                        }}
                      >
                        <ListULList>
                          <ListULListSpan>
                            {props.isMonthlyPlan ? 60 : 720}
                          </ListULListSpan>{" "}
                          Image Design Downloads Per Month
                        </ListULList>
                        <ListULList>Image Uploads</ListULList>
                        <ListULList>Font Uploads</ListULList>
                        <ListULList>Free Previews</ListULList>
                        <ListULList>1GB Storage</ListULList>
                        <ListULList>Ad Free</ListULList>
                      </ul>
                      <BootstrapButton
                        onClick={() => {
                          props.setPaymentTitle("Pro Plan");
                          props.setPaymentAmount("$9.99");
                          props.setPaymentList(
                            props.isMonthlyPlan ? proPlan : annualPlan
                          );
                          props.setPlanName(
                            props.isMonthlyPlan ? "Start Pro Trial" : "Get Pro"
                          );
                          props.setIsPaymentPopupOpen(true);
                          props.onClose();
                        }}
                      >
                        {props.isMonthlyPlan ? "Start Pro Trial" : "Get Pro"}
                      </BootstrapButton>
                    </PlanlList>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.8, duration: 0.5 }}
                  >
                    <PlanlList>
                      <PlanMost>Most Popular</PlanMost>
                      <PlanHeadOne>Business</PlanHeadOne>
                      <PlanHeadTwo>
                        {props.isMonthlyPlan ? "$49.99" : "$37.42"}{" "}
                        <PlanHeadTwoSpan>/mo</PlanHeadTwoSpan>{" "}
                      </PlanHeadTwo>
                      {!props.isMonthlyPlan && (
                        <p style={{ fontSize: "12px" }}>$449 Billed Annually</p>
                      )}
                      <PlanHeadThree>All Basic features +</PlanHeadThree>
                      <ul
                        style={{
                          padding: 0,
                          margin: "20px auto 40px auto",
                          height: props.isMonthlyPlan ? "12.5rem" : "11rem",
                        }}
                      >
                        <>
                          <ListULList>
                            <ListULListSpan>Unlimited</ListULListSpan> Standard
                            Video Downloads
                          </ListULList>
                          <ListULList>
                            <ListULListSpan>
                              {props.isMonthlyPlan ? 1 : 12} Premium
                            </ListULListSpan>{" "}
                            Video Per Month
                          </ListULList>
                          <ListULList>
                            Unlimited Image Design Downloads
                          </ListULList>
                          <ListULList>Video Uploads</ListULList>
                          <ListULList>Add Text & Images to Video</ListULList>
                          <ListULList>10GB Storage</ListULList>
                          <ListULList>Ad Free</ListULList>
                        </>
                      </ul>
                      <BootstrapButton
                        onClick={() => {
                          props.setPaymentTitle("Business Plan");
                          props.setPaymentAmount("$49.99");
                          props.setPaymentList(
                            props.isMonthlyPlan ? businessPlan : annualPlan
                          );
                          props.setPlanName(
                            props.isMonthlyPlan
                              ? "Start Business Trial"
                              : "Get Business"
                          );
                          props.setIsPaymentPopupOpen(true);
                          props.onClose();
                        }}
                      >
                        {props.isMonthlyPlan
                          ? "Start Business Trial"
                          : "Get Business"}
                      </BootstrapButton>
                    </PlanlList>
                  </motion.div>
                </Plan>
              </PlanPage>
            </FirstPage>
            <CartDiv>
              <span
                className="caret"
                style={{
                  marginLeft: "6px",
                  marginBottom: "-13px",
                  border: "solid",
                  borderWidth: "0 3px 3px 3px",
                  height: "1px",
                  display: "inline-block",
                  padding: "5px",
                  transformOrigin: "3px 1px",
                  transform: "rotate(313deg)",
                  marginRight: "10px",
                  borderLeft: "2px solid #B0B0B0",
                  borderBottom: "2px solid #B0B0B0",
                  animation: "bounce1 4s 2s infinite",
                }}
              ></span>
            </CartDiv>
            <PlanBoxTable>
              <PlanTableWrap>
                <PlanTableOne>
                  <PlanTableHead></PlanTableHead>
                  <PlanTableUL>
                    <PlanTableULList>Pay As You Go Downloads</PlanTableULList>
                    <PlanTableULList>Resize Image Designs</PlanTableULList>
                    <PlanTableULList>Add Text to Image Designs</PlanTableULList>
                    <PlanTableULList>Add Images to Designs</PlanTableULList>
                    <PlanTableULList>
                      Add Shapes to Image Designs
                    </PlanTableULList>
                    <PlanTableULList>
                      Download in JPG, PNG and PDF
                    </PlanTableULList>
                    <PlanTableULList>Reseller Rights</PlanTableULList>
                    <PlanTableULList>Lifetime Licence</PlanTableULList>
                    <PlanTableULList>Custom Colour Palette</PlanTableULList>
                    <PlanTableULList>
                      Share Directly to Social Media
                    </PlanTableULList>
                    <PlanTableULList>Storage Space</PlanTableULList>
                    <PlanTableULList>Image Uploads</PlanTableULList>
                    <PlanTableULList>Font Uploads</PlanTableULList>
                    <PlanTableULList>Free Previews</PlanTableULList>
                    <PlanTableULList>
                      Unlimited Standard Video Downloads
                    </PlanTableULList>
                    <PlanTableULList>1 Premium Video Download</PlanTableULList>
                    <PlanTableULList>Video Uploads</PlanTableULList>
                    <PlanTableULList>Add Text to Videos</PlanTableULList>
                    <PlanTableULList>Add Shapes to Videoss</PlanTableULList>
                    <PlanTableULList>Add Logos to Videos</PlanTableULList>
                    <PlanTableULList>Animated Text Templates</PlanTableULList>
                    <PlanTableULList>MP4 Video Downloads</PlanTableULList>
                    <PlanTableULList>Priority Customer Support</PlanTableULList>
                    <PlanTableULList>Account Manager</PlanTableULList>
                  </PlanTableUL>
                </PlanTableOne>
                <PlanTableTwo>
                  <PlanTableHead>Basic</PlanTableHead>
                  <PlanTableULTwo>
                    <PlanTableULListTwo>
                      <DoneIcon style={{ color: "#35dad3" }} />
                    </PlanTableULListTwo>
                    <PlanTableULListTwo>
                      <DoneIcon style={{ color: "#35dad3" }} />
                    </PlanTableULListTwo>
                    <PlanTableULListTwo>
                      <DoneIcon style={{ color: "#35dad3" }} />
                    </PlanTableULListTwo>
                    <PlanTableULListTwo>
                      <DoneIcon style={{ color: "#35dad3" }} />
                    </PlanTableULListTwo>
                    <PlanTableULListTwo>
                      <DoneIcon style={{ color: "#35dad3" }} />
                    </PlanTableULListTwo>
                    <PlanTableULListTwo>
                      <DoneIcon style={{ color: "#35dad3" }} />
                    </PlanTableULListTwo>
                    <PlanTableULListTwo>
                      <DoneIcon style={{ color: "#35dad3" }} />
                    </PlanTableULListTwo>
                    <PlanTableULListTwo>
                      <DoneIcon style={{ color: "#35dad3" }} />
                    </PlanTableULListTwo>
                    <PlanTableULListTwo>
                      <DoneIcon style={{ color: "#35dad3" }} />
                    </PlanTableULListTwo>
                    <PlanTableULListTwo>
                      <DoneIcon style={{ color: "#35dad3" }} />
                    </PlanTableULListTwo>
                    <PlanTableULListTwo>
                      <PlanTableULListTwoSpan> 15MB </PlanTableULListTwoSpan>
                    </PlanTableULListTwo>
                  </PlanTableULTwo>
                </PlanTableTwo>
                <PlanTableTwo>
                  <PlanTableHead>Pro</PlanTableHead>
                  <PlanTableULTwo>
                    <PlanTableULListTwo>
                      <PlanTableULListTwoSpan>
                        {" "}
                        60 Image Design Downloads Per Month
                      </PlanTableULListTwoSpan>
                    </PlanTableULListTwo>
                    <PlanTableULListTwo>
                      <DoneIcon style={{ color: "#35dad3" }} />
                    </PlanTableULListTwo>
                    <PlanTableULListTwo>
                      <DoneIcon style={{ color: "#35dad3" }} />
                    </PlanTableULListTwo>
                    <PlanTableULListTwo>
                      <DoneIcon style={{ color: "#35dad3" }} />
                    </PlanTableULListTwo>
                    <PlanTableULListTwo>
                      <DoneIcon style={{ color: "#35dad3" }} />
                    </PlanTableULListTwo>
                    <PlanTableULListTwo>
                      <DoneIcon style={{ color: "#35dad3" }} />
                    </PlanTableULListTwo>
                    <PlanTableULListTwo>
                      <DoneIcon style={{ color: "#35dad3" }} />
                    </PlanTableULListTwo>
                    <PlanTableULListTwo>
                      <DoneIcon style={{ color: "#35dad3" }} />
                    </PlanTableULListTwo>
                    <PlanTableULListTwo>
                      <DoneIcon style={{ color: "#35dad3" }} />
                    </PlanTableULListTwo>
                    <PlanTableULListTwo>
                      <DoneIcon style={{ color: "#35dad3" }} />
                    </PlanTableULListTwo>
                    <PlanTableULListTwo>
                      <DoneIcon style={{ color: "#35dad3" }} />
                    </PlanTableULListTwo>
                    <PlanTableULListTwo>
                      <PlanTableULListTwoSpan> 1MB </PlanTableULListTwoSpan>
                    </PlanTableULListTwo>
                    <PlanTableULListTwo>
                      <DoneIcon style={{ color: "#35dad3" }} />
                    </PlanTableULListTwo>
                    <PlanTableULListTwo>
                      <DoneIcon style={{ color: "#35dad3" }} />
                    </PlanTableULListTwo>
                  </PlanTableULTwo>
                </PlanTableTwo>
                <PlanTableTwo>
                  <PlanTableHead>Business</PlanTableHead>
                  <PlanTableULTwo>
                    <PlanTableULListTwo>
                      <PlanTableULListTwoSpan>
                        {" "}
                        60 Image Design Downloads Per Month
                      </PlanTableULListTwoSpan>
                    </PlanTableULListTwo>
                    <PlanTableULListTwo>
                      <DoneIcon style={{ color: "#35dad3" }} />
                    </PlanTableULListTwo>
                    <PlanTableULListTwo>
                      <DoneIcon style={{ color: "#35dad3" }} />
                    </PlanTableULListTwo>
                    <PlanTableULListTwo>
                      <DoneIcon style={{ color: "#35dad3" }} />
                    </PlanTableULListTwo>
                    <PlanTableULListTwo>
                      <DoneIcon style={{ color: "#35dad3" }} />
                    </PlanTableULListTwo>
                    <PlanTableULListTwo>
                      <DoneIcon style={{ color: "#35dad3" }} />
                    </PlanTableULListTwo>
                    <PlanTableULListTwo>
                      <DoneIcon style={{ color: "#35dad3" }} />
                    </PlanTableULListTwo>
                    <PlanTableULListTwo>
                      <DoneIcon style={{ color: "#35dad3" }} />
                    </PlanTableULListTwo>
                    <PlanTableULListTwo>
                      <DoneIcon style={{ color: "#35dad3" }} />
                    </PlanTableULListTwo>
                    <PlanTableULListTwo>
                      <DoneIcon style={{ color: "#35dad3" }} />
                    </PlanTableULListTwo>
                    <PlanTableULListTwo>
                      <DoneIcon style={{ color: "#35dad3" }} />
                    </PlanTableULListTwo>
                    <PlanTableULListTwo>
                      <PlanTableULListTwoSpan> 1MB </PlanTableULListTwoSpan>
                    </PlanTableULListTwo>
                    <PlanTableULListTwo>
                      <DoneIcon style={{ color: "#35dad3" }} />
                    </PlanTableULListTwo>
                    <PlanTableULListTwo>
                      <DoneIcon style={{ color: "#35dad3" }} />
                    </PlanTableULListTwo>
                  </PlanTableULTwo>
                </PlanTableTwo>
              </PlanTableWrap>
            </PlanBoxTable>
            <FaqMain>
              <HeadOne>Frequently Asked Questions:</HeadOne>
              <HeadTow>
                Ask us anything at
                <Typography
                  style={{ display: "inline-block", marginLeft: "3px" }}
                >
                  <Link
                    style={{
                      color: "#303858",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                    href="mailto:info@designwizard.com"
                  >
                    info@designwizard.com
                  </Link>
                </Typography>
              </HeadTow>
              <FaqWrap>
                <FaqUL>
                  <FaqULList>
                    <FaqULListHead>
                      How long does my subscription last for?
                    </FaqULListHead>
                    <FaqULListText>
                      Monthly: Your subscription will continue on a monthly
                      basis, but you can cancel anytime.
                    </FaqULListText>

                    <FaqULListText>
                      Annual: Your subscription will last for 12 months. At the
                      end of this period, it will automaticlly renew. If you
                      want do not wish to renew it, you can cancel it before the
                      12 month period has ended.
                    </FaqULListText>
                  </FaqULList>

                  <FaqULList>
                    <FaqULListHead>
                      How long does my free trial last for?
                    </FaqULListHead>
                    <FaqULListText>
                      Your free trial on Pro or Business will last for 7 days,
                      after which time you will become a subscriber of the plan
                      you have chosen. If you do not wish to subscribe, you can
                      cancel before your trial has end
                    </FaqULListText>
                  </FaqULList>

                  <FaqULList>
                    <FaqULListHead>When will I be debited?</FaqULListHead>
                    <FaqULListText>
                      Monthly: Your account will be debited once per month
                      (every 30 days) on the date which you began your
                      subscription.
                    </FaqULListText>

                    <FaqULListText>
                      Annual: Your account will be debited once only,
                      immediately after purchase.
                    </FaqULListText>
                  </FaqULList>

                  <FaqULList>
                    <FaqULListHead>Can I change plans?</FaqULListHead>
                    <FaqULListText>
                      Sure! You can upgrade to an even better value plan via
                      your profile.
                    </FaqULListText>
                  </FaqULList>
                </FaqUL>
                <FaqUL>
                  <FaqULList>
                    <FaqULListHead>
                      Can I cancel my subscription whenever I want?
                    </FaqULListHead>
                    <FaqULListText>
                      Yes. You can cancel your subscription at any time from the
                      profile section of Design Wizard.
                    </FaqULListText>
                  </FaqULList>

                  <FaqULList>
                    <FaqULListHead>What are credits?</FaqULListHead>
                    <FaqULListText>
                      Credits are our in-app currency and 1 credit = 1 download.
                      There are both image and video credits available. If you
                      have 1 image credit, you can download 1 image design. If
                      you have 1 video credit, you can download 1 video.
                    </FaqULListText>
                  </FaqULList>

                  <FaqULList>
                    <FaqULListHead>Is my payment secure?</FaqULListHead>
                    <FaqULListText>
                      Yes. We use Stripe, one of the world leaders in online
                      payments to process our payments.
                    </FaqULListText>
                  </FaqULList>
                </FaqUL>
              </FaqWrap>
            </FaqMain>
          </PlanBox>
        </Box>
      </PopupBox>
    </div>
  );
};
export default UpgradePopup;
