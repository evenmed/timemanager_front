import { MockedProvider } from "@apollo/client/testing";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import toJSON from "enzyme-to-json";
import wait from "waait";
import User, { CURRENT_USER_QUERY } from "../User";
import { fakeUser } from "../../../testUtils";

const notSignedInMocks = [
  {
    request: {
      query: CURRENT_USER_QUERY,
    },
    result: {
      data: {
        me: null,
      },
    },
  },
];
const signedInMocks = [
  {
    request: {
      query: CURRENT_USER_QUERY,
    },
    result: {
      data: {
        me: fakeUser(),
      },
    },
  },
];

describe("<User/>", () => {
  it("calls child with false when not signed in", async () => {
    const isSignedIn = jest.fn();
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMocks}>
        <User>{isSignedIn}</User>
      </MockedProvider>
    );

    expect(wrapper.text()).toContain("Authenticating...");

    // Run query
    await act(wait);
    wrapper.update();

    expect(isSignedIn).toHaveBeenCalled();
    expect(isSignedIn).toHaveBeenCalledWith(false);

    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it("calls child with true when signed in", async () => {
    const isSignedIn = jest.fn();
    const wrapper = mount(
      <MockedProvider mocks={signedInMocks}>
        <User>{isSignedIn}</User>
      </MockedProvider>
    );

    expect(wrapper.text()).toContain("Authenticating...");

    // Run query
    await act(wait);
    wrapper.update();

    expect(isSignedIn).toHaveBeenCalled();
    expect(isSignedIn).toHaveBeenCalledWith(true);

    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
