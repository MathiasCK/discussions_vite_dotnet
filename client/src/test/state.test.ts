import { expect, test, beforeEach, describe } from "vitest";
import { actions, state } from "../state";
import { AppPage, Discussion, Comment } from "../types";
import { testComment, testDiscussion, testUser } from "./test.types";

const mockLocalStorage = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: function (key: string) {
      return store[key] || null;
    },
    setItem: function (key: string, value: string) {
      store[key] = value.toString();
    },
    removeItem: function (key: string) {
      delete store[key];
    },
    clear: function () {
      store = {};
    },
  };
})();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).localStorage = mockLocalStorage;

describe("State actions", () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Object.keys(state).forEach(key => delete state[key]);
    localStorage.clear();
  });

  test("should set the current page", () => {
    actions.setPage(AppPage.Home);
    expect(state.currentPage).toBe(AppPage.Home);
  });

  test("should set the popup", () => {
    actions.setPopup();
    expect(state.popup).toBe(true);
  });

  test("should remove the popup", () => {
    actions.setPopup();
    actions.removePopup();
    expect(state.popup).toBe(false);
  });

  test("should set the popup text", () => {
    actions.setPopuptext("Hello, World!");
    expect(state.popupText).toBe("Hello, World!");
  });

  test("should start loading", () => {
    actions.startLoading();
    expect(state.isLoading).toBe(true);
  });

  test("should stop loading", () => {
    actions.stopLoading();
    expect(state.isLoading).toBe(false);
  });

  test("should set the user", () => {
    actions.setUser(testUser);
    expect(state.user).toEqual(testUser);
    expect(localStorage.getItem("user")).toBe(JSON.stringify(testUser));
  });

  test("should remove the user", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ id: "1", email: "john@doe.com" }),
    );
    actions.removeUser();
    expect(state.user).toBe(null);
    expect(localStorage.getItem("user")).toBe(null);
  });

  test("should set discussions", () => {
    const discussions: Discussion[] = [testDiscussion];
    actions.setDiscussions(discussions);
    expect(state.discussions).toEqual(discussions);
  });

  test("should set a discussion", () => {
    const discussion: Discussion = testDiscussion;
    actions.setDiscussion(discussion);
    expect(state.discussion).toEqual(discussion);
  });

  test("should remove a discussion", () => {
    actions.setDiscussion(testDiscussion);
    actions.removeDiscussion();
    expect(state.discussion).toEqual({});
  });

  test("should set a comment", () => {
    actions.setComment(testComment);
    expect(state.comment).toEqual(testComment);
  });

  test("should remove a comment", () => {
    const comment: Comment = testComment;
    actions.setComment(comment);
    actions.removeComment();
    expect(state.comment).toEqual({});
  });

  test("should set a verification email", () => {
    actions.setVerificationEmail("example@example.com");
    expect(state.verificationEmail).toBe("example@example.com");
  });
});
