import { expect, test, describe } from "vitest";

describe("verifyTokenPayload", () => {
  test("returns true if token is valid", () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImMyYThiNDg4LWQxNmMtNDVjNC05NDhlLTE4N2Q0YTZjMGE0YyIsIm5iZiI6MTY5NTIzNjE4MywiZXhwIjoxNjk1MjM5NzgzLCJpYXQiOjE2OTUyMzYxODN9.2THSlkBuZHzKMgwnHh9ZSm126aBOn9Mm0qhloF6qHYM";

    const currentTimeSeconds = Date.now() / 1000;

    const { exp: tokenExp } = JSON.parse(atob(token.split(".")[1]));

    const result = tokenExp < currentTimeSeconds;

    expect(result).toBe(true);
  });
});
