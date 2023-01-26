import React, { useState } from "react";
import styled from "styled-components";

const CustomJsonContainer = styled.div`
  width: 500px;
  height: 85vh;
  position: absolute;
  transform: translate(0, 900px);
  transition: 0.3s all linear;
  right: 0;
  bottom: 0;
  display: block;
  transform: translate(0, -50px);
`;

const StyledDebuggerContainer = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 99999;
`;

const StyledDebugerBtn = styled.button`
  width: 200px;
  position: absolute;
  bottom: 0;
  right: 40px;
  z-index: 10000;
  outline: none;
  background-color: #2d3559;
  color: #fbfbff;
  border-radius: 10px 10px 0 0;
  -webkit-border-radius: 10px 10px 0 0;
  -moz-border-radius: 10px 10px 0 0;
  padding: 10px;
  text-align: center;
`;
const StyledJsonPre = styled.pre`
  overflow: scroll;
  border: 1px solid #444549;
  display: block;
  padding: 9.5px;
  margin: 0 0 10px;
  font-size: 13px;
  line-height: 1.42857143;
  word-break: break-all;
  word-wrap: break-word;
  color: white;
  background-color: #000;
  border-radius: 4px;
  height: 100%;
`;

export const JsonContainer = (props: any) => {
  const [showJsonLog, setShowJsonLog] = useState<boolean>(false);
  return (
    <StyledDebuggerContainer>
      <StyledDebugerBtn onClick={() => setShowJsonLog((old) => !old)}>
        JSON Debugger
      </StyledDebugerBtn>
      {showJsonLog && (
        <CustomJsonContainer>
          <StyledJsonPre>
            {JSON.stringify(
              props.updateJson(props.json, props.canvas),
              null,
              2
            )}
          </StyledJsonPre>
        </CustomJsonContainer>
      )}
    </StyledDebuggerContainer>
  );
};
