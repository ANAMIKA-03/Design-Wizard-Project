import { ForgetPassword } from ".";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import { MockedProvider } from "@apollo/react-testing";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import { cleanup } from "@testing-library/react";

import { resetPassword } from "../../../lib/contexts/Queries";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/*
afterEach(cleanup);
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
  <BrowserRouter>
        <MockedProvider>
            <ForgetPassword />
        </MockedProvider> 
  </BrowserRouter>,
  div
    );
    //ReactDOM.unmountComponentAtNode(div);
    console.log("222222222222222222222222222222222222",div.firstChild?.textContent);
    expect(div.firstChild?.textContent).toContain("Already have an account?")
  })*/

afterEach(cleanup);

const mocks = [
  {
    request: {
      query: resetPassword,
      variables: {
        email: "anand@gmail.com",
        resetPass: "anand",
      },
    },
    result: {
      data: {},
    },
  },
];

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <MockedProvider mocks={mocks}>
        <ForgetPassword />
      </MockedProvider>
    </BrowserRouter>,
    div
  );

  //ReactDOM.unmountComponentAtNode(div);
  //console.log("222222222222222222222222222222222222",div.firstChild?.textContent);//
  expect(div.firstChild?.textContent).toContain("your email Reset Password");
});
