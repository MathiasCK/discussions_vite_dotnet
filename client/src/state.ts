import { proxy } from "valtio";
import { AppPage, AppState, Comment, Discussion, User } from "./types";

const state = proxy<AppState>({
  currentPage: AppPage.Loader,
  isLoading: false,
  popup: false,
  popupText: "",
  user: null,
  discussions: [],
  discussion: {},
  comment: {},
  verificationEmail: null,
});

const actions = {
  setPage: (page: AppPage): void => {
    state.currentPage = page;
  },
  setPopup: (): void => {
    state.popup = true;
  },
  removePopup: (): void => {
    state.popup = false;
  },
  setPopuptext: (text: string): void => {
    state.popupText = text;
  },
  removePopupText: (): void => {
    state.popupText = "";
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
  setVerificationEmail: (data: string): void => {
    state.verificationEmail = data;
  },
};

export { state, actions };
