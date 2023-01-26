import { useQuery } from "@apollo/client";
import { GetCategories } from "./../../../../lib/contexts/Queries";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const HeadingScroll = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  & :hover {
    color: #da96a3;
  }
`;
const SideHeading = styled.h4`
  flex: 1;
  font-size: 15px;
  margin-bottom: 1.5rem;
  margin-top: 3px;
  margin-left: 100px;
  padding-left: 0;
  font-weight: 500;
  color: #da96a3;
  line-height: 1.2;
`;
const MainDiv = styled.div`
  //text-align: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background: #283d4e;
  padding: 5px;
  width: 300px;
  height: calc(100vh - 72px);
  //  overflow-y: scroll
`;
const HeadingDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  cursor: pointer;
`;
const Heading = styled.h4`
  flex: 1;
  font-size: 16px;
  margin-bottom: 1.5rem;
  margin-top: 3px;
  margin-left: 40px;
  padding-left: 0;
  font-weight: 500;
  line-height: 1.2;
`;
const ItemMainDiv = styled.div`
position: relative;
    height: 93%;
  //  overflow: hidden !important;
   overflow-anchor: none;
   overflow-y:scroll;
   overflow-style: none
    outline: none;
    box-sizing: border-box
    display: block;
    text-align: center;
    color: #e5e6e6;
    padding: 0;
    padding-right: 35px;
    width: 100%;
    pointer-events: auto;
    font-size: 16px;
    font-family: 'Lato',sans-serif !important;
`;
const ItemDiv = styled.div`
  outline: none;
  display: block;
  text-align: center;
  text-align: center;
  color: #e5e6e6;
`;

const ItemList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 0;
  margin-bottom: 1rem;
  & :hover {
    cursor: pointer;
    border: 1px solid #da96a3;
    color: #da96a3;
  }
`;
const Item = styled.li`
  flex: 1;
  text-align: center;
  padding: 10px;
  transition: all 0.2s ease-in-out;
  list-style-type: none;
  display: list-item;
  cursor: pointer;
  border-bottom: 1px solid #546170;
`;
const Arrow = styled.li`
  content: "";
  margin-right: 15px;
  transform-origin: 5px 1px;
  position: relative;
  border: solid #546170;
  border-width: 0 1px 1px 0;
  display: inline-block;
  padding: 4px;
  transform: rotate(-45deg);
  transition: border 0.2s ease-in-out;
`;
const HeadingArrow = styled.li`
  content: "";
  transform-origin: 5px 1px;
  position: relative;
  border: solid #fff;
  border-width: 0 1px 1px 0;
  display: inline-block;
  padding: 6px;
  top: 9px;
  transform: rotate(135deg); ;
`;

const LeftSideBrowsre = (props: any) => {
  const { resizeTitle } = props;
  const [dataFromQuery, setDataFromQuery] = useState([]);
  const [familyArray, setFamilyArray] = useState([]);
  const [currentArray, setCurrentArray] = useState([]);
  const [headerText, setHeaderText] = useState("");
  const [queryFilter, setQueryFilter] = useState(
    '{"where":{"or":[{"parentId":697},{"dwParentIds":{"neq":null}}]}}'
  );
  const [currentId, setCurrentId] = useState(0);
  const [sideHeader, setSideHeader] = useState("");
  const [showSide, setShowSide] = useState(false);
  const [querySkip, setQuerySkip] = useState(false);
  const [childData, setChildData] = useState([]) as any;

  const handleOnClickParent = (id: any, name: string) => {
    console.log(dataFromQuery);
    let c = dataFromQuery.filter((item: any) => {
      return item.type !== "Family" && item.dwParentIds.includes(id);
    });
    console.log(c);
    setCurrentArray(c);
    setHeaderText("Go back");
    setSideHeader(name);
    setShowSide(true);
  };

  const handleOnClickChild = (id: any) => {
    console.log("f");
    setQueryFilter(
      JSON.stringify({
        where: { id: id },
        include: {
          relation: "templates",
          scope: {
            where: { active: true, statusId: 3 },
            order: ["starRating desc", "createdAt desc"],
            limit: 20,
            skip: props.templateBlock,
          },
        },
      })
    );
  };

  useEffect(() => {
    console.log("s");
    setQuerySkip(false);
  }, [queryFilter]);

  useEffect(() => {
    console.log("yes");
    if (
      props.templateBlock >= 20 &&
      childData.length >= props.templateBlock - 1
    )
      setQueryFilter(
        JSON.stringify({
          where: { id: currentId },
          include: {
            relation: "templates",
            scope: {
              where: { active: true, statusId: 3 },
              order: ["starRating desc", "createdAt desc"],
              limit: 20,
              skip: props.templateBlock,
            },
          },
        })
      );
  }, [props.templateBlock]);

  const handleOnClickGoBack = () => {
    if (headerText === "Go back") {
      setCurrentArray(familyArray);
      setShowSide(false);
      setHeaderText("Go back to  " + resizeTitle);
    } else {
      props.close();
    }
  };

  const getCategoriesData = useQuery(GetCategories, {
    variables: {
      filter: queryFilter,
      token: `${localStorage.getItem("token")}`,
    },
    skip: querySkip,
  });
  useEffect(() => {
    if (childData.length > 0) props.click(childData);
  }, [childData]);
  useEffect(() => {
    if (getCategoriesData.data) {
      console.log("first");
      if (
        queryFilter ===
        '{"where":{"or":[{"parentId":697},{"dwParentIds":{"neq":null}}]}}'
      ) {
        setDataFromQuery(getCategoriesData.data.GET_categorizations);
        let f = getCategoriesData.data.GET_categorizations.filter(
          (item: any) => {
            return item.type === "Family";
          }
        );
        setFamilyArray(f);
        setCurrentArray(f);
        setHeaderText("Go back to" + resizeTitle);
        setQuerySkip(true);
      } else {
        console.log(getCategoriesData.data.GET_categorizations[0]);
        if (getCategoriesData.data.GET_categorizations[0].templates) {
          setQuerySkip(true);

          let dt = getCategoriesData.data.GET_categorizations[0].templates;
          if (childData.length > 0) {
            setChildData((old: any[]) => {
              return [...old, ...dt];
            });
          } else {
            setChildData(
              getCategoriesData.data.GET_categorizations[0].templates
            );
          }
        }
      }
    }
  }, [getCategoriesData.data]);

  console.log(getCategoriesData.error);
  if (getCategoriesData.loading) return <>Loading...</>;
  if (getCategoriesData.error) return <>Error...</>;

  return (
    <MainDiv>
      <HeadingDiv>
        <HeadingScroll>
          <Heading onClick={handleOnClickGoBack}>
            {" "}
            <HeadingArrow />
            {headerText}
          </Heading>
        </HeadingScroll>
        {showSide && <SideHeading> {sideHeader} </SideHeading>}
      </HeadingDiv>
      <ItemMainDiv>
        <ItemDiv>
          <ItemList>
            {currentArray &&
              currentArray.map((value: any, index: number) => {
                return (
                  <Item
                    onClick={() => {
                      setCurrentId(value.id);
                      value.type === "Family"
                        ? handleOnClickParent(value.id, value.name)
                        : handleOnClickChild(value.id);
                      console.log(value);
                    }}
                  >
                    <Arrow />
                    {value.name}
                  </Item>
                );
              })}
          </ItemList>
        </ItemDiv>
      </ItemMainDiv>
    </MainDiv>
  );
};
export default LeftSideBrowsre;
