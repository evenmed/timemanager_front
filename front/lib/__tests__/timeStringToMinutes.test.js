import timeStringToMinutes from "../timeStringToMinutes";

describe("timeStringToMinutes Fn", () => {
  it.each([false, "", null, undefined, "30:19", "15:80", "002:00", "01:000"])(
    "returns 0 for invalid times",
    (input) => {
      expect(timeStringToMinutes(input)).toBe(0);
    }
  );
  it.each([
    ["05:00", 300],
    ["00:01", 1],
    ["23:45", 1425],
    ["01:00", 60],
    ["00:00", 0],
    ["11:10", 670],
    ["00:16", 16],
    ["24:00", 1440],
  ])("returns right amount of mins", (input, output) => {
    expect(timeStringToMinutes(input)).toBe(output);
  });
});
