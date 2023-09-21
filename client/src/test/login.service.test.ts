import { describe, test, expect, vi } from "vitest";
import { login } from "../services/login.service";

global.fetch = vi.fn();

const createFetchResponse = (data: string) => ({
  text: () => new Promise(resolve => resolve(data)),
});

describe("Login Service", () => {
  test("makes a POST request to handle login", async () => {
    const email = "mathias@mail.no";

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(createFetchResponse(email));

    await login(email);

    expect(fetch).toHaveBeenCalledWith("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });
  });
});
