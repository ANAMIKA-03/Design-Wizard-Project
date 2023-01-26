import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useMutation, useQuery } from "@apollo/client";
import { AccountDetails } from "../lib/contexts/Queries";
import { AdminAccountCount } from "../lib/contexts/Queries";
import { AdminUserActivate } from "../lib/contexts/Queries";
import { AccountDeletepopup } from "./AccountDeletepopup";
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";
import { ReactComponent as Delete } from "../assets/svg/New folder/bin.svg";
import { ReactComponent as Tick } from "../assets/svg/tick.svg";

const MainDiv = styled.div`
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: -ms-flex;
  display: flex;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  height: calc(100% - 72px);
  position: relative;
`;
const Aside = styled.div`
  position: relative;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-orient: horizontal;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: -ms-flex;
  display: flex;
`;
const Section = styled.div`
  -webkit-flex: 1;
  -moz-flex: 1;
  -ms-flex: 1;
  flex: 1;
  overflow-y: auto;
  height: 1000000px;
  background-color: #e6e6e8;
  overflow-y: scroll;
  height: 110%;
`;
const Container = styled.div`
  margin: 0 5%;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: 84.3889px;
`;
const TopPanel = styled.div`
  width: 100%;
  max-width: 1140px;
`;
const Row = styled.div`
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
  outline: none;
`;
const RowOne = styled.div`
  flex: 0 0 33.333333%;
  max-width: 33.333333%;
  position: relative;
  width: 100%;
  padding-right: 100px;
  padding-left: 15px;
`;
const Header = styled.div`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
  line-height: 1.2;
  margin-top: 0;
`;
const HeaderOne = styled.div`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
  line-height: 1.2;
  margin-top: 0;
`;
const TableOne = styled.div`
  display: table;
  table-layout: fixed;
  width: 100%;
  height: 100%;
  margin-bottom: 50px;
  background-color: #f1f1f2;
  border: #d9d9dc;
  font-size: 0.875em;
`;
const RowHeader = styled.div`
  position: relative;
  border-bottom: 1px solid #e6e6e8;
  margin-left: 0;
  margin-right: 0;
  width: 100%;
  display: table;
  table-layout: fixed;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
`;
const Email = styled.div`
  border-left: none;
  padding: 10px;
  background-color: #f1f1f2;
  outline: none !important;
  border-left: 1px solid #e6e6e8;
  display: table-cell;
  width: 480.67px;
  height: 2px;
  position: relative;
  vertical-align: middle;
  padding: 20px 10px;
  background-color: #f1f1f2;
`;
const Para = styled.div`
  font-weight: bold;
  word-wrap: break-word;
`;
const ParaOne = styled.div`
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  border-bottom: 6px solid #232428;
  top: -9px;
`;
const ParaTwo = styled.div`
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  border-top: 6px solid #232428;
  bottom: -9px;
`;
const Beta = styled.div`
  padding: 10px;
  background-color: #f1f1f2;
  outline: none !important;
  border-left: 1px solid #e6e6e8;
  display: table-cell;
  width: 100%;
  height: 100%;
  position: relative;
  vertical-align: middle;
  padding: 20px 10px;
  background-color: #f1f1f2;
  cursor: pointer;
`;
const Count = styled.div`
  padding: 10px;
  background-color: #f1f1f2;
  outline: none !important;
  border-left: 1px solid #e6e6e8;
  display: table-cell;
  width: 100%;
  height: 100%;
  position: relative;
  vertical-align: middle;
  padding: 20px 10px;
  background-color: #f1f1f2;
`;
const ActiveIcon = styled.div`
  display: block;
  background: red;
  width: 22px;
  height: 22px;
  border-radius: 22px;
`;
const FooterText = styled.text`
  position: absolute;
  bottom: -50px;
  left: 100px;
  display: block;
`;
const FooterSpan = styled.span`
  color: #ccc;
  font-size: 0.7em;
`;
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});
const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      width: "30%",
    },
    body: {
      fontSize: 14,
      border: "1px solid #23242833",
    },
  })
)(TableCell);
export const Account = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [isOpen, setIsOpen] = useState(false);
  const [accountData, setAccountData] = useState([]);
  const [isConfirm, setIsConfirm] = useState(false);
  const [userData, setUserData] = useState({});
  const [addActiveUser] = useMutation(AdminUserActivate);
  const confirmation = (value: any) => {
    setIsConfirm(value);
  };
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    count;
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };
  const { data, loading, error, refetch } = useQuery(AccountDetails, {
    variables: {
      filter: `{\"custom\":true,\"order\":\"created DESC\",\"offset\":${
        page * rowsPerPage
      },\"limit\":${rowsPerPage}}`,
      token: `${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    if (data && data.GET_users_admin) {
      setAccountData(data.GET_users_admin);
    }
  }, [data]);

  useEffect(() => {
    if (isConfirm) {
      addNewActiveUser(userData);
    }
  }, [isConfirm, userData]);
  //  console.log(data);
  const count = useQuery(AdminAccountCount, {
    variables: {
      where: "{}",
      token: `${localStorage.getItem("token")}`,
    },
  });
  // useEffect(() => {
  //   if(count.data){
  //     let adminCount = JSON.parse(count.data.GET_users_count)
  //   console.log(adminCount.count);
  //   }
  // }, [count]);

  if (loading) return "loading...";
  if (error) return `Error! ${error.message}`;

  const addNewActiveUser = async (item: any) => {
    await addActiveUser({
      variables: {
        token: `${localStorage.getItem("token")}`,
        input: {
          active: !item.active,
        },
        id: `${item.id}`,
      },
    }).then(() => {
      refetch();
    });
  };
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <MainDiv>
        <Aside></Aside>
        <Section>
          <Container>
            <TopPanel>
              <Row>
                {isOpen && (
                  <AccountDeletepopup
                    handleClose={togglePopup}
                    confirmation={confirmation}
                  />
                )}
                <RowOne></RowOne>
                <RowOne>
                  <Header>Manage Users</Header>
                </RowOne>
                <RowOne></RowOne>
              </Row>
            </TopPanel>
            <HeaderOne>Users List</HeaderOne>
            <TableOne>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell
                      style={{
                        fontWeight: "700",
                        fontSize: "14px",
                        fontFamily: "Lato, sans-serif",
                        border: "1px solid #e0e0e0",
                      }}
                    >
                      E-Mail
                    </StyledTableCell>
                    <StyledTableCell
                      style={{
                        fontWeight: "700",
                        fontSize: "14px",
                        fontFamily: "Lato, sans-serif",
                        border: "1px solid #e0e0e0",
                      }}
                    >
                      Beta Status
                    </StyledTableCell>
                    <StyledTableCell
                      style={{
                        fontWeight: "700",
                        fontSize: "14px",
                        fontFamily: "Lato, sans-serif",
                        border: "1px solid #e0e0e0",
                      }}
                    >
                      Composition
                    </StyledTableCell>
                    <StyledTableCell
                      style={{
                        fontWeight: "700",
                        fontSize: "14px",
                        fontFamily: "Lato, sans-serif",
                        border: "1px solid #e0e0e0",
                        paddingLeft: "36px",
                      }}
                    >
                      Actions
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableHead>
                  {accountData.map((item: any) => (
                    <TableRow key={item.email}>
                      <StyledTableCell
                        style={{
                          fontWeight: "500",
                          fontSize: "14px",
                          fontFamily: "Lato, sans-serif",
                          border: "1px solid #e0e0e0",
                        }}
                      >
                        {item.active === false && <ActiveIcon></ActiveIcon>}
                        {item.email}
                      </StyledTableCell>
                      <StyledTableCell
                        style={{
                          fontWeight: "500",
                          fontSize: "14px",
                          fontFamily: "Lato, sans-serif",
                          border: "1px solid #e0e0e0",
                        }}
                      >
                        {item.beta}
                      </StyledTableCell>
                      <StyledTableCell
                        style={{
                          fontWeight: "500",
                          fontSize: "14px",
                          fontFamily: "Lato, sans-serif",
                          border: "1px solid #e0e0e0",
                        }}
                      >
                        {item.compositionCount}
                      </StyledTableCell>
                      <StyledTableCell
                        style={{
                          fontWeight: "700",
                          fontSize: "14px",
                          fontFamily: "Lato, sans-serif",
                          border: "1px solid #e0e0e0",
                        }}
                      >
                        {item.active === true ? (
                          <Delete
                            style={{
                              marginLeft: "40px",
                              width: "28.56px",
                              height: "28.56",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setIsOpen(!isOpen);
                              setUserData(item);
                            }}
                          />
                        ) : (
                          <Tick
                            style={{
                              marginLeft: "40px",
                              width: "28.56px",
                              height: "28.56",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              addNewActiveUser(item);
                            }}
                          />
                        )}
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableHead>
              </Table>
              <TablePagination
                component="div"
                count={
                  count.data && JSON.parse(count.data.GET_users_count).count
                }
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableOne>
          </Container>
        </Section>
        <FooterText>
          <FooterSpan>
            Copyright © 2022 Wavebreak Media. All rights reserved.
          </FooterSpan>
        </FooterText>
      </MainDiv>
    </>
  );
};
