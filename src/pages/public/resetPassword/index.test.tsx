import { ResetPassword } from ".";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import { MockedProvider } from "@apollo/react-testing";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import { cleanup } from "@testing-library/react";
//import { signUp } from "../../../lib/contexts/Queries";

Enzyme.configure({ adapter: new EnzymeAdapter() });

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <MockedProvider>
        <ResetPassword />
      </MockedProvider>
    </BrowserRouter>,
    div
  );
  //ReactDOM.unmountComponentAtNode(div);
  // console.log("222222222222222222222222222222222222",div.firstChild?.textContent);
  expect(div.firstChild?.textContent).toContain("passwordType");
});
