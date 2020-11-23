const generateToken = require("../generateToken");
const jwt = require("jsonwebtoken");

describe("generateToken fn", () => {
  process.env.APP_SECRET = "secretseshhh";
  it("generates a valid token", () => {
    const token = generateToken({ foo: "bar" });
    const { foo } = jwt.verify(token, process.env.APP_SECRET);
    expect(foo).toBe("bar");
  });
  it("throws error for expired tokens", async () => {
    const token = generateToken({ foo: "bar" }, "1 second");
    const tokenNumber = generateToken({ foo: "foobar" }, 1);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(() => jwt.verify(token, process.env.APP_SECRET)).toThrow();
    expect(() => jwt.verify(tokenNumber, process.env.APP_SECRET)).toThrow();
  });
  it("throws error for invalid tokens", async () => {
    expect(() => jwt.verify("invalidToken", process.env.APP_SECRET)).toThrow();
  });
});
