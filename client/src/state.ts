import { proxy } from "valtio";
import {
  AppPage,
  AppState,
  Comment,
  Discussion,
  ToastTypes,
  User,
} from "./types";

const state = proxy<AppState>({
  currentPage: AppPage.Loader,
  isLoading: false,
  toast: false,
  toastText: "",
  toastType: ToastTypes.primary,
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
  messageToast: (text: string, type: ToastTypes): void => {
    state.toastText = text;
    state.toastType = type;
    state.toast = true;

    setTimeout(() => {
      state.toast = false;
      state.toastText = "";
    }, 3000);
  },
  removeToast: (): void => {
    state.toast = false;
    state.toastText = "";
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
