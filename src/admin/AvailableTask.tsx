import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as Cross } from "../assets/svg/New folder/cross.svg";
import { AdminAvailableTask } from "../lib/contexts/Queries";
import { useQuery } from "@apollo/client";
import moment from "moment";
const MainDiv = styled.div`
  //opacity: 0;
  position: absolute;
  z-index: 1111;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 500ms;
`;
const Modal = styled.div`
  transform: translateY(-50%) scale(0.75) !important;
  top: 50%;
  margin: auto;
  right: 0;
  left: 0;
  position: absolute;
  z-index: 1111;
  width: 70%;
  box-shadow: 0 0 50px 0 rgb(0 0 0 / 80%);
  -webkit-border-radius: 0;
`;
const ModalDialog = styled.div`
  background-color: white;
  border-radius: 0;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border: none;
  height: 50%;
`;
const AddTask = styled.div`
  outline: none;
`;
const Header = styled.div`
  position: relative;
  padding: 15px;
  border-bottom: none;
  align-items: center;
`;
const Close = styled.div`
  background: transparent;
  width: 25px;
  height: 25px;
  border-radius: 25px;
  -webkit-border-radius: 25px;
  -moz-border-radius: 25px;
  position: relative;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
  border-radius: 50%;
  z-index: 99999;
  opacity: 1;
  transition: background-color 0.25s ease;
  top: 20px;
  right: 20px;
  &: hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;
const ModalBody = styled.div`
    font-family: Arial !important;
    padding: 40px 60px 50px 60px;
    background-color: white;
}
`;
const InputSearch = styled.input`
  width: 200px;
  position: absolute;
  right: 60px;
  top: 25%;
  height: 29px;
`;
const Task = styled.div`
  outline: none;
`;
const Table = styled.div`
  width: 100%;
`;
const TableBody = styled.div`
  outline: none;
  margin-top: 50px;
`;
export const AvailableTask = (props: any) => {
  const [searchData, setSearchData] = useState([]);

  const { data, loading, error } = useQuery(AdminAvailableTask, {
    variables: {
      filter: `{\"where\":{\"designerIds\":{\"like\":\"%ff78db50-84cf-11ec-aa17-0d946f426951%\"},\"deadline\":{\"gt\":\"2022-03-16T15:19:49.859Z\"},\"type\":{\"inq\":[\"design-wizard\",\"dw-template\"]},\"order\":\"deadline ASC\"}}`,
      token: `${localStorage.getItem("token")}`,
    },
  });
  useEffect(() => {
    if (data && data.GET_waveflowTasks) {
      setSearchData(data.GET_waveflowTasks);
    }
  }, [data]);
  if (loading) return <>"loading..."</>;
  if (error) return <>`Error! ${error.message}`</>;

  return (
    <MainDiv>
      <Modal>
        <ModalDialog>
          <AddTask>
            <Header>
              <Close onClick={props.handleTaskClose}>
                <Cross></Cross>
              </Close>
              <h3
                style={{
                  fontSize: "1.425em",
                  color: "#11243b",
                  fontWeight: "400",
                  textAlign: "center",
                  margin: "0 auto",
                }}
              >
                WaveFlow Tasks
              </h3>
            </Header>
            <ModalBody>
              <Task>
                <p style={{ marginTop: "0", marginBottom: "1rem" }}>
                  Currently available tasks to be worked on.
                </p>
                <InputSearch
                  type="text"
                  placeholder="Search task"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      var filterData = data.GET_waveflowTasks.filter(
                        (item: any) => {
                          return item.title
                            .toString()
                            .toLowerCase()
                            .includes(e);
                        }
                      );
                      setSearchData(filterData);
                      console.log(filterData);
                    } else {
                      setSearchData(data.GET_waveflowTasks);
                    }
                  }}
                ></InputSearch>
                <Table>
                  <TableBody>
                    <tr>
                      <th
                        style={{
                          border: " 1px solid #232428",
                          padding: "10px",
                          width: "20%",
                        }}
                      >
                        Title
                      </th>
                      <th
                        style={{
                          border: " 1px solid #232428",
                          padding: "10px",
                          width: "18%",
                        }}
                      >
                        Description
                      </th>
                      <th
                        style={{
                          border: " 1px solid #232428",
                          padding: "10px",
                          width: "18%",
                        }}
                      >
                        Link
                      </th>
                      <th
                        style={{
                          border: " 1px solid #232428",
                          padding: "10px",
                          width: "37%",
                        }}
                      >
                        Template Task
                      </th>
                      <th
                        style={{
                          border: " 1px solid #232428",
                          padding: "10px",
                          width: "40%",
                        }}
                      >
                        Deadline
                      </th>
                    </tr>
                    {searchData.map((item: any) => (
                      <tr>
                        <th
                          style={{
                            border: " 1px solid #232428",
                            padding: "10px",
                            width: "20%",
                            fontWeight: "100",
                          }}
                        >
                          {item.title}
                        </th>
                        <th
                          style={{
                            border: " 1px solid #232428",
                            padding: "10px",
                            width: "18%",
                            fontWeight: "100",
                          }}
                        >
                          {item.description}
                        </th>
                        <th
                          style={{
                            border: " 1px solid #232428",
                            padding: "10px",
                            width: "18%",
                            fontWeight: "100",
                          }}
                        >
                          {item.link}
                        </th>
                        <th
                          style={{
                            border: " 1px solid #232428",
                            padding: "10px",
                            width: "37%",
                            fontWeight: "100",
                          }}
                        >
                          No
                        </th>
                        <th
                          style={{
                            border: " 1px solid #232428",
                            padding: "10px",
                            width: "40%",
                            fontWeight: "100",
                          }}
                        >
                          {moment(item.deadline).format("DD/MM/YYYY")}
                        </th>
                      </tr>
                    ))}
                  </TableBody>
                  <TableBody></TableBody>
                </Table>
              </Task>
            </ModalBody>
          </AddTask>
        </ModalDialog>
      </Modal>
    </MainDiv>
  );
};
