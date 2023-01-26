import { render, cleanup } from "@testing-library/react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import ReactDOM from "react-dom";
import { MockedProvider } from "@apollo/react-testing";
import { BrowserRouter } from "react-router-dom";
import UpgradePopup from "./upgradePopup";

Enzyme.configure({ adapter: new EnzymeAdapter() });

afterEach(cleanup);

describe("  test", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <BrowserRouter>
        <MockedProvider>
          <UpgradePopup />
        </MockedProvider>
      </BrowserRouter>,
      div
    );
    //ReactDOM.unmountComponentAtNode(div);
    //console.log("222222222222222222222222222222222222 TutorialPopup ",div.firstChild?.textContent);
    expect(div.firstChild?.textContent).toContain(
      "a free trial or join a plan"
    );
  });
});
