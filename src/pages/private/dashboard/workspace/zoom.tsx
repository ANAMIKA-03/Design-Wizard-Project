import React from "react";
import styled from "styled-components";

const FooterText = styled.text`
  font-size: 11px;
  opacity: 0.2;
  margin-top: 1px;
`;

import {
  ZoomControl,
  ZoomControlBtnWrapper,
  ZoomControlMinusBtn,
  ZoomControlPara,
  ZoomControlPlusBtn,
} from "./styledComponent";

export const ZoomButtons = (props: any) => {
  const {
    manageZoomOut,
    disableZoomOutBtn,
    zoomLevel,
    manageZoomIn,
    disableZoomInBtn,
  } = props;
  return (
    <ZoomControl>
      <ZoomControlBtnWrapper>
        <ZoomControlMinusBtn
          onClick={manageZoomOut}
          style={{ opacity: disableZoomOutBtn }}
        >
          -
        </ZoomControlMinusBtn>
        <ZoomControlPara>{zoomLevel}%</ZoomControlPara>
        <ZoomControlPlusBtn
          onClick={manageZoomIn}
          style={{ opacity: disableZoomInBtn }}
        >
          +
        </ZoomControlPlusBtn>
      </ZoomControlBtnWrapper>
      <FooterText>
        Copyright © 2022 Wavebreak Media. All rights reserved.
      </FooterText>
    </ZoomControl>
  );
};
