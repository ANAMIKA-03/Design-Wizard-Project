// eslint-disable-next-line no-unused-vars
import React from "react";
import { GetUser } from "../lib/contexts/Queries";
import { useQuery } from "@apollo/client";

export const GoogleLoginCallback: any = () => {
  let txt = window.location.href;
  if (txt.split("&")[1].split("=")[1].includes("true")) {
    window.location.href = "/callback-error/email-not-exist";
    return;
  }
  const getUserDetail = useQuery(GetUser, {
    variables: {
      token: txt.split("/")[4].split("?")[0],
      filter: "refresh",
    },
  });
  if (getUserDetail.loading) return <>loading...</>;
  if (getUserDetail.error) {
    window.location.href = "/";
  }

  if (getUserDetail.data) {
    console.log(getUserDetail);
    let data = getUserDetail.data.GET_users_me;
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("email", JSON.stringify(data.email));
    localStorage.setItem("token", data.id);
    localStorage.setItem("userId", data.userId);
    if (txt.split("&")[1].split("=")[1].includes("false")) {
      window.location.href = "/home";
    }
  }
};
