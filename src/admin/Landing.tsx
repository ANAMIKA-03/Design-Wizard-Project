import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import styled, { AnyStyledComponent } from "styled-components";
import { Button } from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { LandingTitle } from "./LandingTitle";

const Loading = styled.div`
  background: #e8e8e8;
  min-height: 100%;
  max-height: calc(100vh - 72px);
  padding-top: 20px;
  padding-bottom: 20px;
`;
const Header = styled.div`
  width: 90%;
  color: #11243b;
  margin: 10px 0 20px 0;
  letter-spacing: 2px;
  padding-left: 150px;
  background-repeat: no-repeat;
  line-height: 88px;
  vertical-align: middle;
  position: relative;
  font-family: Lato;
  height: 87px;
  fontfamily: Lato;
  display: inlineblock;
`;
const Top = styled.div``;
const LeftSide = styled.div`
  width: 20%;
  height: 85%;
  box-sizing: border-box;
  padding: 0 10px 0 10px;
  border-right: 1px solid #5d5e63;
  float: left;
`;

const LinkButton = styled.div`
  width: 70px;
  height: 24px;
  border: 1px solid #592e6f;
  opacity: 0.5;
  background: transparent;
  color: #592e6f;
  transition: 0.3s ease-out;
  marginbottom: 30px;
  fontfamily: Lato;
  align: center;
  marginbottom: 10px;
  &:hover {
    color: #301934;
    border: 1px solid #301934;
    border-width: bold;
    opacity: 1;
  }
`;

const Style = styled.div`
  width: 35px;
  height: 22px;
`;

const Divider = styled.div`
  height: 0;
  margin: 0.5rem 0;
  overflow: hidden;
  border-top: 1px solid #e9ecef;
`;

const Hr = styled.div`
  width: 70%;
  left: 550px !important;
`;
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFilledInput-root": {
      height: "35px",
      color: "red",
    },
  },
  placeholder: {
    color: "red",
  },
}));
export const Landing = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [landingpage, setLandingpage] = useState(false);
  const [name, setName] = useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      {landingpage && <LandingTitle name={name} />}
      {!landingpage && (
        <Loading>
          <Header style={{ fontSize: "32px" }}>
            <Top>Landing Pages JSON Creator</Top>
          </Header>
          <LeftSide>
            <TextField
              className={classes.placeholder}
              placeholder="enter file title..."
              style={{
                width: "194px",
                height: "20px",
                padding: "1px 2px 5px 5px",
                margin: "5px 10px 10px 0",
                color: "black",
                background: "white",
                border: "1px solid #ccc",
                fontFamily: "Lato",
              }}
              value={name}
              onChange={(e: any) => {
                setName(e.target.value);
              }}
            ></TextField>
            <LinkButton
              style={{ marginBottom: "30px", textAlign: "center" }}
              onClick={() => setLandingpage(true)}
            >
              New
            </LinkButton>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    padding: "10px",
                    width: "80px",
                    fontSize: "16px",
                    letterSpacing: "2px",
                    color: "#696a71",
                    textAlign: "center",
                    borderLeft: "1px solid",
                    borderTop: "1px solid",
                    fontFamily: "Lato",
                    fontWeight: "bold",
                  }}
                >
                  FILE NAME
                </TableCell>
                <TableCell
                  style={{
                    padding: "10px",
                    width: "190px",
                    fontSize: "16px",
                    letterSpacing: "2px",
                    color: "#696a71",
                    textAlign: "center",
                    borderRight: "1px solid",
                    borderLeft: "1px solid",
                    borderTop: "1px solid",
                    fontFamily: "Lato",
                    fontWeight: "bold",
                  }}
                >
                  OPTIONS
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    fontSize: "12.8px",
                    padding: "5px",
                    fontFamily: "Lato",
                    borderLeft: "1px solid",
                    borderTop: "1px solid",
                    borderBottom: "1px solid",
                  }}
                >
                  Test-Category
                </TableCell>

                <TableCell
                  style={{
                    fontSize: "12.8px",
                    border: "1px solid #5d5e63",
                    textAlign: "center",
                    padding: "5px",
                    fontFamily: "Lato",
                  }}
                >
                  <Button
                    style={{
                      width: "40px",
                      height: "30px",
                      border: "1px solid #592e6f",
                      opacity: ".5",
                      background: "transparent",
                      color: " #592e6f",
                      transition: ".3s ease-out",
                      textTransform: "capitalize",
                      fontFamily: "Lato",
                    }}
                    onClick={handleClick}
                  >
                    Edit
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    onClick={handleClose}
                    open={open}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        background: "#e87855",
                        color: "#444549",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&: before": {
                          //  content: ' ""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 32,
                          height: 10,
                          // bgcolor: 'background.paper',
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem>
                      <Style>Yes</Style>
                    </MenuItem>
                    <MenuItem>
                      <Style>No</Style>
                    </MenuItem>
                  </Menu>
                  <Button
                    style={{
                      width: "40px",
                      height: "30px",
                      border: "1px solid #592e6f",
                      opacity: ".5",
                      background: "transparent",
                      color: " #592e6f",
                      transition: ".3s ease-out",
                      textTransform: "capitalize",
                      marginLeft: "5px",
                      fontFamily: "Lato",
                    }}
                    onClick={handleClick}
                  >
                    Delete
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    onClick={handleClose}
                    open={open}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        background: "#e87855",
                        color: "#444549",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&: before": {
                          //  content: ' ""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 32,
                          height: 10,
                          // bgcolor: 'background.paper',
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem>
                      <Style>Yes</Style>
                    </MenuItem>
                    <MenuItem>
                      <Style>No</Style>
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            </TableHead>
            <Button
              style={{
                width: "85px",
                height: "35px",
                border: "1px solid #592e6f",
                opacity: ".5",
                background: "transparent",
                color: " #592e6f",
                transition: ".3s ease-out",
                marginBottom: "10px",
                marginTop: "20px",
                textTransform: "capitalize",
                fontFamily: "Lato",
              }}
            >
              Previous
            </Button>
            <span style={{ marginLeft: "30px" }}>1/1</span>
            <Button
              style={{
                width: "40px",
                height: "30px",
                border: "1px solid #592e6f",
                opacity: ".5",
                background: "transparent",
                color: " #592e6f",
                transition: ".3s ease-out",
                textTransform: "capitalize",
                marginLeft: "35px",
                fontFamily: "Lato",
              }}
            >
              Next
            </Button>
            <hr style={{ width: "100%", textAlign: "left", marginLeft: "0" }} />
          </LeftSide>
        </Loading>
      )}
    </>
  );
};
