import { useMutation } from "@apollo/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { TaxamoSubscribe } from "../lib/contexts/Queries";

export const Transaction = () => {
  const [taxamoData, setTaxamoData] = useState({});
  const [taxamo] = useMutation(TaxamoSubscribe);
  const dispatch = useDispatch();

  useEffect(() => {
    apiCall();
  }, []);

  const apiCall = async () => {
    var url = window.location.href.split("=")[1];
    console.log("urlllll", url);
    await axios
      .get(`https://api.dwiz.io/api/users/taxamoTransaction/${url} `)
      .then((resp) => {
        console.log("response data", resp);
        if (resp.data) {
          var paymentResult = { payment_result: {} };
          paymentResult.payment_result = resp.data;
          setTaxamoData(paymentResult);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  useEffect(() => {
    console.log(taxamoData);
    var obj = Object.keys(taxamoData);
    // if (obj.length !== 0) {
    obj.length > 0 && taxamoSubscribe();
    // }
  }, [taxamoData]);

  const taxamoSubscribe = async () => {
    console.log("if condition obj", taxamoData);

    await taxamo({
      variables: {
        input: JSON.stringify(taxamoData),
        token: `${localStorage.getItem("token")}`,
      },
    }).then((data) => {
      console.log("response transaction data", data);
      if (data.data.POST_users_me_taxamoSubscribe) {
        console.log("response transaction data iffff", data);
        toast.success("Transaction Completed successfully");
        dispatch({
          type: "closePopup",
          isPopupClosed: true,
        });
      }
    });
  };
  return (
    <>
      <p>Transaction Completed successfully</p>
    </>
  );
};
