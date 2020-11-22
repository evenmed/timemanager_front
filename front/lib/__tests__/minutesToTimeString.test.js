import minutesToTimeString from "../minutesToTimeString";

describe("minutesToTimeString Fn", () => {
  it("retruns right string", () => {
    expect(minutesToTimeString(15)).toBe("00:15");
    expect(minutesToTimeString(735)).toBe("12:15");
    expect(minutesToTimeString(1257)).toBe("20:57");
    expect(minutesToTimeString(0)).toBe("00:00");
    expect(minutesToTimeString(60)).toBe("01:00");
  });

  it("returns empty string for invalid values", () => {
    // prevent console.error from causing test to fail
    console.error = jest.fn();

    expect(minutesToTimeString(-1)).toBe("");
    expect(minutesToTimeString(false)).toBe("");
    expect(minutesToTimeString()).toBe("");
    expect(minutesToTimeString(null)).toBe("");
    expect(minutesToTimeString({})).toBe("");
    expect(minutesToTimeString(true)).toBe("");
    expect(minutesToTimeString(20000)).toBe("");
    expect(minutesToTimeString(-532)).toBe("");
  });
});
