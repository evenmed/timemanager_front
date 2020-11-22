import minutesToHours from "../minutesToHours";

describe("minutesToHours Fn", () => {
  it("calculates hours properly", () => {
    expect(minutesToHours(60)).toBeCloseTo(1);
    expect(minutesToHours(90)).toBeCloseTo(1.5);
    expect(minutesToHours("20")).toBeCloseTo(0.3);
    expect(minutesToHours(10)).toBeCloseTo(0.2);
    expect(minutesToHours(0)).toBeCloseTo(0);
  });
  it("returns 0 for invalid values", () => {
    expect(minutesToHours(-5)).toBe(0);
    expect(minutesToHours(null)).toBe(0);
    expect(minutesToHours({})).toBe(0);
    expect(minutesToHours(true)).toBe(0);
    expect(minutesToHours(false)).toBe(0);
    expect(minutesToHours()).toBe(0);
  });
});
