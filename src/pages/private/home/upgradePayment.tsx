import PaymentPopup from "../../../pages/private/dashboard/payService/PaymentPopup";
import UpgradePopup from "../../../pages/private/home/upgradePopup";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UpgradePayemntPopUp(props: any) {
  const [isPaymentPopupOpen, setIsPaymentPopupOpen] = React.useState(false);
  const [paymentTitle, setPaymentTitle] = React.useState("");
  const [paymentAmount, setPaymentAmount] = React.useState("");
  const [isMonthlyPlan, setIsMonthlyPlan] = React.useState(true);
  const [planName, setPlanName] = React.useState("");
  const [paymentList, setPaymentList] = React.useState(
    isMonthlyPlan ? [{ title: "" }] : [{ question: "", answer: "" }]
  );
  const [isOpen, setIsOpen] = React.useState(true);
  const isPopupClosed = useSelector((state: any) => {
    return state.isPopupClosed;
  });
  const dispatch = useDispatch();

  const openClose = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    console.log("isPopupClosed upgrate payment ", isPopupClosed);
    if (isPopupClosed) {
      console.log("isPopupClosed in if condition", isPopupClosed);
      setIsPaymentPopupOpen(false);
      dispatch({
        type: "closePopup",
        isPopupClosed: false,
      });
    }
  }, [isPopupClosed]);

  return (
    <>
      {isOpen && (
        <UpgradePopup
          setPaymentTitle={setPaymentTitle}
          setIsPaymentPopupOpen={setIsPaymentPopupOpen}
          paymentTitle={paymentTitle}
          setPaymentAmount={setPaymentAmount}
          setPlanName={setPlanName}
          setPaymentList={setPaymentList}
          setIsMonthlyPlan={setIsMonthlyPlan}
          isMonthlyPlan={isMonthlyPlan}
          onClose={openClose}
          handleClose={props.handleClose}
        />
      )}

      {isPaymentPopupOpen && (
        <PaymentPopup
          isPaymentPopupOpen={isPaymentPopupOpen}
          setIsPaymentPopupOpen={setIsPaymentPopupOpen}
          paymentTitle={paymentTitle}
          paymentAmount={paymentAmount}
          paymentList={paymentList}
          isMonthlyPlan={isMonthlyPlan}
          planName={planName}
          handleClose={props.handleClose}
        />
      )}
    </>
  );
}
