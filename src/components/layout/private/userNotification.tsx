import React, { useEffect } from "react";
import styled from "styled-components";
import { NotificationPopup } from "../../../admin/NotificationPopup";

const Binding = styled.div`
  //   font-weight: bolder;
  //   &:hover{
  //       color:red;
  //   }
`;

const NotificationSecond = styled.div`
  right: 0;
  text-align: center;
  text-decoration: underline;
  max-width: 49%;
  width: 50%;
  display: inline-block;
  position: absolute;
`;
const BindingP = styled.div`
  font-size: 0.85em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-box;
  line-height: 1.3;
  max-height: 2.6 em;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-top: 0;
  margin-bottom: 1rem;
  //   &:hover{
  //       color:red;
  //   }
`;

const Dropdownitem = styled.div`
  cursor: pointer;
  transition: 0.3s color ease;
  padding: 10px;
  background-color: transparent !important;
  display: block;
  width: 100%;
  //   padding: 0.25rem 1.5rem;
  clear: both;
  font-weight: 400;
  color: #212529;
  text-align: inherit;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
`;

const Dropdownitemscope = styled.div`
  outline: none;
`;

const Notificationswrapper = styled.div`
  outline: none;
`;

const Notificationlist = styled.div`
  height: 116px;
  position: relative;
  max-height: 225px;
  overflow: hidden !important;
  overflow-anchor: none;
  -ms-overflow-style: none;
  touch-action: auto;
  -ms-touch-action: auto;
`;

const Transclude = styled.div`
  outline: none;
`;

const Transcludescope = styled.div`
  padding: 0;
  border-bottom: 1px solid #ccc;
  margin-top: 0;
  margin-bottom: 1rem;
`;

const Scope = styled.div`
  background-color: #e6e6e8;
  cursor: pointer;
  list-style-type: none;
`;

const Element = styled.div`
  border: none;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: -ms-flex;
  display: flex;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  padding: 15px;
  border-bottom: 1px solid #ccc;
  &:hover {
    background-color: #ccc;
  }
`;

const Elementthumbnail = styled.div`
  border: 1px solid #ccc;
  flex: 2;
  position: relative;
`;

const ElementthumbnailVideo = styled.div`
  width: 100%;
  margin-top: 5px;
  outline: none;
`;

const Elementbody = styled.div`
  flex: 3.5;
  margin-left: 15px;
`;

const Elementbodyone = styled.div`
  margin-top: 0;
  font-size: 1.25rem;
`;

const ElementP = styled.div`
  margin-bottom: 0 !important;
  position: relative;
  padding-bottom: 20px;
  font-size: 0.85em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-box;
  line-height: 1.3;
  max-height: 2.6 em;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Notification = styled.div`
  left: 0;
  color: #cd3333 !important;
  max-width: 49%;
  width: 50%;
  display: inline-block;
  position: absolute;
`;

const Psrailx = styled.div`
  left: 0px;
  bottom: 0px;
  display: none;
  opacity: 0;
  transition: background-color 0.2s linear, opacity 0.2s linear;
  -webkit-transition: background-color 0.2s linear, opacity 0.2s linear;
  height: 15px;
  bottom: 0;
  position: absolute;
`;

const Psraily = styled.div`
  top: 0px;
  right: 0px;
  height: 116px;
  display: none;
  opacity: 0;
  transition: background-color 0.2s linear, opacity 0.2s linear;
  -webkit-transition: background-color 0.2s linear, opacity 0.2s linear;
  width: 15px;
  right: 0;
  position: absolute;
`;

const DropdownDiv = styled.div`
background-color:
&: hover ${Binding}{
  color: #e87855;
}
&: hover ${BindingP}{
  color: #e87855;
}
&: hover ${NotificationSecond}{
  color: #e87855;
}
`;
export const UserNotification = (props: any) => {
  const [notificationColor, setNotificationColor] = React.useState("black");

  return (
    <DropdownDiv>
      <Dropdownitem>
        <Dropdownitemscope>
          <Notificationswrapper>
            <Notificationlist>
              <Transclude>
                <Transcludescope>
                  <Scope>
                    <Element>
                      <Elementthumbnail>
                        <ElementthumbnailVideo></ElementthumbnailVideo>
                      </Elementthumbnail>
                      <Elementbody
                        onClick={() => props.checkIsPopupOpen(true, props)}
                      >
                        <Elementbodyone>
                          <Binding>{props.name}</Binding>
                          <BindingP>
                            {props.body}
                            {/* {props.name} */}
                          </BindingP>
                        </Elementbodyone>
                        <ElementP>
                          <Notification>
                            {props.time}
                            {props.time > 1 ? " days left" : "day left"}
                          </Notification>
                          <NotificationSecond>Learn More</NotificationSecond>
                        </ElementP>
                      </Elementbody>
                    </Element>
                  </Scope>
                </Transcludescope>
              </Transclude>

              <Psrailx>
                <div></div>
              </Psrailx>
              <Psraily>
                <div></div>
              </Psraily>
            </Notificationlist>
          </Notificationswrapper>
        </Dropdownitemscope>
      </Dropdownitem>
    </DropdownDiv>
  );
};
