import { proxy } from "valtio";
import { AppPage, AppState, Comment, Discussion, User } from "./types";

const state = proxy<AppState>({
  currentPage: AppPage.Home,
  isLoading: false,
  user: null,
  discussions: [],
  discussion: {},
  comment: {},
});

const actions = {
  setPage: (page: AppPage): void => {
    state.currentPage = page;
  },
  startLoading: (): void => {
    state.isLoading = true;
  },
  stopLoading: (): void => {
    state.isLoading = false;
  },
  setUser: (user: User): void => {
    localStorage.setItem("user", JSON.stringify(user));
    state.user = user;
  },
  removeUser: (): void => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    state.user = null;
  },
  setDiscussions: (discussions: Array<Discussion>): void => {
    state.discussions = discussions;
  },
  setDiscussion: (discussion: Discussion): void => {
    state.discussion = discussion;
  },
  removeDiscussion: (): void => {
    state.discussion = {};
  },
  setComment: (comment: Comment): void => {
    state.comment = comment;
  },
  removeComment: (): void => {
    state.comment = {};
  },
};

export { state, actions };
