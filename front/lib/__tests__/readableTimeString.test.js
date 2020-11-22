import readableTimeString from "../readableTimeString";

describe("readableTimeString Fn", () => {
  it.each([
    "00:00",
    false,
    "",
    null,
    undefined,
    "30:19",
    "15:80",
    "002:00",
    "01:000",
  ])("returns an empty string for invalid times", (input) => {
    expect(readableTimeString(input)).toBe("");
  });

  it.each([
    ["05:00", "5 hours"],
    ["00:01", "1 minutes"],
    ["23:45", "23 hours and 45 minutes"],
    ["01:00", "1 hours"],
    ["11:10", "11 hours and 10 minutes"],
    ["00:16", "16 minutes"],
  ])("returns right string for valid times", (input, output) => {
    expect(readableTimeString(input)).toBe(output);
  });
});
