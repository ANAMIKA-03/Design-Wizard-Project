import React, { useEffect, useState } from "react";
import { Button, Modal } from "@material-ui/core";
import styled from "styled-components";
import { ReactComponent as Stripe } from "../../../../assets/svg/stripe.svg";
import { ReactComponent as Taxamo } from "../../../../assets/svg/taxamo.svg";
import { ReactComponent as Gdpr } from "../../../../assets/svg/gdpr.svg";
import { ReactComponent as Ssl } from "../../../../assets/svg/ssl.svg";
import { ReactComponent as Cross } from "../../../../assets/svg/cross.svg";
import { ReactComponent as Check } from "../../../../assets/svg/checkMarkIcon.svg";
import { makeStyles } from "@material-ui/core/styles";
import { theme } from "../../../../theme";
import { useDispatch, useSelector } from "react-redux";
import { any } from "prop-types";

const LeftColumn = styled.div`
  max-width: 50%;
  flex: 1;
  background-color: #2d3559;
  padding: 0px 35px 25px 28px;
`;

const PriceData = styled.div`
  font-weight: bold;
  text-align: center;
`;

const ProductName = styled.p`
  color: #fbfbff;
  font-size: 2.3em;
  text-transform: capitalize;
`;

const PlanList = styled.li`
  color: #fbfbff;
  font-size: 14px;
  padding: 3px 0;
  font-weight: bold;
  list-style: none;
`;

const Binding = styled.p`
  font-size: 1.45em;
  color: #fbfbff;
  margin: 0;
  font-weight: bold;
  text-align: center;
`;

const InfoP = styled.p`
  font-size: 15px;
  color: #fbfbff;
  text-align: center;
  font-weight: bold;
`;

const InfoSpan = styled.span`
  font-size: 15px;
  color: #fbfbff;
  text-align: center;
  font-weight: bold;
`;

const ModalDialog = styled.div`
  transform: translateY(0%) scale(0.75) !important;
  top: 50%;
  margin: auto;
  width: 45%;
`;

const ModalContent = styled.div`
  background-color: white;
  box-shadow: 0 0 50px 0 rgb(0 0 0 / 80%);
  -webkit-border-radius: 0;
  border: none;
`;

const Price = styled.p`
  padding-top: 10px;
  margin-bottom: 0;
  position: relative;
  z-index: 1;
  font-size: 35px;
  color: #2fc6c0;
  height: 70px;
`;

const RightColumn = styled.div`
  max-width: 50%;
  flex: 1;
  margin: 50px 0;
`;

const IframWrapper = styled.div`
  position: relative;
  height: 442px;
  width: 300px;
`;

const IframeLoaded = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 120px;
  text-align: center;
`;

const Logos = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  position: absolute;
  bottom: 5rem;
  right: 0.7rem;
`;

const PaymentPopup = (props: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [iFrameSrc, setIframeSrc] = useState("");
  let isPopupClosed = useSelector((state: any) => {
    return state.isPopupClosed;
  });
  const dispatch = useDispatch();

  function buildFlatURL(parameterName: string, data: object) {
    if (parameterName !== "meta" && parameterName !== "transaction") {
      throw new Error("Wrong parameter name.");
    }
    return flatten(data).reduce(
      (string: string, flat: string) => `${string + parameterName + flat}&`,
      ""
    );
  }

  const flatten = (obj: any) => {
    // var flattened: flattened[] = [];
    var flattened: string[] = [];
    Object.keys(obj).forEach((key) => {
      const flat = `[${key}]`;
      if (obj[key] && typeof obj[key] === "object") {
        flatten(obj[key]).forEach((part) => flattened.push(flat + part));
      } else {
        flattened.push(`${flat}=${obj[key]}`);
      }
    });
    return flattened;
  };

  useEffect(() => {
    // useEffect call to set iframe src
    var userName: any = localStorage.getItem("user");
    var iframe = "";
    if (props.planName === "Start Pro Trial") {
      iframe = `https://p.taxamo.com/checkout/api/v1/state/initialize?meta%5Ballowed_payment_providers%5D=stripe&meta%5Bshow_invoice_address%5D=false&meta%5Brequire_invoice_address%5D=false&meta%5Bshow_email%5D=false&meta%5Brequire_email%5D=false&meta%5Brequire_buyer_name%5D=false&meta%5Bshow_coupon_field%5D=false&meta%5Bfinished_redirect_url%5D=https://api.dwiz.io/taxamo/callback&meta%5Bsubscription_mode%5D=true&meta%5Bplans%5D%5Bb2c_plan_id%5D=master_monthly_trial&meta%5Bplans%5D%5Bb2b_plan_id%5D=master_monthly_trial&transaction%5Bcurrency_code%5D=USD&transaction%5Bbilling_country_code%5D=IN&transaction%5Bbuyer_name%5D=${
        JSON.parse(userName).name
      }&transaction%5Bbuyer_email%5D=${
        JSON.parse(userName).email
      }&public_token=public_test_OguUJsPAJTXkUW8_-bmHaX4HLboEhpLzCIQ4Epdc9Oc`;
    }

    if (props.planName === "Start Business Trial") {
      iframe = `https://p.taxamo.com/checkout/api/v1/state/initialize?meta%5Ballowed_payment_providers%5D=stripe&meta%5Bshow_invoice_address%5D=false&meta%5Brequire_invoice_address%5D=false&meta%5Bshow_email%5D=false&meta%5Brequire_email%5D=false&meta%5Brequire_buyer_name%5D=false&meta%5Bshow_coupon_field%5D=false&meta%5Bfinished_redirect_url%5D=https://api.dwiz.io/taxamo/callback&meta%5Bsubscription_mode%5D=true&meta%5Bplans%5D%5Bb2c_plan_id%5D=business_monthly_trial&meta%5Bplans%5D%5Bb2b_plan_id%5D=business_monthly_trial&transaction%5Bcurrency_code%5D=USD&transaction%5Bbilling_country_code%5D=IN&transaction%5Bbuyer_name%5D=${
        JSON.parse(userName).name
      }&transaction%5Bbuyer_email%5D=${
        JSON.parse(userName).email
      }&public_token=public_test_OguUJsPAJTXkUW8_-bmHaX4HLboEhpLzCIQ4Epdc9Oc`;
    }

    if (props.planName === "Get Pro") {
      iframe = `https://p.taxamo.com/checkout/api/v1/state/initialize?meta%5Ballowed_payment_providers%5D=stripe&meta%5Bshow_invoice_address%5D=false&meta%5Brequire_invoice_address%5D=false&meta%5Bshow_email%5D=false&meta%5Brequire_email%5D=false&meta%5Brequire_buyer_name%5D=false&meta%5Bshow_coupon_field%5D=false&meta%5Bfinished_redirect_url%5D=https://api.dwiz.io/taxamo/callback&meta%5Bsubscription_mode%5D=true&meta%5Bplans%5D%5Bb2c_plan_id%5D=master_yearly&meta%5Bplans%5D%5Bb2b_plan_id%5D=master_yearly&transaction%5Bcurrency_code%5D=USD&transaction%5Bbilling_country_code%5D=IN&transaction%5Bbuyer_name%5D=${
        JSON.parse(userName).name
      }&transaction%5Bbuyer_email%5D=${
        JSON.parse(userName).email
      }&public_token=public_test_OguUJsPAJTXkUW8_-bmHaX4HLboEhpLzCIQ4Epdc9Oc`;
    }

    if (props.planName === "Get Business") {
      iframe = `https://p.taxamo.com/checkout/api/v1/state/initialize?meta%5Ballowed_payment_providers%5D=stripe&meta%5Bshow_invoice_address%5D=false&meta%5Brequire_invoice_address%5D=false&meta%5Bshow_email%5D=false&meta%5Brequire_email%5D=false&meta%5Brequire_buyer_name%5D=false&meta%5Bshow_coupon_field%5D=false&meta%5Bfinished_redirect_url%5D=https://api.dwiz.io/taxamo/callback&meta%5Bsubscription_mode%5D=true&meta%5Bplans%5D%5Bb2c_plan_id%5D=business_yearly&meta%5Bplans%5D%5Bb2b_plan_id%5D=business_yearly&transaction%5Bcurrency_code%5D=USD&transaction%5Bbilling_country_code%5D=IN&transaction%5Bbuyer_name%5D=${
        JSON.parse(userName).name
      }&transaction%5Bbuyer_email%5D=${
        JSON.parse(userName).email
      }&public_token=public_test_OguUJsPAJTXkUW8_-bmHaX4HLboEhpLzCIQ4Epdc9Oc`;
    }

    console.log(iframe);
    if (iframe) setIframeSrc(iframe);
  }, [props.planName]);

  useEffect(() => {
    console.log("isPopupClosed", isPopupClosed);
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
    <>
      <Modal
        open={props.isPaymentPopupOpen}
        aria-labelledby="contained-modal-title-vcenter"
        onClose={() => {
          props.setIsPaymentPopupOpen(false);
          props.handleClose();
        }}
      >
        <ModalDialog className="modal-dialog modal-lg">
          <ModalContent className="modal-content">
            <div id="taxamo-checkout-wrapper">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {/* <CloneButton
                  // > */}
                <Button
                  type="button"
                  onClick={() => {
                    props.handleClose();
                    props.setIsPaymentPopupOpen(false);
                  }}
                  style={{
                    width: "30px",
                    height: "30px",
                    cursor: "pointer",
                    position: "absolute",
                    right: "10px",
                    top: "10px",
                  }}
                >
                  <Cross
                    style={{
                      color: "#b6b6bb",
                      width: "1.6rem",
                      marginRight: 0,
                    }}
                  />
                </Button>
                {/* </CloneButton> */}
                <LeftColumn>
                  <PriceData>
                    <ProductName
                      className="product-name ng-scope"
                      ng-if="::planName"
                    >
                      <span ng-bind="::planName" className="ng-binding">
                        {props.paymentTitle}
                      </span>{" "}
                    </ProductName>
                    {props.isMonthlyPlan && (
                      <Price
                        style={{ backgroundColor: "#2d3559" }}
                        ng-class="::{trial: trialPlan}"
                        className="trial"
                      >
                        <span
                          ng-if="::trialPlan"
                          style={{
                            display: "inline-block",
                            width: "150px",
                          }}
                          className="ng-binding ng-scope"
                        >
                          $0{" "}
                          <span style={{ textTransform: "capitalize" }}>
                            now
                          </span>
                        </span>
                      </Price>
                    )}
                  </PriceData>
                  <div
                    ng-if="trialPlan"
                    style={{
                      margin: props.isMonthlyPlan ? "40px 0" : "9rem 0 1px 0",
                      display: "flex",
                      justifyContent: "center",
                    }}
                    className="ng-scope"
                  >
                    {props.isMonthlyPlan ? (
                      <ul style={{ lineHeight: "1.6rem" }}>
                        {props.paymentList.map((item: any) => {
                          return (
                            <PlanList>
                              {/* <li
                              ng-repeat="option in options"
                              className="ng-binding ng-scope"
                            > */}
                              <Check style={{ color: "#4db3a9" }} />
                              &nbsp;&nbsp;
                              {item.title}
                              {/* </li> */}
                            </PlanList>
                          );
                        })}
                      </ul>
                    ) : (
                      <ul style={{ listStyle: "none" }}>
                        {props.paymentList.map((item: any) => {
                          return (
                            <PlanList>
                              <p>{item.question}</p>
                              <p>{item.answer}</p>
                            </PlanList>
                          );
                        })}
                      </ul>
                    )}
                  </div>

                  {props.isMonthlyPlan && (
                    <Binding
                      id="trial-plan"
                      ng-if="::trialPlan"
                      className="ng-scope"
                    >
                      <p style={{ lineHeight: 0 }} className="ng-binding">
                        After 7 days, only
                      </p>
                      <p style={{ lineHeight: 0.5 }}>
                        <span
                          style={{ color: "#2fc6c0" }}
                          ng-bind="planPrice | currency"
                          className="ng-binding"
                        >
                          {props.paymentAmount}
                        </span>{" "}
                        per month
                      </p>
                      <p
                        style={{
                          textTransform: "lowercase",
                          fontSize: "0.9em",
                          lineHeight: 0,
                        }}
                      >
                        (ex. tax)
                      </p>
                    </Binding>
                  )}

                  {props.isMonthlyPlan && (
                    <div
                      ng-if="trialPlan"
                      style={{ marginTop: "50px" }}
                      className="ng-scope"
                    >
                      <InfoSpan>
                        <span style={{ display: "block" }}>
                          Cancel Anytime!
                        </span>
                        <span style={{ display: "block" }}>
                          You won't be charged if you
                        </span>
                        <span style={{ display: "block" }}>
                          cancel before the trial ends
                        </span>
                      </InfoSpan>
                    </div>
                  )}
                </LeftColumn>

                <RightColumn id="right-column">
                  <IframWrapper id="iframe-wrapper">
                    <IframeLoaded
                      ng-hide="iframeLoaded"
                      id="loading-iframe"
                      aria-hidden="true"
                      className="ng-hide"
                    >
                      <div className="loading-dot"></div>
                      {isLoading && <p>Loading, please wait ...</p>}
                    </IframeLoaded>

                    <iframe
                      ng-show="iframeLoaded"
                      // iframe-onload="onIframeLoad(element)"
                      onLoad={(e: any) => {
                        console.log("element. ifram", window.location.href);
                        if (e) {
                          setIsLoading(false);
                        }
                      }}
                      style={{
                        display: "block",
                        margin: "auto",
                        position: "absolute",
                        right: 0,
                      }}
                      frameBorder="0"
                      scrolling="no"
                      width="594px"
                      height="465px"
                      src={iFrameSrc}
                      name="taxamo-iframe"
                      id="taxamo-iframe"
                      className="ng-isolate-scope"
                      aria-hidden="false"
                    ></iframe>
                  </IframWrapper>
                </RightColumn>
                <Logos id="logos">
                  <Stripe style={{ marginRight: "16px", width: "40px" }} />
                  <Taxamo
                    style={{
                      marginRight: "16px",
                      width: "61px",
                      height: "26px",
                    }}
                  />
                  <Gdpr
                    style={{
                      marginRight: "16px",
                      width: "61px",
                      height: "26px",
                    }}
                  />
                  <Ssl
                    style={{
                      marginRight: "16px",
                      width: "61px",
                      height: "26px",
                    }}
                  />
                </Logos>
              </div>
            </div>
          </ModalContent>
          {/* </div> */}
        </ModalDialog>
      </Modal>
      {/* </div> */}
    </>
  );
};

export default PaymentPopup;
