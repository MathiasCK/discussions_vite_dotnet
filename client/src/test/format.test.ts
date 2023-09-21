import { describe, expect, test } from "vitest";
import { formatDateTime } from "../utils/format";

describe("formatDateTime function", () => {
  test("should return 'Less than a minute ago' for a recent date", () => {
    const currentDateTime = new Date().toISOString();
    const result = formatDateTime(currentDateTime);
    expect(result).toBe("Less than a minute ago");
  });

  test("should return '5 years ago' for a date 5 years ago", () => {
    const pastDateTime = new Date();
    pastDateTime.setFullYear(pastDateTime.getFullYear() - 5);
    const result = formatDateTime(pastDateTime.toISOString());
    expect(result).toBe("5 years ago");
  });

  test("should return '3 months ago' for a date 3 months ago", () => {
    const pastDateTime = new Date();
    pastDateTime.setMonth(pastDateTime.getMonth() - 3);
    const result = formatDateTime(pastDateTime.toISOString());
    expect(result).toBe("3 months ago");
  });

  test("should return '10 days ago' for a date 10 days ago", () => {
    const pastDateTime = new Date();
    pastDateTime.setDate(pastDateTime.getDate() - 10);
    const result = formatDateTime(pastDateTime.toISOString());
    expect(result).toBe("10 days ago");
  });

  test("should return '2 hours ago' for a date 2 hours ago", () => {
    const pastDateTime = new Date();
    pastDateTime.setHours(pastDateTime.getHours() - 2);
    const result = formatDateTime(pastDateTime.toISOString());
    expect(result).toBe("2 hours ago");
  });

  test("should return '15 minutes ago' for a date 15 minutes ago", () => {
    const pastDateTime = new Date();
    pastDateTime.setMinutes(pastDateTime.getMinutes() - 15);
    const result = formatDateTime(pastDateTime.toISOString());
    expect(result).toBe("15 minutes ago");
  });
  test("should return 'Less than a minute ago' for a date less than a minute ago", () => {
    const pastDateTime = new Date();
    pastDateTime.setMinutes(pastDateTime.getMinutes());
    const result = formatDateTime(pastDateTime.toISOString());
    expect(result).toBe("Less than a minute ago");
  });
});
