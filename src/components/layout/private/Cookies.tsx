import React from "react";
import styled from "styled-components";

const Heading = styled.div`
  background: #9370db;
  color: white;
  text-align: center;
`;
export const Cookies = (props: any) => {
  return (
    <>
      <Heading onClick={props.handleClose}>
        This Website uses cookies to ensure you ghet the best experiance on our
        website.{" "}
        <a style={{ cursor: "pointer", textDecoration: "underline" }}>
          Learn more
        </a>
      </Heading>
    </>
  );
};
