import dateObjectToString from "../dateObjectToString";

describe("dateObjectToString Fn", () => {
  it("creates string properly", () => {
    expect(dateObjectToString(new Date("2020-10-27T00:00:00Z"))).toBe(
      "2020-10-27"
    );
    expect(dateObjectToString(new Date("1978-09-17T00:00:00Z"))).toBe(
      "1978-09-17"
    );
  });

  it("returns empty string for invalid dates", () => {
    // prevent console.error from causing test to fail
    console.error = jest.fn();

    expect(dateObjectToString(new Date("2020-10-37T00:00:00Z"))).toBe("");
    expect(dateObjectToString(null)).toBe("");
    expect(dateObjectToString("null")).toBe("");
    expect(dateObjectToString("")).toBe("");
    expect(dateObjectToString(true)).toBe("");
    expect(dateObjectToString(false)).toBe("");
    expect(dateObjectToString(NaN)).toBe("");
    expect(dateObjectToString({})).toBe("");
  });
});
