import maybeAddTrailingZero from "../maybeAddTrailingZero";

describe("maybeAddTrailingZero Fn", () => {
  it("Works properly with ints and strings representing ints", () => {
    expect(maybeAddTrailingZero(2)).toBe("02");
    expect(maybeAddTrailingZero(0)).toBe("00");
    expect(maybeAddTrailingZero("6")).toBe("06");
    expect(maybeAddTrailingZero(7.0)).toBe("07");
    expect(maybeAddTrailingZero("4")).toBe("04");
    expect(maybeAddTrailingZero(12)).toBe("12");
    expect(maybeAddTrailingZero(11242)).toBe("11242");
  });
  it("Returns empty string for invalid values", () => {
    expect(maybeAddTrailingZero(7.1243)).toBe("");
    expect(maybeAddTrailingZero(false)).toBe("");
    expect(maybeAddTrailingZero({})).toBe("");
    expect(maybeAddTrailingZero(null)).toBe("");
    expect(maybeAddTrailingZero(1231809.124498198312)).toBe("");
    expect(maybeAddTrailingZero("sdfs")).toBe("");
    expect(maybeAddTrailingZero("1.0")).toBe("");
  });
});
