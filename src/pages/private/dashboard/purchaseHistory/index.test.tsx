import { PurchaseHistory } from "../../../../pages/private/dashboard/purchaseHistory";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import { MockedProvider } from "@apollo/react-testing";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import { cleanup } from "@testing-library/react";

Enzyme.configure({ adapter: new EnzymeAdapter() });

afterEach(cleanup);
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <MockedProvider>
        <PurchaseHistory />
      </MockedProvider>
    </BrowserRouter>,
    div
  );
  //ReactDOM.unmountComponentAtNode(div);
  //console.log("222222222222222222222222222222222222",div.firstChild?.textContent);
  expect(div.firstChild?.textContent).toContain("loading...");
});
