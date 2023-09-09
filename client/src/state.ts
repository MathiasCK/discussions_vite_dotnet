import { proxy } from "valtio";
import { AppPage, AppState, Discussion, User } from "./types";

const state = proxy<AppState>({
  currentPage: AppPage.Home,
  isLoading: false,
  user: null,
  discussions: [],
  discussion: {},
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
  setDiscussions: (discussions: Array<Discussion>): void => {
    state.discussions = discussions;
  },
  setDiscussion: (discussion: Discussion): void => {
    state.discussion = discussion;
  },
};

export { state, actions };
