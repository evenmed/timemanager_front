import arrayIncludesAny from "../arrayIncludesAny";

describe("arrayIncludesAny Fn", () => {
  const haystack = ["sandwich", "foo", "bar"];

  it("is true when string is in array and false when not", () => {
    expect(arrayIncludesAny(haystack, "")).toBe(false);
    expect(arrayIncludesAny(haystack, "needle")).toBe(false);
    expect(arrayIncludesAny(haystack, "sandwich")).toBe(true);
    expect(arrayIncludesAny(haystack, "foo")).toBe(true);
    expect(arrayIncludesAny(haystack, "bar")).toBe(true);
  });

  it("is false for empty arrays", () => {
    expect(arrayIncludesAny([], "needle")).toBe(false);
    expect(arrayIncludesAny([], "")).toBe(false);
    expect(arrayIncludesAny([], [""])).toBe(false);
    expect(arrayIncludesAny([], [])).toBe(false);
  });

  it("works with arrays of strings", () => {
    expect(arrayIncludesAny(haystack, ["foo", "not"])).toBe(true);
    expect(arrayIncludesAny(haystack, ["oof", "not", "hey", "bar"])).toBe(true);
    expect(arrayIncludesAny(haystack, ["oof", "not"])).toBe(false);
    expect(arrayIncludesAny(haystack, [])).toBe(false);
    expect(arrayIncludesAny(haystack, [""])).toBe(false);
  });
});
