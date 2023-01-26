import { render, cleanup } from "@testing-library/react";
//import { any } from "cypress/types/bluebird";
//import ChooseSize from "."

//import { useMutation } from "@apollo/client";
//import React, { useState } from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import ReactDOM from "react-dom";
import { MockedProvider } from "@apollo/react-testing";
import { BrowserRouter } from "react-router-dom";
import { ChooseTypes } from "../../../../pages/private/dashboard/chooseTypes";
import { useLocation, Link } from "react-router-dom";
import { templateCategories } from "../../../../lib/contexts/Queries";

Enzyme.configure({ adapter: new EnzymeAdapter() });

afterEach(cleanup);

describe("choose type test", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <BrowserRouter>
        <MockedProvider>
          <ChooseTypes />
        </MockedProvider>
      </BrowserRouter>,
      div
    );
    //ReactDOM.unmountComponentAtNode(div);
    //console.log("222222222222222222222222222222222222",div.firstChild?.textContent);
    expect(div.firstChild?.textContent).toContain("loading..");
  });
});

/*
const mocks = [
  {
    request: {
      query: templateCategories,
      variables: {
        id : "1",
        name: 'ad',
        height: "2",
        order : "asc",
        featuredTemplate: "",
        parents: "",
        visible:"",
        width: "5",
        displayHeight:"6",
        displayWidth :"6",
        dpi: "",
        webQualityDownload:""
      },
    },
    result: {
      data: {
        
      },
    },
  },
];

*/
/*
it("handle temp dat",()=>{

  const div = document.createElement("div");
    ReactDOM.render(
  <BrowserRouter>
        <MockedProvider mocks={mocks}> 
            <ChooseTypes />
        </MockedProvider> 
  </BrowserRouter>,
  div
    );
    expect(div.firstChild?.textContent).toContain("loading..")
});

*/
