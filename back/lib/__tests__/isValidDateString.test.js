const isValidDateString = require("../isValidDateString");

describe("isValidDateString Fn", () => {
  it.each(["2020-10-30", "1978-02-01", "2020-11-22"])(
    "is true for valid dates",
    (input) => {
      expect(isValidDateString(input)).toBe(true);
    }
  );
  it.each([
    "2020-10-32",
    "1978-02-00",
    false,
    null,
    NaN,
    undefined,
    "",
    "0000-00-00",
  ])("is false for invalid dates", (input) => {
    expect(isValidDateString(input)).toBe(false);
  });
});
