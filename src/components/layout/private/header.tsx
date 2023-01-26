import React, { useState, useEffect } from "react";
import styled from "styled-components";
//import myLogo from "./images/designwizard-logo.png";
import { ReactComponent as Logo } from "../../../assets/svg/logo.svg";
import AccountMenu from "./accountMenu";
// import { Button } from '@material-ui/core';
import UpgradePayemntPopUp from "../../../pages/private/home/upgradePayment";
import { ImageVideoEditorToggle } from "./imageVideoEditorToggle";
import { useLocation, Link } from "react-router-dom";
import { ReactComponent as Star } from "../../../assets/svg/New folder/star.svg";
import { useDispatch } from "react-redux";
// import {ReactComponent as Create} from "../../../assets/svg/New folder/create.svg"

const StyledHeaderDiv = styled.div`
  display: flex;
  height: 72px;
  background: #222841;
  color: white;
  justify-content: space-between;
  align-items: center;
`;
const LogoDiv = styled.div`
  margin: 6px 3px 0 7px;
`;
const NavDiv = styled.div`
  display: flex;
  justify-content: end;
  margin-right: 12px;
  align-items: center;
`;
// const Logo = styled.img`
//   width: 60px;
//   height: 60px;
// `;
const Button = styled.button`
  border: 1px solid #2fc6c0;
  font-size: 16px;
  font-weight: 700;
  font-family: "Lato", sans-serif !important;
  color: #2fc6c0;
  width: 100px;
  height: 30px;
  text-align: center;
  padding: 0;
  border-radius: 3px;
  background: #222841;
  cursor: pointer;
  &:hover {
    background: #2fc6c0;
    color: #222841;
  }
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  width: calc(225px);
`;

const TitleBarSpan = styled.div`
  padding: 2px 15px 2px 0;
  display: inline-block;
  width: 100%;
  margin-left: 2%;
  font-size: 0.9em;
`;

const Title = styled.span`
  color: #2fc6c0;
  font-weight: bold;
  font-size: 14px;
`;

const TitleInput = styled.input`
  text-overflow: ellipsis;
  max-width: 160px;
  font-family: inherit;
  font-size: 0.9rem;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  width: 160px;
  box-shadow: none;
  outline: none;
  border: none;
  background: transparent;
  color: #fbfbff;
`;
const Credit = styled.div`
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: -ms-flex;
  display: flex;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  color: white;
  font-size: 12px;
  margin: auto 17px auto 0;
`;
const CreditSpan = styled.span`
  outline: none;
`;
const CreditOne = styled.div`
  padding: 3px 10px 2px 8px;
  display: inline-block;
  background-color: #2fc6c0;
  color: #232428;
  border-radius: 10px;
  font-style: normal;
  margin-left: -159px;
`;
const IconStar = styled.div`
  vertical-align: middle;
  margin-top: -3px;
`;
// const CreateNewDesignButton = styled.button`
// position: absolute;
//   top: 10px;
//   left: 50%;
//   margin-left: -103px;
//   height: 51px;
//   width: 205px;
//   color: #e87855;
//   border: 1px solid #858585;
//   padding: 7px;
//   font-size: 15px;
//   background: transparent;
//   outline: none !important;
//   cursor: pointer;
//   &: hover {
//     color: #e87855 !important;
//     border: 1px solid #e87855;
//   }
// `;

export const PrivateHeader = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const userData: any = localStorage.getItem("user");
  const [title, setTitle] = useState("Untitled");
  const [isSet, setIsSet] = useState(false);
  const dispatch = useDispatch();

  const location: any = useLocation();
  const togglePopup = () => {
    setIsOpen((old) => !old);
  };
  useEffect(() => {
    const user: any = localStorage.getItem("user");
    const userData = JSON.parse(user);
    console.log(userData);
    for (let i of userData.roles) {
      if (i.name === "admin") {
        setIsAdmin(true);
      }
    }
  }, []);

  return (
    <div>
      <StyledHeaderDiv id="app-header">
        <div style={{ display: "flex" }}>
          <Link style={{ color: "white" }} to="/home">
            <LogoDiv>
              <Logo style={{ width: "60px", height: "60px" }} />
            </LogoDiv>
          </Link>
          {location.pathname !== "/home" && (
            <>
              <TitleBar>
                <TitleBarSpan>
                  <Title>Title: </Title>
                  <TitleInput
                    type="text"
                    value={title}
                    onChange={(e: any) => {
                      dispatch({
                        type: "setTitle",
                        title: e.target.value,
                      });
                      setTitle(e.target.value);
                    }}
                  />
                </TitleBarSpan>
              </TitleBar>
            </>
          )}
        </div>
        {isAdmin && useLocation().pathname === "/dashboard/workspace" && (
          <Credit>
            <CreditSpan>
              <CreditOne>
                <IconStar>
                  <Star style={{ width: "17px", height: "17px" }} />{" "}
                  {JSON.parse(userData).limits.credits}/{" "}
                  {JSON.parse(userData).limits.totalVideoCredits}
                </IconStar>
              </CreditOne>
            </CreditSpan>
          </Credit>
        )}
        {/* <CreateNewDesignButton>
        Create New Design
      </CreateNewDesignButton> */}
        {useLocation().pathname === "/dashboard/workspace" && (
          <ImageVideoEditorToggle {...props} />
        )}
        {!isAdmin && (
          <NavDiv>
            <Button onClick={togglePopup}>Upgrade</Button>
            <AccountMenu {...props} />
          </NavDiv>
        )}
        {isAdmin && (
          <NavDiv>
            <AccountMenu {...props} />
          </NavDiv>
        )}
        {isOpen && <UpgradePayemntPopUp handleClose={togglePopup} />}
      </StyledHeaderDiv>
    </div>
  );
};
