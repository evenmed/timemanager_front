import CheckPermission from "../CheckPermission";
import { MockedProvider } from "@apollo/client/testing";
import { shallow, mount } from "enzyme";
import { act } from "react-dom/test-utils";
import toJSON from "enzyme-to-json";
import wait from "waait";
import User, { UserContext } from "../User";
import { fakeUser } from "../../../testUtils";

describe("<CheckPermission/>", () => {
  it("renders content for authorized users", () => {
    const wrapper = mount(
      <UserContext.Provider value={{ permissions: ["USER"] }}>
        <CheckPermission>
          <p className="content">Nice content</p>
        </CheckPermission>
      </UserContext.Provider>
    );

    const child = wrapper.find("p.content");
    expect(child).toHaveLength(1);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("doesn't render content for signed out users", () => {
    const wrapper = mount(
      <UserContext.Provider value={{}}>
        <CheckPermission>
          <p className="content">Nice content</p>
        </CheckPermission>
      </UserContext.Provider>
    );

    const child = wrapper.find("p.content");
    expect(child).toHaveLength(0);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("renders error for signed out users when showError is true", () => {
    const wrapper = mount(
      <UserContext.Provider value={{}}>
        <CheckPermission showError={true}>
          <p className="content">Nice content</p>
        </CheckPermission>
      </UserContext.Provider>
    );
    expect(wrapper.text()).toContain(
      "You must be signed in to access this page."
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it("renders error for unauthorized users when showError is true", () => {
    const wrapper = mount(
      <UserContext.Provider value={{ permissions: ["USER"] }}>
        <CheckPermission permission={"ADMIN"} showError={true}>
          <p className="content">Nice content</p>
        </CheckPermission>
      </UserContext.Provider>
    );
    expect(wrapper.text()).toContain(
      "You are not authorized to access this page."
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
