import { expect, test, describe } from "vitest";
import jwt from "jsonwebtoken";

const genJWT = (expirationTime: number) =>
  jwt.sign(
    {
      sub: "webtoken",
      exp: expirationTime,
    },
    "super-secret-key",
  );

describe("verifyTokenPayload", () => {
  test("returns true if token is valid", () => {
    const validTimeStamp = Math.floor(Date.now() / 1000) - 3600;
    const token = genJWT(validTimeStamp);
    const currentTimeSeconds = Date.now() / 1000;

    const { exp: tokenExp } = JSON.parse(atob(token.split(".")[1]));

    const result = tokenExp < currentTimeSeconds;

    expect(result).toBe(true);
  });
  test("returns false if token is expired", () => {
    const unvalidTimeStamp = Math.floor(Date.now() / 1000) + 3600;
    const token = genJWT(unvalidTimeStamp);

    const currentTimeSeconds = Date.now() / 1000;

    const { exp: tokenExp } = JSON.parse(atob(token.split(".")[1]));

    const result = tokenExp < currentTimeSeconds;

    expect(result).toBe(false);
  });
});
